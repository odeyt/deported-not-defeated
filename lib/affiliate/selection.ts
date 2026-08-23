/**
 * Deterministic provider selection, ranking, and fallback.
 *
 * Pure functions only — no database, no network, no clock, no randomness.
 * Given the same providers and the same request, this always produces the
 * same order. That is a requirement, not an implementation detail
 * (spec §11, §43): no model and no A/B process may reorder commercial
 * destinations in M-AFFILIATE-1.
 *
 * The ranking deliberately does NOT consider commission, approval status,
 * or expected revenue (spec §23, §40). What we get paid must not decide
 * what a deportee is shown first. Approval only decides whether the
 * *destination* can be an affiliate URL — never the display order.
 */

import type { AffiliateProvider, ResolvedDestination } from "./types";
import { isSafeAffiliateUrl } from "./url";

/**
 * Can this provider legitimately earn us a commission right now?
 *
 * All four conditions are required. A provider that is approved but paused,
 * or approved with a malformed URL, is not monetizable — it is a normal
 * resource listing.
 */
export function isMonetizable(provider: AffiliateProvider): boolean {
  return (
    provider.active === true &&
    provider.approvalStatus === "approved" &&
    isSafeAffiliateUrl(provider.affiliateUrl)
  );
}

/**
 * Is this provider available to someone in `country`?
 *
 * Absence of evidence is treated as unavailability. A provider with no row
 * for the country and no explicit global flag is excluded — we do not
 * assume worldwide coverage (spec §6).
 *
 * When `country` is null the question is not being asked, so only the
 * active flag applies.
 */
export function isAvailableIn(provider: AffiliateProvider, country: string | null): boolean {
  if (!provider.active) return false;
  if (!country) return true;
  if (provider.countryPriority !== null) return true;
  return provider.availableGlobally === true;
}

/**
 * Display order.
 *
 * 1. Providers with explicit availability in this country, ahead of
 *    providers included only because they are marked globally available.
 * 2. Country priority, highest first.
 * 3. Global priority, highest first.
 * 4. Trust score, highest first (null sorts last — an unscored provider
 *    never outranks a scored one on a score it does not have).
 * 5. Name, A→Z, so the order is stable and reproducible.
 *
 * Does not mutate the input.
 */
export function rankProviders(
  providers: readonly AffiliateProvider[],
  options: { country?: string | null } = {}
): AffiliateProvider[] {
  const country = options.country ?? null;

  return providers
    .filter((p) => isAvailableIn(p, country))
    .slice()
    .sort((a, b) => {
      const aExplicit = a.countryPriority !== null ? 1 : 0;
      const bExplicit = b.countryPriority !== null ? 1 : 0;
      if (aExplicit !== bExplicit) return bExplicit - aExplicit;

      const aCountry = a.countryPriority ?? 0;
      const bCountry = b.countryPriority ?? 0;
      if (aCountry !== bCountry) return bCountry - aCountry;

      if (a.globalPriority !== b.globalPriority) return b.globalPriority - a.globalPriority;

      const aTrust = a.trustScore ?? -1;
      const bTrust = b.trustScore ?? -1;
      if (aTrust !== bTrust) return bTrust - aTrust;

      return a.name.localeCompare(b.name);
    });
}

/**
 * The fallback chain for a category, in the order it will be tried.
 *
 * Example — MONEY_TRANSFER in Guatemala:
 *   Remitly (approved)      -> affiliate destination
 *   Wise (not approved)     -> ordinary website
 *   MoneyGram (not approved)-> ordinary website
 *   nothing usable          -> non-affiliate resource page
 *
 * Returned so that both the router and the test suite reason about the
 * same ordered list.
 */
export function buildFallbackChain(
  providers: readonly AffiliateProvider[],
  options: { country?: string | null } = {}
): AffiliateProvider[] {
  return rankProviders(providers, options);
}

/**
 * Choose where to send a visitor.
 *
 * Preference order:
 *   1. the highest-ranked provider that is genuinely monetizable
 *   2. otherwise the highest-ranked provider with a usable website
 *   3. otherwise the non-affiliate fallback URL
 *
 * Step 2 matters: when we have no approved program, the visitor still
 * gets the help they came for. We just do not get paid for it, and we do
 * not fake a tracking parameter to pretend otherwise (spec §12, §13).
 */
export function selectDestination(
  providers: readonly AffiliateProvider[],
  options: { country?: string | null; fallbackUrl: string }
): ResolvedDestination {
  const ranked = buildFallbackChain(providers, options);

  for (const provider of ranked) {
    if (isMonetizable(provider)) {
      return { kind: "affiliate", url: provider.affiliateUrl as string, provider };
    }
  }

  for (const provider of ranked) {
    if (isSafeAffiliateUrl(provider.websiteUrl)) {
      return { kind: "website", url: provider.websiteUrl as string, provider };
    }
  }

  return { kind: "fallback", url: options.fallbackUrl, provider: null };
}

/**
 * Single-provider version, used by `/go/[slug]`.
 *
 * A known-but-unapproved provider still sends the visitor to that
 * provider's own website. Only an unknown slug, or a provider with no
 * usable URL at all, reaches the generic fallback.
 */
export function resolveProviderDestination(
  provider: AffiliateProvider | null,
  fallbackUrl: string
): ResolvedDestination {
  if (!provider || !provider.active) {
    return { kind: "fallback", url: fallbackUrl, provider: null };
  }

  if (isMonetizable(provider)) {
    return { kind: "affiliate", url: provider.affiliateUrl as string, provider };
  }

  if (isSafeAffiliateUrl(provider.websiteUrl)) {
    return { kind: "website", url: provider.websiteUrl as string, provider };
  }

  return { kind: "fallback", url: fallbackUrl, provider: null };
}

/**
 * Split a ranked list into the two groups the recommendation UI shows.
 *
 * `available` = explicitly available in the visitor's country.
 * `alternatives` = included only via the global-availability flag, so the
 * UI can label them honestly rather than implying local coverage.
 */
export function partitionByCountryEvidence(
  providers: readonly AffiliateProvider[]
): { available: AffiliateProvider[]; alternatives: AffiliateProvider[] } {
  const available: AffiliateProvider[] = [];
  const alternatives: AffiliateProvider[] = [];

  for (const provider of providers) {
    if (provider.countryPriority !== null) available.push(provider);
    else alternatives.push(provider);
  }

  return { available, alternatives };
}
