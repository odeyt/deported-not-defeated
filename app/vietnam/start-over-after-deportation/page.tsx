import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation in Vietnam",
  description: "A guide for deportees in Vietnam on rebuilding your life — stability, documents, income, community, and mental health.",
};

const pillars = [
  { title: "1. Stabilize First", icon: "🏠", desc: "Before anything else: safe housing, food, and a working phone. A mini hotel (nhà nghỉ) in Ho Chi Minh City costs $8–16/night. Once you are stable, everything else becomes possible." },
  { title: "2. Get Documents", icon: "📄", desc: "Citizens need the Hộ Khẩu (family registration book) for many services. If your ID was lost or expired, visit the ward People's Committee office. US citizens with remaining questions: contact the US Consulate General in HCMC (+84 28 3520 4200)." },
  { title: "3. Find Income", icon: "💼", desc: "English teaching is the fastest path to a stable income in Vietnam — $1,000–2,500/month for native speakers. Grab delivery or ShopeeFood can start within the first week. Build from there." },
  { title: "4. Build Community", icon: "🤝", desc: "Vietnam is a community-oriented society. Join expat or returnee Facebook groups. Find a language exchange partner. Visit a local coffee shop daily and become a regular. Connection is what sustains rebuilding over time." },
  { title: "5. Take Care of Your Mind", icon: "🧠", desc: "Deportation causes real psychological trauma. Do not minimize what you went through. If you are struggling, FV Hospital has mental health services (+84 28 5411 3333). International SOS: +84 28 3829 8424. You deserve support." },
];

export default function VietnamStartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Start Over After Deportation in Vietnam</h1>
          <p className="text-xl text-gray-300">Vietnam is a country of resilience. The people survived decades of war and rebuilt. You can rebuild too — and this guide will show you how, one step at a time.</p>
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
            "Vietnam rebuilt itself from the ground up. So can you. The country itself is proof that devastation does not have the last word."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your Vietnam Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/vietnam/first-30-days", label: "Your First 30 Days" },
              { href: "/vietnam/housing-ho-chi-minh-city", label: "Find Housing" },
              { href: "/vietnam/find-work-vietnam", label: "Find Work" },
              { href: "/vietnam/cost-of-living-ho-chi-minh-city", label: "Cost of Living" },
              { href: "/vietnam/emergency-numbers-vietnam", label: "Emergency Numbers" },
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
