import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "El Salvador Survival Guide for Deportees",
  description: "Complete guide to rebuilding your life in El Salvador after deportation. Housing, work, money transfer, healthcare, and more.",
};

const guides = [
  { href: "/el-salvador/first-30-days", title: "Your First 30 Days", desc: "Step-by-step survival checklist for your first 30 days back in El Salvador.", urgent: true },
  { href: "/el-salvador/housing-san-salvador", title: "Find Housing", desc: "Affordable housing in San Salvador, Santa Ana, and San Miguel." },
  { href: "/el-salvador/sim-card-el-salvador", title: "Get a SIM Card", desc: "Tigo, Claro, Movistar — best data plans and where to buy." },
  { href: "/el-salvador/receive-money-usa-to-el-salvador", title: "Receive Money", desc: "How family can send money from the USA — Remitly, Western Union, Chivo." },
  { href: "/el-salvador/find-work-el-salvador", title: "Find Work", desc: "Construction, hospitality, tech sector, and trade opportunities." },
  { href: "/el-salvador/cost-of-living-san-salvador", title: "Cost of Living", desc: "Real monthly budget for San Salvador — USD economy, from $400–$900/month." },
  { href: "/el-salvador/emergency-numbers-el-salvador", title: "Emergency Numbers", desc: "911, 913, US Embassy, hospitals, and crisis contacts in El Salvador." },
  { href: "/el-salvador/hospitals-san-salvador", title: "Best Hospitals", desc: "Hospital Rosales, Hospital de Diagnóstico, and private clinics — with numbers." },
  { href: "/el-salvador/start-over-after-deportation", title: "Start Over Guide", desc: "Practical steps for rebuilding your life with dignity after deportation." },
  { href: "/resources", title: "All Resources", desc: "Money transfer, eSIM, VPN, and insurance tools that may help you rebuild." },
];

export default function ElSalvadorPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl block mb-4">🇸🇻</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">El Salvador Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in El Salvador — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["San Salvador", "Santa Ana", "San Miguel", "Soyapango"].map((city) => (
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
          <p className="text-red-100 mb-6">Subscribe for guides and resources specific to deportees in El Salvador and Central America.</p>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
