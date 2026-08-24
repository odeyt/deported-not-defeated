import test from "node:test";
import assert from "node:assert/strict";

import {
  isMonetizable,
  resolveProviderDestination,
} from "../lib/affiliate/selection.ts";
import type { AffiliateProvider } from "../lib/affiliate/types.ts";

/**
 * Automatic affiliate activation (M-GROWTH1 §4, §27, §62).
 *
 * The property being proved: when a provider is approved and given a real
 * tracking URL, every page that already surfaces it starts monetizing — with
 * no code change and no deploy. And when a program is paused, rejected, or
 * expired, those same pages fall back to something useful instead of breaking.
 *
 * These use fixtures, never a real provider. Flipping a live provider to
 * `approved` to make a test pass would be exactly the fabrication the whole
 * architecture exists to prevent.
 */

const FALLBACK = "https://www.deportednotdefeated.com/resources";

function provider(overrides: Partial<AffiliateProvider> = {}): AffiliateProvider {
  return {
    id: "fixture-id",
    slug: "fixture-co",
    name: "Fixture Co",
    category: "MONEY_TRANSFER",
    network: null,
    description: null,
    whyItHelps: null,
    websiteUrl: "https://fixture.example.com",
    affiliateUrl: null,
    approvalStatus: "not_applied",
    placementType: "editorial",
    ctaLabel: "Visit Fixture Co",
    active: true,
    featured: false,
    disclosureRequired: true,
    availableGlobally: true,
    trustScore: null,
    globalPriority: 0,
    countryPriority: null,
    countryVerified: false,
    countryNotes: null,
    ...overrides,
  } as AffiliateProvider;
}

// ------------------------------------------------------- the activation path

test("an unapproved provider sends visitors to the ordinary website, not a dead end", () => {
  const result = resolveProviderDestination(provider(), FALLBACK);

  assert.equal(result.kind, "website");
  assert.equal(result.url, "https://fixture.example.com");
});

test("approval alone does not monetize — a real tracking URL is still required", () => {
  const approvedNoUrl = provider({ approvalStatus: "approved", affiliateUrl: null });

  assert.equal(isMonetizable(approvedNoUrl), false);
  assert.equal(resolveProviderDestination(approvedNoUrl, FALLBACK).kind, "website");
});

test("a tracking URL alone does not monetize — approval is still required", () => {
  const urlNoApproval = provider({
    approvalStatus: "pending",
    affiliateUrl: "https://tp.media/click?shmarker=000000",
  });

  assert.equal(isMonetizable(urlNoApproval), false);
  assert.equal(resolveProviderDestination(urlNoApproval, FALLBACK).kind, "website");
});

test("approved + tracking URL + active monetizes, with no code change anywhere", () => {
  // This is the whole point: the ONLY difference from the first test is data.
  const activated = provider({
    approvalStatus: "approved",
    affiliateUrl: "https://tp.media/click?shmarker=000000&promo_id=1",
  });

  const result = resolveProviderDestination(activated, FALLBACK);

  assert.equal(isMonetizable(activated), true);
  assert.equal(result.kind, "affiliate");
  assert.equal(result.url, "https://tp.media/click?shmarker=000000&promo_id=1");
});

// ----------------------------------------------------- the deactivation path

test("pausing a program stops monetizing without breaking the link", () => {
  const paused = provider({
    approvalStatus: "paused",
    affiliateUrl: "https://tp.media/click?shmarker=000000",
  });

  const result = resolveProviderDestination(paused, FALLBACK);
  assert.equal(result.kind, "website", "a paused program must still send visitors somewhere useful");
  assert.equal(result.url, "https://fixture.example.com");
});

test("rejected and expired programs also fall back rather than dead-end", () => {
  for (const status of ["rejected", "expired"] as const) {
    const ended = provider({
      approvalStatus: status,
      affiliateUrl: "https://tp.media/click?shmarker=000000",
    });
    const result = resolveProviderDestination(ended, FALLBACK);
    assert.equal(result.kind, "website", `${status} must not monetize`);
  }
});

test("deactivating a provider removes it entirely, falling back to the resource page", () => {
  const inactive = provider({
    active: false,
    approvalStatus: "approved",
    affiliateUrl: "https://tp.media/click?shmarker=000000",
  });

  const result = resolveProviderDestination(inactive, FALLBACK);
  assert.equal(result.kind, "fallback");
  assert.equal(result.url, FALLBACK);
});

// ------------------------------------------------------------- no dead ends

test("a provider with neither a tracking URL nor a website still never dead-ends", () => {
  const empty = provider({ websiteUrl: null, affiliateUrl: null });

  const result = resolveProviderDestination(empty, FALLBACK);
  assert.equal(result.kind, "fallback");
  assert.equal(result.url, FALLBACK);
  assert.notEqual(result.url, "#");
});

test("an unsafe stored URL is refused rather than served", () => {
  const hostile = provider({
    approvalStatus: "approved",
    affiliateUrl: "javascript:alert(1)",
    websiteUrl: "javascript:alert(2)",
  });

  const result = resolveProviderDestination(hostile, FALLBACK);
  assert.equal(result.kind, "fallback", "neither hostile URL may be served");
  assert.equal(result.url, FALLBACK);
});

test("no destination is ever a placeholder anchor", () => {
  const cases = [
    provider(),
    provider({ approvalStatus: "approved", affiliateUrl: "https://tp.media/click?x=1" }),
    provider({ active: false }),
    provider({ websiteUrl: null }),
  ];

  for (const p of cases) {
    const { url } = resolveProviderDestination(p, FALLBACK);
    assert.ok(!url.startsWith("#"), `destination must never be an anchor: ${url}`);
    assert.ok(url.length > 1);
  }
});
