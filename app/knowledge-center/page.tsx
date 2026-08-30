import type { Metadata } from "next";
import Link from "next/link";
import CategoryTileGrid from "@/components/knowledgeCenter/CategoryTileGrid";
import JsonLd from "@/components/JsonLd";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Knowledge Center",
  description:
    "Practical guides, tools, and trusted resources to help you rebuild after deportation — legal information, money, jobs, housing, family, and more.",
};

const SITE_URL = "https://www.deportednotdefeated.com";

export default function KnowledgeCenterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Knowledge Center", item: `${SITE_URL}/knowledge-center` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">
            Knowledge Center
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Knowledge Center
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Practical guides, tools, and trusted resources to help you rebuild after deportation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/knowledge-center/legal"
              className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              Start With Legal Resources
            </Link>
            <Link
              href="/knowledge-center/jobs"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              Find Jobs &amp; Training
            </Link>
            <Link
              href="/knowledge-center/family"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              Help Family Visit
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-navy-800 mb-3">Browse by Category</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Every category is educational, not legal advice. Speak with a licensed professional
            before making decisions that affect your case.
          </p>
        </div>
        <CategoryTileGrid />
      </div>

      <NewsletterForm />
    </>
  );
}
