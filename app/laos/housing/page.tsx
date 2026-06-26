import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Find Housing in Laos",
  description: "Find affordable housing in Laos as a returnee — guesthouses, apartments, and long-term rentals.",
};

export default function HousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🏠 Find Housing in Laos</h1>
          <p className="text-gray-300 text-lg">Your first night matters. Here is how to find a safe place to sleep.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-navy-800 mb-4">Where to Start</h2>
          <p className="text-gray-600 mb-6">When you first arrive, do not overthink it. A guesthouse is your safest first step. Prices start at $10–20 per night in Vientiane. You can look for longer-term housing once you are stable.</p>

          <h3 className="text-xl font-bold text-navy-800 mb-3">Short-Term Options</h3>
          <ul className="space-y-2 mb-6">
            {["Guesthouses: $10–25/night, usually daily or weekly", "Hostels: $5–15/night, safe and social", "Airbnb-style rentals: $30–60/night, more comfort", "Family or friend stay: Free, reach out first"].map(o => (
              <li key={o} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />{o}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-navy-800 mb-3">Long-Term Rentals</h3>
          <p className="text-gray-600 mb-4">Once you have income or family support, look for monthly rentals. In Vientiane:</p>
          <ul className="space-y-2 mb-6">
            {["Basic room: $100–200/month", "1-bedroom apartment: $200–400/month", "House with yard: $300–600/month", "Most landlords want 1–2 months deposit"].map(o => (
              <li key={o} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />{o}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-navy-800 mb-3">Tips</h3>
          <ul className="space-y-2 mb-8">
            {["Always see the place before paying", "Ask if utilities are included", "Get a written agreement, even informal", "Look in neighborhoods like Phonxay, Sikhottabong, or Sisattanak in Vientiane"].map(t => (
              <li key={t} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />{t}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Housing in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Search our verified listings for housing options across Laos.</p>
            <Link href="/laos/directory" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">Search Directory</Link>
          </div>
        </div>
      </section>
    </>
  );
}
