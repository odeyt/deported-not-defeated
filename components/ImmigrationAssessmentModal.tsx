"use client";

import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Loader2, CheckCircle, FileText, Shield } from "lucide-react";
import type { AssessmentAnswers } from "@/lib/immigrationAssessment";

// ── Question definitions ───────────────────────────────────────────────────────

type Question =
  | { type: "select"; key: keyof AssessmentAnswers; label: string; options: string[] }
  | { type: "text"; key: keyof AssessmentAnswers; label: string; placeholder: string }
  | { type: "conditional"; key: keyof AssessmentAnswers; label: string; options: string[]; dependsOn: keyof AssessmentAnswers; showWhen: string };

const QUESTIONS: Question[] = [
  {
    type: "select",
    key: "deportationReason",
    label: "What was the primary reason for your deportation or removal?",
    options: [
      "Visa overstay",
      "Unlawful presence",
      "Expedited removal",
      "Criminal conviction",
      "Immigration fraud",
      "Removal after immigration court",
      "Unknown / Not told",
      "Prefer not to say",
    ],
  },
  {
    type: "text",
    key: "deportationYear",
    label: "Approximately what year were you deported?",
    placeholder: "e.g. 2019",
  },
  {
    type: "select",
    key: "removalCount",
    label: "How many times have you been deported or removed from the U.S.?",
    options: ["1", "2", "3+"],
  },
  {
    type: "select",
    key: "hasCitizenSpouse",
    label: "Do you have a U.S. citizen spouse?",
    options: ["Yes", "No", "Prefer not to say"],
  },
  {
    type: "select",
    key: "hasLPRSpouse",
    label: "Do you have a spouse who is a U.S. Lawful Permanent Resident (Green Card holder)?",
    options: ["Yes", "No", "Prefer not to say"],
  },
  {
    type: "select",
    key: "hasCitizenParent",
    label: "Do you have a parent who is a U.S. citizen?",
    options: ["Yes", "No", "Prefer not to say"],
  },
  {
    type: "select",
    key: "hasCitizenChild",
    label: "Do you have a child who is a U.S. citizen and is 21 years old or older?",
    options: ["Yes", "No", "Prefer not to say"],
  },
  {
    type: "select",
    key: "hasCriminalConviction",
    label: "Do you have any criminal conviction(s) in the U.S. or another country?",
    options: ["No", "Yes", "Prefer not to say"],
  },
  {
    type: "conditional",
    key: "criminalCategory",
    label: "Which general category best describes the conviction(s)?",
    options: [
      "Minor / misdemeanor",
      "Drug-related offense",
      "Violent felony",
      "Aggravated felony (as defined by immigration law)",
      "Prefer not to say",
    ],
    dependsOn: "hasCriminalConviction",
    showWhen: "Yes",
  },
  {
    type: "select",
    key: "attemptedIllegalReturn",
    label: "After your deportation, did you attempt to re-enter the U.S. without authorization?",
    options: ["No", "Yes", "Prefer not to say"],
  },
  {
    type: "select",
    key: "outsideUS",
    label: "Are you currently living outside of the United States?",
    options: ["Yes", "No"],
  },
  {
    type: "text",
    key: "currentCountry",
    label: "What country are you currently living in?",
    placeholder: "e.g. Laos, Mexico, Philippines…",
  },
  {
    type: "select",
    key: "primaryGoal",
    label: "What is your primary goal?",
    options: [
      "Return permanently to the U.S.",
      "Visit family in the U.S.",
      "Marriage",
      "Employment",
      "Understand my options",
      "Other",
    ],
  },
  {
    type: "select",
    key: "biggestConcern",
    label: "What is your biggest concern right now?",
    options: [
      "Waivers",
      "Waiting period / re-entry bar",
      "Finding a lawyer",
      "Family petition",
      "Employment sponsorship",
      "Appeal",
      "Document preparation",
      "Other",
    ],
  },
  {
    type: "select",
    key: "hasAttorney",
    label: "Do you currently have an immigration attorney?",
    options: ["Yes", "No", "I had one before but not now"],
  },
  {
    type: "select",
    key: "wantsAttorney",
    label: "Would you like to be connected with immigration attorney resources?",
    options: ["Yes", "Maybe", "No"],
  },
];

const EMPTY: AssessmentAnswers = {
  deportationReason: "",
  deportationYear: "",
  removalCount: "",
  hasCitizenSpouse: "",
  hasLPRSpouse: "",
  hasCitizenParent: "",
  hasCitizenChild: "",
  hasCriminalConviction: "",
  criminalCategory: "",
  attemptedIllegalReturn: "",
  outsideUS: "",
  hasAttorney: "",
  primaryGoal: "",
  currentCountry: "",
  biggestConcern: "",
  wantsAttorney: "",
  firstName: "",
  email: "",
  consent: false,
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  onClose: () => void;
}

export default function ImmigrationAssessmentModal({ onClose }: Props) {
  const [step, setStep] = useState(0); // 0 = welcome, 1-16 = questions, 17 = email, 18 = loading, 19 = done
  const [answers, setAnswers] = useState<AssessmentAnswers>({ ...EMPTY });
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Build the list of visible question indices (conditional questions may be hidden)
  const visibleQuestions: Question[] = QUESTIONS.filter((q) => {
    if (q.type === "conditional") {
      return answers[q.dependsOn] === q.showWhen;
    }
    return true;
  });

  const totalSteps = visibleQuestions.length + 2; // +welcome +email
  const questionStep = step - 1; // step 1 → question index 0
  const currentQuestion = questionStep >= 0 && questionStep < visibleQuestions.length ? visibleQuestions[questionStep] : null;

  const progress = step === 0 ? 0 : Math.min(Math.round((step / (totalSteps - 1)) * 100), 100);

  // ── Handlers ───────────────────────────────────────────────────────────────

  function setAnswer(key: keyof AssessmentAnswers, value: string | boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function canAdvance(): boolean {
    if (step === 0) return true;
    if (step === totalSteps) return false; // email page — handled separately
    if (!currentQuestion) return true;
    const val = answers[currentQuestion.key];
    if (typeof val === "string") return val.trim().length > 0;
    return Boolean(val);
  }

  function advance() {
    if (!canAdvance()) {
      setError("Please select or enter an answer to continue.");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  }

  function back() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit() {
    if (!answers.firstName.trim()) { setError("Please enter your first name."); return; }
    if (!answers.email.trim() || !answers.email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!answers.consent) { setError("Please check the box to agree to receive your report."); return; }
    setError("");
    setStep(18); // loading
    try {
      const res = await fetch("/api/immigration-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error("Server error");
      setStep(19); // done
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
      setStep(totalSteps); // back to email step
    }
  }

  // ── Email / contact step (last before submit) ───────────────────────────────
  const isEmailStep = step === totalSteps;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto overflow-hidden flex flex-col max-h-[90vh]">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="bg-navy-800 px-6 pt-6 pb-4 shrink-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-1">Free Report</p>
              <h2 className="text-white font-extrabold text-lg leading-tight">
                AI Immigration Case<br />Preparation Report
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors shrink-0 mt-1">
              <X size={20} />
            </button>
          </div>

          {/* Progress bar */}
          {step > 0 && step < 18 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Question {Math.min(step, visibleQuestions.length)} of {visibleQuestions.length}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-red rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* ── Welcome ──────────────────────────────────────────────────── */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <Shield size={18} className="text-blue-500 shrink-0" />
                <p className="text-blue-800 text-xs leading-relaxed">
                  <strong>Educational purposes only — not legal advice.</strong> This report is for preparation only. Always consult a licensed immigration attorney before taking legal action.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
                <FileText size={18} className="text-gray-500 shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  Answer <strong>16 short questions</strong> and we&apos;ll generate a personalized educational report with:
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Educational topics relevant to your situation",
                  "10 personalized questions to ask an attorney",
                  "Documents you should start gathering",
                  "Helpful resources and next steps",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-red font-bold mt-0.5 shrink-0">→</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400">
                Your report will be emailed to you as a PDF. Your information is kept private and never sold.
              </p>
            </div>
          )}

          {/* ── Questions ────────────────────────────────────────────────── */}
          {step >= 1 && step <= visibleQuestions.length && currentQuestion && (
            <div className="space-y-5">
              <h3 className="text-navy-800 font-bold text-base leading-snug">{currentQuestion.label}</h3>

              {currentQuestion.type === "text" && (
                <input
                  type="text"
                  value={answers[currentQuestion.key] as string}
                  onChange={(e) => setAnswer(currentQuestion.key, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  onKeyDown={(e) => e.key === "Enter" && advance()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                />
              )}

              {(currentQuestion.type === "select" || currentQuestion.type === "conditional") && (
                <div className="space-y-2">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer(currentQuestion.key, opt)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        answers[currentQuestion.key] === opt
                          ? "bg-navy-800 text-white border-navy-800 font-semibold"
                          : "bg-white text-gray-700 border-gray-200 hover:border-navy-800 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {error && <p className="text-brand-red text-xs">{error}</p>}
            </div>
          )}

          {/* ── Email capture ─────────────────────────────────────────────── */}
          {isEmailStep && (
            <div className="space-y-5">
              <div>
                <h3 className="text-navy-800 font-bold text-base mb-1">Where should we send your report?</h3>
                <p className="text-gray-500 text-xs">Your personalized PDF report will be emailed to you within moments.</p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={answers.firstName}
                  onChange={(e) => setAnswer("firstName", e.target.value)}
                  placeholder="Your first name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => setAnswer("email", e.target.value)}
                  placeholder="Email address"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={answers.consent}
                    onChange={(e) => setAnswer("consent", e.target.checked)}
                    className="mt-0.5 accent-brand-red"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    I agree to receive my free immigration preparation report and occasional updates from Deported Not Defeated. I can unsubscribe anytime. <strong className="text-gray-600">This report is educational only and is not legal advice.</strong>
                  </span>
                </label>
              </div>

              {error && <p className="text-brand-red text-xs">{error}</p>}
              {submitError && <p className="text-brand-red text-xs">{submitError}</p>}
            </div>
          )}

          {/* ── Loading ───────────────────────────────────────────────────── */}
          {step === 18 && (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
              <Loader2 size={40} className="text-brand-red animate-spin" />
              <div>
                <p className="font-bold text-navy-800 text-base">Generating your report…</p>
                <p className="text-gray-500 text-sm mt-1">This takes a few seconds. Check your email shortly.</p>
              </div>
            </div>
          )}

          {/* ── Success ───────────────────────────────────────────────────── */}
          {step === 19 && (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <div>
                <p className="font-bold text-navy-800 text-lg">Your report is on its way!</p>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                  Check your email at <strong>{answers.email}</strong>. Your personalized PDF report should arrive within a few minutes.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-yellow-800 text-xs leading-relaxed max-w-xs">
                <strong>Reminder:</strong> This report is for educational preparation only. It is not legal advice. Always speak with a licensed immigration attorney before taking action.
              </div>
              <button
                onClick={onClose}
                className="bg-navy-800 hover:bg-navy-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* ── Footer / Navigation ───────────────────────────────────────────── */}
        {step !== 18 && step !== 19 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0 bg-white">
            {step > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-1 text-gray-500 hover:text-navy-800 text-sm font-medium transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {!isEmailStep && (
              <button
                onClick={advance}
                className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ml-auto"
              >
                {step === 0 ? "Start Free Assessment" : "Continue"} <ChevronRight size={16} />
              </button>
            )}

            {isEmailStep && (
              <button
                onClick={submit}
                className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ml-auto"
              >
                Send My Free Report <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
