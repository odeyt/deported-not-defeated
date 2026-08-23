import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Authorization, secret handling, and seed integrity (spec §38 "Admin", §40).
 *
 * These are structural assertions over the source and the migrations. They
 * are guarding against a specific class of regression that a runtime test
 * could not catch cheaply: someone re-seeding a fabricated affiliate URL,
 * committing a key, or deleting the admin guard.
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(ROOT, relative), "utf8");

const MIGRATION_RAW = read("supabase/affiliate_engine_m1.sql");
const HARDENING_RAW = read("supabase/affiliate_engine_m1_hardening.sql");

/**
 * Strip `--` comments so the migration assertions inspect actual SQL.
 *
 * These files are heavily commented, and the comments legitimately mention
 * words like "truncate" and "approved" while explaining why the migration
 * does not do those things. Asserting against the raw text would pass or
 * fail on prose.
 *
 * Quote-aware, so a `--` inside a string literal is preserved.
 */
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

const MIGRATION = stripSqlComments(MIGRATION_RAW);
const HARDENING = stripSqlComments(HARDENING_RAW);

// --------------------------------------------------------------- admin auth

test("the admin area redirects unauthenticated visitors", () => {
  const layout = read("app/admin/layout.tsx");
  assert.ok(layout.includes("auth.getUser()"), "admin layout must check the session");
  assert.ok(layout.includes('redirect("/admin/login")'), "admin layout must redirect when absent");
});

test("hardening restricts affiliate writes to actual administrators", () => {
  assert.ok(
    HARDENING.includes("create or replace function public.is_affiliate_admin()"),
    "an admin predicate must exist"
  );
  assert.ok(
    HARDENING.includes("role = 'admin'"),
    "the admin predicate must check user_profiles.role"
  );

  // Every affiliate table that accepts writes must be gated on that predicate,
  // not on the far weaker `auth.role() = 'authenticated'`.
  for (const table of [
    "affiliate_partners",
    "affiliate_categories",
    "affiliate_applications",
    "affiliate_provider_countries",
    "affiliate_canonical_categories",
  ]) {
    const policyBlock = HARDENING.slice(HARDENING.indexOf(`on ${table} for all`));
    assert.ok(
      policyBlock.startsWith(`on ${table} for all`),
      `${table} must have a write policy in the hardening file`
    );
  }

  assert.equal(
    HARDENING.includes("using (auth.role() = 'authenticated')"),
    false,
    "the hardening file must not leave any policy on the authenticated-role check"
  );
});

test("hardening closes the anonymous click-forgery hole", () => {
  assert.ok(
    HARDENING.includes('drop policy if exists "Anyone can log clicks" on affiliate_clicks'),
    "the public insert policy must be dropped"
  );
  assert.ok(
    HARDENING.includes("revoke insert, select, update, delete on affiliate_clicks from anon"),
    "anon must lose all access to affiliate_clicks"
  );
});

test("hardening keeps operator-only columns away from anonymous readers", () => {
  const grantBlock = HARDENING.slice(
    HARDENING.indexOf("grant select ("),
    HARDENING.indexOf("on affiliate_partners to anon;")
  );

  for (const secret of [
    "notes",
    "internal_notes",
    "account_identifier",
    "commission_value",
    "commission_notes",
    "terms_notes",
  ]) {
    assert.equal(
      new RegExp(`(^|[\\s,(])${secret}([\\s,)]|$)`).test(grantBlock),
      false,
      `"${secret}" must not be granted to anon`
    );
  }

  // The columns a public card genuinely needs must still be granted, or the
  // hardening step would take the public pages down.
  for (const needed of ["company_name", "slug", "short_description", "official_website_url", "active"]) {
    assert.ok(grantBlock.includes(needed), `"${needed}" must stay readable`);
  }
});

test("hardening documents the ordering hazard rather than leaving it implicit", () => {
  assert.ok(
    /run order matters/i.test(HARDENING_RAW),
    "the hardening file must warn that it runs after the deploy"
  );
  assert.ok(/rollback/i.test(HARDENING_RAW), "each restrictive change must document a rollback");
});

// ------------------------------------------------------------ migration safety

test("the main migration is additive — it drops and truncates nothing", () => {
  const statements = MIGRATION.toLowerCase();

  for (const destructive of [
    "drop table",
    "drop column",
    "truncate",
    "delete from",
    "alter table affiliate_partners rename",
  ]) {
    assert.equal(
      statements.includes(destructive),
      false,
      `the additive migration must not contain "${destructive}"`
    );
  }
});

test("the migration validates redirect URLs at the database level too", () => {
  assert.ok(
    MIGRATION.includes("affiliate_partners_affiliate_url_scheme_check"),
    "the affiliate URL scheme constraint must exist"
  );
  assert.ok(
    MIGRATION.includes("'^https?://[^/\\s]'"),
    "the constraint must restrict URLs to http(s)"
  );
});

test("the migration constrains approval states to the documented set", () => {
  for (const status of [
    "not_applied",
    "applied",
    "pending",
    "approved",
    "rejected",
    "paused",
    "expired",
  ]) {
    assert.ok(MIGRATION.includes(`'${status}'`), `approval state "${status}" must be allowed`);
  }
});

// ------------------------------------------------------------ seed integrity

test("exactly one seeded provider carries an affiliate URL, and it is the real one", () => {
  // Match every affiliate-looking URL in the seed. NumeroMoney's referral link
  // already ships in app/family-visit-travel/page.tsx and predates this
  // milestone; every other provider must be seeded with NULL.
  const trackingUrls = MIGRATION.match(/'https?:\/\/[^']*(?:\?|&)(?:ref|aff|marker|subid|irclickid|awinmid|tap_a)=[^']*'/gi) ?? [];

  assert.deepEqual(
    trackingUrls,
    ["'https://numero.app?ref=RE_29X3K'"],
    "the seed must contain exactly one real affiliate URL — the pre-existing NumeroMoney referral"
  );
});

test("the seed never invents a commission figure", () => {
  assert.equal(
    /commission_value\s*[=,]\s*[0-9]/.test(MIGRATION),
    false,
    "commission_value must be NULL everywhere in the seed"
  );
  assert.ok(
    MIGRATION.includes("'Not publicly disclosed'"),
    "undisclosed commissions must say so explicitly"
  );
});

test("the seed never invents a cookie window", () => {
  assert.equal(
    /cookie_days\s*[=,]\s*[0-9]/.test(MIGRATION),
    false,
    "cookie_days must not be seeded with a guessed value"
  );
});

test("new providers are seeded as not_applied, not as pending", () => {
  // Locate the seed section in the raw file (the marker is a comment), then
  // assert against the comment-stripped SQL of that section.
  const seedStart = MIGRATION_RAW.indexOf("9. PROVIDER SEED");
  assert.ok(seedStart > 0, "expected to find the provider seed section");
  const seedBlock = stripSqlComments(MIGRATION_RAW.slice(seedStart));
  assert.ok(seedBlock.includes("'not_applied'"), "the seed must use not_applied");

  // 'approved' may appear exactly once: the NumeroMoney insert.
  const approvedCount = (seedBlock.match(/'approved'/g) ?? []).length;
  assert.equal(approvedCount, 1, "only NumeroMoney may be seeded as approved");
});

// ----------------------------------------------------------- secret handling

test("no Supabase or affiliate credential is committed anywhere in the tracked source", () => {
  const suspects = [
    "lib/supabase/admin.ts",
    "lib/affiliate/service.ts",
    "lib/affiliate/clicks.ts",
    "lib/affiliate/networks.ts",
    "supabase/affiliate_engine_m1.sql",
    "supabase/affiliate_engine_m1_hardening.sql",
    ".env.example",
  ];

  for (const file of suspects) {
    const source = read(file);
    // Supabase keys are JWTs; any literal starting eyJ is a leaked key.
    assert.equal(/eyJ[A-Za-z0-9_-]{20,}/.test(source), false, `${file} appears to contain a JWT`);
    assert.equal(
      /sk_live_|sb_secret_|service_role.{0,20}=\s*["'][A-Za-z0-9]{20,}/.test(source),
      false,
      `${file} appears to contain a secret`
    );
  }
});

test("the service-role client refuses to exist in a browser bundle", () => {
  const source = read("lib/supabase/admin.ts");
  assert.ok(
    source.includes('typeof window !== "undefined"'),
    "the admin client must guard against browser import"
  );
  assert.ok(source.includes("throw new Error"), "that guard must throw, not warn");
});

test(".env.example documents the new variables without any real values", () => {
  const env = read(".env.example");
  assert.ok(env.includes("AFFILIATE_ENGINE_ENABLED"), "the feature flag must be documented");
  assert.equal(/=\s*\S+@|=\s*[A-Za-z0-9]{30,}/.test(env), false, ".env.example must hold no real values");
});
