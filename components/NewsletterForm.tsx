"use client";

import { useState } from "react";
import { trackEvent } from "@/components/Analytics";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your email for the download link.");
        trackEvent("newsletter_signup", { method: "footer_form" });
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-navy-800 text-white py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Get the Laos Restart Checklist</h2>
        <p className="text-gray-300 mb-8">
          A free, practical guide to your first 30 days. Housing, phone, money, work — step by
          step. No spam. Ever.
        </p>

        {status === "success" ? (
          <div className="bg-green-800 border border-green-600 text-green-100 rounded-xl p-6">
            <p className="text-lg font-semibold mb-3">{message}</p>
            <a
              href="/api/checklist"
              download
              className="inline-block bg-white text-green-900 hover:bg-green-100 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              Download Your Free PDF Checklist →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 text-white placeholder-gray-400 focus:outline-none focus:border-brand-red"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 text-white placeholder-gray-400 focus:outline-none focus:border-brand-red"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
            >
              {status === "loading" ? "Sending..." : "Get Free Guide"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-red-400 text-sm">{message}</p>
        )}
      </div>
    </section>
  );
}
