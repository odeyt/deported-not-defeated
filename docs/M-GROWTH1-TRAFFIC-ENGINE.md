# M-GROWTH1 — Traffic & Affiliate Revenue Engine

**Date:** 2026-08-25
**Starting SHA:** `827922c`
**Verdict:** PASS WITH CONDITIONS

---

## The binding constraint

**Search Console is not connected, and I cannot connect it** — it needs a Google
OAuth grant only the operator can give. That makes §10–14 of the brief
unbuildable: the ingestion layer, the opportunity engine, the CTR analysis, and
the traffic-readiness tracker all require impression and position data that does
not exist yet.

Rather than build empty scaffolding, this milestone delivered everything that
rests on evidence I could actually measure, and states the rest as
`NOT AVAILABLE`.

---

## What was fixed: 49 dead commercial CTAs

The largest concrete finding. **Forty-nine buttons across nine files pointed at
`#affiliate-placeholder`** — they looked clickable and did nothing.

```
app/career-education/page.tsx              17
components/career/CourseComparisonTable     7
components/career/CareerPathFinder          7
components/travel/CountryVisitSection       4
components/career/CountryCareerSection      4
components/travel/TravelBudgetCalculator    3
app/family-visit-travel/page.tsx            3
components/travel/TravelProviderCard        2
components/career/CareerAffiliatCard        2
```

"Browse Udemy Courses", "Compare Flights to Mexico", "Get TEFL Certified",
"Search Flights" — every one a dead end. A placeholder CTA is worse than no CTA:
it spends the reader's trust and returns nothing.

**Now zero.** Each was replaced with one of three real destinations:

| Destination | Used when | Example |
| --- | --- | --- |
| `/go/<slug>` | a specific provider exists | `/go/udemy`, `/go/alison` |
| `/go/category/<category>` | the CTA is generic | `/go/category/tefl-tesol` |
| internal resource page | no provider is appropriate | `/resources` |

No fabricated affiliate URL was used anywhere.

### Ten providers registered to make that possible

Added as **ordinary non-affiliate resources** with real public homepages,
`not_applied`, `editorial` placement:

```
alison · skillshare · edx · linkedin-learning · upwork
fiverr · grammarly · ivisa · sherpa · visahq
```

Registry: 40 → 50 providers. None is monetized; each will monetize
automatically if ever approved.

---

## Automatic activation — proven, not asserted

The brief's key requirement (§4, §27, §62): a future approval must not require a
deploy.

`tests/affiliate-auto-activation.test.ts` proves the full state machine with
fixtures — never by falsely approving a real provider:

| State | Result |
| --- | --- |
| not applied | → ordinary website |
| approved, **no** tracking URL | → ordinary website (approval alone is not enough) |
| tracking URL, **not** approved | → ordinary website (URL alone is not enough) |
| **approved + URL + active** | → **affiliate** |
| paused / rejected / expired | → ordinary website, never broken |
| inactive | → resource page |
| hostile stored URL (`javascript:`) | → refused, falls back |

**Deploy required after future approval: NO.** The only difference between the
first row and the fourth is data.

---

## Measured site health

### Sitemap — clean

```
142 URLs · 142 × 200 OK · 0 redirects · 0 404s
```

**This corrects my own earlier claim.** M-AFFILIATE0 reported the sitemap covered
"52 of 605 pages". The generated sitemap contains 142 URLs; 52 was a count of
literal source entries before the `allCountries.map()` expansion, and 605 was
Next's prerendered-path total, which is not the same thing as sitemap coverage.

### Titles — healthier than reported

```
142/142 have titles · 0 missing · 1 duplicate group · 3 over 60 chars
```

The one duplicate is the generic layout fallback on pages that export no
metadata of their own.

### Affiliate coverage

```
50 providers · 3 monetizing · 113 country rows · 2 verified · 322 clicks · 0 conversions
```

Full breakdown: `AFFILIATE-COVERAGE-MATRIX.md`.

---

## What was deliberately not built

- **No Trigger.dev.** §38 says avoid infrastructure for its own sake. There is no
  recurring job yet, because there is no data to process.
- **No LLM.** §37. Nothing in this milestone needed one.
- **No `/admin/growth` dashboard.** Every metric it would show is
  `NOT AVAILABLE`. A dashboard of empty cells is worse than none — it implies
  measurement that is not happening.
- **No country expansion.** §63. Expanding before knowing what ranks is how a
  site accumulates pages nobody reads.
- **No autonomous SEO rewrites.** §12.

---

## Analytics reality (§32)

Existing: **GA4** and **Microsoft Clarity**, both hardcoded in
`components/Analytics.tsx`. No Vercel Analytics, Plausible, or PostHog. No
second platform was added.

Affiliate click tracking is live and records country, category, placement, and
campaign — that is the one funnel stage currently measured.

**Affiliate CTR: NOT MEASURABLE.** Module impressions are not tracked, so a CTR
would need pageviews as the denominator, which §34 correctly forbids passing off
as the real thing.

**Revenue: NOT MEASURABLE.** Zero conversions have ever been recorded, from any
network.

---

## Three-month traffic readiness (§30, §31)

```
Month 1:  NOT AVAILABLE
Month 2:  NOT AVAILABLE
Month 3:  NOT AVAILABLE
Requirement:  stable monthly traffic, 3 consecutive months (Travelpayouts)
Next review:  cannot be calculated — the clock starts when measurement does
```

This is the sharpest consequence of the missing connection: **the requirement
Travelpayouts set cannot currently be measured, let alone met.**

---

## Deliverables

```
docs/M-GROWTH1-TRAFFIC-ENGINE.md          this file
docs/AFFILIATE-COVERAGE-MATRIX.md         measured coverage, all 50 providers
docs/SEO-OPPORTUNITY-REPORT.md            measured health; GSC gaps stated
docs/NEXT-COUNTRY-GROWTH-PRIORITY.md      provisional, pending traffic data
docs/YOUTUBE-CONTENT-QUEUE.md             10 briefs from existing pages
```

Tests added: `affiliate-auto-activation` (10), `no-dead-cta` (4).
