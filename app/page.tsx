import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import ChecklistGate from "@/components/ChecklistGate";
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
      {/* HERO — full banner image, no cropping */}
      <section className="relative w-full bg-gray-950 min-h-[420px] md:min-h-0">
        <Image
          src="/images/hero-banner.png"
          alt="Deported But Not Defeated — My Story. My Strength. My Future."
          width={1920}
          height={800}
          priority
          className="w-full h-auto block"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Centered overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-16">
          <div className="text-white text-center max-w-4xl mx-auto w-full">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm mb-3">
              One Setback. Countless Comebacks. Unbreakable Spirit.
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight drop-shadow-2xl">
              Deported,{" "}
              <span className="text-brand-red">Not</span>{" "}
              Defeated.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-3 leading-relaxed">
              A practical guide and support directory for people rebuilding life after deportation.
            </p>
            <p className="text-gray-300 mb-8 text-base italic">
              &ldquo;Your story is not over. Start again with dignity, direction, and support.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/laos"
                className="bg-brand-red hover:bg-brand-red-dark text-white px-7 py-3 rounded-xl font-bold text-base transition-colors shadow-lg"
              >
                Choose Your Country
              </Link>
              <Link
                href="/resources"
                className="bg-white/15 hover:bg-white/25 text-white px-7 py-3 rounded-xl font-bold text-base transition-colors border border-white/30 backdrop-blur-sm"
              >
                Find Help Near You
              </Link>
              <ChecklistGate className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-7 py-3 rounded-xl font-bold text-base transition-colors border border-yellow-400/40 backdrop-blur-sm">
                Download Free Checklist
              </ChecklistGate>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-3 grid grid-cols-3 gap-4 text-center">
            {[
              ["Countries", "7"],
              ["Categories", "17+"],
              ["Resources", "Free"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xl font-bold text-white">{value}</p>
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

          {/* Clickable country portrait grid — all 7 countries */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
            {/* Laos — top-left of portraits-countries.png */}
            <Link href="/laos" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/images/portraits-countries.png')", backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇱🇦</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">Laos</p>
              </div>
            </Link>
            {/* Cambodia — top-right of portraits-countries.png */}
            <Link href="/cambodia" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/images/portraits-countries.png')", backgroundSize: "200% 200%", backgroundPosition: "100% 0%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇰🇭</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">Cambodia</p>
              </div>
            </Link>
            {/* Vietnam — bottom-left of portraits-countries.png */}
            <Link href="/vietnam" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/images/portraits-countries.png')", backgroundSize: "200% 200%", backgroundPosition: "0% 100%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇻🇳</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">Vietnam</p>
              </div>
            </Link>
            {/* Philippines — bottom-right of portraits-countries.png */}
            <Link href="/philippines" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/images/portraits-countries.png')", backgroundSize: "200% 200%", backgroundPosition: "100% 100%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇵🇭</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">Philippines</p>
              </div>
            </Link>
            {/* Mexico — dedicated portrait */}
            <Link href="/mexico" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/images/portrait-mexico.png')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇲🇽</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">Mexico</p>
              </div>
            </Link>
            {/* El Salvador — Unsplash placeholder until AI portrait is uploaded */}
            <Link href="/el-salvador" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=600&h=800&fit=crop&auto=format')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-white font-black text-xl tracking-widest uppercase drop-shadow-lg">Deported</p>
                <p className="text-xs text-white/80 tracking-widest uppercase">— but not —</p>
                <p className="text-brand-red font-black text-xl tracking-widest uppercase drop-shadow-lg">Defeated</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇸🇻</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">El Salvador</p>
              </div>
            </Link>
            {/* Guatemala — Unsplash placeholder until AI portrait is uploaded */}
            <Link href="/guatemala" className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&h=800&fit=crop&auto=format')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-white font-black text-xl tracking-widest uppercase drop-shadow-lg">Deported</p>
                <p className="text-xs text-white/80 tracking-widest uppercase">— but not —</p>
                <p className="text-brand-red font-black text-xl tracking-widest uppercase drop-shadow-lg">Defeated</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                <span className="text-2xl">🇬🇹</span>
                <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">Guatemala</p>
              </div>
            </Link>
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
                Explore Country Guides <ArrowRight size={16} />
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
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Rebuild</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              This guide is here to help you rebuild with dignity. Each section is designed around
              what you actually need, in the order you need it.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Your First 30 Days",
                desc: "Essential checklist and step-by-step guide for your first 30 days after returning.",
                href: "/laos/first-30-days",
                img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=600&fit=crop&auto=format",
                urgent: true,
              },
              {
                title: "Business Directory",
                desc: "Find verified local businesses that can support you and help you rebuild.",
                href: "/laos/directory",
                img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Find Housing",
                desc: "Search for safe, affordable housing options and long-term rentals in your area.",
                href: "/laos/housing",
                img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Find Work",
                desc: "Access job listings, training programs, and resources to help you get back to work.",
                href: "/laos/jobs",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Legal & Documents",
                desc: "Get help with visas, IDs, legal rights, and important documents.",
                href: "/laos/legal-help",
                img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Healthcare",
                desc: "Find clinics, mental health support, and medical services you can trust.",
                href: "/laos/healthcare",
                img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Banking & Money",
                desc: "Open accounts, send or receive money, and manage your finances with confidence.",
                href: "/resources/money-transfer",
                img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Phone & Internet",
                desc: "Get a SIM card, affordable plans, and stay connected with family.",
                href: "/resources/phone-internet",
                img: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Transportation",
                desc: "Learn about transport options, routes, and how to get around easily.",
                href: "/laos/transportation",
                img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "All Resources",
                desc: "Checklists, guides, articles, and tools to help you rebuild your life with hope and dignity.",
                href: "/resources",
                img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=600&fit=crop&auto=format",
              },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square ${s.urgent ? "ring-2 ring-brand-red" : ""}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${s.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {s.urgent && (
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-1">Start Here →</span>
                  )}
                  <h3 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-red-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed hidden md:block">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-10">Built on Five Principles</h2>
          <div className="flex rounded-2xl overflow-hidden shadow-lg gap-1 bg-gray-200">
            {[
              { label: "Courage",     img: "/images/value-courage.jpg",     href: "/laos/first-30-days" },
              { label: "Faith",       img: "/images/value-faith.jpg",       href: "/about" },
              { label: "Education",   img: "/images/value-education.jpg",   href: "/resources" },
              { label: "Opportunity", img: "/images/value-opportunity.jpg", href: "/laos/jobs" },
              { label: "Success",     img: "/images/value-success.jpg",     href: "/stories" },
            ].map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="group relative flex-1 block h-64 md:h-80 overflow-hidden cursor-pointer hover:ring-2 hover:ring-white hover:z-10"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  style={{ backgroundImage: `url('${p.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 py-3 text-center pointer-events-none">
                  <p className="text-white font-bold text-sm md:text-base tracking-wide drop-shadow group-hover:text-yellow-300 transition-colors">{p.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
