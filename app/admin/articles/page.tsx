import { createClient } from "@/lib/supabase/server";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Articles</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Country</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(articles ?? []).map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy-800">{a.title}</td>
                <td className="px-4 py-3 text-gray-600">{a.category ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{a.country_code ?? "Global"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!articles || articles.length === 0) && (
          <p className="text-center text-gray-500 py-10 text-sm">No articles yet.</p>
        )}
      </div>
    </div>
  );
}
