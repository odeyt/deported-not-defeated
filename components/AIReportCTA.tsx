"use client";

import { useState } from "react";
import { FileText, ChevronRight, Shield } from "lucide-react";
import ImmigrationAssessmentModal from "./ImmigrationAssessmentModal";

export default function AIReportCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ImmigrationAssessmentModal onClose={() => setOpen(false)} />}

      <section className="bg-navy-800 py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
            <FileText size={28} className="text-brand-red" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Free Educational Tool</p>
            <h2 className="text-white font-extrabold text-2xl mb-2 leading-tight">
              AI Immigration Case Preparation Report
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Answer 16 questions and receive a personalized PDF with educational topics, 10 attorney questions, and a document checklist tailored to your situation. Free.
            </p>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              <Shield size={12} className="text-yellow-400" />
              <p className="text-yellow-400/70 text-xs">Educational only — not legal advice</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setOpen(true)}
            className="bg-brand-red hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shrink-0"
          >
            Get Free Report <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}
