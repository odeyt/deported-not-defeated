"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  XCircle,
  MinusCircle,
  RefreshCw,
  Globe2,
  Landmark,
  Building2,
  HandCoins,
  WalletCards,
  Smartphone,
} from "lucide-react";
import {
  moneyTransferProviders,
  receiveCountries,
  payoutMethodOptions,
  bankRequiredOptions,
  type MoneyTransferProvider,
} from "@/data/moneyTransferProviders";

const ICON_MAP: Record<string, React.ElementType> = {
  RefreshCw,
  Globe2,
  Landmark,
  Building2,
  HandCoins,
  WalletCards,
  Smartphone,
};

function ProviderIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Globe2;
  return <Icon size={20} className="text-brand-red" />;
}

function YesNoVaries({ value }: { value: "Yes" | "No" | "Varies" }) {
  if (value === "Yes")
    return (
      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
        <CheckCircle size={12} /> Yes
      </span>
    );
  if (value === "No")
    return (
      <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-medium">
        <XCircle size={12} /> No
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
      <MinusCircle size={12} /> Varies
    </span>
  );
}

function ProviderCard({ provider }: { provider: MoneyTransferProvider }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
          <ProviderIcon name={provider.icon} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-navy-800 text-base leading-tight">{provider.name}</h3>
          <span className="inline-block text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 mt-1">
            {provider.category}
          </span>
        </div>
      </div>

      {/* Best For */}
      <p className="text-gray-500 text-xs italic leading-relaxed">{provider.bestFor}</p>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed">{provider.shortDescription}</p>

      {/* Payout method indicators */}
      <div className="grid grid-cols-3 gap-2 border border-gray-100 rounded-xl p-3 bg-gray-50">
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Cash Pickup</p>
          <YesNoVaries value={provider.cashPickup} />
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Bank Deposit</p>
          <YesNoVaries value={provider.bankRequired} />
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Mobile Wallet</p>
          <YesNoVaries value={provider.mobileWallet} />
        </div>
      </div>

      {/* Speed + Bank Required */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2 py-0.5">
          Speed: {provider.speed}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
          Bank Required: {provider.bankRequired}
        </span>
      </div>

      {/* Countries Focus */}
      <div className="flex flex-wrap gap-1">
        {provider.countriesFocus.slice(0, 4).map((c) => (
          <span key={c} className="text-xs bg-navy-800/10 text-navy-800 rounded-full px-2 py-0.5">
            {c}
          </span>
        ))}
        {provider.countriesFocus.length > 4 && (
          <span className="text-xs text-gray-400 px-1 py-0.5">
            +{provider.countriesFocus.length - 4} more
          </span>
        )}
      </div>

      {/* Caution */}
      <div className="flex gap-2 items-start bg-amber-50 border border-amber-100 rounded-xl p-3">
        <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-amber-800 text-xs leading-relaxed">{provider.caution}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-auto">
        <a
          href={provider.affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <ExternalLink size={14} />
          Visit Official Website
        </a>
        <Link
          href={provider.guideUrl}
          className="flex items-center justify-center gap-2 border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          Provider Guide
        </Link>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "What is the best way to receive money after deportation?",
    a: "The best method depends on your country, your access to banking, and the provider options available. Cash pickup may be more practical where banking access is limited. Bank deposit may be faster and cheaper where banking infrastructure exists. Always compare fees, exchange rates, and pickup availability directly with the provider.",
  },
  {
    q: "Can I receive money without a bank account?",
    a: "Yes, cash pickup is available through providers like MoneyGram, Western Union, and Ria in many countries. Confirm pickup agent locations for your specific area and bring valid government-issued ID.",
  },
  {
    q: "Are money transfer fees the same for every country?",
    a: "No. Fees, exchange rates, and delivery speeds vary significantly by provider and destination country. Always compare multiple options and confirm the exact cost before sending.",
  },
  {
    q: "Is cash pickup safer than bank deposit?",
    a: "Both methods can be safe when using licensed, reputable providers. Cash pickup requires the recipient to present valid ID at an agent location. Bank deposit goes directly to a bank account. Choose based on your family's access to banking and proximity to pickup locations.",
  },
  {
    q: "Does this website process money transfers?",
    a: "No. Deported Not Defeated does not process, hold, send, or receive money. We provide educational information and links to third-party licensed providers. Always use the official website of any provider you choose.",
  },
];

export default function CompareMoneyTransfer() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("Any");
  const [payoutMethod, setPayoutMethod] = useState("Any");
  const [bankRequired, setBankRequired] = useState("Any");

  const filtered = useMemo(() => {
    return moneyTransferProviders.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (country !== "Any" && !p.countriesFocus.some((c) => c.toLowerCase() === country.toLowerCase())) return false;
      if (payoutMethod !== "Any") {
        if (payoutMethod === "Cash Pickup" && p.cashPickup === "No") return false;
        if (payoutMethod === "Bank Deposit" && p.bankRequired === "No") return false;
        if (payoutMethod === "Mobile Wallet" && p.mobileWallet === "No") return false;
        if (payoutMethod === "Multi-Currency Account" && !p.payoutMethods.some((m) => m.includes("Multi-Currency"))) return false;
        if (payoutMethod === "Card Deposit" && !p.payoutMethods.some((m) => m.toLowerCase().includes("card"))) return false;
      }
      if (bankRequired !== "Any" && p.bankRequired !== bankRequired) return false;
      return true;
    });
  }, [search, country, payoutMethod, bankRequired]);

  const clearFilters = () => {
    setSearch("");
    setCountry("Any");
    setPayoutMethod("Any");
    setBankRequired("Any");
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources/money-transfer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            ← Money Transfer Resources
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Compare Money Transfer Services</h1>
          <p className="text-gray-300 text-lg mb-6">
            Find transfer options by country, payout method, speed, and bank requirements.
          </p>

          {/* Disclosure */}
          <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl p-4">
            <p className="text-amber-200 text-sm leading-relaxed">
              <strong>Disclosure:</strong> Some links may be affiliate links. We may earn a commission if you use them, at no extra cost to you. We do not provide money transfer services and do not process funds.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-end">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search provider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-800"
            />
          </div>

          {/* Country */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="flex-1 min-w-[140px] text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-800 bg-white"
          >
            <option value="Any">Any Country</option>
            {receiveCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Payout method */}
          <select
            value={payoutMethod}
            onChange={(e) => setPayoutMethod(e.target.value)}
            className="flex-1 min-w-[140px] text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-800 bg-white"
          >
            {payoutMethodOptions.map((o) => (
              <option key={o} value={o}>{o === "Any" ? "Any Payout Method" : o}</option>
            ))}
          </select>

          {/* Bank required */}
          <select
            value={bankRequired}
            onChange={(e) => setBankRequired(e.target.value)}
            className="flex-1 min-w-[130px] text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-800 bg-white"
          >
            {bankRequiredOptions.map((o) => (
              <option key={o} value={o}>{o === "Any" ? "Bank Required: Any" : `Bank Required: ${o}`}</option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-navy-800 font-medium px-3 py-2 rounded-lg border border-gray-200 hover:border-navy-800 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-sm text-gray-500">
          Showing <strong>{filtered.length}</strong> of <strong>{moneyTransferProviders.length}</strong> providers
        </p>
      </div>

      {/* Cards grid */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-semibold text-lg">No providers match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-brand-red font-medium hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProviderCard key={p.slug} provider={p} />
            ))}
          </div>
        )}
      </section>

      {/* Disclaimers */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-white border border-amber-200 rounded-xl p-4 text-sm text-gray-600">
            <strong className="text-amber-700">Affiliate Disclosure: </strong>
            Some links may be affiliate links. We may earn a commission if you use them, at no extra cost to you. We do not provide money transfer services and do not process funds.
          </div>
          <div className="bg-white border border-blue-200 rounded-xl p-4 text-sm text-gray-600">
            <strong className="text-blue-700">Financial Safety: </strong>
            Availability, fees, exchange rates, delivery times, and payout methods vary by country and provider. Always confirm directly with the licensed provider before sending money.
          </div>
          <div className="bg-white border border-red-200 rounded-xl p-4 text-sm text-gray-600 flex gap-3 items-start">
            <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-red-700">Anti-Scam Warning: </strong>
              Never send money to someone you do not know personally. Beware of romance scams, fake immigration help, job scams, and urgent family emergency scams.
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-extrabold text-navy-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-navy-800 text-base mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
