import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Manila After Deportation",
  description: "Guide to affordable housing in Manila, Philippines — transient houses, boarding houses, apartments, and where to look on a tight budget.",
};

export default function PhilippinesHousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Housing in Manila</h1>
          <p className="text-xl text-gray-300">Manila has everything from barangay boarding houses to modern condos. Here is how to find safe, affordable housing fast — even with no local contacts.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Night One: Transient Houses & Budget Hotels</h2>
            <p className="text-gray-300 text-sm mb-3">Transient houses (short-term furnished rentals) are common in Manila. Expect ₱500–1,500/night. Many are family-run and very welcoming. Malate and Ermita in Manila have the most budget options.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Malate (Manila) — budget hotels and transient houses, safe area</li>
              <li>• Cubao (Quezon City) — central, transport hub, affordable options</li>
              <li>• Pasay near NAIA — convenient if you just landed, many budget hotels</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Monthly Budget: What You Can Afford</h2>
            <div className="grid gap-4">
              {[
                { tier: "Survival Budget", price: "₱3,000–6,000/month ($54–107)", desc: "Boarding house room (bedspace) in Quezon City, Caloocan, or Pasay. Shared bathroom and kitchen. Common in student areas." },
                { tier: "Stable Budget", price: "₱6,000–15,000/month ($107–268)", desc: "Private room in a boarding house with private bathroom, WiFi, and AC. Mandaluyong, Makati, or Quezon City." },
                { tier: "Comfortable Budget", price: "₱15,000–35,000/month ($268–625)", desc: "Studio or 1BR condo unit. BGC, Makati, or Ortigas area. Includes security, amenities, modern building." },
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
              <li>• <strong className="text-white">Facebook Marketplace:</strong> Search "bedspace Manila" or "room for rent QC" — huge selection</li>
              <li>• <strong className="text-white">Lamudi.com.ph:</strong> Philippine real estate listings with maps and photos</li>
              <li>• <strong className="text-white">OLX Philippines:</strong> Classifieds for rooms, boarding houses, condos</li>
              <li>• <strong className="text-white">Your barangay:</strong> Barangay halls often know of room openings in the neighborhood</li>
              <li>• <strong className="text-white">Walk the area:</strong> Signs saying "Room for Rent" or "Bedspace Available" are everywhere in residential areas</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Know Before Signing</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Most boarding houses ask for 1 month deposit + 1 month advance</li>
              <li>• Electricity is usually included in boarding house rates — confirm before moving in</li>
              <li>• Condos charge electricity at Meralco rate (~₱11/kWh) plus maintenance fees</li>
              <li>• Barangay clearance may be required to register your residence</li>
              <li>• English contracts are standard — read before signing</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/philippines/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days Checklist</Link>
            <Link href="/philippines/cost-of-living-manila" className="text-brand-red hover:underline text-sm">Cost of Living →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
