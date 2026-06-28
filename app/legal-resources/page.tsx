import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import {
  Scale,
  FileText,
  Globe,
  Users,
  BookOpen,
  MessageSquare,
  ArrowUpRight,
  ShieldAlert,
  Briefcase,
  FileSearch,
  Languages,
  CalendarCheck,
  Stamp,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Resources for Deportees | Deported Not Defeated",
  description:
    "Understand possible legal pathways, waivers, re-entry bars, and professional help options for people deported from the United States.",
};

const lawFirms = [
  {
    name: "Immigration Law Partner",
    location: "Nationwide (USA)",
    services: ["Removal defense", "I-212 applications", "Waiver petitions"],
    consultation: "Free 30-min consultation",
    tag: "Sponsored",
    href: "/contact",
  },
  {
    name: "Waiver & Deportation Defense Firm",
    location: "USA & International",
    services: ["I-601 hardship waivers", "Appeals & motions to reopen", "Inadmissibility review"],
    consultation: "Paid consultation available",
    tag: "Affiliate Partner",
    href: "/contact",
  },
  {
    name: "Family Petition Attorney",
    location: "All 50 States",
    services: ["Family-based petitions", "Consular processing", "Re-entry bar analysis"],
    consultation: "Virtual consultations",
    tag: "Sponsored",
    href: "/contact",
  },
];

const legalTools = [
  {
    icon: FileText,
    name: "Case Document Organizer",
    desc: "Keep your immigration documents, court notices, and case records organized in one secure place.",
    href: "/contact",
  },
  {
    icon: Stamp,
    name: "Immigration Form Preparation Support",
    desc: "Guided help preparing common USCIS forms — not legal advice, but structured assistance.",
    href: "/contact",
  },
  {
    icon: Languages,
    name: "Certified Translation Services",
    desc: "USCIS-accepted certified translations for birth certificates, court records, and identity documents.",
    href: "/contact",
  },
  {
    icon: FileSearch,
    name: "FOIA / Records Request Assistance",
    desc: "Request your immigration file, A-file, and government records through Freedom of Information Act filings.",
    href: "/contact",
  },
  {
    icon: Briefcase,
    name: "Notary & Document Services",
    desc: "Find notary services for affidavits, declarations, and other legal documents needed for immigration filings.",
    href: "/contact",
  },
  {
    icon: CalendarCheck,
    name: "Legal Consultation Booking",
    desc: "Book a consultation with a licensed immigration attorney who understands deportation and re-entry cases.",
    href: "/contact",
  },
];

const legalPaths = [
  { icon: Users,     title: "Family-Based Immigration",   desc: "U.S. citizen spouse, child 21+, or parent may sponsor you — waivers often required." },
  { icon: Briefcase, title: "Employment Sponsorship",      desc: "A U.S. employer may sponsor skilled workers even after deportation, with proper waivers." },
  { icon: Scale,     title: "Re-Entry Bar Expiration",     desc: "5, 10, or 20-year bars depending on removal type. Expiration doesn't guarantee re-entry." },
  { icon: FileText,  title: "Waiver of Inadmissibility",  desc: "I-601 waiver for extreme hardship to qualifying U.S. citizen or LPR family members." },
  { icon: Globe,     title: "Humanitarian Protection",    desc: "Refugee resettlement, asylum-related processes, or humanitarian parole in limited cases." },
  { icon: BookOpen,  title: "Motion to Reopen / Appeal", desc: "Legal error, ineffective counsel, or new evidence may allow reopening a removal order." },
];

export default function LegalResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Legal Resources</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Legal Resources for Deportees
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Understand possible legal pathways, waivers, re-entry bars, and professional help options. Knowledge is the first step.
          </p>
          {/* Disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl px-6 py-4 text-yellow-200 text-sm max-w-2xl mx-auto mb-8 text-left">
            <p className="font-bold mb-1 flex items-center gap-2"><ShieldAlert size={15} /> Educational Purposes Only</p>
            <p>This information is not legal advice. Immigration law is complex. Consult a licensed immigration attorney before making any legal decisions.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#legal-paths" className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              Explore Legal Paths
            </a>
            <a href="#law-firms" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              Find Legal Help
            </a>
            <a href="#advertise" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              Advertise With Us
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* Legal Pathways Overview */}
        <section id="legal-paths">
          <div className="mb-8">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Overview</p>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-2">Possible Legal Pathways</h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Every case is different. These are general categories — not guarantees. An attorney can assess your specific situation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {legalPaths.map((p) => (
              <div key={p.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center mb-4">
                  <p.icon size={18} className="text-brand-red" />
                </div>
                <h3 className="font-bold text-navy-800 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/legal-resources/can-deported-person-return-to-usa"
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              <BookOpen size={16} />
              Read Full Guide: Can a Deported Person Return to the U.S.?
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        {/* Law Firm Directory */}
        <section id="law-firms">
          <div className="mb-8">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Directory</p>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-2">Immigration Law Firm Directory</h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Firms that may assist with deportation defense, re-entry waivers, and family petitions. Always verify credentials and get multiple opinions.
            </p>
          </div>

          {/* Affiliate disclosure */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-xs text-gray-500 mb-6">
            <strong className="text-gray-600">Disclosure: </strong>
            Some listings on this page may be affiliate or sponsored links. Deported Not Defeated may earn compensation if users click or engage through these links. This does not change our educational mission.
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {lawFirms.map((f) => (
              <div key={f.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center">
                    <Scale size={18} className="text-brand-red" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${f.tag === "Sponsored" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-purple-50 text-purple-700 border border-purple-100"}`}>
                    {f.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-800 text-lg">{f.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1"><Globe size={11} /> {f.location}</p>
                </div>
                <ul className="space-y-1">
                  {f.services.map((s) => (
                    <li key={s} className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="text-brand-red mt-0.5">→</span> {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">{f.consultation}</p>
                  <Link href={f.href} className="inline-flex items-center gap-1 text-brand-red font-bold text-sm hover:underline">
                    Contact <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Tools */}
        <section id="legal-tools">
          <div className="mb-8">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Self-Help Tools</p>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-2">Legal Tools & Document Help</h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Tools that may help you get organized and prepared — not a substitute for legal counsel.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {legalTools.map((t) => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <t.icon size={18} className="text-navy-800" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-800 text-base">{t.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{t.desc}</p>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-gray-400 text-xs italic">Affiliate link</p>
                  <Link href={t.href} className="inline-flex items-center gap-1 text-brand-red font-bold text-sm hover:underline">
                    Learn More <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advertise With Us */}
        <section id="advertise" className="bg-navy-800 rounded-2xl p-10 text-white">
          <div className="max-w-2xl">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Partner With Us</p>
            <h2 className="text-3xl font-extrabold mb-4">Advertise With Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Are you an immigration attorney, legal service provider, translator, or document-preparation company? Advertise with <strong className="text-white">Deported Not Defeated</strong> and connect with deportees and families looking for guidance.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm mb-8">
              {[
                "Immigration attorneys & law firms",
                "Document preparation services",
                "Certified translators",
                "FOIA & records specialists",
                "Notary & legal support services",
                "Consultation booking platforms",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-brand-red font-bold">→</span> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-7 py-3 rounded-xl font-bold transition-colors"
            >
              <MessageSquare size={16} />
              Contact Us About Advertising
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Can a Deported Person Return to the U.S.?", desc: "Full breakdown of legal pathways, bars, and waivers.", href: "/legal-resources/can-deported-person-return-to-usa", icon: BookOpen },
            { title: "Find Legal Help",       desc: "Connect with attorneys who handle deportation cases.", href: "#law-firms",    icon: Scale },
            { title: "Legal Tools",           desc: "Document help, translation, and FOIA assistance.",    href: "#legal-tools",  icon: FileText },
            { title: "Advertise With Us",     desc: "Reach deportees and families seeking legal guidance.", href: "#advertise",    icon: Briefcase },
          ].map((l) => (
            <Link key={l.title} href={l.href} className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                <l.icon size={18} className="text-brand-red" />
              </div>
              <div>
                <p className="font-bold text-navy-800 group-hover:text-brand-red transition-colors">{l.title}</p>
                <p className="text-gray-500 text-sm mt-0.5">{l.desc}</p>
              </div>
              <ArrowUpRight size={16} className="text-gray-300 group-hover:text-brand-red transition-colors ml-auto shrink-0 mt-1" />
            </Link>
          ))}
        </section>

      </div>

      <NewsletterForm />
    </>
  );
}
