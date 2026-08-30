import Link from "next/link";
import { getArticlesBySlugs } from "@/lib/knowledgeCenter/service";
import { CATEGORY_LABELS } from "@/lib/knowledgeCenter/categories";

/** Async server component — resolves slugs to summaries, fail-soft on unresolvable ones. */
export default async function RelatedArticles({ slugs }: { slugs: string[] }) {
  if (!slugs.length) return null;
  const articles = await getArticlesBySlugs(slugs);
  if (!articles.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-navy-800 mb-5">Related Articles</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/knowledge-center/${article.category}/${article.slug}`}
            className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
          >
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
              {CATEGORY_LABELS[article.category]}
            </p>
            <p className="font-bold text-navy-800 group-hover:text-brand-red transition-colors leading-snug">
              {article.title}
            </p>
            {article.excerpt && (
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{article.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
