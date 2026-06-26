import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default async function AdminAffiliatesPage() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("affiliate_links")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Affiliate Links</h1>
        <Link href="/admin/affiliates/new" className="bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-red-dark transition-colors">
          + Add Link
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Title", "Category", "Active", "Featured", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-600 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(links ?? []).map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy-800">{l.title}</td>
                <td className="px-4 py-3 text-gray-600">{l.category}</td>
                <td className="px-4 py-3">{l.active ? <CheckCircle size={16} className="text-green-600" /> : <XCircle size={16} className="text-gray-300" />}</td>
                <td className="px-4 py-3">{l.featured ? <CheckCircle size={16} className="text-yellow-500" /> : <XCircle size={16} className="text-gray-300" />}</td>
                <td className="px-4 py-3"><Link href={`/admin/affiliates/${l.id}`} className="text-brand-red hover:underline text-xs font-medium">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!links || links.length === 0) && (
          <p className="text-center text-gray-500 py-12">No affiliate links yet.</p>
        )}
      </div>
    </div>
  );
}
