import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Transportation in Laos",
  description: "How to get around Laos — motorcycles, tuk-tuks, buses, and more.",
};

export default function TransportationPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🛵 Transportation in Laos</h1>
          <p className="text-gray-300 text-lg">How to get around, buy a motorcycle, and travel between cities.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              title: "Motorcycle (Most Common)",
              items: ["Used 100–125cc motorcycles cost $300–800", "New ones cost $1,000–2,000", "You can rent for ~$8–15/day while you save", "A motorcycle is your best long-term investment for getting around", "Bring your US driver's license — get it translated or get a Lao license"],
              color: "bg-orange-50 border-orange-200",
            },
            {
              title: "Tuk-Tuk (Short Trips)",
              items: ["Negotiate price before you get in", "Short city trips: 15,000–30,000 LAK ($0.75–$1.50)", "Available everywhere in cities", "Great for getting around before you have a bike"],
              color: "bg-yellow-50 border-yellow-200",
            },
            {
              title: "Buses (Between Cities)",
              items: ["VIP buses connect all major cities", "Vientiane to Luang Prabang: ~$15, 9–10 hours", "Vientiane to Pakse: ~$15, 10–12 hours", "Book at the Northern or Southern bus stations in Vientiane"],
              color: "bg-blue-50 border-blue-200",
            },
          ].map((s) => (
            <div key={s.title} className={`border rounded-xl p-6 ${s.color}`}>
              <h2 className="text-xl font-bold text-navy-800 mb-3">{s.title}</h2>
              <ul className="space-y-2">
                {s.items.map(i => <li key={i} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
