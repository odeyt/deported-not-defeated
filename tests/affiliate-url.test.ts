import test from "node:test";
import assert from "node:assert/strict";

import {
  isSafeAffiliateUrl,
  isValidProviderSlug,
  normalizeCountryCode,
  sourcePathFromReferer,
  buildSubId,
  withTrackingParams,
} from "../lib/affiliate/url.ts";

/**
 * Redirect-safety tests (spec §38, "Router").
 *
 * These cover the boundary that decides whether a stored string is allowed
 * to become a Location header. Everything the /go routes redirect to has
 * passed through `isSafeAffiliateUrl` first.
 */

test("isSafeAffiliateUrl accepts ordinary https and http destinations", () => {
  assert.equal(isSafeAffiliateUrl("https://wise.com"), true);
  assert.equal(isSafeAffiliateUrl("https://numero.app?ref=RE_29X3K"), true);
  assert.equal(isSafeAffiliateUrl("http://example.com/path?a=1#frag"), true);
  assert.equal(isSafeAffiliateUrl("https://sub.domain.example.co.uk/a/b"), true);
});

test("isSafeAffiliateUrl rejects script and data protocols", () => {
  for (const hostile of [
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "  javascript:alert(1)  ",
    "data:text/html;base64,PHNjcmlwdD4=",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "ftp://example.com/x",
  ]) {
    assert.equal(isSafeAffiliateUrl(hostile), false, `should reject: ${hostile}`);
  }
});

test("isSafeAffiliateUrl rejects protocol-relative and relative URLs", () => {
  assert.equal(isSafeAffiliateUrl("//evil.example.com"), false);
  assert.equal(isSafeAffiliateUrl("/resources"), false);
  assert.equal(isSafeAffiliateUrl("resources/money-transfer"), false);
  assert.equal(isSafeAffiliateUrl("#"), false);
});

test("isSafeAffiliateUrl rejects embedded credentials", () => {
  assert.equal(isSafeAffiliateUrl("https://user:pass@evil.example.com"), false);
  assert.equal(isSafeAffiliateUrl("https://wise.com@evil.example.com"), false);
});

test("isSafeAffiliateUrl rejects control characters and header smuggling", () => {
  assert.equal(isSafeAffiliateUrl("https://example.com\r\nSet-Cookie: a=b"), false);
  assert.equal(isSafeAffiliateUrl("https://example.com\nLocation: https://evil.example"), false);
  assert.equal(isSafeAffiliateUrl("https://exa mple.com"), false);
  assert.equal(isSafeAffiliateUrl(`https://exa${String.fromCharCode(0)}mple.com`), false);
});

test("isSafeAffiliateUrl rejects hostless and non-string values", () => {
  assert.equal(isSafeAffiliateUrl("https://localhost:3000"), false);
  assert.equal(isSafeAffiliateUrl("https://intranet"), false);
  assert.equal(isSafeAffiliateUrl(null), false);
  assert.equal(isSafeAffiliateUrl(undefined), false);
  assert.equal(isSafeAffiliateUrl(""), false);
  assert.equal(isSafeAffiliateUrl(12345), false);
  assert.equal(isSafeAffiliateUrl({ toString: () => "https://evil.example" }), false);
});

test("isSafeAffiliateUrl rejects absurdly long URLs", () => {
  assert.equal(isSafeAffiliateUrl(`https://example.com/${"a".repeat(4000)}`), false);
});

test("isValidProviderSlug accepts real slugs and rejects injection attempts", () => {
  assert.equal(isValidProviderSlug("wise"), true);
  assert.equal(isValidProviderSlug("western-union"), true);
  assert.equal(isValidProviderSlug("taptap-send"), true);

  for (const bad of [
    "Wise",
    "wise;drop table affiliate_partners",
    "wise' or '1'='1",
    "../../etc/passwd",
    "-leading-dash",
    "with space",
    "a".repeat(65),
    "",
    null,
  ]) {
    assert.equal(isValidProviderSlug(bad as unknown as string), false, `should reject: ${String(bad)}`);
  }
});

test("normalizeCountryCode only accepts ISO alpha-2 and never guesses", () => {
  assert.equal(normalizeCountryCode("mx"), "MX");
  assert.equal(normalizeCountryCode(" gt "), "GT");
  assert.equal(normalizeCountryCode("Mexico"), null);
  assert.equal(normalizeCountryCode("MEX"), null);
  assert.equal(normalizeCountryCode("M1"), null);
  assert.equal(normalizeCountryCode(null), null);
});

test("sourcePathFromReferer keeps the path and discards query strings", () => {
  const origin = "https://deportednotdefeated.com/go/wise";

  assert.equal(
    sourcePathFromReferer("https://deportednotdefeated.com/mexico/first-30-days?q=secret", origin),
    "/mexico/first-30-days"
  );
  assert.equal(
    sourcePathFromReferer("https://deportednotdefeated.com/resources#anchor", origin),
    "/resources"
  );
});

test("sourcePathFromReferer refuses to store off-site referrers", () => {
  const origin = "https://deportednotdefeated.com/go/wise";
  assert.equal(sourcePathFromReferer("https://google.com/search?q=deportation", origin), null);
  assert.equal(sourcePathFromReferer("not a url", origin), null);
  assert.equal(sourcePathFromReferer(null, origin), null);
});

test("buildSubId produces the documented shape and stays impersonal", () => {
  assert.equal(
    buildSubId({ country: "MX", category: "MONEY_TRANSFER", placement: "compare" }),
    "mx_money_transfer_compare"
  );
  assert.equal(buildSubId({ country: null, category: "ESIM", placement: null }), "esim");
  assert.equal(buildSubId({}), "");
  assert.equal(buildSubId({ country: "  ", category: "VPN" }), "vpn");
});

test("buildSubId strips characters networks would mangle and caps length", () => {
  assert.equal(buildSubId({ campaign: "spring/2026 promo!" }), "spring_2026_promo");
  assert.ok(buildSubId({ campaign: "x".repeat(200) }).length <= 64);
});

test("withTrackingParams never overwrites a parameter the network already set", () => {
  const url = "https://partner.example.com/?marker=REAL123";
  assert.equal(withTrackingParams(url, { marker: "OURS" }), url);
});

test("withTrackingParams appends only non-empty values", () => {
  const result = withTrackingParams("https://partner.example.com/", {
    subid: "mx_money_transfer",
    empty: "",
    missing: null,
  });
  const parsed = new URL(result);
  assert.equal(parsed.searchParams.get("subid"), "mx_money_transfer");
  assert.equal(parsed.searchParams.has("empty"), false);
  assert.equal(parsed.searchParams.has("missing"), false);
});

test("withTrackingParams cannot promote an unsafe URL into a used one", () => {
  const hostile = "javascript:alert(1)";
  assert.equal(withTrackingParams(hostile, { subid: "x" }), hostile);
  assert.equal(isSafeAffiliateUrl(withTrackingParams(hostile, { subid: "x" })), false);
});
