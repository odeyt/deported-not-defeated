import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * No dead commercial CTAs (M-GROWTH1 §5).
 *
 * The site shipped 49 buttons pointing at `#affiliate-placeholder` across nine
 * files — "Compare Flights", "Browse Udemy Courses", "Get TEFL Certified".
 * They looked clickable and did nothing. Every one is now either a real
 * `/go/<slug>` route, a `/go/category/<category>` router that activates
 * automatically when a provider in that category is approved, or an internal
 * resource page.
 *
 * A placeholder link is worse than no link: it spends the reader's trust and
 * returns nothing.
 */

const ROOT = path.join(import.meta.dirname, "..");
const SCAN_DIRS = ["app", "components"];

function walk(dir: string): string[] {
  const out: string[] = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop()!;
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

const files = SCAN_DIRS.flatMap((d) => walk(path.join(ROOT, d)));

test("no source file contains an affiliate placeholder", () => {
  const offenders = files.filter((f) =>
    fs.readFileSync(f, "utf8").includes("affiliate-placeholder")
  );

  assert.deepEqual(
    offenders.map((f) => path.relative(ROOT, f)),
    [],
    "placeholder CTAs are dead links — route them through /go/ or an internal page"
  );
});

test("no anchor href is a bare fragment", () => {
  const offenders: string[] = [];

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    // `href="#"` and `href: "#"` — a button that goes nowhere.
    if (/href\s*[=:]\s*["']#["']/.test(source)) {
      offenders.push(path.relative(ROOT, file));
    }
  }

  assert.deepEqual(offenders, [], "a bare # href is a dead CTA");
});

test("no commercial CTA uses a javascript: destination", () => {
  const offenders: string[] = [];

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    if (/href\s*[=:]\s*["']javascript:/i.test(source)) {
      offenders.push(path.relative(ROOT, file));
    }
  }

  assert.deepEqual(offenders, []);
});

test("no hardcoded affiliate tracking URL sits in a component", () => {
  // Tracking links belong in the database so they can be changed without a
  // deploy. A referral parameter in JSX is the pattern that made NumeroMoney
  // untracked and unchangeable for months.
  const patterns = [
    /tp\.media\/click/i,
    /shmarker=/i,
    /[?&]ref=[A-Za-z0-9_]{5,}/,
    /impact\.com\/c\/\d/i,
  ];

  const offenders: string[] = [];
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const code = source
      .split("\n")
      .filter((line) => !line.trim().startsWith("*") && !line.trim().startsWith("//"))
      .join("\n");
    if (patterns.some((p) => p.test(code))) {
      offenders.push(path.relative(ROOT, file));
    }
  }

  assert.deepEqual(
    offenders,
    [],
    "affiliate tracking URLs must live in affiliate_partners.affiliate_url, not in source"
  );
});
