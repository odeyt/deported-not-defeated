"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, TrendingUp, Globe, Plane, Users } from "lucide-react";

// FY2025: ICE reported 442,000 removals (Oct 1 2024 – Sep 30 2025)
// Rate: 442,000 / 365 ≈ 1,210.96 per day = 50.46/hr = 0.841/min = 0.01401/sec
const DAILY_RATE = 442000 / 365;
const PER_SECOND = DAILY_RATE / 86400;

// Baseline: use Jan 20 2025 (start of surge) with known count at that point
// Oct 1–Jan 19 (111 days) at ~500/day (Biden-era) ≈ 55,500
// Jan 20 onwards at surge rate
const BASELINE_DATE = new Date("2025-01-20T00:00:00Z");
const BASELINE_COUNT = 55500; // approx deportations Oct 1–Jan 19 FY2025

function getLiveCount(): number {
  const now = Date.now();
  const elapsed = (now - BASELINE_DATE.getTime()) / 1000; // seconds since baseline
  return Math.floor(BASELINE_COUNT + elapsed * PER_SECOND);
}

export default function DeportationCounter() {
  const [count, setCount] = useState(getLiveCount());
  const [today, setToday] = useState(0);

  useEffect(() => {
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);
    const secondsToday = (Date.now() - startOfToday.getTime()) / 1000;
    setToday(Math.floor(secondsToday * PER_SECOND));

    const interval = setInterval(() => {
      setCount(getLiveCount());
      const s = (Date.now() - startOfToday.getTime()) / 1000;
      setToday(Math.floor(s * PER_SECOND));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = count.toLocaleString("en-US");
  const todayFormatted = today.toLocaleString("en-US");

  return (
    <section className="bg-black border-y border-red-900/40 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            Live Tracker
          </span>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold">
            The Numbers Behind the Headlines
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Estimated from official ICE data (FY2025: 442,000+ removals).{" "}
            <a
              href="https://www.axios.com/2026/04/15/ice-deportations-us-immigration-trump-biden-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red underline inline-flex items-center gap-0.5"
            >
              Source <ExternalLink size={10} />
            </a>
          </p>
        </div>

        {/* Main counter */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/50 rounded-2xl p-8 text-center mb-6 shadow-2xl shadow-red-950/30">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
            Estimated U.S. Deportations Since Jan 20, 2025
          </p>
          <p className="text-5xl md:text-7xl font-black text-white tracking-tight tabular-nums">
            {formatted.split("").map((ch, i) =>
              ch === "," ? (
                <span key={i} className="text-red-700 mx-0.5">,</span>
              ) : (
                <span key={i}>{ch}</span>
              )
            )}
          </p>
          <p className="text-brand-red font-bold text-sm mt-3 animate-pulse">
            ● Counter updating live
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: TrendingUp,
              stat: todayFormatted,
              label: "Estimated removed today",
              sub: "~1,211 per day (FY2025 avg)",
            },
            {
              icon: Globe,
              stat: "190+",
              label: "Countries receiving deportees",
              sub: "ICE FY2024 report",
            },
            {
              icon: Users,
              stat: "442,000+",
              label: "Total removed in FY2025",
              sub: "Highest in nearly a decade",
            },
            {
              icon: Plane,
              stat: "~50/hr",
              label: "Average deportation rate",
              sub: "Based on official FY2025 data",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
            >
              <s.icon size={20} className="text-brand-red mx-auto mb-2" />
              <p className="text-2xl font-extrabold text-white tabular-nums">{s.stat}</p>
              <p className="text-gray-300 text-xs mt-1 leading-tight">{s.label}</p>
              <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Flight tracker links */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Plane size={16} className="text-brand-red" />
            <p className="text-white font-bold text-sm">Deportation Flight Trackers & Sources</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Witness at the Border", href: "https://witnessattheborder.org" },
              { label: "ICE Official Stats", href: "https://www.ice.gov/features/ERO-statistics" },
              { label: "DHS Enforcement Data", href: "https://www.dhs.gov/immigration-statistics" },
              { label: "Axios: FY2025 Report", href: "https://www.axios.com/2026/04/15/ice-deportations-us-immigration-trump-biden-2025" },
              { label: "Axios: FY2024 Record", href: "https://www.axios.com/2024/12/20/deportations-immigration-record-2024-ice" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-3 py-2 rounded-lg transition-colors border border-gray-700"
              >
                <ExternalLink size={11} />
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs mb-3">
            Behind every number is a person starting over. We exist to help them.
          </p>
          <Link
            href="/about"
            className="inline-block bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Read Why This Project Exists →
          </Link>
        </div>

      </div>
    </section>
  );
}
