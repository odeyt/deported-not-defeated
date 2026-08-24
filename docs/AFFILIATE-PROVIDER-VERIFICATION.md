# Affiliate Provider Verification Queue

**Purpose:** track which provider–country availability claims have been confirmed against the
provider's own published information, and which are still editorial research.

**Why it matters:** the site holds **113 provider–country rows, 2 of them verified** (Wise and Remitly for Mexico, both Tier 1, M-AFFILIATE3).
Until a row is verified, visitors see a *"Confirm availability with provider"* note, and the
provider cannot be presented as definitively available. Working through this queue is what turns
a hedge into a recommendation — it is the highest-value manual task available.

**Rule:** never mark a row verified from an affiliate network's marketing copy. Networks describe
what they would like to be true. Use the provider's own corridor or country page.

---

## Verification states

Recorded in `affiliate_provider_countries.verified_at` (NULL = unverified) plus the provider's
`affiliate_status`.

| State | Meaning | UI treatment |
| --- | --- | --- |
| **UNVERIFIED** | No confirmation attempted | "Confirm availability with provider" |
| **EDITORIALLY_RESEARCHED** | Sourced from our own research or existing site content | Same hedge; `availability_notes` records the source |
| **PROVIDER_VERIFIED** | Confirmed on the provider's own published corridor/country page | May state availability plainly |
| **API_VERIFIED** | Confirmed programmatically against a provider API | May state availability plainly |
| **UNAVAILABLE** | Provider confirmed as not serving this corridor | `available = false`; excluded from results |

As of 2026-08-24: **2 rows are PROVIDER_VERIFIED** (wise/MX, remitly/MX). The other 111 remain UNVERIFIED or EDITORIALLY_RESEARCHED.

### What counts as evidence

Acceptable, strongest first:

1. Provider's official corridor page ("send money to Mexico")
2. Provider's official country/coverage list
3. Provider's official program or partner documentation
4. Provider API response

Not acceptable on its own:

- affiliate network marketing pages
- comparison-site claims
- our own previous editorial research

Record the URL and the date in `availability_notes`, then set `verified_at`.

---

## Mexico queue — ranked by revenue potential

Mexico has **8 provider rows, 2 verified**. Ordered by likely commercial value: the money-transfer
corridor is the largest and is what most Mexico traffic already arrives asking about.

| # | Provider | Category | Availability | Affiliate status | Action required |
| --- | --- | --- | --- | --- | --- |
| 1 | **Wise** | Money transfer | ✅ **PROVIDER_VERIFIED** 2026-08-24 | **approved — earning** | Bank deposit only, **no cash pickup documented**. Review by 2026-11-22. |
| 2 | **Remitly** | Money transfer | ✅ **PROVIDER_VERIFIED** 2026-08-24 | `pending` (origin unverified) | Cash pickup + bank + wallet. Program exists via **Impact**. **Highest-value approval available.** |
| 3 | **Western Union** | Money transfer | Unverified (priority 100) | `not_applied` | Confirm corridor and OXXO payout, then apply. Currently ranked first and earns nothing. |
| 4 | **MoneyGram** | Money transfer | Unverified (priority 90) | `pending` | Confirm corridor, chase application. |
| 5 | **Xoom** | Money transfer | Unverified (priority 70) | `not_applied` | Confirm corridor. PayPal-owned; check whether a program exists. |
| 6 | **Ria** | Money transfer | Unverified (priority 60) | `not_applied` | Confirm corridor and payout network. |
| 7 | **Small World** | Money transfer | Unverified (priority 50) | `not_applied` | Confirm corridor. |
| 8 | **Airtm** | Money transfer | Unverified (priority 10) | `not_applied` | Confirm relevance — the model differs from ordinary remittance. |

### Not yet represented for Mexico

These categories have no Mexico rows at all, so nothing renders for them on Mexico pages:

| Category | Why it matters for Mexico | Suggested first providers |
| --- | --- | --- |
| **eSIM** | Family visiting; arrivals needing a working phone on day one | Airalo, Holafly (both in the registry, no MX rows) |
| **Travel insurance** | Family travelling from the US | SafetyWing (**already approved and earning** — add MX rows) |
| **Flights / hotels** | The "visit your loved one" journey | Travelpayouts network first |
| **Car rental / transfers** | Airport arrival | Discover Cars |

> **SafetyWing has no Mexico row — and M-AFFILIATE3 found that is probably correct.** Nomad
> Insurance provides only incidental home-country coverage, so it is likely inappropriate for a
> returnee living in Mexico, whatever the affiliate status says. An earlier version of this file
> called adding the row the best available quick win. That was wrong. Confirm product suitability
> with SafetyWing before creating it, and scope it to family-visit contexts if it is travel-only.

---

## How to verify a row

1. Find the provider's own corridor page.
2. Confirm the destination country is listed.
3. In `/admin/affiliates`, open the provider → Country Availability.
4. Put the source URL and today's date in the notes.
5. Tick **Verified**.

Or in SQL:

```sql
update affiliate_provider_countries
   set verified_at = current_date,
       availability_notes = 'Confirmed on <provider URL>, checked 2026-08-24'
 where country_code = 'MX'
   and provider_id = (select id from affiliate_partners where slug = 'wise');
```

**Do not tick Verified to make the badge disappear.** The badge is the honest state until someone
has actually checked.

---

## Ranking note

Verification does not change ranking, and neither does commission. Ranking is country priority,
then global priority, then trust score. If verifying a provider makes you want to rank it higher,
change the priority for a reason you could defend to a visitor — not because it pays.

**Last reviewed:** 2026-08-24 · **Verified rows:** 2 of 113

> **Updated by M-AFFILIATE3.** Wise and Remitly now carry Tier 1 corridor verification for
> Mexico. The SafetyWing Mexico row recommended in M-AFFILIATE2 was **not** created: its Nomad
> Insurance provides only incidental home-country coverage, so it is likely inappropriate for a
> returnee residing in Mexico. See [`M-AFFILIATE3-PROVIDER-VERIFICATION.md`](./M-AFFILIATE3-PROVIDER-VERIFICATION.md).
