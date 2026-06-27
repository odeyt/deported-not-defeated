import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Vietnam | Best Transfer Methods",
  description: "Fastest ways for family to send money from the USA to Vietnam — Remitly, Wise, Western Union, and bank transfer comparison.",
};

const methods = [
  { name: "Remitly", speed: "Minutes–Hours", fee: "Low (~$2–4)", delivery: "Bank transfer to Vietcombank, VPBank, Techcombank", best: "Best overall for speed and low fees" },
  { name: "Wise", speed: "1–2 days", fee: "Very low (0.5–1%)", delivery: "Direct bank transfer in VND or USD", best: "Best for larger amounts — lowest fees" },
  { name: "Western Union", speed: "Minutes", fee: "Moderate ($5–15)", delivery: "Cash pickup at WU agents or Vietcombank", best: "Best for urgent cash pickup" },
  { name: "Xoom (PayPal)", speed: "Minutes–Hours", fee: "Low–Moderate", delivery: "Bank deposit to major Vietnamese banks", best: "Good if your family uses PayPal" },
];

export default function VietnamReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to Vietnam</h1>
          <p className="text-xl text-gray-300">Vietnam has an excellent banking system and many remittance options. Remitly and Wise are the cheapest for your family to use from the USA.</p>
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
            <h2 className="text-xl font-bold text-white mb-3">Opening a Bank Account in Vietnam</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">Vietcombank:</strong> Best for international transfers — most Western Union and Remitly integrations</li>
              <li>• <strong className="text-white">Techcombank:</strong> Modern app, easy online setup</li>
              <li>• <strong className="text-white">VPBank:</strong> Fast account opening, good mobile banking</li>
              <li>Bring passport/Vietnamese ID to open — usually takes 30 minutes</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Tell Your Family</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Your full name in Vietnamese spelling (no accent marks for Remitly)</li>
              <li>• Bank name, account number, and Swift/BIC code</li>
              <li>• For Western Union: the city and your phone number</li>
              <li>• Expected amount — large transfers may need bank verification</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/vietnam/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
