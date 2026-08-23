// ============================================================
// M-AFFILIATE-1 — Country-aware recommendation component
//
// Usage:
//   <AffiliateRecommendations country="GT" category="MONEY_TRANSFER" />
//
// This replaces hand-maintained provider cards. Pages declare *what* they want
// recommended; the engine decides *who* qualifies, in what order, and whether
// each link is monetized.
//
// FAIL-SAFE: renders null when the engine is disabled, unconfigured, erroring,
// or has nothing eligible for the country. A country guide never breaks because
// of monetization.
// ============================================================

import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import ProviderRecommendationCard, { type CardTone } from "./ProviderRecommendationCard";
import { getRankedProviders } from "@/lib/affiliate-engine/service";
import { AFFILIATE_CATEGORY_LABELS, type AffiliateCategoryCode } from "@/lib/affiliate-engine/types";

interface Props {
  /** Canonical category code, e.g. "MONEY_TRANSFER". */
  category: AffiliateCategoryCode;
  /**
   * ISO-3166-1 alpha-2 country code. When set, only providers with a verified
   * availability row for that country are shown — availability is never assumed.
   * Omit for country-agnostic placements.
   */
  country?: string | null;
  /** Human country name used in the "Available in …" chip. */
  countryName?: string | null;
  heading?: string;
  intro?: string;
  limit?: number;
  tone?: CardTone;
  /** Recorded with each click so conversions can be traced to a placement. */
  placement?: string;
  className?: string;
}

export default async function AffiliateRecommendations({
  category,
  country = null,
  countryName = null,
  heading,
  intro,
  limit = 4,
  tone = "light",
  placement = "recommendations",
  className = "",
}: Props) {
  const providers = await getRankedProviders({ category, countryCode: country, limit });

  // Nothing eligible → render nothing. The page's own editorial content still
  // stands on its own, which is the point of the fail-safe rule.
  if (!providers.length) return null;

  const title = heading ?? `${AFFILIATE_CATEGORY_LABELS[category]} Options`;
  const isDark = tone === "dark";

  return (
    <section className={`${className}`} aria-labelledby="affiliate-recommendations-heading">
      <h2
        id="affiliate-recommendations-heading"
        className={`text-2xl font-extrabold mb-2 ${isDark ? "text-white" : "text-navy-800"}`}
      >
        {title}
      </h2>

      {intro && (
        <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {intro}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {providers.map((provider) => (
          <ProviderRecommendationCard
            key={provider.id}
            provider={provider}
            countryCode={country}
            countryName={countryName}
            placement={placement}
            tone={tone}
          />
        ))}
      </div>

      {/* Disclosure sits directly beneath the commercial cards it applies to —
          never only in the footer or on the Terms page. */}
      <AffiliateDisclosure wording="engine" tone={tone} />
    </section>
  );
}
