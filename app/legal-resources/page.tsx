import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import {
  lawFirmPartners,
  legalToolPartners,
  legalPathwayCards,
  advertisingOptions,
  DISCLAIMER,
  AFFILIATE_DISCLOSURE,
} from "@/lib/legalResourcesData";
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
  ChevronRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Resources for Deportees | Deported Not Defeated",
  description:
    "Explore educational legal resources for deportees, including possible return pathways, waivers, re-entry bars, document help, and immigration attorney referral options.",
};

const toolIcons: Record<string, typeof FileText> = {
  "document-organizer": FileText,
  "foia-help": FileSearch,
  "translation": Languages,
  "form-support": BookOpen,
  "notary": Stamp,
  "consultation-tool": CalendarCheck,
};

const pathwayIcons = [Users, Globe, ShieldAlert, Briefcase, Scale, BookOpen];

export default function LegalResourcesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Legal Resources</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Legal Resources for Deportees
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Understand possible legal pathways, waivers, re-entry bars, document preparation, and professional help options after deportation.
          </p>

          {/* Disclaimer box */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-6 py-4 text-yellow-200 text-sm max-w-2xl mx-auto mb-8 text-left">
            <p className="font-bold mb-1 flex items-center gap-2">
              <ShieldAlert size={15} className="shrink-0" /> Educational Purposes Only — Not Legal Advice
            </p>
            <p className="leading-relaxed">{DISCLAIMER}</p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/legal-resources/can-deported-person-return-to-usa"
              className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
              Explore Legal Paths
            </Link>
            <a href="#find-legal-help"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
              Find Legal Help
            </a>
            <a href="#advertise"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
              Advertise With Us
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-24">

        {/* ── Legal Pathways ───────────────────────────────────────────────── */}
        <section id="legal-paths">
          <div className="mb-10">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Overview</p>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-3">Possible Legal Pathways</h2>
            <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
              These are general categories — not guarantees. An immigration attorney can assess your specific situation and history.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {legalPathwayCards.map((p, i) => {
              const Icon = pathwayIcons[i];
              return (
                <div key={p.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center">
                    <Icon size={18} className="text-brand-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <Link
                    href="/legal-resources/can-deported-person-return-to-usa"
                    className="inline-flex items-center gap-1 text-brand-red text-sm font-semibold hover:underline"
                  >
                    Learn More <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-navy-800">Full In-Depth Guide</p>
              <p className="text-gray-500 text-sm mt-0.5">Read our complete breakdown of legal return pathways, bars, and waivers.</p>
            </div>
            <Link
              href="/legal-resources/can-deported-person-return-to-usa"
              className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-5 py-3 rounded-xl font-bold transition-colors text-sm shrink-0"
            >
              <BookOpen size={15} /> Read Full Guide <ArrowUpRight size={13} />
            </Link>
          </div>
        </section>

        {/* ── Find Legal Help ──────────────────────────────────────────────── */}
        <section id="find-legal-help">
          <div className="mb-10">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Directory</p>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-3">Find Immigration Legal Help</h2>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              If you or a family member was deported, speaking with a licensed immigration attorney can help you understand your options. The providers below are placeholders and will be replaced with approved partners, sponsored listings, or affiliate referral links.
            </p>
          </div>

          {/* Affiliate disclosure */}
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-xs text-gray-500 mb-6">
            <Info size={14} className="shrink-0 mt-0.5 text-gray-400" />
            <p><strong className="text-gray-600">Disclosure: </strong>{AFFILIATE_DISCLOSURE}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {lawFirmPartners.map((f) => (
              <div key={f.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center">
                  <Scale size={18} className="text-brand-red" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-navy-800 text-base leading-snug">{f.name}</h3>
                  <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                    <Globe size={11} /> {f.location}
                  </p>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.specialty}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={f.href}
                    className="inline-flex items-center gap-1 bg-brand-red hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    {f.cta} <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl px-5 py-4 text-yellow-800 text-xs">
            <ShieldAlert size={14} className="shrink-0 mt-0.5" />
            <p>Listings are for informational purposes only. Users should verify attorney licensing, experience, fees, and case suitability before hiring anyone.</p>
          </div>
        </section>

        {/* ── Legal Tools ──────────────────────────────────────────────────── */}
        <section id="legal-tools">
          <div className="mb-10">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Self-Help Tools</p>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-3">Legal Tools & Document Help</h2>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              These tools can help users organize documents, prepare for attorney consultations, translate records, or request immigration files. Replace placeholder links after affiliate approval.
            </p>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-xs text-gray-500 mb-6">
            <Info size={14} className="shrink-0 mt-0.5 text-gray-400" />
            <p><strong className="text-gray-600">Disclosure: </strong>{AFFILIATE_DISCLOSURE}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {legalToolPartners.map((t) => {
              const Icon = toolIcons[t.id] ?? FileText;
              return (
                <div key={t.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Icon size={18} className="text-navy-800" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-800 text-sm leading-snug">{t.name}</h3>
                    <p className="text-gray-500 text-xs mt-2 leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <a
                      href={t.href}
                      className="inline-flex items-center gap-1 text-brand-red text-sm font-bold hover:underline"
                    >
                      {t.cta} <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Advertise With Us ────────────────────────────────────────────── */}
        <section id="advertise" className="bg-navy-800 rounded-2xl p-10 text-white">
          <div className="max-w-2xl">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Partner With Us</p>
            <h2 className="text-3xl font-extrabold mb-4">Advertise With Deported Not Defeated</h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Are you an immigration attorney, legal service provider, certified translator, document-preparation company, or relocation support provider? Deported Not Defeated connects with deportees and families searching for practical guidance after deportation.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 mb-8">
              {advertisingOptions.map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-brand-red font-bold">→</span> {item}
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-7 py-3 rounded-xl font-bold transition-colors text-sm"
            >
              <MessageSquare size={16} /> Contact Us About Advertising
            </Link>
          </div>
        </section>

        {/* ── Internal navigation links ─────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold text-navy-800 mb-6">Quick Links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Can a Deported Person Return to the U.S.?", desc: "Full breakdown of legal pathways, bars, waivers, and scenarios.", href: "/legal-resources/can-deported-person-return-to-usa", Icon: BookOpen },
              { title: "Find Legal Help",        desc: "Law firm directory and attorney referral listings.",      href: "#find-legal-help", Icon: Scale },
              { title: "Legal Tools & Document Help", desc: "Document organizers, translation, FOIA, and more.", href: "#legal-tools",      Icon: FileText },
              { title: "Advertise With Us",      desc: "Reach deportees and families seeking legal guidance.",   href: "#advertise",        Icon: Briefcase },
            ].map((l) => (
              <Link
                key={l.title}
                href={l.href}
                className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                  <l.Icon size={18} className="text-brand-red" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-navy-800 group-hover:text-brand-red transition-colors text-sm leading-snug">{l.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{l.desc}</p>
                </div>
                <ArrowUpRight size={15} className="text-gray-300 group-hover:text-brand-red transition-colors shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </section>

      </div>

      <NewsletterForm />
    </>
  );
}
