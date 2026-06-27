import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in Cambodia | Best Phone Plans for Deportees",
  description: "Best SIM cards in Cambodia for deportees — Smart, Metfone, CooTel comparison, data plans, and where to buy.",
};

const carriers = [
  { name: "Smart", bestFor: "Best overall", coverage: "Nationwide, best 4G", starter: "5,000–10,000 KHR", data: "5GB for 10,000 KHR/month", verdict: "Best choice for most people" },
  { name: "Metfone", bestFor: "Rural coverage", coverage: "Best in rural provinces", starter: "5,000 KHR", data: "Comparable to Smart", verdict: "Choose if traveling outside cities" },
  { name: "CooTel", bestFor: "Budget calls", coverage: "Urban areas only", starter: "5,000 KHR", data: "Cheaper voice calls", verdict: "Secondary SIM for calls" },
];

export default function CambodiaSimCardPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Get a SIM Card in Cambodia</h1>
          <p className="text-xl text-gray-300">A SIM card is your lifeline. Buy one at the airport on arrival — it takes 5 minutes and costs less than $3 USD.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Carrier Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-navy-800 text-gray-300">
                    <th className="p-3 border border-white/10">Carrier</th>
                    <th className="p-3 border border-white/10">Best For</th>
                    <th className="p-3 border border-white/10">Starter SIM</th>
                    <th className="p-3 border border-white/10">Monthly Data</th>
                  </tr>
                </thead>
                <tbody>
                  {carriers.map((c) => (
                    <tr key={c.name} className="border border-white/10 text-gray-300 hover:bg-white/5">
                      <td className="p-3 font-bold text-white">{c.name}</td>
                      <td className="p-3">{c.bestFor}</td>
                      <td className="p-3">{c.starter}</td>
                      <td className="p-3">{c.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Where to Buy</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">Phnom Penh International Airport:</strong> Smart and Metfone booths in the arrivals hall</li>
              <li>• <strong className="text-white">7-Eleven and convenience stores:</strong> Sell SIMs and top-up cards nationwide</li>
              <li>• <strong className="text-white">Mobile phone shops:</strong> Every market and shopping area has them</li>
              <li>• <strong className="text-white">Street vendors:</strong> Common in central Phnom Penh — look for carrier logos</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Registration Requirements</h2>
            <p className="text-gray-300 text-sm mb-2">Cambodia requires SIM registration with a national ID. If you have a Cambodian passport or ID, bring it. Foreigners can register with a passport. Some vendors sell pre-registered SIMs — this is common but technically unofficial.</p>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Essential Apps to Download</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">ABA Mobile:</strong> Top banking app in Cambodia</li>
              <li>• <strong className="text-white">Wing Money:</strong> For sending and receiving money</li>
              <li>• <strong className="text-white">Grab:</strong> Taxis and food delivery</li>
              <li>• <strong className="text-white">Khmer24:</strong> Jobs and classifieds</li>
              <li>• <strong className="text-white">WhatsApp:</strong> Primary messaging platform</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cambodia/receive-money-usa-to-cambodia" className="text-brand-red hover:underline text-sm">Receive Money from USA →</Link>
            <Link href="/cambodia" className="text-brand-red hover:underline text-sm">← Back to Cambodia Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
