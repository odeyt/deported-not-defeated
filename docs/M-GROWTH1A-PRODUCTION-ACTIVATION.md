# M-GROWTH1A.1 — Production Activation

**Date:** 2026-08-25
**PR:** #17 · **SHA:** `8a54e5a` · **origin/main:** `ffbbf1f`

---

## Migration audit

Two migrations. Both additive.

### 1. `supabase/affiliate_corridor.sql`

```
purpose:              add origin-country precision to provider availability
tables changed:       affiliate_provider_countries (1)
columns added:        origin_country (text, NULLABLE)
indexes added:        idx_provider_country_corridor (partial, WHERE origin_country IS NOT NULL)
                      idx_provider_country_origin_lookup
functions changed:    none
RLS changed:          none
grants changed:       none
destructive ops:      NONE — one `drop constraint if exists`, an idempotency
                      guard immediately followed by re-adding the constraint
backfill:             sets origin_country = 'US' on TWO rows only (wise, remitly
                      for MX), guarded by `verified_at is not null` and
                      `origin_country is null`. Evidence-backed: official
                      provider corridor pages were read in M-AFFILIATE3
rollback:             `alter table ... drop column origin_country` removes it
                      cleanly. No existing data is altered by adding it
```

### 2. `supabase/affiliate_impressions.sql`

```
purpose:              record that a provider card was actually shown
tables changed:       creates affiliate_impressions (new)
columns added:        provider_id, partner_slug, country_code, category,
                      placement, campaign, page_path, occurred_at
indexes added:        4 (occurred_at, provider, placement, country)
functions changed:    none
RLS changed:          enabled on the new table only
grants changed:       REVOKE ALL from anon on the new table
destructive ops:      NONE — one `drop policy if exists`, an idempotency guard
backfill:             none
rollback:             `drop table affiliate_impressions` — no other object
                      depends on it
```

### Destructive-operation scan

Searched both files for `DROP`, `TRUNCATE`, `DELETE`, `ALTER … DROP`, `CASCADE`,
`UPDATE`, `INSERT`, `REVOKE`, `GRANT`, `POLICY`, `SECURITY DEFINER`:

| Found | Assessment |
| --- | --- |
| `drop constraint if exists` ×1 | idempotency guard, constraint re-added on the next line |
| `drop policy if exists` ×1 | idempotency guard, policy re-created immediately |
| `update` ×1 | the 2-row evidence-backed backfill described above |
| `revoke all … from anon` ×1 | tightening, matching the click-forgery hardening |
| `create policy` ×1 | admin-read only, on the new table |
| `TRUNCATE` / `DELETE` / `CASCADE` / `ALTER … DROP COLUMN` | **none** |

**No destructive operation exists in either file.**

---

## Idempotency

Both are safe to run twice. Every statement is guarded:

```
add column if not exists          create table if not exists
create index if not exists        drop policy if exists + create policy
drop constraint if exists + add   enable row level security   (idempotent)
revoke                            (idempotent)
```

The backfill `UPDATE` is guarded by `origin_country is null`, so a second run
matches zero rows. Verified by reading each statement; not run against
production.

---

## Merge safety — why PR #17 can merge BEFORE the migrations

This was the failure on 2026-08-23, when code shipped ahead of its schema and
took every affiliate redirect down. Checked explicitly this time:

| Check | Result |
| --- | --- |
| Any query selecting `origin_country`? | **No.** `lib/affiliate/corridor.ts` is pure logic, not yet wired into `service.ts` |
| Anything reading `affiliate_impressions`? | Only `lib/affiliate/impressions.ts`, which returns `0` on any failure |
| Impression insert if the table is missing | caught, returns `0`, visitor unaffected |
| Corridor resolution if the column is missing | a missing column is treated exactly like `NULL` — destination-only |

**The application runs correctly with neither migration applied.** That is why
the deploy is not blocked on the operator.

---

## Impression semantics

```
definition:          the provider card entered the viewport
mechanism:           IntersectionObserver
threshold:           0.5  (half the block visible)
rootMargin:          default "0px" — not set
deduplication key:   providerSlug | placement | pathname
repeat behavior:     observer disconnects after the first intersection, so a
                     card cannot report twice within one page view
SPA navigation:      the component remounts, the dedup ref resets, and the new
                     page view is counted separately — which is correct
multiple identical cards: collapse to one row via the dedup key
no IntersectionObserver: falls back to counting on mount rather than losing
                     the measurement entirely
```

A recommendation far below the fold does **not** count merely because the
server rendered it. A card nobody scrolled to was never an opportunity to
click, and counting it would depress the CTR of placements that work.

### Deduplication scope

Deliberately **not** global per provider. The same provider legitimately
appearing in two different placements is two separately measurable events —
that is the whole point of measuring placement performance.

---

## Impression security

Compared against the existing click posture:

| Capability | `affiliate_clicks` (after hardening) | `affiliate_impressions` |
| --- | --- | --- |
| anon INSERT | revoked | **never granted** |
| anon SELECT | revoked | **revoked** |
| anon UPDATE / DELETE | revoked | **revoked** |
| write path | service role, server-side | service role, server-side |
| admin SELECT | `is_affiliate_admin()` | `is_affiliate_admin()` |

Anonymous users gain **no** capability on the new table. The client sends a
beacon to `/api/affiliate-impression`; the server writes. Forgery is possible
only to the same degree as any public endpoint, and the payload is validated:
slug pattern-checked, country coerced to two letters, query strings stripped
from the path, batch capped at 20.

The endpoint always returns `204` — an analytics failure must never invite a
retry or surface to a visitor.

### Privacy

Recorded: provider, country, category, placement, campaign, page path,
timestamp. **Not recorded, and structurally unable to be:** IP, user agent,
referrer, session, or anything about a person's circumstances. Tests assert
both the TypeScript record type and the SQL schema contain no such column.

---

## Calculator conditions

| Selection | Money transfer | eSIM |
| --- | --- | --- |
| neither | hidden | hidden |
| money only | **shown** | hidden |
| phone only | hidden | **shown** |
| both | **shown** | **shown** |

`familyMaySendMoney` is a stated need, never a cost input. A test asserts
toggling it produces byte-identical totals and line items. No immigration or
legal assessment reads it. No profiling is derived from it — the calculator
does not ask anything about a person's circumstances.

Travel insurance remains **excluded** on substance: nomad policies cover travel
outside your home country with only incidental home-country coverage, so they
are wrong for someone who has returned and lives there.

---

## Corridor compatibility

`origin_country = NULL` means, and continues to mean, *destination availability
with no corridor claim*. It does **not** mean unavailable.

Tested: legacy row with the field absent entirely; explicit NULL; `US → MX`
verified; unknown origin; a corridor row for a different origin (never used as
evidence); malformed origin (degrades to destination-only).

**Destination verification is never upgraded into a corridor claim**, however
fresh it is.

**Fabricated corridor mappings: 0.**

---

## Verification aging

Centralized in `lib/affiliate/freshness.ts` — the only place performing date
arithmetic on verification.

```
money transfer / remittance   90 days
travel, eSIM, insurance      180 days
```

| State | Wording |
| --- | --- |
| current | "Availability confirmed with provider" |
| stale | "Previously verified — confirm current availability" |
| unverified | "Confirm availability with provider" |

**Stale never means unavailable.** Nothing is removed, deleted, or disabled
because a date passed. A future or unparseable date is treated as *unverified*
rather than extra-fresh, so a typo cannot buy a year of confident language.

---

## CTR definition

```
Affiliate Module CTR = affiliate clicks / visible affiliate impressions
```

**Not** `clicks / pageviews`. That number is a different thing and must never
be labelled affiliate-module CTR.

Conversion rate and EPC remain **NOT MEASURABLE** — no conversion or revenue
data has ever been received from any network.

---

## Sapelee future contract (documented, not built)

```
DeportedNotDefeated  ->  aggregated telemetry  ->  Sapelee
```

Never the reverse. Sapelee is not in the request path and cannot break the site
or affiliate routing.

Aggregates only, no user-level records, no PII:

```
SEARCH:      query, page, country, device, clicks, impressions, CTR, position
COMMERCIAL:  page, country, category, provider, placement,
             affiliate impressions, affiliate clicks, affiliate CTR
CONTENT:     last reviewed, verification freshness, corridor coverage
```

---

## Decision rules for a future M-GROWTH1B

Written now so the next milestone is chosen by evidence rather than instinct.

| Signal | Action |
| --- | --- |
| meaningful impressions AND average position 5–20 | optimize the existing page |
| high impressions AND low organic CTR AND ranking high enough | review title / intent alignment |
| organic traffic AND high affiliate-module CTR AND only one approved provider | prioritize more affiliate applications |
| real query demand AND the existing page does not satisfy intent | evaluate one new page |

A keyword existing is **not** a reason to create a page.
