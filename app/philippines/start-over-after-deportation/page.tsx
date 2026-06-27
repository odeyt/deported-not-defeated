import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation in the Philippines",
  description: "A guide for deportees in the Philippines on rebuilding — bayanihan community, BPO work, documents, mental health, and the path forward.",
};

const pillars = [
  { title: "1. Stabilize First", icon: "🏠", desc: "A transient house or boarding house is your first anchor. Even staying with family temporarily buys you the stability to plan. Do not make major decisions in the first 72 hours — rest, eat, and recover first." },
  { title: "2. Get Documents", icon: "📄", desc: "You will need a PSA birth certificate, PhilSys national ID, and NBI clearance for most formal employment. Visit your local PSA office and barangay hall. PAO (Public Attorney's Office) provides free legal assistance." },
  { title: "3. Find Income", icon: "💼", desc: "BPO call centers are the fastest path to formal employment in the Philippines for English speakers. Concentrix, Sutherland, and TTEC hire constantly. GCash and delivery apps let you earn income within days while you apply to bigger opportunities." },
  { title: "4. Lean Into Bayanihan", icon: "🤝", desc: "Bayanihan — the Filipino value of communal helping — is real and powerful. Your barangay, church, and extended family network are resources, not burdens. Ask for help. People want to help." },
  { title: "5. Take Care of Your Mind", icon: "🧠", desc: "Deportation is a traumatic life event. The shame is not yours to carry alone. NCMH crisis line: 1800 10 254 6467. Hopeline: 028 804 4673. Both are free and available 24/7. Seeking support is the bravest thing you can do." },
];

export default function PhilippinesStartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Start Over After Deportation in the Philippines</h1>
          <p className="text-xl text-gray-300">The Philippines is one of the most community-oriented cultures in the world. You did not arrive with nothing. You arrived with bayanihan behind you.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-navy-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{p.title}</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-800 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl text-gray-200 italic border-l-4 border-brand-red pl-6">
            "Bayanihan is not just a word — it is a practice. In the Philippines, neighbors literally carried houses together. That spirit does not disappear. You can lean on it."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your Philippines Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/philippines/first-30-days", label: "Your First 30 Days" },
              { href: "/philippines/housing-manila", label: "Find Housing" },
              { href: "/philippines/find-work-philippines", label: "Find Work" },
              { href: "/philippines/cost-of-living-manila", label: "Cost of Living" },
              { href: "/philippines/emergency-numbers-philippines", label: "Emergency Numbers" },
              { href: "/resources", label: "All Resources" },
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
