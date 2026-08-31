import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Structural assertions for M-AFFILIATE-VERIFY1 — same convention as
 * tests/affiliate-security.test.ts: reading source and migrations rather
 * than making a live request, since no test in this repo makes a live
 * HTTP request against an admin route.
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(ROOT, relative), "utf8");

/** Same quote-aware `--` stripper as affiliate-security.test.ts, so migration assertions inspect real SQL, not prose. */
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

// --------------------------------------------------------------- migration

test("the evidence migration is additive — it drops and truncates nothing", () => {
  const raw = read("supabase/affiliate_verification_evidence.sql");
  const sql = stripSqlComments(raw).toLowerCase();

  for (const destructive of [
    "drop table",
    "drop column",
    "truncate",
    "delete from",
    "alter table affiliate_partners rename",
    "alter table affiliate_provider_countries rename",
  ]) {
    assert.equal(sql.includes(destructive), false, `must not contain "${destructive}"`);
  }
});

test("the evidence migration only ever backfills the two rows that already had a real citation", () => {
  const raw = read("supabase/affiliate_verification_evidence.sql");
  assert.match(raw, /p\.slug = 'wise'/);
  assert.match(raw, /p\.slug = 'remitly'/);
  // No bare "update affiliate_provider_countries" without a slug filter —
  // guards against a future edit turning this into a blanket backfill.
  const updates = raw.match(/update affiliate_provider_countries[\s\S]*?;/g) ?? [];
  assert.ok(updates.length > 0, "expected at least one scoped update statement");
  for (const stmt of updates) {
    assert.match(stmt, /p\.slug (=|in)/, "every backfill update must be scoped to specific provider slugs");
  }
});

test("the evidence columns are additive and reuse the existing evidence-tier vocabulary", () => {
  const raw = read("supabase/affiliate_verification_evidence.sql");
  assert.match(raw, /add column if not exists evidence_url/);
  assert.match(raw, /add column if not exists evidence_tier/);
  assert.match(raw, /'TIER_1', 'TIER_2', 'TIER_3'/);
});

// --------------------------------------------------------------- lib composition

test("gap detection composes corridor.ts and freshness.ts rather than reimplementing them", () => {
  const source = read("lib/affiliate/verificationGaps.ts");
  assert.match(source, /from ["']\.\/corridor["']/);
  assert.match(source, /from ["']\.\/freshness["']/);
  assert.match(source, /resolveCorridor\(/);
  assert.match(source, /evaluateFreshness\(/);
  // No local date-diff reimplementation of freshness's own window logic.
  assert.equal(source.includes("FRESHNESS_WINDOW_DAYS"), false);
});

test("gap detection reuses isMonetizable rather than reimplementing its three conditions", () => {
  const source = read("lib/affiliate/verificationGaps.ts");
  assert.match(source, /from ["']\.\/selection["']/);
  assert.match(source, /isMonetizable\(/);
});

// --------------------------------------------------------------- admin surfaces

test("the verification page calls the shared query/gap modules rather than querying ad hoc", () => {
  const source = read("app/admin/affiliates/verification/page.tsx");
  assert.match(source, /buildVerificationRows\(/);
  assert.match(source, /filterVerificationRows\(/);
  assert.match(source, /summarizeVerificationRows\(/);
  assert.match(source, /export const dynamic = "force-dynamic"/);
});

test("ProviderCountriesEditor exposes origin_country and evidence fields", () => {
  const source = read("app/admin/affiliates/[id]/edit/ProviderCountriesEditor.tsx");
  assert.match(source, /origin_country/);
  assert.match(source, /evidence_url/);
  assert.match(source, /evidence_tier/);
});

test("public-facing ranking never depends on the new admin-only verification module", () => {
  // This milestone is a one-way consumer of selection.ts/corridor.ts/
  // freshness.ts (it imports isMonetizable/resolveCorridor/evaluateFreshness),
  // never the reverse — ranking and the /go redirect must stay unaware this
  // admin dashboard exists.
  for (const file of ["lib/affiliate/selection.ts", "app/go/[slug]/route.ts"]) {
    const source = read(file);
    assert.equal(source.includes("verificationGaps"), false, `${file} must not depend on the new admin-only module`);
    assert.equal(source.includes("verificationQuery"), false, `${file} must not depend on the new admin-only module`);
  }
});

// --------------------------------------------------------------- CSV export authorization

test("the CSV export route checks auth.getUser() and an explicit admin role, and never imports the service-role client", () => {
  const source = read("app/api/admin/affiliate-verification/export/route.ts");
  assert.match(source, /auth\.getUser\(\)/);
  assert.match(source, /user_profiles/);
  assert.match(source, /role.*!==.*"admin"|profile\?\.role !== "admin"/);
  assert.equal(
    /^\s*import[^;]*from\s*["']@\/lib\/supabase\/admin["']/m.test(source),
    false,
    "the export route must import the RLS-respecting server client, not the service-role client",
  );
  assert.match(source, /from ["']@\/lib\/supabase\/server["']/);
  assert.match(source, /export const dynamic = "force-dynamic"/);
});

test("the CSV export route returns real CSV content type and attachment headers, matching the checklist PDF precedent's shape", () => {
  const source = read("app/api/admin/affiliate-verification/export/route.ts");
  assert.match(source, /text\/csv/);
  assert.match(source, /Content-Disposition/);
  assert.match(source, /attachment; filename/);
});

// --------------------------------------------------------------- nav

test("the admin nav links to the new verification page", () => {
  const source = read("app/admin/layout.tsx");
  assert.match(source, /\/admin\/affiliates\/verification/);
});
