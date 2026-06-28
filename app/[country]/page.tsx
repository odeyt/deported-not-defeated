import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allCountries, countriesBySlug } from "@/data/countries/index";

interface Props {
  params: { country: string };
}

export async function generateStaticParams() {
  return allCountries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = countriesBySlug[params.country];
  if (!data) return {};
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    keywords: data.keywords,
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      type: "article",
    },
  };
}

const CATEGORIES = [
  {
    slug: "first-30-days",
    title: "Your First 30 Days",
    img: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&h=600&fit=crop&auto=format",
    desc: "Checklist for your first month after arrival",
    urgent: true,
  },
  {
    slug: "directory",
    title: "Business Directory",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop&auto=format",
    desc: "Local businesses, services, and organizations",
  },
  {
    slug: "find-housing",
    title: "Find Housing",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop&auto=format",
    desc: "Short-term and long-term housing options",
  },
  {
    slug: "find-work",
    title: "Find Work",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&auto=format",
    desc: "Jobs, income, and employment resources",
  },
  {
    slug: "legal-documents",
    title: "Legal & Documents",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop&auto=format",
    desc: "IDs, passports, visas, and legal rights",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=600&fit=crop&auto=format",
    desc: "Hospitals, clinics, and mental health support",
  },
  {
    slug: "banking-money",
    title: "Banking & Money",
    img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=600&fit=crop&auto=format",
    desc: "Accounts, transfers, and managing finances",
  },
  {
    slug: "phone-internet",
    title: "Phone & Internet",
    img: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=600&fit=crop&auto=format",
    desc: "SIM cards, data plans, and connectivity",
  },
  {
    slug: "transportation",
    title: "Transportation",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=600&fit=crop&auto=format",
    desc: "Getting around and local transit",
  },
  {
    slug: "resources",
    title: "All Resources",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=600&fit=crop&auto=format",
    desc: "Tools, services, and affiliate resources",
  },
];

export default function CountryPage({ params }: Props) {
  const data = countriesBySlug[params.country];
  if (!data) notFound();

  return (
    <main className="bg-gray-950 text-white">
      {/* 1. Hero */}
      <section className="bg-navy-800 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-6xl mb-4 block">{data.flagEmoji}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{data.heroTitle}</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{data.heroSubtitle}</p>
          {data.cities && data.cities.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {data.cities.map((city) => (
                <span
                  key={city}
                  className="bg-white/10 text-white text-sm px-3 py-1 rounded-full"
                >
                  {city}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Category Card Grid */}
      <section className="bg-gray-900 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Choose Your Guide</h2>
          <p className="text-gray-400 text-sm text-center mb-8">
            Select a topic to get detailed, {data.countryName}-specific information.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${data.slug}/${cat.slug}`}
                className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square ${cat.urgent ? "ring-2 ring-brand-red" : ""}`}
              >
                {/* Realistic photo background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${cat.img}')` }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  {cat.urgent && (
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-1">
                      Start Here →
                    </span>
                  )}
                  <h2 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-red-300 transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-gray-300 text-xs leading-relaxed hidden md:block">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quick Facts */}
      {data.quickFacts.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Facts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-gray-800 rounded-lg px-4 py-3 flex gap-3"
                >
                  <span className="text-gray-400 text-sm font-medium min-w-[120px]">
                    {fact.label}
                  </span>
                  <span className="text-white text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. AI Case Assessment CTA */}
      <section className="bg-brand-red py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">
            Get a Free AI Case Assessment
          </h2>
          <p className="text-white/90 mb-6 text-base leading-relaxed">
            Answer a few questions about your situation and get a personalized report about your
            options — completely free and confidential.
          </p>
          <Link
            href="/ai-report"
            className="inline-block bg-white text-brand-red font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors text-base"
          >
            Start Free Assessment →
          </Link>
        </div>
      </section>

      {/* 5. FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-gray-800 border border-white/10 rounded-xl group"
                >
                  <summary className="cursor-pointer px-5 py-4 text-white font-medium text-sm list-none flex items-center justify-between gap-3">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 text-xs flex-shrink-0 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Related Countries */}
      {data.relatedCountries.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Related Country Guides</h2>
            <div className="flex flex-wrap gap-3">
              {data.relatedCountries.map((slug) => {
                const related = countriesBySlug[slug];
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="bg-gray-800 border border-white/10 hover:border-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>{related.flagEmoji}</span>
                    <span>{related.countryName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. Legal Disclaimer */}
      <section className="bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/30 border border-amber-600/30 rounded-xl p-5">
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong className="font-semibold">Legal Disclaimer:</strong> The information on
              this page is provided for general informational purposes only and does not constitute
              legal advice. Laws, policies, and conditions change frequently. Nothing on this page
              creates an attorney-client relationship. We use language like &quot;may,&quot; &quot;might,&quot; and
              &quot;could&quot; intentionally — individual circumstances vary greatly and eligibility for any
              program or service depends on specific facts. Always consult a licensed attorney for
              legal advice specific to your situation. Deported Not Defeated is not a law firm.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
