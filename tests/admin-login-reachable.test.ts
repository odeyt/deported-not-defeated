import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * The admin login page must stay outside the authenticated layout.
 *
 * `app/admin/layout.tsx` redirects any unauthenticated request to
 * /admin/login. If the login page itself lives under that layout, signing out
 * makes the site unreachable for admins: the layout runs, sees no user, and
 * redirects to the page it is already rendering. Production returned
 * `307 Location: /admin/login` in a loop until the browser gave up.
 *
 * The login page therefore lives in the `(auth)` route group, which keeps the
 * /admin/login URL but does not inherit app/admin/layout.tsx.
 */

const ROOT = path.join(import.meta.dirname, "..");
const GATED_LAYOUT = path.join(ROOT, "app/admin/layout.tsx");
const LOGIN_IN_GROUP = path.join(ROOT, "app/(auth)/admin/login/page.tsx");
const LOGIN_UNDER_GATE = path.join(ROOT, "app/admin/login/page.tsx");

test("the admin layout still gates unauthenticated users", () => {
  const layout = fs.readFileSync(GATED_LAYOUT, "utf8");
  assert.match(layout, /redirect\(["']\/admin\/login["']\)/, "the gate must still exist");
  assert.match(layout, /auth\.getUser\(\)/);
});

test("the login page is NOT under the gated layout", () => {
  assert.ok(
    !fs.existsSync(LOGIN_UNDER_GATE),
    "app/admin/login/page.tsx inherits app/admin/layout.tsx and creates a redirect loop — keep it in the (auth) route group"
  );
});

test("the login page exists in the (auth) route group, preserving its URL", () => {
  assert.ok(
    fs.existsSync(LOGIN_IN_GROUP),
    "app/(auth)/admin/login/page.tsx must exist — route groups do not change the URL, so this still serves /admin/login"
  );
});

test("no layout in the (auth) group re-applies an auth gate", () => {
  const authGroup = path.join(ROOT, "app/(auth)");
  const stack: string[] = [authGroup];

  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (entry.name !== "layout.tsx") continue;

      const source = fs.readFileSync(full, "utf8");
      assert.ok(
        !/redirect\(["']\/admin\/login["']\)/.test(source),
        `${path.relative(ROOT, full)} redirects to the login page it wraps — that is the loop again`
      );
    }
  }
});
