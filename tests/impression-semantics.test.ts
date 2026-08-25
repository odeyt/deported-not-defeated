import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  MAX_BATCH,
  MAX_REQUEST_IMPRESSIONS,
  impressionKey,
  type AffiliateImpressionRecord,
} from "../lib/affiliate/impressions.ts";
import {
  chunkImpressions,
  impressionDedupKey,
  queueImpression,
  flushImpressions,
  __resetImpressionQueue,
  __pendingImpressions,
} from "../lib/affiliate/impressionQueue.ts";

/**
 * Provider-level impression semantics (M-GROWTH1A.4).
 *
 * PRODUCTION EVIDENCE THAT PROMPTED THIS
 *   One calculator interaction wrote ~20 MONEY_TRANSFER rows sharing the exact
 *   timestamp 2026-08-25 03:48:12.566288+00, describing providers the reader
 *   had never scrolled to — and Wise, rendered 21st, was absent entirely.
 *
 *   Two causes, both proven from code: a single IntersectionObserver watched
 *   the whole GRID and flushed every provider in the array at once, and the
 *   batch was truncated at 20.
 *
 * The invariant these tests defend:
 *   ONE PROVIDER CARD -> ONE PROVIDER IMPRESSION, when that card is seen.
 */

const ROOT = path.join(import.meta.dirname, "..");

const PAGE = "/tools/return-home-cost";
const PLACEMENT = "calculator-result";
const CAMPAIGN = "return_cost_money_transfer";

/** The exact 21-provider order production rendered, Wise last. */
const MONEY_ORDER = [
  "worldremit",
  "moneygram",
  "remitly",
  "ria",
  "paysend",
  "xe",
  "ofx",
  "xoom",
  "payoneer",
  "instarem",
  "taptap-send",
  "lemfi",
  "small-world",
  "revolut",
  "skrill",
  "panda-remit",
  "airtm",
  "grey",
  "ace",
  "western-union",
  "wise",
];

function record(
  slug: string,
  over: Partial<AffiliateImpressionRecord> = {}
): AffiliateImpressionRecord {
  return {
    providerId: "id-" + slug,
    providerSlug: slug,
    countryCode: "MX",
    category: "MONEY_TRANSFER",
    placement: PLACEMENT,
    campaign: CAMPAIGN,
    sourcePage: PAGE,
    ...over,
  };
}

/** Simulates cards becoming visible, one card at a time. */
function view(slugs: string[]): string[] {
  const accepted: string[] = [];
  for (const slug of slugs) {
    if (queueImpression(record(slug))) accepted.push(slug);
  }
  return accepted;
}

test.beforeEach(() => __resetImpressionQueue());
test.afterEach(() => __resetImpressionQueue());

// ------------------------------------------------- Scenario A

test("A: 20 cards exist but only 3 are seen -> 3 impressions, not 20", () => {
  const seen = view(MONEY_ORDER.slice(0, 3));

  assert.deepEqual(seen, ["worldremit", "moneygram", "remitly"]);
  assert.equal(__pendingImpressions().length, 3, "a card nobody scrolled to must not count");
});

test("A: existing in the array is not an impression", () => {
  view(["worldremit"]);
  const queued = __pendingImpressions().map((r) => r.providerSlug);

  for (const slug of MONEY_ORDER.slice(1)) {
    assert.ok(!queued.includes(slug), slug + " was rendered but never seen");
  }
});

// ------------------------------------------------- Scenario B (Wise)

test("B: Wise is card #21 and is seen -> Wise records its own impression", () => {
  const seen = view(MONEY_ORDER);

  assert.equal(seen.length, 21, "all 21 seen cards must be recordable");
  assert.ok(seen.includes("wise"), "Wise was dropped — the exact production defect");
});

test("B: no cap can suppress the 21st provider", () => {
  assert.ok(MONEY_ORDER.length > MAX_BATCH, "fixture must exceed one transport chunk");

  const seen = view(MONEY_ORDER);
  assert.equal(seen.indexOf("wise"), 20, "Wise sits past the batch boundary, deliberately");
});

test("B: 21 records chunk rather than truncate", () => {
  const chunks = chunkImpressions(MONEY_ORDER.map((s) => record(s)));
  const flat = chunks.flat().map((r) => r.providerSlug);

  assert.equal(flat.length, 21, "chunking must not lose a record");
  assert.ok(flat.includes("wise"));
  assert.deepEqual(
    chunks.map((c) => c.length),
    [20, 1]
  );
});

// ------------------------------------------------- Scenario C

test("C: scrolling away and back does not duplicate Wise", () => {
  assert.deepEqual(view(["wise"]), ["wise"]);
  assert.deepEqual(view(["wise"]), [], "second sighting is the same impression");
});

test("C: dedup survives the tracker unmounting and remounting", () => {
  view(["wise"]);
  flushImpressions(); // component unmounted, queue drained
  assert.deepEqual(view(["wise"]), [], "a per-instance ref would have re-counted here");
});

// ------------------------------------------------- Scenario D

test("D: the same provider in a different placement counts once per placement", () => {
  assert.ok(queueImpression(record("wise", { placement: "calculator-result" })));
  assert.ok(
    queueImpression(record("wise", { placement: "comparison-top", sourcePage: "/mexico" })),
    "a genuinely different placement is independently measurable"
  );
  assert.equal(__pendingImpressions().length, 2);
});

test("D: Wise is never globally suppressed across the site", () => {
  queueImpression(record("wise"));
  const elsewhere = queueImpression(
    record("wise", { placement: "comparison-top", sourcePage: "/resources/money-transfer" })
  );
  assert.ok(elsewhere, "suppressing Wise site-wide would hide the one earning provider");
});

test("D: dedup distinguishes category and campaign", () => {
  const base = record("numeromoney", { placement: "inline", sourcePage: "/mexico" });
  assert.notEqual(
    impressionDedupKey(base),
    impressionDedupKey({ ...base, campaign: "other_campaign" })
  );
  assert.notEqual(
    impressionDedupKey(base),
    impressionDedupKey({ ...base, category: "PHONE_INTERNET" })
  );
});

test("the server-side key agrees with the client key on what is distinct", () => {
  const base = record("wise");
  assert.notEqual(impressionKey(base), impressionKey({ ...base, campaign: "x" }));
  assert.notEqual(impressionKey(base), impressionKey({ ...base, category: "TRAVEL" }));
});

// ------------------------------------------------- no telemetry cap

test("no provider cap exists in the tracking path", () => {
  const tracker = fs.readFileSync(
    path.join(ROOT, "components/affiliate/ImpressionTracker.tsx"),
    "utf8"
  );
  const queue = fs.readFileSync(path.join(ROOT, "lib/affiliate/impressionQueue.ts"), "utf8");
  const service = fs.readFileSync(path.join(ROOT, "lib/affiliate/impressions.ts"), "utf8");

  assert.ok(!/\.slice\(0,\s*MAX_BATCH\)/.test(service), "the service must chunk, never truncate");
  assert.ok(!/\.slice\(0,\s*\d+\)/.test(tracker), "the tracker must not cap providers");
  assert.ok(!/records\.slice\(0,/.test(queue), "the queue must chunk, never truncate");
});

test("the HTTP abuse bound sits above the client chunk size", () => {
  assert.ok(
    MAX_REQUEST_IMPRESSIONS > MAX_BATCH,
    "if the request bound were <= the chunk size it would truncate real traffic"
  );
});

// ------------------------------------------------- per-card architecture

test("the tracker observes ONE provider, not a list", () => {
  const tracker = fs.readFileSync(
    path.join(ROOT, "components/affiliate/ImpressionTracker.tsx"),
    "utf8"
  );
  assert.match(tracker, /impression:\s*TrackedImpression/, "props must carry one provider");
  assert.ok(
    !/impressions:\s*TrackedImpression\[\]/.test(tracker),
    "an array prop is what allowed a grid to report cards nobody saw"
  );
});

test("call sites wrap each card, not the grid", () => {
  for (const file of [
    "components/affiliate/AffiliateRecommendations.tsx",
    "components/tools/ReturnHomeCalculator.tsx",
  ]) {
    const source = fs.readFileSync(path.join(ROOT, file), "utf8");
    const trackerIndex = source.indexOf("<ImpressionTracker");
    const gridIndex = source.indexOf('className="grid');
    assert.ok(trackerIndex > -1, file + " must render a tracker");
    assert.ok(
      gridIndex === -1 || trackerIndex > gridIndex,
      file + " wraps the grid instead of each card"
    );
    assert.match(source, /impression=\{/, file + " must pass a single impression per card");
  }
});

test("visibility is a documented ratio, not one pixel", () => {
  const tracker = fs.readFileSync(
    path.join(ROOT, "components/affiliate/ImpressionTracker.tsx"),
    "utf8"
  );
  assert.match(tracker, /VISIBILITY_RATIO = 0\.5/);
  assert.match(tracker, /ROOT_MARGIN = "0px"/);
});
