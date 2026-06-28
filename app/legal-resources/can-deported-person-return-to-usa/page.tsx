import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { returnScenarios, DISCLAIMER } from "@/lib/legalResourcesData";
import { ShieldAlert, ArrowUpRight, Scale, CheckCircle, XCircle, AlertTriangle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Can a Deported Person Return to the U.S.? Legal Paths Explained | Deported Not Defeated",
  description:
    "Learn realistic legal pathways for deported individuals who may want to return to the United States, including waivers, re-entry bars, family petitions, employment sponsorship, and legal help.",
};

const pathways = [
  {
    num: "01",
    title: "Family-Based Immigration",
    body: "If the deported person has a U.S. citizen spouse, a U.S. citizen child age 21 or older, or a U.S. citizen parent, they may eventually qualify for an immigrant visa. However, deportation usually creates a re-entry bar, so they often must first obtain permission to reapply for admission — typically using Form I-212 — and a waiver of inadmissibility if required, often Form I-601.",
  },
  {
    num: "02",
    title: "Employment Sponsorship",
    body: "A U.S. employer may be able to sponsor someone for certain skilled worker, professional, or employment-based immigration categories. Previous deportation may still require waivers or permission to reapply before a visa can be issued.",
  },
  {
    num: "03",
    title: "Wait Until the Re-Entry Bar Expires",
    body: "Many deported individuals face 5-year, 10-year, or 20-year bars depending on: expedited removal, removal after immigration court, prior removals, and criminal history. Once the bar expires, the person is not automatically allowed back. They still need to qualify for a visa and meet all current immigration requirements.",
  },
  {
    num: "04",
    title: "Waiver of Inadmissibility",
    body: "Some people may qualify for a waiver (Form I-601) if denial would cause extreme hardship to a qualifying U.S. citizen or lawful permanent resident family member. These waivers are discretionary — not guaranteed. An attorney's guidance is essential before filing.",
  },
  {
    num: "05",
    title: "Marriage to a U.S. Citizen",
    body: "Marriage alone does not erase a deportation order. A genuine marriage may provide a basis for an immigrant visa, but the applicant usually still must address the deportation order, re-entry bars, unlawful presence, criminal issues, and required waivers before a visa can be approved.",
  },
  {
    num: "06",
    title: "Humanitarian Protection",
    body: "Some individuals may qualify through refugee resettlement, asylum-related processes, or humanitarian parole, depending on the specific circumstances of their case and the conditions in their country of origin.",
  },
  {
    num: "07",
    title: "Motion to Reopen or Appeal",
    body: "If the original removal order involved legal error, ineffective assistance of counsel, or significant new evidence, an immigration attorney may be able to seek reopening, vacating, or challenging the prior case before an immigration court.",
  },
];

const outlookConfig: Record<string, { label: string; style: string; Icon: typeof CheckCircle }> = {
  possible:       { label: "May Be Possible",   style: "bg-green-50  border-green-200  text-green-800",  Icon: CheckCircle  },
  "case-by-case": { label: "Case by Case",       style: "bg-blue-50   border-blue-200   text-blue-800",   Icon: AlertTriangle },
  difficult:      { label: "Difficult",          style: "bg-yellow-50 border-yellow-200 text-yellow-800", Icon: AlertTriangle },
  "very-difficult":{ label: "Very Difficult",    style: "bg-red-50    border-red-200    text-red-800",    Icon: XCircle      },
};

export default function CanDeportedPersonReturnPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal-resources" className="text-gray-400 text-sm hover:text-white transition-colors mb-6 inline-flex items-center gap-1">
            ← Legal Resources
          </Link>
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3 mt-4">Legal Guide</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            Can Someone Deported From the U.S. Return Legally?
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            The answer depends almost entirely on why the person was deported. Some people can legally return to the U.S. after a waiting period. Others may qualify for a waiver. A smaller group may be permanently barred unless they receive special permission.
          </p>
        </div>
      </section>

      {/* ── Sticky disclaimer ────────────────────────────────────────────── */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3 text-yellow-800 text-sm">
          <ShieldAlert size={18} className="shrink-0 mt-0.5 text-yellow-600" />
          <p><strong>Educational purposes only — not legal advice.</strong> {DISCLAIMER}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-16 space-y-16">

        {/* ── Pathways ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold text-navy-800 mb-8">The Most Realistic Pathways</h2>
          <div className="space-y-5">
            {pathways.map((p) => (
              <div key={p.num} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-5">
                <span className="text-4xl font-black text-gray-100 leading-none shrink-0 select-none tabular-nums">{p.num}</span>
                <div>
                  <h3 className="font-bold text-navy-800 text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Criminal convictions warning ──────────────────────────────────── */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-7">
          <h2 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
            <XCircle size={20} /> Criminal Convictions Make It More Difficult
          </h2>
          <p className="text-red-700 text-sm leading-relaxed mb-3">
            Drug trafficking, violent felonies, aggravated felonies, terrorism-related grounds, and immigration fraud can make returning much more difficult — or sometimes nearly impossible — without very specific legal exceptions.
          </p>
          <p className="text-red-700 text-sm leading-relaxed font-semibold">
            If criminal convictions are part of your history, speak with an attorney who specializes in criminal immigration law before taking any action.
          </p>
        </section>

        {/* ── Illegal re-entry warning ──────────────────────────────────────── */}
        <section className="bg-gray-950 rounded-2xl p-7 text-white">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-yellow-400" /> Entering Illegally After Deportation Is Dangerous
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Returning to the U.S. without authorization after deportation can lead to criminal prosecution and prison time, a new removal order, longer or permanent re-entry bars, and lasting immigration consequences that may close future legal options permanently.
          </p>
        </section>

        {/* ── Scenarios table ───────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-extrabold text-navy-800 mb-6">Typical Scenarios</h2>

          {/* Mobile: cards */}
          <div className="space-y-3 sm:hidden">
            {returnScenarios.map((s) => {
              const cfg = outlookConfig[s.outlook];
              const Icon = cfg.Icon;
              return (
                <div key={s.reason} className={`border rounded-xl p-4 ${cfg.style}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={15} />
                    <span className="font-bold text-sm">{s.reason}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">{s.note}</p>
                  <span className="inline-block mt-2 text-xs font-semibold opacity-70">{cfg.label}</span>
                </div>
              );
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-800 text-white text-left">
                  <th className="px-5 py-4 font-bold w-1/2">Reason for Deportation</th>
                  <th className="px-5 py-4 font-bold w-1/4">Outlook</th>
                  <th className="px-5 py-4 font-bold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {returnScenarios.map((s, i) => {
                  const cfg = outlookConfig[s.outlook];
                  const Icon = cfg.Icon;
                  return (
                    <tr key={s.reason} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-4 font-medium text-navy-800">{s.reason}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.style}`}>
                          <Icon size={12} /> {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs leading-relaxed">{s.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Closing statement ─────────────────────────────────────────────── */}
        <section className="bg-brand-red text-white rounded-2xl p-8 text-center">
          <Scale size={32} className="mx-auto mb-4 opacity-70" />
          <p className="text-lg md:text-xl font-bold leading-relaxed max-w-xl mx-auto">
            &ldquo;Every case is different. Before spending money or filing immigration forms, speak with a licensed immigration attorney who understands deportation, re-entry bars, waivers, and criminal immigration consequences.&rdquo;
          </p>
        </section>

        {/* ── Bottom CTAs ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-navy-800 mb-5 text-center">Need Help Understanding Your Options?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/legal-resources#find-legal-help"
              className="group bg-navy-800 text-white rounded-2xl p-6 hover:bg-navy-700 transition-colors flex items-start gap-4"
            >
              <Scale size={20} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Find Legal Resources</p>
                <p className="text-gray-400 text-sm mt-1">Browse our immigration law firm directory and attorney referral listings.</p>
              </div>
              <ArrowUpRight size={15} className="text-gray-500 group-hover:text-brand-red transition-colors ml-auto mt-1 shrink-0" />
            </Link>
            <Link
              href="/legal-resources#legal-tools"
              className="group bg-white border border-gray-200 text-navy-800 rounded-2xl p-6 hover:shadow-md transition-all flex items-start gap-4"
            >
              <BookOpen size={20} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Legal Tools & Document Help</p>
                <p className="text-gray-500 text-sm mt-1">Organize documents, request records, translate files, and prepare for consultations.</p>
              </div>
              <ArrowUpRight size={15} className="text-gray-300 group-hover:text-brand-red transition-colors ml-auto mt-1 shrink-0" />
            </Link>
          </div>
        </section>

      </article>

      <NewsletterForm />
    </>
  );
}
