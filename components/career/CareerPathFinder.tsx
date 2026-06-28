"use client";

import { useState } from "react";
import { ArrowRight, Briefcase, Laptop, GraduationCap, Wrench, Globe, TrendingUp } from "lucide-react";

const QUESTIONS = [
  {
    id: "english",
    question: "Do you speak English confidently?",
    options: ["Yes — fluently", "Yes — conversational", "A little", "Not yet"],
  },
  {
    id: "education",
    question: "What is your highest education level?",
    options: ["High school diploma or equivalent", "Some college / university", "Trade / vocational certificate", "No formal diploma"],
  },
  {
    id: "workType",
    question: "Do you prefer working online or locally?",
    options: ["Online — from anywhere", "Locally — in person", "A mix of both", "I'm not sure yet"],
  },
  {
    id: "tradeSkills",
    question: "Do you have trade or technical skills?",
    options: ["Yes — construction, electrical, plumbing, etc.", "Yes — cooking, hospitality, agriculture", "Some basic skills", "No trade skills"],
  },
  {
    id: "goal",
    question: "What's your main goal right now?",
    options: ["Fast income — I need money now", "Long-term career — I want to grow", "Start a business eventually", "Learn something new first"],
  },
];

interface Recommendation {
  title: string;
  desc: string;
  icon: React.ReactNode;
  cta: string;
  href: string;
  color: string;
}

function getRecommendations(answers: Record<string, string>): Recommendation[] {
  const recs: Recommendation[] = [];

  const speaksEnglish = answers.english?.includes("fluently") || answers.english?.includes("conversational");
  const hasTrade = answers.tradeSkills?.includes("construction") || answers.tradeSkills?.includes("cooking");
  const prefersOnline = answers.workType?.includes("Online");
  const wantsFastIncome = answers.goal?.includes("Fast income");
  const hasDiploma = !answers.education?.includes("No formal");

  if (speaksEnglish) {
    recs.push({
      title: "Teach English Online or Locally",
      desc: "Your English skills are a valuable asset. Get TEFL/TESOL certified and start teaching — online platforms pay $10–$25/hour. No degree required for many platforms.",
      icon: <GraduationCap size={20} />,
      cta: "Explore TEFL Certification",
      href: "#affiliate-placeholder", // TODO: Replace with TEFL affiliate link
      color: "text-blue-600 bg-blue-50",
    });
  }

  if (prefersOnline || wantsFastIncome) {
    recs.push({
      title: "Remote Freelance Work",
      desc: "Platforms like Upwork and Fiverr let you offer services globally — writing, design, customer support, translation, data entry. Start with what you know.",
      icon: <Laptop size={20} />,
      cta: "Set Up Your Freelance Profile",
      href: "#affiliate-placeholder", // TODO: Replace with Upwork/Fiverr affiliate link
      color: "text-violet-600 bg-violet-50",
    });
  }

  if (hasTrade) {
    recs.push({
      title: "Trade & Vocational Work",
      desc: "Your hands-on skills are in demand. Construction, cooking, agriculture, and electrical work offer stable income. Certification courses can increase your earning power quickly.",
      icon: <Wrench size={20} />,
      cta: "Find Vocational Training",
      href: "#affiliate-placeholder", // TODO: Replace with vocational training affiliate link
      color: "text-orange-600 bg-orange-50",
    });
  }

  if (hasDiploma && speaksEnglish) {
    recs.push({
      title: "BPO / Call Center Work",
      desc: "If you're in Latin America, Philippines, or Southeast Asia, call centers and BPO companies actively hire English speakers with or without a degree.",
      icon: <Briefcase size={20} />,
      cta: "Search Local BPO Jobs",
      href: "#affiliate-placeholder", // TODO: Replace with job board affiliate link
      color: "text-emerald-600 bg-emerald-50",
    });
  }

  recs.push({
    title: "Free Online Courses",
    desc: "Platforms like Coursera, Alison, and edX offer hundreds of free courses with certificates. Build new skills at your own pace — many courses take under 4 weeks.",
    icon: <Globe size={20} />,
    cta: "Browse Free Courses",
    href: "#affiliate-placeholder", // TODO: Replace with Coursera/Alison affiliate link
    color: "text-teal-600 bg-teal-50",
  });

  if (!wantsFastIncome || answers.goal?.includes("business")) {
    recs.push({
      title: "Start a Small Business",
      desc: "Many deportees successfully start micro-businesses — food stands, repair shops, delivery services, or digital services. Start small, grow steady.",
      icon: <TrendingUp size={20} />,
      cta: "Business Startup Resources",
      href: "#affiliate-placeholder", // TODO: Replace with business tools affiliate link
      color: "text-rose-600 bg-rose-50",
    });
  }

  return recs.slice(0, 4);
}

export default function CareerPathFinder() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const currentQ = QUESTIONS[step];

  function handleAnswer(value: string) {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  const recs = done ? getRecommendations(answers) : [];

  return (
    <div className="bg-gray-950 border border-white/10 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-navy-800 to-gray-900 px-6 py-5 border-b border-white/10">
        <h3 className="text-white font-bold text-xl">Find Your Best Career Path</h3>
        <p className="text-gray-400 text-sm mt-1">Answer 5 quick questions — get personalized recommendations.</p>
      </div>

      <div className="p-6">
        {!done ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-brand-red" : "bg-gray-700"}`}
                />
              ))}
            </div>
            <p className="text-gray-400 text-xs">Question {step + 1} of {QUESTIONS.length}</p>

            <div>
              <p className="text-white font-semibold text-lg mb-4">{currentQ.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="text-left bg-gray-800 hover:bg-gray-700 border border-white/10 hover:border-brand-red/50 text-gray-200 hover:text-white text-sm px-4 py-3 rounded-xl transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Your Results</p>
              <h4 className="text-white font-bold text-xl">Recommended Career Paths</h4>
              <p className="text-gray-400 text-sm mt-1">Based on your answers — verify locally before making decisions.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recs.map((r) => (
                <div key={r.title} className="bg-gray-800 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.color}`}>
                    {r.icon}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{r.title}</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                  {/* TODO: Replace href="#affiliate-placeholder" with real affiliate URL */}
                  <a
                    href={r.href}
                    className="inline-flex items-center gap-1 text-brand-red hover:text-red-400 text-xs font-bold transition-colors mt-auto"
                  >
                    {r.cta} <ArrowRight size={12} />
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={reset}
              className="text-gray-400 hover:text-white text-sm underline transition-colors"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
