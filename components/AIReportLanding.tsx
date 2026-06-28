"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Shield, ChevronRight, CheckCircle, Users, Scale, BookOpen } from "lucide-react";
import ImmigrationAssessmentModal from "./ImmigrationAssessmentModal";
import NewsletterForm from "./NewsletterForm";

const WHAT_YOU_GET = [
  {
    icon: BookOpen,
    title: "Educational Topics",
    desc: "A personalized list of immigration topics that may apply to your specific situation.",
  },
  {
    icon: Scale,
    title: "10 Attorney Questions",
    desc: "Specific questions to ask a licensed immigration attorney during a paid consultation.",
  },
  {
    icon: FileText,
    title: "Documents to Gather",
    desc: "A custom list of records and documents you should begin organizing now.",
  },
  {
    icon: CheckCircle,
    title: "Personalized Next Steps",
    desc: "An educational action plan based on your answers — what to read, gather, and do next.",
  },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Answer 16 Short Questions", desc: "Questions cover your deportation history, family ties, criminal record, and current goals. Takes under 5 minutes." },
  { num: "02", title: "Enter Your Email", desc: "Your personalized report is generated and emailed to you as a PDF within moments of submitting." },
  { num: "03", title: "Review Your Report", desc: "Read your educational report, gather the suggested documents, and prepare for an attorney consultation." },
];

export default function AIReportLanding() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ImmigrationAssessmentModal onClose={() => setOpen(false)} />}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-navy-800 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Free Educational Tool</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            AI Immigration Case<br />Preparation Report
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-xl mx-auto">
            Answer 16 questions about your deportation and receive a personalized educational PDF — topics relevant to your case, attorney questions, and documents to gather.
          </p>

          {/* Disclaimer */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-5 py-3 text-yellow-200 text-xs text-left max-w-xl mx-auto mb-8">
            <Shield size={13} className="inline mr-2 mb-0.5" />
            <strong>Educational purposes only — not legal advice.</strong> This report is a preparation tool. Always consult a licensed immigration attorney before taking any legal action.
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors inline-flex items-center gap-2"
          >
            Get My Free Report <ChevronRight size={18} />
          </button>
          <p className="text-gray-500 text-xs mt-3">Free · Takes ~5 minutes · Sent to your email</p>
        </div>
      </section>

      {/* ── What You Get ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">What&apos;s Included</p>
          <h2 className="text-3xl font-extrabold text-navy-800">What Your Report Includes</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_YOU_GET.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-brand-red" />
              </div>
              <div>
                <h3 className="font-bold text-navy-800 text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Simple Process</p>
            <h2 className="text-3xl font-extrabold text-navy-800">How It Works</h2>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.num} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-5">
                <span className="text-4xl font-black text-gray-100 leading-none shrink-0 select-none tabular-nums">{s.num}</span>
                <div>
                  <h3 className="font-bold text-navy-800 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => setOpen(true)}
              className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors inline-flex items-center gap-2"
            >
              Start Free Assessment <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Who This Helps</p>
          <h2 className="text-3xl font-extrabold text-navy-800">Who This Report Is For</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Users, title: "Deported Individuals", desc: "People living abroad after deportation who want to understand their educational options before spending money on an attorney." },
            { icon: Scale, title: "Family Members in the U.S.", desc: "U.S. citizen spouses, parents, and adult children who want to understand what steps may be involved in a family petition." },
            { icon: FileText, title: "People Preparing for Consultations", desc: "Anyone who wants to arrive at an attorney consultation better prepared with the right questions and documents." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <Icon size={18} className="text-navy-800" />
              </div>
              <h3 className="font-bold text-navy-800 text-sm">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom disclaimer + CTA ────────────────────────────────────────── */}
      <section className="bg-navy-800 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white font-extrabold text-2xl mb-3">Get Your Free Report Now</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Takes about 5 minutes. Emailed immediately. Educational only — not legal advice.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors inline-flex items-center gap-2 mb-8"
          >
            Start Free Assessment <ChevronRight size={18} />
          </button>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <Link href="/legal-resources" className="hover:text-gray-300 transition-colors">Legal Resources</Link>
            <span>·</span>
            <Link href="/legal-resources/can-deported-person-return-to-usa" className="hover:text-gray-300 transition-colors">Can a Deported Person Return?</Link>
            <span>·</span>
            <Link href="/legal-resources#find-legal-help" className="hover:text-gray-300 transition-colors">Find an Attorney</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
