# M-AFFILIATE1 — Production Activation & Security Hardening

**Date:** 2026-08-24
**Branch:** `feature/m-affiliate1`
**Starting SHA:** `50cc2c3`
**Production database modified:** **NO**
**Production application modified:** NO (branch not merged)

---

## Outcome

**The affiliate migration was not applied.** It cannot be applied from this environment —
there is no `psql`, no Supabase CLI, no database password, and no Management API token. The
service-role key present in `.env.local` authenticates against PostgREST, which executes queries
against tables; it cannot execute DDL. Applying the migration requires a human in the Supabase SQL
editor.

Rather than stop there, this milestone did everything that does not require that access — and
found three things that would have caused real damage if the migration had simply been run.

### What this milestone found

| # | Finding | Consequence if unaddressed |
| --- | --- | --- |
| **F1** | Five public pages query `affiliate_partners` with `select("*")` | The hardening file revokes blanket SELECT from `anon`. `/resources` and its four category pages would have started returning permission errors the moment it ran. |
| **F2** | `user_profiles` exists in production but is **empty** — zero admins | Hardening block H3 restricts every affiliate write to `role = 'admin'`. With no admin row, the operator would have been locked out of the affiliate admin with no route back through the UI. |
| **F3** | Click tracking has been **silently off** since #6 deployed | `recordClick()` requires the service-role client. `SUPABASE_SERVICE_ROLE_KEY` is not set in Vercel, so every click since that deploy has gone unrecorded. Redirects work; analytics do not. |

F1 and F2 are fixed. F3 requires an operator action.

---

## Before state (verified, not assumed)

Queried production directly with the anonymous key on 2026-08-24.

### Migration status

| Object | Present? |
| --- | --- |
| `affiliate_canonical_categories` | NO (`PGRST205`) |
| `affiliate_provider_countries` | NO (`PGRST205`) |
| `affiliate_conversions` | NO (`PGRST205`) |
| `affiliate_providers` (view) | NO (`PGRST205`) |
| `affiliate_partners` | yes (pre-existing) |
| `affiliate_clicks` | yes (pre-existing) |
| `user_profiles` | yes, **empty** |

`affiliate_engine_m1.sql`: **not applied.** `affiliate_engine_m1_hardening.sql`: **not applied.**
Neither partially applied — all four objects are absent, so no half-migrated state exists.

### Anonymous data exposure

| Column | Readable by `anon` | Note |
| --- | --- | --- |
| `notes` | **YES** | operator field, exposed today |
| `internal_notes` | no | only because the column does not exist yet |
| `account_identifier` | no | only because the column does not exist yet |
| `affiliate_url` | YES | intentional — the `/go` router reads it |
| `affiliate_status` | YES | intentional |

This is the precise shape of the M-AFFILIATE0 finding. The two sensitive columns are unreadable
**only because the migration has not created them.** Applying M1 alone would make both publicly
readable.

### Anonymous write

A `POST` to `affiliate_clicks` with the anon key returned **HTTP 201** — click forgery is possible
today. The probe row (`partner_slug = 'm-affiliate1-probe'`) was deleted immediately afterwards and
its absence confirmed. No other production data was written at any point in this milestone.

---

## Changes made (code only, not yet deployed)

### 1. Public column exposure — F1

`lib/affiliate/publicColumns.ts` defines one shared list, and the five public pages now use it
instead of `select("*")`:

```
app/resources/page.tsx                    (2 queries)
app/resources/health-insurance/page.tsx
app/resources/phone-internet/page.tsx
app/resources/vpn-privacy/page.tsx
app/resources/[slug]/page.tsx
```

The list is the **intersection** of two sets: columns that exist *before* the migration, and
columns the hardening file grants to `anon`. That intersection is what makes these queries valid at
every point in the sequence — before M1, after M1, and after hardening — so the deploy and the
migration no longer have to be ordered relative to one another.

Excluded deliberately: `notes`, `internal_notes`, `account_identifier`, `commission_value`,
`commission_notes`, `terms_notes`, `application_date`, `approval_date`, `placeholder_url`. No
public component renders any of them.

### 2. Canonical host — SEO P0

Production canonicalises to `www` (the apex returns 308). Every generated URL now matches:

| File | Change |
| --- | --- |
| `app/sitemap.ts` | `BASE` → `https://www.deportednotdefeated.com` |
| `app/robots.ts` | `BASE` → same |
| `app/layout.tsx` | `openGraph.url` → same |
| `app/api/immigration-assessment/route.ts` | two email links → same |
| `app/api/subscribe/route.ts` | one email link → same |

The two API-route links were found by the new test, not by hand.

### 3. metadataBase and canonicals — SEO P0

```ts
metadataBase: new URL("https://www.deportednotdefeated.com"),
alternates: { canonical: "./" },
```

`"./"` resolves against the current route, so every page gets its own canonical without editing
120 files. An absolute canonical here would have pointed every page at the homepage.

Verified in the build output:

```
/           <link rel="canonical" href="https://www.deportednotdefeated.com"
/mexico     <link rel="canonical" href="https://www.deportednotdefeated.com/mexico"
og:url      https://www.deportednotdefeated.com
sitemap     <loc>https://www.deportednotdefeated.com/…</loc>
```

### 4. Combined migration — F2 and the exposure window

`supabase/affiliate_engine_m1_combined.sql` (1,003 lines) wraps both migrations in **one
transaction** with an admin-promotion step and two abort guards between them.

#### Composing the migration

Generated by concatenation so it cannot drift from its sources:

```
header + BEGIN
  → supabase/affiliate_engine_m1.sql             (verbatim)
  → admin promotion + abort guards               (added)
  → supabase/affiliate_engine_m1_hardening.sql   (verbatim)
COMMIT + verification queries
```

A test asserts both sources appear verbatim, that exactly one `begin;`/`commit;` pair exists, that
hardening follows the main migration, and that the promotion precedes the admin-only policies.

**Why one transaction:** the gap between M1 and hardening *is* the exposure window. Either
everything applies or nothing does.

**Two guards, both aborting the whole transaction:**

1. The email placeholder was not replaced → abort.
2. No `user_profiles` row with `role = 'admin'` after promotion → abort.

The second is what prevents the F2 lockout. Verified safe to wrap: no `CONCURRENTLY` index, no
nested transaction statement.

---

## RLS matrix

Rows marked *(after)* are the intended state once the combined migration runs. Everything marked
*(now)* was tested against production.

| Operation | Anonymous (now) | Anonymous (after) | Admin (after) |
| --- | --- | --- | --- |
| Read public provider fields | YES | YES | YES |
| Read `notes` | **YES** | NO | YES |
| Read `internal_notes` | n/a — column absent | NO | YES |
| Read `account_identifier` | n/a — column absent | NO | YES |
| Read `commission_value` | n/a — column absent | NO | YES |
| Insert click | **YES (201)** | NO | via service role |
| Read clicks | not tested | NO | YES |
| Modify provider | NO | NO | YES |
| Change affiliate URL | NO | NO | YES |
| Read conversions | n/a — table absent | NO | YES |

Anonymous write and the `notes` read are the two live exposures. Both close with the migration.

---

## Redirect proof (live production)

| Target | Result |
| --- | --- |
| `/go/wise` | → `wise.com/invite/dic/odeyt` ✅ |
| `/go/safetywing` | → `safetywing.com/` ✅ |
| `/go/numeromoney` | → `numero.app/` ✅ |
| unknown slug | → `/resources` ✅ safe fallback |
| `/go/airalo` (pending) | → `airalo.com` ✅ ordinary site, **not monetized** |
| path traversal `..%2f..%2fadmin` | no redirect ✅ |
| `/go/wise?url=https://evil.example` | → wise.com ✅ parameter ignored |
| `/go/wise?to=https://evil.example` | → wise.com ✅ parameter ignored |
| `/go?url=https://evil.example` | no redirect ✅ |

**No open redirect exists.** The router consumes a slug; no request-supplied value can influence
the destination.

---

## Tracking proof — this one does not pass

The probes above produced **no click rows**. The most recent row in `affiliate_clicks` predates
them.

Cause, by elimination: `AFFILIATE_CLICK_LOGGING_ENABLED` defaults to `true`; the redirect executes;
`recordClick()` calls `createAdminClient()`, which returns `null` without
`SUPABASE_SERVICE_ROLE_KEY`. The key is absent from the Vercel environment.

This is a regression introduced by #6, which moved click logging from anonymous insert to
service-role insert. Redirects and merchant-side attribution are unaffected — only first-party
click analytics stopped.

**Fix:** set `SUPABASE_SERVICE_ROLE_KEY` in Vercel → Settings → Environment Variables. Operator
action; the key must not pass through a chat.

---

## Secret scan

Scanned the working tree for key material by pattern. No live secret is committed. `.env.example`
contains names only. `.env.local` is gitignored and was read from disk, never printed. The GA4 and
Clarity IDs in `components/Analytics.tsx` are public by design.

**`SECRET ROTATION REQUIRED`: no.**

---

## Test results

```
typecheck   npx tsc --noEmit       PASS (0 errors)
tests       npm test               96 / 96 pass, 0 fail
build       npm run build          PASS, 606 pages
lint        npm run lint           UNAVAILABLE — no ESLint config in the repo;
                                   `next lint` drops into interactive setup.
                                   Pre-existing, unchanged by this milestone.
```

New tests: 19 across three files.

- `tests/seo-canonical.test.ts` — metadataBase, relative canonical, sitemap host, robots host and
  disallows, and a sweep asserting no source file emits a bare apex URL.
- `tests/affiliate-public-columns.test.ts` — the public list excludes every operator-only column,
  every column predates the migration, every column is one hardening grants, and no public page
  uses `select("*")`.
- `tests/migration-combined.test.ts` — both sources verbatim, single transaction, correct order,
  lockout guard, placeholder guard.

One note on test quality: the first version of the apex sweep subtracted www matches from apex
matches, which could go negative and hide a real offender. It was wrong in a way that made it
*pass*. It now counts directly, and that corrected version is what caught the two API-route links.

---

## Remaining risks

| Risk | Level | Note |
| --- | --- | --- |
| Migration still unapplied | **HIGH** | Engine dormant; `notes` and click forgery remain open |
| Click tracking off | **HIGH** | Every click since #6 is unrecorded and unrecoverable |
| Hardening breaks something unforeseen | MEDIUM | Every block documents its own rollback; `/resources` is the page to check first |
| `affiliate_url` still anon-readable after hardening | LOW | Intentional; can be revoked once the service-role key is set |
| Sitemap covers 52 of 606 pages | MEDIUM | Out of scope here; carried forward from M-AFFILIATE0 |
| YMYL authorship gaps | MEDIUM | Deferred to **M-TRUST1** as instructed |

---

## Deferred, deliberately

- **M-TRUST1** — author identity, review dates, editorial policy, disclaimer structure, source
  standards, change history for immigration/legal content.
- **Naming** — the "AI Report" is a deterministic rule engine. Recorded in M-AFFILIATE0; not
  renamed here.
- No AI provider, no Trigger.dev, no Firecrawl, no n8n, no queue was added.

---

## Operator actions

In order:

1. **Merge and deploy `feature/m-affiliate1`.** The explicit-column fix must be live before
   hardening runs, or `/resources` breaks.
2. **Set `SUPABASE_SERVICE_ROLE_KEY`** in Vercel. Without it, click tracking stays off.
3. **Edit Section B0** of `supabase/affiliate_engine_m1_combined.sql` — replace
   `YOUR@EMAIL.HERE` with your Supabase auth email.
4. **Run the combined file** in the Supabase SQL editor, in one execution. It aborts rather than
   half-applying.
5. **Run the five post-apply checks** printed at the bottom of that file.
6. **Confirm the project** — `.env.local` points at ref `smxl…`. A previous attempt to run the
   migration had no effect, which is consistent with it being executed against a different project.

Nothing above can be done from this environment.
