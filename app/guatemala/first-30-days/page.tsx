import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Your First 30 Days Back in Guatemala | Deportee Survival Guide",
  description: "Step-by-step checklist for deportees arriving in Guatemala. First week survival, DPI, documents, housing, banking, and work.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Arrive at La Aurora International (GUA) — keep all deportation documents",
      "Exchange USD to GTQ or use ATM (1 USD ≈ 7.8 GTQ)",
      "Buy a Tigo or Claro SIM at the airport — Q50–100 with data",
      "Call or message family immediately",
      "Find a place to stay — with family or a safe hostel (Q150–400/night)",
      "Save PNC police 110, Bomberos 122, SAMU 1551 in your phone",
      "Rest and eat — the hardest part is behind you",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Contact DGME (Dirección General de Migración) for any document issues",
      "Get your DPI (Documento Personal de Identificación) — required for banking",
      "Visit RENAP office to request your DPI if you don't have one",
      "Open an account at Banrural or Banco Industrial (bring DPI)",
      "Have family send money via Remitly, Western Union, or Bi Móvil",
      "Register with Casa del Migrante Guatemala for returnee support",
      "Download WhatsApp — it is the primary communication tool in Guatemala",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Complete DPI application at RENAP if still pending",
      "Visit IGSS (Instituto Guatemalteco de Seguridad Social) info office",
      "Find housing — a room in Guatemala City runs Q1,500–3,500/month",
      "Visit Caritas Guatemala or local church programs for immediate support",
      "Contact the US Embassy Guatemala City if needed (+502 2326 4000)",
      "Explore Antigua — close to CDMX, safer atmosphere, growing jobs in tourism",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Apply for work in tourism, hotels, restaurants, or construction",
      "Guatemala City has a growing call center sector — bilingual hiring constantly",
      "Search Encuentra24.com and OLX Guatemala for job listings",
      "Consider driving for InDriver, Uber, or local mototaxi cooperatives",
      "Explore INTECAP (free government vocational training) for new skills",
      "Build your daily routine: structure, movement, connection",
      "Read the Guatemala cost of living guide to plan your monthly budget",
    ],
  },
];

export default function GuatemalaFirst30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days Back in Guatemala</h1>
          <p className="text-xl text-gray-300">
            You&apos;ve arrived. Guatemala City, Antigua, or wherever you land — this checklist will carry you through the first month, one step at a time.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-8">
          {weeks.map((week) => (
            <div key={week.title} className={`rounded-xl border-l-4 p-6 ${week.color}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{week.title}</h2>
              <ul className="space-y-3">
                {week.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                    <span className="text-gray-800 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-800 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl text-gray-200 italic border-l-4 border-brand-red pl-6">
            "Guatemala has 22 languages and thousands of years of culture behind it. Your community is resilient. Your bilingual skills are rare and valuable here. You are not alone."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/guatemala/housing-guatemala-city", label: "Find Housing in Guatemala City" },
              { href: "/guatemala/sim-card-guatemala", label: "Get a SIM Card" },
              { href: "/guatemala/receive-money-usa-to-guatemala", label: "Receive Money from the USA" },
              { href: "/guatemala/find-work-guatemala", label: "Find Work in Guatemala" },
              { href: "/guatemala/emergency-numbers-guatemala", label: "Emergency Numbers" },
              { href: "/guatemala/cost-of-living-guatemala-city", label: "Cost of Living" },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="bg-navy-800 border border-white/10 rounded-lg p-4 text-white hover:border-brand-red transition-colors text-sm font-semibold">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
