import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import ChecklistGate from "@/components/ChecklistGate";

export const metadata: Metadata = {
  title: "Laos Survival Guide for Deportees",
  description:
    "A complete guide to rebuilding your life in Laos after deportation. Housing, work, legal help, healthcare, banking, and more.",
};

const guides = [
  { href: "/laos/first-30-days", title: "Your First 30 Days", desc: "Essential checklist and step-by-step guide for your first 30 days after returning.", pos: "0% 0%", urgent: true },
  { href: "/laos/directory", title: "Business Directory", desc: "Find verified local businesses that can support you and help you rebuild.", pos: "33.3% 0%" },
  { href: "/laos/housing", title: "Find Housing", desc: "Search for safe, affordable housing options and long-term rentals in your area.", pos: "66.6% 0%" },
  { href: "/laos/jobs", title: "Find Work", desc: "Access job listings, training programs, and resources to help you get back to work.", pos: "100% 0%" },
  { href: "/laos/legal-help", title: "Legal & Documents", desc: "Get help with visas, IDs, legal rights, and important documents.", pos: "0% 50%" },
  { href: "/laos/healthcare", title: "Healthcare", desc: "Find clinics, mental health support, and medical services you can trust.", pos: "33.3% 50%" },
  { href: "/laos/banking-money", title: "Banking & Money", desc: "Open accounts, send or receive money, and manage your finances with confidence.", pos: "66.6% 50%" },
  { href: "/laos/phone-internet", title: "Phone & Internet", desc: "Get a SIM card, affordable plans, and stay connected with family.", pos: "100% 50%" },
  { href: "/laos/transportation", title: "Transportation", desc: "Learn about transport options, routes, and how to get around easily.", pos: "0% 100%" },
  { href: "/laos/resources", title: "All Resources", desc: "Checklists, guides, articles, and tools to help you rebuild your life with hope and dignity.", pos: "33.3% 100%" },
];

export default function LaosPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl block mb-4">🇱🇦</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Laos Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in Laos — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Vientiane", "Luang Prabang", "Pakse", "Savannakhet"].map((city) => (
              <span key={city} className="flex items-center gap-1 bg-white/10 text-gray-300 text-sm px-3 py-1 rounded-full">
                <MapPin size={12} /> {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square ${g.urgent ? "ring-2 ring-brand-red" : ""}`}
              >
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/images/sections-grid.jpg')",
                    backgroundSize: "400% 300%",
                    backgroundPosition: g.pos,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {g.urgent && (
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-1">Start Here →</span>
                  )}
                  <h2 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-red-300 transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-gray-300 text-xs leading-relaxed hidden md:block">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Lead magnet CTA */}
      <section className="bg-brand-red py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-red-200 font-bold uppercase tracking-widest text-xs mb-3">Free Download</p>
          <h2 className="text-3xl font-extrabold text-white mb-3">Get the Laos Restart Checklist</h2>
          <p className="text-red-100 mb-6">
            Your first 30 days, step by step. Phone, housing, money, work. Save it to your phone — no WiFi needed once downloaded.
          </p>
          <ChecklistGate className="inline-block bg-white text-brand-red hover:bg-red-50 px-8 py-3 rounded-xl font-bold transition-colors shadow-lg">
            Download Free PDF →
          </ChecklistGate>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
