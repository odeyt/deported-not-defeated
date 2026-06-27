import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Guatemala City After Deportation",
  description: "Guide to affordable housing in Guatemala City — cuartos, colonias, apartments, and what to expect on a tight budget as a deportee.",
};

export default function GuatemalaHousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Housing in Guatemala City</h1>
          <p className="text-xl text-gray-300">Guatemala City has a range of housing from very basic rooms to modern apartments. Here is how to find a safe, affordable place quickly.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Night One: Budget Hotels & Pensiones</h2>
            <p className="text-gray-300 text-sm mb-3">Budget hotels and pensiones start at Q150–300/night ($20–40). Zone 1 (historic center) has the most affordable options. Zones 4, 9, and 10 are safer and more modern but pricier.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Zone 1 (Centro Histórico) — most affordable, busiest, some rough spots at night</li>
              <li>• Zone 4 — central, mixed, improving — reasonable budget options</li>
              <li>• Zone 10 (Zona Viva) — safest, most expensive — for when you have more budget</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Monthly Budget: What You Can Afford</h2>
            <div className="grid gap-4">
              {[
                { tier: "Survival Budget", price: "Q1,200–2,500/month ($155–320)", desc: "Shared room or basic cuarto in Zones 3, 6, or 18. Very minimal amenities. Common in working-class colonias." },
                { tier: "Stable Budget", price: "Q2,500–5,000/month ($320–640)", desc: "Private furnished room with WiFi in Zones 7, 11, or 12. Good access to transport and markets." },
                { tier: "Comfortable Budget", price: "Q5,000–10,000/month ($640–1,280)", desc: "1BR apartment in Zone 10, 14, or 15. Modern building, security, parking." },
              ].map((row) => (
                <div key={row.tier} className="bg-navy-800 rounded-xl p-5">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-white">{row.tier}</span>
                    <span className="text-brand-red font-bold">{row.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">How to Find a Room</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">Facebook Marketplace:</strong> Search "cuarto en alquiler Guatemala" — by far the largest selection</li>
              <li>• <strong className="text-white">Encuentra24.com:</strong> Guatemala's major classifieds platform</li>
              <li>• <strong className="text-white">OLX Guatemala:</strong> Classifieds for rooms and apartments</li>
              <li>• <strong className="text-white">Casa del Migrante:</strong> May have referrals to housing for returnees</li>
              <li>• <strong className="text-white">Walk the colonias:</strong> Signs saying "Se Arrienda" or "Se Alquila" are on most residential streets</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Know Before Signing</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• DPI (national ID) or passport required by landlords</li>
              <li>• Month-to-month contracts are common for rooms</li>
              <li>• EEGSA or Energuate handle electricity — billed separately from rent</li>
              <li>• Water (EMPAGUA in Guatemala City) is usually Q50–150/month extra</li>
              <li>• Zone safety: stick to Zones 4, 7, 9, 10, 11, 12, 13, 14, 15 until you know the city</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/guatemala/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days Checklist</Link>
            <Link href="/guatemala/cost-of-living-guatemala-city" className="text-brand-red hover:underline text-sm">Cost of Living →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
