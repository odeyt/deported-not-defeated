import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface ClickStats {
  partner_slug: string;
  company_name: string;
  total: number;
  last_7: number;
  last_30: number;
  top_page: string;
}

export default async function AffiliateClicksPage() {
  const supabase = await createClient();

  const now = new Date();
  const d7  = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000).toISOString();
  const d30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Fetch all clicks
  const { data: clicks } = await supabase
    .from("affiliate_clicks")
    .select("partner_slug, page_path, clicked_at")
    .order("clicked_at", { ascending: false });

  // Fetch partner names
  const { data: partners } = await supabase
    .from("affiliate_partners")
    .select("slug, company_name");

  const nameMap = Object.fromEntries((partners ?? []).map((p) => [p.slug, p.company_name]));

  // Aggregate by slug
  const statsMap = new Map<string, { total: number; last_7: number; last_30: number; pages: Record<string, number> }>();

  for (const click of clicks ?? []) {
    const slug = click.partner_slug ?? "unknown";
    if (!statsMap.has(slug)) statsMap.set(slug, { total: 0, last_7: 0, last_30: 0, pages: {} });
    const s = statsMap.get(slug)!;
    s.total++;
    if (click.clicked_at >= d7)  s.last_7++;
    if (click.clicked_at >= d30) s.last_30++;
    const page = click.page_path ?? "/";
    s.pages[page] = (s.pages[page] ?? 0) + 1;
  }

  const stats: ClickStats[] = Array.from(statsMap.entries())
    .map(([slug, s]) => ({
      partner_slug: slug,
      company_name: nameMap[slug] ?? slug,
      total:        s.total,
      last_7:       s.last_7,
      last_30:      s.last_30,
      top_page:     Object.entries(s.pages).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—",
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Affiliate Click Report</h1>
          <p className="text-gray-500 text-sm mt-1">
            Total tracked clicks: <strong>{(clicks ?? []).length}</strong>
          </p>
        </div>
        <Link href="/admin/affiliates" className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
          ← Partners
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Partner", "Total Clicks", "Last 7 Days", "Last 30 Days", "Top Referring Page"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-gray-600 font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stats.map((s) => (
              <tr key={s.partner_slug} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-navy-800">{s.company_name}</div>
                  <div className="text-gray-400 text-xs">{s.partner_slug}</div>
                </td>
                <td className="px-4 py-3 font-bold text-navy-800">{s.total}</td>
                <td className="px-4 py-3 text-gray-700">{s.last_7}</td>
                <td className="px-4 py-3 text-gray-700">{s.last_30}</td>
                <td className="px-4 py-3 text-gray-500 text-xs font-mono">{s.top_page}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!stats.length && (
          <p className="text-center text-gray-500 py-12">No clicks tracked yet.</p>
        )}
      </div>
    </div>
  );
}
