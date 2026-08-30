import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import NewsletterForm from "@/components/NewsletterForm";
import SelfDeportingDisclaimer from "@/components/knowledgeCenter/SelfDeportingDisclaimer";
import { getArticlesForCategory } from "@/lib/knowledgeCenter/service";
import {
  KNOWLEDGE_CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  isKnowledgeCategory,
  type KnowledgeCategoryCode,
} from "@/lib/knowledgeCenter/categories";

interface Props {
  params: { category: string };
}

const SITE_URL = "https://www.deportednotdefeated.com";

export function generateStaticParams() {
  return KNOWLEDGE_CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isKnowledgeCategory(params.category)) return { title: "Not Found" };
  const category = params.category as KnowledgeCategoryCode;
  return {
    title: CATEGORY_LABELS[category],
    description: CATEGORY_DESCRIPTIONS[category],
  };
}

export default async function KnowledgeCenterCategoryPage({ params }: Props) {
  if (!isKnowledgeCategory(params.category)) notFound();
  const category = params.category as KnowledgeCategoryCode;

  const articles = await getArticlesForCategory(category);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Knowledge Center", item: `${SITE_URL}/knowledge-center` },
      {
        "@type": "ListItem",
        position: 3,
        name: CATEGORY_LABELS[category],
        item: `${SITE_URL}/knowledge-center/${category}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Knowledge Center", href: "/knowledge-center" },
              { label: CATEGORY_LABELS[category] },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight">
            {CATEGORY_LABELS[category]}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        {category === "self-deporting" && <SelfDeportingDisclaimer />}

        {category === "legal" && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-navy-800">Looking for the full legal guide?</p>
              <p className="text-gray-500 text-sm mt-0.5">
                See the in-depth breakdown of return pathways, bars, and waivers.
              </p>
            </div>
            <Link
              href="/legal-resources"
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors text-sm shrink-0"
            >
              <BookOpen size={15} /> Visit Legal Resources
            </Link>
          </div>
        )}

        {articles.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/knowledge-center/${category}/${article.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
              >
                <h2 className="font-bold text-navy-800 group-hover:text-brand-red transition-colors text-lg leading-snug">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                  {article.reading_time_minutes ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {article.reading_time_minutes} min read
                    </span>
                  ) : (
                    <span />
                  )}
                  <ArrowUpRight size={14} className="text-gray-300 group-hover:text-brand-red transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm bg-gray-50 border border-gray-200 rounded-2xl p-6">
            No articles published in this category yet. Check back soon.
          </p>
        )}
      </div>

      <NewsletterForm />
    </>
  );
}
