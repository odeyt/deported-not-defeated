# Affiliate Provider Verification Queue

**Purpose:** track which provider–country availability claims have been confirmed against the
provider's own published information, and which are still editorial research.

**Why it matters:** the site currently holds **113 provider–country rows, none of them verified.**
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

Today every row is UNVERIFIED or EDITORIALLY_RESEARCHED. **Nothing is PROVIDER_VERIFIED.**

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

Mexico has **8 provider rows, 0 verified**. Ordered by likely commercial value: the money-transfer
corridor is the largest and is what most Mexico traffic already arrives asking about.

| # | Provider | Category | Availability | Affiliate status | Action required |
| --- | --- | --- | --- | --- | --- |
| 1 | **Wise** | Money transfer | Unverified (priority 30) | **approved — earning** | Confirm MX corridor on Wise's own site. This is the only monetized money-transfer provider, and it is ranked 7th of 8 — verify, then set priority deliberately. |
| 2 | **Remitly** | Money transfer | Unverified (priority 80) | `pending` | Confirm corridor, then chase the application. High-volume US→MX service; likely the single most valuable approval available. |
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

> **SafetyWing is approved and earning but has no Mexico availability row**, so it cannot appear on
> any Mexico page. Adding that row is a few minutes of work against a live earning program — the
> best effort-to-revenue ratio in this table.

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

**Last reviewed:** 2026-08-24 · **Verified rows:** 0 of 113
