import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Philippines Survival Guide for Deportees",
  description: "Complete guide to rebuilding your life in the Philippines after deportation. Housing, work, BPO jobs, healthcare, and more.",
};

const guides = [
  { href: "/philippines/first-30-days", title: "Your First 30 Days", desc: "Step-by-step survival checklist for your first 30 days back in the Philippines.", urgent: true },
  { href: "/philippines/housing-manila", title: "Find Housing", desc: "Affordable rooms and apartments in Manila, Cebu, and Davao." },
  { href: "/philippines/sim-card-philippines", title: "Get a SIM Card", desc: "Globe, Smart, DITO — best data plans and where to register your SIM." },
  { href: "/philippines/receive-money-usa-to-philippines", title: "Receive Money", desc: "How family can send money from the USA to the Philippines — Remitly, Western Union, GCash." },
  { href: "/philippines/find-work-philippines", title: "Find Work", desc: "BPO/call centers, English teaching, construction, and hospitality jobs." },
  { href: "/philippines/cost-of-living-manila", title: "Cost of Living", desc: "Real monthly budget for Manila — from ₱25,000 to ₱60,000/month." },
  { href: "/philippines/emergency-numbers-philippines", title: "Emergency Numbers", desc: "911, US Embassy, hospitals, and crisis contacts in the Philippines." },
  { href: "/philippines/hospitals-manila", title: "Best Hospitals", desc: "Manila Doctors, The Medical City, St. Luke's — with phone numbers." },
  { href: "/philippines/start-over-after-deportation", title: "Start Over Guide", desc: "Practical steps for rebuilding your life with dignity after deportation." },
  { href: "/resources", title: "All Resources", desc: "Money transfer, eSIM, VPN, and insurance tools that may help you rebuild." },
];

export default function PhilippinesPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl block mb-4">🇵🇭</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Philippines Survival Guide</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Everything you need to rebuild your life in the Philippines — step by step, with dignity.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Manila", "Cebu City", "Davao", "Quezon City"].map((city) => (
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
          <p className="text-red-100 mb-6">Subscribe for guides and resources specific to deportees in the Philippines.</p>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
