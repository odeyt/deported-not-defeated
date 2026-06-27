import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Your First 30 Days Back in Mexico | Deportee Survival Guide",
  description: "Step-by-step checklist for deportees arriving in Mexico. First week survival, CURP, documents, housing, banking, and work.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Get through customs — keep all official documents and deportation papers",
      "Exchange USD to MXN or use ATM (1 USD ≈ 17–18 MXN)",
      "Buy a Telcel SIM at the airport — plans start at $100 MXN",
      "Call or WhatsApp family immediately",
      "Find a budget hotel or stay with family ($300–600 MXN/night in CDMX)",
      "Save 911 (police, fire, ambulance) in your phone",
      "If you are in Tijuana or a border city, be cautious — know your surroundings",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Locate a CURP office or use gob.mx to recover your CURP number online",
      "Visit your local Registro Civil for any birth certificates",
      "Open a BBVA, Santander, or HSBC account — bring CURP and ID",
      "Or use OXXO Pay for cash-based money receiving without a bank",
      "Have family send money via Remitly, Western Union, or direct bank transfer",
      "Download WhatsApp, Rappi (delivery), and InDriver (rides)",
      "Contact Grupo Beta or Casa del Migrante in your city for immediate support",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Get your INE (voter ID) at your nearest INE office — free, requires CURP",
      "Register with IMSS if you find formal employment — social security",
      "Find monthly housing — budget $3,000–6,000 MXN/month for a room in CDMX",
      "Visit Cáritas México or DIF (Family Integration Centers) for social support",
      "If you have US ties, contact the US Embassy Mexico City (+52 55 5080 2000)",
      "Explore CDMX, Guadalajara, or Monterrey — each has different opportunities",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Apply for jobs on OCC Mundial or Computrabajo (major job boards)",
      "Look into restaurant kitchens, construction, or hospitality for quick income",
      "Mexico City has a growing tech scene — check LinkedIn for remote roles",
      "Consider driving for Uber, InDriver, or DiDi for immediate income",
      "Food delivery via Rappi or iFood pays weekly",
      "Build your routine: schedule, exercise, reconnect with your roots",
      "Read the Mexico cost of living guide to plan your budget realistically",
    ],
  },
];

export default function MexicoFirst30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days Back in Mexico</h1>
          <p className="text-xl text-gray-300">
            You&apos;ve arrived. Mexico is large and full of opportunity — this checklist will help you get grounded fast, whether you land in Mexico City, Tijuana, or anywhere in between.
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
            "Mexico is your country too. The cities are dynamic, family bonds are strong, and gig work can pay your bills while you get back on your feet. You are not starting from nothing — you are starting from experience."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/mexico/housing-mexico-city", label: "Find Housing in Mexico City" },
              { href: "/mexico/sim-card-mexico", label: "Get a SIM Card" },
              { href: "/mexico/receive-money-usa-to-mexico", label: "Receive Money from the USA" },
              { href: "/mexico/find-work-mexico", label: "Find Work in Mexico" },
              { href: "/mexico/emergency-numbers-mexico", label: "Emergency Numbers" },
              { href: "/mexico/cost-of-living-mexico-city", label: "Cost of Living" },
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
