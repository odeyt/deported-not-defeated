import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cost of Living in Phnom Penh for Deportees | Cambodia Budget Guide",
  description: "Real monthly budget breakdown for Phnom Penh, Cambodia — survival, stable, and comfortable tiers from $200 to $700/month.",
};

const tiers = [
  {
    name: "Survival Budget",
    total: "$200–350/month",
    color: "border-brand-red",
    items: [
      { label: "Room (shared or basic single)", cost: "$80–150" },
      { label: "Food (local markets & street stalls)", cost: "$50–80" },
      { label: "Transport (walking, tuk-tuk, moto)", cost: "$20–40" },
      { label: "Phone data (Smart/Metfone prepaid)", cost: "$5–10" },
      { label: "Misc (hygiene, incidentals)", cost: "$20–30" },
    ],
  },
  {
    name: "Stable Budget",
    total: "$350–600/month",
    color: "border-yellow-500",
    items: [
      { label: "Room (private, AC, private bath)", cost: "$150–250" },
      { label: "Food (mix of local and occasional restaurant)", cost: "$80–120" },
      { label: "Transport (regular tuk-tuk/Grab)", cost: "$40–70" },
      { label: "Phone data plan", cost: "$10–15" },
      { label: "Misc (clothing, personal, extras)", cost: "$50–80" },
    ],
  },
  {
    name: "Comfortable Budget",
    total: "$600–1,000/month",
    color: "border-green-500",
    items: [
      { label: "Apartment (1BR with kitchen)", cost: "$300–500" },
      { label: "Food (restaurants, cooking, delivery)", cost: "$120–200" },
      { label: "Transport (motorbike rental or Grab)", cost: "$60–100" },
      { label: "Phone + internet", cost: "$20–30" },
      { label: "Health insurance (basic)", cost: "$30–60" },
      { label: "Misc", cost: "$80–120" },
    ],
  },
];

const prices = [
  { item: "Street noodle soup (bai sach chrouk)", price: "$1–2" },
  { item: "Rice + pork + vegetables (local restaurant)", price: "$2–4" },
  { item: "Beer (33 Export or Angkor draft)", price: "$0.50–1" },
  { item: "Baguette sandwich (Khmer bánh mì)", price: "$0.50–1" },
  { item: "Fresh coconut", price: "$0.50–1" },
  { item: "Tuk-tuk ride (city center)", price: "$2–4" },
  { item: "Grab Tuk-Tuk (app)", price: "$1.50–3" },
  { item: "SIM top-up (1GB data)", price: "$1–2" },
];

export default function CambodiaCostOfLivingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Cost of Living in Phnom Penh</h1>
          <p className="text-xl text-gray-300">Cambodia is one of the most affordable countries in Southeast Asia. You can survive on $200/month and live comfortably on $600. Here is the real breakdown.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="grid gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className={`rounded-xl border-l-4 ${tier.color} bg-navy-800 p-6`}>
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{tier.name}</h2>
                  <span className="text-brand-red font-bold text-lg">{tier.total}</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">Real Prices in Phnom Penh</h2>
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
            <h2 className="text-xl font-bold text-white mb-2">Key Fact</h2>
            <p className="text-gray-300 text-sm">Cambodia operates primarily in USD. ATMs dispense USD. Most rents are quoted in USD. No currency conversion anxiety — what you have is what you spend.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cambodia/find-work-cambodia" className="text-brand-red hover:underline text-sm">Find Work in Cambodia →</Link>
            <Link href="/cambodia" className="text-brand-red hover:underline text-sm">← Back to Cambodia Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
