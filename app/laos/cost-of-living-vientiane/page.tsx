import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in Vientiane, Laos (2024 Guide)",
  description: "Real monthly budget breakdown for living in Vientiane, Laos. Housing, food, transport, phone, and total costs for deportees rebuilding their lives.",
  keywords: ["cost of living Vientiane", "monthly budget Laos", "how much to live in Laos", "cheap living Vientiane", "Laos expenses"],
};

export default function CostOfLivingPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Cost of Living in Vientiane, Laos (2024)</h1>
          <p className="text-gray-300 text-lg">A real, honest budget breakdown. How much you actually need to live in Vientiane — from survival mode to comfortable.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { level: "Survival", amount: "$200–300/mo", desc: "Basic guesthouse, street food, no extras" },
              { level: "Stable", amount: "$400–600/mo", desc: "Private room, home cooking, local transport" },
              { level: "Comfortable", amount: "$700–1,000/mo", desc: "Apartment, AC, occasional restaurants, motorbike" },
            ].map((b) => (
              <div key={b.level} className="bg-navy-800 text-white rounded-2xl p-5 text-center">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{b.level}</p>
                <p className="text-3xl font-extrabold text-brand-red mb-2">{b.amount}</p>
                <p className="text-gray-300 text-xs">{b.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Detailed Monthly Budget Breakdown</h2>
            <div className="space-y-2">
              {[
                ["Housing (basic room)", "$60–150", "$150–300", "$250–400"],
                ["Food (3 meals/day)", "$30–60", "$80–150", "$150–250"],
                ["Phone & Data", "$5–8", "$8–15", "$15–25"],
                ["Transport (tuk-tuk/motorbike)", "$10–20", "$20–40", "$50–100"],
                ["Water & Electricity", "included", "$15–30", "$30–60"],
                ["Healthcare (basic)", "$0–10", "$10–30", "$30–80"],
                ["Personal/Misc", "$10–20", "$20–40", "$50–100"],
                ["TOTAL", "$115–268", "$303–605", "$575–1,015"],
              ].map(([item, survival, stable, comfortable], i) => (
                <div key={item} className={`grid grid-cols-4 gap-2 p-3 rounded-xl text-sm ${i === 7 ? "bg-navy-800 text-white font-bold" : i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <span>{item}</span>
                  <span className="text-center">{survival}</span>
                  <span className="text-center">{stable}</span>
                  <span className="text-center">{comfortable}</span>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-2 px-3 text-xs text-gray-400">
                <span></span>
                <span className="text-center">Survival</span>
                <span className="text-center">Stable</span>
                <span className="text-center">Comfortable</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Food Costs in Vientiane</h2>
            <div className="space-y-3">
              {[
                ["Street food meal (noodles, rice)", "10,000–20,000 LAK", "$0.60–1.20"],
                ["Local restaurant meal", "25,000–50,000 LAK", "$1.50–3.00"],
                ["Western restaurant meal", "60,000–150,000 LAK", "$3.60–9.00"],
                ["Market groceries (weekly)", "100,000–200,000 LAK", "$6–12"],
                ["Beer (local Beer Lao)", "10,000–15,000 LAK", "$0.60–0.90"],
              ].map(([item, lak, usd]) => (
                <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-2 text-sm">
                  <span className="text-gray-700">{item}</span>
                  <div className="text-right">
                    <p className="font-bold text-navy-800">{usd}</p>
                    <p className="text-gray-400 text-xs">{lak}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Transport Costs</h2>
            <div className="space-y-2 text-sm">
              {[
                ["Tuk-tuk (short trip in Vientiane)", "20,000–50,000 LAK ($1.20–3)"],
                ["Tuk-tuk (airport to city)", "80,000–120,000 LAK ($5–7)"],
                ["Motorbike rental (daily)", "60,000–100,000 LAK ($3.60–6)"],
                ["Motorbike rental (monthly)", "600,000–1,000,000 LAK ($36–60)"],
                ["Bus (intercity)", "50,000–150,000 LAK ($3–9)"],
              ].map(([item, price]) => (
                <div key={item} className="flex justify-between bg-gray-50 rounded-xl p-3">
                  <span className="text-gray-700">{item}</span>
                  <span className="font-bold text-navy-800 text-right ml-4">{price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-2xl p-6 text-white">
            <p className="font-bold text-lg mb-2">Related Guides</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {[
                ["Receive Money from USA", "/laos/receive-money-usa-to-laos"],
                ["Find Work in Laos", "/laos/find-work-laos"],
                ["Banking & Money Guide", "/laos/banking-money"],
                ["Housing Guide", "/laos/housing-after-deportation"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm font-medium transition-colors">
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
