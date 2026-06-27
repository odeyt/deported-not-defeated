import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import ChecklistGate from "@/components/ChecklistGate";

export const metadata: Metadata = {
  title: "How to Start Over After Deportation — A Real Guide",
  description: "A practical, honest guide to starting over after deportation. Housing, work, money, documents, and mental health — step by step, no shame.",
  keywords: ["how to start over after deportation", "rebuilding life after deportation", "deported from USA", "life after deportation guide", "deportation survival guide"],
};

export default function StartOverPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">You Are Not Alone</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">How to Start Over After Deportation</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">This is not the end of your story. Thousands of people have been deported from the USA and rebuilt meaningful lives. Here is how they did it — and how you can too.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-12">

          <div className="bg-brand-red text-white rounded-2xl p-7 text-center">
            <p className="text-2xl font-bold mb-2">&ldquo;You did not lose your future. You lost your location.&rdquo;</p>
            <p className="text-red-200">Your skills, your relationships, your determination — those came with you.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-2">First: Acknowledge What Just Happened</h2>
            <p className="text-gray-600 leading-relaxed">Deportation is a traumatic event. You may have lost your home, your job, your children nearby, your community of 10, 20, 30 years. That is real. Do not rush past it.</p>
            <p className="text-gray-600 leading-relaxed mt-3">At the same time, the next few weeks are critical. The decisions you make now will shape the next year. This guide is designed to help you make good ones.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-5">The 5 Pillars of Rebuilding</h2>
            <div className="space-y-4">
              {[
                { num: "01", title: "Safety First", desc: "Before anything else — safe shelter, food, water. You cannot think clearly or make good decisions if your basic needs are not met. Get a guesthouse for your first night. Everything else starts there.", link: "/laos/housing-after-deportation", linkLabel: "Find Housing" },
                { num: "02", title: "Stay Connected", desc: "Get a SIM card within 24 hours. Message your family. Let people know you are safe. Isolation is one of the biggest risks in the first weeks. Your network — even from far away — is a resource.", link: "/laos/sim-card-laos", linkLabel: "Get a SIM Card" },
                { num: "03", title: "Secure Income", desc: "You do not need a career right now. You need income. English tutoring, hotel work, translation, online freelance — start with whatever gets you money in your hand within the first 2 weeks.", link: "/laos/find-work-laos", linkLabel: "Find Work" },
                { num: "04", title: "Handle Documents", desc: "Your legal status in Laos matters. Understand your visa, your right to stay, and whether you need to contact the embassy. Do this in week 2 — after you are stable.", link: "/laos/legal-help", linkLabel: "Legal Help" },
                { num: "05", title: "Rebuild Identity", desc: "Who are you now? What do you want to build here? Some people find Laos becomes a new opportunity — lower cost of living, slower pace, a chance to start something they never could in the US. Give yourself permission to see it that way.", link: "/laos/resources", linkLabel: "Resources & Tools" },
              ].map((p) => (
                <div key={p.num} className="border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-5xl font-extrabold text-gray-100 leading-none shrink-0">{p.num}</span>
                    <div>
                      <h3 className="font-bold text-navy-800 text-lg mb-2">{p.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{p.desc}</p>
                      <Link href={p.link} className="text-brand-red font-bold text-sm hover:underline inline-flex items-center gap-1">
                        {p.linkLabel} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Mental Health — The Part Nobody Talks About</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Depression, anxiety, and grief are extremely common after deportation. You may feel anger, shame, hopelessness, or numbness. All of these are normal responses to an abnormal situation.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3 text-sm text-blue-800">
              <p><strong>What helps:</strong></p>
              <ul className="space-y-2">
                {[
                  "Talk to someone — a family member, a friend, anyone who will listen without judgment",
                  "Get outside every day — even a 20-minute walk changes brain chemistry",
                  "Set one small goal per day. Complete it. That is enough.",
                  "Avoid isolation — find a café, a market, a church, anywhere with other people",
                  "Give yourself 90 days before judging how things are going",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2"><CheckCircle size={14} className="text-blue-600 mt-0.5 shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Stories of People Who Rebuilt</h2>
            <p className="text-gray-600 leading-relaxed">Many people deported from the USA have gone on to build businesses, raise families, earn degrees, and find purpose in their home countries. Some even say deportation — as devastating as it was — forced them to find a version of themselves they never would have discovered otherwise.</p>
            <p className="text-gray-600 leading-relaxed mt-3">You are not the first person to be in this position. You will not be the last. And you will not be defined by it.</p>
          </div>

          <div className="bg-navy-800 rounded-2xl p-8 text-center">
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Free Download</p>
            <h3 className="text-2xl font-bold text-white mb-3">Get the Laos Restart Checklist</h3>
            <p className="text-gray-300 text-sm mb-6">Your first 30 days, step by step. Download it to your phone — no WiFi needed once saved.</p>
            <ChecklistGate className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg">
              Download Free PDF →
            </ChecklistGate>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">All Laos Guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Your First 30 Days", "/laos/first-30-days"],
                ["Find Housing", "/laos/housing-after-deportation"],
                ["Get a SIM Card", "/laos/sim-card-laos"],
                ["Receive Money from USA", "/laos/receive-money-usa-to-laos"],
                ["Find Work", "/laos/find-work-laos"],
                ["Emergency Numbers", "/laos/emergency-numbers-laos"],
                ["Best Hospitals", "/laos/hospitals-vientiane"],
                ["Cost of Living", "/laos/cost-of-living-vientiane"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 font-medium text-navy-800 transition-colors text-sm">
                  {label} →
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
