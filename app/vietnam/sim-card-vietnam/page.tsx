import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in Vietnam | Viettel, Mobifone, Vinaphone",
  description: "Best SIM cards in Vietnam for deportees — Viettel, Mobifone, Vinaphone comparison, data plans, and where to buy in Ho Chi Minh City.",
};

const carriers = [
  { name: "Viettel", bestFor: "Best overall", coverage: "Nationwide, strongest rural", starter: "50,000–100,000 VND", data: "10GB for 50,000 VND/month", verdict: "Best choice for most people" },
  { name: "Mobifone", bestFor: "Urban data speed", coverage: "Excellent in HCMC and Hanoi", starter: "70,000 VND", data: "10GB for 70,000 VND/month", verdict: "Great second option" },
  { name: "Vinaphone", bestFor: "State carrier reliability", coverage: "Good nationwide", starter: "50,000 VND", data: "Comparable to Viettel", verdict: "Less common but solid" },
];

export default function VietnamSimCardPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Get a SIM Card in Vietnam</h1>
          <p className="text-xl text-gray-300">Vietnam has excellent 4G coverage and very cheap data. A SIM card with 10GB of data costs less than $3 USD. Buy one the moment you land.</p>
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
              <li>• <strong className="text-white">Tan Son Nhat Airport (HCMC):</strong> Viettel and Mobifone kiosks in arrivals — open 24 hours</li>
              <li>• <strong className="text-white">Carrier stores:</strong> Viettel, Mobifone, and Vinaphone have shops in every district</li>
              <li>• <strong className="text-white">Thegioididong.com:</strong> Electronics chain that sells all carriers with setup help</li>
              <li>• <strong className="text-white">Convenience stores:</strong> Top-up cards sold at Co.opmart, Circle K, GS25</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Registration Requirements</h2>
            <p className="text-gray-300 text-sm">Vietnam requires mandatory SIM registration with biometric data. Bring your passport or Vietnamese ID. This is done at the point of sale. Unregistered SIMs are blocked after a short period.</p>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Essential Apps to Download</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">Grab:</strong> Taxis and food delivery — use for everything</li>
              <li>• <strong className="text-white">MoMo or ZaloPay:</strong> Digital wallets for payments</li>
              <li>• <strong className="text-white">Zalo:</strong> Vietnam's primary messaging app (not WhatsApp)</li>
              <li>• <strong className="text-white">Chotot:</strong> Classifieds for jobs and housing</li>
              <li>• <strong className="text-white">VPBank NEO or Vietcombank iB@nking:</strong> Mobile banking</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/vietnam/receive-money-usa-to-vietnam" className="text-brand-red hover:underline text-sm">Receive Money from USA →</Link>
            <Link href="/vietnam" className="text-brand-red hover:underline text-sm">← Back to Vietnam Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
