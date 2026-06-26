"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const helpCategories = [
  "Housing",
  "Work / Jobs",
  "Legal / Documents",
  "Healthcare",
  "Banking / Money",
  "Phone / Internet",
  "Transportation",
  "Mental Health",
  "Family Reunion",
  "Business Setup",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    country: "",
    need_help_with: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert(form);
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            We read every message. Tell us how we can help.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <p className="text-4xl mb-4">✅</p>
              <h2 className="text-2xl font-bold text-navy-800 mb-3">Message Received</h2>
              <p className="text-gray-600">
                Thank you for reaching out. We will do our best to respond within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm"
                  placeholder="e.g. Laos, Mexico, Cambodia"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">I need help with</label>
                <select
                  value={form.need_help_with}
                  onChange={(e) => update("need_help_with", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm text-gray-700"
                >
                  <option value="">Select a category</option>
                  {helpCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm resize-none"
                  placeholder="Tell us your situation and how we can help..."
                />
              </div>
              {status === "error" && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
