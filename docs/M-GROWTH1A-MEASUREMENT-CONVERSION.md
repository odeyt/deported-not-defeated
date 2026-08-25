# M-GROWTH1A — Measurement & Conversion Foundation

**Date:** 2026-08-25
**Starting SHA:** `ffbbf1f`
**Verdict:** PASS WITH CONDITIONS

Four additive improvements. No schema rewrite, no publishing engine, no
generated pages, and the hand-curated sitemap is untouched.

---

## Phase 0 — Search Console

**Status: NOT CONNECTED. Operator action required.**

| Check | Result |
| --- | --- |
| Verification meta tag live on `www` | yes (added 2026-06-27, commit `0f8bf51`) |
| Verification tag live on apex | yes |
| GSC API client in repo | none |
| GSC credentials in environment | none |
| Ingestion tables | none (`PGRST205`) |

### Baseline

```
organic clicks:      NOT AVAILABLE
impressions:         NOT AVAILABLE
CTR:                 NOT AVAILABLE
average position:    NOT AVAILABLE
indexed pages:       NOT AVAILABLE
top queries:         NOT AVAILABLE
top landing pages:   NOT AVAILABLE
top countries:       NOT AVAILABLE
```

### OPERATOR ACTION REQUIRED

1. https://search.google.com/search-console
2. Check for an existing property first — the June tag suggests one may exist
3. Add property, URL prefix, `https://www.deportednotdefeated.com`
   (the `www` form; the apex 308s to it and an apex property collects nothing)
4. Verify by HTML tag — already live, should be instant
5. Sitemaps, submit `sitemap.xml` (142 URLs, all verified 200)

The remaining four phases did not wait on this.

---

## Phase 1 — Conditional calculator recommendations

**The defect:** `/tools/return-home-cost` showed money-transfer and eSIM blocks
to every visitor regardless of what they had selected.

**Now:** a commercial block appears only when the reader explicitly asked for
that thing.

| Block | Condition |
| --- | --- |
| Money transfer | new checkbox, "Family in the US may send me money" |
| eSIM | existing "I need a phone plan or data" |
| **Nothing selected** | **no commercial module at all** |

### Deliberately excluded

**Travel insurance.** Nomad-style policies cover travel *outside* your home
country and provide only incidental home-country coverage. For someone who has
returned to Mexico and lives there, that product is wrong — however well it
might convert. It stays on the visitor-facing travel page, where it fits.

**Accommodation.** Hotel booking is for visitors. A returnee renting a room for
a month is not a hotel booking, and offering one would be padding.

### Commercial independence preserved

`familyMaySendMoney` is a stated *need*, never a cost input. A test asserts that
toggling it produces byte-identical totals and line items. No inference is drawn
from immigration answers, because the calculator does not ask any.

### Implementation

Providers are fetched **once on the server** and passed into the client island,
which decides whether to show them. Toggling is instant and costs no request.

---

## Phase 2 — Impression tracking

Clicks were already recorded; the denominator was missing, which is why
affiliate CTR has been reported as `NOT MEASURABLE`.

### Impression definition

**A provider card entered the viewport** (`IntersectionObserver`, 50% threshold).

Not "the page rendered it" — a card nobody scrolled to was never an opportunity
to click, and counting it would depress the CTR of placements that work.

### Deduplication

One impression per **provider, placement, page view**, held in a ref. React
re-renders, Strict Mode's double effect, and scrolling a card out and back all
resolve to a single row. Inflation is the dangerous failure here: every
duplicate quietly lowers a real CTR.

### Privacy

Recorded: provider, country, category, placement, campaign, page path,
timestamp.

**Not recorded, and structurally unable to be:** IP, user agent, referrer,
session, or anything about a person's circumstances. Query strings are stripped
from the path before storage. Tests assert both the record type and the SQL
schema contain no such column.

### Write path

Client beacon to `/api/affiliate-impression`, then service role. **Anonymous
inserts are never granted**, matching the click-forgery hardening. The endpoint
always returns `204`, so a failure never invites a retry or reaches the visitor.

### CTR

```
affiliate module CTR = affiliate clicks / affiliate impressions
```

Kept distinct from page CTR. The query is in
`supabase/affiliate_impressions.sql`.

**Still NOT MEASURABLE until the migration runs and traffic arrives** — but the
denominator now exists.

---

## Phase 3 — Corridor modeling

**Additive. The existing model is unchanged.**

`origin_country` is added to `affiliate_provider_countries` as a **nullable**
column. Every existing row keeps working and keeps its original meaning.

| Data | Means |
| --- | --- |
| `country_code = MX`, `origin_country = NULL` | serves Mexico, no corridor claim |
| `country_code = MX`, `origin_country = US` | the US to Mexico corridor was verified |

### Resolution rules

1. An exact corridor row for the requested origin wins
2. Otherwise a destination-only row is used, and it **claims nothing about the route**
3. A corridor row for a *different* origin is never used. CA to MX is not
   evidence about US to MX
4. A malformed origin degrades to destination-only rather than verifying a corridor

**Destination verification is never upgraded into corridor verification**, no
matter how fresh it is. A test enforces exactly that.

### No fabricated corridors

The migration sets `origin_country = 'US'` on **two** rows only — Wise and
Remitly for Mexico — because official provider pages were actually read during
M-AFFILIATE3. Every other row stays `NULL`.

**Fabricated corridor assumptions: 0.**

---

## Phase 4 — Verification aging

Freshness was documented but never enforced at runtime. It is now centralized in
`lib/affiliate/freshness.ts` — the only place doing date arithmetic on
verification.

| Category | Window |
| --- | --- |
| Money transfer / remittance | 90 days |
| Travel, eSIM, insurance | 180 days |

Confirmed against `docs/M-AFFILIATE3-PROVIDER-VERIFICATION.md` before
implementing.

| State | Reader sees |
| --- | --- |
| `VERIFIED_CURRENT` | "Availability confirmed with provider" |
| `VERIFIED_STALE` | "Previously verified — confirm current availability" |
| `UNVERIFIED` | "Confirm availability with provider" |

### What aging never does

- **Never** marks a provider unavailable — age is not evidence of absence
- **Never** deletes anything
- **Never** disables a working affiliate link

A passed review date means *our checking is old*, not that the program ended. It
softens the claim, nothing more.

Edge cases: a future date is treated as **unverified** rather than extra-fresh —
a typo must not buy a year of confident language. An unparseable date is
likewise unverified.

---

## Phase 6 — Sapelee telemetry boundary (documented, not built)

```
DeportedNotDefeated  ->  aggregated telemetry  ->  Sapelee
```

**Never** the reverse. Sapelee is a consumer of exported aggregates, never a
runtime dependency. If Sapelee is unavailable, the website and affiliate routing
are unaffected, because nothing in the request path knows it exists.

### Future contract (read-only aggregates)

```
page, country, category, provider, placement
impressions, clicks, affiliate CTR
verification freshness state, corridor verification state
```

Aggregates only — never click-level rows, never anything identifying a visitor.
Nothing was integrated this milestone.

---

## Migrations requiring the operator

Both are additive and safe to run against production:

```
supabase/affiliate_corridor.sql       origin_country + indexes + 2 evidence-backed rows
supabase/affiliate_impressions.sql    affiliate_impressions table + RLS
```

The application handles their absence gracefully — corridor code treats a
missing column exactly like a NULL, and impression recording fails silently.
This is the lesson from the 2026-08-23 outage, where code shipped ahead of its
schema and took the affiliate redirects down.

---

## Test evidence

```
typecheck   exit 0, no output
tests       180 / 180 pass  (22 new)
build       Compiled successfully
lint        unavailable, no ESLint config in repo (pre-existing)
```

New suites: `corridor-and-freshness` (20), `calculator-conditional-modules`
(11), `affiliate-impressions` (11).
