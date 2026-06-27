import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to El Salvador | Remitly, Western Union, Chivo",
  description: "Fastest ways for family to send money from the USA to El Salvador — Remitly, Western Union, Wise, and Chivo Bitcoin wallet comparison.",
};

const methods = [
  { name: "Remitly", speed: "Minutes", fee: "Low (~$2–4)", delivery: "Banco Agrícola, Bancoamérica, or cash agents", best: "Best overall — fast, low fees, widely used corridor" },
  { name: "Western Union", speed: "Minutes", fee: "Moderate ($5–12)", delivery: "Cash pickup at banks, pharmacies, Distribuidoras nationwide", best: "Best for immediate cash pickup anywhere in El Salvador" },
  { name: "Chivo Wallet (Bitcoin/USD)", speed: "Minutes", fee: "Zero fees", delivery: "USD directly via Bitcoin Lightning Network to Chivo app", best: "Zero fees — if both sender and receiver have Chivo" },
  { name: "Wise", speed: "1–2 days", fee: "Very low (0.5–1%)", delivery: "Bank transfer to Banco Agrícola or Scotiabank", best: "Best for larger amounts — lowest fees" },
];

export default function ElSalvadorReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to El Salvador</h1>
          <p className="text-xl text-gray-300">El Salvador uses USD — no currency conversion. Remittances are a cornerstone of the economy. Your family has many fast, cheap options.</p>
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
            <h2 className="text-xl font-bold text-white mb-3">Opening a Bank Account</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">Banco Agrícola:</strong> Largest private bank — bring DUI and income proof if available</li>
              <li>• <strong className="text-white">Bancoamérica:</strong> Accepts international transfers, good mobile banking</li>
              <li>• <strong className="text-white">Chivo Wallet:</strong> Government Bitcoin/USD wallet — download and register with DUI</li>
              <li>• <strong className="text-white">Tigo Money:</strong> Mobile money wallet, no bank account needed</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">The Chivo Wallet Advantage</h2>
            <p className="text-gray-300 text-sm">If your family in the USA downloads Strike or another Bitcoin Lightning app, they can send USD to your Chivo wallet instantly with zero fees. El Salvador is a Bitcoin legal tender country — this is a real option worth exploring.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/el-salvador/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
