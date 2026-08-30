import { createPublicClient } from "@/lib/affiliate/public-client";
import { isKnowledgeCategory, type KnowledgeCategoryCode } from "./categories";
import { isAffiliateCategory } from "@/lib/affiliate/categories";
import type { KnowledgeArticle, KnowledgeArticleFaq, KnowledgeArticleSummary } from "./types";

/**
 * Knowledge Center article data access.
 *
 * FAIL-SAFE CONTRACT (mirrors lib/affiliate/service.ts): every exported
 * function here catches its own errors and returns an empty result. A
 * Supabase outage, a migration that has not run yet, or a malformed row must
 * degrade a Knowledge Center page to "nothing found" — it must never throw
 * and take the page down.
 *
 * Uses the cookie-free anon client, never the cookie-bound server client:
 * calling cookies() during render opts a statically generated page into
 * per-request rendering, and published articles need no user session to
 * read (same reasoning as lib/affiliate/public-client.ts).
 */

const PUBLIC_ARTICLE_COLUMNS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "content",
  "category",
  "featured",
  "reading_time_minutes",
  "last_updated_at",
  "tags",
  "related_article_slugs",
  "related_country_slugs",
  "affiliate_category",
  "faqs",
  "published",
  "created_at",
  "updated_at",
].join(", ");

/**
 * Column set that exists BEFORE supabase/knowledge_center_m1.sql runs.
 *
 * A deploy and its migration do not land at the same instant (see the
 * incident documented in lib/affiliate/service.ts). If the build ships
 * first, selecting the new columns fails with PostgREST 42703 and every
 * article lookup returns null. The read retries with these columns so a
 * pre-migration article still renders — just without the newer fields.
 */
const LEGACY_ARTICLE_COLUMNS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "content",
  "category",
  "published",
  "created_at",
  "updated_at",
].join(", ");

function isMissingColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "42703" || /does not exist/i.test(error.message ?? "");
}

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  featured?: boolean | null;
  reading_time_minutes?: number | null;
  last_updated_at?: string | null;
  tags?: string[] | null;
  related_article_slugs?: string[] | null;
  related_country_slugs?: string[] | null;
  affiliate_category?: string | null;
  faqs?: KnowledgeArticleFaq[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Map a raw row to the public article shape. Every new-in-M1 field is
 * defended with a safe default so a pre-migration (legacy-column) read still
 * produces a renderable article rather than `undefined` reaching a page.
 */
function toArticle(row: ArticleRow): KnowledgeArticle | null {
  if (!row.category || !isKnowledgeCategory(row.category)) return null;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    featured: row.featured === true,
    reading_time_minutes: row.reading_time_minutes ?? null,
    last_updated_at: row.last_updated_at ?? null,
    tags: row.tags ?? [],
    related_article_slugs: row.related_article_slugs ?? [],
    related_country_slugs: row.related_country_slugs ?? [],
    affiliate_category:
      row.affiliate_category && isAffiliateCategory(row.affiliate_category)
        ? row.affiliate_category
        : null,
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    published: row.published === true,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function toSummary(article: KnowledgeArticle): KnowledgeArticleSummary {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    excerpt: article.excerpt,
    featured: article.featured,
    reading_time_minutes: article.reading_time_minutes,
    last_updated_at: article.last_updated_at,
  };
}

/** One published article by category + slug. Null if missing, unpublished, or on any failure. */
export async function getArticleBySlug(
  category: string,
  slug: string,
): Promise<KnowledgeArticle | null> {
  if (!isKnowledgeCategory(category)) return null;

  try {
    const supabase = createPublicClient();
    if (!supabase) return null;

    const query = (columns: string) =>
      supabase
        .from("articles")
        .select(columns)
        .eq("category", category)
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

    let { data, error } = await query(PUBLIC_ARTICLE_COLUMNS);
    if (isMissingColumnError(error)) {
      ({ data, error } = await query(LEGACY_ARTICLE_COLUMNS));
    }

    if (error || !data) return null;
    return toArticle(data as unknown as ArticleRow);
  } catch {
    return null;
  }
}

/** Published articles in a category, newest-featured-first. */
export async function getArticlesForCategory(
  category: string,
  options: { limit?: number } = {},
): Promise<KnowledgeArticleSummary[]> {
  if (!isKnowledgeCategory(category)) return [];

  try {
    const supabase = createPublicClient();
    if (!supabase) return [];

    const query = (columns: string) => {
      let q = supabase
        .from("articles")
        .select(columns)
        .eq("category", category)
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (options.limit) q = q.limit(options.limit);
      return q;
    };

    let { data, error } = await query(PUBLIC_ARTICLE_COLUMNS);
    if (isMissingColumnError(error)) {
      ({ data, error } = await query(LEGACY_ARTICLE_COLUMNS));
    }

    if (error || !data?.length) return [];
    return (data as unknown as ArticleRow[])
      .map(toArticle)
      .filter((a): a is KnowledgeArticle => a !== null)
      .map(toSummary);
  } catch {
    return [];
  }
}

/** Resolves a set of related-article slugs, silently dropping unresolvable ones. */
export async function getArticlesBySlugs(
  slugs: string[],
): Promise<KnowledgeArticleSummary[]> {
  if (!slugs.length) return [];

  try {
    const supabase = createPublicClient();
    if (!supabase) return [];

    const query = (columns: string) =>
      supabase
        .from("articles")
        .select(columns)
        .in("slug", slugs)
        .eq("published", true);

    let { data, error } = await query(PUBLIC_ARTICLE_COLUMNS);
    if (isMissingColumnError(error)) {
      ({ data, error } = await query(LEGACY_ARTICLE_COLUMNS));
    }

    if (error || !data?.length) return [];
    return (data as unknown as ArticleRow[])
      .map(toArticle)
      .filter((a): a is KnowledgeArticle => a !== null)
      .map(toSummary);
  } catch {
    return [];
  }
}

/** {category, slug} pairs for every published article — generateStaticParams and the sitemap. */
export async function getAllPublishedArticleParams(): Promise<
  { category: KnowledgeCategoryCode; slug: string }[]
> {
  try {
    const supabase = createPublicClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("articles")
      .select("category, slug")
      .eq("published", true);

    if (error || !data?.length) return [];

    return (data as { category: string | null; slug: string }[])
      .filter((row): row is { category: string; slug: string } =>
        Boolean(row.category && isKnowledgeCategory(row.category)),
      )
      .map((row) => ({ category: row.category as KnowledgeCategoryCode, slug: row.slug }));
  } catch {
    return [];
  }
}
