import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Your First 30 Days Back in the Philippines | Deportee Survival Guide",
  description: "Step-by-step checklist for deportees arriving in the Philippines. First week survival, documents, housing, banking, and work.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Get through NAIA immigration — carry all deportation paperwork",
      "Get PHP from airport ATM or money changer (1 USD ≈ 56 PHP)",
      "Buy a Globe or Smart SIM at the airport — ₱100–300 with data",
      "Call or message family right away",
      "Book a budget hotel or transient house (₱500–1,500/night)",
      "Save 911 (all emergencies), US Embassy (+63 2 5301 2000) in your phone",
      "Eat and rest — you have survived the worst part",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Register your SIM card (required by law — bring a valid ID)",
      "Download GCash and load it — your digital wallet for everything",
      "Visit BDO or BPI to open a basic savings account",
      "Have family send money via Remitly, Western Union, or direct bank transfer",
      "Join 'OFW/Deportee Support PH' Facebook groups",
      "If you need legal help, contact PAO (Public Attorney's Office) for free aid",
      "Locate your barangay hall for community registration",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Get a PSA Birth Certificate if you don't have one — apply online or at PSA office",
      "Apply for a Philippine National ID (PhilSys) at your local registration center",
      "Find monthly housing in a boarding house or apartment — budget ₱3,000–8,000/month",
      "Register with your barangay for community assistance programs",
      "Contact PhilHealth for health coverage enrollment",
      "Visit the US Embassy only if you have remaining US immigration matters",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Apply to BPO/call centers — they hire English speakers constantly",
      "Search on Jobstreet.com.ph and Kalibrr for local positions",
      "Look into construction, hospitality, or food service for faster hiring",
      "Consider barangay livelihood programs for skills training",
      "Build a routine: exercise, connect with community, plan your week",
      "Read the Philippines cost of living guide to set your budget",
      "Deportation does not define you — your next chapter starts now",
    ],
  },
];

export default function PhilippinesFirst30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days Back in the Philippines</h1>
          <p className="text-xl text-gray-300">
            You&apos;ve landed. English is spoken widely, family networks are strong, and the BPO sector is always hiring. Here&apos;s how to stabilize fast.
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
            "The Philippines has one of the most resilient cultures in the world — bayanihan (community helping each other) is real. Lean into your community. You will not rebuild alone."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/philippines/housing-manila", label: "Find Housing in Manila" },
              { href: "/philippines/sim-card-philippines", label: "Get a SIM Card" },
              { href: "/philippines/receive-money-usa-to-philippines", label: "Receive Money from the USA" },
              { href: "/philippines/find-work-philippines", label: "Find Work in the Philippines" },
              { href: "/philippines/emergency-numbers-philippines", label: "Emergency Numbers" },
              { href: "/philippines/cost-of-living-manila", label: "Cost of Living" },
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
