import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Click-analytics privacy guards (spec §14, §34, §38 "Analytics").
 *
 * These are structural tests. They assert that the code physically cannot
 * write the categories of data §34 prohibits, rather than testing a live
 * Supabase insert — which would need production credentials and would put
 * real rows in a real table.
 *
 * A structural test is the right shape here: the failure mode being guarded
 * against is a future edit quietly adding `user_agent` back, and this
 * catches exactly that.
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(ROOT, relative), "utf8");

const CLICKS_SOURCE = read("lib/affiliate/clicks.ts");
const TYPES_SOURCE = read("lib/affiliate/types.ts");
const SHARED_SOURCE = read("app/go/shared.ts");
const SLUG_ROUTE = read("app/go/[slug]/route.ts");
const CATEGORY_ROUTE = read("app/go/category/[category]/route.ts");

/** Field names that must never appear in an affiliate click insert. */
const FORBIDDEN_FIELDS = [
  "deportation",
  "immigration_status",
  "criminal",
  "case_details",
  "passport",
  "alien_number",
  "a_number",
  "email",
  "full_name",
  "ip_address",
  "ip_hash",
  "user_agent",
  "referrer",
];

test("the click record type cannot carry sensitive personal data", () => {
  const clickRecordBlock = TYPES_SOURCE.slice(TYPES_SOURCE.indexOf("interface AffiliateClickRecord"));

  for (const field of FORBIDDEN_FIELDS) {
    assert.equal(
      clickRecordBlock.includes(`${field}:`),
      false,
      `AffiliateClickRecord must not declare a "${field}" field`
    );
  }
});

test("the click writer never inserts user agent, referrer, or IP data", () => {
  const insertBlock = CLICKS_SOURCE.slice(
    CLICKS_SOURCE.indexOf(".insert({"),
    CLICKS_SOURCE.indexOf("return !error")
  );

  assert.ok(insertBlock.length > 0, "expected to find the insert payload");

  for (const field of ["user_agent:", "referrer:", "ip_hash:", "ip_address:", "email:"]) {
    assert.equal(
      insertBlock.includes(field),
      false,
      `the click insert must not write "${field}"`
    );
  }
});

test("the click writer only inserts the documented commercial fields", () => {
  const expected = [
    "partner_id:",
    "partner_slug:",
    "page_path:",
    "country_code:",
    "category:",
    "placement:",
    "campaign:",
    "network:",
    "outcome:",
    "session_identifier:",
  ];

  for (const field of expected) {
    assert.ok(CLICKS_SOURCE.includes(field), `expected the click insert to write "${field}"`);
  }
});

test("clicks are written through the service role, not an anonymous insert", () => {
  assert.ok(
    CLICKS_SOURCE.includes("createAdminClient"),
    "click logging must use the service-role client so anonymous visitors cannot forge rows"
  );
  assert.equal(
    CLICKS_SOURCE.includes("@/lib/supabase/client"),
    false,
    "click logging must never use the browser client"
  );
});

test("click logging failure cannot propagate out of the writer", () => {
  assert.ok(CLICKS_SOURCE.includes("catch"), "recordAffiliateClick must swallow its own errors");
  assert.ok(
    CLICKS_SOURCE.includes("Promise<boolean>"),
    "recordAffiliateClick must resolve rather than throw"
  );
});

test("no /go handler reads a destination URL from the query string", () => {
  // The classic open-redirect shape is `?url=`/`?to=`/`?redirect=`. None of
  // these routes may look at such a parameter, at all.
  for (const [name, source] of [
    ["shared", SHARED_SOURCE],
    ["/go/[slug]", SLUG_ROUTE],
    ["/go/category/[category]", CATEGORY_ROUTE],
  ] as const) {
    for (const param of ['get("url")', 'get("to")', 'get("redirect")', 'get("next")', 'get("dest")']) {
      assert.equal(source.includes(param), false, `${name} must not read ${param}`);
    }
  }
});

test("the /go handlers only read bounded attribution tokens from the query", () => {
  const reads = SHARED_SOURCE.match(/q\.get\("([a-z]+)"\)/g) ?? [];
  const allowed = new Set(["country", "placement", "campaign", "category", "from"]);

  for (const read of reads) {
    const key = read.slice('q.get("'.length, -2);
    assert.ok(allowed.has(key), `unexpected query parameter read: ${key}`);
  }
  assert.ok(reads.length > 0, "expected readRequestContext to read at least one parameter");
});

test("redirect responses are uncacheable and unindexable", () => {
  assert.ok(SHARED_SOURCE.includes('"Cache-Control", "no-store'), "redirects must not be cached");
  assert.ok(SHARED_SOURCE.includes('"X-Robots-Tag", "noindex'), "redirects must not be indexed");
  assert.ok(SHARED_SOURCE.includes('"Referrer-Policy"'), "redirects must set a referrer policy");
});

test("robots.txt disallows the affiliate redirect and admin paths", () => {
  const robots = read("app/robots.ts");
  assert.ok(robots.includes('"/go/"'), "robots must disallow /go/");
  assert.ok(robots.includes('"/admin/"'), "robots must disallow /admin/");
  assert.ok(robots.includes("sitemap"), "robots must still declare the sitemap");
  // The content pages must stay crawlable — this milestone must not harm SEO.
  assert.ok(robots.includes('allow: "/"'), "robots must keep allowing the rest of the site");
});
