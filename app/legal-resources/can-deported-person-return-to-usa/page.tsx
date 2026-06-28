import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { ShieldAlert, ArrowUpRight, Scale, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Can a Deported Person Return to the U.S.? Legal Paths Explained | Deported Not Defeated",
  description:
    "Learn realistic legal pathways for deported individuals who may want to return to the United States, including waivers, re-entry bars, family petitions, employment sponsorship, and legal help.",
};

const pathways = [
  {
    num: "01",
    title: "Family-Based Immigration",
    body: "If the deported person has a U.S. citizen spouse, a U.S. citizen child age 21 or older, or a U.S. citizen parent, they may eventually qualify for an immigrant visa. However, deportation usually creates a re-entry bar, so they often must obtain permission to reapply for admission — using Form I-212 — and a waiver of inadmissibility if required, using Form I-601.",
  },
  {
    num: "02",
    title: "Employment Sponsorship",
    body: "A U.S. employer may be able to sponsor someone for certain skilled worker, professional, or employment-based immigration categories. Previous deportation may still require waivers or permission to reapply for admission before a visa can be issued.",
  },
  {
    num: "03",
    title: "Wait Until the Re-Entry Bar Expires",
    body: "Many deported individuals face 5-year, 10-year, or 20-year bars depending on expedited removal, removal after immigration court, prior removals, and criminal history. Once the bar expires, the person is not automatically allowed back. They still need to qualify for a visa and meet all immigration requirements.",
  },
  {
    num: "04",
    title: "Waiver of Inadmissibility",
    body: "Some people may qualify for a waiver (Form I-601) if denial would cause extreme hardship to a qualifying U.S. citizen or lawful permanent resident family member. These waivers are discretionary and not guaranteed — an attorney's guidance is essential.",
  },
  {
    num: "05",
    title: "Marriage to a U.S. Citizen",
    body: "Marriage alone does not erase a deportation order. A genuine marriage may provide a basis for an immigrant visa, but the applicant usually still must address the deportation order, re-entry bars, unlawful presence, criminal issues, and required waivers before a visa can be approved.",
  },
  {
    num: "06",
    title: "Humanitarian Protection",
    body: "Some individuals may qualify through refugee resettlement, asylum-related processes, or humanitarian parole, depending on the specific circumstances of their case and country of origin.",
  },
  {
    num: "07",
    title: "Motion to Reopen or Appeal",
    body: "If the original removal order involved legal error, ineffective assistance of counsel, or significant new evidence, an immigration attorney may be able to seek reopening, vacating, or challenging the prior removal case before an immigration court.",
  },
];

const scenarios = [
  { scenario: "Visa overstay",                         outlook: "possible",   note: "Often possible after waiting period and/or obtaining required waivers." },
  { scenario: "Unlawful presence",                     outlook: "possible",   note: "Often possible with the proper visa and hardship waivers." },
  { scenario: "Minor non-violent criminal offense",    outlook: "possible",   note: "Possible in some cases — highly fact-specific." },
  { scenario: "Immigration fraud",                     outlook: "difficult",  note: "Difficult, but waivers may exist depending on the facts." },
  { scenario: "Aggravated felony",                     outlook: "difficult",  note: "Very difficult and highly case-specific — consult an attorney." },
  { scenario: "Multiple illegal re-entries after removal", outlook: "very-difficult", note: "Extremely difficult due to criminal charges and additional penalties." },
];

const outlookStyle: Record<string, string> = {
  possible: "text-green-700 bg-green-50 border-green-200",
  difficult: "text-yellow-700 bg-yellow-50 border-yellow-200",
  "very-difficult": "text-red-700 bg-red-50 border-red-200",
};
const outlookIcon: Record<string, typeof CheckCircle> = {
  possible: CheckCircle,
  difficult: AlertTriangle,
  "very-difficult": XCircle,
};

export default function CanDeportedPersonReturnPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal-resources" className="text-gray-400 text-sm hover:text-white transition-colors mb-6 inline-block">
            ← Legal Resources
          </Link>
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Legal Guide</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Can Someone Deported From the U.S. Return Legally?
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            The answer depends almost entirely on why the person was deported. Some people can legally return after a waiting period. Others may qualify for a waiver. A smaller group may be permanently barred unless they receive special permission.
          </p>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-start gap-3 text-yellow-800 text-sm">
          <ShieldAlert size={18} className="shrink-0 mt-0.5" />
          <p>
            <strong>Educational purposes only — not legal advice.</strong>{" "}
            Immigration law is complex and constantly changing. Every case is different. Always consult a licensed immigration attorney before making legal decisions or filing any immigration forms.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-16 space-y-16">

        {/* Pathways */}
        <section>
          <h2 className="text-2xl font-extrabold text-navy-800 mb-8">The Most Realistic Pathways</h2>
          <div className="space-y-6">
            {pathways.map((p) => (
              <div key={p.num} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-5">
                <div className="text-3xl font-black text-gray-100 leading-none shrink-0 select-none">{p.num}</div>
                <div>
                  <h3 className="font-bold text-navy-800 text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Criminal convictions warning */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-7">
          <h2 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
            <XCircle size={20} /> Criminal Convictions Make It More Difficult
          </h2>
          <p className="text-red-700 text-sm leading-relaxed mb-3">
            Drug trafficking, violent felonies, aggravated felonies, terrorism-related grounds, and immigration fraud can make returning much more difficult — or sometimes nearly impossible — without very specific legal exceptions.
          </p>
          <p className="text-red-700 text-sm leading-relaxed font-semibold">
            If you have criminal convictions in your history, speak with an attorney who specializes in criminal immigration law before taking any action.
          </p>
        </section>

        {/* Illegal re-entry warning */}
        <section className="bg-gray-950 rounded-2xl p-7 text-white">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <AlertTriangle size={20} className="text-yellow-400" /> Entering Illegally After Deportation Is Dangerous
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Returning to the U.S. without authorization after deportation can lead to criminal prosecution and prison time, another removal order, longer re-entry bars, and permanent immigration consequences that may close off future legal options.
          </p>
        </section>

        {/* Typical scenarios */}
        <section>
          <h2 className="text-2xl font-extrabold text-navy-800 mb-6">Typical Scenarios</h2>
          <div className="space-y-3">
            {scenarios.map((s) => {
              const Icon = outlookIcon[s.outlook];
              return (
                <div key={s.scenario} className={`border rounded-xl p-4 flex items-start gap-4 ${outlookStyle[s.outlook]}`}>
                  <Icon size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">{s.scenario}</p>
                    <p className="text-sm mt-0.5 opacity-80">{s.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing statement */}
        <section className="bg-brand-red text-white rounded-2xl p-8 text-center">
          <Scale size={32} className="mx-auto mb-4 opacity-80" />
          <p className="text-lg font-bold leading-relaxed">
            &ldquo;Every case is different. Before spending money or filing immigration forms, speak with a licensed immigration attorney who understands deportation, re-entry bars, waivers, and criminal immigration consequences.&rdquo;
          </p>
        </section>

        {/* CTAs */}
        <section className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/legal-resources#law-firms"
            className="group bg-navy-800 text-white rounded-2xl p-6 hover:bg-navy-700 transition-colors flex items-start gap-4"
          >
            <Scale size={20} className="text-brand-red shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Find Legal Help</p>
              <p className="text-gray-400 text-sm mt-1">Browse our immigration law firm directory.</p>
            </div>
            <ArrowUpRight size={16} className="text-gray-500 group-hover:text-brand-red transition-colors ml-auto mt-1 shrink-0" />
          </Link>
          <Link
            href="/legal-resources"
            className="group bg-white border border-gray-200 text-navy-800 rounded-2xl p-6 hover:shadow-md transition-all flex items-start gap-4"
          >
            <ShieldAlert size={20} className="text-brand-red shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Back to Legal Resources</p>
              <p className="text-gray-500 text-sm mt-1">Explore tools, waivers, and more guides.</p>
            </div>
            <ArrowUpRight size={16} className="text-gray-300 group-hover:text-brand-red transition-colors ml-auto mt-1 shrink-0" />
          </Link>
        </section>

      </article>

      <NewsletterForm />
    </>
  );
}
