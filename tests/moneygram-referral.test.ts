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
 * WHERE THE CODE LIVES
 *   Documentation only — docs/MONEYGRAM-AFFILIATE-RESEARCH.md and
 *   docs/AFFILIATE-OFFER-REGISTRY.md. It is deliberately NOT persisted to the
 *   database. An earlier draft wrote it to affiliate_partners.account_identifier,
 *   a column documented as "Publisher / account ID with the network". Storing a
 *   consumer referral code there is semantically wrong and creates an
 *   activation footgun: a populated "Publisher / Account ID" field sitting next
 *   to a status dropdown makes flipping to `approved` look like the obvious
 *   next step. That persistence was removed, and the tests below now enforce
 *   its absence rather than its labelling.
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
  // The code may live in documentation. It must never appear inside anything
  // that ships to a browser or builds a link.
  for (const file of publicSourceFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(
      source.includes(CODE),
      false,
      `${path.relative(ROOT, file)} contains the MoneyGram referral code. ` +
        `It belongs in documentation, never in shipped source.`
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

// ------------------------------------- the code is never persisted to the DB

test("no migration writes the referral code into the database", () => {
  // The activation footgun this closes: a code sitting in a column named
  // "Publisher / account ID" reads as an affiliate credential to the next
  // person who opens the admin form.
  const supabaseDir = path.join(ROOT, "supabase");

  for (const name of fs.readdirSync(supabaseDir)) {
    if (!name.endsWith(".sql")) continue;
    const sql = fs.readFileSync(path.join(supabaseDir, name), "utf8");

    assert.equal(
      sql.includes(CODE),
      false,
      `supabase/${name} persists the MoneyGram referral code. The code is a personal ` +
        `consumer credential and belongs in documentation only — see this file's header.`
    );
  }
});

test("no migration writes an account_identifier for MoneyGram", () => {
  const supabaseDir = path.join(ROOT, "supabase");

  for (const name of fs.readdirSync(supabaseDir)) {
    if (!name.endsWith(".sql")) continue;
    const sql = fs.readFileSync(path.join(supabaseDir, name), "utf8");
    if (!/moneygram/i.test(sql)) continue;

    // Comments legitimately discuss the column; only a real write is a failure.
    const NEWLINE = String.fromCharCode(10);
    const executable = sql
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
      /account_identifier\s*=/.test(executable),
      false,
      `supabase/${name} assigns account_identifier while touching MoneyGram`
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

// ------------------------------------------------------------ the written record

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

test("the registry records MoneyGram as having no affiliate program", () => {
  const registry = fs.readFileSync(path.join(ROOT, "docs/AFFILIATE-OFFER-REGISTRY.md"), "utf8");

  assert.ok(
    /No Affiliate Program Available/i.test(registry),
    "the registry must carry the investigated-and-negative section"
  );
  assert.ok(
    registry.includes(CODE),
    "the registry must record the operator's code so it is not lost or rediscovered blind"
  );
  assert.ok(
    /NOT an affiliate credential/i.test(registry),
    "the registry must say plainly what the code is not"
  );
});
