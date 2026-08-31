# DeportedNotDefeated Affiliate Offer Registry

This file is the source of truth for affiliate relationships.

Claude must NEVER convert a PROSPECT, PENDING, or UNVERIFIED program into
an ACTIVE program without operator confirmation.

---

## Status Definitions

### ACTIVE
Application approved and affiliate tracking available.

### PENDING
Application submitted but awaiting decision.

### PROSPECT
Potential affiliate relationship worth investigating.

### REJECTED
Application declined.

### PAUSED
Previously usable but temporarily disabled.

### RETIRED
Do not use anymore.

### UNVERIFIED
Current status has not been established.

---

## Relationship to the database registry

This document and the `affiliate_partners` table describe the same
relationships in two places, for two audiences:

| | This file | `affiliate_partners` |
| --- | --- | --- |
| Audience | Operator and Claude | The running site |
| Authoritative for | Commercial terms, restrictions, verification dates, strategy, history | Runtime behaviour: what renders, what redirects, what is monetized |
| Changed by | Editing this file | The admin at `/admin/affiliates` |

`affiliate_partners` is the single provider registry. `affiliate_providers` is a
read-only **view** over it using the M-AFFILIATE-1 field names — there is no
second provider table, deliberately, so a provider cannot exist twice with
different states.

**Neither can monetize on its own.** Writing `Status: ACTIVE` here changes
nothing on the live site — the database gate
(`affiliate_status = 'approved'` AND an affiliate URL AND `active = true`)
is what produces a monetized link. Both must agree before a program is live.

### Status mapping

| This file | `affiliate_partners.affiliate_status` |
| --- | --- |
| PROSPECT | `not_applied` |
| PENDING | `applied` or `pending` |
| ACTIVE | `approved` (+ affiliate URL + active) |
| REJECTED | `rejected` |
| PAUSED | `paused` |
| RETIRED | `expired` |
| UNVERIFIED | `not_applied` with a note explaining why |

When the two disagree, treat it as a bug to reconcile, not a decision to
interpret. Procedures: [`AFFILIATE-OPERATIONS.md`](./AFFILIATE-OPERATIONS.md).

---

# Active Offers

**Three programs are live and earning.** Verified directly against the
production database on 2026-08-23.

> An earlier version of this file stated that no program had approved this site
> and listed Wise and SafetyWing as prospects. That was wrong: it was inferred
> from the repository's seed files, which show every provider as `pending`,
> rather than from production, which had diverged. Corrected here.

The affiliate URLs themselves are **not** recorded in this file. They live in
`affiliate_partners.affiliate_url` and are visible in the admin. Copying a
tracking URL into version control invites it going stale in one place while the
database moves on.

## Wise

Status: ACTIVE

Category: MONEY_TRANSFER

Countries Supported: Not yet recorded per country — no `affiliate_provider_countries` rows exist yet

Target Audience: Families sending money to a recipient who has a bank account

Affiliate Network: Not recorded in the database. Wise commonly runs through Partnerize — confirm in the account before relying on it.

Commission: Not established. Do not estimate.

Cookie Duration: Not established.

Affiliate URL: Stored in the database. Live.

Public Destination URL: https://wise.com

Restrictions: Not yet reviewed against the program terms.

Recommended Landing Pages: `/resources/money-transfer`, the `receive-money-usa-to-*` country pages

Recommended Content Topics: Bank-deposit transfers, mid-market exchange rates, multi-currency accounts

Last Verified: 2026-08-23 (status confirmed in production; program terms NOT reviewed)

Notes: Recipient bank account required, so this is a poor fit for cash-pickup corridors. Rank accordingly rather than by payout.

## SafetyWing

Status: ACTIVE

Category: TRAVEL_INSURANCE / HEALTH_INSURANCE

Countries Supported: Not yet recorded per country

Target Audience: People living abroad long-term, and family travelling to visit

Affiliate Network: Ambassador programme (per the implementation notes). Confirm in the account.

Commission: Not established. Do not estimate.

Cookie Duration: Not established.

Affiliate URL: Stored in the database. Live.

Public Destination URL: https://safetywing.com

Restrictions: Not yet reviewed against the program terms.

Recommended Landing Pages: `/resources/health-insurance`, `/family-visit-travel`

Recommended Content Topics: Travel medical cover, long-stay insurance

Last Verified: 2026-08-23 (status confirmed in production; program terms NOT reviewed)

Notes: Insurance claims are regulated and consequential. Never state what a policy covers — link out and let the provider's own terms speak.

## NumeroMoney

Status: PAUSED

Category: PHONE_INTERNET (corrected 2026-08-31 — the checked-in seed file still lists `ESIM`, but production's `canonical_category` was already `PHONE_INTERNET` by the time this was verified; the seed file was never updated to match)

Countries Supported: Not yet recorded per country

Target Audience: Family travelling to visit a loved one abroad

Affiliate Network: Direct referral code

Commission: Not established. Do not estimate.

Cookie Duration: Not established.

Affiliate URL: Stored in the database. `affiliate_status` remains `approved` — this is a temporary pause, not a retirement.

Public Destination URL: https://numero.app

Restrictions: Not yet reviewed against the program terms.

Recommended Landing Pages: `/family-visit-travel`

Recommended Content Topics: eSIM before arrival, staying reachable while travelling

Last Verified: 2026-08-31 — paused, see below.

Notes: The hardcoded referral link previously at `app/family-visit-travel/page.tsx:265` no longer exists; that page now renders NumeroMoney through the standard `<AffiliateRecommendations category="PHONE_INTERNET">` block, routed through `/go/numeromoney` like every other provider.

**2026-08-31: Paused.** `https://numero.app` is currently unreachable — the TLS handshake fails with an `internal_error` alert (verified independently via curl and OpenSSL, reproducible across retries and with/without SNI), and plain HTTP returns `405 Not Allowed` from the AWS load balancer in front of it. This is an outage on NumeroMoney's own infrastructure, not anything in this codebase. Set `active = false` on the `affiliate_partners` row (via the Supabase SQL editor) and redeployed production, so `/go/numeromoney` now falls back to `/resources` instead of dead-ending on a broken TLS connection, and the card no longer renders on `/family-visit-travel`. Re-enable with `update affiliate_partners set active = true, updated_at = now() where slug = 'numeromoney';` once NumeroMoney confirms their site is back up — no other row was touched.

---

# Pending Applications

**None recorded.** Eight providers sit at `pending` in the database
(airalo, genki, holafly, moneygram, nordvpn, remitly, surfshark, worldremit),
all with no affiliate URL. Whether any of those represents a submitted
application or simply a seeded default is **not established** — treat them as
UNVERIFIED until the operator confirms.

Add submitted affiliate applications here.

---

# Prospective Programs

Do NOT create final affiliate CTAs from this section.

Every entry below is seeded by `supabase/affiliate_engine_m1.sql` as
`affiliate_status = 'not_applied'`, `affiliate_url = NULL`,
`placement_type = 'editorial'`. **None has been contacted, applied to, or
approved.** Commission rates and cookie durations are absent because none has
been established — see Rules 1 and 2.

Public destination URLs are the merchants' ordinary homepages. Per Rule 5, a
public URL is not an affiliate link and must never be recorded as one. Verify
each before activating the provider.

## Strategic application queue

Order reflects expected value to this audience, not expected payout.

| # | Program | Type | Status |
| --- | --- | --- | --- |
| 1 | Travelpayouts | Network | PROSPECT — Drive script installed, see below |
| 2 | Wise | Merchant | **ACTIVE** — already approved, see Active Offers |
| 3 | Impact | Network | PROSPECT — network account, no provider row |
| 4 | Awin | Network | PROSPECT — network account, no provider row |
| 5 | Airalo | Merchant | UNVERIFIED — row exists at `pending`, no URL |
| 6 | SafetyWing | Merchant | **ACTIVE** — already approved, see Active Offers |
| 7 | NordVPN | Merchant | UNVERIFIED — row exists at `pending`, no URL |
| 8 | Surfshark | Merchant | UNVERIFIED — row exists at `pending`, no URL |
| 9 | Coursera | Merchant | PROSPECT |
| 10 | PartnerStack | Network | PROSPECT — network account, no provider row |

### Travelpayouts Drive — installed 2026-08-23

The Drive script (partner marker `565661`) is installed site-wide via
`components/TravelpayoutsDrive.tsx`.

**Installing Drive is an onboarding step, not an approval.** Travelpayouts stays
`PROSPECT` here and `not_applied` in the database until the operator confirms
the program has actually approved this site.

Drive is Travelpayouts' own monetization tooling and runs **outside** the
`/go/[slug]` engine. Anything it injects or rewrites on a page is not covered by
the engine's approval gate, click tracking, ranking rules, or disclosure
placement. Check what it actually renders on a live page, and if it starts
inserting commercial links, make sure a disclosure sits near them.

## Seeded prospects

29 providers, all `not_applied`. `Pri` is the seeded global priority — an
editorial ordering hint, never derived from commission.

| Merchant | Slug | Category | Public URL | Pri |
| --- | --- | --- | --- | --- |
| Ria Money Transfer | `ria` | MONEY_TRANSFER | https://www.riamoneytransfer.com | 70 |
| Paysend | `paysend` | MONEY_TRANSFER | https://paysend.com | 60 |
| Xe Money Transfer | `xe` | MONEY_TRANSFER | https://www.xe.com | 60 |
| OFX | `ofx` | MONEY_TRANSFER | https://www.ofx.com | 50 |
| Xoom | `xoom` | MONEY_TRANSFER | https://www.xoom.com | 55 |
| Payoneer | `payoneer` | MONEY_TRANSFER | https://www.payoneer.com | 45 |
| Instarem | `instarem` | MONEY_TRANSFER | https://www.instarem.com | 45 |
| Western Union | `western-union` | MONEY_TRANSFER | https://www.westernunion.com | 75 |
| TapTap Send | `taptap-send` | MONEY_TRANSFER | https://www.taptapsend.com | 40 |
| LemFi | `lemfi` | MONEY_TRANSFER | https://www.lemfi.com | 40 |
| Small World | `small-world` | MONEY_TRANSFER | https://www.smallworldfs.com | 35 |
| Revolut | `revolut` | MONEY_TRANSFER | https://www.revolut.com | 40 |
| Skrill | `skrill` | MONEY_TRANSFER | https://www.skrill.com | 30 |
| Panda Remit | `panda-remit` | MONEY_TRANSFER | https://www.pandaremit.com | 30 |
| Airtm | `airtm` | MONEY_TRANSFER | https://www.airtm.com | 30 |
| Grey | `grey` | MONEY_TRANSFER | https://www.grey.co | 30 |
| ACE Money Transfer | `ace` | MONEY_TRANSFER | https://acemoneytransfer.com | 30 |
| Travelpayouts | `travelpayouts` | FLIGHTS | https://www.travelpayouts.com | 90 |
| Booking.com | `booking` | HOTELS | https://www.booking.com | 85 |
| Agoda | `agoda` | HOTELS | https://www.agoda.com | 80 |
| Trip.com | `trip-com` | HOTELS | https://www.trip.com | 70 |
| Hostelworld | `hostelworld` | HOSTELS | https://www.hostelworld.com | 70 |
| Kiwi.com | `kiwi` | FLIGHTS | https://www.kiwi.com | 70 |
| Discover Cars | `discover-cars` | CAR_RENTAL | https://www.discovercars.com | 70 |
| GetYourGuide | `getyourguide` | TOURS | https://www.getyourguide.com | 70 |
| Viator | `viator` | TOURS | https://www.viator.com | 65 |
| Klook | `klook` | TOURS | https://www.klook.com | 65 |
| Coursera | `coursera` | EDUCATION | https://www.coursera.org | 70 |
| Udemy | `udemy` | CAREER_TRAINING | https://www.udemy.com | 60 |

## Already in the database, status unclear

Eight rows predate this registry and sit at `pending` with no affiliate URL:
**airalo, genki, holafly, moneygram, nordvpn, remitly, surfshark, worldremit**.

Whether `pending` means "application submitted" or is simply the old seed
default is **not established**. Treat them as UNVERIFIED and confirm each
against the network account before changing anything.

The migration deliberately does not re-seed these, nor SafetyWing — inserting a
second row for a provider that already exists would fork its identity, and in
SafetyWing's case would fork a live, earning relationship.

## Not yet in the registry

Named in strategy documents but with no provider row and no research done:
**TEFL/TESOL providers**, resume tools, translation services, shipping,
business tools, and legal services. Status: UNVERIFIED.

---

# Rejected / Retired Programs

**None.** No application has been declined, and no program has been
discontinued.

Keep historical records here so Claude does not repeatedly recommend
programs that were already rejected or discontinued.

---

# Rules

1. Never fabricate commission rates.
2. Never fabricate cookie durations.
3. Never fabricate country availability.
4. Never fabricate tracking links.
5. Never substitute a public merchant URL for an affiliate URL and call it
   an affiliate link.
6. Verify time-sensitive terms before major campaigns.
7. Prefer offers genuinely useful to the DeportedNotDefeated audience.
8. Record the date each program was last verified.

---

**Registry last reviewed:** 2026-08-31
**Active:** 2 (wise, safetywing) · **Paused:** 1 (numeromoney — destination site unreachable, see entry above) · **Unverified/pending rows:** 8 · **Prospects seeded:** 29 · **Rejected/Retired:** 0
