import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Guatemala | Remitly, Western Union, Bi",
  description: "Fastest ways for family to send money from the USA to Guatemala — Remitly, Western Union, Wise, and Tigo Money comparison.",
};

const methods = [
  { name: "Remitly", speed: "Minutes", fee: "Low (~$2–4)", delivery: "Banrural, Banco Industrial, or cash at agents", best: "Best overall — fast, low fees, widely used" },
  { name: "Western Union", speed: "Minutes", fee: "Moderate ($5–12)", delivery: "Cash pickup at Banco Industrial, pharmacies, Pago Fácil agents", best: "Best for immediate cash pickup nationwide" },
  { name: "Wise", speed: "1–2 days", fee: "Very low (0.5–1%)", delivery: "Bank transfer to Banrural or Banco Industrial in GTQ or USD", best: "Best for large amounts — very low fees" },
  { name: "Tigo Money", speed: "Minutes", fee: "Low", delivery: "Mobile wallet — pick up at Tigo agents nationwide", best: "Good for smaller amounts without a bank account" },
];

export default function GuatemalaReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to Guatemala</h1>
          <p className="text-xl text-gray-300">Remittances make up 20%+ of Guatemala&apos;s GDP. Your family in the USA has many easy options to send money quickly and cheaply.</p>
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
              <li>• <strong className="text-white">Banrural:</strong> Most accessible — accepts DPI or even indigenous IDs; has branches everywhere</li>
              <li>• <strong className="text-white">Banco Industrial (Bi):</strong> Largest bank — good for international transfers, requires DPI</li>
              <li>• <strong className="text-white">BAC Guatemala:</strong> Modern app, easy for receiving international transfers</li>
              <li>• <strong className="text-white">Tigo Money:</strong> Mobile wallet — no bank account needed, just DPI and Tigo SIM</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Tell Your Family</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Your full legal name as on your DPI</li>
              <li>• Bank name, account number, and routing info</li>
              <li>• For Tigo Money: your Tigo phone number</li>
              <li>• For cash pickup: the city and your full name</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/guatemala/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
