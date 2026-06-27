import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in Mexico | Telcel, AT&T, Movistar",
  description: "Best SIM cards in Mexico — Telcel, AT&T, Movistar comparison, data plans, and where to buy for deportees in Mexico City and beyond.",
};

const carriers = [
  { name: "Telcel", bestFor: "Best overall", coverage: "Widest nationwide — 90%+ of territory", starter: "$50–100 MXN", data: "5GB for $100 MXN/month (Amigo plan)", verdict: "Best choice for most people" },
  { name: "AT&T Mexico", bestFor: "Unlimited data", coverage: "Good in cities — weaker rural", starter: "$100–150 MXN", data: "Unlimited plans from $300 MXN/month", verdict: "Great if you use a lot of data" },
  { name: "Movistar", bestFor: "Budget voice", coverage: "Urban areas — limited rural", starter: "$50 MXN", data: "Smaller bundles", verdict: "Budget option for light users" },
];

export default function MexicoSimCardPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Get a SIM Card in Mexico</h1>
          <p className="text-xl text-gray-300">Mexico has strong 4G coverage in cities. Telcel is the dominant carrier — buy a SIM at the airport or any OXXO convenience store on your first day.</p>
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
              <li>• <strong className="text-white">OXXO stores:</strong> Everywhere — sell Telcel, AT&T, and Movistar SIMs and top-up</li>
              <li>• <strong className="text-white">Mexico City Airport (AICM):</strong> Telcel and AT&T kiosks in arrivals halls</li>
              <li>• <strong className="text-white">Carrier stores:</strong> Telcel, AT&T, and Movistar have retail stores in every major city</li>
              <li>• <strong className="text-white">Walmart, Soriana, Chedraui:</strong> Electronics sections sell SIM cards</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Registration</h2>
            <p className="text-gray-300 text-sm">Mexico requires SIM registration with a Mexican ID (INE/CURP) or passport for foreigners. This is done at the store. Prepaid (Amigo) plans require no contract — just load credit as needed.</p>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Essential Apps to Download</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">Rappi / DiDi Food:</strong> Food delivery and gig work</li>
              <li>• <strong className="text-white">InDriver or Uber:</strong> Rides in every major city</li>
              <li>• <strong className="text-white">BBVA México or Banorte app:</strong> Mobile banking</li>
              <li>• <strong className="text-white">WhatsApp:</strong> Mexico's primary communication tool</li>
              <li>• <strong className="text-white">OCC Mundial:</strong> Mexico's top job board</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/mexico/receive-money-usa-to-mexico" className="text-brand-red hover:underline text-sm">Receive Money from USA →</Link>
            <Link href="/mexico" className="text-brand-red hover:underline text-sm">← Back to Mexico Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
