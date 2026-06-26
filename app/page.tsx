import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import {
  Home,
  Briefcase,
  Scale,
  Heart,
  DollarSign,
  Smartphone,
  Star,
  Users,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Deported Not Defeated | Rebuilding Life After Deportation",
};

const sections = [
  {
    icon: CheckCircle,
    title: "First 30 Days",
    desc: "A step-by-step survival checklist for your first month. Phone, housing, food, money.",
    href: "/laos/first-30-days",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: Home,
    title: "Find Housing",
    desc: "Guesthouses, apartments, and long-term rentals in Vientiane and beyond.",
    href: "/laos/housing",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Briefcase,
    title: "Find Work",
    desc: "Jobs, freelance, and business opportunities for returnees.",
    href: "/laos/jobs",
    color: "bg-orange-50 text-orange-700",
  },
  {
    icon: Scale,
    title: "Legal & Documents",
    desc: "Visas, passports, lawyers, and embassy contacts you need to know.",
    href: "/laos/legal-help",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: Heart,
    title: "Healthcare",
    desc: "Hospitals, clinics, mental health support, and emergency care.",
    href: "/laos/healthcare",
    color: "bg-red-50 text-red-700",
  },
  {
    icon: DollarSign,
    title: "Money & Banking",
    desc: "How to receive money from the USA, open accounts, and transfer funds.",
    href: "/laos/banking-money",
    color: "bg-yellow-50 text-yellow-700",
  },
  {
    icon: Smartphone,
    title: "Phone & Internet",
    desc: "Get a SIM card, data plan, and stay connected from day one.",
    href: "/laos/phone-internet",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: Star,
    title: "Recommended Tools",
    desc: "Vetted tools for eSIM, VPN, money transfer, travel insurance, and more.",
    href: "/laos/resources",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: Users,
    title: "Real Stories",
    desc: "People who were deported and rebuilt. Their journeys, in their own words.",
    href: "/about",
    color: "bg-pink-50 text-pink-700",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-4">
            One Setback. Countless Comebacks.
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Deported,{" "}
            <span className="text-brand-red">Not</span>{" "}
            Defeated.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            A practical guide and support directory for people rebuilding life after deportation.
          </p>
          <p className="text-gray-400 mb-10 text-lg">
            Your story is not over. Start again with dignity, direction, and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/laos"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Start with Laos
            </Link>
            <Link
              href="/laos/directory"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors border border-white/20"
            >
              Find Help Near You
            </Link>
            <Link
              href="/laos/first-30-days"
              className="bg-brand-gold/20 hover:bg-brand-gold/30 text-yellow-300 px-8 py-4 rounded-xl font-semibold text-lg transition-colors border border-yellow-400/30"
            >
              Download Restart Checklist
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-navy-700 bg-navy-700/40">
          <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
            {[
              ["Starting with", "Laos"],
              ["Categories", "17+"],
              ["Resources", "Free"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission quote */}
      <section className="bg-brand-red text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold leading-relaxed">
            &ldquo;You may have lost a country, but you have not lost your future.&rdquo;
          </p>
          <p className="mt-4 text-red-200">
            Start with one safe place to sleep, one phone number, one job lead, one step forward.
          </p>
        </div>
      </section>

      {/* Country focus */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Currently Available
            </p>
            <h2 className="text-4xl font-bold text-navy-800 mb-4">Starting With Laos</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We built this guide for people deported to Laos first. More countries coming soon.
              Everything here is specific, local, and practical.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl">🇱🇦</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-navy-800 mb-2">Laos</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Whether you landed in Vientiane, Luang Prabang, Pakse, or Savannakhet — we have
                resources for you. Housing, jobs, healthcare, legal help, and a searchable
                business directory.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Vientiane", "Luang Prabang", "Pakse", "Savannakhet"].map((city) => (
                  <span
                    key={city}
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    <MapPin size={12} /> {city}
                  </span>
                ))}
              </div>
              <Link
                href="/laos"
                className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Explore Laos Guide <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-800 mb-4">Everything You Need to Rebuild</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              This guide is here to help you rebuild with dignity. Each section is designed around
              what you actually need, in the order you need it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${s.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-navy-800 mb-2 group-hover:text-brand-red transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-12">Built on Five Principles</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              ["💪", "Courage"],
              ["🙏", "Faith"],
              ["📚", "Education"],
              ["🌟", "Opportunity"],
              ["🏆", "Success"],
            ].map(([emoji, label]) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="text-4xl">{emoji}</div>
                <p className="font-semibold text-navy-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
