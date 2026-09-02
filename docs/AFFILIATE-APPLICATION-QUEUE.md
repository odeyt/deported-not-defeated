# Affiliate Application Queue

**For the operator.** Ranked list of affiliate applications, with everything needed to complete each
one. Every application below is **OPERATOR ACTION REQUIRED** — they need identity, tax details,
bank details, and contract acceptance, none of which can or should be automated.

**Last researched:** 2026-08-24

---

## The single most important finding

**Three of the highest-value programs run on the same network: Impact.**

| Provider | Network | Evidence |
| --- | --- | --- |
| Remitly | Impact | Remitly's own partner page links to `app.impact.com/campaign-mediapartner-signup/Remitly.brand` |
| Airalo | Impact | [Airalo's official affiliate-program page](https://www.airalo.com/m/resources/airalo-affiliate-program/) links to the Impact campaign flow |
| Holafly | Direct / operator not publicly specified | [Holafly's official affiliate page](https://esim.holafly.com/affiliate-program/) |

And `app/layout.tsx` already carries an `impact-site-verification` meta tag — which is how you
verify a property **inside an Impact publisher account**. That strongly suggests an Impact account
already exists for this site.

**First action: log into Impact and check.** If the account exists and the domain is verified,
Remitly and Airalo may become in-network applications rather than cold signups through one login.
Holafly's current official public affiliate page instead presents a direct embedded contact form and
does not identify an affiliate-network operator.

If it does not exist, creating it may still support the verified in-network programs above; it does
not establish access to Holafly's direct program.

---

## Priority queue

Scored per the M-AFFILIATE3 model (audience fit 20, approval ease 15, expected conversion 15,
revenue potential 15, Mexico relevance 10, international expansion 10, brand trust 10,
implementation simplicity 5).

| # | Provider | Category | Score | Program type | Network | Difficulty | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Impact account** | Network | — | NETWORK APPLICATION | Impact | B | Unknown — tag present | **Check whether the account already exists** |
| 2 | **Remitly** | Money transfer | 88 | NETWORK APPLICATION | Impact | B | `pending` in DB, unverified | Apply/check via Impact. 3–5 working days to set up per Remitly |
| 3 | **Airalo** | eSIM | 82 | NETWORK APPLICATION | Impact | B | `pending` in DB, unverified | Review/apply via Impact only after operator approval. Airalo publishes **up to 10%** commission language. |
| 4 | **Travelpayouts** | Travel network | 78 | NETWORK APPLICATION | Travelpayouts | A | `not_applied` | Sign up — open to any public site, no stated traffic threshold. Drive script already installed |
| 5 | **Holafly** | eSIM | 71 | DIRECT AFFILIATE PROGRAM | Direct / operator not publicly specified | B | `pending` in DB, unverified | Official affiliate page uses an embedded contact form. Numeric commission, cookie, and terms are not publicly verified. |
| 6 | **Western Union** | Money transfer | 68 | NETWORK APPLICATION | **Partnerize** | C | `not_applied` | Confirm a **US** program exists — the page found is the GB one |
| 7 | **MoneyGram** | Money transfer | 60 | NO PUBLIC PROGRAM CONFIRMED | — | D | `pending` in DB | Research before spending time. Do not assume a public program |
| 8 | **NordVPN** | VPN | 58 | NETWORK APPLICATION | Impact (per registry) | B | `pending` in DB | Apply via Impact. High payouts, but placement must stay relevant |
| 9 | **Ria** | Money transfer | 52 | UNCONFIRMED | — | D | `not_applied` | Verify a publisher program exists at all |
| 10 | **Surfshark** | VPN | 50 | NETWORK APPLICATION | Impact (per registry) | B | `pending` in DB | Apply via Impact |

**Xoom:** classified **NO PUBLIC PUBLISHER PROGRAM FOUND**. It is a PayPal service; PayPal's
consumer referral schemes are not publisher affiliation. Do not spend operator time here without
new evidence.

**Coursera / Udemy:** deferred. Career content exists but is thin, and sending returnees to paid
courses before they have income is a poor fit. Revisit when career pages are stronger.

---

## Application packets

### P1 — Remitly

```
Provider          Remitly
Category          Money transfer (USA → Mexico and other corridors)
Program type      NETWORK APPLICATION
Network           Impact
Application URL   app.impact.com/campaign-mediapartner-signup/Remitly.brand
                  (linked from remitly.com/us/en/landing/partner-program;
                  canonical query-free public path retained)
Setup time        3–5 working days after application, per Remitly
Commission        USD $5–$20 per referral, depending on send corridor, per
                  Remitly's official partner page (observed 2026-09-01).
                  This published range is not expected earnings.
Cookie             30-day referral-click attribution, per Remitly's official
                  partner page (observed 2026-09-01).
US eligibility    United States is listed among Remitly Partner Program
                  countries. Acceptance remains unverified.
Countries served  USA → Mexico verified: cash pickup, bank deposit, and mobile
                  wallet. The official corridor page lists Elektra, BanCoppel,
                  Walmart, Santander, HSBC, Scotiabank, OXXO, Farmacias
                  Guadalajara, and Banorte; its reviewed public content does
                  not map each provider to a specific method.
Evidence URL      https://www.remitly.com/us/en/money-transfer/send-money-to-mexico
                  (observed 2026-09-01)
Relevant pages    /mexico/receive-money-usa-to-mexico
                  /resources/money-transfer
                  /tools/return-home-cost
                  the receive-money-usa-to-* pages for 7 countries
Compliance        The public partner page says accepted partners must review
                  program terms; brand bidding, paid search, coupon, email,
                  incentive, social, messaging, privacy, and disclosure rules
                  remain unverified until official terms are reviewed.
Status            DB says `pending` — origin unverified, may be a seed default. No application or approval may be inferred.
```

**Why we fit, for the application form:**

> DeportedNotDefeated is a resource platform for people returning to their home countries after
> deportation or removal from the United States, and for the family members in the US who support
> and visit them. Our money-transfer content covers the US→Mexico corridor and six others in
> depth, with a focus on what a recipient can actually use — cash pickup where there is no bank
> account, documentation requirements, and payout networks by region.

### P1 — Airalo

```
Provider          Airalo
Category          eSIM / connectivity
Program type      NETWORK APPLICATION
Network           Impact
Commission        Up to 10% on successful referrals, per Airalo's official affiliate page (observed 2026-09-01). Do not treat this as an expected rate.
Payment           Not publicly confirmed in the current evidence. Confirm in the applicable Impact campaign terms/account.
Eligibility       Airalo publicly names travel content creators, travel professionals, tech/travel apps, comparison/deal/cashback sites, member-benefit platforms, and mass-media publishers. Acceptance remains unverified.
Relevant pages    /mexico/sim-card-mexico, /tools/return-home-cost,
                  /family-visit-travel, the sim-card-* pages for 7 countries
Fit               Connectivity is a day-one need both for arrivals and for
                  family travelling to visit
```

### P1 — Travelpayouts

```
Provider          Travelpayouts (network, not a single brand)
Program type      NETWORK APPLICATION
Difficulty        A — "anyone with a public channel" per their own site,
                  no stated traffic threshold
Unlocks           flights, hotels, cars, tours, insurance, transfers,
                  trains/buses — 90+ brands including Booking.com, Viator,
                  GetYourGuide
Status            Drive script already installed site-wide (commit 34a7228)
Caution           Joining the network does NOT approve individual brands.
                  Each brand still needs its own approval, and none may be
                  activated until it does.
```

---

## Standard publisher description

Reusable, and true. Do not inflate traffic or claim partnerships that do not exist.

> **DeportedNotDefeated.com** is an international resource platform for people returning to their
> home countries after deportation or removal from the United States, and for the family members
> in the US who support or visit them.
>
> We publish country-specific practical guidance across 45+ countries covering money transfer,
> arrival logistics, housing, documents, jobs and career, connectivity, healthcare, legal
> resources, and family travel. Content is editorial and country-specific rather than generic
> review material, and we also build first-party planning tools such as a return-home cost
> calculator.

### How we promote

> Contextual placements inside country-specific editorial guides, comparison pages, resource
> directories, and planning tools. Recommendations are shown only where the service is relevant to
> what the reader is doing, and every commercial placement carries a clear affiliate disclosure.
>
> We do not use spam, incentivized clicks, cookie stuffing, misleading advertising, or direct-link
> paid search.

---

## Compliance notes to capture per program

Ask during each application and record in `terms_notes`:

```
paid search / brand bidding rules
coupon and deal-site restrictions
email promotion rules
incentivized traffic rules
social advertising rules
sub-affiliate permissions
country restrictions
```

Programs differ. Do not assume one program's rules apply to another.

---

## What happens after an approval

Never skip a step:

1. Confirm the approval in the network dashboard
2. Copy the **real** tracking URL from the network — not from an email or a blog
3. `/admin/affiliates` → paste into Affiliate URL, set network, set status `approved`,
   set approval date, set placement type `affiliate`, confirm Active
4. Test: `curl -sI https://www.deportednotdefeated.com/go/<slug> | grep -i location`
5. Confirm the click recorded with `outcome = affiliate`
6. Verify no secret was committed anywhere

**No approval means no monetized redirect.** The provider stays a useful non-monetized resource
until the tracking URL is real and tested.
