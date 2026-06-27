import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Your First 30 Days Back in Vietnam | Deportee Survival Guide",
  description: "Step-by-step checklist for deportees arriving in Vietnam. What to do in your first week, documents, housing, banking, and work.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Get through customs — carry deportation paperwork and any ID",
      "Exchange USD or have VND ready (1 USD ≈ 24,500 VND at currency counters)",
      "Buy a Viettel or Mobifone SIM at the airport — 50,000–100,000 VND",
      "Call or message family immediately",
      "Take a taxi or Grab (ride app) to a budget hotel (200,000–400,000 VND/night)",
      "Save Police 113, Ambulance 115, Fire 114 in your phone",
      "Eat a proper meal and rest — recovery begins now",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Download Grab, ZaloPay, and MoMo apps on your phone",
      "Locate the nearest HCMC or Hanoi civil registration office for documents",
      "Visit Vietcombank or Techcombank to open a basic account (bring ID/passport)",
      "Have family send money via Remitly or Western Union to Vietnam",
      "Join 'Expat Corner HCMC' or relevant Facebook groups for advice",
      "Explore your neighborhood on foot — know your surroundings",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Apply for a Family Registration Book (Hộ Khẩu) if you are a citizen",
      "Contact the US Consulate General in Ho Chi Minh City if needed (+84 28 3520 4200)",
      "Find monthly housing — budget 2,000,000–5,000,000 VND ($80–200) for a room",
      "Register for Vietnam Social Health Insurance (BHYT) if eligible",
      "Visit FV Hospital or Vinmec for any health concerns (English spoken)",
      "Look into HCMC's ESL teaching market — high demand year-round",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Apply to English teaching centers (ILA, Wall Street English, RMIT continuing ed)",
      "Check Vietnamworks.com and TopCV.vn for local job listings",
      "Consider freelance work if you have tech, design, or writing skills",
      "Explore the hospitality sector — hotels and restaurants hire quickly",
      "Build a routine: morning walk, language apps, connection with community",
      "Read the Vietnam cost of living guide to plan your budget",
      "Remind yourself: millions rebuild after setbacks — you will too",
    ],
  },
];

export default function VietnamFirst30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days Back in Vietnam</h1>
          <p className="text-xl text-gray-300">
            You just landed. Whether it&apos;s Ho Chi Minh City or Hanoi, this checklist will carry you through the first month — one step at a time.
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
            "Vietnam moves fast. The cities are full of energy, English teaching pays well, and cost of living is low. If you stay disciplined, you can stabilize quickly."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/vietnam/housing-ho-chi-minh-city", label: "Find Housing in Ho Chi Minh City" },
              { href: "/vietnam/sim-card-vietnam", label: "Get a SIM Card" },
              { href: "/vietnam/receive-money-usa-to-vietnam", label: "Receive Money from the USA" },
              { href: "/vietnam/find-work-vietnam", label: "Find Work in Vietnam" },
              { href: "/vietnam/emergency-numbers-vietnam", label: "Emergency Numbers" },
              { href: "/vietnam/cost-of-living-ho-chi-minh-city", label: "Cost of Living" },
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
