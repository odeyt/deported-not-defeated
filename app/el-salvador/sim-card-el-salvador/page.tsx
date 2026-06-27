import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in El Salvador | Tigo, Claro, Movistar",
  description: "Best SIM cards in El Salvador — Tigo, Claro, Movistar comparison, data plans, and where to buy for deportees in San Salvador.",
};

const carriers = [
  { name: "Tigo", bestFor: "Best overall", coverage: "Nationwide, best 4G coverage", starter: "$1–5", data: "5GB for $5/month", verdict: "Best choice for most people" },
  { name: "Claro", bestFor: "Voice calls", coverage: "Good nationwide", starter: "$1–3", data: "Smaller bundles, cheaper voice", verdict: "Good secondary option" },
  { name: "Movistar", bestFor: "Budget", coverage: "Urban areas — weaker rural", starter: "$1–2", data: "Light data bundles", verdict: "Budget option for light users" },
];

export default function ElSalvadorSimCardPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Get a SIM Card in El Salvador</h1>
          <p className="text-xl text-gray-300">El Salvador uses USD — SIM cards and data are cheap. Buy a Tigo SIM at the airport or any local store on Day 1. It is your connection to everything.</p>
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
              <li>• <strong className="text-white">El Salvador International Airport (SAL):</strong> Tigo and Claro booths in arrivals</li>
              <li>• <strong className="text-white">Tigo and Claro retail stores:</strong> In every major shopping center and commercial street</li>
              <li>• <strong className="text-white">Supermercados and pharmacies:</strong> Often sell top-up credit cards</li>
              <li>• <strong className="text-white">Despensas and tiendas:</strong> Small shops sell recharge cards in every colonia</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Registration</h2>
            <p className="text-gray-300 text-sm">Bring your DUI (national ID) or passport. SIM registration is required by law. Tigo and Claro stores will register on-site — quick and easy process.</p>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Essential Apps to Download</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">Chivo Wallet:</strong> Official Bitcoin/USD government wallet</li>
              <li>• <strong className="text-white">Tigo Money:</strong> Mobile money transfers</li>
              <li>• <strong className="text-white">Hugo App:</strong> Local food delivery and income opportunity</li>
              <li>• <strong className="text-white">WhatsApp:</strong> Primary communication tool</li>
              <li>• <strong className="text-white">Uber:</strong> Available in San Salvador</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/el-salvador/receive-money-usa-to-el-salvador" className="text-brand-red hover:underline text-sm">Receive Money from USA →</Link>
            <Link href="/el-salvador" className="text-brand-red hover:underline text-sm">← Back to El Salvador Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
