"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { CountryData } from "@/data/countries/schema";

interface CountrySearchProps {
  countries: CountryData[];
}

const REGION_ORDER = [
  "North America",
  "Central America",
  "Caribbean",
  "South America",
  "Asia",
  "Africa",
  "Europe",
] as const;

export default function CountrySearch({ countries }: CountrySearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.countryName.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.languages.some((l) => l.toLowerCase().includes(q))
    );
  }, [query, countries]);

  const grouped = useMemo(() => {
    const map: Record<string, CountryData[]> = {};
    for (const country of filtered) {
      if (!map[country.region]) map[country.region] = [];
      map[country.region].push(country);
    }
    return map;
  }, [filtered]);

  const orderedRegions = REGION_ORDER.filter((r) => grouped[r]?.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by country, region, or language…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xl bg-gray-800 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red text-base"
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl mb-2">No results found</p>
          <p className="text-sm">Try searching for a country name, region, or language.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {orderedRegions.map((region) => (
            <section key={region}>
              <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                {region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[region].map((country) => (
                  <div
                    key={country.slug}
                    className="bg-gray-800 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flagEmoji}</span>
                      <div>
                        <h3 className="text-white font-bold text-base leading-tight">
                          {country.countryName}
                        </h3>
                        <p className="text-gray-400 text-xs">{country.region}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {country.summary}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/${country.slug}`}
                        className="inline-block bg-brand-red hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        View Guide →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
