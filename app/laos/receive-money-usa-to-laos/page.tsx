import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Laos — Best Transfer Options",
  description: "The fastest and cheapest ways to receive money from the USA to Laos. Western Union, Wise, Remitly, and more — compared for deportees.",
  keywords: ["send money USA to Laos", "Western Union Laos", "Wise Laos", "receive money Laos", "money transfer Laos deportee"],
};

export default function ReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Laos Guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-600 p-2 rounded-lg"><DollarSign size={20} className="text-white" /></div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs">Money Guide</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">How to Receive Money from the USA to Laos</h1>
          <p className="text-gray-300 text-lg">Family can send you money from the USA within minutes. Here are the best options, compared honestly.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <p className="font-bold text-yellow-800 mb-1">Fastest option: Western Union cash pickup</p>
            <p className="text-yellow-700 text-sm">If you need money today, Western Union at BCEL Bank is your best option. Family sends from the US app, you pick up cash at the branch in minutes. Bring your passport.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-5">Best Money Transfer Options</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Western Union",
                  speed: "Minutes",
                  fee: "$5–15 per transfer",
                  best: "Fastest cash pickup. Available at BCEL Bank branches across Laos. No bank account needed.",
                  pickup: "Cash pickup at BCEL Bank, Talat Sao branch",
                },
                {
                  name: "Wise (formerly TransferWise)",
                  speed: "1–2 days",
                  fee: "0.5–1.5% of amount",
                  best: "Lowest fees for large amounts. Requires a Lao bank account to receive.",
                  pickup: "Direct to BCEL or LDB bank account",
                },
                {
                  name: "Remitly",
                  speed: "Minutes to 1 day",
                  fee: "$2–4 flat fee",
                  best: "Easy app for family to use. Good exchange rates. Both cash pickup and bank deposit.",
                  pickup: "Cash pickup or bank deposit",
                },
                {
                  name: "Xoom (PayPal)",
                  speed: "Minutes",
                  fee: "$4–8 per transfer",
                  best: "Good if family already uses PayPal. Cash pickup available.",
                  pickup: "Cash pickup at partner agents",
                },
              ].map((s) => (
                <div key={s.name} className="border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-navy-800 text-lg">{s.name}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">{s.speed}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{s.best}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-gray-500"><strong>Fee:</strong> {s.fee}</span>
                    <span className="text-gray-500"><strong>Pickup:</strong> {s.pickup}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">How to Pick Up Western Union in Vientiane</h2>
            <ol className="space-y-3">
              {[
                "Have your family send money via the Western Union app or website",
                "They will receive a tracking number (MTCN) — get that number from them",
                "Go to BCEL Bank, Talat Sao branch (open Mon–Fri 8:30am–3:30pm)",
                "Bring your passport and the MTCN number",
                "Fill out the receive form at the counter",
                "Receive your cash in LAK or USD",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="bg-navy-800 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Opening a Bank Account in Laos</h2>
            <p className="text-gray-700 mb-4">To receive bank transfers (Wise, Remitly bank deposit), you need a Lao bank account. The easiest to open:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { bank: "BCEL Bank", note: "Most branches. English-speaking staff at main Vientiane branch. Requires passport and 50,000 LAK minimum deposit." },
                { bank: "LDB (Lao Development Bank)", note: "Also widely available. Similar requirements to BCEL. Good for rural areas." },
              ].map((b) => (
                <div key={b.bank} className="bg-gray-50 rounded-xl p-4">
                  <p className="font-bold text-navy-800 mb-1">{b.bank}</p>
                  <p className="text-gray-600 text-sm">{b.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-2xl p-6 text-white">
            <p className="font-bold text-lg mb-2">Find Banks & Money Transfer in Directory</p>
            <Link href="/laos/directory?category=Banking" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
              Browse Banking Directory →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
