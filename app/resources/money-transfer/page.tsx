import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  Globe2,
  Landmark,
  Building2,
  HandCoins,
  WalletCards,
} from "lucide-react";
import { moneyTransferProviders } from "@/data/moneyTransferProviders";

export const metadata: Metadata = {
  title: "Money Transfer Resources for Deportees and Families | Deported Not Defeated",
  description:
    "Educational guide to international money transfer services for deportees and families. Compare cash pickup, bank deposit, and mobile wallet options. We do not process funds.",
  keywords: [
    "money transfer deportees",
    "send money after deportation",
    "cash pickup international",
    "remittance guide deportees",
    "family money transfer",
  ],
};

const ICON_MAP: Record<string, React.ElementType> = {
  RefreshCw,
  Globe2,
  Landmark,
  Building2,
  HandCoins,
  WalletCards,
};

const PRIMARY_SLUGS = ["wise", "remitly", "worldremit", "moneygram", "western-union", "ria", "xe", "ofx", "paysend", "xoom", "payoneer", "instarem"];

const primaryProviders = moneyTransferProviders.filter((p) =>
  PRIMARY_SLUGS.includes(p.slug)
);

export default function MoneyTransferPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            ← All Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Money Transfer Resources for Deportees and Families
          </h1>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Educational guides to international money transfer services. Compare options for cash pickup, bank deposit, and mobile wallet by country. This site does not send, hold, or process money.
          </p>
          <Link
            href="/resources/money-transfer/compare"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            See Full Comparison <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Disclosure */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-800 text-sm">
            <strong>Disclosure:</strong> Some links may be affiliate links. We may earn a commission if you use them, at no extra cost to you. We do not provide money transfer services and do not process funds.
          </p>
        </div>
      </div>

      {/* Provider cards */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-navy-800">Primary Transfer Services</h2>
          <Link href="/resources/money-transfer/compare" className="text-brand-red font-bold text-sm hover:underline flex items-center gap-1">
            Compare all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {primaryProviders.map((p) => {
            const Icon = ICON_MAP[p.icon] ?? Globe2;
            return (
              <div key={p.slug} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800">{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{p.shortDescription}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {p.cashPickup === "Yes" && (
                    <span className="text-xs bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5">Cash Pickup</span>
                  )}
                  {p.bankRequired !== "No" && (
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2 py-0.5">Bank Deposit</span>
                  )}
                  {p.mobileWallet !== "No" && (
                    <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-2 py-0.5">Mobile Wallet</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <ExternalLink size={13} />
                    Visit Official Website
                  </a>
                  <Link
                    href={p.guideUrl}
                    className="text-center border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Provider Guide
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compare CTA */}
      <section className="bg-navy-800 py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Compare All 21 Providers</h2>
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            Filter by country, payout method, speed, and bank requirements to find options that may work for your situation.
          </p>
          <Link
            href="/resources/money-transfer/compare"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            See Full Comparison <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-10 px-4 max-w-4xl mx-auto space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-gray-700">
          <strong className="text-amber-800">Affiliate Disclosure: </strong>
          Some links may be affiliate links. We may earn a commission if you use them, at no extra cost to you. We do not provide money transfer services and do not process funds.
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
          <strong className="text-blue-800">Financial Safety: </strong>
          Availability, fees, exchange rates, delivery times, and payout methods vary by country and provider. Always confirm directly with the licensed provider before sending money.
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-gray-700 flex gap-3 items-start">
          <AlertTriangle size={15} className="text-red-600 shrink-0 mt-0.5" />
          <span>
            <strong className="text-red-700">Anti-Scam Warning: </strong>
            Never send money to someone you do not know personally. Beware of romance scams, fake immigration help, job scams, and urgent family emergency scams.
          </span>
        </div>
      </section>
    </main>
  );
}
