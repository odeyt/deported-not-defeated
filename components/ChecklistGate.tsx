"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function ChecklistGate({ className, children }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      await supabase
        .from("newsletter_subscribers")
        .insert({ email, name: name || null });
    } catch {}
    // Trigger download regardless (even if already subscribed)
    setStatus("done");
    window.location.href = "/api/checklist";
    setTimeout(() => {
      setOpen(false);
      setStatus("idle");
      setEmail("");
      setName("");
    }, 1500);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">
                Free Download
              </p>
              <h3 className="text-2xl font-extrabold text-navy-800 mb-2">
                Get the Laos Restart Checklist
              </h3>
              <p className="text-gray-500 text-sm">
                Enter your email and we'll send updates plus deliver your PDF instantly.
              </p>
            </div>

            {status === "done" ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-bold text-lg mb-1">Your download is starting...</p>
                <p className="text-gray-500 text-sm">Check your downloads folder.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-red text-sm"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-red text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  {status === "loading" ? "Starting download..." : "Download Free PDF →"}
                </button>
                <p className="text-center text-gray-400 text-xs">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
