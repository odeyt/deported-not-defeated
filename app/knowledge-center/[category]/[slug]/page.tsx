import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ArticleLayout from "@/components/knowledgeCenter/ArticleLayout";
import { getArticleBySlug, getAllPublishedArticleParams } from "@/lib/knowledgeCenter/service";
import { CATEGORY_LABELS, isKnowledgeCategory } from "@/lib/knowledgeCenter/categories";

interface Props {
  params: { category: string; slug: string };
}

const SITE_URL = "https://www.deportednotdefeated.com";

export async function generateStaticParams() {
  return getAllPublishedArticleParams();
}

async function loadArticle(params: Props["params"]) {
  if (!isKnowledgeCategory(params.category)) return null;
  return getArticleBySlug(params.category, params.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await loadArticle(params);
  if (!article) return { title: "Not Found" };

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    keywords: article.tags.length ? article.tags : undefined,
  };
}

export default async function KnowledgeCenterArticlePage({ params }: Props) {
  const article = await loadArticle(params);
  if (!article) notFound();

  const categoryLabel = CATEGORY_LABELS[article.category];
  const url = `${SITE_URL}/knowledge-center/${article.category}/${article.slug}`;

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt ?? undefined,
      dateModified: article.last_updated_at ?? undefined,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Knowledge Center", item: `${SITE_URL}/knowledge-center` },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryLabel,
          item: `${SITE_URL}/knowledge-center/${article.category}`,
        },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
  ];

  if (article.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Knowledge Center", href: "/knowledge-center" },
            { label: categoryLabel, href: `/knowledge-center/${article.category}` },
            { label: article.title },
          ]}
        />
      </div>

      <ArticleLayout article={article} />
    </>
  );
}
