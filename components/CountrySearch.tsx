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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {grouped[region].map((country) => (
                  <Link
                    key={country.slug}
                    href={`/${country.slug}`}
                    className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square bg-gray-900"
                  >
                    {/* Real national flag as full-card background */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w320/${country.countryCode.toLowerCase()}.png`}
                      alt={`${country.countryName} national flag`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                    {/* Bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-0.5">
                        {country.region}
                      </span>
                      <h3 className="font-bold text-white text-sm md:text-base leading-tight group-hover:text-red-300 transition-colors">
                        {country.countryName}
                      </h3>
                      <p className="text-gray-400 text-xs mt-0.5 hidden md:block">
                        {country.capital}
                      </p>
                    </div>
                    {/* Hover badge */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-lg">
                        View Guide →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
