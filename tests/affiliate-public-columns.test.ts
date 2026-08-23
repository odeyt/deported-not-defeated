import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  PUBLIC_PARTNER_COLUMNS,
  PUBLIC_PARTNER_COLUMNS_WITH_CATEGORY,
} from "../lib/affiliate/publicColumns.ts";

/**
 * Public column-exposure tests (M-AFFILIATE1, spec §6, §7, §22).
 *
 * The security invariant is enforced at the database boundary by
 * affiliate_engine_m1_hardening.sql. These tests guard the *application* half
 * of the same contract: the public pages must ask only for columns that
 * hardening actually grants to `anon`, or those pages break the moment it runs.
 *
 * They also stop a future edit from quietly reintroducing `select("*")`, which
 * is how operator notes would reach the browser again.
 */

const ROOT = path.join(import.meta.dirname, "..");

/** Columns hardening deliberately withholds from anonymous readers. */
const OPERATOR_ONLY = [
  "notes",
  "internal_notes",
  "account_identifier",
  "commission_value",
  "commission_notes",
  "terms_notes",
  "application_date",
  "approval_date",
];

/** Public pages that read affiliate_partners with the anon key. */
const PUBLIC_PAGES = [
  "app/resources/page.tsx",
  "app/resources/health-insurance/page.tsx",
  "app/resources/phone-internet/page.tsx",
  "app/resources/vpn-privacy/page.tsx",
  "app/resources/[slug]/page.tsx",
];

const columns = PUBLIC_PARTNER_COLUMNS.split(",").map((c) => c.trim());

test("the public column list excludes every operator-only field", () => {
  for (const forbidden of OPERATOR_ONLY) {
    assert.ok(
      !columns.includes(forbidden),
      `"${forbidden}" is operator data and must never be requested by a public page`
    );
  }
});

test("the public column list contains what the resource pages actually render", () => {
  for (const required of [
    "id",
    "slug",
    "company_name",
    "affiliate_status",
    "official_website_url",
    "cta_label",
    "active",
  ]) {
    assert.ok(columns.includes(required), `public pages need "${required}"`);
  }
});

test("every public column predates the migration, so the list works before and after it", () => {
  // Columns present in the original schema (supabase/affiliate_system.sql).
  // Requesting a post-migration column before the migration runs is exactly
  // the failure that took the affiliate redirects down on 2026-08-23.
  const original = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_system.sql"),
    "utf8"
  );
  const createBlock = original.slice(
    original.indexOf("create table if not exists affiliate_partners"),
    original.indexOf("-- AFFILIATE CLICKS")
  );

  for (const column of columns) {
    assert.ok(
      createBlock.includes(column),
      `"${column}" is not in the original affiliate_partners table, so the query would fail before the migration runs`
    );
  }
});

test("every public column is one hardening grants to anon", () => {
  const hardening = fs.readFileSync(
    path.join(ROOT, "supabase/affiliate_engine_m1_hardening.sql"),
    "utf8"
  );
  const grantBlock = hardening.slice(
    hardening.indexOf("grant select ("),
    hardening.indexOf(") on affiliate_partners to anon;")
  );

  for (const column of columns) {
    assert.ok(
      grantBlock.includes(column),
      `"${column}" is not granted to anon by the hardening file — this page would 403 after hardening`
    );
  }
});

test("no public page uses select(*) against affiliate_partners", () => {
  for (const page of PUBLIC_PAGES) {
    const source = fs.readFileSync(path.join(ROOT, page), "utf8");
    if (!source.includes('from("affiliate_partners")')) continue;

    assert.ok(
      !source.includes('.select("*'),
      `${page} uses select("*") — it will lose access to ungranted columns once hardening runs`
    );
    assert.ok(
      source.includes("PUBLIC_PARTNER_COLUMNS"),
      `${page} must use the shared public column list`
    );
  }
});

test("the joined variant keeps the category relation the pages render", () => {
  assert.ok(PUBLIC_PARTNER_COLUMNS_WITH_CATEGORY.startsWith(PUBLIC_PARTNER_COLUMNS));
  assert.ok(PUBLIC_PARTNER_COLUMNS_WITH_CATEGORY.includes("affiliate_categories("));
});
