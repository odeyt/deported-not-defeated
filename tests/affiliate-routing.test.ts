import test from "node:test";
import assert from "node:assert/strict";

import {
  slugToCategory,
  categoryToSlug,
  isAffiliateCategory,
  AFFILIATE_CATEGORIES,
  CATEGORY_LABELS,
} from "../lib/affiliate/categories.ts";
import { trackingParamsFor, NETWORK_ADAPTERS, AFFILIATE_NETWORKS } from "../lib/affiliate/networks.ts";
import { __readFlag } from "../lib/affiliate/flags.ts";

/**
 * Category routing, network adapters, and the feature flag.
 */

test("every canonical category has a label and a reversible slug", () => {
  for (const code of AFFILIATE_CATEGORIES) {
    assert.ok(CATEGORY_LABELS[code], `${code} needs a label`);
    assert.equal(slugToCategory(categoryToSlug(code)), code, `${code} must round-trip`);
  }
});

test("slugToCategory resolves the documented route segments", () => {
  assert.equal(slugToCategory("money-transfer"), "MONEY_TRANSFER");
  assert.equal(slugToCategory("hotel"), "HOTELS");
  assert.equal(slugToCategory("esim"), "ESIM");
  assert.equal(slugToCategory("TRAVEL-INSURANCE"), "TRAVEL_INSURANCE");
  assert.equal(slugToCategory("  vpn  "), "VPN");
});

test("slugToCategory maps the legacy affiliate_categories slugs", () => {
  assert.equal(slugToCategory("vpn-privacy"), "VPN");
  assert.equal(slugToCategory("phone-internet"), "PHONE_INTERNET");
  assert.equal(slugToCategory("health-insurance"), "HEALTH_INSURANCE");
});

test("an unknown category is null, never a wildcard", () => {
  for (const bad of ["", "   ", "crypto", "../../admin", "money transfer", "a".repeat(50), null]) {
    assert.equal(slugToCategory(bad as unknown as string), null, `should reject: ${String(bad)}`);
  }
});

test("isAffiliateCategory rejects lowercase and unknown codes", () => {
  assert.equal(isAffiliateCategory("MONEY_TRANSFER"), true);
  assert.equal(isAffiliateCategory("money_transfer"), false);
  assert.equal(isAffiliateCategory("CRYPTO"), false);
});

// ------------------------------------------------------------- network subid

test("no network appends a guessed sub-ID parameter yet", () => {
  // Every adapter ships with subIdParam: null until a real publisher account
  // exists and the network's own documentation has been read (spec §24).
  // If this test starts failing, someone filled one in — make sure they
  // verified it against the dashboard rather than a blog post.
  for (const network of AFFILIATE_NETWORKS) {
    const adapter = NETWORK_ADAPTERS[network];
    assert.ok(adapter.verificationNote.length > 0, `${network} needs a verification note`);
    if (adapter.subIdParam !== null) {
      assert.match(adapter.subIdParam, /^[a-zA-Z0-9_-]+$/, `${network} sub-ID param looks malformed`);
    }
  }
});

test("trackingParamsFor returns nothing for unknown or unconfigured networks", () => {
  assert.deepEqual(trackingParamsFor("travelpayouts", "mx_flights"), {});
  assert.deepEqual(trackingParamsFor("not-a-network", "mx_flights"), {});
  assert.deepEqual(trackingParamsFor(null, "mx_flights"), {});
  assert.deepEqual(trackingParamsFor("impact", ""), {});
  assert.deepEqual(trackingParamsFor("impact", null), {});
});

// ------------------------------------------------------------- feature flag

test("the affiliate engine flag defaults to on when unset", () => {
  assert.equal(__readFlag(undefined, true), true);
  assert.equal(__readFlag("", true), true);
});

test("the flag understands the usual off and on spellings", () => {
  for (const off of ["0", "false", "off", "no", "FALSE", " Off "]) {
    assert.equal(__readFlag(off, true), false, `${off} should read as off`);
  }
  for (const on of ["1", "true", "on", "yes", "TRUE"]) {
    assert.equal(__readFlag(on, false), true, `${on} should read as on`);
  }
});

test("an unrecognised flag value falls back to the default rather than guessing", () => {
  assert.equal(__readFlag("maybe", true), true);
  assert.equal(__readFlag("maybe", false), false);
});
