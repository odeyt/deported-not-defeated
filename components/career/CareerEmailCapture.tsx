"use client";

import { useState } from "react";
import { Download } from "lucide-react";

const COUNTRIES = [
  "Mexico", "Guatemala", "El Salvador", "Honduras", "Nicaragua", "Costa Rica",
  "Belize", "Panama", "Colombia", "Venezuela", "Brazil", "Ecuador", "Peru",
  "Dominican Republic", "Jamaica", "Haiti", "Cuba", "Philippines", "Vietnam",
  "Cambodia", "Laos", "Thailand", "India", "China", "Nigeria", "Ghana", "Other",
];

const INTERESTS = [
  "Find a local job", "Remote / online work", "Teach English", "Start a business",
  "Get certified / take courses", "Trade / vocational skills", "Resume help",
];

export default function CareerEmailCapture() {
  const [form, setForm] = useState({ name: "", email: "", country: "", interest: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus("loading");
    try {
      // Uses existing /api/subscribe endpoint
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, country: form.country, interest: form.interest }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-gradient-to-br from-navy-800 to-gray-900 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-8 md:p-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/30 text-brand-red text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Download size={12} /> Free Download
          </div>
          <h2 className="text-white font-extrabold text-2xl md:text-3xl mb-3">
            Download the Free Career Rebuild Checklist
          </h2>
          <p className="text-gray-300 text-base mb-8 leading-relaxed">
            A step-by-step guide covering jobs, online courses, English teaching, remote work setup, and small business ideas — tailored for people rebuilding after deportation.
          </p>

          {status === "success" ? (
            <div className="bg-green-900/40 border border-green-600/40 rounded-xl p-6 text-center">
              <p className="text-green-300 font-bold text-lg mb-2">You're in!</p>
              <p className="text-green-200 text-sm">Check your email for the Career Rebuild Checklist. If you don't see it, check your spam folder.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-red text-sm"
                />
                <input
                  type="email"
                  placeholder="Your email address *"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-red text-sm"
                />
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-brand-red text-sm"
                >
                  <option value="">Country you're rebuilding in</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="text-gray-900">{c}</option>
                  ))}
                </select>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-brand-red text-sm"
                >
                  <option value="">Career interest</option>
                  {INTERESTS.map((i) => (
                    <option key={i} value={i} className="text-gray-900">{i}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-red hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-base"
              >
                {status === "loading" ? "Sending..." : "Get the Free Checklist →"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
              )}
              <p className="text-gray-500 text-xs text-center">No spam. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
