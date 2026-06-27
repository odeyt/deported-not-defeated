import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Laos",
  description: "Find affordable housing in Laos as a returnee — guesthouses, apartments, and long-term rentals.",
};

export default function HousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Laos Guide
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
              <Home size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Housing in Laos</h1>
            <p className="text-gray-300 text-lg">Your first night matters. Here is how to find a safe place to sleep.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-brand-red text-white rounded-2xl p-6 text-center">
            <p className="font-bold text-lg">Do not overthink it on day one.</p>
            <p className="text-red-200 text-sm mt-1">A guesthouse is your safest first step. Stability comes before perfection.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Short-Term Options (First Week)</h2>
            <p className="text-gray-600 mb-4">Prices start at $10–20/night in Vientiane. Find a room first, then look for longer-term housing once you are stable.</p>
            <ul className="space-y-3">
              {[
                ["Guesthouses", "$10–25/night — available everywhere, no commitment"],
                ["Hostels", "$5–15/night — safe, social, good for meeting people"],
                ["Airbnb-style rentals", "$30–60/night — more comfort and privacy"],
                ["Family or friend stay", "Free — reach out immediately if you have anyone here"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />
                  <div><span className="font-semibold text-navy-800">{title}:</span> <span className="text-gray-600 text-sm">{desc}</span></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Long-Term Rentals (Monthly)</h2>
            <p className="text-gray-600 mb-4">Once you have income or family support, monthly rentals are far cheaper than nightly rates.</p>
            <ul className="space-y-3">
              {[
                ["Basic room", "$100–200/month in Vientiane"],
                ["1-bedroom apartment", "$200–400/month — usually furnished"],
                ["House with yard", "$300–600/month — good for families"],
                ["Deposit", "Most landlords want 1–2 months upfront"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />
                  <div><span className="font-semibold text-navy-800">{title}:</span> <span className="text-gray-600 text-sm">{desc}</span></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Best Neighborhoods in Vientiane</h2>
            <ul className="space-y-2">
              {[
                "Phonxay — central, close to markets and banks",
                "Sikhottabong — quiet, affordable, family-friendly",
                "Sisattanak — expat area, English commonly spoken",
                "Xaysetha — good transport links, cheaper rents",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Tips Before You Sign Anything</h2>
            <ul className="space-y-2">
              {[
                "Always view the place before paying",
                "Ask if utilities (water, electricity) are included",
                "Get a written agreement, even an informal one",
                "Check the water pressure, locks, and wifi speed",
                "Ask neighbors about the landlord if possible",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Verified Housing in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Search our verified listings for guesthouses, apartments, and long-term rentals across Laos.</p>
            <Link href="/laos/directory?category=Housing" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">
              Search Housing Listings →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
