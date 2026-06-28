import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Cambodia Survival Guide for Deportees",
  description: "Complete guide to rebuilding your life in Cambodia after deportation. Housing, work, legal help, healthcare, banking, and more.",
};

const guides = [
  {
    href: "/cambodia/first-30-days",
    title: "Your First 30 Days",
    desc: "Essential checklist and step-by-step guide for your first 30 days after returning.",
    img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=600&fit=crop&auto=format",
    urgent: true,
  },
  {
    href: "/cambodia/housing-phnom-penh",
    title: "Find Housing",
    desc: "Search for safe, affordable housing options and long-term rentals in Phnom Penh.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/find-work-cambodia",
    title: "Find Work",
    desc: "Access job listings, training programs, and resources to help you get back to work.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/sim-card-cambodia",
    title: "Phone & Internet",
    desc: "Get a Smart or Metfone SIM card, affordable data plans, and stay connected with family.",
    img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/receive-money-usa-to-cambodia",
    title: "Banking & Money",
    desc: "Open accounts, send or receive money, and manage your finances with confidence.",
    img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/cost-of-living-phnom-penh",
    title: "Cost of Living",
    desc: "Real monthly budget for Phnom Penh — from survival to stable.",
    img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/hospitals-phnom-penh",
    title: "Healthcare",
    desc: "Find clinics, mental health support, and medical services you can trust.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/emergency-numbers-cambodia",
    title: "Emergency Numbers",
    desc: "Police 117, Ambulance 119, US Embassy, and crisis contacts in Cambodia.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/cambodia/start-over-after-deportation",
    title: "Start Over Guide",
    desc: "Practical steps for rebuilding your life with dignity after deportation.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&auto=format",
  },
  {
    href: "/resources",
    title: "All Resources",
    desc: "Money transfer, eSIM, VPN, and insurance tools that may help you rebuild.",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=600&fit=crop&auto=format",
  },
];

export default function CambodiaPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl block mb-4">🇰🇭</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Cambodia Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in Cambodia — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang"].map((city) => (
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
          <p className="text-red-100 mb-6">Subscribe for guides, resources, and updates specific to deportees in Cambodia and Southeast Asia.</p>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
