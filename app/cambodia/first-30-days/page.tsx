import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Your First 30 Days Back in Cambodia | Deportee Survival Guide",
  description: "Step-by-step checklist for deportees arriving in Cambodia. What to do in your first week, documents to get, how to find housing and work.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Get through customs — carry any official deportation paperwork",
      "Exchange USD at the airport or a money changer (1 USD ≈ 4,100 KHR)",
      "Buy a Smart or Metfone SIM card at the airport — 5,000–10,000 KHR",
      "Call or message family to let them know you arrived",
      "Check into a guesthouse (budget: $10–20/night in Phnom Penh)",
      "Eat something and rest — your mind and body need it",
      "Save Police 117, Ambulance 119, Fire 118 in your phone",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Locate your nearest passport or ID office",
      "Open a basic ABA Bank or ACLEDA Bank account — bring your passport/ID",
      "Set up Wing Money or Pi Pay for digital transfers",
      "Have family send money via Western Union, Remitly, or Wing Money",
      "Find a longer-term room — ask your guesthouse or search Facebook groups",
      "Join 'Expats/Deportees in Cambodia' or similar Facebook groups",
      "Learn basic Khmer greetings — people appreciate the effort",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Visit the Cambodian passport office if your documents are missing",
      "Contact the US Embassy Phnom Penh if you still hold a US passport (+855 23 728 000)",
      "Secure a monthly room rental — budget $100–200/month for shared or single",
      "Research work permit or visa requirements if you're not a citizen",
      "Visit a local NGO: Don Bosco, Caritas Cambodia, or LICADHO for support",
      "Get a health check if you feel unwell — AIC Hospital has English staff",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Apply for English teaching jobs — no degree required at some language schools",
      "Register on Khmer24.com for freelance or local work listings",
      "Look into tuk-tuk driving, delivery jobs, or gig work for quick income",
      "Explore the NGO sector — many hire Khmer-English bilingual staff",
      "Build a daily routine: sleep, exercise, connect with others",
      "Read the Cambodia cost of living guide to set a realistic budget",
      "Remind yourself: deportation is not the end — it is a new beginning",
    ],
  },
];

export default function CambodiaFirst30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days Back in Cambodia</h1>
          <p className="text-xl text-gray-300">
            You just landed. You may feel shocked, overwhelmed, or lost. This checklist will carry you through the first month — one day at a time.
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
            "Cambodia is not easy at first — but the people are resilient, the cost of living is low, and opportunity exists if you stay consistent. You can build a life here."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/cambodia/housing-phnom-penh", label: "Find Housing in Phnom Penh" },
              { href: "/cambodia/sim-card-cambodia", label: "Get a SIM Card" },
              { href: "/cambodia/receive-money-usa-to-cambodia", label: "Receive Money from the USA" },
              { href: "/cambodia/find-work-cambodia", label: "Find Work in Cambodia" },
              { href: "/cambodia/emergency-numbers-cambodia", label: "Emergency Numbers" },
              { href: "/cambodia/cost-of-living-phnom-penh", label: "Cost of Living" },
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
