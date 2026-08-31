import test from "node:test";
import assert from "node:assert/strict";

import {
  detectGaps,
  isMonetizedRow,
  PENDING_TOO_LONG_DAYS,
  type GapDetectionInput,
  type GapCountryRow,
} from "../lib/affiliate/verificationGaps.ts";

/**
 * Gap detection composes lib/affiliate/corridor.ts and lib/affiliate/freshness.ts
 * — it must never reimplement their date math or resolution rules, and the
 * facts it separates (provider exists, country available, corridor verified,
 * affiliate approved, monetized, verification staleness) must stay distinct.
 */

const NOW = new Date("2026-08-31T00:00:00Z");

function countryRow(over: Partial<GapCountryRow> = {}): GapCountryRow {
  return {
    country_code: "MX",
    available: true,
    origin_country: null,
    verified_at: null,
    evidence_url: null,
    evidence_tier: null,
    ...over,
  };
}

function input(over: Partial<GapDetectionInput> = {}): GapDetectionInput {
  return {
    affiliate_status: "approved",
    active: true,
    affiliate_url: "https://example.com/ref",
    canonical_category: "MONEY_TRANSFER",
    application_date: null,
    countryRows: [countryRow({ verified_at: NOW.toISOString(), origin_country: "US" })],
    destinationCountry: "MX",
    originCountry: "US",
    ...over,
  };
}

// ------------------------------------------------ isMonetizedRow

test("isMonetizedRow matches isMonetizable's three conditions exactly", () => {
  assert.equal(
    isMonetizedRow({ active: true, affiliate_status: "approved", affiliate_url: "https://x.com/ref" }),
    true,
  );
  assert.equal(
    isMonetizedRow({ active: false, affiliate_status: "approved", affiliate_url: "https://x.com/ref" }),
    false,
    "inactive is never monetized regardless of status",
  );
  assert.equal(
    isMonetizedRow({ active: true, affiliate_status: "pending", affiliate_url: "https://x.com/ref" }),
    false,
    "a URL alone does not imply approval",
  );
  assert.equal(
    isMonetizedRow({ active: true, affiliate_status: "approved", affiliate_url: null }),
    false,
    "approval alone does not imply a working link",
  );
});

// ------------------------------------------------ detectGaps: separation of facts

test("provider exists is not the same as country available", () => {
  const flags = detectGaps(input({ countryRows: [] }), NOW);
  assert.ok(flags.includes("PROVIDER_NEVER_VERIFIED"), "no row at all must surface as never verified");
});

test("country available is not the same as corridor verified", () => {
  const flags = detectGaps(
    input({ countryRows: [countryRow({ available: true, origin_country: null, verified_at: NOW.toISOString() })] }),
    NOW,
  );
  assert.ok(
    flags.includes("COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN"),
    "a destination-only row must not be read as a corridor claim",
  );
});

test("corridor verified is not the same as affiliate approved", () => {
  const flags = detectGaps(
    input({
      affiliate_status: "not_applied",
      affiliate_url: null,
      countryRows: [
        countryRow({
          origin_country: "US",
          verified_at: NOW.toISOString(),
          evidence_url: "https://wise.com/x",
          evidence_tier: "TIER_1",
        }),
      ],
    }),
    NOW,
  );
  assert.equal(flags.includes("APPROVED_NO_LINK"), false, "not_applied is not an approval gap");
  assert.equal(flags.includes("COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN"), false, "the corridor IS verified here");
});

test("affiliate approved is not the same as monetized", () => {
  const flags = detectGaps(input({ affiliate_status: "approved", affiliate_url: null }), NOW);
  assert.ok(flags.includes("APPROVED_NO_LINK"));
  assert.equal(isMonetizedRow({ active: true, affiliate_status: "approved", affiliate_url: null }), false);
});

test("affiliate URL exists is not the same as approval", () => {
  const flags = detectGaps(input({ affiliate_status: "pending", affiliate_url: "https://x.com/ref" }), NOW);
  assert.ok(flags.includes("LINK_PRESENT_NOT_APPROVED"));
});

test("stale verification is not the same as unavailable — it is a distinct flag, not a status change", () => {
  const staleDate = new Date(NOW.getTime() - 91 * 24 * 60 * 60 * 1000).toISOString(); // > 90d FINANCIAL window
  const flags = detectGaps(
    input({ countryRows: [countryRow({ verified_at: staleDate, origin_country: "US" })] }),
    NOW,
  );
  assert.ok(flags.includes("MONETIZED_VERIFICATION_STALE"));
  // Staleness must never appear as an availability/corridor gap — freshness.ts's
  // own contract is that age is not evidence of absence.
  assert.equal(flags.includes("COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN"), false);
});

test("a corridor row for a DIFFERENT origin does not answer the asked question — US -> MX does not imply CA -> MX", () => {
  const flags = detectGaps(
    input({
      originCountry: "CA",
      countryRows: [countryRow({ origin_country: "US", verified_at: NOW.toISOString() })],
    }),
    NOW,
  );
  assert.ok(
    flags.includes("COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN"),
    "a US-only corridor row must not satisfy a CA corridor question",
  );
  assert.equal(flags.includes("PENDING_TOO_LONG"), false);
});

test("MX verification does not imply GT — evaluated independently per destination", () => {
  const mxFlags = detectGaps(input({ destinationCountry: "MX" }), NOW);
  const gtFlags = detectGaps(input({ destinationCountry: "GT", countryRows: [] }), NOW);
  assert.equal(mxFlags.includes("PROVIDER_NEVER_VERIFIED"), false);
  assert.ok(gtFlags.includes("PROVIDER_NEVER_VERIFIED"), "no GT row means GT is unverified regardless of MX");
});

test("a corridor claim without recorded evidence is flagged even when verified and fresh", () => {
  const flags = detectGaps(
    input({
      countryRows: [countryRow({ origin_country: "US", verified_at: NOW.toISOString(), evidence_url: null })],
    }),
    NOW,
  );
  assert.ok(flags.includes("CORRIDOR_CLAIM_NO_EVIDENCE"));
});

test("a corridor claim WITH recorded evidence is not flagged for missing evidence", () => {
  const flags = detectGaps(
    input({
      countryRows: [
        countryRow({
          origin_country: "US",
          verified_at: NOW.toISOString(),
          evidence_url: "https://wise.com/us/send-money/send-money-to-mexico",
          evidence_tier: "TIER_1",
        }),
      ],
    }),
    NOW,
  );
  assert.equal(flags.includes("CORRIDOR_CLAIM_NO_EVIDENCE"), false);
});

test("a generic destination-only row alongside an unrelated-origin row still resolves as verified for the exact origin, when present", () => {
  // Two rows for the same destination: one generic, one US-specific. Asking
  // about US must prefer the exact corridor row, not the generic one.
  const flags = detectGaps(
    input({
      originCountry: "US",
      countryRows: [
        countryRow({ origin_country: null, verified_at: NOW.toISOString() }),
        countryRow({
          origin_country: "US",
          verified_at: NOW.toISOString(),
          evidence_url: "https://wise.com/us/send-money/send-money-to-mexico",
          evidence_tier: "TIER_1",
        }),
      ],
    }),
    NOW,
  );
  assert.equal(flags.includes("COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN"), false);
  assert.equal(flags.includes("CORRIDOR_CLAIM_NO_EVIDENCE"), false);
});

test("pending too long is threshold-based and does not fire before the threshold", () => {
  const justUnder = new Date(NOW.getTime() - (PENDING_TOO_LONG_DAYS - 1) * 24 * 60 * 60 * 1000).toISOString();
  const flags = detectGaps(
    input({ affiliate_status: "pending", affiliate_url: null, application_date: justUnder }),
    NOW,
  );
  assert.equal(flags.includes("PENDING_TOO_LONG"), false);
});

test("pending too long fires past the threshold", () => {
  const justOver = new Date(NOW.getTime() - (PENDING_TOO_LONG_DAYS + 1) * 24 * 60 * 60 * 1000).toISOString();
  const flags = detectGaps(
    input({ affiliate_status: "pending", affiliate_url: null, application_date: justOver }),
    NOW,
  );
  assert.ok(flags.includes("PENDING_TOO_LONG"));
});

test("an approved, active, evidenced, fresh, corridor-verified row has zero gaps", () => {
  const flags = detectGaps(
    input({
      affiliate_status: "approved",
      affiliate_url: "https://wise.com/invite/x",
      countryRows: [
        countryRow({
          origin_country: "US",
          verified_at: NOW.toISOString(),
          evidence_url: "https://wise.com/us/send-money/send-money-to-mexico",
          evidence_tier: "TIER_1",
        }),
      ],
    }),
    NOW,
  );
  assert.deepEqual(flags, []);
});
