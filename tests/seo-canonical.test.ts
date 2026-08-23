import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * SEO canonical-host regression tests (M-AFFILIATE1, spec §14–§17).
 *
 * M-AFFILIATE0 found production canonicalising to `www` while `sitemap.xml`
 * and `robots.txt` advertised the apex, making every sitemap URL a 308 and
 * splitting ranking signals across two hosts.
 *
 * These are structural assertions over the source rather than HTTP checks, so
 * they fail in CI the moment someone reintroduces an apex URL — which is the
 * regression that actually matters and the one a live check would catch only
 * after deploy.
 */

const ROOT = path.join(import.meta.dirname, "..");
const CANONICAL_HOST = "https://www.deportednotdefeated.com";
const APEX = "https://deportednotdefeated.com";

function read(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

/**
 * Count bare-apex URLs.
 *
 * The canonical host string does NOT contain the apex string ("//www." breaks
 * the match), so a direct count is correct here. An earlier version subtracted
 * www matches from apex matches, which could go negative and silently hide a
 * real offender in any file that also contained a canonical URL.
 */
function bareApexCount(source: string): number {
  return source.split(APEX).length - 1;
}

test("root layout declares metadataBase on the canonical host", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /metadataBase:\s*new URL\(/);
  assert.ok(
    layout.includes(CANONICAL_HOST),
    "layout must reference the canonical www host"
  );
});

test("root layout sets a relative canonical so each route resolves to its own URL", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /alternates:\s*\{/);
  assert.match(
    layout,
    /canonical:\s*"\.\/"/,
    'canonical must be "./" — an absolute canonical here would point every page at the homepage'
  );
});

test("sitemap uses the canonical host and never the bare apex", () => {
  const sitemap = read("app/sitemap.ts");
  assert.ok(sitemap.includes(CANONICAL_HOST), "sitemap BASE must be the www host");
  assert.equal(
    bareApexCount(sitemap),
    0,
    "sitemap must not emit apex URLs — every one would be a 308 redirect"
  );
});

test("robots uses the canonical host for both sitemap and host directives", () => {
  const robots = read("app/robots.ts");
  assert.ok(robots.includes(CANONICAL_HOST));
  assert.equal(bareApexCount(robots), 0);
  assert.match(robots, /sitemap:/);
});

test("robots keeps redirects, admin, and API out of the index", () => {
  const robots = read("app/robots.ts");
  for (const blocked of ["/go/", "/admin/", "/api/"]) {
    assert.ok(robots.includes(blocked), `robots must disallow ${blocked}`);
  }
});

test("no source file emits a bare apex URL", () => {
  const offenders: string[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") {
        continue;
      }
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(entry.name)) continue;
      if (full.includes(`${path.sep}tests${path.sep}`)) continue;

      const source = fs.readFileSync(full, "utf8");
      if (bareApexCount(source) > 0) {
        offenders.push(path.relative(ROOT, full));
      }
    }
  };

  walk(path.join(ROOT, "app"));
  walk(path.join(ROOT, "components"));
  walk(path.join(ROOT, "lib"));

  assert.deepEqual(
    offenders,
    [],
    `these files emit apex URLs and would produce mixed-host output: ${offenders.join(", ")}`
  );
});
