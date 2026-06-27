import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in the Philippines | Globe, Smart, DITO",
  description: "Best SIM cards in the Philippines — Globe, Smart, DITO comparison, data plans, SIM registration law, and where to buy.",
};

const carriers = [
  { name: "Globe", bestFor: "Best data in cities", coverage: "Excellent in Metro Manila, Cebu, Davao", starter: "₱100–300", data: "20GB for ₱299/month", verdict: "Best for mobile data users" },
  { name: "Smart / TNT", bestFor: "Widest overall", coverage: "Strong nationwide including rural", starter: "₱100–300", data: "20GB for ₱299/month", verdict: "Most compatible with rural coverage" },
  { name: "DITO", bestFor: "Budget voice", coverage: "Growing — limited rural coverage", starter: "₱45–99", data: "25GB for ₱199/month", verdict: "Cheapest option in cities" },
];

export default function PhilippinesSimCardPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Get a SIM Card in the Philippines</h1>
          <p className="text-xl text-gray-300">SIM registration is mandatory in the Philippines. You need a valid ID — bring it to the store. The process takes about 10 minutes.</p>
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
            <h2 className="text-xl font-bold text-white mb-3">SIM Registration Law (RA 11934)</h2>
            <p className="text-gray-300 text-sm mb-2">The Philippines requires SIM registration under Republic Act 11934. You must register your SIM with one valid government ID: PSA birth certificate, PhilSys ID, passport, driver's license, or voter's ID.</p>
            <p className="text-gray-300 text-sm">Unregistered SIMs will be deactivated. Complete registration at the carrier store or via their app within 30 days of purchase.</p>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Where to Buy</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">NAIA Airport:</strong> Globe and Smart booths in the arrivals area — all terminals</li>
              <li>• <strong className="text-white">SM, Robinson's, Ayala malls:</strong> Carrier stores with staff who can register your SIM</li>
              <li>• <strong className="text-white">Sari-sari stores:</strong> Small neighborhood stores sell top-up (load) cards</li>
              <li>• <strong className="text-white">7-Eleven:</strong> Load top-up available — not always SIM cards themselves</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Essential Apps to Download</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">GCash:</strong> Most important — digital wallet for everything</li>
              <li>• <strong className="text-white">Maya (PayMaya):</strong> Alternative digital wallet and bank</li>
              <li>• <strong className="text-white">Grab:</strong> Rides and food delivery</li>
              <li>• <strong className="text-white">Viber:</strong> Popular messaging app alongside WhatsApp</li>
              <li>• <strong className="text-white">Jobstreet PH:</strong> Job search</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/philippines/receive-money-usa-to-philippines" className="text-brand-red hover:underline text-sm">Receive Money from USA →</Link>
            <Link href="/philippines" className="text-brand-red hover:underline text-sm">← Back to Philippines Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
