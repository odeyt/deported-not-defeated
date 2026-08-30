import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { KNOWLEDGE_CATEGORIES } from "../lib/knowledgeCenter/categories.ts";
import { SELF_DEPORTING_DISCLAIMER } from "../lib/knowledgeCenter/selfDeportingDisclaimer.ts";

/**
 * Structural regression checks for the Knowledge Center, following the style
 * of tests/category-references.test.ts and tests/seo-canonical.test.ts:
 * reading source/SQL text and asserting on it, rather than a full
 * integration render.
 */

const ROOT = path.join(import.meta.dirname, "..");
const SEED = path.join(ROOT, "supabase/knowledge_center_m1_seed.sql");

function read(file: string): string {
  return fs.readFileSync(file, "utf8");
}

test("exactly the 13 spec'd Knowledge Center categories exist, no more, no fewer", () => {
  const expected = [
    "legal",
    "self-deporting",
    "money",
    "jobs",
    "housing",
    "family",
    "travel",
    "healthcare",
    "mental-health",
    "technology",
    "starting-over",
    "success-stories",
    "news",
  ];
  assert.deepEqual([...KNOWLEDGE_CATEGORIES].sort(), [...expected].sort());
});

test("the three Knowledge Center route files exist", () => {
  for (const route of [
    "app/knowledge-center/page.tsx",
    "app/knowledge-center/[category]/page.tsx",
    "app/knowledge-center/[category]/[slug]/page.tsx",
  ]) {
    assert.ok(fs.existsSync(path.join(ROOT, route)), `missing route file: ${route}`);
  }
});

test("the self-deporting disclaimer matches the spec's exact wording", () => {
  assert.equal(
    SELF_DEPORTING_DISCLAIMER,
    "This information is educational only and is not legal advice. Immigration outcomes depend on individual circumstances. Speak with a licensed immigration attorney before making decisions.",
  );
});

test("the category page renders the disclaimer unconditionally for self-deporting", () => {
  const source = read(path.join(ROOT, "app/knowledge-center/[category]/page.tsx"));
  assert.match(
    source,
    /category === "self-deporting" && <SelfDeportingDisclaimer \/>/,
    "the category index page must render <SelfDeportingDisclaimer /> whenever the category is self-deporting",
  );
});

test("the article layout renders the disclaimer unconditionally for self-deporting", () => {
  const source = read(path.join(ROOT, "components/knowledgeCenter/ArticleLayout.tsx"));
  assert.match(
    source,
    /article\.category === "self-deporting"/,
    "ArticleLayout must gate the disclaimer on article.category, not on a per-row flag that content could omit",
  );
  assert.match(source, /<SelfDeportingDisclaimer \/>/);
});

test("the seed file has exactly 6 self-deporting rows and at least 1 row per remaining category, all published", () => {
  const seed = read(SEED);
  const inserts = seed.match(/insert into articles[\s\S]*?on conflict \(slug\) do nothing;/g) ?? [];
  assert.ok(inserts.length >= 18, `expected at least 18 seed inserts, found ${inserts.length}`);

  const counts: Record<string, number> = {};
  const slugs = new Set<string>();

  for (const block of inserts) {
    const slugMatch = block.match(/\n\s*'([a-z0-9-]+)',\s*\n\s*'([a-z-]+)',/);
    assert.ok(slugMatch, `could not find slug in insert block:\n${block.slice(0, 200)}`);
    const slug = slugMatch![1];
    const category = slugMatch![2];

    assert.ok(!slugs.has(slug), `duplicate slug in seed: ${slug}`);
    slugs.add(slug);

    assert.ok(
      (KNOWLEDGE_CATEGORIES as readonly string[]).includes(category),
      `seed row "${slug}" uses unknown category "${category}"`,
    );
    counts[category] = (counts[category] ?? 0) + 1;

    assert.match(
      block,
      /\bpublished,\s*(?:featured,\s*)?\n\s*reading_time_minutes/,
      `insert block for "${slug}" does not declare a published column before reading_time_minutes`,
    );
    assert.match(
      block,
      /\btrue,\s*(?:(?:true|false),\s*)?\d+,\s*current_date/,
      `insert block for "${slug}" does not set published = true`,
    );
  }

  assert.equal(counts["self-deporting"], 6, "expected exactly 6 self-deporting seed articles");

  for (const category of KNOWLEDGE_CATEGORIES) {
    if (category === "self-deporting") continue;
    assert.ok((counts[category] ?? 0) >= 1, `category "${category}" has no seeded article`);
  }
});

test("every category= literal under app/knowledge-center and app/admin/articles is a valid Knowledge Center slug", () => {
  const valid = new Set<string>(KNOWLEDGE_CATEGORIES as readonly string[]);
  const dirs = ["app/knowledge-center", "app/admin/articles"];

  for (const dir of dirs) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) continue;
    const stack = [full];
    while (stack.length) {
      const current = stack.pop()!;
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const entryPath = path.join(current, entry.name);
        if (entry.isDirectory()) {
          stack.push(entryPath);
        } else if (/\.tsx?$/.test(entry.name)) {
          const source = read(entryPath);
          const pattern = /category\s*===\s*["']([a-z-]+)["']/g;
          let match: RegExpExecArray | null;
          while ((match = pattern.exec(source)) !== null) {
            assert.ok(
              valid.has(match[1]),
              `${path.relative(ROOT, entryPath)} references unknown category "${match[1]}"`,
            );
          }
        }
      }
    }
  }
});
