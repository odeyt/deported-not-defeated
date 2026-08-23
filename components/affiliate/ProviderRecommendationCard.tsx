import Link from "next/link";
import { CheckCircle2, Globe2, Info } from "lucide-react";
import type { AffiliateProvider } from "@/lib/affiliate/types";
import { isMonetizable } from "@/lib/affiliate/selection";

interface Props {
  provider: AffiliateProvider;
  /** ISO 3166-1 alpha-2 the recommendations were requested for. */
  country: string | null;
  /** Where on the site this card is rendered — grouped in click analytics. */
  placement?: string;
  campaign?: string;
}

/**
 * One provider in a recommendation list.
 *
 * Presentation rules (spec §21, §23, §30):
 *   - No fake ratings, no fake discounts, no countdowns, no "#1" or "Best".
 *   - The only badges shown are ones the data actually supports:
 *     "Available in <country>" comes from a real availability row, and
 *     "Partner" only appears when the relationship is genuinely approved.
 *   - Nothing is conveyed by colour alone — every badge carries text.
 *   - The whole card is reachable and operable from the keyboard, and the
 *     link has an accessible name that includes the provider, so a screen
 *     reader user hearing a list of links can tell them apart.
 */
export default function ProviderRecommendationCard({
  provider,
  country,
  placement,
  campaign,
}: Props) {
  const monetized = isMonetizable(provider);

  // Every outbound click goes through /go so the destination stays centrally
  // controlled and validated. Attribution context rides along as query
  // parameters; none of them can change where the visitor ends up.
  const params = new URLSearchParams();
  if (country) params.set("country", country);
  if (placement) params.set("placement", placement);
  if (campaign) params.set("campaign", campaign);
  const query = params.toString();
  const href = `/go/${provider.slug}${query ? `?${query}` : ""}`;

  const ctaLabel = monetized ? provider.ctaLabel : "Visit Official Website";
  const hasDestination = monetized || Boolean(provider.websiteUrl);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-navy-800 text-base leading-tight">{provider.name}</h3>
        {monetized && (
          <span className="shrink-0 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Partner
          </span>
        )}
      </div>

      {provider.description && (
        <p className="text-gray-600 text-sm leading-relaxed">{provider.description}</p>
      )}

      {provider.whyItHelps && (
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">
            Why it may help
          </p>
          <p className="text-gray-700 text-sm leading-snug">{provider.whyItHelps}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {provider.countryPriority !== null && country && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
            <CheckCircle2 size={12} aria-hidden="true" />
            Listed for {country}
          </span>
        )}
        {provider.countryPriority === null && provider.availableGlobally && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">
            <Globe2 size={12} aria-hidden="true" />
            Operates in many countries
          </span>
        )}
        {provider.countryPriority !== null && !provider.countryVerified && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">
            <Info size={12} aria-hidden="true" />
            Confirm availability with provider
          </span>
        )}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100">
        {hasDestination ? (
          <Link
            href={href}
            prefetch={false}
            rel={monetized ? "sponsored nofollow noopener" : "nofollow noopener"}
            className="inline-flex items-center justify-center w-full gap-2 bg-brand-red hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors min-h-[44px]"
          >
            <span>{ctaLabel}</span>
            <span className="sr-only">— {provider.name}, opens the provider website</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <p className="text-sm text-gray-500">
            No link available for {provider.name} yet.
          </p>
        )}
      </div>
    </div>
  );
}
