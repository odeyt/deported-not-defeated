import type { AffiliateCategoryCode } from "@/lib/affiliate/categories";
import type { KnowledgeCategoryCode } from "./categories";

export interface KnowledgeArticleFaq {
  question: string;
  answer: string;
}

/** Row shape of `articles` after supabase/knowledge_center_m1.sql. */
export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: KnowledgeCategoryCode;
  excerpt: string | null;
  content: string;
  featured: boolean;
  reading_time_minutes: number | null;
  last_updated_at: string | null;
  tags: string[];
  related_article_slugs: string[];
  related_country_slugs: string[];
  affiliate_category: AffiliateCategoryCode | null;
  faqs: KnowledgeArticleFaq[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

/** Subset used for category-index and related-article listings. */
export type KnowledgeArticleSummary = Pick<
  KnowledgeArticle,
  | "id"
  | "title"
  | "slug"
  | "category"
  | "excerpt"
  | "featured"
  | "reading_time_minutes"
  | "last_updated_at"
>;
