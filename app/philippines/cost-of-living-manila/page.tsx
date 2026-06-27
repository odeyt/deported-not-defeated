import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in Manila for Deportees | Philippines Budget Guide",
  description: "Real monthly budget breakdown for Manila, Philippines — survival, stable, and comfortable tiers from ₱15,000 to ₱60,000/month.",
};

const tiers = [
  {
    name: "Survival Budget",
    total: "₱15,000–25,000/month ($268–446)",
    color: "border-brand-red",
    items: [
      { label: "Bedspace / shared room", cost: "₱3,000–5,000" },
      { label: "Food (carinderia, turo-turo)", cost: "₱4,000–7,000" },
      { label: "Transport (jeepney, LRT/MRT)", cost: "₱1,500–3,000" },
      { label: "Phone load / data", cost: "₱300–500" },
      { label: "Misc", cost: "₱1,000–2,000" },
    ],
  },
  {
    name: "Stable Budget",
    total: "₱25,000–45,000/month ($446–803)",
    color: "border-yellow-500",
    items: [
      { label: "Private room with AC and bathroom", cost: "₱6,000–12,000" },
      { label: "Food (mix of carinderia and restaurants)", cost: "₱7,000–12,000" },
      { label: "Transport (Grab + jeepney)", cost: "₱3,000–5,000" },
      { label: "Phone plan (Globe/Smart)", cost: "₱499–999" },
      { label: "Misc", cost: "₱2,000–4,000" },
    ],
  },
  {
    name: "Comfortable Budget",
    total: "₱45,000–80,000/month ($803–1,428)",
    color: "border-green-500",
    items: [
      { label: "Studio / 1BR condo in BGC or Makati", cost: "₱18,000–35,000" },
      { label: "Food (restaurants, groceries)", cost: "₱10,000–18,000" },
      { label: "Transport (Grab, car share)", cost: "₱5,000–8,000" },
      { label: "Phone + internet", cost: "₱1,000–2,000" },
      { label: "PhilHealth + misc", cost: "₱3,000–5,000" },
    ],
  },
];

const prices = [
  { item: "Tapsilog (tapa, sinangag, itlog breakfast)", price: "₱60–120" },
  { item: "Lunch at carinderia (ulam + rice)", price: "₱60–100" },
  { item: "San Miguel beer (bottle)", price: "₱40–80" },
  { item: "LRT/MRT one-way ride", price: "₱15–35" },
  { item: "Grab Car (5km)", price: "₱80–150" },
  { item: "Jeepney ride", price: "₱13–25" },
  { item: "Globe GoSurf 50 (2GB)", price: "₱50" },
];

export default function PhilippinesCostOfLivingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Cost of Living in Manila</h1>
          <p className="text-xl text-gray-300">Manila is more expensive than Southeast Asian neighbors, but BPO salaries and English skills make it manageable. Here is the real monthly breakdown.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="grid gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className={`rounded-xl border-l-4 ${tier.color} bg-navy-800 p-6`}>
                <div className="flex justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-white">{tier.name}</h2>
                  <span className="text-brand-red font-bold">{tier.total}</span>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {tier.items.map((item) => (
                      <tr key={item.label} className="border-b border-white/10 last:border-0">
                        <td className="py-2 text-gray-300">{item.label}</td>
                        <td className="py-2 text-right text-white font-semibold">{item.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Real Prices in Manila</h2>
            <div className="bg-navy-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {prices.map((p) => (
                    <tr key={p.item} className="border-b border-white/10 last:border-0">
                      <td className="p-3 text-gray-300">{p.item}</td>
                      <td className="p-3 text-right text-green-400 font-semibold">{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/philippines/find-work-philippines" className="text-brand-red hover:underline text-sm">Find Work in the Philippines →</Link>
            <Link href="/philippines" className="text-brand-red hover:underline text-sm">← Back to Philippines Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
