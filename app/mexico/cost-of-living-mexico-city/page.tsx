import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in Mexico City for Deportees | Mexico Budget Guide",
  description: "Real monthly budget breakdown for Mexico City — survival, stable, and comfortable tiers from $400 to $1,500/month.",
};

const tiers = [
  {
    name: "Survival Budget",
    total: "$400–700/month (Q7,000–12,000 MXN)",
    color: "border-brand-red",
    items: [
      { label: "Cuarto de renta (basic furnished room)", cost: "$110–220" },
      { label: "Food (street food, mercado comida)", cost: "$100–160" },
      { label: "Transport (Metro + bus)", cost: "$15–30" },
      { label: "Phone (Telcel Amigo prepaid)", cost: "$6–12" },
      { label: "Misc", cost: "$30–60" },
    ],
  },
  {
    name: "Stable Budget",
    total: "$700–1,200/month (12,000–21,000 MXN)",
    color: "border-yellow-500",
    items: [
      { label: "Private room with AC, WiFi", cost: "$220–440" },
      { label: "Food (mix of street + casual restaurants)", cost: "$160–250" },
      { label: "Transport (Metro + Uber/DiDi occasionally)", cost: "$40–70" },
      { label: "Phone plan (monthly)", cost: "$12–20" },
      { label: "Misc (clothing, personal)", cost: "$60–100" },
    ],
  },
  {
    name: "Comfortable Budget",
    total: "$1,200–2,000/month (21,000–35,000 MXN)",
    color: "border-green-500",
    items: [
      { label: "1BR apartment in Roma, Condesa, or Del Valle", cost: "$500–1,000" },
      { label: "Food (restaurants + grocery + delivery)", cost: "$200–350" },
      { label: "Transport (Uber + Metro)", cost: "$80–120" },
      { label: "Phone + internet", cost: "$25–40" },
      { label: "Health insurance (IMSS or private)", cost: "$30–80" },
      { label: "Misc", cost: "$100–150" },
    ],
  },
];

const prices = [
  { item: "Taco from street tacos al pastor (each)", price: "$5–10 MXN ($0.28–0.55)" },
  { item: "Comida corrida (set lunch)", price: "$60–100 MXN ($3.30–5.50)" },
  { item: "Torta (sandwich) from torterías", price: "$30–60 MXN ($1.65–3.30)" },
  { item: "Metro ride (CDMX)", price: "$5 MXN ($0.27)" },
  { item: "Uber (5km city center)", price: "$50–90 MXN ($2.75–5)" },
  { item: "Cerveza (bottled beer)", price: "$20–35 MXN ($1.10–1.93)" },
  { item: "Telcel 5GB data (prepaid)", price: "$100 MXN ($5.50)" },
];

export default function MexicoCostOfLivingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Cost of Living in Mexico City</h1>
          <p className="text-xl text-gray-300">Mexico City is one of the world&apos;s great cities — with incredible food, Metro access, and a huge job market. Here is the honest monthly cost breakdown.</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Real Prices in CDMX</h2>
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
            <Link href="/mexico/find-work-mexico" className="text-brand-red hover:underline text-sm">Find Work in Mexico →</Link>
            <Link href="/mexico" className="text-brand-red hover:underline text-sm">← Back to Mexico Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
