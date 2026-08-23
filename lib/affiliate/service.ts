import type { SupabaseClient } from "@supabase/supabase-js";
import { createPublicClient } from "./public-client";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAffiliateEngineEnabled } from "./flags";
import { isAffiliateCategory, type AffiliateCategoryCode } from "./categories";
import { isAffiliateNetwork } from "./networks";
import { isAffiliateApprovalStatus, type AffiliateProvider, type PlacementType } from "./types";
import { isSafeAffiliateUrl, normalizeCountryCode, isValidProviderSlug } from "./url";

/**
 * Provider data access.
 *
 * FAIL-SAFE CONTRACT (spec §37): every exported function here catches its own
 * errors and returns an empty result. A Supabase outage, a missing table
 * because the migration has not been applied yet, or a malformed row must
 * degrade the recommendation block to nothing — it must never throw into a
 * country guide and take the page down.
 */

/**
 * Columns a public page is allowed to read.
 *
 * `notes`, `internal_notes`, `account_identifier`, `commission_value`,
 * `commission_notes`, and `terms_notes` are absent on purpose. Selecting
 * `*` here would leak operator data to anonymous readers and would also
 * break once supabase/affiliate_engine_m1_hardening.sql revokes those
 * column grants (spec §33).
 */
export const PUBLIC_PROVIDER_COLUMNS = [
  "id",
  "slug",
  "company_name",
  "short_description",
  "why_it_fits",
  "official_website_url",
  "affiliate_url",
  "affiliate_status",
  "canonical_category",
  "network",
  "placement_type",
  "cta_label",
  "active",
  "featured",
  "disclosure_required",
  "available_globally",
  "trust_score",
  "global_priority",
  "priority",
].join(", ");

interface ProviderRow {
  id: string;
  slug: string;
  company_name: string;
  short_description: string | null;
  why_it_fits: string | null;
  official_website_url: string | null;
  affiliate_url: string | null;
  affiliate_status: string | null;
  canonical_category: string | null;
  network: string | null;
  placement_type: string | null;
  cta_label: string | null;
  active: boolean | null;
  featured: boolean | null;
  disclosure_required: boolean | null;
  available_globally: boolean | null;
  trust_score: number | null;
  global_priority: number | null;
  priority: number | null;
}

interface CountryRow {
  provider_id: string;
  priority: number | null;
  availability_notes: string | null;
  verified_at: string | null;
}

/**
 * Map a raw row to the public provider shape.
 *
 * Every field is defended: an unrecognised status collapses to
 * `not_applied`, an unsafe affiliate URL collapses to null. A corrupt or
 * hostile row therefore becomes an unmonetized listing rather than an
 * attack vector.
 */
function toProvider(row: ProviderRow, country?: CountryRow | null): AffiliateProvider {
  const status = isAffiliateApprovalStatus(row.affiliate_status) ? row.affiliate_status : "not_applied";

  const placement: PlacementType =
    row.placement_type === "affiliate" ||
    row.placement_type === "sponsored" ||
    row.placement_type === "featured"
      ? row.placement_type
      : "editorial";

  return {
    id: row.id,
    slug: row.slug,
    name: row.company_name,
    category: row.canonical_category && isAffiliateCategory(row.canonical_category)
      ? (row.canonical_category as AffiliateCategoryCode)
      : null,
    network: isAffiliateNetwork(row.network) ? row.network : null,
    description: row.short_description,
    whyItHelps: row.why_it_fits,
    websiteUrl: isSafeAffiliateUrl(row.official_website_url) ? row.official_website_url : null,
    // An affiliate URL is only ever exposed for a genuinely approved program.
    affiliateUrl:
      status === "approved" && isSafeAffiliateUrl(row.affiliate_url) ? row.affiliate_url : null,
    approvalStatus: status,
    placementType: placement,
    ctaLabel: row.cta_label || "Visit Official Website",
    active: row.active !== false,
    featured: row.featured === true,
    disclosureRequired: row.disclosure_required !== false,
    availableGlobally: row.available_globally === true,
    trustScore: typeof row.trust_score === "number" ? row.trust_score : null,
    globalPriority: row.global_priority ?? row.priority ?? 0,
    countryPriority: country ? country.priority ?? 0 : null,
    countryVerified: Boolean(country?.verified_at),
    countryNotes: country?.availability_notes ?? null,
  };
}

/**
 * Prefer the service-role client so that reads keep working after the
 * hardening migration narrows anonymous column access.
 *
 * Falls back to the COOKIE-FREE anon client, never the cookie-bound server
 * client: calling cookies() during render converts statically generated
 * pages into per-request renders - a caching and SEO cost paid for nothing,
 * since affiliate reads need no user session.
 */
async function getReadClient(): Promise<SupabaseClient | null> {
  const admin = createAdminClient();
  if (admin) return admin;
  return createPublicClient();
}

/** One provider by slug. Returns null for an unknown or invalid slug. */
export async function getProviderBySlug(slug: string): Promise<AffiliateProvider | null> {
  if (!isValidProviderSlug(slug)) return null;

  try {
    const supabase = await getReadClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("affiliate_partners")
      .select(PUBLIC_PROVIDER_COLUMNS)
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return toProvider(data as unknown as ProviderRow);
  } catch {
    return null;
  }
}

/**
 * Providers in a category, optionally scoped to a country.
 *
 * Two queries, never N+1: one for the providers in the category, one for
 * every availability row in that country. They are joined in memory
 * (spec §35).
 *
 * Returns `[]` when the engine is disabled, when the category is unknown,
 * or on any failure.
 */
export async function getProvidersForCategory(options: {
  category: string;
  country?: string | null;
  includeInactive?: boolean;
}): Promise<AffiliateProvider[]> {
  if (!isAffiliateEngineEnabled()) return [];
  if (!isAffiliateCategory(options.category)) return [];

  const country = normalizeCountryCode(options.country ?? null);

  try {
    const supabase = await getReadClient();
    if (!supabase) return [];

    let query = supabase
      .from("affiliate_partners")
      .select(PUBLIC_PROVIDER_COLUMNS)
      .eq("canonical_category", options.category);

    if (!options.includeInactive) query = query.eq("active", true);

    const { data: rows, error } = await query;
    if (error || !rows?.length) return [];

    if (!country) {
      return (rows as unknown as ProviderRow[]).map((row) => toProvider(row));
    }

    const ids = (rows as unknown as ProviderRow[]).map((row) => row.id);
    const { data: countryRows } = await supabase
      .from("affiliate_provider_countries")
      .select("provider_id, priority, availability_notes, verified_at")
      .eq("country_code", country)
      .eq("available", true)
      .in("provider_id", ids);

    const byProvider = new Map<string, CountryRow>();
    for (const row of (countryRows ?? []) as CountryRow[]) {
      byProvider.set(row.provider_id, row);
    }

    return (rows as unknown as ProviderRow[]).map((row) => toProvider(row, byProvider.get(row.id) ?? null));
  } catch {
    return [];
  }
}

/**
 * Country availability for one provider, used by the admin screens.
 * Not part of any public render path.
 */
export async function getProviderCountries(providerId: string): Promise<
  Array<{ country_code: string; available: boolean; priority: number; availability_notes: string | null; verified_at: string | null }>
> {
  try {
    const supabase = await getReadClient();
    if (!supabase) return [];

    const { data } = await supabase
      .from("affiliate_provider_countries")
      .select("country_code, available, priority, availability_notes, verified_at")
      .eq("provider_id", providerId)
      .order("priority", { ascending: false });

    return (data ?? []) as Array<{
      country_code: string;
      available: boolean;
      priority: number;
      availability_notes: string | null;
      verified_at: string | null;
    }>;
  } catch {
    return [];
  }
}
