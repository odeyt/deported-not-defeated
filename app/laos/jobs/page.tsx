import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Work in Laos After Deportation",
  description: "Jobs, freelance work, and small business ideas for people rebuilding life in Laos.",
};

export default function JobsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">💼 Find Work in Laos</h1>
          <p className="text-gray-300 text-lg">Income gives you options. Here is how to start earning.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-red text-white rounded-2xl p-6 mb-8 text-center">
            <p className="font-bold text-lg">Your English is an asset in Laos.</p>
            <p className="text-red-200 text-sm mt-1">Most returnees speak English fluently. That opens doors most locals do not have.</p>
          </div>

          <h2 className="text-2xl font-bold text-navy-800 mb-4">Quick Income Ideas</h2>
          <div className="space-y-3 mb-8">
            {[
              ["English Tutoring", "Teach English to locals. $5–15/hour. No degree required to start."],
              ["Delivery / Driving", "Food delivery apps, motorbike taxi. Start earning day one."],
              ["Translation", "English-Lao translation for businesses, tourists, or NGOs."],
              ["Market Sales", "Sell food, goods, or handicrafts at local markets."],
              ["Day Labor", "Construction, farming, or warehouse work in cities."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3">
                <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                <div><p className="font-semibold text-navy-800">{title}</p><p className="text-gray-600 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-navy-800 mb-4">Longer-Term Work</h2>
          <div className="space-y-3 mb-8">
            {[
              ["NGO / Nonprofit Work", "Many international NGOs in Laos hire English speakers."],
              ["Tourism Industry", "Hotels, tour guides, and guesthouses always need English staff."],
              ["Online Freelancing", "Upwork, Fiverr — design, writing, virtual assistant work."],
              ["Small Business", "Open a food stall, repair shop, or service business."],
              ["Teaching at a Language School", "Language schools actively recruit fluent English speakers."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3">
                <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                <div><p className="font-semibold text-navy-800">{title}</p><p className="text-gray-600 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>

          <Link href="/laos/directory" className="inline-block bg-navy-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-700 transition-colors">
            Find Jobs in Directory →
          </Link>
        </div>
      </section>
    </>
  );
}
