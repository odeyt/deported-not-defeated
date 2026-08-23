# M-AFFILIATE-1 — Pre-Implementation Audit

**Repository:** `DEPORTED NOT DEFEATED` (deportednotdefeated.com)
**Audit date:** 2026-08-23
**Branch created:** `feature/m-affiliate-1`
**Starting commit:** `767920a` — *Sprint 1.2: Add Project Bible documentation system*

---

## 1. Stack and conventions

| Aspect | Finding |
|---|---|
| Framework | Next.js `14.2.5`, App Router, TypeScript `strict: true` |
| Styling | Tailwind CSS 3.4 + custom tokens (`brand-red`, `navy-800`) |
| Persistence | **Supabase / Postgres is canonical.** `@supabase/ssr` + `@supabase/supabase-js` |
| Supabase clients | `lib/supabase/client.ts` (browser, anon), `lib/supabase/server.ts` (server, anon + cookies) |
| Service-role client | **Did not exist.** `SUPABASE_SERVICE_ROLE_KEY` is declared in `.env.example` / `.env.local` but was never consumed in code. |
| Migrations | Flat `.sql` files in `supabase/`, applied manually via the Supabase SQL editor. No CLI migration folder, no migration runner. |
| Admin auth | `app/admin/layout.tsx` → `supabase.auth.getUser()`, redirect to `/admin/login` when absent. Authorization is effectively "any authenticated Supabase user". |
| Analytics | GA4 (`G-TWVEFNFSQE`) + Microsoft Clarity, via `components/Analytics.tsx`; `trackEvent()` helper. |
| Localization | **None.** Site is English-only. No i18n routing or dictionaries. |
| Middleware | **None.** No `middleware.ts` at any level. |
| `robots.txt` / `app/robots.ts` | **Neither existed.** Everything was implicitly crawlable, including `/go/*` and `/admin/*`. |
| Tests | **No test framework, no test files, no test script.** |
| `npm run lint` | **Non-functional.** ESLint has never been configured; `next lint` drops into an interactive setup prompt. Pre-existing condition, not caused by this milestone. |
| `npx tsc --noEmit` | Clean (exit 0). |
| `npm run build` | Clean. |

### Baseline results (recorded before any change)

| Check | Command | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | **PASS** (0 errors) |
| Lint | `npm run lint` | **NOT CONFIGURED** — interactive prompt, no ESLint config in repo |
| Unit / integration | — | **NONE EXIST** |
| E2E / Playwright | — | **NONE EXIST** |
| Build | `npm run build` | **PASS** |

Working tree at branch creation contained 13 untracked `public/images/*.png` country flag files. These were left untouched.

---

## 2. Existing affiliate architecture

An affiliate system **already existed** and was more mature than a greenfield assumption would suggest. M-AFFILIATE-1 is therefore a **hardening and generalization** milestone, not a from-scratch build.

### 2.1 Two parallel, unreconciled affiliate data models

| Model | Table | Where used | Status |
|---|---|---|---|
| **Legacy / flat** | `affiliate_links` (`supabase/schema.sql`, seeded by `supabase/affiliate_links_expanded.sql`) | Only counted on `/admin` dashboard (row count, mislabelled "Affiliate Links" and linked to `/admin/affiliates`). **Not rendered on any public page.** | **Dead weight.** ~20 rows of marketing copy with plain non-tracking URLs and hardcoded `"Affiliate link — we may earn a commission."` disclosure strings. |
| **Structured / canonical** | `affiliate_categories`, `affiliate_partners`, `affiliate_clicks`, `affiliate_applications` (`supabase/affiliate_system.sql`) | All public resource pages, `/go/[slug]`, all three admin affiliate screens | **This is the real registry.** |

**Decision:** `affiliate_partners` is treated as the provider registry. It is *extended additively*; `affiliate_links` is left alone (no data destroyed) and documented as deprecated.

### 2.2 `affiliate_partners` — what existed

Columns: `id, category_id, company_name, slug, short_description, full_description, why_it_fits, typical_potential, official_website_url, affiliate_url, placeholder_url, affiliate_status, cta_label, logo_url, country_focus, priority, featured, active, show_on_homepage, show_disclosure, notes, created_at, updated_at`.

Gaps against the M-AFFILIATE-1 specification:

- `affiliate_status` allowed only `pending | applied | approved | rejected | paused`. **`not_applied` and `expired` were missing**, and the seed default was `pending` — which reads as "we have applied and are waiting", overstating the real commercial position.
- **No affiliate network field** (Travelpayouts / Impact / Awin / Partnerize / PartnerStack / CJ / Direct).
- **No commission metadata** (`commission_type`, `commission_value`, `commission_notes`, `cookie_days`, `recurring`).
- **No canonical category enum.** Categories were four free-text rows (`money-transfer`, `phone-internet`, `vpn-privacy`, `health-insurance`) — no `FLIGHTS`, `HOTELS`, `ESIM`, `TRAVEL_INSURANCE`, `CAR_RENTAL`, `TOURS`, `EDUCATION`, `LEGAL`, etc.
- **No country availability model.** A single free-text `country_focus` column, defaulting to the literal string `'Laos'`. Global availability was effectively assumed everywhere.
- **No `trust_score` / `global_priority`** — only one `priority` integer.
- **No placement classification** — nothing distinguished `affiliate` / `sponsored` / `featured` / `editorial`.
- **No `disclosure_required` / `terms_notes`.**

### 2.3 `/go/[slug]` — what existed

`app/go/[slug]/route.ts` did: look up partner by slug where `active = true` → best-effort click insert → redirect.

Security and correctness findings:

| # | Severity | Finding |
|---|---|---|
| A-1 | **High** | **No redirect URL validation.** `partner.affiliate_url` was passed straight to `NextResponse.redirect()`. Any `javascript:`, `data:`, or `file:` value written into the DB — by any authenticated Supabase user, see A-5 — became a live redirect. Only a literal `"#"` was screened, and only on the *fallback* branch. Not theoretical: §2.5b shows three rows were already serving real affiliate URLs through this path. |
| A-2 | **High** | **21 of 22 money-transfer providers had no matching DB row.** `data/moneyTransferProviders.ts` links to `/go/wise`, `/go/xe`, `/go/ace`, `/go/revolut`, `/go/lemfi`, `/go/grey`, `/go/airtm`, … but `affiliate_partners` holds only 11 rows, 4 of them money-transfer. Every unseeded slug silently dumped the visitor on `/resources` — a dead end, not a fallback. |
| A-3 | Medium | **No category routing, no fallback chain.** A slug either resolved or it didn't. |
| A-4 | Medium | **`/go/*` was crawlable** (no `robots.txt`, no `X-Robots-Tag`). Affiliate redirect endpoints were eligible for indexing. |
| A-5 | Medium | RLS policy `"Admins can manage partners" … using (auth.role() = 'authenticated')` grants **write access to every authenticated Supabase user**, not to admins specifically. `user_profiles.role` exists in `schema.sql` but is never checked. |
| A-6 | Medium | `affiliate_clicks` had `create policy "Anyone can log clicks" … with check (true)` — **unrestricted public INSERT**. Anyone could forge unlimited click rows against any `partner_id`. |
| A-7 | Medium | **Privacy:** clicks stored the full `user-agent` string and the full `referer` URL. `ip_hash` existed as a column (unused). On this site a full referrer can carry the visitor's country plus a deportation-context page path in a single field. |
| A-8 | Low | Public RLS `select using (active = true)` combined with `select("*")` in page code exposed the internal `notes` column to anonymous readers. |
| A-9 | Low | `302` used for a permanent commercial redirect; no `Cache-Control: no-store`, so intermediaries could cache a redirect target that changes when an affiliate URL is rotated. |

### 2.4 Existing components

| Component | Role | Verdict |
|---|---|---|
| `components/AffiliateDisclosure.tsx` | Disclosure block, `compact` variant | Kept; copy revised to the M-AFFILIATE-1 wording (the old copy asserted commission "will be at no extra cost to you" as an absolute) |
| `components/AffiliateCTAButton.tsx` | CTA using `getEffectiveUrl()` | Kept, unchanged |
| `components/AffiliateCard.tsx` | Card for `affiliate_partners` rows | Kept, unchanged |
| `components/AffiliateGrid.tsx` | Grid + disclosure | Kept, unchanged |
| `components/AffiliateStatusBadge.tsx` | Admin status pill | Kept; extended for the two new states |
| `components/RecommendedServicesSection.tsx` | Homepage-style section | Kept, unchanged |
| `components/travel/TravelProviderCard.tsx` | Family-visit provider card | **Contains `href = "#affiliate-placeholder"` default and a `TODO` to insert real affiliate URLs.** Left in place for M-AFFILIATE-2. |
| `components/CompareMoneyTransfer.tsx` | 22-provider comparison table | Reads `data/moneyTransferProviders.ts`; all CTAs already point at `/go/{slug}` |
| `components/ProviderGuidePage.tsx` | Per-provider guide template | Reads the same static data |

None of these were country-aware. Provider selection was maintained by hand, per page.

### 2.5 Hardcoded affiliate URL inventory

Full-repo grep for `affiliate | ref= | referral | utm_ | partner | wise | remitly | worldremit | moneygram | western union | airalo | holafly | booking | agoda | travelpayouts | nordvpn | surfshark | safetywing | coursera` across `app/`, `components/`, `data/`, `lib/`.

**Real tracking URLs found in the codebase: exactly one.**

| URL | Location | Program | Status |
|---|---|---|---|
| `https://numero.app?ref=RE_29X3K` | `app/family-visit-travel/page.tsx:265` | NumeroMoney eSIM referral | **Genuine, operator-owned, already live.** Committed in `0424749` / `c97019f`. Left untouched. |

Everything else in the source is a plain, non-monetized brand URL (`https://wise.com`, `https://nordvpn.com`, …) or an internal `/go/{slug}` link. **No fabricated affiliate IDs, markers, or tracking parameters exist anywhere in the repository**, and none were introduced.

### 2.5b Live database inventory — three approved programs, none of them visible in the repo

A read-only query against the project's Supabase instance (anon key from `.env.local`,
`select slug, affiliate_status, active, affiliate_url from affiliate_partners`) found that the
**database already carries approved affiliate relationships that the source code never mentions.**
This is the single most important finding of the audit, and it changes the milestone's
starting position:

| Slug | Status | Affiliate URL | Notes |
|---|---|---|---|
| `wise` | **approved** | `https://wise.com/invite/dic/odeyt` | ⚠ This is a Wise **personal invite** link, not a Partnerize affiliate tracking URL. See the operator action in the final report. |
| `safetywing` | **approved** | `https://safetywing.com/?referenceID=26552557&utm_source=26552557&utm_medium=Ambassador` | SafetyWing Ambassador program. Real referral ID. |
| `numeromoney` | **approved** | `https://numero.app?ref=RE_29X3K` | Matches the hardcoded link in `app/family-visit-travel/page.tsx`. |

The remaining eight rows (`remitly`, `worldremit`, `moneygram`, `airalo`, `holafly`, `nordvpn`,
`surfshark`, `genki`) are `pending` with `affiliate_url = NULL`.

Consequences for this milestone:

1. The old `/go/[slug]` router **was already redirecting live traffic to real affiliate URLs**
   with no scheme validation. Finding A-1 was not theoretical.
2. `supabase/affiliate_engine_m1.sql` must not disturb these rows. Every seed statement uses
   `on conflict (slug) do nothing`, and no `UPDATE` in the migration touches `affiliate_status`
   or `affiliate_url`.
3. The `safetywing-nomad` row that an earlier draft of the seed contained was **removed** — it
   would have forked a live earning relationship across two records.
4. The admin dashboard's "Recommended Next Applications" queue filters out anything already
   approved, so Wise and SafetyWing appear as done rather than as to-dos.
5. `affiliate_clicks` is **empty** (zero rows), so no historical analytics are at risk from the
   privacy changes.

Provider brand names appear as *editorial text* across ~120 files (all 45 country data files, all country guide pages, `data/moneyTransferProviders.ts`, `data/familyVisitData.ts`, `data/careerData.ts`, `lib/legalResourcesData.ts`). These are informational mentions, not links, and were **not** touched — converting editorial mentions into affiliate links is explicitly out of scope and would produce exactly the "affiliate-link farm" outcome the brief forbids.

Placeholder links found:

| Placeholder | Location | Disposition |
|---|---|---|
| `href="#affiliate-placeholder"` | `components/travel/TravelProviderCard.tsx` default prop | Left for M-AFFILIATE-2 |
| `placeholder_url text default '#'` | `affiliate_partners` schema | Retained for compatibility; the new router never emits it |

### 2.6 Disclosure surfaces

- `app/affiliate-disclosure/page.tsx` — standalone legal page, linked from the footer.
- `components/AffiliateDisclosure.tsx` — reusable block.
- **Hand-written, duplicated disclosure copy** inline in `app/resources/money-transfer/page.tsx` (twice, in two different wordings) and hardcoded per-row in the `affiliate_links` table.

### 2.7 Family-visit and money-transfer surfaces (spec §27, §28)

Both already exist and were **not** duplicated:

- `app/family-visit-travel/page.tsx` (~800 lines) + `data/familyVisitData.ts` + `components/travel/*`. Covers flights, hotels, hostels, eSIM, insurance, car rental, transfers, tours — all with placeholder CTAs. **Prepared, not converted**, per §27.
- `app/resources/money-transfer/` — index, `/compare`, and 14 per-provider guide pages, driven by `data/moneyTransferProviders.ts` (22 providers). **Chosen as the §48 first production proof.**

---

## 3. Gap summary → what M-AFFILIATE-1 must add

| Spec § | Requirement | Pre-existing? | Action |
|---|---|---|---|
| 4 | Central provider registry | Partial (`affiliate_partners`) | Extend additively |
| 5 | Approval states incl. `NOT_APPLIED`, `EXPIRED` | No | Add + CHECK constraint |
| 6 | `affiliate_provider_countries` | **No** | Create |
| 7 | Canonical category system | No (4 free-text rows) | Add `canonical_category` + 20-value set |
| 8 | Seeded provider registry | Partial (11 rows, 3 already approved) | Extend with new rows, all `not_applied`; existing rows untouched |
| 9 | Network metadata | **No** | Add `network` column + adapters |
| 10 | Hardened `/go/[slug]` | Unsafe | Rewrite |
| 11 | `/go/category/[category]` | **No** | Create |
| 12 | Fallback engine | **No** | Create |
| 13 | Non-affiliate fallback | Partial | Formalize |
| 14 | Click analytics | Weak + privacy issues | Extend + scrub |
| 15 | Sub-ID / campaign tracking | **No** | Network adapters |
| 16 | `affiliate_conversions` | **No** | Create (schema + service boundary only) |
| 17 | Admin dashboard | Partial | Add metrics dashboard |
| 19 | Application tracker | Yes | Extend with new states |
| 20 | `<AffiliateRecommendations country category />` | **No** | Create |
| 22 | Disclosure component | Yes | Revise copy |
| 23 | sponsored / featured / editorial | **No** | Add `placement_type` |
| 29 | SEO protection for `/go/` | **No** | `app/robots.ts` + `X-Robots-Tag` |
| 32–33 | Redirect validation, RLS | Unsafe | Fix |
| 36 | Feature flag | **No** | `AFFILIATE_ENGINE_ENABLED` |
| 37 | Fail-safe | **No** | try/catch + null returns throughout |
| 38 | Tests | **None** | Add `node --test` suite |

---

## 4. Architectural decisions taken (and why)

1. **Extend `affiliate_partners`; do not create a second `affiliate_providers` table.** The spec says "an appropriate provider table *such as* `affiliate_providers`". Creating a new table would fork the registry, orphan the existing admin screens, and repeat the exact mistake that `affiliate_links` vs `affiliate_partners` already represents. A read-only `affiliate_providers` **view** is supplied for forward-compatible naming.
2. **No new database.** Supabase/Postgres only.
3. **No new runtime dependencies.** Tests run on Node 26's built-in `node:test` with native TypeScript type-stripping.
4. **Migrations are written but NOT applied.** The repository has no migration runner, and this task carries no authorization to touch the production database. Applying `supabase/affiliate_engine_m1.sql` is an explicit operator action.
5. **Column-grant hardening is split into a separate file** (`supabase/affiliate_engine_m1_hardening.sql`) to be run *after* the application deploy, so that tightening anon column access cannot 500 the live public pages mid-rollout.
6. **`affiliate_links` is left intact.** Deprecated in documentation, not dropped — no data destroyed.

---

## 5. Explicitly NOT done in this milestone

- No country guide content rewritten.
- No editorial brand mention converted into an affiliate link.
- No provider activated. Every newly seeded provider is `not_applied` with `affiliate_url = NULL`. The three providers already approved in the database (Wise, SafetyWing, NumeroMoney) were left exactly as they were — not touched, not re-approved, not re-pointed.
- No affiliate ID, marker, tracking parameter, commission figure, cookie window, or conversion record invented.
- `app/family-visit-travel/page.tsx` prepared but not converted (M-AFFILIATE-2).
- The 14 money-transfer provider guide pages not converted — only the registry-backed section on the money-transfer index.
- ESLint not configured (pre-existing gap, out of scope, would surface unrelated failures).
