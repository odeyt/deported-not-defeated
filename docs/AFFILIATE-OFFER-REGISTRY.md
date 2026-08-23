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

This document and the `affiliate_providers` table describe the same
relationships in two places, for two audiences:

| | This file | `affiliate_providers` |
| --- | --- | --- |
| Audience | Operator and Claude | The running site |
| Authoritative for | Commercial terms, restrictions, verification dates, strategy, history | Runtime behaviour: what renders, what redirects, what is monetized |
| Changed by | Editing this file | The admin at `/admin/affiliate-engine` |

**Neither can monetize on its own.** Writing `Status: ACTIVE` here changes
nothing on the live site — the database gate
(`affiliate_status = 'APPROVED' AND affiliate_url IS NOT NULL AND active = true`)
is what produces a monetized link. Both must agree before a program is live.

### Status mapping

| This file | `affiliate_providers.affiliate_status` |
| --- | --- |
| PROSPECT | `NOT_APPLIED` |
| PENDING | `APPLIED` or `PENDING` |
| ACTIVE | `APPROVED` (+ affiliate URL + active) |
| REJECTED | `REJECTED` |
| PAUSED | `PAUSED` |
| RETIRED | `EXPIRED` |
| UNVERIFIED | `NOT_APPLIED` with a note explaining why |

When the two disagree, treat it as a bug to reconcile, not a decision to
interpret. Procedures: [`AFFILIATE-OPERATIONS.md`](./AFFILIATE-OPERATIONS.md).

---

# Active Offers

**None. No affiliate program has approved this site.**

Nothing on DeportedNotDefeated currently earns affiliate revenue. Every provider
link is an ordinary, non-monetized destination.

Add approved programs here.

Example format:

## [Merchant Name]

Status: ACTIVE

Category:

Countries Supported:

Target Audience:

Affiliate Network:

Commission:

Cookie Duration:

Affiliate URL:

Public Destination URL:

Restrictions:

Recommended Landing Pages:

Recommended Content Topics:

Last Verified:

Notes:

---

# Pending Applications

**None.** No application has been submitted to any network.

Add submitted affiliate applications here.

---

# Prospective Programs

Do NOT create final affiliate CTAs from this section.

All entries below are seeded in `affiliate_providers` as `NOT_APPLIED` with
`affiliate_url = NULL`. **No program below has been contacted, applied to, or
approved.** Commission rates and cookie durations are deliberately absent
because none has been established — see Rules 1 and 2.

Public destination URLs are the merchants' ordinary homepages. Per Rule 5, a
public URL is not an affiliate link and must never be recorded as one. Those
marked *unverified* were recorded from public knowledge rather than from a
source in this repository, and should be confirmed before activation.

## Strategic application queue

Order reflects expected value to this audience, not expected payout.

| # | Program | Type | Status |
| --- | --- | --- | --- |
| 1 | Travelpayouts | Network | PROSPECT |
| 2 | Wise | Merchant (via Partnerize) | PROSPECT |
| 3 | Impact | Network | PROSPECT — no provider row |
| 4 | Awin | Network | PROSPECT — no provider row |
| 5 | Airalo | Merchant | PROSPECT |
| 6 | SafetyWing | Merchant | PROSPECT |
| 7 | NordVPN | Merchant | PROSPECT |
| 8 | Surfshark | Merchant | PROSPECT |
| 9 | Coursera | Merchant | PROSPECT |
| 10 | PartnerStack | Network | PROSPECT — no provider row |

### Travelpayouts Drive — installed 2026-08-23

The Drive script (partner marker `565661`) is installed site-wide via
`components/TravelpayoutsDrive.tsx`.

**Installing Drive is an onboarding step, not an approval.** Travelpayouts stays
`PROSPECT` here and `NOT_APPLIED` in the database until the operator confirms the
program has actually approved this site.

Drive is Travelpayouts' own monetization tooling and runs **outside** the
`/go/[slug]` engine. Anything it injects or rewrites on a page is not covered by
the engine's approval gate, click tracking, ranking rules, or disclosure
placement. Check what it actually renders on a live page before relying on it,
and if it starts inserting commercial links, make sure a disclosure sits near
them.

## Money transfer

| Merchant | Slug | Public URL | Notes |
| --- | --- | --- | --- |
| Wise | `wise` | https://wise.com | Runs through Partnerize — confirm before applying. Requires a recipient bank account. |
| Remitly | `remitly` | https://www.remitly.com | Cash pickup, bank deposit, mobile wallet. |
| Western Union | `western-union` | https://www.westernunion.com | Widest cash pickup network. |
| MoneyGram | `moneygram` | https://www.moneygram.com | Large agent network. |
| WorldRemit | `worldremit` | https://www.worldremit.com | Strong mobile wallet coverage. |
| Ria Money Transfer | `ria` | https://www.riamoneytransfer.com | URL unverified. |
| Paysend | `paysend` | https://paysend.com | URL unverified. |
| Xe Money Transfer | `xe` | https://www.xe.com | URL unverified. |

The first five are `active = true` in the database and render as ordinary
non-monetized resource links. That is deliberate: this site already recommends
them in existing content, and it fixes redirect slugs that previously
dead-ended.

## Travel

| Merchant | Slug | Public URL | Notes |
| --- | --- | --- | --- |
| Travelpayouts | `travelpayouts` | https://www.travelpayouts.com | Network, not a consumer brand. Priority #1. |
| Booking.com | `booking-com` | https://www.booking.com | URL unverified. |
| Agoda | `agoda` | https://www.agoda.com | Strong Asia-Pacific coverage. URL unverified. |
| Trip.com | `trip-com` | https://www.trip.com | URL unverified. |
| Hostelworld | `hostelworld` | https://www.hostelworld.com | Budget accommodation. URL unverified. |
| Kiwi.com | `kiwi` | https://www.kiwi.com | URL unverified. |
| Discover Cars | `discover-cars` | https://www.discovercars.com | URL unverified. |
| GetYourGuide | `getyourguide` | https://www.getyourguide.com | Tours and airport transfers. URL unverified. |
| Viator | `viator` | https://www.viator.com | URL unverified. |
| Klook | `klook` | https://www.klook.com | URL unverified. |

## Connectivity, insurance, privacy, education

| Merchant | Slug | Public URL | Category |
| --- | --- | --- | --- |
| Airalo | `airalo` | https://www.airalo.com | eSIM |
| Holafly | `holafly` | https://esim.holafly.com | eSIM |
| SafetyWing | `safetywing` | https://safetywing.com | Travel insurance |
| NordVPN | `nordvpn` | https://nordvpn.com | VPN — typically via Impact |
| Surfshark | `surfshark` | https://surfshark.com | VPN — typically via Impact |
| Coursera | `coursera` | https://www.coursera.org | Education. URL unverified. |
| Udemy | `udemy` | https://www.udemy.com | Career training. URL unverified. |

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

**Registry last reviewed:** 2026-08-23
**Active programs:** 0 · **Pending:** 0 · **Prospects:** 25 · **Rejected/Retired:** 0
