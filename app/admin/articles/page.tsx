import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORY_LABELS, isKnowledgeCategory } from "@/lib/knowledgeCenter/categories";

function categoryLabel(category: string | null): string {
  if (!category) return "—";
  return isKnowledgeCategory(category) ? CATEGORY_LABELS[category] : category;
}

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="bg-brand-red hover:bg-brand-red-dark text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
        >
          + New Article
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(articles ?? []).map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy-800">{a.title}</td>
                <td className="px-4 py-3 text-gray-600">{categoryLabel(a.category)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/articles/${a.id}/edit`} className="text-navy-600 hover:text-brand-red font-semibold">
                    Edit
                  </Link>
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
