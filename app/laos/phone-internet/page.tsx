import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Phone & Internet in Laos",
  description: "How to get a SIM card, set up internet, and stay connected in Laos.",
};

export default function PhoneInternetPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">📱 Phone & Internet</h1>
          <p className="text-gray-300 text-lg">Get connected on day one. Your phone is your lifeline.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Get a SIM Card First</h2>
            <p className="text-gray-600 mb-4">This is your first priority after landing. A SIM card costs $3–10 and gives you a local number and data.</p>
            <div className="space-y-2">
              {[
                "Unitel — best coverage, widely available",
                "Lao Telecom — government network, reliable",
                "ETL (Enterprise Telecom Laos) — good for rural areas",
                "Buy at the airport, any convenience store, or carrier shops",
                "Bring your passport — required for SIM registration",
              ].map(i => (
                <div key={i} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}</div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Data Plans</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Daily:</strong> ~5,000–10,000 LAK ($0.25–$0.50) for 1GB</p>
              <p><strong>Weekly:</strong> ~25,000–50,000 LAK ($1.25–$2.50)</p>
              <p><strong>Monthly:</strong> ~80,000–150,000 LAK ($4–$8) for 10–30GB</p>
              <p className="text-sm text-gray-500 mt-2">Monthly is almost always the best value.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Essential Apps to Install</h2>
            <div className="space-y-2">
              {[
                "WhatsApp — the main way people communicate in Laos",
                "Google Maps — works well in Vientiane and major cities",
                "Google Translate — has offline Lao language pack",
                "Wise or Remitly — for receiving money",
                "A VPN app — for privacy and accessing some blocked content",
              ].map(i => (
                <div key={i} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
