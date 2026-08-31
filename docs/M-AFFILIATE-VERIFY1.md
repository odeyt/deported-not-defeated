# M-AFFILIATE-VERIFY1 — Affiliate Verification Admin Dashboard

**Status:** Merged and deployed to production.
**Route:** `/admin/affiliates/verification`
**Merged:** PR [#26](https://github.com/odeyt/deported-not-defeated/pull/26), squash commit `e7d39bc`, confirmed serving production (Vercel deployment `dpl_DsqfobaU4XfVE3VYohU3vw6ULx9s`, aliased to `www.deportednotdefeated.com`) as of 2026-08-31.

## Production verification (M-AFFILIATE-VERIFY1.1, 2026-08-31)

What was actually confirmed against the live deployment, from an environment with no Supabase credentials and no authenticated admin session — everything below is either an unauthenticated HTTP check or a fresh `npm run typecheck`/`test`/`build` on the exact merged commit, never an inference from documentation.

**Confirmed:**
- `/admin/affiliates/verification` — anonymous request → `307` to `/admin/login` (same session-check boundary as every other admin route, unchanged by this milestone).
- `/api/admin/affiliate-verification/export` — anonymous request → `401 Unauthorized`, plain-text body, no data.
- `/go/wise`, `/go/safetywing`, `/go/numeromoney` — identical redirects to the pre-merge baseline (`wise.com/invite/dic/odeyt`; `safetywing.com/?referenceID=...`; NumeroMoney's already-paused `/resources` fallback, unrelated to this milestone).
- `/mexico/receive-money-usa-to-mexico`, `/tools/return-home-cost` — `200`, and the calculator page still contains its eSIM/phone-plan option text.
- `sitemap.xml` — `200`, byte-identical size to pre-merge (32,743 bytes) — confirms the new admin/API routes added no sitemap entries.
- `robots.txt` — unchanged; `/admin/` and `/api/` disallow rules already cover both new routes.
- Post-merge gate on `main` at `e7d39bc`: `npm run typecheck` clean, `npm test` **256/256** passing, `npm run build` succeeds with both new routes registered as dynamic. Lint remains not runnable (no ESLint config in this repo, pre-existing).

**Migration confirmed applied** (operator ran it in the Supabase SQL editor, 2026-08-31) — verification query result, from real production state:

| `mx_rows` | `mx_verified` | `mx_us_corridor` | `rows_with_evidence` |
|---|---|---|---|
| 8 | 2 | 2 | 2 |

Exactly as designed: 8 providers hold an `affiliate_provider_countries` row for `MX`; exactly 2 (Wise, Remitly) are verified; exactly those same 2 carry a `US` corridor (`origin_country`); exactly those same 2 now have `evidence_url` populated. The other 6 MX rows were left untouched — still unverified, no origin, no evidence — confirming the backfill did not silently upgrade anything beyond the two rows it was scoped to. This one query does not confirm the CHECK constraint is enforced (that requires attempting an invalid insert, not yet done) or give a full country/status breakdown across all 21 known MX providers — see remaining gaps below.

**Still NOT VERIFIED FROM THIS ENVIRONMENT** — require an authenticated `admin`-role session, which does not exist in this environment, and this environment does not request or accept credentials to obtain one:
- The full Mexico summary the dashboard itself computes (known providers, per-status breakdown, monetized, stale, needs-attention count) — the query above confirms the underlying data is correct, but not what the page renders from it.
- Wise's and Remitly's live per-field state as rendered in the admin UI specifically (vs. confirmed only at the raw-SQL level above).
- The multi-row-per-destination (generic + corridor-specific) rendering behavior against a real example — verified only at the unit-test level (`tests/affiliate-verification-gaps.test.ts`).
- The evidence-edit workflow and CHECK-constraint rejection of an invalid tier (e.g. attempting `evidence_tier = 'TIER_4'`).
- Non-admin-authenticated access (403) and admin-authenticated access (200) to either the page or the CSV export — only the anonymous case is checkable without a session.

**Operator action needed to close these gaps:** open `/admin/affiliates/verification` while signed in as an admin and compare what renders against this document's truth-model table and the query result above.

## Purpose

Before this milestone, the truth model this dashboard surfaces already existed in application code — `lib/affiliate/corridor.ts` (M-GROWTH1A Phase 3) and `lib/affiliate/freshness.ts` (M-GROWTH1A Phase 4) — but no admin page called either of them. An operator could see a raw `verified_at` date on `ProviderCountriesEditor.tsx`, but not whether that verification was still fresh, not the corridor (`origin_country`) that column has supported since M-GROWTH1A, and not a single view answering "what needs my attention right now."

This milestone is **not** a new truth model. It is the missing admin UI for the one that already existed, plus one narrow schema addition (evidence citation — see below) for a gap that was real: the two rows already verified in this codebase (Wise/MX, Remitly/MX) had real source URLs, but only as SQL comments in `supabase/affiliate_corridor.sql`, invisible to any query.

## Truth model — kept as separate facts, never collapsed into one "active" boolean

| Concept | Source of truth | This dashboard's role |
|---|---|---|
| Provider exists | `affiliate_partners` row | Lists it |
| Destination country availability | `affiliate_provider_countries.available` for a `country_code` | Displays it per-row |
| Corridor availability (origin→destination) | `lib/affiliate/corridor.ts`'s `resolveCorridor()`, backed by `affiliate_provider_countries.origin_country` | Calls it, never reimplements it |
| Application status | `affiliate_partners.affiliate_status` (`not_applied`/`applied`/`pending`/`approved`/`rejected`/`paused`/`expired`) | Displays it as the canonical value; `affiliate_applications` is supplementary operator notes, never merged into it |
| Live tracking link | `affiliate_partners.affiliate_url` + `isSafeAffiliateUrl()` | Displays presence, never the raw URL in a list view |
| Monetized | `lib/affiliate/selection.ts`'s `isMonetizable()` (`active && approved && a safe URL`) | Reused verbatim via `isMonetizedRow()` in `lib/affiliate/verificationGaps.ts` — never reimplemented inline |
| Verification | `affiliate_provider_countries.verified_at` (NULL = never) | Displays it |
| Verification freshness | `lib/affiliate/freshness.ts`'s `evaluateFreshness()` (90-day window for `MONEY_TRANSFER`, 180 days otherwise) | Renders it as `components/admin/FreshnessBadge.tsx` |
| Evidence for a verification | **New in this milestone** — `affiliate_provider_countries.evidence_url` / `evidence_tier` | Editable in `ProviderCountriesEditor.tsx`, exported in CSV |

"Affiliate program exists" is deliberately **not** a stored field. `network IS NOT NULL` is displayed as "network confirmed," not "program exists" — the finer confirmed/rejected/unconfirmed research already done in `docs/M-AFFILIATE3-PROVIDER-VERIFICATION.md` (e.g. Remitly ✅, Xoom "no public publisher program found", MoneyGram/Ria unconfirmed) was never persisted to a queryable column, and this milestone does not retroactively invent one — see Known limitations.

## Evidence rules

Reuses the Tier 1 / Tier 2 / Tier 3 vocabulary already defined in `docs/M-AFFILIATE3-PROVIDER-VERIFICATION.md` verbatim — this milestone does not invent a parallel taxonomy. Tier 1 (the provider's own published page) is required before a plain availability claim is warranted; Tier 3 (third-party directories, affiliate-network listings) is recorded only to show what was considered and rejected, never treated as sufficient on its own.

New columns (`supabase/affiliate_verification_evidence.sql`, additive): `evidence_url text`, `evidence_tier text check (... in ('TIER_1','TIER_2','TIER_3'))`. Backfilled for exactly the two rows that already had a real, committed citation (Wise/MX, Remitly/MX — sourced from `affiliate_corridor.sql`'s own comment, not new research). Every other row (111 of 113) stays NULL on both columns — that gap is itself the first thing this dashboard surfaces, not something the migration papers over.

## Freshness rules

Unchanged from `lib/affiliate/freshness.ts` — this doc does not re-derive them, it just links to the canonical source. 90-day window for `MONEY_TRANSFER`, 180 days for everything else (including unknown categories). A future or unparseable `verified_at` is treated as `UNVERIFIED`, never as fresher. Staleness never disables a link, never marks a provider unavailable, and never deletes anything — it only changes the claim the reader-facing text is allowed to make.

## Operator workflow

1. Open `/admin/affiliates/verification`. Defaults to destination `MX` (Mexico — the first validation case, per the milestone spec), origin fixed to `US` (every corridor on this site runs USA → destination).
2. Use the "Needs attention" tab to work the gap queue (`lib/affiliate/verificationGaps.ts`'s `detectGaps()`): approved-but-no-link, link-present-but-not-approved, monetized-but-stale, country-available-but-corridor-unknown, corridor-claimed-without-evidence, application-pending-too-long (new 60-day default, not a previously documented policy — adjustable), never-verified.
3. Click "Review" to open the existing `/admin/affiliates/[id]/edit` page, where `ProviderCountriesEditor.tsx` now also exposes `origin_country`, `evidence_tier`, `evidence_url`, and a `FreshnessBadge` next to the existing `verified_at` toggle.
4. This dashboard is the **tool** for the queue that `docs/AFFILIATE-PROVIDER-VERIFICATION.md` already defines — that document remains the source of what to verify and in what order; this page is where the resulting facts get recorded and where their current state is visible.
5. "Export CSV" downloads the currently filtered row set for offline review or affiliate-application prep.

## Security

- **Page and edits**: RLS is the enforcement boundary, exactly as everywhere else in this admin section. All writes to `affiliate_partners` / `affiliate_provider_countries` require `public.is_affiliate_admin()` (`user_profiles.role = 'admin'`), defined in `supabase/affiliate_engine_m1_hardening.sql` — not the weaker `auth.role() = 'authenticated'`. `app/admin/layout.tsx` only checks that a session exists; it does not check role. This dashboard changes none of that.
- **CSV export** (`app/api/admin/affiliate-verification/export/route.ts`) is the one new pattern: a server route, not a page, so RLS returning fewer rows to a non-admin is not by itself a legible failure mode for a route whose entire purpose is an operator export. The route explicitly checks `auth.getUser()` (401 if absent) then `user_profiles.role === "admin"` (403 if not) — the same rule `is_affiliate_admin()` encodes, stated once more in the one place RLS-only enforcement isn't visibly load-bearing to a reader. It uses the cookie-based, RLS-respecting server client (`lib/supabase/server.ts`) — **never** `lib/supabase/admin.ts`'s service-role client, since this is a read on behalf of one signed-in operator, not a privileged background job.

## Derived vs. editable

**Always derived, never stored:** `MONETIZED`, `corridorVerified`, freshness `state`/`label`, every `GapFlag`. Changing any of these directly is not possible — they are recomputed from the fields below on every page load.

**Editable, operator-entered facts:** `affiliate_status`, `active`, `affiliate_url` (on the existing edit page), `available`, `priority`, `origin_country`, `verified_at`, `evidence_url`, `evidence_tier`, `availability_notes` (on `ProviderCountriesEditor.tsx`, now extended).

## What this does NOT automate

- No bulk approve, no bulk "mark available," no bulk monetize. The milestone spec explicitly forbids these and none were built.
- No automatic verification. `verified_at`/`evidence_url`/`evidence_tier` are only ever set by an operator clicking through and confirming a source.
- No change to public-facing ranking or eligibility. `lib/affiliate/selection.ts` (`rankProviders`, `isMonetizable`) and `app/go/[slug]/route.ts` are unmodified — this milestone only reads `isMonetizable`, it never touches how providers are ranked or selected on public pages.
- No responsive card fallback for the new table — it uses the same `overflow-x-auto` horizontal-scroll pattern already used on `ProviderCountriesEditor.tsx`, since no admin page in this codebase has a card-based responsive table today and inventing one was out of scope for this milestone.
- Does not reconstruct the ✅/❌/❓ "does a program formally exist" research from `docs/M-AFFILIATE3-PROVIDER-VERIFICATION.md` into a queryable field — that distinction was never persisted to the database and remains only in that document's prose. "Network confirmed" (derived from `network IS NOT NULL`) is a narrower, honestly-labeled proxy, not a restoration of that research.
- Does not update `docs/AFFILIATE-COVERAGE-MATRIX.md`, which is stale relative to the 2026-08-31 NumeroMoney pause (still says "3 approved and monetizing"). That staleness is exactly the kind of drift this dashboard's "Approved" / "Monetized" counts would have caught live — fixing that specific document is a follow-up, not part of this milestone.
