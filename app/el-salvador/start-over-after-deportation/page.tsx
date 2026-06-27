import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation in El Salvador",
  description: "A guide for deportees in El Salvador on rebuilding — DUI, housing, bilingual work, mental health, and the path forward.",
};

const pillars = [
  { title: "1. Stabilize First", icon: "🏠", desc: "El Salvador uses USD — you do not have to deal with currency exchange in a crisis. A safe room in San Salvador runs $100–200/month. If family can take you in temporarily, accept the help. Use that stability to plan your next steps." },
  { title: "2. Get Documents", icon: "📄", desc: "Your DUI (Documento Único de Identidad) is essential for everything. Visit RNPN with any documentation you have. The Bienvenido a Casa program (government returnee program) can help with document recovery. Do not wait on this." },
  { title: "3. Find Income", icon: "💼", desc: "El Salvador uses USD, so every dollar goes where you think it goes. Construction, BPO call centers, Hugo App delivery, and hospitality all hire quickly. Your bilingual English-Spanish skills are rare and in high demand in the BPO sector." },
  { title: "4. Build Your Network", icon: "🤝", desc: "El Salvador has a strong church and community network. Casa del Migrante San Salvador supports returnees. Caritas El Salvador offers social services. Do not try to rebuild in isolation — community is what makes it sustainable." },
  { title: "5. Take Care of Your Mind", icon: "🧠", desc: "The trauma of deportation is real. You lost a life, relationships, and stability you had built. Instituto Salvadoreño de Salud Mental: +503 2231 0800. Crisis line: call 911 if in immediate danger. Talk to someone — it changes everything." },
];

export default function ElSalvadorStartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Start Over After Deportation in El Salvador</h1>
          <p className="text-xl text-gray-300">El Salvador is changing. The economy is stabilizing, the tech sector is growing, and your bilingual skills give you an advantage most people here do not have. This is your ground.</p>
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
            "El Salvador has survived everything it has been through. And so will you. The resilience in this land is in your blood."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your El Salvador Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/el-salvador/first-30-days", label: "Your First 30 Days" },
              { href: "/el-salvador/housing-san-salvador", label: "Find Housing" },
              { href: "/el-salvador/find-work-el-salvador", label: "Find Work" },
              { href: "/el-salvador/cost-of-living-san-salvador", label: "Cost of Living" },
              { href: "/el-salvador/emergency-numbers-el-salvador", label: "Emergency Numbers" },
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
