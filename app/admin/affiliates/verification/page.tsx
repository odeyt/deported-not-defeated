import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORY_LABELS, isAffiliateCategory } from "@/lib/affiliate/categories";
import { AFFILIATE_STATUSES } from "@/lib/affiliate/types";
import {
  buildVerificationRows,
  filterVerificationRows,
  summarizeVerificationRows,
  parseVerificationFilters,
  DEFAULT_ORIGIN_COUNTRY,
  type ProviderRecord,
  type CountryRecord,
} from "@/lib/affiliate/verificationQuery";
import { GAP_LABELS } from "@/lib/affiliate/verificationGaps";
import FreshnessBadge from "@/components/admin/FreshnessBadge";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

const inputClass =
  "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-2xl font-bold text-navy-800">{value}</p>
      <p className="text-gray-500 text-xs mt-1">{label}</p>
      {hint && <p className="text-gray-400 text-[10px] mt-1">{hint}</p>}
    </div>
  );
}

/**
 * Affiliate verification operations (M-AFFILIATE-VERIFY1).
 *
 * This page invents no truth of its own. It composes the fail-safe, already
 * tested logic in lib/affiliate/corridor.ts, lib/affiliate/freshness.ts, and
 * lib/affiliate/selection.ts (via verificationQuery.ts / verificationGaps.ts)
 * into one operator view. See docs/M-AFFILIATE-VERIFY1.md.
 *
 * PROVIDER EXISTS, DESTINATION COUNTRY AVAILABILITY, CORRIDOR AVAILABILITY,
 * APPLICATION STATUS, LIVE TRACKING LINK, MONETIZED, and VERIFICATION
 * FRESHNESS are rendered as distinct columns — never collapsed into one
 * "active" signal.
 */
export default async function AffiliateVerificationPage({ searchParams }: Props) {
  const filters = parseVerificationFilters(searchParams);
  const supabase = await createClient();

  const [providersRes, countryRes] = await Promise.all([
    supabase
      .from("affiliate_partners")
      .select(
        "id, slug, company_name, canonical_category, network, affiliate_status, active, affiliate_url, application_date",
      )
      .order("company_name", { ascending: true }),
    supabase
      .from("affiliate_provider_countries")
      .select("provider_id, country_code, available, origin_country, verified_at, evidence_url, evidence_tier"),
  ]);

  const migrationApplied = !providersRes.error && !countryRes.error;
  const providers = (providersRes.data ?? []) as ProviderRecord[];
  const countryRows = (countryRes.data ?? []) as CountryRecord[];

  const allRows = buildVerificationRows(providers, countryRows, filters.country, DEFAULT_ORIGIN_COUNTRY);
  const filteredRows = filterVerificationRows(allRows, filters);
  const summary = summarizeVerificationRows(allRows);
  const needsAttentionCount = allRows.filter((r) => r.gaps.length > 0).length;

  function query(overrides: Record<string, string>): string {
    const params = new URLSearchParams({
      country: filters.country,
      status: filters.status,
      tab: filters.tab,
      ...(filters.search ? { search: filters.search } : {}),
      ...overrides,
    });
    return `?${params.toString()}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Affiliate Verification</h1>
        <p className="text-gray-500 text-sm mt-1">
          Provider existence, country availability, corridor verification, affiliate status, and
          monetization — kept as separate facts. Every count below is derived from real rows;
          nothing here is estimated.
        </p>
      </div>

      {!migrationApplied && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
          Affiliate tables could not be read. Apply{" "}
          <code className="font-mono">supabase/affiliate_verification_evidence.sql</code> (and any
          earlier affiliate migrations) in the Supabase SQL editor, then reload.
        </div>
      )}

      <form method="GET" className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Destination country (ISO-2)
          </label>
          <input
            name="country"
            defaultValue={filters.country}
            maxLength={2}
            className={inputClass + " w-24 uppercase font-mono"}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Application status</label>
          <select name="status" defaultValue={filters.status} className={inputClass + " w-40"}>
            <option value="ALL">All</option>
            {AFFILIATE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Search</label>
          <input
            name="search"
            defaultValue={filters.search}
            placeholder="Provider name or slug"
            className={inputClass + " w-56"}
          />
        </div>
        <input type="hidden" name="tab" value={filters.tab} />
        <button
          type="submit"
          className="bg-navy-800 hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Apply
        </button>
        <a
          href={`/api/admin/affiliate-verification/export${query({})}`}
          className="ml-auto border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Export CSV
        </a>
      </form>

      <div className="flex gap-2">
        <Link
          href={query({ tab: "all" })}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
            filters.tab === "all"
              ? "bg-navy-800 text-white border-navy-800"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          All ({allRows.length})
        </Link>
        <Link
          href={query({ tab: "needs-attention" })}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
            filters.tab === "needs-attention"
              ? "bg-brand-red text-white border-brand-red"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Needs attention ({needsAttentionCount})
        </Link>
      </div>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
          {filters.country} — {DEFAULT_ORIGIN_COUNTRY} → {filters.country} corridor summary
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Known providers" value={summary.knownProviders} />
          <StatCard label="Country verified" value={summary.countryVerified} />
          <StatCard
            label={`${DEFAULT_ORIGIN_COUNTRY}→${filters.country} corridor verified`}
            value={summary.corridorVerified}
          />
          <StatCard label="Monetized" value={summary.monetized} hint="Approved, active, with a URL" />
          <StatCard label="Not applied" value={summary.notApplied} />
          <StatCard label="Pending" value={summary.pending} />
          <StatCard label="Approved" value={summary.approved} />
          <StatCard label="Stale verification" value={summary.stale} />
        </div>
      </section>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
              <th className="px-3 py-2.5 font-semibold">Provider</th>
              <th className="px-3 py-2.5 font-semibold">Category</th>
              <th className="px-3 py-2.5 font-semibold">Destination</th>
              <th className="px-3 py-2.5 font-semibold">Corridor</th>
              <th className="px-3 py-2.5 font-semibold">Application</th>
              <th className="px-3 py-2.5 font-semibold">Link</th>
              <th className="px-3 py-2.5 font-semibold">Monetized</th>
              <th className="px-3 py-2.5 font-semibold">Verification</th>
              <th className="px-3 py-2.5 font-semibold">Needs attention</th>
              <th className="px-3 py-2.5 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRows.map((row) => (
              <tr key={row.providerId} className="hover:bg-gray-50">
                <td className="px-3 py-2.5 font-medium text-navy-800">{row.companyName}</td>
                <td className="px-3 py-2.5 text-gray-600">
                  {row.category && isAffiliateCategory(row.category)
                    ? CATEGORY_LABELS[row.category]
                    : row.category ?? "—"}
                </td>
                <td className="px-3 py-2.5">
                  {row.hasCountryRow ? (
                    row.countryAvailable ? (
                      <span className="text-emerald-700">Available</span>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )
                  ) : (
                    <span className="text-gray-400">No row</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  {row.corridorVerified ? (
                    <span className="text-emerald-700">
                      {row.originCountry} → {row.destinationCountry}
                    </span>
                  ) : row.hasCountryRow && row.countryAvailable ? (
                    <span className="text-amber-700">Unknown</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-gray-600">
                  {(row.affiliateStatus ?? "not_applied").replace(/_/g, " ")}
                </td>
                <td className="px-3 py-2.5">
                  {row.affiliateUrl ? (
                    <span className="text-emerald-700">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  {row.monetized ? (
                    <span className="font-semibold text-emerald-700">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  <FreshnessBadge verifiedAt={row.verifiedAt} category={row.category} />
                </td>
                <td className="px-3 py-2.5">
                  {row.gaps.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {row.gaps.map((g) => (
                        <span
                          key={g}
                          className="text-[10px] font-medium bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded-full"
                        >
                          {GAP_LABELS[g]}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  <Link
                    href={`/admin/affiliates/${row.providerId}/edit`}
                    className="text-brand-red text-xs font-semibold hover:underline"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
            {!filteredRows.length && (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-gray-500 text-sm">
                  No providers match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
