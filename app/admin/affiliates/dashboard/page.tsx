import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasServiceRoleKey } from "@/lib/supabase/admin";
import { isAffiliateEngineEnabled, isAffiliateClickLoggingEnabled } from "@/lib/affiliate/flags";
import { CATEGORY_LABELS, isAffiliateCategory } from "@/lib/affiliate/categories";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

/**
 * Affiliate operations dashboard (spec §17, §41).
 *
 * Every number here is counted from real rows. Nothing is modelled,
 * projected, or filled in with a plausible placeholder. Where we have no
 * data — which today means all conversion and revenue figures — the panel
 * says so rather than showing a zero that could be mistaken for a measured
 * result (spec §40).
 */

interface ClickRow {
  partner_id: string | null;
  partner_slug: string | null;
  page_path: string | null;
  country_code: string | null;
  category: string | null;
  outcome: string | null;
  clicked_at: string;
}

interface ProviderRow {
  id: string;
  slug: string;
  company_name: string;
  affiliate_status: string | null;
  active: boolean | null;
  affiliate_url: string | null;
  network: string | null;
}

/**
 * Operator workflow queue.
 *
 * A to-do list of programs worth applying to, in roughly the order they
 * matter for this site. It is NOT evidence that any of them has accepted
 * us. Status is read from the database, and anything already approved is
 * moved out of the queue into a "done" line rather than nagging about it.
 */
const NEXT_APPLICATIONS: Array<{ slug: string | null; name: string; why: string }> = [
  { slug: "travelpayouts", name: "Travelpayouts",   why: "One network covering flights, hotels, and activities — the widest coverage per application." },
  { slug: null,            name: "Impact (network)", why: "Publisher account. Unlocks a large set of brands under one relationship." },
  { slug: null,            name: "Awin (network)",   why: "Publisher account. Complements Impact for brands not on it." },
  { slug: "airalo",        name: "Airalo",           why: "eSIM demand appears on every arrival and family-visit page." },
  { slug: "remitly",       name: "Remitly",          why: "Strongest Central American corridors — Mexico, Guatemala, El Salvador, Honduras." },
  { slug: "nordvpn",       name: "NordVPN",          why: "Privacy tooling already covered editorially on /resources/vpn-privacy." },
  { slug: "surfshark",     name: "Surfshark",        why: "Lower-cost VPN alternative for the same page." },
  { slug: "coursera",      name: "Coursera",         why: "Career rebuilding is a core use case on /career-education." },
  { slug: "booking",       name: "Booking.com",      why: "Accommodation for visiting family — currently a placeholder CTA." },
  { slug: null,            name: "PartnerStack",     why: "Publisher account covering business and software tools." },
];

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-3xl font-bold text-navy-800">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
      {hint && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  );
}

function BreakdownTable({
  title,
  rows,
  emptyLabel,
}: {
  title: string;
  rows: Array<[string, number]>;
  emptyLabel: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <h2 className="font-bold text-navy-800 text-sm px-4 py-3 border-b border-gray-100 bg-gray-50">
        {title}
      </h2>
      {rows.length ? (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {rows.map(([key, count]) => (
              <tr key={key}>
                <td className="px-4 py-2 text-gray-700 break-all">{key}</td>
                <td className="px-4 py-2 text-right font-semibold text-navy-800 w-20">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm px-4 py-8 text-center">{emptyLabel}</p>
      )}
    </div>
  );
}

function tally(values: Array<string | null | undefined>, limit = 8): Array<[string, number]> {
  const counts = new Map<string, number>();
  for (const value of values) {
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

export default async function AffiliateDashboardPage() {
  const supabase = await createClient();

  // Every query is tolerated failing: the migration may not have been applied
  // yet, in which case the dashboard should explain that, not crash.
  const [clicksRes, providersRes, conversionsRes] = await Promise.all([
    supabase
      .from("affiliate_clicks")
      .select("partner_id, partner_slug, page_path, country_code, category, outcome, clicked_at")
      .order("clicked_at", { ascending: false })
      .limit(5000),
    supabase
      .from("affiliate_partners")
      .select("id, slug, company_name, affiliate_status, active, affiliate_url, network"),
    supabase.from("affiliate_conversions").select("id, revenue, currency, status"),
  ]);

  const migrationApplied = !providersRes.error && !clicksRes.error;
  const conversionsTableExists = !conversionsRes.error;

  const clicks = (clicksRes.data ?? []) as ClickRow[];
  const providers = (providersRes.data ?? []) as ProviderRow[];
  const conversions = (conversionsRes.data ?? []) as Array<{ revenue: number | null }>;

  const now = Date.now();
  const since = (days: number) => new Date(now - days * 86_400_000).toISOString();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const clicksToday = clicks.filter((c) => c.clicked_at >= startOfToday.toISOString()).length;
  const clicks7 = clicks.filter((c) => c.clicked_at >= since(7)).length;
  const clicks30 = clicks.filter((c) => c.clicked_at >= since(30)).length;

  const byStatus = (status: string) => providers.filter((p) => p.affiliate_status === status).length;
  const monetizable = providers.filter(
    (p) => p.active !== false && p.affiliate_status === "approved" && Boolean(p.affiliate_url)
  );

  const nameBySlug = new Map(providers.map((p) => [p.slug, p.company_name]));

  const topProviders = tally(clicks.map((c) => c.partner_slug)).map(
    ([slug, count]) => [nameBySlug.get(slug) ?? slug, count] as [string, number]
  );
  const topCountries = tally(clicks.map((c) => c.country_code));
  const topCategories = tally(clicks.map((c) => c.category)).map(
    ([code, count]) =>
      [isAffiliateCategory(code) ? CATEGORY_LABELS[code] : code, count] as [string, number]
  );
  const topPages = tally(clicks.map((c) => c.page_path));
  const byOutcome = tally(clicks.map((c) => c.outcome));

  const affiliateClicks = clicks.filter((c) => c.outcome === "affiliate").length;
  const conversionCount = conversions.length;
  const revenue = conversions.reduce((sum, row) => sum + (row.revenue ?? 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Affiliate Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Counted from real rows only. Nothing on this page is estimated.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/affiliates"
            className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Providers
          </Link>
          <Link
            href="/admin/affiliate-applications"
            className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Applications
          </Link>
        </div>
      </div>

      {/* Configuration health — the things that silently stop this working */}
      <div className="space-y-2">
        {!migrationApplied && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 flex gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>
              Affiliate tables could not be read. Apply{" "}
              <code className="font-mono">supabase/affiliate_engine_m1.sql</code> in the Supabase SQL
              editor, then reload.
            </span>
          </div>
        )}
        {!hasServiceRoleKey() && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 flex gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>
              <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> is not set in this
              environment, so click logging is disabled. Redirects still work — only the analytics
              write is skipped.
            </span>
          </div>
        )}
        {!isAffiliateEngineEnabled() && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 flex gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>
              <code className="font-mono">AFFILIATE_ENGINE_ENABLED</code> is off. Recommendation
              blocks render nothing and no affiliate destination is emitted.
            </span>
          </div>
        )}
        {migrationApplied && hasServiceRoleKey() && isAffiliateEngineEnabled() && isAffiliateClickLoggingEnabled() && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-900 flex gap-2">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <span>Engine enabled, click logging active, affiliate tables reachable.</span>
          </div>
        )}
      </div>

      {/* Clicks */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Clicks</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total clicks" value={clicks.length} hint="Most recent 5,000" />
          <StatCard label="Today" value={clicksToday} />
          <StatCard label="Last 7 days" value={clicks7} />
          <StatCard label="Last 30 days" value={clicks30} />
        </div>
      </section>

      {/* Providers */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Providers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Total in registry" value={providers.length} />
          <StatCard
            label="Earning"
            value={monetizable.length}
            hint="Approved, active, with a URL"
          />
          <StatCard label="Applied / pending" value={byStatus("applied") + byStatus("pending")} />
          <StatCard label="Not yet applied" value={byStatus("not_applied")} />
          <StatCard label="Rejected / expired" value={byStatus("rejected") + byStatus("expired")} />
        </div>
      </section>

      {/* Conversions — honest about having none */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
          Conversions &amp; Revenue
        </h2>
        {!conversionsTableExists ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
            The <code className="font-mono">affiliate_conversions</code> table does not exist yet.
          </div>
        ) : conversionCount === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-600">
            <p className="font-semibold text-navy-800 mb-1">No conversion data.</p>
            <p>
              No affiliate network is connected yet, so there is nothing to report. Conversion rate
              and EPC are deliberately left blank rather than shown as zero — a zero here would
              read as &ldquo;measured and none&rdquo; instead of &ldquo;not measured&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Conversions" value={conversionCount} />
            <StatCard label="Revenue" value={revenue.toFixed(2)} />
            <StatCard
              label="Conversion rate"
              value={affiliateClicks ? `${((conversionCount / affiliateClicks) * 100).toFixed(2)}%` : "—"}
              hint="Conversions ÷ affiliate clicks"
            />
            <StatCard
              label="EPC"
              value={affiliateClicks ? (revenue / affiliateClicks).toFixed(4) : "—"}
              hint="Revenue ÷ affiliate clicks"
            />
          </div>
        )}
      </section>

      {/* Breakdowns */}
      <section className="grid md:grid-cols-2 gap-4">
        <BreakdownTable title="Top providers" rows={topProviders} emptyLabel="No clicks recorded yet." />
        <BreakdownTable title="Top countries" rows={topCountries} emptyLabel="No country-tagged clicks yet." />
        <BreakdownTable title="Top categories" rows={topCategories} emptyLabel="No category-tagged clicks yet." />
        <BreakdownTable title="Top source pages" rows={topPages} emptyLabel="No source pages recorded yet." />
        <BreakdownTable
          title="Destination type"
          rows={byOutcome}
          emptyLabel="No clicks recorded yet."
        />
      </section>

      {/* Operator queue */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
          Recommended Next Applications
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <p className="text-xs text-gray-600 px-4 py-3 bg-amber-50 border-b border-amber-200">
            A suggested application order for the operator. <strong>None of these programs has
            approved this site.</strong> A provider only becomes monetized once its status is set to
            approved and a real tracking URL has been saved.
          </p>
          {monetizable.length > 0 && (
            <p className="text-xs text-emerald-900 px-4 py-3 bg-emerald-50 border-b border-emerald-200">
              Already earning:{" "}
              <strong>{monetizable.map((p) => p.company_name).join(", ")}</strong>. These are done —
              they are not in the queue below.
            </p>
          )}
          <ol className="divide-y divide-gray-100">
            {NEXT_APPLICATIONS.filter((item) => {
              // Drop anything already approved so the queue stays a real to-do list.
              if (!item.slug) return true;
              const existing = providers.find((p) => p.slug === item.slug);
              return existing?.affiliate_status !== "approved";
            }).map((item, index) => {
              const provider = item.slug ? providers.find((p) => p.slug === item.slug) : undefined;
              return (
                <li key={item.name} className="px-4 py-3 flex items-start gap-3 text-sm">
                  <span className="font-bold text-gray-400 w-5 shrink-0">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-navy-800">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.why}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    {provider ? (
                      <>
                        <span className="text-xs font-semibold text-gray-600">
                          {(provider.affiliate_status ?? "not_applied").replace(/_/g, " ")}
                        </span>
                        <Link
                          href={`/admin/affiliates/${provider.id}/edit`}
                          className="block text-brand-red text-xs font-medium hover:underline mt-0.5"
                        >
                          Update
                        </Link>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">Network account</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
