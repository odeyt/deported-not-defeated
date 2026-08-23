# M-AFFILIATE-1 — Central Affiliate Engine Architecture

**Milestone:** M-AFFILIATE-1
**Date:** 2026-08-23
**Branch:** `feature/m-affiliate-1-engine`
**Baseline commit:** `915972a`
**Companion documents:** [`M-AFFILIATE-1-AUDIT.md`](./M-AFFILIATE-1-AUDIT.md), [`AFFILIATE-OPERATIONS.md`](./AFFILIATE-OPERATIONS.md)

---

## 1. The one-sentence version

Pages declare **what** should be recommended; the engine decides **who** qualifies,
**in what order**, and **whether the link is monetized** — so no page ever hardcodes an affiliate URL again.

---

## 2. Request flow

```
Content page  (e.g. /guatemala/receive-money-usa-to-guatemala)
   │  <AffiliateRecommendations category="MONEY_TRANSFER" country="GT" />
   ▼
getRankedProviders()                       lib/affiliate-engine/service.ts
   │  reads affiliate_providers_public  +  affiliate_provider_countries_public
   ▼
selectProviders()                          lib/affiliate-engine/selection.ts  (pure)
   │  country eligibility → deterministic ranking
   ▼
ProviderRecommendationCard  →  /go/{slug}?country=GT&placement=…
   ▼
/go/[slug]                                 app/go/[slug]/route.ts
   │  1. normalizeSlug()          reject anything not slug-shaped
   │  2. resolve_affiliate_destination()   DB-side approval gate
   │  3. isSafeAffiliateUrl()     https-only, no internal hosts, no credentials
   │  4. log_affiliate_click()    commercial fields only
   │  5. withSubId()              only if the operator configured the param
   ▼
302 redirect  (X-Robots-Tag: noindex, nofollow)
```

Category routing follows the same path via `/go/category/[category]`, choosing the
provider first with `selectCategoryTarget()`.

---

## 3. What was built

### 3.1 Database — `supabase/affiliate_engine.sql`

| Object | Kind | Purpose |
| --- | --- | --- |
| `affiliate_provider_categories` | table | 20 canonical categories. A **table**, not an enum, so adding a category is an INSERT — never a migration (§7). |
| `affiliate_providers` | table | The registry. Slug, category, network, both URLs, 7-state approval, commercial terms, ranking, application tracker. |
| `affiliate_provider_countries` | table | Per-country availability, priority, notes, `verified_at`. |
| `affiliate_conversions` | table | Schema + service boundary only. No fake data, no fake webhook. |
| `affiliate_clicks` | **extended** | 6 nullable columns added. Nothing dropped or retyped. |
| `affiliate_providers_public` | view | Render-safe columns only. |
| `affiliate_provider_countries_public` | view | Render-safe columns only. |
| `resolve_affiliate_destination(slug)` | function | The monetization gate, in the database. |
| `log_affiliate_click(...)` | function | Click writer whose signature cannot accept personal data. |
| 10 indexes, 2 triggers | — | Ranking, lookup, and time-series query paths. |

### 3.2 Application

| Path | Purpose |
| --- | --- |
| `lib/affiliate-engine/types.ts` | Categories, statuses, networks, view shapes |
| `lib/affiliate-engine/config.ts` | `AFFILIATE_ENGINE_ENABLED` + environment gating |
| `lib/affiliate-engine/url.ts` | **Pure.** Redirect validation, sub-id building, input normalizers |
| `lib/affiliate-engine/selection.ts` | **Pure.** Country eligibility, ranking, fallback chain |
| `lib/affiliate-engine/supabase-public.ts` | Cookie-free anon client (keeps pages static) |
| `lib/affiliate-engine/service.ts` | Data access, fail-safe by contract |
| `app/go/[slug]/route.ts` | Provider router — registry first, legacy fallback |
| `app/go/category/[category]/route.ts` | Category router |
| `components/affiliate/AffiliateRecommendations.tsx` | The component pages consume |
| `components/affiliate/ProviderRecommendationCard.tsx` | One provider, honest labels |
| `components/AffiliateDisclosure.tsx` | Extended with `wording` + `tone` (existing call sites unchanged) |
| `app/admin/affiliate-engine/` | Dashboard + provider manager |
| `tests/affiliate-engine/` | 36 tests, Node's built-in runner |

---

## 4. Design decisions and the reasoning

### 4.1 Monetization is not a ranking input

`compareProviders()` sorts by country priority → global priority → trust score →
featured → slug. **`monetized` appears nowhere in the comparator.** Whether a
provider pays us decides which URL the visitor is sent to, never who appears first.

The single exception is `selectCategoryTarget()`, where the router must choose one
destination and prefers a monetized one — documented in the code and covered by a test
that asserts a paying provider does **not** outrank a better-ranked non-paying one.

### 4.2 The approval gate lives in the database

`resolve_affiliate_destination()` returns `affiliate_url` only when
`affiliate_status = 'APPROVED' AND affiliate_url IS NOT NULL AND active = true`.
Application code cannot override this. A bug in TypeScript cannot accidentally monetize
an unapproved program.

### 4.3 No public SELECT on the base table

`affiliate_providers` has **no** public read policy. The public reads two restricted
views instead, so `affiliate_url`, commission terms, `cookie_days`,
`account_identifier`, `internal_notes`, and `terms_notes` are never exposed. This closes
audit finding **S3**.

### 4.4 Absence of data never means "available"

A provider with no row in `affiliate_provider_countries` for a country is **excluded**
from that country's recommendations. Silence is treated as unknown, not as yes. This is
why the seed contains Guatemala rows only — three claims sourced from existing site
content, each recorded with its source, all with `verified_at = NULL`.

### 4.5 Pages stay static

Engine reads use a cookie-free anon client. The cookie-based server client would have
called `cookies()` and silently converted statically generated country guides into
per-request renders. The proof page is still `○ (Static)` in the build output, with
`revalidate = 3600` so admin changes appear within an hour without a redeploy.

### 4.6 Fail-safe by contract

Every function in `service.ts` catches its own errors and returns `[]` or `null`.
`AffiliateRecommendations` renders `null` when there is nothing to show. A Supabase
outage, an unrun migration, or a disabled flag costs the visitor a recommendation
block — never the guide itself.

### 4.7 Sub-id parameter names are configuration, not guesses

Networks disagree on the tracking parameter name. Rather than hardcode a guess per
network, the name lives in `affiliate_providers.sub_id_param` and is set by an operator
who has read that network's documentation. When it is unset, **nothing is appended** —
a wrong parameter name breaks attribution silently, which is worse than none.

### 4.8 Two deviations from the milestone brief

1. **`approval_status` was not created as a separate column.** The brief lists both
   `affiliate_status` and `approval_status`. Two columns expressing one lifecycle drift
   apart in practice. `affiliate_status` carries all seven states and is the single
   source of truth. All seven required states exist.
2. **`source_page` maps onto the existing `page_path` column** rather than adding a
   near-duplicate column to `affiliate_clicks`.

---

## 5. Security posture

| Threat | Mitigation |
| --- | --- |
| Open redirect | Routes accept a **slug**, never a URL. `normalizeSlug()` rejects URL-shaped input; tests assert `/go?url=https://evil.example` cannot work. |
| Arbitrary destination injection | `isSafeAffiliateUrl()` — https only, no credentials, no loopback/RFC-1918/link-local, no control characters, 2048-char cap. |
| XSS via stored URL | `javascript:`, `data:`, `vbscript:`, `blob:` all rejected before redirect. |
| SQL injection | Supabase client parameterizes; RPCs take typed arguments; `normalizeSlug()` rejects quote/semicolon payloads. |
| Unauthorized affiliate changes | RLS restricts writes to `auth.role() = 'authenticated'`; admin layout redirects anonymous visitors. |
| Secret exposure | No public SELECT on the base table; `.env.example` names only; no credential is committed. |
| Analytics abuse | New clicks go through `log_affiliate_click()`, which validates the provider exists and is active. Legacy anon insert is addressed by the optional `affiliate_engine_hardening.sql`. |
| Accidental monetization | DB gate + admin form refusing to save `APPROVED` without a valid https affiliate URL. |

### Privacy

`log_affiliate_click()` accepts provider, country, category, source page, placement, and
campaign. **There is no parameter for IP, user agent, session, immigration status,
deportation reason, case detail, or identity document** — the signature makes that class
of mistake impossible. Referrers are reduced to their path before storage.

---

## 6. Performance

Two queries per placement (providers + country rules), never per-provider lookups.
Indexes cover `(category, active)`, `(global_priority, trust_score)`,
`(country_code, available)`, `provider_id`, and `clicked_at`.

**Known limit:** the admin dashboard fetches up to 5,000 recent click rows and aggregates
in JavaScript. That is fine at current volume and should become an SQL aggregate or a
materialized view before click volume reaches five figures.

---

## 7. What was deliberately NOT done

- **No mass rollout.** One page consumes the engine. 118 other pages are untouched, per
  the "prove it on one page first" rule.
- **No legacy migration.** `affiliate_partners` and `affiliate_links` are untouched and
  still work. `/go/[slug]` falls back to the legacy table for any slug not in the registry.
- **No family-visit rewrite.** `/family-visit-travel` exists and was left alone; its
  centralization is scoped in section 8 below.
- **No conversion webhook.** Schema only.
- **No AI ranking.** Deterministic rules, unit-tested.
- **No ESLint configuration.** The repo has none; adding one would touch 119 files.

---

## 8. Recommended next milestones

**M-AFFILIATE-2 — Family visit journey.** Point `/family-visit-travel` at
`<AffiliateRecommendations>` for FLIGHTS, HOTELS, HOSTELS, AIRPORT_TRANSFER, ESIM,
TRAVEL_INSURANCE, CAR_RENTAL, TOURS. Route the hardcoded NumeroMoney referral
(`app/family-visit-travel/page.tsx:265`) through `/go/` so it is tracked and editable
without a deploy — it is currently the only monetized link that bypasses the engine.

**M-AFFILIATE-3 — Money transfer rollout.** Seed country availability for the remaining
46 countries from verified sources, then convert `/resources/money-transfer` and the
`receive-money-usa-to-*` pages. This also retires the ~16 dead `/go/` slugs in
`data/moneyTransferProviders.ts`.

**M-AFFILIATE-4 — Conversion ingestion.** Connect real network reporting into
`affiliate_conversions`, matched on the campaign sub-id already stored per click.

---

*Implementation record for M-AFFILIATE-1. Operational procedures live in
[`AFFILIATE-OPERATIONS.md`](./AFFILIATE-OPERATIONS.md).*
