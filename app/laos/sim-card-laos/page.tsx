import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Smartphone } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Get a SIM Card in Laos — Complete Guide",
  description: "How to buy a SIM card in Laos, best carriers, data plans, costs, and how to stay connected after deportation.",
  keywords: ["SIM card Laos", "Unitel Laos", "Lao Telecom", "cheap data plan Laos", "phone Laos deportee"],
};

export default function SimCardLaosPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Laos Guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg"><Smartphone size={20} className="text-white" /></div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs">Phone Guide</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">How to Get a SIM Card in Laos</h1>
          <p className="text-gray-300 text-lg">Getting connected is your first priority. A SIM card costs $5–10 and takes 10 minutes. Here is exactly what to do.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <p className="font-bold text-green-800 mb-1">Do this on day one.</p>
            <p className="text-green-700 text-sm">Before anything else — housing, money, documents — get a working phone number. It is how family will reach you and how you will access everything else.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Best Carriers in Laos</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Unitel", rec: "Best Overall", desc: "Widest 4G coverage across Laos. Best choice for Vientiane and provincial cities.", color: "border-brand-red" },
                { name: "Lao Telecom", rec: "Budget Option", desc: "Slightly cheaper plans. Good coverage in Vientiane. Limited 4G outside the capital.", color: "border-blue-400" },
                { name: "ETL", rec: "Alternative", desc: "Good for rural areas. Limited data speeds but widely available nationwide.", color: "border-gray-300" },
              ].map((c) => (
                <div key={c.name} className={`border-2 ${c.color} rounded-xl p-4`}>
                  <p className="font-bold text-navy-800 text-lg">{c.name}</p>
                  <span className="text-xs font-bold text-brand-red uppercase tracking-wider">{c.rec}</span>
                  <p className="text-gray-600 text-sm mt-2">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Where to Buy a SIM Card</h2>
            <ul className="space-y-3">
              {[
                ["Talat Sao Mall, Vientiane", "Ground floor has multiple phone shops. Open daily 8am–5pm."],
                ["Unitel stores", "Found in every major city. Staff often speak basic English."],
                ["Convenience stores (7-Eleven)", "Sells SIM cards and top-up cards. Fast and easy."],
                ["Airport arrivals hall", "Available immediately on arrival — slightly more expensive."],
              ].map(([place, note]) => (
                <div key={place} className="flex gap-3 bg-gray-50 rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-brand-red mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-navy-800 text-sm">{place}</p>
                    <p className="text-gray-600 text-sm">{note}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Data Plan Prices (Unitel 2024)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="text-left p-3 rounded-tl-xl">Plan</th>
                    <th className="text-left p-3">Data</th>
                    <th className="text-left p-3">Validity</th>
                    <th className="text-left p-3 rounded-tr-xl">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Starter", "3 GB", "7 days", "~15,000 LAK ($0.90)"],
                    ["Weekly", "10 GB", "30 days", "~35,000 LAK ($2.10)"],
                    ["Monthly Basic", "20 GB", "30 days", "~55,000 LAK ($3.30)"],
                    ["Monthly Plus", "50 GB", "30 days", "~90,000 LAK ($5.40)"],
                    ["Unlimited", "Unlimited*", "30 days", "~130,000 LAK ($7.80)"],
                  ].map(([plan, data, validity, price], i) => (
                    <tr key={plan} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 font-medium">{plan}</td>
                      <td className="p-3">{data}</td>
                      <td className="p-3">{validity}</td>
                      <td className="p-3 font-bold text-navy-800">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-gray-400 text-xs mt-2">*Unlimited plans throttle speed after 30GB. Prices approximate — vary by promotion.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">What You Need to Buy a SIM</h2>
            <ul className="space-y-2">
              {[
                "Your passport (required by law)",
                "Cash in LAK or USD (most shops accept both)",
                "Your phone must be unlocked — if locked to a US carrier, it will not work",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Essential Apps to Download First</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["WhatsApp", "Google Maps", "Google Translate", "Facebook"].map((app) => (
                <div key={app} className="bg-navy-800 text-white rounded-xl p-3 text-center text-sm font-medium">{app}</div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-2xl p-6 text-white">
            <p className="font-bold text-lg mb-2">Find Phone Shops in the Directory</p>
            <p className="text-gray-300 text-sm mb-4">Browse verified SIM card shops and phone repair services in Vientiane.</p>
            <Link href="/laos/directory?category=Phone" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
              Browse Phone Directory →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
