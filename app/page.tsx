import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      {/* HERO — full banner image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-banner.png"
          alt="Deported But Not Defeated — My Story. My Strength. My Future."
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-white text-center px-4 max-w-5xl mx-auto">
          <p className="text-brand-red font-bold uppercase tracking-widest text-sm mb-4">
            One Setback. Countless Comebacks. Unbreakable Spirit.
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
            Deported,{" "}
            <span className="text-brand-red">Not</span>{" "}
            Defeated.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-4 leading-relaxed">
            A practical guide and support directory for people rebuilding life after deportation.
          </p>
          <p className="text-gray-300 mb-10 text-lg italic">
            &ldquo;Your story is not over. Start again with dignity, direction, and support.&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/laos"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              Start with Laos
            </Link>
            <Link
              href="/laos/directory"
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors border border-white/30 backdrop-blur-sm"
            >
              Find Help Near You
            </Link>
            <Link
              href="/laos/first-30-days"
              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-8 py-4 rounded-xl font-bold text-lg transition-colors border border-yellow-400/40 backdrop-blur-sm"
            >
              Download Restart Checklist
            </Link>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-center">
            {[
              ["Starting with", "Laos"],
              ["Categories", "17+"],
              ["Resources", "Free"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{label}</p>
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

      {/* 4 Countries grid */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-red font-bold uppercase tracking-widest text-sm mb-3">
              Expanding Across Countries
            </p>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Built for Every Returnee
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Starting with Laos. Expanding to Cambodia, Vietnam, Philippines, Mexico and beyond. One platform. Every country.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10">
            <Image
              src="/images/portraits-countries.png"
              alt="Deported But Not Defeated — Laos, Cambodia, Vietnam, Philippines"
              width={1200}
              height={800}
              className="w-full object-cover"
              quality={90}
            />
          </div>

          {/* Country cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { flag: "🇱🇦", name: "Laos", href: "/laos", status: "Live", color: "bg-green-500" },
              { flag: "🇰🇭", name: "Cambodia", href: "#", status: "Coming Soon", color: "bg-gray-500" },
              { flag: "🇻🇳", name: "Vietnam", href: "#", status: "Coming Soon", color: "bg-gray-500" },
              { flag: "🇵🇭", name: "Philippines", href: "#", status: "Coming Soon", color: "bg-gray-500" },
            ].map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 text-center transition-all group"
              >
                <div className="text-4xl mb-3">{c.flag}</div>
                <p className="font-bold text-white mb-2">{c.name}</p>
                <span className={`text-xs text-white px-2 py-1 rounded-full ${c.color}`}>
                  {c.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portrait feature — Mexico */}
      <section className="py-20 px-4 bg-navy-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/portrait-mexico.png"
              alt="Deported but not defeated — My story isn't over. It's just a new chapter."
              width={600}
              height={600}
              className="w-full object-cover"
              quality={90}
            />
          </div>
          <div className="w-full md:w-1/2 text-white">
            <p className="text-brand-red font-bold uppercase tracking-widest text-sm mb-4">
              Real People. Real Strength.
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              My Story Isn&apos;t Over.<br />
              <span className="text-brand-red">It&apos;s Just a New Chapter.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Thousands of people have been deported from the USA. Many landed in a country they barely know, with no money, no contacts, and no plan.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              This platform exists to change that. Practical resources. Verified directories. Real support. No shame. No politics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/laos"
                className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
              >
                Explore Laos Guide <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resources section */}
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
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-10">Built on Five Principles</h2>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/principles.jpg"
              alt="Courage, Faith, Education, Opportunity, Success"
              width={1200}
              height={400}
              className="w-full object-cover"
              quality={90}
            />
            {/* Labels overlay */}
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-5">
              {["Courage", "Faith", "Education", "Opportunity", "Success"].map((label) => (
                <div key={label} className="bg-black/60 backdrop-blur-sm py-3 text-center">
                  <p className="text-white font-bold text-sm md:text-base tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
