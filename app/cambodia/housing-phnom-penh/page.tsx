import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Phnom Penh After Deportation",
  description: "Guide to affordable housing in Phnom Penh, Cambodia — guesthouses, rooms, apartments, Facebook groups, and what to expect on a tight budget.",
};

export default function CambodiaHousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Housing in Phnom Penh</h1>
          <p className="text-xl text-gray-300">From emergency guesthouses to monthly rooms — here is what to expect and how to find your first stable place to stay.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Night One: Emergency Guesthouses</h2>
            <p className="text-gray-300 text-sm mb-3">If you have nothing arranged, head to the BKK1 or Riverside area in Phnom Penh. Budget guesthouses charge $10–20/night and accept cash. No ID required at most.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Riverside (Sisowath Quay area) — tourist-friendly, safe, many options</li>
              <li>• BKK1 neighborhood — central, slightly more expensive but cleaner</li>
              <li>• Toul Tompoung — Khmer-heavy area, very cheap local guesthouses</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Monthly Budget: What You Can Afford</h2>
            <div className="grid gap-4">
              {[
                { tier: "Survival Budget", price: "$80–150/month", desc: "Shared room or basic single near Toul Tompoung, Boeung Keng Kang, or Olympic Market area. Fan only, shared bathroom." },
                { tier: "Stable Budget", price: "$150–300/month", desc: "Private furnished room with AC, private bathroom, and WiFi. BKK1, Tuol Sleng, or Daun Penh areas." },
                { tier: "Comfortable Budget", price: "$300–600/month", desc: "Studio or 1BR apartment with AC, kitchen access, security guard. Expat-friendly neighborhoods." },
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
              <li>• <strong className="text-white">Facebook Groups:</strong> Search "Phnom Penh Rooms for Rent" or "Cambodia Expat Housing" — most landlords post here</li>
              <li>• <strong className="text-white">Khmer24.com:</strong> Cambodia's biggest classifieds site — rooms, houses, and apartments</li>
              <li>• <strong className="text-white">Walk the streets:</strong> Signs in Khmer saying "ជួល" (rent) are common in residential areas</li>
              <li>• <strong className="text-white">Ask your guesthouse:</strong> Many guesthouse owners know landlords nearby</li>
              <li>• <strong className="text-white">NGO referrals:</strong> Caritas and Don Bosco sometimes have connections to safe housing</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Know Before Signing</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Most leases are month-to-month or 6-month contracts — no deposit required at the cheapest places</li>
              <li>• Utility bills (electricity ~$0.15–0.20/kWh) are often billed separately</li>
              <li>• USD is widely accepted — most landlords quote in USD</li>
              <li>• Always see the room before paying — photos online may be outdated</li>
              <li>• Negotiate — landlords often accept lower rent for 3+ month commitments</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/cambodia/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days Checklist</Link>
            <Link href="/cambodia/cost-of-living-phnom-penh" className="text-brand-red hover:underline text-sm">Cost of Living →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
