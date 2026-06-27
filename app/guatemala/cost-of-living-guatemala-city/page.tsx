import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in Guatemala City for Deportees | Guatemala Budget Guide",
  description: "Real monthly budget breakdown for Guatemala City — survival, stable, and comfortable tiers from Q3,000 to Q9,000/month.",
};

const tiers = [
  {
    name: "Survival Budget",
    total: "Q3,000–5,000/month ($385–640)",
    color: "border-brand-red",
    items: [
      { label: "Basic room in working-class zone", cost: "Q1,200–2,000" },
      { label: "Food (mercado, comedores)", cost: "Q700–1,200" },
      { label: "Transport (bus, metro bus)", cost: "Q150–300" },
      { label: "Phone (Tigo prepaid)", cost: "Q50–100" },
      { label: "Misc", cost: "Q200–400" },
    ],
  },
  {
    name: "Stable Budget",
    total: "Q5,000–8,000/month ($640–1,025)",
    color: "border-yellow-500",
    items: [
      { label: "Private room with WiFi", cost: "Q2,000–3,500" },
      { label: "Food (mix of local and restaurants)", cost: "Q1,200–2,000" },
      { label: "Transport (bus + InDriver occasionally)", cost: "Q300–600" },
      { label: "Phone plan (monthly)", cost: "Q100–200" },
      { label: "Misc", cost: "Q400–700" },
    ],
  },
  {
    name: "Comfortable Budget",
    total: "Q8,000–14,000/month ($1,025–1,795)",
    color: "border-green-500",
    items: [
      { label: "1BR apartment in Zone 10, 14, or 15", cost: "Q4,000–8,000" },
      { label: "Food (restaurants + groceries)", cost: "Q2,000–3,500" },
      { label: "Transport (InDriver + MetroBus)", cost: "Q600–1,000" },
      { label: "Phone + internet", cost: "Q200–400" },
      { label: "Basic health plan or IGSS", cost: "Q300–600" },
      { label: "Misc", cost: "Q700–1,200" },
    ],
  },
];

const prices = [
  { item: "Típico breakfast (eggs, beans, tortillas)", price: "Q20–40 ($2.56–5.13)" },
  { item: "Almuerzo set lunch at comedor", price: "Q25–50 ($3.20–6.41)" },
  { item: "Gallo beer (bottle)", price: "Q12–20 ($1.54–2.56)" },
  { item: "Metro Bus ride (Transmetro/Transurbano)", price: "Q1–2 ($0.13–0.26)" },
  { item: "InDriver ride (5km)", price: "Q20–45 ($2.56–5.77)" },
  { item: "Tigo 8GB data plan", price: "Q50 ($6.41)" },
  { item: "Tortillas (1 dozen)", price: "Q3–5 ($0.38–0.64)" },
];

export default function GuatemalaCostOfLivingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Cost of Living in Guatemala City</h1>
          <p className="text-xl text-gray-300">Guatemala offers a very affordable lifestyle. Outside Zona Viva, food and transport are extremely cheap. Here is the real monthly breakdown for deportees rebuilding.</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Real Prices in Guatemala City</h2>
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
            <Link href="/guatemala/find-work-guatemala" className="text-brand-red hover:underline text-sm">Find Work in Guatemala →</Link>
            <Link href="/guatemala" className="text-brand-red hover:underline text-sm">← Back to Guatemala Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
