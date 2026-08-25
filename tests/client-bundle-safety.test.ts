import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * No client module may reach a server-only module (M-GROWTH1A.4 follow-up).
 *
 * WHAT HAPPENED
 *   `impressionQueue.ts` imported MAX_BATCH — a runtime VALUE — from
 *   `impressions.ts`, which imports the service-role Supabase client. Importing
 *   a value pulls the whole module graph, so `lib/supabase/admin.ts` landed in
 *   the client bundle. Its browser guard threw on hydration and the calculator
 *   died with "Application error: a client-side exception has occurred".
 *
 *   The guard behaved correctly: it refused to ship a service-role key. The
 *   defect was mine for reaching across the boundary for a constant.
 *
 * WHY NOTHING CAUGHT IT
 *   `node --test` runs in Node, where the browser guard never fires, and
 *   `next build` compiles the bundle without executing it. Both were green
 *   while the page was broken in production.
 *
 * A type-only import is safe — it is erased at compile time. Only value
 * imports create the runtime edge, so that is what this walks.
 */

const ROOT = path.join(import.meta.dirname, "..");

/** Modules that must never appear in a browser bundle. */
const SERVER_ONLY = ["lib/supabase/admin.ts", "lib/affiliate/impressions.ts"];

function read(file: string): string | null {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

function resolveImport(fromFile: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = path.join(ROOT, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null; // package import

  for (const candidate of [
    base,
    base + ".ts",
    base + ".tsx",
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** Value imports only. `import type { X }` is erased and cannot pull code. */
function valueImports(source: string): string[] {
  const specs: string[] = [];
  const pattern = /import\s+(type\s+)?([^;]*?)\s*from\s*["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const isTypeOnly = Boolean(match[1]);
    if (isTypeOnly) continue;
    // `import { type A, type B } from "x"` is also fully erased.
    const clause = match[2].trim();
    const named = clause.startsWith("{") && clause.endsWith("}");
    if (named) {
      const inner = clause.slice(1, -1).trim();
      const parts = inner
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length > 0 && parts.every((p) => p.startsWith("type "))) continue;
    }
    specs.push(match[3]);
  }
  return specs;
}

function clientEntryPoints(): string[] {
  const out: string[] = [];
  const stack = [path.join(ROOT, "app"), path.join(ROOT, "components")];
  while (stack.length) {
    const current = stack.pop()!;
    if (!fs.existsSync(current)) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        stack.push(full);
      } else if (/\.tsx?$/.test(entry.name)) {
        const source = read(full);
        if (source && /^\s*["']use client["']/m.test(source)) out.push(full);
      }
    }
  }
  return out;
}

/** Walks value imports from a client entry point, returning the first breach. */
function findServerReach(entry: string): string[] | null {
  const seen = new Set<string>();
  const stack: Array<{ file: string; trail: string[] }> = [
    { file: entry, trail: [path.relative(ROOT, entry)] },
  ];

  while (stack.length) {
    const { file, trail } = stack.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);

    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    if (trail.length > 1 && SERVER_ONLY.includes(rel)) return trail;

    const source = read(file);
    if (!source) continue;

    for (const spec of valueImports(source)) {
      const resolved = resolveImport(file, spec);
      if (!resolved) continue;
      const resolvedRel = path.relative(ROOT, resolved).split(path.sep).join("/");
      stack.push({ file: resolved, trail: [...trail, resolvedRel] });
    }
  }
  return null;
}

test("the server-only guard exists and throws rather than shipping a key", () => {
  const admin = read(path.join(ROOT, "lib/supabase/admin.ts"));
  assert.ok(admin, "lib/supabase/admin.ts must exist");
  assert.match(admin!, /server-only/i, "the browser guard is the last line of defence");
});

test("no client component reaches a server-only module through value imports", () => {
  const breaches: string[] = [];

  for (const entry of clientEntryPoints()) {
    const trail = findServerReach(entry);
    if (trail) breaches.push(trail.join("  ->  "));
  }

  assert.deepEqual(
    breaches,
    [],
    "these import chains put server-only code in the client bundle, which throws on hydration"
  );
});

test("the impression queue does not import the server impression module", () => {
  const queue = read(path.join(ROOT, "lib/affiliate/impressionQueue.ts"));
  assert.ok(queue);
  assert.ok(
    !/from\s+["']\.\/impressions["']/.test(queue!.replace(/import\s+type[^;]+;/g, "")),
    "importing a value from impressions.ts drags the service-role client into the browser"
  );
  assert.match(queue!, /from\s+["']\.\/impressionShared["']/);
});

test("the shared impression module imports nothing server-side", () => {
  const shared = read(path.join(ROOT, "lib/affiliate/impressionShared.ts"));
  assert.ok(shared);
  assert.deepEqual(
    valueImports(shared!),
    [],
    "impressionShared is the client/server boundary and must stay dependency-free"
  );
});
