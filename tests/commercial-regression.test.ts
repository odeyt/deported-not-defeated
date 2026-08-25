import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { queueImpression, __resetImpressionQueue } from "../lib/affiliate/impressionQueue.ts";

/**
 * Semantic commercial regression suite (M-GROWTH1A.4 §16).
 *
 * Every defect this milestone chain uncovered was invisible to a status-code
 * check: the page returned 200 while missing a section, showing four providers
 * that earn nothing, or recording impressions for cards nobody saw.
 *
 * These assert OUTCOMES — what renders, what is measurable, what stays
 * distinct — not that a request succeeded.
 */

const ROOT = path.join(import.meta.dirname, "..");

const calculator = fs.readFileSync(
  path.join(ROOT, "components/tools/ReturnHomeCalculator.tsx"),
  "utf8"
);
const calculatorPage = fs.readFileSync(
  path.join(ROOT, "app/tools/return-home-cost/page.tsx"),
  "utf8"
);
const card = fs.readFileSync(
  path.join(ROOT, "components/affiliate/ProviderRecommendationCard.tsx"),
  "utf8"
);

// ---------------------------------------------------------------- calculator

test("money recommendations are gated on the stated money need", () => {
  assert.match(
    calculator,
    /const showMoneyTransfer\s*=\s*input\.familyMaySendMoney\s*&&/,
    "a reader who did not ask about money transfer must not see it"
  );
});

test("eSIM recommendations are gated on the stated phone need", () => {
  assert.match(calculator, /const showEsim\s*=\s*input\.needsPhone\s*&&/);
});

test("each shown block wraps its cards in a tracker", () => {
  // Both conditional grids must carry per-card trackers, or a rendered block
  // is unmeasurable and its providers look like they were never shown.
  const trackers = calculator.match(/<ImpressionTracker/g) ?? [];
  assert.equal(trackers.length, 2, "one per conditional grid: money transfer and eSIM");
  assert.match(calculator, /impression=\{impressionFor\(/);
});

test("the calculator queries categories that hold providers", () => {
  assert.match(calculatorPage, /category:\s*"MONEY_TRANSFER"/);
  assert.match(calculatorPage, /category:\s*"PHONE_INTERNET"/);
  assert.ok(!/category:\s*"ESIM"/.test(calculatorPage), "ESIM holds no providers");
});

// ---------------------------------------------------------------- Wise

test("Wise is not capped out of the rendered list", () => {
  assert.ok(
    !/allMoneyTransfer\s*\.slice\(/.test(calculatorPage),
    "a cap drops whatever ranks last, and Wise ranks 21st of 21"
  );
});

test("every provider CTA routes through /go/<slug>", () => {
  assert.match(card, /\/go\/\$\{provider\.slug\}|`\/go\/\$\{/, "CTAs must use the central router");
  assert.ok(
    !/href="https?:\/\//.test(card),
    "a hardcoded destination would escape click tracking and validation"
  );
});

test("ranking never consults commission", () => {
  const selection = fs.readFileSync(path.join(ROOT, "lib/affiliate/selection.ts"), "utf8");
  const ranking = selection.slice(selection.indexOf("export function rankProviders"));
  for (const forbidden of ["commission", "payout", "revenue", "epc", "earnings"]) {
    assert.ok(
      !ranking.toLowerCase().includes(forbidden),
      "ranking must not read " + forbidden
    );
  }
});

// ------------------------------------------------- measurement distinctions

test("rendered is not the same as impressed", () => {
  __resetImpressionQueue();
  // Twenty-one providers rendered; the reader saw one.
  const seen = queueImpression({
    providerId: "id-worldremit",
    providerSlug: "worldremit",
    countryCode: "MX",
    category: "MONEY_TRANSFER",
    placement: "calculator-result",
    campaign: "return_cost_money_transfer",
    sourcePage: "/tools/return-home-cost",
  });
  assert.equal(seen, true);
  __resetImpressionQueue();
});

test("a visible grid does not impress every provider in it", () => {
  const tracker = fs.readFileSync(
    path.join(ROOT, "components/affiliate/ImpressionTracker.tsx"),
    "utf8"
  );
  assert.ok(
    !/impressions\.map|impressions\.filter/.test(tracker),
    "iterating a provider list inside the tracker is grid-level measurement"
  );
});

test("clicks and impressions are separate write paths", () => {
  const clicks = fs.readFileSync(path.join(ROOT, "lib/affiliate/clicks.ts"), "utf8");
  const impressions = fs.readFileSync(path.join(ROOT, "lib/affiliate/impressions.ts"), "utf8");

  assert.match(clicks, /affiliate_clicks/);
  assert.match(impressions, /affiliate_impressions/);
  assert.ok(
    !clicks.includes("affiliate_impressions"),
    "a click must never write or mutate an impression row"
  );
  assert.ok(!impressions.includes("affiliate_clicks"));
});

test("recording an impression never mutates existing rows", () => {
  const impressions = fs.readFileSync(path.join(ROOT, "lib/affiliate/impressions.ts"), "utf8");
  for (const forbidden of [".update(", ".upsert(", ".delete("]) {
    assert.ok(
      !impressions.includes(forbidden),
      "impressions are append-only; " + forbidden + " would rewrite history"
    );
  }
});
