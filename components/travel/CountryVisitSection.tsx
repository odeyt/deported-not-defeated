import Link from "next/link";
import { CountryVisitData } from "@/data/familyVisitData";

interface Props {
  countryName: string;
  countrySlug: string;
  data: CountryVisitData;
}

export default function CountryVisitSection({ countryName, countrySlug, data }: Props) {
  return (
    <section className="bg-navy-800 py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
            ✈️
          </div>
          <div>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Family Visit Travel</p>
            <h2 className="text-2xl font-extrabold text-white">Visiting {countryName} to See Family</h2>
            <p className="text-gray-400 text-sm mt-1">
              Practical travel info for US-based family and friends visiting a loved one in {countryName}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Airports */}
          <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">🛬 Airports to Fly Into</h3>
            <ul className="space-y-1.5">
              {data.airports.map((a, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-blue-400 shrink-0 mt-0.5">▸</span>{a}
                </li>
              ))}
            </ul>
          </div>

          {/* Local Transport */}
          <div className="bg-gray-800/60 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">🚌 Getting Around</h3>
            <ul className="space-y-1.5">
              {data.localTransport.map((t, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-teal-400 shrink-0 mt-0.5">▸</span>{t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visa */}
          <div className="bg-blue-900/30 border border-blue-700/30 rounded-2xl p-5">
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-2">📄 Visa Rules</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{data.visaSummary}</p>
            {/* TODO: Replace with iVisa affiliate link when approved */}
            <a href="#affiliate-placeholder" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold mt-3 transition-colors">
              Check visa requirements →
            </a>
          </div>

          {/* Safety */}
          <div className="bg-amber-900/20 border border-amber-700/20 rounded-2xl p-5">
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">🛡️ Safety Tips</h3>
            <ul className="space-y-1.5">
              {data.safetyTips.map((s, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-amber-400 shrink-0 mt-0.5">▸</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick facts row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Currency", value: data.currency, icon: "💰" },
            { label: "Language", value: data.language, icon: "🗣️" },
            { label: "eSIM", value: data.eSIMNote.split(" — ")[0], icon: "📱" },
            { label: "Travel Tip", value: data.travelTip.slice(0, 60) + "…", icon: "💡" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-gray-800/50 border border-white/10 rounded-xl p-3">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">{icon} {label}</p>
              <p className="text-white text-xs leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          {/* TODO: Add analytics events and real affiliate URLs for each CTA */}
          <a
            href="#affiliate-placeholder"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            ✈️ Compare Flights to {countryName}
          </a>
          <a
            href="#affiliate-placeholder"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            🏨 Find Hotels
          </a>
          <a
            href="#affiliate-placeholder"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            🛡️ Get Travel Insurance
          </a>
          <Link
            href="/family-visit-travel"
            className="inline-flex items-center gap-2 border border-blue-400/40 hover:border-blue-400/70 text-blue-300 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Full {countryName} Visit Guide →
          </Link>
        </div>

        <p className="text-gray-600 text-xs mt-5">
          Some links may be affiliate links. Travel information is educational — verify visa rules and safety with official government sources before booking.
        </p>
      </div>
    </section>
  );
}
