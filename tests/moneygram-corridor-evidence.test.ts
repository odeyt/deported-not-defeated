import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * MoneyGram corridor evidence — integrity of the citations.
 *
 * WHAT THIS PROTECTS
 *   supabase/affiliate_moneygram_corridor_evidence.sql promotes six MoneyGram
 *   availability rows from "destination only, unverified" to "US corridor,
 *   Tier 1 verified". That removes a visible "Confirm availability with
 *   provider" hedge from the card a reader sees, so the citations behind it
 *   have to be exactly the pages that were actually read — no more, no fewer.
 *
 *   The failure mode being guarded against is corridor backfill: adding
 *   Vietnam, Nigeria, or Ghana to the list because MoneyGram probably serves
 *   them too. Probably is not evidence.
 *
 * Source of record: docs/MONEYGRAM-AFFILIATE-RESEARCH.md, evidence ledger
 * sources [1]-[6], observed 2026-09-01.
 */

const ROOT = path.join(import.meta.dirname, "..");
const migration = fs.readFileSync(
  path.join(ROOT, "supabase/affiliate_moneygram_corridor_evidence.sql"),
  "utf8"
);

/** Strip `--` comments so assertions inspect real SQL, not the explanation. */
function stripSqlComments(sql: string): string {
  const NEWLINE = String.fromCharCode(10);
  return sql
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
}

const sql = stripSqlComments(migration);

const REVIEWED = [
  ["MX", "mexico"],
  ["GT", "guatemala"],
  ["SV", "el-salvador"],
  ["KH", "cambodia"],
  ["LA", "laos"],
  ["PH", "philippines"],
] as const;

test("each reviewed corridor is cited to MoneyGram's own corridor page", () => {
  for (const [code, slug] of REVIEWED) {
    const expected = `('${code}', 'https://www.moneygram.com/us/en/corridor/${slug}')`;
    assert.ok(sql.includes(expected), `missing Tier 1 citation for ${code}`);
  }
});

test("only the six reviewed corridors are cited — no backfill", () => {
  const cited = Array.from(sql.matchAll(/\('([A-Z]{2})',\s*'https:\/\/[^']+'\)/g)).map((m) => m[1]);

  assert.deepEqual(
    cited.slice().sort(),
    REVIEWED.map(([c]) => c).slice().sort(),
    "the cited country list must match the reviewed list exactly"
  );
});

test("the unreviewed corridors are never cited", () => {
  // MoneyGram has VN, NG, and GH availability rows that were not reviewed.
  for (const unreviewed of ["vietnam", "nigeria", "ghana"]) {
    assert.equal(
      sql.includes(`/corridor/${unreviewed}`),
      false,
      `${unreviewed} was not reviewed on 2026-09-01 and must not be cited`
    );
  }
  for (const code of ["'VN'", "'NG'", "'GH'"]) {
    assert.equal(
      new RegExp(`\\(${code},\\s*'https`).test(sql),
      false,
      `${code} must not appear in the citation list`
    );
  }
});

test("every citation is Tier 1 — the provider's own domain", () => {
  const urls = Array.from(sql.matchAll(/'(https:\/\/[^']+)'/g)).map((m) => m[1]);
  assert.ok(urls.length > 0, "expected citation URLs");

  for (const url of urls) {
    assert.equal(
      new URL(url).hostname,
      "www.moneygram.com",
      `${url} is not on MoneyGram's own domain, so it cannot be Tier 1`
    );
  }
  assert.ok(sql.includes("'TIER_1'"), "rows must be marked TIER_1");
});

test("verified_at records when the pages were read, not when this is applied", () => {
  // now() here would restart the freshness clock and overstate how current the
  // evidence is. lib/affiliate/freshness.ts ages from verified_at.
  assert.match(
    sql,
    /verified_at\s*=\s*coalesce\(pc\.verified_at,\s*timestamptz\s*'2026-09-01/,
    "verified_at must be the 2026-09-01 observation date, preserving any existing value"
  );
  assert.equal(
    /verified_at\s*=\s*now\(\)/.test(sql),
    false,
    "verified_at must not be set to now()"
  );
});

test("it is idempotent — a second run changes nothing", () => {
  assert.match(sql, /pc\.origin_country is null/);
  assert.match(sql, /pc\.evidence_url is null/);
});

test("it is scoped to MoneyGram alone", () => {
  assert.match(sql, /p\.slug\s*=\s*'moneygram'/);
  // No other provider slug may appear in a predicate.
  const slugs = Array.from(sql.matchAll(/slug\s*(?:=|in)\s*\(?\s*'([a-z0-9-]+)'/g)).map((m) => m[1]);
  assert.deepEqual(Array.from(new Set(slugs)), ["moneygram"]);
});

test("it never touches monetization", () => {
  for (const forbidden of [
    /affiliate_url/,
    /affiliate_status/,
    /\bactive\s*=/,
    /placement_type/,
    /account_identifier/,
  ]) {
    assert.equal(
      forbidden.test(sql),
      false,
      `corridor evidence must not write ${forbidden} — it is a content-accuracy change only`
    );
  }
});

test("it only writes the availability table", () => {
  const tables = Array.from(sql.matchAll(/update\s+([a-z_]+)/gi)).map((m) => m[1].toLowerCase());
  assert.deepEqual(Array.from(new Set(tables)), ["affiliate_provider_countries"]);
});

test("it documents its own rollback", () => {
  assert.match(migration, /ROLLBACK/i, "a user-visible data change must state how to undo it");
  assert.match(
    migration,
    /origin_country\s*=\s*null/i,
    "the rollback must show how to clear the corridor claim"
  );
});

test("the research record still backs every citation", () => {
  const research = fs.readFileSync(
    path.join(ROOT, "docs/MONEYGRAM-AFFILIATE-RESEARCH.md"),
    "utf8"
  );

  for (const [, slug] of REVIEWED) {
    assert.ok(
      research.includes(`https://www.moneygram.com/us/en/corridor/${slug}`),
      `docs/MONEYGRAM-AFFILIATE-RESEARCH.md must cite the ${slug} corridor this migration relies on`
    );
  }
});
