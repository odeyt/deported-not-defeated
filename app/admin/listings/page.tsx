import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default async function AdminListingsPage() {
  const supabase = await createClient();
  const { data: listings } = await supabase
    .from("directory_listings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Directory Listings</h1>
        <Link href="/admin/listings/new" className="bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-red-dark transition-colors">
          + Add Listing
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Business", "Category", "City", "Verified", "Featured", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-gray-600 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(listings ?? []).map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy-800">{l.business_name}</td>
                <td className="px-4 py-3 text-gray-600">{l.category}</td>
                <td className="px-4 py-3 text-gray-600">{l.city}</td>
                <td className="px-4 py-3">
                  {l.verified ? <CheckCircle size={16} className="text-green-600" /> : <XCircle size={16} className="text-gray-300" />}
                </td>
                <td className="px-4 py-3">
                  {l.featured ? <CheckCircle size={16} className="text-yellow-500" /> : <XCircle size={16} className="text-gray-300" />}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/listings/${l.id}`} className="text-brand-red hover:underline text-xs font-medium">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!listings || listings.length === 0) && (
          <p className="text-center text-gray-500 py-12">No listings yet. Add your first one.</p>
        )}
      </div>
    </div>
  );
}
