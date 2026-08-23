import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Minimal module-resolution hook for the test runner.
 *
 * Node's ESM resolver needs fully-specified relative imports and knows
 * nothing about tsconfig path aliases, while the application source relies
 * on both because Next.js's bundler provides them. Rather than contort the
 * source to suit the tests, this hook fills the same two gaps:
 *
 *   1. "@/lib/affiliate/url"  ->  <project root>/lib/affiliate/url.ts
 *   2. "./url"                ->  ./url.ts  or  ./url/index.ts
 *
 * Rule 2 only fires after a normal resolution has already failed, so it can
 * never shadow a package that legitimately resolves.
 *
 * Node runs the TypeScript itself (native type stripping, Node 22.6+), so
 * the test suite needs no compiler, no bundler, and no new dependency.
 */

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

function isFile(candidate) {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const base = path.join(PROJECT_ROOT, specifier.slice(2));
    for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
      if (isFile(candidate)) return nextResolve(pathToFileURL(candidate).href, context);
    }
  }

  try {
    return nextResolve(specifier, context);
  } catch (error) {
    if (!specifier.startsWith(".") || /\.[cm]?[jt]sx?$/.test(specifier)) throw error;

    for (const candidate of [`${specifier}.ts`, `${specifier}/index.ts`]) {
      try {
        return nextResolve(candidate, context);
      } catch {
        // try the next candidate
      }
    }
    throw error;
  }
}
