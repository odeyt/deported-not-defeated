// ============================================================
// M-AFFILIATE-1 — Deterministic provider selection
//
// Pure functions. No database, no network, no randomness, no AI. Given the
// same inputs these always produce the same ordering, which is what makes the
// ranking auditable and testable.
//
// RANKING RULE — read this before changing anything here.
//
//   Monetization is NOT a ranking input. Whether a provider pays us decides
//   which URL the router sends the visitor to; it never decides who appears
//   first. Ordering is: country priority, then global priority, then trust,
//   then featured, then slug for stability.
//
//   The single exception is selectCategoryTarget(), where the router must
//   pick one destination and prefers a monetized one *among providers that
//   already ranked equally by the editorial rules above*.
// ============================================================

import type { PublicProvider, ProviderCountryRule, RankedProvider } from "./types";

export interface SelectionOptions {
  providers: PublicProvider[];
  /** Availability rows. Ignored when countryCode is not supplied. */
  countryRules?: ProviderCountryRule[];
  /** ISO-3166-1 alpha-2. When set, availability is required, never assumed. */
  countryCode?: string | null;
  /** Restrict to a single canonical category code. */
  category?: string | null;
  /** Maximum providers to return. */
  limit?: number;
}

/**
 * Filter and rank providers for a placement.
 *
 * Country semantics — the important part:
 *   * countryCode set   → a provider MUST have an availability row for that
 *                         country with available = true. No row means unknown,
 *                         and unknown means excluded. Availability is never
 *                         assumed from silence.
 *   * countryCode unset → country-agnostic placement; all providers qualify
 *                         and country_priority is 0 for everyone.
 */
export function selectProviders(options: SelectionOptions): RankedProvider[] {
  const { providers, countryRules = [], countryCode = null, category = null, limit } = options;

  const wantedCountry = countryCode ? countryCode.trim().toUpperCase() : null;

  // Index availability by provider for the requested country only.
  const ruleByProvider = new Map<string, ProviderCountryRule>();
  if (wantedCountry) {
    for (const rule of countryRules) {
      if (rule.country_code?.toUpperCase() === wantedCountry) {
        ruleByProvider.set(rule.provider_id, rule);
      }
    }
  }

  const ranked: RankedProvider[] = [];

  for (const provider of providers) {
    if (category && provider.category !== category) continue;

    let countryPriority = 0;
    let availabilityNote: string | null = null;

    if (wantedCountry) {
      const rule = ruleByProvider.get(provider.id);
      // No row, or explicitly unavailable → excluded.
      if (!rule || !rule.available) continue;
      countryPriority = rule.priority ?? 0;
      availabilityNote = rule.availability_notes ?? null;
    }

    ranked.push({
      ...provider,
      country_priority: countryPriority,
      availability_note: availabilityNote,
    });
  }

  ranked.sort(compareProviders);

  return typeof limit === "number" && limit >= 0 ? ranked.slice(0, limit) : ranked;
}

/**
 * Deterministic comparator. Every tier is editorial or country-specific;
 * none of them consults `monetized`.
 */
function compareProviders(a: RankedProvider, b: RankedProvider): number {
  if (a.country_priority !== b.country_priority) {
    return b.country_priority - a.country_priority;
  }
  if (a.global_priority !== b.global_priority) {
    return b.global_priority - a.global_priority;
  }
  if (a.trust_score !== b.trust_score) {
    return b.trust_score - a.trust_score;
  }
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }
  // Stable, alphabetical final tiebreak so output never depends on input order.
  return a.slug.localeCompare(b.slug);
}

export interface CategoryTarget {
  provider: RankedProvider;
  /** True when this provider has an approved affiliate destination. */
  monetized: boolean;
  /** Position in the ranked list, so fallback depth can be logged. */
  rank: number;
}

/**
 * Pick a single provider for `/go/category/[category]`.
 *
 * The router has to send the visitor somewhere specific, so this walks the
 * ranked list and prefers a monetized provider. If none of the eligible
 * providers is monetized, it falls back to the highest-ranked provider that
 * still has an ordinary website — the visitor gets a useful destination even
 * when we earn nothing.
 *
 * Returns null only when there is genuinely nowhere useful to send them.
 */
export function selectCategoryTarget(ranked: RankedProvider[]): CategoryTarget | null {
  const monetizedIndex = ranked.findIndex((p) => p.monetized);
  if (monetizedIndex >= 0) {
    return { provider: ranked[monetizedIndex], monetized: true, rank: monetizedIndex };
  }

  const fallbackIndex = ranked.findIndex((p) => Boolean(p.website_url));
  if (fallbackIndex >= 0) {
    return { provider: ranked[fallbackIndex], monetized: false, rank: fallbackIndex };
  }

  return null;
}

/**
 * The ordered fallback chain for a placement, e.g.
 *   Remitly → Western Union → Wise → (non-affiliate resource)
 *
 * Returned so a page or an admin screen can show exactly which providers would
 * be tried, in order. `hasUsableDestination` being false is the signal that the
 * caller should render ordinary non-affiliate guidance instead.
 */
export interface FallbackChain {
  chain: RankedProvider[];
  hasUsableDestination: boolean;
  monetizedCount: number;
}

export function buildFallbackChain(ranked: RankedProvider[]): FallbackChain {
  const usable = ranked.filter((p) => Boolean(p.website_url) || p.monetized);
  return {
    chain: ranked,
    hasUsableDestination: usable.length > 0,
    monetizedCount: ranked.filter((p) => p.monetized).length,
  };
}
