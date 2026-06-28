import type { Metadata } from "next";
import { allCountries } from "@/data/countries/index";
import CountrySearch from "@/components/CountrySearch";

export const metadata: Metadata = {
  title: "Country Guides for Deportees | Deported Not Defeated",
  description:
    "Browse 40+ country-specific guides for U.S. deportees. Find housing, documents, jobs, healthcare, and legal resources for wherever you were deported to.",
  keywords: [
    "country guides deportees",
    "deported to Mexico guide",
    "deported to Philippines guide",
    "deportee resources by country",
    "reentry guide after deportation",
  ],
  openGraph: {
    title: "Country Guides for Deportees | Deported Not Defeated",
    description:
      "Country-specific survival guides for U.S. deportees. Find housing, jobs, healthcare, and legal resources for 40+ countries.",
    type: "website",
  },
};

export default function CountryGuidesPage() {
  return (
    <main className="bg-gray-950 min-h-screen">
      {/* Header */}
      <section className="bg-navy-800 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Country Guides for Deportees
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Wherever you were sent, we have a guide. Find housing, documents, healthcare, jobs, and
          legal resources specific to your country — written for people who have been deported from
          the United States.
        </p>
        <p className="text-gray-400 mt-4 text-sm">
          {allCountries.length} countries covered
        </p>
      </section>

      {/* Search + Grid */}
      <CountrySearch countries={allCountries} />
    </main>
  );
}
