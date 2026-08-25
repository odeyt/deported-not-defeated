# Affiliate Measurement Baseline

What affiliate impression data may be used for, and from when.

---

## Current status

```
AFFILIATE CTR BASELINE START = NOT YET ESTABLISHED
```

It is set only after production verification of provider-level semantics
passes. Until then, no affiliate CTR figure should be quoted from this table.

---

## Pre-baseline data — DO NOT USE FOR CTR

Every `affiliate_impressions` row written before the corrected semantics
deployed is **PRE-BASELINE / VERIFICATION DATA**.

It is not deleted. It is honest evidence that the write path works, and it
records what the old implementation actually did. It is simply not a
measurement of what readers saw.

### Why it is unusable

One calculator interaction on 2026-08-25 produced ~20 `MONEY_TRANSFER` rows
sharing a single timestamp:

```
2026-08-25 03:48:12.566288+00
```

for worldremit, moneygram, remitly, ria, paysend, xe, ofx, xoom, payoneer,
instarem, taptap-send, lemfi, small-world, revolut, skrill, panda-remit,
airtm, grey, ace, western-union.

Two facts make those rows meaningless as impressions:

1. **The reader had not scrolled to most of those cards.** One
   `IntersectionObserver` watched the whole grid; when the grid became visible
   it flushed every provider in the array at once. The rows describe array
   membership, not visibility.
2. **Wise is absent** despite being rendered. The batch was truncated at 20 and
   Wise was the 21st provider — so the one monetized provider in the list was
   the single one that could not be measured.

Using this data would understate CTR for every provider that was never seen,
and would report zero impressions for the only provider that earns.

### Identifying pre-baseline rows

```sql
select count(*) as pre_baseline_rows
  from affiliate_impressions
 where occurred_at < '<AFFILIATE CTR BASELINE START>';
```

Rows sharing an identical timestamp are a reliable fingerprint of the old
grid-level behaviour:

```sql
select occurred_at, count(*) as providers_in_one_event
  from affiliate_impressions
 group by occurred_at
having count(*) > 3
 order by occurred_at desc;
```

Under the corrected semantics, cards enter the viewport at different moments,
so large identical-timestamp clusters should stop appearing. Small clusters are
expected and correct: several cards scrolled past together are coalesced into
one request for transport, but only after each card individually satisfied the
visibility rule.

---

## Corrected semantics

```
Tracking node:        one wrapper per provider card
Visibility threshold: 0.5  (VISIBILITY_RATIO)
rootMargin:           "0px"
Visibility rule:      at least half the card in the viewport; for a card taller
                      than the viewport, at least half the viewport covered
Provider-level:       YES — one card, one impression
Deduplication:        provider | page | placement | category | campaign
Provider cap:         NONE — oversized queues chunk, never truncate
```

### What an impression is

**That specific provider's card became meaningfully visible.**

Not: the provider existed in the array. Not: the grid became visible. Not: the
server rendered it. Not: it was among the first N records.

A reader who opens the calculator and sees three cards generates three
impressions. The other eighteen were never an opportunity to click, and
counting them would depress the CTR of placements that work.

### Deduplication scope

One impression per provider, per page, per placement, per category, per
campaign, for the document lifetime. Scrolling a card out of view and back is
one impression. The dedup set lives in a shared module rather than a
per-component ref, so it survives a card unmounting and remounting.

The same provider in a genuinely different placement stays independently
measurable — `wise / calculator-result` and `wise / comparison-top` are two
different facts. Wise is never globally suppressed.

---

## Valid CTR query, after the baseline is set

```sql
select
  i.partner_slug,
  i.placement,
  count(*) filter (where true)                      as impressions,
  (select count(*) from affiliate_clicks c
    where c.partner_slug = i.partner_slug
      and c.placement    = i.placement
      and c.occurred_at >= '<AFFILIATE CTR BASELINE START>') as clicks
from affiliate_impressions i
where i.occurred_at >= '<AFFILIATE CTR BASELINE START>'
group by i.partner_slug, i.placement
order by impressions desc;
```

```
Affiliate module CTR = affiliate clicks / visible affiliate impressions
```

**Not** clicks / pageviews. That is a different number and must never be
labelled affiliate-module CTR.

Conversion rate and EPC remain **NOT MEASURABLE** — no conversion or revenue
data has ever been received from any network.

---

## History

| Date | Event |
| --- | --- |
| 2026-08-25 | Impressions table created; write path proven (`204`, rows inserted) |
| 2026-08-25 | Grid-level semantics found incorrect; all prior rows marked pre-baseline |
| 2026-08-25 | Provider-level semantics implemented (M-GROWTH1A.4) |
| — | Baseline start recorded here once production verification passes |
