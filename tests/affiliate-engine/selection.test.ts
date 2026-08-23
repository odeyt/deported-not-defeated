// ============================================================
// M-AFFILIATE-1 — Country eligibility and ranking tests
//
// Run: npm test
// ============================================================

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildFallbackChain,
  selectCategoryTarget,
  selectProviders,
} from "../../lib/affiliate-engine/selection.ts";

interface TestProvider {
  id: string;
  slug: string;
  name: string;
  category: string;
  network: string;
  description: string | null;
  website_url: string | null;
  monetized: boolean;
  featured: boolean;
  trust_score: number;
  global_priority: number;
  disclosure_required: boolean;
}

function provider(overrides: Partial<TestProvider> & { id: string; slug: string }): TestProvider {
  return {
    name: overrides.slug,
    category: "MONEY_TRANSFER",
    network: "DIRECT",
    description: null,
    website_url: `https://${overrides.slug}.example.com`,
    monetized: false,
    featured: false,
    trust_score: 50,
    global_priority: 0,
    disclosure_required: true,
    ...overrides,
  } as TestProvider;
}

function rule(
  providerId: string,
  countryCode: string,
  available = true,
  priority = 0
) {
  return {
    provider_id: providerId,
    country_code: countryCode,
    available,
    priority,
    availability_notes: null,
  };
}

// ---------------------------------------------------------- country gating

test("a provider available in the requested country is returned", () => {
  const providers = [provider({ id: "1", slug: "remitly" })];
  const result = selectProviders({
    providers,
    countryRules: [rule("1", "GT")],
    countryCode: "GT",
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].slug, "remitly");
});

test("a provider with no row for the country is excluded — availability is never assumed", () => {
  const providers = [provider({ id: "1", slug: "remitly" })];
  const result = selectProviders({
    providers,
    countryRules: [rule("1", "MX")],
    countryCode: "GT",
  });
  assert.equal(result.length, 0);
});

test("a provider explicitly marked unavailable is excluded", () => {
  const providers = [provider({ id: "1", slug: "remitly" })];
  const result = selectProviders({
    providers,
    countryRules: [rule("1", "GT", false)],
    countryCode: "GT",
  });
  assert.equal(result.length, 0);
});

test("with no country requested, availability rows are not required", () => {
  const providers = [provider({ id: "1", slug: "remitly" }), provider({ id: "2", slug: "wise" })];
  const result = selectProviders({ providers });
  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((p) => p.country_priority),
    [0, 0]
  );
});

test("country matching is case-insensitive", () => {
  const providers = [provider({ id: "1", slug: "remitly" })];
  const result = selectProviders({
    providers,
    countryRules: [rule("1", "GT")],
    countryCode: "gt",
  });
  assert.equal(result.length, 1);
});

// ---------------------------------------------------------------- ranking

test("higher country priority wins over higher global priority", () => {
  const providers = [
    provider({ id: "1", slug: "wise", global_priority: 500 }),
    provider({ id: "2", slug: "remitly", global_priority: 0 }),
  ];
  const result = selectProviders({
    providers,
    countryRules: [rule("1", "GT", true, 10), rule("2", "GT", true, 100)],
    countryCode: "GT",
  });
  assert.deepEqual(result.map((p) => p.slug), ["remitly", "wise"]);
});

test("global priority breaks ties, then trust score, then slug", () => {
  const providers = [
    provider({ id: "1", slug: "b-provider", global_priority: 10, trust_score: 50 }),
    provider({ id: "2", slug: "a-provider", global_priority: 10, trust_score: 50 }),
    provider({ id: "3", slug: "c-provider", global_priority: 10, trust_score: 90 }),
    provider({ id: "4", slug: "d-provider", global_priority: 99, trust_score: 10 }),
  ];
  const result = selectProviders({ providers });
  assert.deepEqual(
    result.map((p) => p.slug),
    ["d-provider", "c-provider", "a-provider", "b-provider"]
  );
});

test("ordering is stable regardless of input order", () => {
  const a = provider({ id: "1", slug: "alpha", global_priority: 10 });
  const b = provider({ id: "2", slug: "beta", global_priority: 10 });
  const forward = selectProviders({ providers: [a, b] }).map((p) => p.slug);
  const reverse = selectProviders({ providers: [b, a] }).map((p) => p.slug);
  assert.deepEqual(forward, reverse);
});

test("MONETIZATION IS NOT A RANKING INPUT: a paying provider does not jump the queue", () => {
  const providers = [
    // Pays us, but editorially ranked lower.
    provider({ id: "1", slug: "pays-us", monetized: true, global_priority: 1, trust_score: 10 }),
    // Pays nothing, but ranked higher on the editorial rules.
    provider({ id: "2", slug: "pays-nothing", monetized: false, global_priority: 99, trust_score: 90 }),
  ];
  const result = selectProviders({ providers });
  assert.deepEqual(result.map((p) => p.slug), ["pays-nothing", "pays-us"]);
});

// --------------------------------------------------------------- filtering

test("category filter excludes other categories", () => {
  const providers = [
    provider({ id: "1", slug: "remitly", category: "MONEY_TRANSFER" }),
    provider({ id: "2", slug: "airalo", category: "ESIM" }),
  ];
  const result = selectProviders({ providers, category: "ESIM" });
  assert.deepEqual(result.map((p) => p.slug), ["airalo"]);
});

test("limit caps the returned set", () => {
  const providers = [
    provider({ id: "1", slug: "a", global_priority: 3 }),
    provider({ id: "2", slug: "b", global_priority: 2 }),
    provider({ id: "3", slug: "c", global_priority: 1 }),
  ];
  assert.equal(selectProviders({ providers, limit: 2 }).length, 2);
  assert.equal(selectProviders({ providers, limit: 0 }).length, 0);
});

// ------------------------------------------------------- category targeting

test("category target prefers a monetized provider among eligible ones", () => {
  const ranked = selectProviders({
    providers: [
      provider({ id: "1", slug: "top", global_priority: 99 }),
      provider({ id: "2", slug: "paying", monetized: true, global_priority: 5 }),
    ],
  });
  const target = selectCategoryTarget(ranked);
  assert.ok(target);
  assert.equal(target.provider.slug, "paying");
  assert.equal(target.monetized, true);
});

test("category target falls back to the top-ranked ordinary website when nothing is monetized", () => {
  const ranked = selectProviders({
    providers: [
      provider({ id: "1", slug: "top", global_priority: 99 }),
      provider({ id: "2", slug: "second", global_priority: 5 }),
    ],
  });
  const target = selectCategoryTarget(ranked);
  assert.ok(target);
  assert.equal(target.provider.slug, "top");
  assert.equal(target.monetized, false);
});

test("category target is null when no provider has any usable destination", () => {
  const ranked = selectProviders({
    providers: [provider({ id: "1", slug: "no-url", website_url: null })],
  });
  assert.equal(selectCategoryTarget(ranked), null);
});

test("category target is null for an empty eligible set", () => {
  assert.equal(selectCategoryTarget([]), null);
});

// ---------------------------------------------------------- fallback chain

test("fallback chain preserves order and reports usability", () => {
  const ranked = selectProviders({
    providers: [
      provider({ id: "1", slug: "remitly", global_priority: 30 }),
      provider({ id: "2", slug: "western-union", global_priority: 20 }),
      provider({ id: "3", slug: "wise", global_priority: 10 }),
    ],
  });
  const chain = buildFallbackChain(ranked);
  assert.deepEqual(chain.chain.map((p) => p.slug), ["remitly", "western-union", "wise"]);
  assert.equal(chain.hasUsableDestination, true);
  assert.equal(chain.monetizedCount, 0);
});

test("fallback chain signals when the page must show non-affiliate guidance instead", () => {
  const chain = buildFallbackChain([]);
  assert.equal(chain.hasUsableDestination, false);
  assert.equal(chain.chain.length, 0);
});

// ------------------------------------------------- realistic Guatemala case

test("Guatemala money-transfer set matches the seeded priorities", () => {
  const providers = [
    provider({ id: "r", slug: "remitly", global_priority: 75, trust_score: 75 }),
    provider({ id: "w", slug: "western-union", global_priority: 70, trust_score: 70 }),
    provider({ id: "i", slug: "wise", global_priority: 80, trust_score: 80 }),
    provider({ id: "m", slug: "moneygram", global_priority: 65, trust_score: 70 }),
  ];
  const countryRules = [
    rule("r", "GT", true, 100),
    rule("w", "GT", true, 90),
    rule("i", "GT", true, 80),
    // moneygram has no Guatemala row on purpose — unknown, so excluded.
  ];

  const result = selectProviders({
    providers,
    countryRules,
    countryCode: "GT",
    category: "MONEY_TRANSFER",
  });

  assert.deepEqual(result.map((p) => p.slug), ["remitly", "western-union", "wise"]);
  assert.equal(
    result.some((p) => p.slug === "moneygram"),
    false,
    "a provider with no availability row must not appear"
  );
});
