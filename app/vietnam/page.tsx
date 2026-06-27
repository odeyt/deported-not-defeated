import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Vietnam Survival Guide for Deportees",
  description: "Complete guide to rebuilding your life in Vietnam after deportation. Housing, work, legal help, healthcare, and more.",
};

const guides = [
  { href: "/vietnam/first-30-days", title: "Your First 30 Days", desc: "Step-by-step survival checklist for your first 30 days back in Vietnam.", urgent: true },
  { href: "/vietnam/housing-ho-chi-minh-city", title: "Find Housing", desc: "Affordable rooms and apartments in Ho Chi Minh City, Hanoi, and Da Nang." },
  { href: "/vietnam/sim-card-vietnam", title: "Get a SIM Card", desc: "Viettel, Mobifone, Vinaphone — best data plans and where to buy." },
  { href: "/vietnam/receive-money-usa-to-vietnam", title: "Receive Money", desc: "How family can send money from the USA to Vietnam quickly and cheaply." },
  { href: "/vietnam/find-work-vietnam", title: "Find Work", desc: "English teaching, hospitality, tech, and remote work opportunities in Vietnam." },
  { href: "/vietnam/cost-of-living-ho-chi-minh-city", title: "Cost of Living", desc: "Real monthly budget for Ho Chi Minh City — from $400 to $900/month." },
  { href: "/vietnam/emergency-numbers-vietnam", title: "Emergency Numbers", desc: "Police 113, Ambulance 115, Fire 114, US Embassy, and hospitals." },
  { href: "/vietnam/hospitals-ho-chi-minh-city", title: "Best Hospitals", desc: "Private and public hospitals in Ho Chi Minh City with English-speaking staff." },
  { href: "/vietnam/start-over-after-deportation", title: "Start Over Guide", desc: "Practical steps for rebuilding your life with dignity after deportation." },
  { href: "/resources", title: "All Resources", desc: "Money transfer, eSIM, VPN, and insurance tools that may help you rebuild." },
];

export default function VietnamPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl block mb-4">🇻🇳</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Vietnam Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in Vietnam — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho"].map((city) => (
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
          <p className="text-red-100 mb-6">Subscribe for guides, resources, and updates specific to deportees in Vietnam and Southeast Asia.</p>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
