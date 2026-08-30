import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArticleLayout from "@/components/knowledgeCenter/ArticleLayout";
import { isKnowledgeCategory } from "@/lib/knowledgeCenter/categories";
import { isAffiliateCategory } from "@/lib/affiliate/categories";
import type { KnowledgeArticle } from "@/lib/knowledgeCenter/types";

interface Props {
  params: { id: string };
}

/**
 * Admin-only preview, unfiltered by `published`.
 *
 * The public route (app/knowledge-center/[category]/[slug]/page.tsx) reads
 * through the cookie-free anon client so pages stay statically renderable —
 * that client can never see a draft. This route uses the RLS-respecting
 * server client instead: the admin layout above it already gates access
 * behind auth.getUser(), and the "Admins can manage articles" policy
 * (published = true is a public-only restriction) lets an authenticated
 * request read any row.
 */
export default async function ArticlePreviewPage({ params }: Props) {
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("*").eq("id", params.id).maybeSingle();

  if (!data || !data.category || !isKnowledgeCategory(data.category)) notFound();

  const article: KnowledgeArticle = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    excerpt: data.excerpt,
    content: data.content ?? "",
    featured: Boolean(data.featured),
    reading_time_minutes: data.reading_time_minutes ?? null,
    last_updated_at: data.last_updated_at ?? null,
    tags: data.tags ?? [],
    related_article_slugs: data.related_article_slugs ?? [],
    related_country_slugs: data.related_country_slugs ?? [],
    affiliate_category:
      data.affiliate_category && isAffiliateCategory(data.affiliate_category)
        ? data.affiliate_category
        : null,
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    published: Boolean(data.published),
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return (
    <>
      {!article.published && (
        <div className="bg-yellow-400 text-yellow-950 text-center text-sm font-bold py-2 px-4">
          Draft preview — this article is not published and is not publicly visible.
        </div>
      )}
      <ArticleLayout article={article} />
    </>
  );
}
