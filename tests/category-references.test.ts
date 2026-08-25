import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { AFFILIATE_CATEGORIES } from "../lib/affiliate/categories.ts";

/**
 * Category references must point at categories that actually hold providers.
 *
 * A page requested `category="ESIM"` while every eSIM provider was filed under
 * `PHONE_INTERNET`. The query returned nothing, the block silently rendered
 * nothing, and it stayed that way from M-AFFILIATE2 until production testing
 * caught it. Status-code smoke tests could not see it, because the page
 * returned 200 the whole time — it was just missing a section.
 *
 * These are static checks. They cannot know the live provider counts, but they
 * catch the two failure modes that are checkable without a database: a typo'd
 * category, and a category the seed never populates.
 */

const ROOT = path.join(import.meta.dirname, "..");
const SEED = path.join(ROOT, "supabase/affiliate_engine_m1.sql");

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  const stack = [path.join(ROOT, dir)];
  while (stack.length) {
    const current = stack.pop()!;
    if (!fs.existsSync(current)) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        stack.push(full);
      } else if (/\.tsx?$/.test(entry.name)) {
        out.push(full);
      }
    }
  }
  return out;
}

const files = [...sourceFiles("app"), ...sourceFiles("components")];

/**
 * Categories referenced by a page or component, e.g. category="HOTELS".
 *
 * Built as a plain object walked with exec() rather than a Map walked with
 * matchAll(): tsconfig sets no explicit target, so this compiles as ES5, where
 * iterating a Map or a match iterator needs --downlevelIteration. Keeping the
 * test ES5-safe is cheaper than widening the compiler config for one file.
 */
function referencedCategories(): Record<string, string[]> {
  const found: Record<string, string[]> = {};
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const pattern = /category[=:]\s*["']([A-Z_]{3,})["']/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source)) !== null) {
      const code = match[1];
      (found[code] ??= []).push(path.relative(ROOT, file));
    }
  }
  return found;
}

test("every referenced category is a real canonical code", () => {
  const valid = new Set<string>(AFFILIATE_CATEGORIES as readonly string[]);

  for (const [code, where] of Object.entries(referencedCategories())) {
    assert.ok(valid.has(code), `unknown category "${code}" referenced in ${where.join(", ")}`);
  }
});

test("every referenced category is populated by the provider seed", () => {
  // The seed is the best static proxy for "does anything live in this
  // category". A category no provider occupies renders an empty block.
  const seed = fs.readFileSync(SEED, "utf8");
  const offenders: string[] = [];

  for (const [code, where] of Object.entries(referencedCategories())) {
    if (!seed.includes(`'${code}'`)) {
      offenders.push(`${code} (referenced in ${where.join(", ")})`);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    "these categories have no seeded providers, so the block renders nothing"
  );
});

test("no page requests the ESIM category, which holds no providers", () => {
  // Kept as an explicit regression: eSIM providers are filed under
  // PHONE_INTERNET. If they are ever recategorized, delete this test and
  // update the pages together — not one without the other.
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    assert.ok(
      !/category[=:]\s*["']ESIM["']/.test(source),
      `${path.relative(ROOT, file)} requests ESIM; providers live in PHONE_INTERNET`
    );
    assert.ok(
      !source.includes("/go/category/esim"),
      `${path.relative(ROOT, file)} links to an empty category router`
    );
  }
});
