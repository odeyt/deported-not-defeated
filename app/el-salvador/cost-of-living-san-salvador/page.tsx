import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in San Salvador for Deportees | El Salvador Budget Guide",
  description: "Real monthly budget breakdown for San Salvador, El Salvador — survival, stable, and comfortable tiers from $400 to $900/month. USD economy.",
};

const tiers = [
  {
    name: "Survival Budget",
    total: "$350–550/month",
    color: "border-brand-red",
    items: [
      { label: "Basic room in residential colonia", cost: "$100–200" },
      { label: "Food (pupuserías, comedores, markets)", cost: "$100–150" },
      { label: "Transport (bus, microbus)", cost: "$20–40" },
      { label: "Phone (Tigo prepaid)", cost: "$5–10" },
      { label: "Misc", cost: "$30–60" },
    ],
  },
  {
    name: "Stable Budget",
    total: "$550–800/month",
    color: "border-yellow-500",
    items: [
      { label: "Private furnished room with WiFi", cost: "$200–350" },
      { label: "Food (mix of local and restaurants)", cost: "$150–200" },
      { label: "Transport (bus + occasional Uber/Hugo)", cost: "$40–70" },
      { label: "Phone plan (monthly)", cost: "$10–15" },
      { label: "Misc", cost: "$50–80" },
    ],
  },
  {
    name: "Comfortable Budget",
    total: "$800–1,300/month",
    color: "border-green-500",
    items: [
      { label: "1BR apartment in Escalón or San Benito", cost: "$400–700" },
      { label: "Food (restaurants + groceries)", cost: "$200–300" },
      { label: "Transport (Uber + car rental)", cost: "$80–120" },
      { label: "Phone + internet", cost: "$20–35" },
      { label: "Basic health plan", cost: "$30–60" },
      { label: "Misc", cost: "$80–120" },
    ],
  },
];

const prices = [
  { item: "Pupusas (traditional dish, each)", price: "$0.25–0.50" },
  { item: "Plato del día at comedor (lunch)", price: "$2–4" },
  { item: "Pollo campero meal (fast food)", price: "$4–7" },
  { item: "Bus ride (urban)", price: "$0.25" },
  { item: "Uber ride (5km)", price: "$2–5" },
  { item: "Pilsener beer (500ml)", price: "$1–2" },
  { item: "Tigo 5GB data plan", price: "$5" },
];

export default function ElSalvadorCostOfLivingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Cost of Living in San Salvador</h1>
          <p className="text-xl text-gray-300">El Salvador runs on USD — no currency conversion. Life here is affordable, especially outside the capital. Here is the real breakdown for deportees rebuilding.</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Real Prices in San Salvador</h2>
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

          <div className="bg-navy-800 rounded-xl p-6">
            <p className="text-gray-300 text-sm"><strong className="text-white">Key fact:</strong> El Salvador has one of the cheapest public bus systems in Latin America at $0.25 per ride. If you live near a bus route, transport costs almost nothing.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/el-salvador/find-work-el-salvador" className="text-brand-red hover:underline text-sm">Find Work in El Salvador →</Link>
            <Link href="/el-salvador" className="text-brand-red hover:underline text-sm">← Back to El Salvador Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
