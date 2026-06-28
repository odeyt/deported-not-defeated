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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-white mb-4">{children}</h2>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none">
      {items.map((item, i) => (
        <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-2">
          <span className="text-brand-red mt-0.5 flex-shrink-0">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

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

      {/* 2. Quick Facts */}
      {data.quickFacts.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Quick Facts</SectionHeading>
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

      {/* 3. Returning Home */}
      {data.returningHome.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Returning Home: First Steps</SectionHeading>
            <BulletList items={data.returningHome} />
          </div>
        </section>
      )}

      {/* 4. Travel Documents */}
      {data.travelDocuments.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Travel Documents &amp; ID</SectionHeading>
            <BulletList items={data.travelDocuments} />
          </div>
        </section>
      )}

      {/* 5. Embassy Info */}
      <section className="bg-gray-950 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>U.S. Embassy Information</SectionHeading>
          <p className="text-gray-300 text-sm leading-relaxed">{data.embassyInfo}</p>
        </div>
      </section>

      {/* 6. Housing */}
      {data.housing.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Housing</SectionHeading>
            <BulletList items={data.housing} />
          </div>
        </section>
      )}

      {/* 7. Jobs */}
      {data.jobs.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Jobs &amp; Employment</SectionHeading>
            <BulletList items={data.jobs} />
          </div>
        </section>
      )}

      {/* 8. Healthcare */}
      {data.healthcare.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Healthcare</SectionHeading>
            <BulletList items={data.healthcare} />
          </div>
        </section>
      )}

      {/* 9. Mental Health */}
      {data.mentalHealth.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Mental Health</SectionHeading>
            <BulletList items={data.mentalHealth} />
          </div>
        </section>
      )}

      {/* 10. Money Transfer */}
      {data.moneyTransfer.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Receiving Money from the U.S.</SectionHeading>
            <BulletList items={data.moneyTransfer} />
          </div>
        </section>
      )}

      {/* 11. Phone & Internet */}
      {data.phoneInternet.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Phone &amp; Internet</SectionHeading>
            <BulletList items={data.phoneInternet} />
          </div>
        </section>
      )}

      {/* 12. Transportation */}
      {data.transportation.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Transportation</SectionHeading>
            <BulletList items={data.transportation} />
          </div>
        </section>
      )}

      {/* 13. Legal Resources */}
      {data.legalResources.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Legal Resources</SectionHeading>
            <BulletList items={data.legalResources} />
          </div>
        </section>
      )}

      {/* 14. U.S. Reentry Education */}
      {data.reentryInfo.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>U.S. Reentry Education</SectionHeading>
            <BulletList items={data.reentryInfo} />
          </div>
        </section>
      )}

      {/* 15. Affiliate Resources */}
      <section className="bg-gray-950 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Recommended Resources</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {[
              {
                name: "Wise",
                desc: "Send money internationally with low fees",
                href: "#",
                icon: "💸",
              },
              {
                name: "Remitly",
                desc: "Fast, reliable money transfers worldwide",
                href: "#",
                icon: "💰",
              },
              {
                name: "WorldRemit",
                desc: "Send to 130+ countries quickly",
                href: "#",
                icon: "🌍",
              },
              {
                name: "Airalo",
                desc: "Affordable eSIM data for your device",
                href: "#",
                icon: "📱",
              },
              {
                name: "NordVPN",
                desc: "Secure internet access from anywhere",
                href: "#",
                icon: "🔒",
              },
              {
                name: "SafetyWing",
                desc: "International health insurance coverage",
                href: "#",
                icon: "🏥",
              },
            ].map((r) => (
              <a
                key={r.name}
                href={r.href}
                className="bg-gray-800 border border-white/10 rounded-xl p-4 flex items-start gap-3 hover:border-white/20 transition-colors"
              >
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-xs">
            Disclosure: Some links may be affiliate links. We only recommend services we believe
            are useful for deportees.
          </p>
        </div>
      </section>

      {/* 16. AI Case Assessment CTA */}
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

      {/* 17. FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Frequently Asked Questions</SectionHeading>
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

      {/* 18. Related Countries */}
      {data.relatedCountries.length > 0 && (
        <section className="bg-gray-950 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Related Country Guides</SectionHeading>
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

      {/* 19. Legal Disclaimer */}
      <section className="bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/30 border border-amber-600/30 rounded-xl p-5">
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong className="font-semibold">Legal Disclaimer:</strong> The information on
              this page is provided for general informational purposes only and does not constitute
              legal advice. Laws, policies, and conditions change frequently. Nothing on this page
              creates an attorney-client relationship. We use language like "may," "might," and
              "could" intentionally — individual circumstances vary greatly and eligibility for any
              program or service depends on specific facts. Always consult a licensed attorney for
              legal advice specific to your situation. Deported Not Defeated is not a law firm.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
