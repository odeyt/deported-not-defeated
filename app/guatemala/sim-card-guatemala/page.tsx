import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in Guatemala | Tigo, Claro",
  description: "Best SIM cards in Guatemala — Tigo and Claro comparison, data plans, and where to buy for deportees in Guatemala City.",
};

const carriers = [
  { name: "Tigo", bestFor: "Best overall", coverage: "Nationwide, best 4G coverage", starter: "Q30–50", data: "8GB for Q50/month", verdict: "Best choice for most people" },
  { name: "Claro", bestFor: "Voice calls", coverage: "Good in cities and departments", starter: "Q25–50", data: "Similar bundles to Tigo", verdict: "Good alternative" },
];

export default function GuatemalaSimCardPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Get a SIM Card in Guatemala</h1>
          <p className="text-xl text-gray-300">Guatemala has two main carriers — Tigo and Claro. Tigo has the best coverage. Buy a SIM at the airport or any store on Day 1 — it costs about Q30–50 ($4–6 USD).</p>
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
              <li>• <strong className="text-white">La Aurora Airport (GUA):</strong> Tigo and Claro kiosks in the arrivals hall</li>
              <li>• <strong className="text-white">Tigo and Claro retail stores:</strong> In all major malls and commercial zones</li>
              <li>• <strong className="text-white">Farmacias and tiendas:</strong> Most local stores sell top-up cards (recargas)</li>
              <li>• <strong className="text-white">Supermercados La Torre, Walmart:</strong> Sell SIMs and top-up credit</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Registration</h2>
            <p className="text-gray-300 text-sm">Bring your DPI (national ID) or passport. SIM cards must be registered by law. The store registers on the spot — it takes about 5 minutes. Keep your SIM registration confirmation.</p>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Essential Apps to Download</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">Tigo Money:</strong> Mobile money transfers — very widely used</li>
              <li>• <strong className="text-white">Bi Móvil (Banco Industrial):</strong> Mobile banking app</li>
              <li>• <strong className="text-white">InDriver:</strong> Rides — widely used in Guatemala City</li>
              <li>• <strong className="text-white">Hugo App:</strong> Food delivery and delivery income</li>
              <li>• <strong className="text-white">WhatsApp:</strong> Primary communication tool — essential</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/guatemala/receive-money-usa-to-guatemala" className="text-brand-red hover:underline text-sm">Receive Money from USA →</Link>
            <Link href="/guatemala" className="text-brand-red hover:underline text-sm">← Back to Guatemala Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
