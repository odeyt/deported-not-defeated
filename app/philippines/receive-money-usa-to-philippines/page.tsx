import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Philippines | Remitly, GCash, Western Union",
  description: "Fastest ways for family to send money from the USA to the Philippines — Remitly, GCash, Western Union, and bank transfer comparison.",
};

const methods = [
  { name: "Remitly", speed: "Minutes", fee: "Low (~$2–4)", delivery: "BDO, BPI, GCash, or cash pickup at Palawan Express", best: "Best overall — used by millions of OFW families" },
  { name: "GCash Padala", speed: "Minutes", fee: "Low–Free", delivery: "Direct to GCash wallet", best: "Best if you already have GCash set up" },
  { name: "Western Union", speed: "Minutes", fee: "Moderate ($5–15)", delivery: "Cash pickup at SM, LBC, Palawan Pawnshop", best: "Best for cash pickup anywhere in the Philippines" },
  { name: "Wise", speed: "1–2 days", fee: "Very low (0.5–1%)", delivery: "Bank transfer to BDO, BPI, UnionBank", best: "Best for large amounts — lowest fees" },
];

export default function PhilippinesReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to the Philippines</h1>
          <p className="text-xl text-gray-300">The Philippines has one of the best remittance infrastructures in the world — because of OFW culture. Your family has many easy options to send money fast.</p>
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
              <li>• <strong className="text-white">GCash (no bank needed):</strong> Download app + valid ID — you can receive money today</li>
              <li>• <strong className="text-white">BDO:</strong> Largest bank in the Philippines — bring PSA birth cert, valid ID</li>
              <li>• <strong className="text-white">UnionBank:</strong> Fully digital — open an account from your phone</li>
              <li>• <strong className="text-white">Maya (PayMaya):</strong> Another no-branch digital bank option</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Cash Pickup Locations</h2>
            <p className="text-gray-300 text-sm">If you don&apos;t have a bank account yet, cash pickup is available at:</p>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>• Palawan Pawnshop — thousands of locations nationwide</li>
              <li>• LBC Express — courier and remittance, nationwide</li>
              <li>• SM Business Center — Western Union pickup</li>
              <li>• Cebuana Lhuillier — pawnshop network for cash pickups</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/philippines/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
