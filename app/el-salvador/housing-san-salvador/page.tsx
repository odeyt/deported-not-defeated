import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in San Salvador After Deportation",
  description: "Guide to affordable housing in San Salvador, El Salvador — rooms, colonias, apartments, and what to expect on a tight budget as a deportee.",
};

export default function ElSalvadorHousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Housing in San Salvador</h1>
          <p className="text-xl text-gray-300">El Salvador uses USD — no currency conversion needed. Here is what housing costs and how to find a safe, affordable place to land.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Night One: Budget Hotels & Hospedajes</h2>
            <p className="text-gray-300 text-sm mb-3">Budget hospedajes (guesthouses) in San Salvador run $15–40/night. The Colonia Escalón and Santa Elena areas are safer for newcomers. Avoid downtown San Salvador at night until you know the city well.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Colonia Escalón — upscale area, some budget options, safer</li>
              <li>• Santa Elena — business district, mid-range hotels nearby</li>
              <li>• San Benito — close to restaurants, embassies, and services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Monthly Budget: What You Can Afford</h2>
            <div className="grid gap-4">
              {[
                { tier: "Survival Budget", price: "$100–200/month", desc: "Shared room or pieza (single room) in residential colonias like Mejicanos, Apopa, or Soyapango. Very basic amenities." },
                { tier: "Stable Budget", price: "$200–400/month", desc: "Private furnished room with bathroom, WiFi. Colonias San Benito, Miramonte, or Flor Blanca." },
                { tier: "Comfortable Budget", price: "$400–800/month", desc: "1BR apartment or casita. Escalón, Santa Elena, or San Benito. Includes parking and security." },
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
              <li>• <strong className="text-white">Facebook Marketplace:</strong> Search "cuarto en alquiler San Salvador" — large selection</li>
              <li>• <strong className="text-white">OLX El Salvador:</strong> Classifieds including rooms and apartments</li>
              <li>• <strong className="text-white">Walk the colonia:</strong> Signs saying "Se Alquila" are common in residential streets</li>
              <li>• <strong className="text-white">Casa del Migrante:</strong> May have referrals to safe, affordable housing for returnees</li>
              <li>• <strong className="text-white">Church networks:</strong> Catholic parishes often know landlords willing to help returnees</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Know Before Signing</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• DUI (national ID) required by most landlords</li>
              <li>• Month-to-month contracts are the norm at the budget level</li>
              <li>• CAESS handles electricity (CEL for other areas) — bills are separate from rent</li>
              <li>• Water bills (ANDA) are usually $3–10/month in a basic unit</li>
              <li>• Security: choose colonias with visible community presence and lighting</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/el-salvador/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days Checklist</Link>
            <Link href="/el-salvador/cost-of-living-san-salvador" className="text-brand-red hover:underline text-sm">Cost of Living →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
