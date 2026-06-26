import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Laos Survival Guide for Deportees",
  description:
    "A complete guide to rebuilding your life in Laos after deportation. Housing, work, legal help, healthcare, banking, and more.",
};

const guides = [
  {
    href: "/laos/first-30-days",
    title: "Your First 30 Days",
    desc: "The most critical checklist. Step by step from day one. Phone, housing, money, safety.",
    emoji: "📋",
    urgent: true,
  },
  {
    href: "/laos/directory",
    title: "Business Directory",
    desc: "Search verified local businesses — housing, lawyers, clinics, banks, and more.",
    emoji: "📍",
  },
  {
    href: "/laos/housing",
    title: "Find Housing",
    desc: "Guesthouses, apartments, and long-term rentals that work for returnees.",
    emoji: "🏠",
  },
  {
    href: "/laos/jobs",
    title: "Find Work",
    desc: "Jobs, freelance gigs, and small business ideas in Laos.",
    emoji: "💼",
  },
  {
    href: "/laos/legal-help",
    title: "Legal & Documents",
    desc: "Visas, passports, ID documents, embassy contacts, and legal representation.",
    emoji: "⚖️",
  },
  {
    href: "/laos/healthcare",
    title: "Healthcare",
    desc: "Hospitals, clinics, pharmacies, and mental health resources.",
    emoji: "🏥",
  },
  {
    href: "/laos/banking-money",
    title: "Banking & Money",
    desc: "How to open an account, receive money from the USA, and manage finances.",
    emoji: "💰",
  },
  {
    href: "/laos/phone-internet",
    title: "Phone & Internet",
    desc: "Get a SIM card, set up data, and stay connected from day one.",
    emoji: "📱",
  },
  {
    href: "/laos/transportation",
    title: "Transportation",
    desc: "Motorcycles, tuk-tuks, buses, and how to get around Laos.",
    emoji: "🛵",
  },
  {
    href: "/laos/resources",
    title: "All Resources",
    desc: "Affiliate tools, checklists, articles, and everything else in one place.",
    emoji: "📚",
  },
];

export default function LaosPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl">🇱🇦</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Laos Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in Laos — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Vientiane", "Luang Prabang", "Pakse", "Savannakhet"].map((city) => (
              <span
                key={city}
                className="flex items-center gap-1 bg-white/10 text-gray-300 text-sm px-3 py-1 rounded-full"
              >
                <MapPin size={12} /> {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className={`group bg-white border rounded-xl p-6 hover:shadow-md transition-all flex flex-col gap-3 ${
                  g.urgent ? "border-brand-red ring-1 ring-brand-red" : "border-gray-200"
                }`}
              >
                <div className="text-4xl">{g.emoji}</div>
                <div>
                  {g.urgent && (
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                      Start Here →
                    </span>
                  )}
                  <h2 className="font-bold text-navy-800 text-lg group-hover:text-brand-red transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{g.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-brand-red text-sm font-medium">
                  Read more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
