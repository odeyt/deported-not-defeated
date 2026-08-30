import { Clock, CalendarDays } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import AffiliateRecommendations from "@/components/affiliate/AffiliateRecommendations";
import { extractToc } from "@/lib/knowledgeCenter/toc";
import { CATEGORY_LABELS } from "@/lib/knowledgeCenter/categories";
import type { KnowledgeArticle } from "@/lib/knowledgeCenter/types";
import SelfDeportingDisclaimer from "./SelfDeportingDisclaimer";
import TableOfContents from "./TableOfContents";
import FaqBlock from "./FaqBlock";
import RelatedArticles from "./RelatedArticles";
import CountryLinks from "./CountryLinks";

/**
 * Composes an article page: meta strip, disclaimer (self-deporting only),
 * table of contents, body, FAQ, the real affiliate engine, related content,
 * and email capture — the "Evergreen Content Strategy" checklist in
 * docs/Knowledge-Center-Master-Spec.md.
 */
export default function ArticleLayout({ article }: { article: KnowledgeArticle }) {
  const toc = extractToc(article.content);

  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">
            {CATEGORY_LABELS[article.category]}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{article.title}</h1>
          {article.excerpt && (
            <p className="text-gray-300 text-lg mt-4 leading-relaxed">{article.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-gray-400">
            {article.reading_time_minutes && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {article.reading_time_minutes} min read
              </span>
            )}
            {article.last_updated_at && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                Last updated{" "}
                {new Date(article.last_updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {article.category === "self-deporting" && (
        <div className="px-4 py-4 border-b border-yellow-200">
          <div className="max-w-3xl mx-auto">
            <SelfDeportingDisclaimer />
          </div>
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        {toc.length > 0 && <TableOfContents entries={toc} />}

        <div
          className="text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy-800 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1.5"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <FaqBlock faqs={article.faqs} />

        {article.affiliate_category && (
          <AffiliateRecommendations
            category={article.affiliate_category}
            placement="knowledge-center-article"
            campaign={`kc-${article.category}`}
            fallbackHref="/resources"
            fallbackLabel="See the full resources list"
          />
        )}

        <RelatedArticles slugs={article.related_article_slugs} />

        <CountryLinks slugs={article.related_country_slugs} />
      </article>

      <NewsletterForm />
    </>
  );
}
