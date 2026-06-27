import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in Ho Chi Minh City for Deportees | Vietnam Budget Guide",
  description: "Real monthly budget breakdown for Ho Chi Minh City, Vietnam — survival, stable, and comfortable tiers from $400 to $900/month.",
};

const tiers = [
  {
    name: "Survival Budget",
    total: "$350–550/month (8.5M–13.5M VND)",
    color: "border-brand-red",
    items: [
      { label: "Room (phòng trọ, fan, shared bath)", cost: "$80–150" },
      { label: "Food (street food, local restaurants)", cost: "$100–150" },
      { label: "Transport (walk, xe ôm, bus)", cost: "$20–40" },
      { label: "Phone data (Viettel prepaid)", cost: "$3–8" },
      { label: "Misc (hygiene, incidentals)", cost: "$30–50" },
    ],
  },
  {
    name: "Stable Budget",
    total: "$550–900/month (13.5M–22M VND)",
    color: "border-yellow-500",
    items: [
      { label: "Room (private AC, private bath, WiFi)", cost: "$200–350" },
      { label: "Food (local + occasional restaurant)", cost: "$150–200" },
      { label: "Transport (Grab, motorbike rental)", cost: "$40–80" },
      { label: "Phone data plan (monthly)", cost: "$5–10" },
      { label: "Misc (clothing, personal, extras)", cost: "$60–100" },
    ],
  },
  {
    name: "Comfortable Budget",
    total: "$900–1,600/month (22M–39M VND)",
    color: "border-green-500",
    items: [
      { label: "Studio apartment (AC, kitchen, security)", cost: "$400–700" },
      { label: "Food (restaurants + cooking)", cost: "$200–300" },
      { label: "Transport (Grab + motorbike rental)", cost: "$80–120" },
      { label: "Phone + fiber internet", cost: "$15–25" },
      { label: "Basic health insurance", cost: "$30–60" },
      { label: "Misc", cost: "$100–150" },
    ],
  },
];

const prices = [
  { item: "Phở bò (beef noodle soup, street stall)", price: "30,000–60,000 VND ($1.20–2.50)" },
  { item: "Cơm tấm (broken rice + pork)", price: "30,000–50,000 VND ($1.20–2)" },
  { item: "Bánh mì sandwich", price: "15,000–30,000 VND ($0.60–1.20)" },
  { item: "Bia hơi (draft beer)", price: "10,000–20,000 VND ($0.40–0.80)" },
  { item: "Grab Bike (3km ride)", price: "15,000–25,000 VND ($0.60–1)" },
  { item: "Viettel 10GB data plan", price: "50,000 VND ($2)" },
  { item: "Electricity (per kWh)", price: "3,500 VND ($0.14)" },
];

export default function VietnamCostOfLivingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Cost of Living in Ho Chi Minh City</h1>
          <p className="text-xl text-gray-300">Vietnam offers an incredible quality of life at low cost. Fast internet, cheap food, and a growing economy. Here is the real breakdown for deportees rebuilding.</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Real Prices in HCMC</h2>
            <div className="bg-navy-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {prices.map((p) => (
                    <tr key={p.item} className="border-b border-white/10 last:border-0">
                      <td className="p-3 text-gray-300">{p.item}</td>
                      <td className="p-3 text-right text-green-400 font-semibold whitespace-nowrap">{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/vietnam/find-work-vietnam" className="text-brand-red hover:underline text-sm">Find Work in Vietnam →</Link>
            <Link href="/vietnam" className="text-brand-red hover:underline text-sm">← Back to Vietnam Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
