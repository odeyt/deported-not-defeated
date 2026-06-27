import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Your First 30 Days Back in El Salvador | Deportee Survival Guide",
  description: "Step-by-step checklist for deportees arriving in El Salvador. First week survival, DUI, documents, housing, banking, and work.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Arrive at El Salvador International (SAL) — keep all immigration paperwork",
      "El Salvador uses USD — no currency exchange needed",
      "Buy a Tigo or Claro SIM at the airport — $5–10 with data",
      "Call or message family right away",
      "Find a safe place to stay — family if possible, or a hostel ($15–30/night)",
      "Save 911 (police/ambulance), 913 (fire department) in your phone",
      "Rest. The immediate danger of deportation is behind you.",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Contact DGME (Dirección General de Migración) if you need travel documents",
      "Get your DUI (Documento Único de Identidad) — primary ID, required for banking",
      "Visit Banco Agrícola or Scotiabank to open a basic account (bring DUI)",
      "Set up Chivo Wallet for Bitcoin/USD digital payments",
      "Have family send money via Remitly, Western Union, or Chivo",
      "Contact Bienvenido a Casa program — government support for returnees",
      "Join community groups on Facebook for deportee support networks",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Complete your DUI application if not done — RNPN offices nationwide",
      "Register with ISSS (Instituto Salvadoreño del Seguro Social) if employed",
      "Find housing — monthly room in San Salvador runs $150–300",
      "Visit Caritas El Salvador or the Red Cross for immediate support",
      "If you have remaining US legal ties, contact US Embassy San Salvador (+503 2501 2999)",
      "Research the neighborhoods — Santa Elena and Colonia Escalón are safer areas",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Look for construction, electrical, plumbing, or mechanical work",
      "Restaurants, hotels, and security companies hire regularly",
      "El Salvador's tech sector is growing — check LinkedIn for remote work",
      "Drive for Uber or Hugo (local delivery app) for immediate income",
      "Enroll in INSAFORP training programs for free vocational skills",
      "Build your routine: structure your mornings, exercise, connect with family",
      "Read the El Salvador cost of living guide to plan your budget",
    ],
  },
];

export default function ElSalvadorFirst30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days Back in El Salvador</h1>
          <p className="text-xl text-gray-300">
            You&apos;ve landed. El Salvador uses USD, so no currency shock. Family networks are strong. Here&apos;s how to stabilize quickly.
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
            "El Salvador is changing fast. The economy is stabilizing, the tech sector is growing, and your bilingual skills are valuable. You bring something most people here don&apos;t have — experience in two worlds."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/el-salvador/housing-san-salvador", label: "Find Housing in San Salvador" },
              { href: "/el-salvador/sim-card-el-salvador", label: "Get a SIM Card" },
              { href: "/el-salvador/receive-money-usa-to-el-salvador", label: "Receive Money from the USA" },
              { href: "/el-salvador/find-work-el-salvador", label: "Find Work in El Salvador" },
              { href: "/el-salvador/emergency-numbers-el-salvador", label: "Emergency Numbers" },
              { href: "/el-salvador/cost-of-living-san-salvador", label: "Cost of Living" },
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
