import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import type { AffiliatePartner } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800",
  applied:  "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-gray-100 text-gray-600",
  paused:   "bg-orange-100 text-orange-700",
};

export default async function AdminAffiliatesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(name, slug)")
    .order("priority", { ascending: false });

  const partners = (data ?? []) as AffiliatePartner[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Affiliate Partners</h1>
          <p className="text-gray-500 text-sm mt-1">{partners.length} partners</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/affiliate-applications" className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Applications
          </Link>
          <Link href="/admin/affiliate-clicks" className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Click Report
          </Link>
          <Link href="/admin/affiliates/new" className="bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-red-dark transition-colors">
            + Add Partner
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Company", "Category", "Status", "Aff. URL", "Featured", "Priority", "Updated", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-gray-600 font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {partners.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-navy-800">{p.company_name}</div>
                  <div className="text-gray-400 text-xs">{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  {(p.affiliate_categories as any)?.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[p.affiliate_status] ?? ""}`}>
                    {p.affiliate_status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.affiliate_url ? (
                    <a href={p.affiliate_url} target="_blank" rel="noopener noreferrer" className="text-green-600 flex items-center gap-1 text-xs hover:underline">
                      <CheckCircle size={12} /> Set <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-gray-400 flex items-center gap-1 text-xs">
                      <XCircle size={12} /> None
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.featured
                    ? <CheckCircle size={15} className="text-yellow-500" />
                    : <XCircle size={15} className="text-gray-200" />}
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs font-mono">{p.priority}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/affiliates/${p.id}/edit`}
                    className="text-brand-red hover:underline text-xs font-medium"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!partners.length && (
          <p className="text-center text-gray-500 py-12">No affiliate partners yet.</p>
        )}
      </div>
    </div>
  );
}
