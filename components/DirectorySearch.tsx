"use client";

import { useState, useCallback } from "react";
import { Search, Filter } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/utils";
import { DirectoryListing } from "@/lib/types";
import DirectoryCard from "./DirectoryCard";

interface Props {
  listings: DirectoryListing[];
}

export default function DirectorySearch({ listings }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [englishOnly, setEnglishOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useCallback(() => {
    return listings.filter((l) => {
      if (query && !l.business_name.toLowerCase().includes(query.toLowerCase()) &&
          !l.description?.toLowerCase().includes(query.toLowerCase())) return false;
      if (category && l.category !== category) return false;
      if (city && l.city !== city) return false;
      if (englishOnly && !l.english_speaking) return false;
      if (verifiedOnly && !l.verified) return false;
      return true;
    });
  }, [listings, query, category, city, englishOnly, verifiedOnly]);

  const results = filtered();
  const featured = results.filter((l) => l.featured);
  const regular = results.filter((l) => !l.featured);

  return (
    <div>
      {/* Search bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search businesses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm text-gray-700"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm text-gray-700"
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-6 mt-3 ml-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={englishOnly}
              onChange={(e) => setEnglishOnly(e.target.checked)}
              className="accent-navy-600"
            />
            English speaking
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-navy-600"
            />
            Verified only
          </label>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        <Filter size={14} className="inline mr-1" />
        {results.length} listing{results.length !== 1 ? "s" : ""} found
      </p>

      {featured.length > 0 && (
        <>
          <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">
            Featured Listings
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featured.map((l) => <DirectoryCard key={l.id} listing={l} />)}
          </div>
        </>
      )}

      {regular.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regular.map((l) => <DirectoryCard key={l.id} listing={l} />)}
        </div>
      )}

      {results.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium mb-2">No listings found</p>
          <p className="text-sm">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
