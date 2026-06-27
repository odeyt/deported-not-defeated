import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import ChecklistGate from "@/components/ChecklistGate";

export const metadata: Metadata = {
  title: "First 30 Days in Laos Checklist",
  description:
    "A step-by-step survival checklist for your first 30 days in Laos after deportation. Phone, housing, money, legal documents, and more.",
};

const weeks = [
  {
    title: "Days 1–3: Land Safe",
    color: "border-brand-red bg-red-50",
    items: [
      "Find a guesthouse or safe place to sleep tonight",
      "Eat something — identify a nearby market or restaurant",
      "Get a Lao SIM card (Unitel or Lao Telecom — costs $5–10)",
      "Connect to WiFi and message family you are safe",
      "Find out where the nearest hospital is",
      "Count your money. Know what you have.",
      "Do not panic. You made it here. That is step one.",
    ],
  },
  {
    title: "Days 4–7: Get Connected",
    color: "border-orange-400 bg-orange-50",
    items: [
      "Buy a data plan for your SIM (monthly is cheapest)",
      "Download WhatsApp, Google Maps, Google Translate",
      "Locate the nearest bank or money exchange",
      "If you have family in Laos, contact them now",
      "Find a local who speaks English — a guide or interpreter",
      "Identify your nearest embassy or consulate",
      "Make a weekly budget. Even a rough one.",
    ],
  },
  {
    title: "Week 2: Documents & Stability",
    color: "border-yellow-500 bg-yellow-50",
    items: [
      "Visit the embassy if you need a new passport or ID",
      "Understand your visa status — how long can you stay?",
      "Ask about residency options for Lao nationals",
      "Open a basic bank account if possible",
      "Set up a way to receive money from the USA (Western Union, Wise, Remitly)",
      "Find a longer-term, cheaper place to stay",
      "Start learning 10 basic Lao words",
    ],
  },
  {
    title: "Week 3–4: Start Rebuilding",
    color: "border-green-500 bg-green-50",
    items: [
      "Look for short-term income — day labor, English tutoring, delivery",
      "Visit the local job board or ask around at markets",
      "Connect with expat and returnee communities online",
      "Find a reliable food source (market, family, meal prep)",
      "Schedule a checkup at a local clinic",
      "If struggling emotionally, find someone to talk to — it is okay",
      "Write down your 3-month goal. One sentence is enough.",
    ],
  },
];

export default function First30DaysPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
            Laos Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your First 30 Days</h1>
          <p className="text-gray-300 text-lg">
            A step-by-step checklist for surviving and stabilizing in Laos. One day at a time.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-red text-white rounded-2xl p-6 mb-10 text-center">
            <p className="text-xl font-bold mb-2">
              &ldquo;Start with one safe place to sleep, one phone number, one job lead, one step forward.&rdquo;
            </p>
            <p className="text-red-200 text-sm">You do not need to figure everything out today.</p>
          </div>

          <div className="space-y-8">
            {weeks.map((week) => (
              <div key={week.title} className={`border-l-4 ${week.color} rounded-r-xl p-6`}>
                <h2 className="font-bold text-navy-800 text-xl mb-4">{week.title}</h2>
                <ul className="space-y-3">
                  {week.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-green-600 mt-0.5 shrink-0"
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Download CTA */}
          <div className="mt-12 bg-navy-800 rounded-2xl p-8 text-center">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Free Download</p>
            <h3 className="text-2xl font-bold text-white mb-3">Save This Checklist as a PDF</h3>
            <p className="text-gray-300 text-sm mb-6">
              Download the full checklist to your phone. No WiFi needed once saved.
            </p>
            <ChecklistGate className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg">
              Download Free PDF →
            </ChecklistGate>
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-navy-800 mb-3">Next Steps</h3>
            <p className="text-gray-600 mb-6">
              Once you are stable, explore housing, work, and legal help.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                ["Find Housing", "/laos/housing"],
                ["Find Work", "/laos/jobs"],
                ["Legal Help", "/laos/legal-help"],
                ["Search Directory", "/laos/directory"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-navy-800 hover:bg-navy-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
