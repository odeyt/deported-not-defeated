import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "El Salvador Survival Guide for Deportees",
  description: "Complete guide to rebuilding your life in El Salvador after deportation. Housing, work, DUI, healthcare, banking, and more.",
};

const guides = [
  {
    href: "/el-salvador/first-30-days",
    title: "Your First 30 Days",
    desc: "Essential checklist and step-by-step guide for your first 30 days after returning.",
    img: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=600&h=600&fit=crop&auto=format",
    urgent: true,
  },
  {
    href: "/el-salvador/housing-san-salvador",
    title: "Find Housing",
    desc: "Search for safe, affordable housing options and long-term rentals in San Salvador.",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/find-work-el-salvador",
    title: "Find Work",
    desc: "Access job listings, BPO call centers, and resources to help you get back to work.",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/sim-card-el-salvador",
    title: "Phone & Internet",
    desc: "Get a Claro or Tigo SIM card, affordable data plans, and stay connected with family.",
    img: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/receive-money-usa-to-el-salvador",
    title: "Banking & Money",
    desc: "El Salvador uses USD — open accounts and receive money with confidence.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/cost-of-living-san-salvador",
    title: "Cost of Living",
    desc: "Real monthly budget for San Salvador — from $400 to $900 USD/month.",
    img: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/hospitals-san-salvador",
    title: "Healthcare",
    desc: "Find clinics, mental health support, and medical services you can trust.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/emergency-numbers-el-salvador",
    title: "Emergency Numbers",
    desc: "Police 911, Ambulance 132, US Embassy, and crisis contacts in El Salvador.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/el-salvador/start-over-after-deportation",
    title: "Start Over Guide",
    desc: "Practical steps for rebuilding your life with dignity after deportation.",
    img: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/resources",
    title: "All Resources",
    desc: "Money transfer, eSIM, VPN, and insurance tools that may help you rebuild.",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=600&fit=crop&auto=format",
  },
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
            {["San Salvador", "Santa Ana", "San Miguel", "La Libertad"].map((city) => (
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
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${g.img}')` }}
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

      <section className="bg-brand-red py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">You Are Not Alone</h2>
          <p className="text-red-100 mb-6">Subscribe for guides, resources, and updates specific to deportees in El Salvador.</p>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
