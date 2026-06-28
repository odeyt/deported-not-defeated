import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allCountries, countriesBySlug } from "@/data/countries/index";
import type { CountryData } from "@/data/countries/schema";
import { AlertTriangle, ExternalLink } from "lucide-react";
import {
  moneyTransferProviders,
  countryMoneyTransferRecommendations,
} from "@/data/moneyTransferProviders";

interface Props {
  params: { country: string; category: string };
}

const VALID_CATEGORIES = [
  "first-30-days",
  "directory",
  "find-housing",
  "find-work",
  "legal-documents",
  "healthcare",
  "banking-money",
  "phone-internet",
  "transportation",
  "resources",
];

const CATEGORY_META: Record<string, { title: string; icon: string; desc: string }> = {
  "first-30-days":   { title: "Your First 30 Days",  icon: "📋", desc: "Step-by-step checklist for your first month" },
  "directory":       { title: "Business Directory",   icon: "🏢", desc: "Local businesses, services, and organizations" },
  "find-housing":    { title: "Find Housing",         icon: "🏠", desc: "Short-term and long-term housing options" },
  "find-work":       { title: "Find Work",            icon: "💼", desc: "Jobs, income, and employment resources" },
  "legal-documents": { title: "Legal & Documents",    icon: "⚖️", desc: "IDs, passports, visas, and legal rights" },
  "healthcare":      { title: "Healthcare",           icon: "🏥", desc: "Hospitals, clinics, and mental health support" },
  "banking-money":   { title: "Banking & Money",      icon: "💰", desc: "Accounts, transfers, and managing finances" },
  "phone-internet":  { title: "Phone & Internet",     icon: "📱", desc: "SIM cards, data plans, and connectivity" },
  "transportation":  { title: "Transportation",       icon: "🚌", desc: "Getting around and local transit" },
  "resources":       { title: "All Resources",        icon: "📚", desc: "Tools, services, and affiliate resources" },
};

export async function generateStaticParams() {
  return allCountries.flatMap((c) =>
    VALID_CATEGORIES.map((cat) => ({ country: c.slug, category: cat }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = countriesBySlug[params.country];
  if (!data) return {};
  const cat = CATEGORY_META[params.category];
  if (!cat) return {};
  return {
    title: `${cat.title} — ${data.countryName} Guide | Deported Not Defeated`,
    description: `${cat.title} guide for deportees in ${data.countryName}. ${cat.desc}. Educational information for rebuilding your life.`,
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="text-brand-red mt-1 flex-shrink-0">▸</span>
          <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContentCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 border border-white/10 rounded-xl p-5 md:p-6">
      {title && <h3 className="text-white font-semibold text-base mb-4">{title}</h3>}
      {children}
    </div>
  );
}

const WEEK_GROUPS = [
  { label: "Days 1–3: Land Safe",          color: "border-red-500",    bg: "bg-red-950/40"    },
  { label: "Days 4–7: Get Connected",      color: "border-orange-500", bg: "bg-orange-950/40" },
  { label: "Week 2: Documents & Stability",color: "border-yellow-500", bg: "bg-yellow-950/40" },
  { label: "Week 3–4: Start Rebuilding",   color: "border-green-500",  bg: "bg-green-950/40"  },
];

function FirstThirtyDaysContent({ items }: { items: string[] }) {
  const groups: string[][] = [
    items.slice(0, 2),
    items.slice(2, 4),
    items.slice(4, 6),
    items.slice(6),
  ].filter((g) => g.length > 0);

  return (
    <div className="space-y-4">
      {groups.map((group, gi) => {
        const week = WEEK_GROUPS[gi] ?? WEEK_GROUPS[3];
        return (
          <div
            key={gi}
            className={`border-l-4 ${week.color} ${week.bg} rounded-r-xl p-4 md:p-5`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              {week.label}
            </p>
            <ul className="space-y-3">
              {group.map((item, ii) => (
                <li key={ii} className="flex gap-3 items-start">
                  <span className="text-brand-red mt-1 flex-shrink-0 font-bold">
                    {gi * 2 + ii + 1}.
                  </span>
                  <span className="text-gray-200 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function DirectoryContent({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => {
        const [name, ...rest] = item.split(" — ");
        const description = rest.join(" — ");
        return (
          <div
            key={i}
            className="bg-gray-800 border border-white/10 rounded-xl p-4 flex items-start gap-3"
          >
            <span className="text-2xl flex-shrink-0">🏢</span>
            <div>
              <p className="text-white font-semibold text-sm">{name}</p>
              {description && (
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const DEFAULT_MONEY_SLUGS = ["wise", "remitly", "moneygram", "western-union", "worldremit", "ria"];

function MoneyTransferCards({ slugs }: { slugs: string[] }) {
  const providers = moneyTransferProviders.filter((p) => slugs.includes(p.slug));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {providers.map((p) => (
        <div key={p.slug} className="bg-gray-800 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 transition-colors">
          <div>
            <p className="text-white font-semibold text-sm">{p.name}</p>
            <p className="text-gray-400 text-xs">{p.bestFor}</p>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">{p.shortDescription}</p>
          <div className="flex gap-2 mt-auto flex-wrap">
            {p.cashPickup === "Yes" && (
              <span className="text-xs bg-green-900/40 text-green-300 border border-green-700/30 rounded-full px-2 py-0.5">Cash Pickup</span>
            )}
            {p.bankRequired !== "No" && (
              <span className="text-xs bg-blue-900/40 text-blue-300 border border-blue-700/30 rounded-full px-2 py-0.5">Bank Deposit</span>
            )}
          </div>
          <a
            href={p.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex items-center gap-1 text-xs text-brand-red hover:text-red-400 font-semibold transition-colors"
          >
            <ExternalLink size={11} /> Visit Official Website
          </a>
        </div>
      ))}
    </div>
  );
}

function AffiliateCards() {
  return <MoneyTransferCards slugs={DEFAULT_MONEY_SLUGS} />;
}

function CategoryContent({
  category,
  data,
}: {
  category: string;
  data: CountryData;
}) {
  switch (category) {
    case "first-30-days":
      if (!data.firstThirtyDays || data.firstThirtyDays.length === 0) {
        return <BulletList items={data.returningHome} />;
      }
      return <FirstThirtyDaysContent items={data.firstThirtyDays} />;

    case "directory":
      if (!data.businessDirectory || data.businessDirectory.length === 0) {
        return (
          <p className="text-gray-400 text-sm">
            Business directory information is being compiled for {data.countryName}. Check back soon.
          </p>
        );
      }
      return <DirectoryContent items={data.businessDirectory} />;

    case "find-housing":
      return (
        <div className="space-y-4">
          <ContentCard title="Housing Options">
            <BulletList items={data.housing} />
          </ContentCard>
        </div>
      );

    case "find-work":
      return (
        <div className="space-y-4">
          <ContentCard title="Jobs & Employment">
            <BulletList items={data.jobs} />
          </ContentCard>
        </div>
      );

    case "legal-documents":
      return (
        <div className="space-y-4">
          <ContentCard title="Travel Documents & ID">
            <BulletList items={data.travelDocuments} />
          </ContentCard>
          {data.legalResources.length > 0 && (
            <ContentCard title="Legal Resources">
              <BulletList items={data.legalResources} />
            </ContentCard>
          )}
          <div className="bg-amber-900/30 border border-amber-600/30 rounded-xl p-4">
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong>U.S. Embassy:</strong> {data.embassyInfo}
            </p>
          </div>
        </div>
      );

    case "healthcare":
      return (
        <div className="space-y-4">
          <ContentCard title="Healthcare">
            <BulletList items={data.healthcare} />
          </ContentCard>
          {data.mentalHealth.length > 0 && (
            <ContentCard title="Mental Health Support">
              <BulletList items={data.mentalHealth} />
            </ContentCard>
          )}
        </div>
      );

    case "banking-money": {
      const rec = countryMoneyTransferRecommendations[data.slug];
      return (
        <div className="space-y-6">
          {/* Disclosure */}
          <div className="bg-amber-900/30 border border-amber-600/30 rounded-xl p-4">
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong>Disclosure:</strong> Some links may be affiliate links. We may earn a commission if you use them, at no extra cost to you. We do not provide money transfer services and do not process funds.
            </p>
          </div>

          {/* Country-specific context */}
          {rec ? (
            <>
              <ContentCard title={rec.headline}>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{rec.context}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wide">Best Cash Pickup</p>
                    <p className="text-gray-200 text-xs">{rec.bestCashPickup}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wide">Best Bank Deposit</p>
                    <p className="text-gray-200 text-xs">{rec.bestBankDeposit}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wide">Best for Families</p>
                    <p className="text-gray-200 text-xs">{rec.bestForFamilies}</p>
                  </div>
                </div>
              </ContentCard>

              <ContentCard title="Things to Check Before Sending">
                <ul className="space-y-2">
                  {rec.thingsToCheck.map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-gray-300">
                      <span className="text-brand-red mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ContentCard>

              <div>
                <h3 className="text-white font-semibold text-base mb-3">Recommended Options for {data.countryName}</h3>
                <MoneyTransferCards slugs={rec.recommendedSlugs} />
              </div>
            </>
          ) : (
            <>
              <ContentCard title="Banking & Receiving Money">
                <BulletList items={data.moneyTransfer} />
              </ContentCard>
              <div>
                <h3 className="text-white font-semibold text-base mb-3">Common Transfer Services</h3>
                <AffiliateCards />
              </div>
            </>
          )}

          {/* General money info from country data */}
          {rec && data.moneyTransfer.length > 0 && (
            <ContentCard title="Local Banking Context">
              <BulletList items={data.moneyTransfer} />
            </ContentCard>
          )}

          {/* Financial safety disclaimer */}
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4">
            <p className="text-blue-200 text-xs leading-relaxed">
              <strong>Financial Safety:</strong> Availability, fees, exchange rates, delivery times, and payout methods vary by country and provider. Always confirm directly with the licensed provider before sending money.
            </p>
          </div>

          {/* Anti-scam */}
          <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-4 flex gap-3 items-start">
            <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-200 text-xs leading-relaxed">
              <strong>Anti-Scam Warning:</strong> Never send money to someone you do not know personally. Beware of romance scams, fake immigration help, job scams, and urgent family emergency scams.
            </p>
          </div>

          {/* Compare link */}
          <div className="bg-gray-800 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-white font-semibold text-sm mb-2">Compare all money transfer options</p>
            <Link
              href="/resources/money-transfer/compare"
              className="inline-flex items-center gap-1 bg-brand-red hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={12} /> Compare Providers
            </Link>
          </div>
        </div>
      );
    }

    case "phone-internet":
      return (
        <div className="space-y-4">
          <ContentCard title="Phone & Internet">
            <BulletList items={data.phoneInternet} />
          </ContentCard>
        </div>
      );

    case "transportation":
      return (
        <div className="space-y-4">
          <ContentCard title="Getting Around">
            <BulletList items={data.transportation} />
          </ContentCard>
        </div>
      );

    case "resources":
      return (
        <div className="space-y-6">
          <AffiliateCards />
          <p className="text-gray-500 text-xs">
            Disclosure: Some links may be affiliate links. We only recommend services we believe
            are useful for deportees.
          </p>
          {data.reentryInfo.length > 0 && (
            <ContentCard title="U.S. Reentry Education">
              <BulletList items={data.reentryInfo} />
            </ContentCard>
          )}
        </div>
      );

    default:
      return null;
  }
}

export default function CategoryPage({ params }: Props) {
  if (!VALID_CATEGORIES.includes(params.category)) notFound();

  const data = countriesBySlug[params.country];
  if (!data) notFound();

  const meta = CATEGORY_META[params.category];

  return (
    <main className="bg-gray-950 text-white">
      {/* Hero */}
      <section className="bg-navy-800 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${data.slug}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            ← Back to {data.countryName} Guide
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{data.flagEmoji}</span>
            <span className="text-4xl">{meta.icon}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {meta.title}
          </h1>
          <p className="text-gray-300 text-lg">
            {data.countryName} — {meta.desc}
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-900/20 border-b border-amber-700/20 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-300 text-xs">
            <strong>Educational information only — not legal advice.</strong> Verify all details
            with official sources. Laws and conditions change frequently.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <CategoryContent category={params.category} data={data} />
        </div>
      </section>

      {/* AI CTA */}
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

      {/* Related Categories */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-white mb-4">More {data.countryName} Guides</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_META)
              .filter(([slug]) => slug !== params.category)
              .map(([slug, cat]) => (
                <Link
                  key={slug}
                  href={`/${data.slug}/${slug}`}
                  className="bg-gray-800 border border-white/10 hover:border-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-900/30 border border-amber-600/30 rounded-xl p-5">
            <p className="text-amber-200 text-xs leading-relaxed">
              <strong className="font-semibold">Legal Disclaimer:</strong> The information on
              this page is provided for general informational purposes only and does not constitute
              legal advice. Laws, policies, and conditions change frequently. Nothing on this page
              creates an attorney-client relationship. Always consult a licensed attorney for legal
              advice specific to your situation. Deported Not Defeated is not a law firm.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
