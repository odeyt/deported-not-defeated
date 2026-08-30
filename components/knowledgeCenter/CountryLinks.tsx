import Link from "next/link";
import { Globe } from "lucide-react";
import { countriesBySlug } from "@/data/countries/index";

/** Resolves related-country slugs via the country data registry, dropping any that don't resolve. */
export default function CountryLinks({ slugs }: { slugs: string[] }) {
  const countries = slugs
    .map((slug) => countriesBySlug[slug])
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (!countries.length) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
        Related Country Guides
      </p>
      <div className="flex flex-wrap gap-2">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/${country.slug}`}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-navy-800 hover:border-brand-red hover:text-brand-red transition-colors"
          >
            <Globe size={13} /> {country.flagEmoji} {country.countryName}
          </Link>
        ))}
      </div>
    </div>
  );
}
