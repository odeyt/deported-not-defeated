import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { impressionKey, MAX_BATCH } from "../lib/affiliate/impressions.ts";

/**
 * Impression tracking (M-GROWTH1A Phase 2).
 *
 * Impressions are the denominator of affiliate CTR, which makes inflation the
 * dangerous failure: every duplicate row silently depresses the measured CTR
 * of a placement that may actually be working.
 */

const ROOT = path.join(import.meta.dirname, "..");

// ---------------------------------------------------------------- dedup

test("the same card on the same page is one impression", () => {
  const record = {
    providerId: "id-1",
    providerSlug: "wise",
    placement: "calculator-result",
    sourcePage: "/tools/return-home-cost",
  };
  assert.equal(impressionKey(record), impressionKey({ ...record, providerId: "different" }));
});

test("the same provider in different placements counts separately", () => {
  const base = { providerId: "id-1", providerSlug: "wise", sourcePage: "/mexico" };
  assert.notEqual(
    impressionKey({ ...base, placement: "comparison-top" }),
    impressionKey({ ...base, placement: "calculator-result" })
  );
});

test("the same provider and placement on different pages counts separately", () => {
  const base = { providerId: "id-1", providerSlug: "wise", placement: "inline" };
  assert.notEqual(
    impressionKey({ ...base, sourcePage: "/mexico" }),
    impressionKey({ ...base, sourcePage: "/resources/money-transfer" })
  );
});

test("different providers never collide", () => {
  const base = { providerId: "x", placement: "inline", sourcePage: "/mexico" };
  assert.notEqual(
    impressionKey({ ...base, providerSlug: "wise" }),
    impressionKey({ ...base, providerSlug: "remitly" })
  );
});

// ---------------------------------------------------------------- batching

test("a batch cap exists so one request cannot write unbounded rows", () => {
  assert.ok(MAX_BATCH > 0 && MAX_BATCH <= 50, `unexpected cap: ${MAX_BATCH}`);
});

// ---------------------------------------------------------------- privacy

test("the impression record cannot carry personal data", () => {
  const source = fs.readFileSync(path.join(ROOT, "lib/affiliate/impressions.ts"), "utf8");
  const code = source
    .split("\n")
    .filter((line) => !line.trim().startsWith("*") && !line.trim().startsWith("//"))
    .join("\n");

  for (const forbidden of ["ip_", "ipAddress", "user_agent", "userAgent", "referrer", "session_id", "email"]) {
    assert.ok(!code.includes(forbidden), `impressions must never record ${forbidden}`);
  }
});

test("the migration defines no personal columns", () => {
  const sql = fs.readFileSync(path.join(ROOT, "supabase/affiliate_impressions.sql"), "utf8");
  const ddl = sql.slice(sql.indexOf("create table"), sql.indexOf("comment on table"));

  for (const forbidden of ["ip_hash", "user_agent", "referrer", "email", "session_identifier"]) {
    assert.ok(!ddl.includes(forbidden), `schema must not contain ${forbidden}`);
  }
});

test("anonymous writes are never granted", () => {
  const sql = fs.readFileSync(path.join(ROOT, "supabase/affiliate_impressions.sql"), "utf8");
  assert.match(sql, /revoke all on affiliate_impressions from anon/);
  assert.ok(
    !/grant\s+(insert|all)[^;]*to\s+anon/i.test(sql),
    "anonymous insert would reopen the click-forgery hole on a new table"
  );
});

// ---------------------------------------------------------------- endpoint

test("the beacon validates the provider slug and rejects junk", () => {
  const route = fs.readFileSync(path.join(ROOT, "app/api/affiliate-impression/route.ts"), "utf8");
  assert.match(route, /\^\[a-z0-9\]\[a-z0-9-\]/, "slug must be pattern-checked");
  assert.match(route, /split\("\?"\)/, "query strings must be stripped from the recorded path");
});

test("the beacon always returns 204 and never leaks an error", () => {
  const route = fs.readFileSync(path.join(ROOT, "app/api/affiliate-impression/route.ts"), "utf8");
  assert.match(route, /status:\s*204/);
  assert.ok(!/status:\s*(400|401|403|500)/.test(route), "analytics must not invite retries");
});

// ---------------------------------------------------------------- clicks intact

test("click recording still refuses to fall back to anonymous insert", () => {
  const clicks = fs.readFileSync(path.join(ROOT, "lib/affiliate/clicks.ts"), "utf8");
  assert.match(clicks, /createAdminClient\(\)/);
  assert.match(clicks, /return false/);
});
