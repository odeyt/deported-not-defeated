// ============================================================
// M-AFFILIATE-1 — Server-side data access for the affiliate engine
//
// FAIL-SAFE CONTRACT
//   Every function in this module swallows its errors and returns an empty or
//   null result. A Supabase outage, a missing migration, or a misconfigured
//   environment must never throw into a country guide render. Content first,
//   monetization second.
//
// PRIVACY CONTRACT
//   Reads use the restricted public views, which do not expose affiliate URLs,
//   commission terms, account identifiers, or internal notes. Writes go through
//   log_affiliate_click(), whose signature cannot accept personal data.
// ============================================================

import { getPublicSupabaseClient } from "./supabase-public";
import { isAffiliateEngineOperational } from "./config";
import { selectProviders, selectCategoryTarget } from "./selection";
import type {
  CategoryTarget,
  SelectionOptions,
} from "./selection";
import type {
  ClickContext,
  ProviderCountryRule,
  PublicProvider,
  RankedProvider,
  ResolvedDestination,
} from "./types";

/**
 * Fetch active providers plus the availability rows for one country, then rank
 * them deterministically.
 *
 * Two queries, never per-provider lookups — this is what keeps country guides
 * off an N+1 path.
 */
export async function getRankedProviders(params: {
  category?: string | null;
  countryCode?: string | null;
  limit?: number;
}): Promise<RankedProvider[]> {
  if (!isAffiliateEngineOperational()) return [];

  const { category = null, countryCode = null, limit } = params;

  try {
    const supabase = getPublicSupabaseClient();
    if (!supabase) return [];

    let providerQuery = supabase
      .from("affiliate_providers_public")
      .select(
        "id, slug, name, category, network, description, website_url, monetized, featured, trust_score, global_priority, disclosure_required"
      );

    if (category) providerQuery = providerQuery.eq("category", category);

    const providerResult = await providerQuery;
    if (providerResult.error || !providerResult.data?.length) return [];

    const providers = providerResult.data as unknown as PublicProvider[];

    let countryRules: ProviderCountryRule[] = [];
    if (countryCode) {
      const ruleResult = await supabase
        .from("affiliate_provider_countries_public")
        .select("provider_id, country_code, available, priority, availability_notes")
        .eq("country_code", countryCode.toUpperCase());

      if (ruleResult.error) {
        // Availability is unknown, and unknown must never mean "assume yes".
        // Returning nothing is the safe answer for a country-scoped request.
        return [];
      }
      countryRules = (ruleResult.data ?? []) as unknown as ProviderCountryRule[];
    }

    const options: SelectionOptions = { providers, countryRules, countryCode, category, limit };
    return selectProviders(options);
  } catch {
    return [];
  }
}

/**
 * Resolve one provider slug to a destination through the database gate.
 *
 * The approval check lives in resolve_affiliate_destination(), so an inactive
 * or unapproved provider cannot return an affiliate URL even if this code were
 * wrong.
 */
export async function resolveDestination(slug: string): Promise<ResolvedDestination | null> {
  if (!isAffiliateEngineOperational()) return null;

  try {
    const supabase = getPublicSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase.rpc("resolve_affiliate_destination", { p_slug: slug });

    if (error || !data) return null;

    const row = Array.isArray(data) ? data[0] : data;
    return (row as ResolvedDestination) ?? null;
  } catch {
    return null;
  }
}

/** Pick the single best provider for a category route. */
export async function resolveCategoryTarget(params: {
  category: string;
  countryCode?: string | null;
}): Promise<CategoryTarget | null> {
  const ranked = await getRankedProviders({
    category: params.category,
    countryCode: params.countryCode ?? null,
  });
  if (!ranked.length) return null;
  return selectCategoryTarget(ranked);
}

/**
 * Record a click. Commercial context only.
 *
 * Deliberately fire-and-forget: a failed insert must not delay or block the
 * visitor's redirect.
 */
export async function logClick(context: ClickContext): Promise<string | null> {
  if (!isAffiliateEngineOperational()) return null;

  try {
    const supabase = getPublicSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase.rpc("log_affiliate_click", {
      p_provider_id: context.providerId,
      p_country_code: context.countryCode ?? null,
      p_category: context.category ?? null,
      p_source_page: context.sourcePage ?? null,
      p_placement: context.placement ?? null,
      p_campaign: context.campaign ?? null,
    });

    if (error) return null;
    return typeof data === "string" ? data : null;
  } catch {
    return null;
  }
}

/**
 * Extract just the path of the referring page for click attribution.
 *
 * Path only — query strings and fragments are dropped, because they are the
 * part of a referrer most likely to carry something personal.
 */
export function sourcePageFromReferer(referer: string | null): string | null {
  if (!referer) return null;
  try {
    return new URL(referer).pathname;
  } catch {
    return null;
  }
}
