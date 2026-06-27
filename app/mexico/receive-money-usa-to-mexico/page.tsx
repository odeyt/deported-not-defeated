import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Mexico | Remitly, OXXO, Wise",
  description: "Fastest ways for family to send money from the USA to Mexico — Remitly, Western Union, Wise, OXXO Pay, and Zelle comparison.",
};

const methods = [
  { name: "Remitly", speed: "Minutes", fee: "Low (~$2–4)", delivery: "BBVA, Santander, HSBC, or OXXO cash pickup", best: "Best overall — used by millions of US-Mexico families" },
  { name: "Zelle (to Mexican bank)", speed: "Same day", fee: "Free (via US bank)", delivery: "BBVA Mexico or HSBC Mexico accounts linked to Zelle", best: "Best if your family has a US bank with Zelle" },
  { name: "Western Union", speed: "Minutes", fee: "Moderate ($5–15)", delivery: "Cash pickup at OXXO, Walmart, Elektra nationwide", best: "Best for cash pickup — OXXO on every corner" },
  { name: "Wise", speed: "1–2 days", fee: "Very low (0.5–1%)", delivery: "Bank transfer to BBVA, Santander, HSBC in MXN or USD", best: "Best for large amounts — lowest fees" },
];

export default function MexicoReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to Mexico</h1>
          <p className="text-xl text-gray-300">Mexico is the world&apos;s largest remittance corridor. OXXO stores provide cash pickup on every block. Your family has many easy options.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Best Transfer Services</h2>
            <div className="grid gap-4">
              {methods.map((m) => (
                <div key={m.name} className="bg-navy-800 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">{m.name}</h3>
                    <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded">{m.speed}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1"><span className="text-gray-300">Fee:</span> {m.fee}</p>
                  <p className="text-gray-400 text-sm mb-1"><span className="text-gray-300">Delivery:</span> {m.delivery}</p>
                  <p className="text-brand-red text-sm font-semibold mt-2">{m.best}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Opening a Bank Account in Mexico</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">BBVA México:</strong> Largest private bank — bring CURP and ID, some branches require proof of address</li>
              <li>• <strong className="text-white">Santander México:</strong> Easy account opening, good for transfers</li>
              <li>• <strong className="text-white">HSBC México:</strong> Accepts international transfers easily</li>
              <li>• <strong className="text-white">Nu México (Nubank):</strong> Fully digital — open from your phone with CURP</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Cash Pickup Without a Bank Account</h2>
            <p className="text-gray-300 text-sm">No bank account yet? Use cash pickup:</p>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>• OXXO — on every block in Mexico, accepts Western Union and Remitly pickup</li>
              <li>• Elektra — major electronics/financial chain, extensive Western Union network</li>
              <li>• Walmart Mexico — Western Union and MoneyGram available</li>
              <li>• Telecomm Telegrafos — government-run money transfer points nationwide</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/mexico/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
