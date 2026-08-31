# M-AFFILIATE-VERIFY1 — Affiliate Verification Admin Dashboard

**Status:** Implemented, pending operator review and merge.
**Route:** `/admin/affiliates/verification`

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
