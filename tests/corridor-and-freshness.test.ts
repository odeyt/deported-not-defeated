import test from "node:test";
import assert from "node:assert/strict";

import { resolveCorridor, corridorClaim, type AvailabilityRow } from "../lib/affiliate/corridor.ts";
import {
  evaluateFreshness,
  windowForCategory,
  nextReviewDate,
  canStateAvailabilityPlainly,
  FRESHNESS_WINDOW_DAYS,
} from "../lib/affiliate/freshness.ts";

/**
 * Corridor precision and verification freshness (M-GROWTH1A Phases 3–4).
 *
 * Both modules exist to stop the site making a claim stronger than its
 * evidence. The tests are mostly about what must NOT happen.
 */

const row = (over: Partial<AvailabilityRow> = {}): AvailabilityRow => ({
  country_code: "MX",
  available: true,
  verified_at: "2026-08-24T00:00:00Z",
  ...over,
});

// ==================================================== CORRIDOR

test("a legacy row with no origin field still works and means destination-only", () => {
  // Pre-migration shape: origin_country absent entirely.
  const legacy: AvailabilityRow = { country_code: "MX", available: true };
  const result = resolveCorridor([legacy], "MX");

  assert.equal(result.match, "DESTINATION_ONLY");
  assert.equal(result.corridorVerified, false);
  assert.equal(result.row, legacy);
});

test("a NULL origin behaves identically to an absent one", () => {
  const result = resolveCorridor([row({ origin_country: null })], "MX");
  assert.equal(result.match, "DESTINATION_ONLY");
  assert.equal(result.corridorVerified, false);
});

test("an exact corridor row is preferred and marked verified", () => {
  const rows = [row({ origin_country: null }), row({ origin_country: "US" })];
  const result = resolveCorridor(rows, "MX", "US");

  assert.equal(result.match, "CORRIDOR");
  assert.equal(result.corridorVerified, true);
  assert.equal(result.row?.origin_country, "US");
});

test("a corridor row for a DIFFERENT origin is never used as evidence", () => {
  // CA -> MX says nothing about US -> MX.
  const result = resolveCorridor([row({ origin_country: "CA" })], "MX", "US");

  assert.equal(result.match, "NONE", "another origin must not answer this question");
  assert.equal(result.corridorVerified, false);
});

test("with an unknown origin, a destination-only row is used but claims nothing", () => {
  const result = resolveCorridor([row({ origin_country: null })], "MX", undefined);
  assert.equal(result.match, "DESTINATION_ONLY");
  assert.equal(result.corridorVerified, false);
});

test("destination availability never implies corridor verification", () => {
  // The row is verified — but verified as a DESTINATION fact.
  const result = resolveCorridor(
    [row({ origin_country: null, verified_at: "2026-08-24T00:00:00Z" })],
    "MX",
    "US"
  );
  assert.equal(
    result.corridorVerified,
    false,
    "a verified destination row must not be upgraded into a corridor claim"
  );
});

test("an unavailable row is excluded even when the corridor matches", () => {
  const result = resolveCorridor([row({ origin_country: "US", available: false })], "MX", "US");
  assert.equal(result.match, "NONE");
});

test("a provider with no row for the destination is not available", () => {
  const result = resolveCorridor([row({ country_code: "GT" })], "MX", "US");
  assert.equal(result.match, "NONE");
});

test("a malformed destination never matches", () => {
  assert.equal(resolveCorridor([row()], "MEXICO", "US").match, "NONE");
});

test("a malformed origin degrades to destination-only rather than a corridor claim", () => {
  // "USA" is not ISO alpha-2. The row still validly asserts that the provider
  // serves MX, so that information is kept — but the unusable origin must not
  // become evidence for the US -> MX corridor. Failing safe means dropping the
  // stronger claim, not discarding the row.
  const result = resolveCorridor([row({ origin_country: "USA" })], "MX", "US");

  assert.equal(result.match, "DESTINATION_ONLY");
  assert.equal(result.corridorVerified, false, "a malformed origin must never verify a corridor");
});

// ==================================================== CLAIM WORDING

test("only a fresh corridor row earns a plain confirmation", () => {
  const corridor = resolveCorridor([row({ origin_country: "US" })], "MX", "US");
  assert.equal(
    corridorClaim(corridor, "VERIFIED_CURRENT", "the US", "Mexico"),
    "Confirmed for the US to Mexico"
  );
});

test("a stale corridor row downgrades its wording rather than disappearing", () => {
  const corridor = resolveCorridor([row({ origin_country: "US" })], "MX", "US");
  const claim = corridorClaim(corridor, "VERIFIED_STALE", "the US", "Mexico");
  assert.match(claim, /Previously confirmed/);
  assert.match(claim, /check current availability/);
});

test("a destination-only row never claims the route, however fresh", () => {
  const generic = resolveCorridor([row({ origin_country: null })], "MX", "US");
  const claim = corridorClaim(generic, "VERIFIED_CURRENT", "the US", "Mexico");
  assert.match(claim, /confirm this specific route/);
  assert.ok(!claim.startsWith("Confirmed for"));
});

// ==================================================== FRESHNESS

const CATEGORY_FINANCIAL = "MONEY_TRANSFER";
const CATEGORY_TRAVEL = "ESIM";

test("category windows match the documented policy", () => {
  assert.equal(windowForCategory(CATEGORY_FINANCIAL), 90);
  assert.equal(windowForCategory(CATEGORY_TRAVEL), 180);
  assert.equal(windowForCategory(null), FRESHNESS_WINDOW_DAYS.TRAVEL, "unknown defaults to travel");
});

test("a verification inside its window is current", () => {
  const verified = new Date("2026-08-01T00:00:00Z");
  const now = new Date("2026-09-01T00:00:00Z"); // 31 days
  const result = evaluateFreshness(verified, CATEGORY_FINANCIAL, now);

  assert.equal(result.state, "VERIFIED_CURRENT");
  assert.equal(result.ageDays, 31);
  assert.ok(canStateAvailabilityPlainly(result));
});

test("the boundary day itself is still current", () => {
  const verified = new Date("2026-01-01T00:00:00Z");
  const exactly90 = new Date("2026-04-01T00:00:00Z"); // 90 days later
  const result = evaluateFreshness(verified, CATEGORY_FINANCIAL, exactly90);

  assert.equal(result.ageDays, 90);
  assert.equal(result.state, "VERIFIED_CURRENT", "day 90 is inside a 90-day window");
});

test("one day past the window goes stale", () => {
  const verified = new Date("2026-01-01T00:00:00Z");
  const day91 = new Date("2026-04-02T00:00:00Z");
  const result = evaluateFreshness(verified, CATEGORY_FINANCIAL, day91);

  assert.equal(result.ageDays, 91);
  assert.equal(result.state, "VERIFIED_STALE");
  assert.equal(canStateAvailabilityPlainly(result), false);
  assert.match(result.label, /Previously verified/);
});

test("the same age is current for travel but stale for financial", () => {
  const verified = new Date("2026-01-01T00:00:00Z");
  const day120 = new Date("2026-05-01T00:00:00Z");

  assert.equal(evaluateFreshness(verified, CATEGORY_FINANCIAL, day120).state, "VERIFIED_STALE");
  assert.equal(evaluateFreshness(verified, CATEGORY_TRAVEL, day120).state, "VERIFIED_CURRENT");
});

test("a null verification date is unverified, not stale", () => {
  const result = evaluateFreshness(null, CATEGORY_FINANCIAL);
  assert.equal(result.state, "UNVERIFIED");
  assert.equal(result.ageDays, null);
  assert.match(result.label, /Confirm availability/);
});

test("an invalid or future date is treated as unverified, never as fresher", () => {
  assert.equal(evaluateFreshness("not-a-date", CATEGORY_FINANCIAL).state, "UNVERIFIED");

  const now = new Date("2026-08-25T00:00:00Z");
  const future = new Date("2027-01-01T00:00:00Z");
  const result = evaluateFreshness(future, CATEGORY_FINANCIAL, now);
  assert.equal(result.state, "UNVERIFIED", "a future date is a data error, not extra freshness");
});

test("freshness never reports a provider as unavailable or deleted", () => {
  const states = [
    evaluateFreshness(null, CATEGORY_FINANCIAL).state,
    evaluateFreshness(new Date("2020-01-01"), CATEGORY_FINANCIAL).state,
  ];
  for (const state of states) {
    assert.notEqual(state as string, "UNAVAILABLE");
    assert.notEqual(state as string, "DELETED");
  }
});

test("next review date follows the category window", () => {
  const verified = new Date("2026-08-24T00:00:00Z");
  const financial = nextReviewDate(verified, CATEGORY_FINANCIAL)!;
  const travel = nextReviewDate(verified, CATEGORY_TRAVEL)!;

  assert.equal(financial.toISOString().slice(0, 10), "2026-11-22");
  assert.equal(travel.toISOString().slice(0, 10), "2027-02-20");
  assert.equal(nextReviewDate(null, CATEGORY_FINANCIAL), null);
});
