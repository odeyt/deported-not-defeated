import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Smartphone, ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Phone & Internet in Laos",
  description: "How to get a SIM card, set up internet, and stay connected in Laos.",
};

export default function PhoneInternetPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Laos Guide
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
              <Smartphone size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Phone & Internet</h1>
            <p className="text-gray-300 text-lg">Get connected on day one. Your phone is your lifeline.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Step 1 — Get a SIM Card</h2>
            <p className="text-gray-600 mb-4">This is your first priority after finding shelter. A SIM card costs $3–10 and gives you a local number and mobile data immediately.</p>
            <div className="space-y-3">
              {[
                ["Unitel", "Best overall coverage across Laos. Most popular. Recommend for first arrivals."],
                ["Lao Telecom", "Government network. Reliable in cities. Good backup option."],
                ["ETL (Enterprise Telecom)", "Good for rural northern Laos coverage."],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                  <div><span className="font-semibold text-navy-800">{name}:</span> <span className="text-gray-600 text-sm"> {desc}</span></div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">Buy at the airport, Talat Sao mall, or any convenience store. Bring your passport — required for registration.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Data Plan Pricing</h2>
            <div className="space-y-3">
              {[
                ["Daily", "5,000–10,000 LAK (~$0.25–$0.50) for 1GB"],
                ["Weekly", "25,000–50,000 LAK (~$1.25–$2.50)"],
                ["Monthly", "80,000–150,000 LAK (~$4–$8) for 10–30GB — best value"],
              ].map(([period, price]) => (
                <div key={period} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="font-semibold text-navy-800">{period}</span>
                  <span className="text-gray-600 text-sm">{price}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-brand-red font-medium mt-3">Monthly is almost always the best value — get it as soon as you can afford it.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Essential Apps to Install First</h2>
            <div className="space-y-2">
              {[
                "WhatsApp — the main way people communicate in Laos",
                "Google Maps — works well in Vientiane and major cities",
                "Google Translate — download the offline Lao language pack",
                "Wise or Remitly — for receiving money from family",
                "A VPN app (ExpressVPN or NordVPN) — for privacy and access",
              ].map((i) => (
                <div key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Home Internet</h2>
            <p className="text-gray-600 mb-3">Once you have a stable address, home internet is affordable:</p>
            <ul className="space-y-2">
              {[
                "Lao Telecom fiber: from $25/month in Vientiane",
                "ETL broadband: from $20/month — one of the cheapest options",
                "Installation takes 3–7 days after application",
                "Most apartments include WiFi — ask your landlord before signing",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Phone & Internet Providers in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Verified SIM card shops, phone repair, and internet providers across Laos.</p>
            <Link href="/laos/directory?category=Phone+%2F+SIM+Cards" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">
              Search Phone Listings →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
