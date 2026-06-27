import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Mexico Survival Guide for Deportees",
  description: "Complete guide to rebuilding your life in Mexico after deportation. Housing, work, legal help, healthcare, money transfer, and more.",
};

const guides = [
  { href: "/mexico/first-30-days", title: "Your First 30 Days", desc: "Step-by-step survival checklist for your first 30 days back in Mexico.", urgent: true },
  { href: "/mexico/housing-mexico-city", title: "Find Housing", desc: "Affordable housing in Mexico City, Guadalajara, Tijuana, and Monterrey." },
  { href: "/mexico/sim-card-mexico", title: "Get a SIM Card", desc: "Telcel, AT&T Mexico, Movistar — best plans and where to buy." },
  { href: "/mexico/receive-money-usa-to-mexico", title: "Receive Money", desc: "How family can send money from the USA to Mexico — Remitly, OXXO, Wise." },
  { href: "/mexico/find-work-mexico", title: "Find Work", desc: "Tourism, restaurants, trades, tech sector, and cross-border opportunities." },
  { href: "/mexico/cost-of-living-mexico-city", title: "Cost of Living", desc: "Real monthly budget for Mexico City — from $600 to $1,500/month." },
  { href: "/mexico/emergency-numbers-mexico", title: "Emergency Numbers", desc: "911, US Embassy, hospitals, and crisis contacts across Mexico." },
  { href: "/mexico/hospitals-mexico-city", title: "Best Hospitals", desc: "Public IMSS clinics, ABC Medical Center, Médica Sur — with phone numbers." },
  { href: "/mexico/start-over-after-deportation", title: "Start Over Guide", desc: "Practical steps for rebuilding your life with dignity after deportation." },
  { href: "/resources", title: "All Resources", desc: "Money transfer, eSIM, VPN, and insurance tools that may help you rebuild." },
];

export default function MexicoPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl block mb-4">🇲🇽</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Mexico Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in Mexico — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Mexico City", "Guadalajara", "Monterrey", "Tijuana"].map((city) => (
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
              <Link key={g.href} href={g.href}
                className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-navy-800 p-5 flex flex-col justify-between min-h-32 ${g.urgent ? "ring-2 ring-brand-red" : ""}`}>
                {g.urgent && <span className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">Start Here →</span>}
                <h2 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-red-300 transition-colors">{g.title}</h2>
                <p className="text-gray-400 text-xs leading-relaxed hidden md:block">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-red py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">You Are Not Alone</h2>
          <p className="text-red-100 mb-6">Subscribe for guides and resources specific to deportees in Mexico and Latin America.</p>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
