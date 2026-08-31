// ============================================================
// M-AFFILIATE-VERIFY1 — row assembly, filtering, and summary counts
//
// Shared by app/admin/affiliates/verification/page.tsx and
// app/api/admin/affiliate-verification/export/route.ts so the two surfaces
// cannot silently disagree about what "needs attention" or a summary count
// means. Neither surface builds its own Supabase query result shape by
// hand past this point.
// ============================================================

import { detectGaps, isMonetizedRow, type GapFlag, type GapCountryRow } from "./verificationGaps";
import { resolveCorridor } from "./corridor";
import { evaluateFreshness, type VerificationState } from "./freshness";

/** Every deportee-money-transfer corridor on this site runs USA -> destination. */
export const DEFAULT_ORIGIN_COUNTRY = "US";

export interface ProviderRecord {
  id: string;
  slug: string;
  company_name: string;
  canonical_category: string | null;
  network: string | null;
  affiliate_status: string | null;
  active: boolean | null;
  affiliate_url: string | null;
  application_date: string | null;
}

export interface CountryRecord {
  provider_id: string;
  country_code: string;
  available: boolean;
  origin_country: string | null;
  verified_at: string | null;
  evidence_url: string | null;
  evidence_tier: string | null;
}

export interface VerificationRow {
  providerId: string;
  slug: string;
  companyName: string;
  category: string | null;
  network: string | null;
  affiliateStatus: string | null;
  active: boolean | null;
  affiliateUrl: string | null;
  applicationDate: string | null;
  destinationCountry: string;
  originCountry: string | null;
  /** True when ANY row (any origin) for this destination is marked available — a broader signal than corridor verification. */
  countryAvailable: boolean | null;
  rowOriginCountry: string | null;
  /** From the row resolveCorridor() actually selected as answering the origin/destination question, not an arbitrary row. */
  verifiedAt: string | null;
  evidenceUrl: string | null;
  evidenceTier: string | null;
  hasCountryRow: boolean;
  monetized: boolean;
  freshnessState: VerificationState;
  corridorVerified: boolean;
  gaps: GapFlag[];
}

/**
 * One row per provider for the given destination country — including
 * providers with NO row there at all (country/corridor fields come back
 * null/false rather than the provider being silently dropped, so "unknown"
 * stays visibly unknown instead of vanishing from the list).
 *
 * A provider may hold several rows for the same destination (one generic
 * plus one per corridor origin) — all of them are passed into
 * resolveCorridor()/detectGaps() together, never collapsed to one before
 * that call.
 */
export function buildVerificationRows(
  providers: ProviderRecord[],
  countryRows: CountryRecord[],
  destinationCountry: string,
  originCountry: string | null = DEFAULT_ORIGIN_COUNTRY,
): VerificationRow[] {
  const dest = destinationCountry.toUpperCase();
  const rowsByProvider = new Map<string, GapCountryRow[]>();
  for (const row of countryRows) {
    if (row.country_code.toUpperCase() !== dest) continue;
    const list = rowsByProvider.get(row.provider_id) ?? [];
    list.push(row);
    rowsByProvider.set(row.provider_id, list);
  }

  return providers.map((provider) => {
    const rows = rowsByProvider.get(provider.id) ?? [];

    const resolution = resolveCorridor(rows, dest, originCountry ?? undefined);
    const resolvedRow = resolution.row as GapCountryRow | null;
    const freshness = evaluateFreshness(resolvedRow?.verified_at ?? null, provider.canonical_category);

    return {
      providerId: provider.id,
      slug: provider.slug,
      companyName: provider.company_name,
      category: provider.canonical_category,
      network: provider.network,
      affiliateStatus: provider.affiliate_status,
      active: provider.active,
      affiliateUrl: provider.affiliate_url,
      applicationDate: provider.application_date,
      destinationCountry: dest,
      originCountry,
      countryAvailable: rows.length > 0 ? rows.some((r) => r.available) : null,
      rowOriginCountry: resolvedRow?.origin_country ?? null,
      verifiedAt: resolvedRow?.verified_at ?? null,
      evidenceUrl: resolvedRow?.evidence_url ?? null,
      evidenceTier: resolvedRow?.evidence_tier ?? null,
      hasCountryRow: rows.length > 0,
      monetized: isMonetizedRow(provider),
      freshnessState: freshness.state,
      corridorVerified: resolution.corridorVerified,
      gaps: detectGaps({
        affiliate_status: provider.affiliate_status,
        active: provider.active,
        affiliate_url: provider.affiliate_url,
        canonical_category: provider.canonical_category,
        application_date: provider.application_date,
        countryRows: rows,
        destinationCountry: dest,
        originCountry,
      }),
    };
  });
}

export interface VerificationFilters {
  country: string;
  status: string;
  tab: "all" | "needs-attention";
  search: string;
}

type SearchParamValue = string | string[] | undefined;

export function parseVerificationFilters(
  params: Record<string, SearchParamValue>,
): VerificationFilters {
  const raw = (key: string): string => {
    const v = params[key];
    return typeof v === "string" ? v : "";
  };
  const country = raw("country").trim().toUpperCase() || "MX";
  const status = raw("status").trim() || "ALL";
  const tab = raw("tab") === "needs-attention" ? "needs-attention" : "all";
  const search = raw("search").trim();
  return { country, status, tab, search };
}

export function filterVerificationRows(
  rows: VerificationRow[],
  filters: Pick<VerificationFilters, "status" | "tab" | "search">,
): VerificationRow[] {
  return rows.filter((row) => {
    if (filters.status !== "ALL" && row.affiliateStatus !== filters.status) return false;
    if (filters.tab === "needs-attention" && row.gaps.length === 0) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!row.slug.toLowerCase().includes(q) && !row.companyName.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}

export interface VerificationSummary {
  knownProviders: number;
  countryVerified: number;
  corridorVerified: number;
  notApplied: number;
  pending: number;
  approved: number;
  monetized: number;
  stale: number;
  unverified: number;
}

/** Every count is derived from the actual row set passed in — nothing here is hardcoded. */
export function summarizeVerificationRows(rows: VerificationRow[]): VerificationSummary {
  return {
    knownProviders: rows.length,
    countryVerified: rows.filter((r) => r.hasCountryRow && r.verifiedAt !== null).length,
    corridorVerified: rows.filter((r) => r.corridorVerified).length,
    notApplied: rows.filter((r) => (r.affiliateStatus ?? "not_applied") === "not_applied").length,
    pending: rows.filter((r) => r.affiliateStatus === "applied" || r.affiliateStatus === "pending").length,
    approved: rows.filter((r) => r.affiliateStatus === "approved").length,
    monetized: rows.filter((r) => r.monetized).length,
    stale: rows.filter((r) => r.freshnessState === "VERIFIED_STALE").length,
    unverified: rows.filter((r) => r.freshnessState === "UNVERIFIED").length,
  };
}
