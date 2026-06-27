import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation in Guatemala",
  description: "A guide for deportees in Guatemala on rebuilding — DPI, housing, bilingual work, mental health, CONAMIGUA, and the path forward.",
};

const pillars = [
  { title: "1. Stabilize First", icon: "🏠", desc: "A basic room in Guatemala City runs Q1,200–2,500/month ($155–320). If you can stay with family, do it. The goal of the first week is simple: safe place to sleep, food, and a working phone. Everything else builds from there." },
  { title: "2. Get Documents", icon: "📄", desc: "Your DPI (Documento Personal de Identificación) is the foundation of your life in Guatemala. Go to RENAP with any documents you have. CONAMIGUA (National Commission for Guatemalan Migrants) specifically assists returnees — contact them first." },
  { title: "3. Find Income", icon: "💼", desc: "Your bilingual Spanish-English skills are rare and genuinely valuable in Guatemala's growing call center sector. Alorica and Transactel hire English speakers continuously. Delivery apps (Hugo, InDriver) can start within days. Agriculture is always accessible for immediate income." },
  { title: "4. Build Community", icon: "🤝", desc: "Guatemala has 22 languages and thousands of years of community culture. Casa del Migrante, local churches, and INTECAP (vocational training) all connect returnees to community and opportunity. You are not the first to rebuild here — you will not be the last." },
  { title: "5. Take Care of Your Mind", icon: "🧠", desc: "What you went through was traumatic. Hospital de Salud Mental Federico Mora: +502 2471 8401. CONAMIGUA psychosocial support: +502 2317 1100. If you are in immediate crisis, call PNC at 110. You deserve care, not just survival." },
];

export default function GuatemalaStartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Start Over After Deportation in Guatemala</h1>
          <p className="text-xl text-gray-300">Guatemala is ancient and resilient. The Maya survived conquest. Your community survived decades of hardship. And you will rebuild too.</p>
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
            "Guatemala has one of the oldest living civilizations in the Americas. The spirit of its people — your people — has never been broken. Neither will you be."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your Guatemala Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/guatemala/first-30-days", label: "Your First 30 Days" },
              { href: "/guatemala/housing-guatemala-city", label: "Find Housing" },
              { href: "/guatemala/find-work-guatemala", label: "Find Work" },
              { href: "/guatemala/cost-of-living-guatemala-city", label: "Cost of Living" },
              { href: "/guatemala/emergency-numbers-guatemala", label: "Emergency Numbers" },
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
