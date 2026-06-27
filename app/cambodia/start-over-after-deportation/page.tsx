import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation in Cambodia",
  description: "A guide for deportees in Cambodia on rebuilding your life — housing, work, mental health, community, and the long road to stability.",
};

const pillars = [
  { title: "1. Stabilize First", icon: "🏠", desc: "Survival before growth. Get a safe place to sleep, a way to eat, and a SIM card in your hand. Nothing else matters until those three are solved. Even a $10/night guesthouse gives you the stability to think clearly." },
  { title: "2. Get Documents", icon: "📄", desc: "Without an ID, you cannot bank, work formally, or access services. Visit the Cambodian passport or ID office as soon as possible. If you have any remaining US documentation questions, contact the US Embassy in Phnom Penh." },
  { title: "3. Find Income", icon: "💼", desc: "English teaching, NGO work, or gig work can all start within the first month. You do not need to find the perfect job yet — you need any income that covers your costs while you stabilize and plan." },
  { title: "4. Build Community", icon: "🤝", desc: "Isolation is the enemy of recovery. Join Facebook groups, attend church, volunteer, or visit an NGO. Human connection is what makes rebuilding sustainable. Cambodia has a warm and resilient community culture." },
  { title: "5. Take Care of Your Mind", icon: "🧠", desc: "Deportation is a traumatic experience. Shame, grief, and anger are normal. You do not have to push through alone. TPO Cambodia (+855 23 990 390) provides mental health support. Talking to someone is strength, not weakness." },
];

export default function CambodiaStartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Start Over After Deportation in Cambodia</h1>
          <p className="text-xl text-gray-300">Deportation is one of the most disorienting experiences a person can face. This guide will not tell you it is easy. It will tell you it is possible — and show you how.</p>
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
          <blockquote className="text-xl text-gray-200 italic border-l-4 border-brand-red pl-6 mb-6">
            "You were not deported because you are worthless. You were deported because of a system that does not always reflect the value of a human life. Your worth was not decided at that airport."
          </blockquote>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Continue Your Cambodia Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/cambodia/first-30-days", label: "Your First 30 Days" },
              { href: "/cambodia/housing-phnom-penh", label: "Find Housing" },
              { href: "/cambodia/find-work-cambodia", label: "Find Work" },
              { href: "/cambodia/cost-of-living-phnom-penh", label: "Cost of Living" },
              { href: "/cambodia/emergency-numbers-cambodia", label: "Emergency Numbers" },
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
