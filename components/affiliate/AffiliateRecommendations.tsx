import Link from "next/link";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import ProviderRecommendationCard from "./ProviderRecommendationCard";
import ImpressionTracker from "./ImpressionTracker";
import { getProvidersForCategory } from "@/lib/affiliate/service";
import {
  rankProviders,
  partitionByCountryEvidence,
} from "@/lib/affiliate/selection";
import { normalizeCountryCode } from "@/lib/affiliate/url";
import {
  CATEGORY_LABELS,
  isAffiliateCategory,
} from "@/lib/affiliate/categories";
import type { AffiliateCategoryCode } from "@/lib/affiliate/categories";

interface Props {
  /** ISO 3166-1 alpha-2, e.g. "MX". Omit for a country-agnostic list. */
  country?: string | null;
  category: AffiliateCategoryCode;
  /** Overrides the default "<Category> Options" heading. */
  heading?: string;
  intro?: string;
  /** Maximum cards to render. */
  limit?: number;
  /** Recorded with each click so we can tell placements apart. */
  placement?: string;
  campaign?: string;
  /** Non-affiliate page to point at when nothing is eligible. */
  fallbackHref?: string;
  fallbackLabel?: string;
  showDisclosure?: boolean;
}

/**
 * Country- and category-aware provider recommendations.
 *
 *   <AffiliateRecommendations country="MX" category="MONEY_TRANSFER" />
 *
 * This is the component that makes the milestone worth doing: provider
 * cards are never hand-maintained per country again. Adding a provider to
 * a country is a database row, not a code change across 45 guides.
 *
 * FAIL-SAFE (spec §37): an async Server Component that awaits a service
 * which never throws. If Supabase is down, if the migration has not been
 * applied, or if the feature flag is off, this renders either the
 * non-affiliate fallback link or nothing at all — the surrounding country
 * guide is unaffected either way.
 */
export default async function AffiliateRecommendations({
  country = null,
  category,
  heading,
  intro,
  limit = 6,
  placement,
  campaign,
  fallbackHref,
  fallbackLabel,
  showDisclosure = true,
}: Props) {
  if (!isAffiliateCategory(category)) return null;

  const countryCode = normalizeCountryCode(country);
  const providers = await getProvidersForCategory({
    category,
    country: countryCode,
  });
  const ranked = rankProviders(providers, { country: countryCode }).slice(
    0,
    limit,
  );

  // Nothing eligible. Still offer the ordinary resource page rather than
  // hiding help because we cannot monetize it (spec §12, §13).
  if (!ranked.length) {
    if (!fallbackHref) return null;
    return (
      <section className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
        <p className="text-gray-600 text-sm">
          {fallbackLabel ??
            `We do not have country-specific listings for this yet.`}{" "}
          <Link
            href={fallbackHref}
            className="text-brand-red font-semibold hover:underline"
          >
            See the full guide →
          </Link>
        </p>
      </section>
    );
  }

  const { available, alternatives } = partitionByCountryEvidence(ranked);
  const title = heading ?? `${CATEGORY_LABELS[category]} Options`;

  // The denominator of affiliate CTR. Built from exactly the providers rendered
  // below, so an impression can never be counted for a card nobody was shown.
  const tracked = [...available, ...alternatives].map((provider) => ({
    providerId: provider.id,
    providerSlug: provider.slug,
    countryCode,
    category,
    placement: placement ?? null,
    campaign: campaign ?? null,
  }));

  return (
    <section
      aria-labelledby={`affiliate-rec-${category.toLowerCase()}`}
      className="space-y-5"
    >
      <div>
        <h2
          id={`affiliate-rec-${category.toLowerCase()}`}
          className="text-2xl font-extrabold text-navy-800"
        >
          {title}
        </h2>
        {intro && (
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">{intro}</p>
        )}
      </div>

      <ImpressionTracker impressions={tracked}>
        {available.length > 0 && (
          <div>
            {countryCode && (
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Listed for {countryCode}
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {available.map((provider) => (
                <ProviderRecommendationCard
                  key={provider.id}
                  provider={provider}
                  country={countryCode}
                  placement={placement}
                  campaign={campaign}
                />
              ))}
            </div>
          </div>
        )}

        {alternatives.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              {available.length > 0 ? "Other Options" : "Options to Compare"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alternatives.map((provider) => (
                <ProviderRecommendationCard
                  key={provider.id}
                  provider={provider}
                  country={countryCode}
                  placement={placement}
                  campaign={campaign}
                />
              ))}
            </div>
          </div>
        )}
      </ImpressionTracker>

      {showDisclosure && <AffiliateDisclosure />}
    </section>
  );
}
