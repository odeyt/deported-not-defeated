import { createClient } from "@/lib/supabase/server";

export default async function AdminSubscribersPage() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Newsletter Subscribers</h1>
      <p className="text-gray-600 mb-6">{subscribers?.length ?? 0} subscribers total</p>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Email", "Name", "Date"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-gray-600 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(subscribers ?? []).map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-navy-800">{s.email}</td>
                <td className="px-4 py-3 text-gray-600">{s.name ?? "—"}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!subscribers || subscribers.length === 0) && (
          <p className="text-center text-gray-500 py-12">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
