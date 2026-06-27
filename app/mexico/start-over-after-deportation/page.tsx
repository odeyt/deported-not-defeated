import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation in Mexico",
  description: "A guide for deportees in Mexico on rebuilding — CURP, housing, work, mental health, family, and the path forward.",
};

const pillars = [
  { title: "1. Stabilize First", icon: "🏠", desc: "Safe housing, food, and communication. Mexico City has budget hotels from $11/night. If you have family anywhere in Mexico, go there first. Stability is the foundation — everything else is built on top of it." },
  { title: "2. Get Documents", icon: "📄", desc: "Your CURP is your key to everything in Mexico — banking, employment, health care, and government services. Visit gob.mx or a Registro Civil to get your CURP. Then get your INE (voter ID) at the nearest INE office. Both are free." },
  { title: "3. Find Income", icon: "💼", desc: "Gig work (Rappi, DiDi, Uber) can start within days. Your bilingual skills are rare and valuable — call centers, tech, and tourism sectors all hire English-Spanish speakers at above-average wages. Start with gig work, then move to formal employment." },
  { title: "4. Reconnect with Family and Community", icon: "🤝", desc: "Mexican culture is deeply family and community oriented. Familia is a real support system — do not be too proud to lean on it. Local churches, DIF (family services), and Grupos Beta also provide community support." },
  { title: "5. Take Care of Your Mind", icon: "🧠", desc: "Deportation is grief. You lost a life you built. That is real loss. SAPTEL (CDMX): 55 5259 8121 — free, 24 hours, bilingual. You do not have to be in crisis to call. Talking helps. Asking for support is not weakness." },
];

export default function MexicoStartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Start Over After Deportation in Mexico</h1>
          <p className="text-xl text-gray-300">Mexico is your country. Your bilingual skills, your US work experience, and your cultural knowledge are assets here. You are not starting from zero.</p>
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
            "You did not leave Mexico because you failed. You left because you had a dream. That same drive that took you north is the drive that will rebuild you here."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your Mexico Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/mexico/first-30-days", label: "Your First 30 Days" },
              { href: "/mexico/housing-mexico-city", label: "Find Housing" },
              { href: "/mexico/find-work-mexico", label: "Find Work" },
              { href: "/mexico/cost-of-living-mexico-city", label: "Cost of Living" },
              { href: "/mexico/emergency-numbers-mexico", label: "Emergency Numbers" },
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
