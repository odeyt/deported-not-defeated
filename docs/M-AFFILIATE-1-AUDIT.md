# M-AFFILIATE-1 — Existing Affiliate Implementation Audit

**Milestone:** M-AFFILIATE-1 — Central Affiliate Revenue Engine
**Date:** 2026-08-23
**Branch:** `feature/m-affiliate-1-engine`
**Baseline commit:** `915972a`
**Status:** Phase 0–1 complete (audit before implementation)

---

## 1. Purpose

This document records the affiliate implementation **as it existed before M-AFFILIATE-1**, so that
the new centralized engine can be judged against a known starting point, and so nothing existing is
replaced blindly.

Nothing in this document is speculative. Every claim below is a direct observation of the repository
at commit `915972a`.

---

## 2. Repository shape

| Property | Value |
| --- | --- |
| Framework | Next.js 14.2.5, App Router |
| Language | TypeScript 5, `strict: true`, path alias `@/*` |
| Styling | Tailwind CSS 3.4 |
| Persistence | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| Auth | Supabase Auth, admin gate in `app/admin/layout.tsx` |
| Middleware | **None** (no `middleware.ts`) |
| Test framework | **None** (no test script, no jest/vitest/playwright) |
| CI | Vercel (checks observed on PR #1) |
| Pages | 119 `page.tsx` files |
| Country data files | 47 in `data/countries/` |
| Env vars | 3 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) |

---

## 3. Existing affiliate architecture

There are **two parallel, unrelated affiliate data models** in the repository today.

### 3.1 `affiliate_partners` — the structured system (canonical, pre-M-AFFILIATE-1)

Defined in `supabase/affiliate_system.sql`. Four tables:

| Table | Purpose |
| --- | --- |
| `affiliate_categories` | 4 seeded categories: money-transfer, phone-internet, vpn-privacy, health-insurance |
| `affiliate_partners` | Provider records with `affiliate_status`, `affiliate_url`, `official_website_url`, `priority`, `country_focus` |
| `affiliate_clicks` | Click log: `partner_id`, `partner_slug`, `page_path`, `referrer`, `user_agent`, `ip_hash` |
| `affiliate_applications` | Application tracker: `status`, `date_applied`, `date_approved`, `username_used` |

Consumed by: `app/resources/page.tsx`, `app/resources/[slug]/page.tsx`,
`app/resources/health-insurance`, `/phone-internet`, `/vpn-privacy`, `app/go/[slug]/route.ts`,
and the four `app/admin/affiliate*` screens.

**10 partners seeded**, all at `affiliate_status = 'pending'` with `affiliate_url = NULL`:
wise, remitly, worldremit, moneygram, airalo, holafly, nordvpn, surfshark, safetywing, genki.

**Note:** `country_focus` is a single free-text column defaulting to `'Laos'`. It is not a country
availability model — it cannot express "Remitly is available in Guatemala but not in Laos".

### 3.2 `affiliate_links` — the legacy flat system

Defined in `supabase/schema.sql:97` and seeded by `supabase/affiliate_links_expanded.sql`.
Flat table: `title`, `category`, `description`, `url`, `country`, `active`, `featured`,
`disclosure_text`. `country` is free text (`'Global'`, `'Laos'`).

Consumed by: `app/admin/page.tsx` (count only). Effectively **dormant** but still seeded with
direct outbound URLs and per-row disclosure strings.

### 3.3 Existing redirect route

`app/go/[slug]/route.ts` — already implements the correct shape:

1. Look up `affiliate_partners` by slug where `active = true`
2. Log click to `affiliate_clicks` (best-effort, non-blocking)
3. Redirect to `affiliate_url` **only** when `affiliate_status === 'approved'`
4. Otherwise redirect to `official_website_url`, else `/resources`

**Gaps found:**

- No URL scheme validation. A stored `javascript:` or `data:` URL would be passed to
  `NextResponse.redirect()` unchecked.
- No country awareness.
- No category routing.
- Click insert uses the public anon client against a `for insert with check (true)` policy —
  the table is writable by anyone with the anon key.
- `partner.affiliate_url` is readable by the public (`Public can read active partners` selects
  all columns), alongside `notes` and `typical_potential`.

### 3.4 Existing helper layer

`lib/affiliate.ts` — `getEffectiveUrl`, `isApproved`, `getStatusLabel`, `getCategoryMeta`.
The approval gate (`status === 'approved' && affiliate_url`) is already correct and is preserved
by M-AFFILIATE-1.

### 3.5 Existing components

| Component | Role |
| --- | --- |
| `components/AffiliateCard.tsx` | Partner card (resources pages) |
| `components/AffiliateCTAButton.tsx` | CTA, fires GA4 `affiliate_cta_click`, uses `getEffectiveUrl` |
| `components/AffiliateGrid.tsx` | Grid wrapper |
| `components/AffiliateStatusBadge.tsx` | Status chip |
| `components/AffiliateDisclosure.tsx` | Disclosure block, `compact` variant |
| `components/RecommendedServicesSection.tsx` | Homepage/country "Services That May Help" |
| `components/ProviderGuidePage.tsx` | Per-provider guide layout |
| `components/CompareMoneyTransfer.tsx` | Money transfer comparison table |
| `components/travel/TravelProviderCard.tsx` | Travel card, `sponsored` badge, `href` defaults to `#affiliate-placeholder` |
| `components/career/CareerAffiliatCard.tsx` | Career/education card |

---

## 4. Hardcoded affiliate URL inventory

Repository-wide search for `affiliate`, `ref=`, `utm_`, `partner`, and all 20+ provider brand
names across `app/`, `components/`, `data/`, `lib/`.

### 4.1 Live monetized hardcoded link — 1 found

| File | Line | Link |
| --- | --- | --- |
| `app/family-visit-travel/page.tsx` | 265 | `https://numero.app?ref=RE_29X3K` |

This is the only outbound URL in the codebase carrying a referral parameter. It is rendered through
`TravelProviderCard` with `sponsored: true`. It bypasses `/go/`, so it produces **no click
tracking** and cannot be changed without a code deploy.

### 4.2 Static `/go/` links — 21 found, 16 currently broken

`data/moneyTransferProviders.ts` defines 21 providers, each with `affiliateUrl: "/go/<slug>"`:

```
wise  remitly  worldremit  moneygram  western-union  ria  xe  ofx  paysend
payoneer  xoom  ace  small-world  instarem  taptap-send  lemfi  revolut
skrill  panda-remit  airtm  (+1)
```

Only **5** of those slugs exist in `affiliate_partners` (wise, remitly, worldremit, moneygram —
and `western-union` does **not**). The remaining **16 slugs resolve to no partner row**, so
`/go/[slug]` falls through to its `/resources` fallback.

> **Live defect:** roughly 16 provider buttons on `/resources/money-transfer` and
> `/resources/money-transfer/compare` silently bounce the visitor to `/resources` instead of
> reaching the provider. The button label reads "Visit Official Website".

This is the single strongest argument for the central registry: the link targets are already
centralized *in form* (`/go/<slug>`) but there is no registry behind them.

### 4.3 Provider names in prose

Country guides name providers in editorial text (e.g. `app/guatemala/receive-money-usa-to-guatemala`
lists Remitly, Western Union, Wise, Tigo Money in a local `methods` array). These are **not** links
and were left untouched.

---

## 5. Disclosure inventory

| Location | Form |
| --- | --- |
| `components/AffiliateDisclosure.tsx` | Reusable component, full + `compact` |
| `app/resources/money-transfer/page.tsx` | Two hand-written inline disclosure blocks |
| `supabase/affiliate_links_expanded.sql` | Per-row `disclosure_text` strings |
| `app/affiliate-disclosure/page.tsx` | Dedicated disclosure page |
| `app/terms/page.tsx` | Terms reference |
| `components/Footer.tsx` | Footer link |

Disclosure exists and is reasonably placed. It is **inconsistent** — three different wordings —
but it is not hidden in the footer only, so the current state is acceptable.

---

## 6. Analytics inventory

`components/Analytics.tsx` — GA4 (`G-TWVEFNFSQE`) + Microsoft Clarity (`xdfwbiaqqw`), plus a
`trackEvent()` helper. `AffiliateCTAButton` fires `affiliate_cta_click` with partner slug, company,
and status.

**Privacy observation:** `affiliate_clicks` stores `user_agent` and `ip_hash`. No immigration-related
field is stored in any affiliate table. The immigration data lives in a separate table
(`immigration_assessments`) and is **not** joined to affiliate data anywhere. This separation must
be preserved.

---

## 7. Security observations (pre-existing)

| # | Observation | Severity |
| --- | --- | --- |
| S1 | `/go/[slug]` performs no URL scheme validation before redirecting | Medium — requires DB write access to exploit |
| S2 | `affiliate_clicks` accepts unauthenticated inserts (`with check (true)`) | Low–Medium — analytics pollution |
| S3 | `affiliate_partners` public SELECT returns every column, including `notes` and `affiliate_url` | Low |
| S4 | No open-redirect surface exists today — `/go/` takes a slug, never a URL | ✅ Good |
| S5 | No secrets committed. `.env.example` contains placeholder names only | ✅ Good |

S1–S3 are addressed by M-AFFILIATE-1 for the new engine. The legacy `affiliate_partners` path is
left behaviourally intact but gains scheme validation through the shared route.

---

## 8. What already works and must not be broken

- `/go/[slug]` for the 5 legacy slugs that resolve
- The `status === approved && affiliate_url` monetization gate
- All four `app/admin/affiliate*` screens
- `/resources` and its four category pages
- 119 pages of SEO metadata, sitemap, structured data
- `AffiliateCTAButton` GA4 events

---

## 9. Gap analysis → M-AFFILIATE-1 scope

| Required capability | Exists today? | Action |
| --- | --- | --- |
| Central provider registry | Partial (`affiliate_partners`, 10 rows, 4 categories) | New `affiliate_providers` registry, 20 canonical categories |
| Country availability model | ❌ (`country_focus` free text, defaults `'Laos'`) | New `affiliate_provider_countries` table |
| 7 approval states | ❌ (5 states) | `NOT_APPLIED → … → EXPIRED` |
| Network metadata | ❌ | `network` column + adapter config |
| `/go/[slug]` | ✅ | Harden: scheme validation, registry-first with legacy fallback |
| `/go/category/[category]` | ❌ | New deterministic category router |
| Country-aware fallback chain | ❌ | New selection service |
| Click analytics with country/category | Partial | Additive columns + `SECURITY DEFINER` RPC |
| Conversion model | ❌ | New `affiliate_conversions` table (schema only) |
| Reusable recommendation component | ❌ (hand-maintained cards) | `<AffiliateRecommendations country category />` |
| Reusable disclosure | ✅ | Reuse existing component, add variant |
| Admin provider manager | Partial (legacy partners) | New `/admin/affiliate-engine` |
| Feature flag | ❌ | `AFFILIATE_ENGINE_ENABLED` |
| Tests | ❌ | Node built-in test runner, pure-logic suites |

---

## 10. Decisions taken into implementation

1. **Do not migrate or delete `affiliate_partners` / `affiliate_links` in this milestone.** Both keep
   working. `/go/[slug]` resolves the new registry first and falls back to the legacy partner table,
   so no existing link changes behaviour.
2. **Do not rewrite the 16 broken `/go/` slugs in `data/moneyTransferProviders.ts`.** Seeding the
   registry fixes them without touching page code.
3. **Country codes are ISO-3166-1 alpha-2**, matching `CountryData.countryCode` already present in
   all 47 country files.
4. **No provider is seeded as monetized.** Every seeded row is `NOT_APPLIED` with
   `affiliate_url = NULL`.
5. **Availability is never assumed.** A provider with no country row is excluded from
   country-scoped recommendations rather than being treated as globally available.

---

*End of audit. Implementation record continues in `M-AFFILIATE-1-ARCHITECTURE.md`.*
