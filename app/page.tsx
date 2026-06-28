import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import ChecklistGate from "@/components/ChecklistGate";
import DeportationCounter from "@/components/DeportationCounter";
import AIReportCTA from "@/components/AIReportCTA";
import {
  MapPin,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Deported Not Defeated | Rebuilding Life After Deportation",
};


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
                href="/country-guides"
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
              ["Countries", "45+"],
              ["Categories", "10"],
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

      <DeportationCounter />

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
              45+ Countries Covered
            </p>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Built for Every Returnee
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From Southeast Asia to Central America, the Caribbean, Africa, and Europe — one platform built for every deportee, everywhere.
            </p>
          </div>

          {/* Clickable country portrait grid — all 7 countries */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 mb-4" style={{ background: "black" }}>
            {[
              { href: "/laos",        flag: "🇱🇦", label: "Laos",        bg: "url('/images/portraits-countries.png')", size: "210% 210%", pos: "0% 0%"   },
              { href: "/cambodia",    flag: "🇰🇭", label: "Cambodia",    bg: "url('/images/portraits-countries.png')", size: "210% 210%", pos: "100% 0%"  },
              { href: "/vietnam",     flag: "🇻🇳", label: "Vietnam",     bg: "url('/images/portraits-countries.png')", size: "210% 210%", pos: "0% 100%" },
              { href: "/philippines", flag: "🇵🇭", label: "Philippines", bg: "url('/images/portraits-countries.png')", size: "210% 210%", pos: "100% 100%"},
              { href: "/mexico",      flag: "🇲🇽", label: "Mexico",      bg: "url('/images/portrait-mexico.png')",     size: "cover",    pos: "center"  },
              { href: "/el-salvador", flag: "🇸🇻", label: "El Salvador", bg: "url('/images/portrait-el-salvador.png')",size: "cover",    pos: "center"  },
              { href: "/guatemala",   flag: "🇬🇹", label: "Guatemala",   bg: "url('/images/portrait-guatemla.png')",   size: "cover",    pos: "center"  },
            ].map(({ href, flag, label, bg, size, pos }) => (
              <Link key={href} href={href} className="group relative aspect-[3/4] block cursor-pointer overflow-hidden" style={{ background: "black" }}>
                {/* Image — extended 16px beyond card edges so raw image borders are always clipped */}
                <div
                  className="absolute transition-transform duration-500 group-hover:scale-105"
                  style={{
                    top: "-16px", right: "-16px", bottom: "-16px", left: "-16px",
                    backgroundImage: bg,
                    backgroundSize: size,
                    backgroundPosition: pos,
                    backgroundRepeat: "no-repeat",
                  }}
                />
                {/* Strong vignette from all 4 edges */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  boxShadow: "inset 0 0 80px 60px black",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.75) 100%)",
                }} />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center pointer-events-none">
                  <span className="text-2xl">{flag}</span>
                  <p className="text-white font-bold text-sm mt-1 tracking-wide group-hover:text-brand-red transition-colors">{label}</p>
                </div>
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
                href="/country-guides"
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
                desc: "Choose your country and get a step-by-step survival checklist for your first month.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=600&fit=crop&auto=format",
                urgent: true,
              },
              {
                title: "Business Directory",
                desc: "Find local businesses, agencies, and organizations that can support your rebuild.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Find Housing",
                desc: "Search for safe, affordable housing options and long-term rentals in your country.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Find Work",
                desc: "Access job listings, training programs, and resources to help you get back to work.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Legal & Documents",
                desc: "Get help with visas, IDs, legal rights, and important documents.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Healthcare",
                desc: "Find clinics, mental health support, and medical services you can trust.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Banking & Money",
                desc: "Compare money transfer services, open accounts, and receive money from the USA.",
                href: "/resources/money-transfer",
                img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Phone & Internet",
                desc: "Get a SIM card, affordable plans, and stay connected with family from day one.",
                href: "/country-guides",
                img: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=600&fit=crop&auto=format",
              },
              {
                title: "Transportation",
                desc: "Learn about local transport options, routes, and how to get around safely.",
                href: "/country-guides",
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
              { label: "Courage",     img: "/images/value-courage.jpg",     href: "/country-guides" },
              { label: "Faith",       img: "/images/value-faith.jpg",       href: "/about" },
              { label: "Education",   img: "/images/value-education.jpg",   href: "/resources" },
              { label: "Opportunity", img: "/images/value-opportunity.jpg", href: "/country-guides" },
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

      <AIReportCTA />
      <NewsletterForm />
    </>
  );
}
