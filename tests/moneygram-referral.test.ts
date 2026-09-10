import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { isMonetizable, resolveProviderDestination } from "../lib/affiliate/selection.ts";
import { isSafeAffiliateUrl } from "../lib/affiliate/url.ts";
import type { AffiliateProvider } from "../lib/affiliate/types.ts";

/**
 * MoneyGram "Invite Friends" referral code — containment tests.
 *
 * THE DEFECT THESE PREVENT
 *   On 2026-09-10 the operator supplied the code RAFV3FFRWZCD. Verified
 *   against MoneyGram's own published terms, it is a CUSTOMER referral code
 *   for the "Invite Friends" program — not an affiliate or publisher tracking
 *   ID. It pays the operator a capped discount on their own next transfer,
 *   requires each recipient's prior consent, and is scoped to family and
 *   friends in the same country.
 *
 *   The obvious wrong move is to turn a 12-character code into a plausible URL
 *   (moneygram.com/?ref=RAFV3FFRWZCD or similar) and ship it. That URL would
 *   be invented, would attribute nothing, and would put the operator's personal
 *   MoneyGram account at risk under the program's suspension clause.
 *
 *   These tests make that move fail loudly instead of silently shipping.
 *
 * See docs/MONEYGRAM-AFFILIATE-RESEARCH.md and
 * supabase/affiliate_moneygram_referral.sql.
 */

const ROOT = path.join(import.meta.dirname, "..");
const CODE = "RAFV3FFRWZCD";

/** Source trees a public visitor's bytes can come from. */
const PUBLIC_SOURCE_DIRS = ["app", "components", "lib", "data"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|js|jsx|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const publicSourceFiles = PUBLIC_SOURCE_DIRS.flatMap((d) => walk(path.join(ROOT, d)));

// ------------------------------------------------- no fabricated URL anywhere

test("no MoneyGram tracking URL is constructed from the referral code", () => {
  // The code may live in operator metadata (SQL, docs, this test). It must
  // never appear inside anything that ships to a browser or builds a link.
  for (const file of publicSourceFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(
      source.includes(CODE),
      false,
      `${path.relative(ROOT, file)} contains the MoneyGram referral code. ` +
        `It belongs in operator-only database metadata, never in shipped source.`
    );
  }
});

test("no guessed moneygram.com referral URL exists in the repository", () => {
  // Catches the specific shapes someone would reach for: ?ref=, ?rc=,
  // /invite/<code>, ?promo=, ?referral=.
  const guessed =
    /moneygram\.com[^\s"'`]*(?:[?&](?:ref|rc|referral|promo|invite|code|utm_source)=|\/invite\/|\/refer\/)/i;

  for (const file of publicSourceFiles) {
    const source = fs.readFileSync(file, "utf8");
    const match = source.match(guessed);
    assert.equal(
      match,
      null,
      `${path.relative(ROOT, file)} contains what looks like a constructed MoneyGram ` +
        `referral URL (${match?.[0]}). MoneyGram's Invite Friends link is generated inside ` +
        `a logged-in account; its structure is not published and must not be invented.`
    );
  }
});

test("the migration records the code but never writes an affiliate URL for it", () => {
  const migration = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_moneygram_referral.sql"),
    "utf8"
  );

  assert.ok(migration.includes(CODE), "the migration should record the operator's code");

  // Strip -- comments so the assertions inspect real SQL, not the explanation.
  const NEWLINE = String.fromCharCode(10);
  const sql = migration
    .split(NEWLINE)
    .map((line) => {
      let inString = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "'") inString = !inString;
        else if (!inString && line[i] === "-" && line[i + 1] === "-") return line.slice(0, i);
      }
      return line;
    })
    .join(NEWLINE);

  assert.equal(
    /set\s+affiliate_url\s*=/i.test(sql),
    false,
    "the migration must not set affiliate_url for MoneyGram"
  );
  assert.equal(
    /affiliate_status\s*=\s*'approved'/i.test(sql),
    false,
    "the migration must not promote MoneyGram to approved"
  );
  assert.equal(
    /moneygram\.com[^\s']*RAFV3FFRWZCD/i.test(sql),
    false,
    "the migration must not embed the code in a URL"
  );
});

test("the recorded code is self-labelling so it cannot be misread as a publisher ID", () => {
  const migration = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_moneygram_referral.sql"),
    "utf8"
  );

  assert.ok(
    migration.includes(`INVITE_FRIENDS_CUSTOMER_REFERRAL_CODE:${CODE}`),
    "the stored value must carry its own label — a bare code in account_identifier " +
      "is what a future reader turns into a guessed tracking URL"
  );
});

test("the code is stored only in columns anon cannot read", () => {
  const migration = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_moneygram_referral.sql"),
    "utf8"
  );
  const hardening = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_engine_m1_hardening.sql"),
    "utf8"
  );

  // Columns the migration writes the code into.
  const targets = ["account_identifier", "internal_notes", "terms_notes"];
  for (const column of targets) {
    assert.ok(migration.includes(column), `migration should write ${column}`);
  }

  // None of them may appear in the anon grant list.
  const grantBlock = hardening.slice(
    hardening.indexOf("grant select ("),
    hardening.indexOf("on affiliate_partners to anon;")
  );
  for (const column of targets) {
    assert.equal(
      new RegExp(`(^|[\\s,(])${column}([\\s,)]|$)`).test(grantBlock),
      false,
      `${column} must not be readable by anon — it now holds the operator's referral code`
    );
  }
});

// ------------------------------------------------ runtime behaviour is unchanged

function moneygram(overrides: Partial<AffiliateProvider> = {}): AffiliateProvider {
  return {
    id: "16b9b6cc-90fd-48e0-a40f-7f34fad0bee0",
    slug: "moneygram",
    name: "MoneyGram",
    category: "MONEY_TRANSFER",
    network: null,
    description: "Cash pickup and worldwide money transfer.",
    whyItHelps: "Cash pickup and worldwide transfer options.",
    websiteUrl: "https://www.moneygram.com",
    affiliateUrl: null,
    approvalStatus: "pending",
    placementType: "editorial",
    ctaLabel: "View MoneyGram Guide",
    active: true,
    featured: false,
    disclosureRequired: true,
    availableGlobally: false,
    trustScore: null,
    globalPriority: 85,
    countryPriority: 90,
    countryVerified: false,
    countryNotes: null,
    ...overrides,
  } as AffiliateProvider;
}

test("MoneyGram as configured today is not monetizable", () => {
  assert.equal(isMonetizable(moneygram()), false);
});

test("MoneyGram still sends visitors somewhere useful — its own website", () => {
  const result = resolveProviderDestination(moneygram(), "https://example.com/resources");

  assert.equal(result.kind, "website");
  assert.equal(result.url, "https://www.moneygram.com");
});

test("a referral code pasted into affiliate_url would not survive validation", () => {
  // Defence in depth: even if someone pasted the bare code into the admin
  // form, it is not a URL and the redirect layer rejects it.
  assert.equal(isSafeAffiliateUrl(CODE), false);
  assert.equal(isMonetizable(moneygram({ approvalStatus: "approved", affiliateUrl: CODE })), false);
});

test("marking MoneyGram approved without a URL still does not monetize it", () => {
  const result = resolveProviderDestination(
    moneygram({ approvalStatus: "approved", affiliateUrl: null }),
    "https://example.com/resources"
  );

  assert.equal(result.kind, "website");
});

// ------------------------------------------------------------ evidence hygiene

test("corridor evidence cites MoneyGram's own pages and only the six reviewed", () => {
  const migration = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_moneygram_referral.sql"),
    "utf8"
  );

  const reviewed = ["mexico", "guatemala", "el-salvador", "cambodia", "laos", "philippines"];
  for (const corridor of reviewed) {
    assert.ok(
      migration.includes(`https://www.moneygram.com/us/en/corridor/${corridor}`),
      `missing Tier 1 citation for the ${corridor} corridor`
    );
  }

  // Vietnam, Nigeria, and Ghana rows exist but were never reviewed. They must
  // stay unverified rather than being backfilled with a guessed corridor URL.
  for (const unreviewed of ["vietnam", "nigeria", "ghana"]) {
    assert.equal(
      migration.includes(`/corridor/${unreviewed}`),
      false,
      `${unreviewed} was not part of the 2026-09-01 review — it must not be cited`
    );
  }
});

test("the research record states plainly that no affiliate program was verified", () => {
  const research = fs.readFileSync(
    path.join(ROOT, "docs/MONEYGRAM-AFFILIATE-RESEARCH.md"),
    "utf8"
  );

  assert.ok(
    /Invite Friends/i.test(research),
    "the research record must name the program the code actually belongs to"
  );
  assert.ok(
    /not an affiliate/i.test(research),
    "the research record must state that this is not an affiliate program"
  );
});
