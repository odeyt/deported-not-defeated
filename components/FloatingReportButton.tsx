"use client";

import { useState } from "react";
import { FileText, X } from "lucide-react";
import ImmigrationAssessmentModal from "./ImmigrationAssessmentModal";

export default function FloatingReportButton() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      {open && <ImmigrationAssessmentModal onClose={() => setOpen(false)} />}

      {/* Floating pill */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {/* Dismiss X */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="w-6 h-6 rounded-full bg-gray-700/80 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
        >
          <X size={12} />
        </button>

        {/* Main button */}
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2.5 bg-brand-red hover:bg-red-700 text-white pl-3 pr-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <FileText size={14} />
          </div>
          <div className="text-left leading-tight">
            <p className="text-xs font-extrabold tracking-wide">FREE Report</p>
            <p className="text-[10px] text-white/70">Know your options →</p>
          </div>
        </button>
      </div>
    </>
  );
}
