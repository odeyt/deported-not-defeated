import test from "node:test";
import assert from "node:assert/strict";

import {
  isMonetizable,
  isAvailableIn,
  rankProviders,
  selectDestination,
  resolveProviderDestination,
  partitionByCountryEvidence,
} from "../lib/affiliate/selection.ts";
import type { AffiliateProvider } from "../lib/affiliate/types.ts";

/**
 * Country eligibility, ranking, and fallback tests (spec §38, "Country engine").
 */

const FALLBACK = "https://deportednotdefeated.com/resources/money-transfer";

function provider(overrides: Partial<AffiliateProvider> = {}): AffiliateProvider {
  return {
    id: overrides.slug ?? "id-default",
    slug: "default",
    name: "Default Provider",
    category: "MONEY_TRANSFER",
    network: null,
    description: null,
    whyItHelps: null,
    websiteUrl: "https://default.example.com",
    affiliateUrl: null,
    approvalStatus: "not_applied",
    placementType: "editorial",
    ctaLabel: "Visit Official Website",
    active: true,
    featured: false,
    disclosureRequired: true,
    availableGlobally: false,
    trustScore: null,
    globalPriority: 0,
    countryPriority: null,
    countryVerified: false,
    countryNotes: null,
    ...overrides,
  };
}

const approved = (overrides: Partial<AffiliateProvider> = {}) =>
  provider({
    approvalStatus: "approved",
    affiliateUrl: "https://partner.example.com/track",
    placementType: "affiliate",
    ...overrides,
  });

// ---------------------------------------------------------------- monetizable

test("only an approved, active provider with a safe URL is monetizable", () => {
  assert.equal(isMonetizable(approved()), true);
});

test("an unapproved provider is never monetizable, whatever URL it holds", () => {
  for (const status of ["not_applied", "applied", "pending", "rejected", "paused", "expired"] as const) {
    assert.equal(
      isMonetizable(approved({ approvalStatus: status })),
      false,
      `status ${status} must not monetize`
    );
  }
});

test("an inactive provider is not monetizable even when approved", () => {
  assert.equal(isMonetizable(approved({ active: false })), false);
});

test("an approved provider with a hostile URL is not monetizable", () => {
  assert.equal(isMonetizable(approved({ affiliateUrl: "javascript:alert(1)" })), false);
  assert.equal(isMonetizable(approved({ affiliateUrl: "//evil.example.com" })), false);
  assert.equal(isMonetizable(approved({ affiliateUrl: null })), false);
});

// ------------------------------------------------------------- availability

test("a provider with an explicit country row is available there", () => {
  assert.equal(isAvailableIn(provider({ countryPriority: 50 }), "GT"), true);
});

test("a provider with no country row and no global flag is excluded", () => {
  assert.equal(isAvailableIn(provider(), "GT"), false);
});

test("global availability is only honoured when explicitly set", () => {
  assert.equal(isAvailableIn(provider({ availableGlobally: true }), "GT"), true);
  assert.equal(isAvailableIn(provider({ availableGlobally: false }), "GT"), false);
});

test("an inactive provider is excluded regardless of country", () => {
  assert.equal(isAvailableIn(provider({ active: false, countryPriority: 99 }), "GT"), false);
  assert.equal(isAvailableIn(provider({ active: false, availableGlobally: true }), null), false);
});

// ------------------------------------------------------------------ ranking

test("providers unavailable in the requested country are filtered out", () => {
  const ranked = rankProviders(
    [
      provider({ slug: "in-country", countryPriority: 10 }),
      provider({ slug: "elsewhere" }),
      provider({ slug: "worldwide", availableGlobally: true }),
    ],
    { country: "GT" }
  );

  assert.deepEqual(ranked.map((p) => p.slug), ["in-country", "worldwide"]);
});

test("higher country priority wins", () => {
  const ranked = rankProviders(
    [
      provider({ slug: "low", countryPriority: 10 }),
      provider({ slug: "high", countryPriority: 90 }),
      provider({ slug: "mid", countryPriority: 50 }),
    ],
    { country: "GT" }
  );

  assert.deepEqual(ranked.map((p) => p.slug), ["high", "mid", "low"]);
});

test("an explicit country listing outranks a merely global provider", () => {
  const ranked = rankProviders(
    [
      provider({ slug: "global-high", availableGlobally: true, globalPriority: 1000 }),
      provider({ slug: "local-low", countryPriority: 1 }),
    ],
    { country: "GT" }
  );

  assert.deepEqual(ranked.map((p) => p.slug), ["local-low", "global-high"]);
});

test("global priority breaks ties when no country is requested", () => {
  const ranked = rankProviders([
    provider({ slug: "b", globalPriority: 10 }),
    provider({ slug: "a", globalPriority: 90 }),
  ]);

  assert.deepEqual(ranked.map((p) => p.slug), ["a", "b"]);
});

test("an unscored provider never outranks a scored one on trust", () => {
  const ranked = rankProviders([
    provider({ slug: "unscored", trustScore: null }),
    provider({ slug: "scored", trustScore: 1 }),
  ]);

  assert.deepEqual(ranked.map((p) => p.slug), ["scored", "unscored"]);
});

test("ranking is deterministic and alphabetical at the final tiebreak", () => {
  const input = [
    provider({ slug: "z", name: "Zeta" }),
    provider({ slug: "a", name: "Alpha" }),
    provider({ slug: "m", name: "Mu" }),
  ];

  assert.deepEqual(rankProviders(input).map((p) => p.name), ["Alpha", "Mu", "Zeta"]);
  // Same input, same output — no clock, no randomness.
  assert.deepEqual(rankProviders(input).map((p) => p.name), rankProviders(input).map((p) => p.name));
});

test("ranking does not reorder for approval status — being paid never moves a provider up", () => {
  const ranked = rankProviders([
    provider({ slug: "unpaid", name: "A Unpaid", globalPriority: 50 }),
    approved({ slug: "paid", name: "B Paid", globalPriority: 10 }),
  ]);

  assert.deepEqual(ranked.map((p) => p.slug), ["unpaid", "paid"]);
});

test("rankProviders does not mutate its input", () => {
  const input = [provider({ slug: "b", globalPriority: 1 }), provider({ slug: "a", globalPriority: 9 })];
  const snapshot = input.map((p) => p.slug);
  rankProviders(input);
  assert.deepEqual(input.map((p) => p.slug), snapshot);
});

// ------------------------------------------------------------------ fallback

test("the highest-ranked monetizable provider wins the redirect", () => {
  const destination = selectDestination(
    [
      provider({ slug: "unpaid-top", countryPriority: 99 }),
      approved({ slug: "paid", countryPriority: 10, affiliateUrl: "https://paid.example.com/t" }),
    ],
    { country: "GT", fallbackUrl: FALLBACK }
  );

  assert.equal(destination.kind, "affiliate");
  assert.equal(destination.url, "https://paid.example.com/t");
});

test("with nothing approved, the visitor still reaches a real provider website", () => {
  const destination = selectDestination(
    [provider({ slug: "unpaid", countryPriority: 10, websiteUrl: "https://unpaid.example.com" })],
    { country: "GT", fallbackUrl: FALLBACK }
  );

  assert.equal(destination.kind, "website");
  assert.equal(destination.url, "https://unpaid.example.com");
});

test("with nothing eligible at all, the non-affiliate resource page is used", () => {
  const destination = selectDestination([], { country: "GT", fallbackUrl: FALLBACK });

  assert.equal(destination.kind, "fallback");
  assert.equal(destination.url, FALLBACK);
  assert.equal(destination.provider, null);
});

test("a provider unavailable in the country cannot be selected for it", () => {
  const destination = selectDestination(
    [approved({ slug: "us-only", countryPriority: null, availableGlobally: false })],
    { country: "GT", fallbackUrl: FALLBACK }
  );

  assert.equal(destination.kind, "fallback");
});

test("an approved provider with a poisoned URL falls back to its website, not the poison", () => {
  const destination = selectDestination(
    [
      approved({
        slug: "poisoned",
        countryPriority: 10,
        affiliateUrl: "javascript:alert(document.cookie)",
        websiteUrl: "https://poisoned.example.com",
      }),
    ],
    { country: "GT", fallbackUrl: FALLBACK }
  );

  assert.equal(destination.kind, "website");
  assert.equal(destination.url, "https://poisoned.example.com");
});

// ------------------------------------------------------- single-slug routing

test("an approved, active provider redirects to its affiliate URL", () => {
  const destination = resolveProviderDestination(
    approved({ affiliateUrl: "https://partner.example.com/t" }),
    FALLBACK
  );

  assert.equal(destination.kind, "affiliate");
  assert.equal(destination.url, "https://partner.example.com/t");
});

test("a pending provider never produces an affiliate redirect", () => {
  const destination = resolveProviderDestination(
    approved({ approvalStatus: "pending", websiteUrl: "https://provider.example.com" }),
    FALLBACK
  );

  assert.equal(destination.kind, "website");
  assert.equal(destination.url, "https://provider.example.com");
});

test("an inactive provider is blocked entirely", () => {
  const destination = resolveProviderDestination(
    approved({ active: false, websiteUrl: "https://provider.example.com" }),
    FALLBACK
  );

  assert.equal(destination.kind, "fallback");
  assert.equal(destination.url, FALLBACK);
});

test("an unknown slug resolves to the safe fallback", () => {
  const destination = resolveProviderDestination(null, FALLBACK);
  assert.equal(destination.kind, "fallback");
  assert.equal(destination.url, FALLBACK);
});

test("a provider with no usable URL at all resolves to the fallback", () => {
  const destination = resolveProviderDestination(
    provider({ websiteUrl: null, affiliateUrl: null }),
    FALLBACK
  );
  assert.equal(destination.kind, "fallback");
});

// ----------------------------------------------------------------- grouping

test("partitionByCountryEvidence separates listed providers from global ones", () => {
  const { available, alternatives } = partitionByCountryEvidence([
    provider({ slug: "listed", countryPriority: 10 }),
    provider({ slug: "global", availableGlobally: true }),
  ]);

  assert.deepEqual(available.map((p) => p.slug), ["listed"]);
  assert.deepEqual(alternatives.map((p) => p.slug), ["global"]);
});
