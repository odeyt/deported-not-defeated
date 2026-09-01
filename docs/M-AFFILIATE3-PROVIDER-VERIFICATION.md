# M-AFFILIATE3 — Provider Verification & Application Operations

**Date:** 2026-08-24
**Starting SHA:** `6caf02b`
**Production database:** modified (verification metadata only — no approvals, no URLs)

---

## The finding that changes a recommendation I made

In M-AFFILIATE2 I called adding a **SafetyWing Mexico row** "the best effort-to-revenue ratio
available" and recommended it twice. **That advice was wrong, and I did not create the row.**

SafetyWing Nomad Insurance is travel medical insurance designed for people travelling *outside*
their home country. Their policy documentation provides only **"Incidental Home Country
Coverage"**, and SafetyWing's own material describes the product as intended for nomads travelling
abroad rather than for use when returning home.

For this site that distinction is the whole ballgame:

| Audience | Appropriate? |
| --- | --- |
| A person **deported to Mexico**, now living in their home country | **Likely not** — this is home-country residence, not travel abroad |
| **US family visiting** Mexico | Plausibly yes — ordinary travel outside their home country |

Had I created a blanket Mexico row as I recommended, an insurance product would have been
surfaced to returnees whose situation it likely does not cover — on a YMYL topic, to people with
no financial cushion. §3 of this milestone specifically warned against inferring product coverage
from affiliate approval. It was right to.

**Action taken: none.** No SafetyWing Mexico row was created. Before one is, an operator should
confirm with SafetyWing directly whether any product is appropriate for a returnee residing in
Mexico, and if travel-only, the row should be scoped to family-visit contexts rather than to
Mexico rebuilding pages.

---

## Verification results

Standard applied: **Tier 1** (provider's own published pages) required for `PROVIDER_VERIFIED`.
Third-party affiliate directories are Tier 3 and were never used to verify availability.

### Money transfer — USA → Mexico corridor

| Provider | Corridor verified | Payout methods documented | Evidence | Status |
| --- | --- | --- | --- | --- |
| **Wise** | ✅ **PROVIDER_VERIFIED** | Bank deposit in MXN only. **No cash pickup documented** | `wise.com/us/send-money/send-money-to-mexico` | approved, earning |
| **Remitly** | ✅ **PROVIDER_VERIFIED** | Cash pickup, bank deposit, and mobile wallet. The reviewed official corridor page lists Elektra, BanCoppel, Walmart, Santander, HSBC, Scotiabank, OXXO, Farmacias Guadalajara, and Banorte; it does not map each provider to a method. | `remitly.com/us/en/money-transfer/send-money-to-mexico` | not monetized |
| Western Union | Not verified this pass | — | — | not applied |
| MoneyGram | Not verified this pass | — | — | `pending` (origin unknown) |
| Xoom | Not verified this pass | — | — | not applied |
| Ria | Not verified this pass | — | — | not applied |
| Small World | Not verified this pass | — | — | not applied |
| Airtm | Not verified this pass | — | — | not applied |

**The most commercially significant fact in this milestone:**

> **Wise — the only monetized provider on the Mexico page — does not document cash pickup.
> Remitly, which we earn nothing from, does.**

A large share of this audience has no Mexican bank account on arrival. For those readers the
provider we earn from is the one they cannot use, and the one that fits is unmonetized. That is
not a ranking problem to fix by promoting Wise — the ranking is correct on the merits. It is an
**approval** problem, and it is why Remitly sits at the top of the application queue.

### Affiliate programs — availability is a separate fact from service availability

| Provider | Program exists | Type | Network | Evidence tier |
| --- | --- | --- | --- | --- |
| **Remitly** | ✅ yes | NETWORK APPLICATION | **Impact** | Tier 1 — own partner page links to Impact signup |
| **Airalo** | ✅ yes | NETWORK APPLICATION | **Impact** | Tier 1 — [official affiliate-program page](https://www.airalo.com/m/resources/airalo-affiliate-program/) |
| **Holafly** | ✅ yes | NETWORK APPLICATION | Impact / Awin / ShareASale | Tier 2 |
| **Travelpayouts** | ✅ yes | NETWORK APPLICATION | Travelpayouts | Tier 1 — own site, open signup |
| **Western Union** | ✅ likely | NETWORK APPLICATION | **Partnerize** | Tier 1 domain (a Partnerize quick-start PDF is hosted on westernunion.com), but the page found is the **GB** program — a US program is unconfirmed |
| MoneyGram | ❓ unconfirmed | — | — | insufficient |
| **Xoom** | ❌ **NO PUBLIC PUBLISHER PROGRAM FOUND** | — | — | PayPal consumer referral schemes are not publisher affiliation |
| Ria | ❓ unconfirmed | — | — | insufficient |

As observed on 2026-09-01, [Remitly's official partner page](https://www.remitly.com/us/en/landing/partner-program)
publishes a USD $5–$20 commission range per referral depending on send corridor and a 30-day
referral-click attribution window. This is public program language, not expected earnings, final
campaign terms, or proof of approval. Promotion restrictions, reversals, clawbacks, and termination
terms remain unverified pending official terms review.

---

## Production changes made

Verification metadata only. **No approval state was changed, no affiliate URL was added, and no
provider was monetized.**

```sql
-- Corridor verification, with source and date in the notes
affiliate_provider_countries (wise, MX)     verified_at = 2026-08-24
affiliate_provider_countries (remitly, MX)  verified_at = 2026-08-24

-- Network metadata, from Tier 1/2 evidence
affiliate_partners.network  remitly        = impact
                            airalo         = impact
                            holafly        = impact
                            western-union  = partnerize
```

Verified provider-country rows: **0 → 2** (of 113).
Approved providers: **unchanged** — wise, safetywing, numeromoney.

---

## Verification age policy

Availability changes. Adopted:

| Category | Review interval |
| --- | --- |
| Money transfer / remittance | 90 days |
| Travel, eSIM, insurance | 180 days |

A row past its interval should read *"Previously verified — check current availability"* rather
than silently continuing to claim verified status. **Stale verification must not disable a working
affiliate link** — a passed review date is not evidence that a program ended.

Not yet automated. Both current rows are due for review by **2026-11-22**.

---

## Revenue gap — Mexico

| Metric | Value |
| --- | --- |
| Money-transfer providers displayed | 8 |
| Corridor-verified | 2 |
| Affiliate-approved | 1 (Wise) |
| Monetized | 1 |
| Approved **and** fitting the no-bank-account case | **0** |

Total affiliate clicks recorded in production: **313**, of which most predate the engine and carry
no country or category. Sample is far too small for CTR or conversion inference, and there is no
conversion data at all.

**EPC, conversion rate, and revenue per click: NOT MEASURABLE YET.** Clicks alone cannot produce
them, and inventing a denominator would be worse than reporting nothing.

---

## Country expansion priority — data only, no pages built

Ranked on existing content depth × provider coverage × remittance relevance. **This is not a
recommendation to build now** — see the milestone verdict.

| # | Country | Content depth | Case |
| --- | --- | --- | --- |
| 1 | Mexico | 9 pages | Already the pilot; finish monetizing before copying |
| 2 | Guatemala | 9 pages | Large US remittance corridor, existing depth |
| 3 | El Salvador | 9 pages | Same corridor profile, USD economy simplifies transfers |
| 4 | Philippines | 9 pages | Very large remittance corridor; strong eSIM/travel fit |
| 5 | Honduras | hub only | Large corridor, thin content |
| 6 | Laos | 18 pages | Deepest content on the site, smaller corridor |
| 7 | Cambodia | 9 pages | Existing depth, moderate corridor |
| 8 | Vietnam | 9 pages | Existing depth, growing corridor |
| 9 | Dominican Republic | hub only | Large corridor, thin content |
| 10 | Colombia | hub only | Growing corridor, thin content |

Every one of these has the same bottleneck Mexico has: providers display, almost none are approved.
Expansion multiplies pages, not revenue.

---

## Operator actions

All **OPERATOR ACTION REQUIRED** — they need identity, tax details, bank details, and contract
acceptance.

1. **Check whether an Impact account already exists.** `app/layout.tsx` carries an
   `impact-site-verification` tag, which is how a property is verified inside Impact. If the
   account exists, Remitly + Airalo + Holafly + NordVPN/Surfshark are in-network applications.
2. **Apply to Remitly** via Impact. Highest-value single approval available — it is the provider
   that fits the no-bank-account case.
3. **Sign up to Travelpayouts.** Open signup, no stated traffic threshold, and the Drive script is
   already installed.
4. **Apply to Airalo** via Impact.
5. **Confirm SafetyWing product suitability** for a returnee residing in Mexico before any Mexico
   row is created.
6. **Load `/admin/affiliates`** while signed in — still the one production path never manually
   confirmed.
7. **Establish whether Remitly/MoneyGram/NordVPN/Surfshark `pending` states are real.** They may
   be seed defaults. If no application was ever submitted, they should be `not_applied`.

Full packets: [`AFFILIATE-APPLICATION-QUEUE.md`](./AFFILIATE-APPLICATION-QUEUE.md).
