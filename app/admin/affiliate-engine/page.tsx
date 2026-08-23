// ============================================================
// M-AFFILIATE-1 — Affiliate engine admin dashboard
//
// Shows real numbers only. Where there is no data (no conversions yet), it says
// so instead of displaying a fabricated figure.
// ============================================================

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AFFILIATE_CATEGORY_LABELS } from "@/lib/affiliate-engine/types";

export const dynamic = "force-dynamic";

interface ProviderRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  network: string;
  affiliate_status: string;
  affiliate_url: string | null;
  website_url: string | null;
  active: boolean;
  global_priority: number;
  trust_score: number;
  applied_at: string | null;
  approved_at: string | null;
}

interface ClickRow {
  provider_id: string | null;
  partner_slug: string | null;
  country_code: string | null;
  category: string | null;
  page_path: string | null;
  clicked_at: string;
}

/**
 * Operator application queue. This is a work list, NOT evidence of approval.
 * Live status for each row comes from the database below.
 */
const APPLICATION_QUEUE: { label: string; slug: string | null; note: string }[] = [
  { label: "Travelpayouts", slug: "travelpayouts", note: "Network — flights, hotels, transfers" },
  { label: "Wise",          slug: "wise",          note: "Money transfer — via Partnerize" },
  { label: "Impact",        slug: null,            note: "Network account — no provider row" },
  { label: "Awin",          slug: null,            note: "Network account — no provider row" },
  { label: "Airalo",        slug: "airalo",        note: "eSIM" },
  { label: "SafetyWing",    slug: "safetywing",    note: "Travel insurance" },
  { label: "NordVPN",       slug: "nordvpn",       note: "VPN — typically via Impact" },
  { label: "Surfshark",     slug: "surfshark",     note: "VPN — typically via Impact" },
  { label: "Coursera",      slug: "coursera",      note: "Education" },
  { label: "PartnerStack",  slug: null,            note: "Network account — no provider row" },
];

const STATUS_STYLES: Record<string, string> = {
  APPROVED:    "bg-green-50 text-green-700 border-green-200",
  PENDING:     "bg-yellow-50 text-yellow-700 border-yellow-200",
  APPLIED:     "bg-blue-50 text-blue-700 border-blue-200",
  NOT_APPLIED: "bg-gray-50 text-gray-600 border-gray-200",
  REJECTED:    "bg-red-50 text-red-700 border-red-200",
  PAUSED:      "bg-orange-50 text-orange-700 border-orange-200",
  EXPIRED:     "bg-purple-50 text-purple-700 border-purple-200",
};

function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
        STATUS_STYLES[status] ?? STATUS_STYLES.NOT_APPLIED
      }`}
    >
      {status}
    </span>
  );
}

function countWithin(clicks: ClickRow[], days: number): number {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return clicks.filter((c) => new Date(c.clicked_at).getTime() >= cutoff).length;
}

function topBy(clicks: ClickRow[], key: keyof ClickRow, limit = 5): [string, number][] {
  const tally = new Map<string, number>();
  for (const click of clicks) {
    const value = click[key];
    if (typeof value !== "string" || !value) continue;
    tally.set(value, (tally.get(value) ?? 0) + 1);
  }
  return Array.from(tally.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export default async function AffiliateEngineDashboard() {
  const supabase = await createClient();

  const [providersResult, clicksResult, conversionsResult, countriesResult] = await Promise.all([
    supabase
      .from("affiliate_providers")
      .select(
        "id, slug, name, category, network, affiliate_status, affiliate_url, website_url, active, global_priority, trust_score, applied_at, approved_at"
      )
      .order("category")
      .order("global_priority", { ascending: false }),
    supabase
      .from("affiliate_clicks")
      .select("provider_id, partner_slug, country_code, category, page_path, clicked_at")
      .order("clicked_at", { ascending: false })
      .limit(5000),
    supabase.from("affiliate_conversions").select("id, revenue, currency, status"),
    supabase.from("affiliate_provider_countries").select("provider_id, country_code, available"),
  ]);

  // The migration may not have been run yet. Say so rather than crashing.
  if (providersResult.error) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-navy-800 mb-4">Affiliate Engine</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-900">
          <p className="font-semibold mb-2">The affiliate engine tables are not available yet.</p>
          <p className="mb-3">
            Run <code className="bg-white px-1.5 py-0.5 rounded border">supabase/affiliate_engine.sql</code>{" "}
            in the Supabase SQL editor, then reload this page.
          </p>
          <p className="text-xs text-yellow-800">Reported error: {providersResult.error.message}</p>
        </div>
      </div>
    );
  }

  const providers = (providersResult.data ?? []) as ProviderRow[];
  const clicks = (clicksResult.data ?? []) as ClickRow[];
  const conversions = conversionsResult.data ?? [];
  const countryRows = countriesResult.data ?? [];

  const engineClicks = clicks.filter((c) => c.provider_id);

  const approved = providers.filter((p) => p.affiliate_status === "APPROVED");
  const monetizable = approved.filter((p) => p.affiliate_url && p.active);
  const pending = providers.filter((p) =>
    ["APPLIED", "PENDING"].includes(p.affiliate_status)
  );
  const rejected = providers.filter((p) => p.affiliate_status === "REJECTED");
  const activeCount = providers.filter((p) => p.active).length;

  const stats = [
    { label: "Clicks (all time)", value: engineClicks.length },
    { label: "Clicks today", value: countWithin(engineClicks, 1) },
    { label: "Clicks 7 days", value: countWithin(engineClicks, 7) },
    { label: "Clicks 30 days", value: countWithin(engineClicks, 30) },
  ];

  const providerStats = [
    { label: "Providers in registry", value: providers.length },
    { label: "Active (visible)", value: activeCount },
    { label: "Approved", value: approved.length },
    { label: "Monetizing now", value: monetizable.length },
    { label: "Pending / applied", value: pending.length },
    { label: "Rejected", value: rejected.length },
  ];

  const clicksBySlug = topBy(engineClicks, "partner_slug");
  const clicksByCountry = topBy(engineClicks, "country_code");
  const clicksByCategory = topBy(engineClicks, "category");
  const clicksByPage = topBy(engineClicks, "page_path");

  const countryCountByProvider = new Map<string, number>();
  for (const row of countryRows as { provider_id: string; available: boolean }[]) {
    if (!row.available) continue;
    countryCountByProvider.set(row.provider_id, (countryCountByProvider.get(row.provider_id) ?? 0) + 1);
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Affiliate Engine</h1>
          <p className="text-gray-500 text-sm mt-1">
            Central provider registry, country availability, and click performance.
          </p>
        </div>
        <Link
          href="/admin/affiliates"
          className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Legacy Partners →
        </Link>
      </div>

      {monetizable.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900 mb-6">
          <strong>No provider is monetizing yet.</strong> Every provider is a plain resource link
          until an operator sets status to <code>APPROVED</code>, pastes a real affiliate URL, and
          marks the provider active.
        </div>
      )}

      {/* Click stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-extrabold text-navy-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Registry stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {providerStats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-extrabold text-navy-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Conversions — never fabricated */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-navy-800 mb-2">Conversions &amp; Revenue</h2>
        {conversionsResult.error || conversions.length === 0 ? (
          <p className="text-sm text-gray-500">
            No conversion data recorded. Conversions appear here once a network reporting
            integration is connected — the schema is ready, but nothing is imported yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Conversions</p>
              <p className="text-2xl font-extrabold text-navy-800">{conversions.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Recorded revenue</p>
              <p className="text-2xl font-extrabold text-navy-800">
                {(conversions as { revenue: number | null }[])
                  .reduce((sum, c) => sum + (c.revenue ?? 0), 0)
                  .toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Conversion rate</p>
              <p className="text-2xl font-extrabold text-navy-800">
                {engineClicks.length
                  ? `${((conversions.length / engineClicks.length) * 100).toFixed(2)}%`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">EPC</p>
              <p className="text-2xl font-extrabold text-navy-800">
                {engineClicks.length
                  ? (
                      (conversions as { revenue: number | null }[]).reduce(
                        (sum, c) => sum + (c.revenue ?? 0),
                        0
                      ) / engineClicks.length
                    ).toFixed(3)
                  : "—"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Breakdowns */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Top providers", rows: clicksBySlug },
          { title: "Top countries", rows: clicksByCountry },
          { title: "Top categories", rows: clicksByCategory },
          { title: "Top source pages", rows: clicksByPage },
        ].map((panel) => (
          <div key={panel.title} className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-sm text-navy-800 mb-3">{panel.title}</h3>
            {panel.rows.length === 0 ? (
              <p className="text-xs text-gray-400">No clicks recorded yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {panel.rows.map(([label, count]) => (
                  <li key={label} className="flex justify-between gap-2 text-xs">
                    <span className="text-gray-600 truncate">{label}</span>
                    <span className="text-navy-800 font-bold shrink-0">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Application queue */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-navy-800 mb-1">Recommended Next Applications</h2>
        <p className="text-xs text-gray-500 mb-4">
          Strategic work list for the operator. This ordering is a plan, not proof that any program
          has approved us.
        </p>
        <ol className="space-y-2">
          {APPLICATION_QUEUE.map((item, index) => {
            const provider = item.slug ? providers.find((p) => p.slug === item.slug) : undefined;
            return (
              <li
                key={item.label}
                className="flex items-center gap-3 text-sm border-b border-gray-100 pb-2 last:border-0"
              >
                <span className="text-gray-400 font-mono text-xs w-5 shrink-0">{index + 1}.</span>
                <span className="font-semibold text-navy-800 w-36 shrink-0">{item.label}</span>
                <span className="text-gray-500 text-xs flex-1 min-w-0 truncate">{item.note}</span>
                {provider ? (
                  <>
                    <StatusChip status={provider.affiliate_status} />
                    <Link
                      href={`/admin/affiliate-engine/${provider.id}`}
                      className="text-brand-red text-xs font-semibold hover:underline shrink-0"
                    >
                      Manage
                    </Link>
                  </>
                ) : (
                  <span className="text-[11px] text-gray-400 shrink-0">tracked outside registry</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Provider registry */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-navy-800">Provider Registry</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Provider</th>
                <th className="text-left px-3 py-3 font-semibold">Category</th>
                <th className="text-left px-3 py-3 font-semibold">Network</th>
                <th className="text-left px-3 py-3 font-semibold">Status</th>
                <th className="text-left px-3 py-3 font-semibold">Monetizing</th>
                <th className="text-left px-3 py-3 font-semibold">Countries</th>
                <th className="text-left px-3 py-3 font-semibold">Active</th>
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => {
                const isMonetizing = Boolean(
                  p.affiliate_status === "APPROVED" && p.affiliate_url && p.active
                );
                return (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-5 py-3">
                      <span className="font-semibold text-navy-800">{p.name}</span>
                      <span className="text-gray-400 text-xs block">/go/{p.slug}</span>
                    </td>
                    <td className="px-3 py-3 text-gray-600 text-xs">
                      {AFFILIATE_CATEGORY_LABELS[
                        p.category as keyof typeof AFFILIATE_CATEGORY_LABELS
                      ] ?? p.category}
                    </td>
                    <td className="px-3 py-3 text-gray-500 text-xs">{p.network}</td>
                    <td className="px-3 py-3"><StatusChip status={p.affiliate_status} /></td>
                    <td className="px-3 py-3 text-xs">
                      {isMonetizing ? (
                        <span className="text-green-700 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-gray-600 text-xs">
                      {countryCountByProvider.get(p.id) ?? 0}
                    </td>
                    <td className="px-3 py-3 text-xs">
                      {p.active ? (
                        <span className="text-green-700 font-semibold">Live</span>
                      ) : (
                        <span className="text-gray-400">Hidden</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <Link
                        href={`/admin/affiliate-engine/${p.id}`}
                        className="text-brand-red text-xs font-semibold hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
