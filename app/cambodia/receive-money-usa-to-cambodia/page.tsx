import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Cambodia | Best Transfer Methods",
  description: "Fastest and cheapest ways for family to send money from the USA to Cambodia — Remitly, Western Union, Wise, Wing Money comparison.",
};

const methods = [
  { name: "Remitly", speed: "Minutes", fee: "Low (~$2–4)", delivery: "Bank deposit or Wing Money pickup", best: "Best overall — fast, low fees" },
  { name: "Western Union", speed: "Minutes", fee: "Moderate ($5–10)", delivery: "Cash pickup at WU agents in Phnom Penh", best: "Best if you need cash immediately" },
  { name: "Wise", speed: "1–2 days", fee: "Very low (0.5–1%)", delivery: "Bank transfer to ABA or ACLEDA", best: "Best for larger amounts" },
  { name: "Wing Money", speed: "Minutes", fee: "Low", delivery: "Wing agents across Cambodia, app pickup", best: "Best for rural areas and agents" },
];

export default function CambodiaReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to Cambodia</h1>
          <p className="text-xl text-gray-300">Tell your family in the USA what to use. Cambodia accepts USD directly — no currency conversion needed for most transfers.</p>
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
            <p className="text-gray-300 text-sm mb-2">The best banks in Cambodia for receiving international transfers:</p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">ABA Bank:</strong> Best app, widespread ATMs, accepts international transfers — bring passport/ID</li>
              <li>• <strong className="text-white">ACLEDA Bank:</strong> Largest domestic bank, reliable, easy account opening</li>
              <li>• <strong className="text-white">Canadia Bank:</strong> Good for USD savings accounts</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Tell Your Family</h2>
            <p className="text-gray-300 text-sm">Share these with your family in the USA before they send:</p>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>• Your full name as it appears on your ID</li>
              <li>• Your ABA or ACLEDA bank account number (for bank transfer)</li>
              <li>• Your Wing Money number (phone number) for Wing transfers</li>
              <li>• The city where you want cash pickup (for Western Union)</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cambodia/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
