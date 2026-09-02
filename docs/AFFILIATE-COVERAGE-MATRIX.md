# Affiliate Coverage Matrix

**Measured:** 2026-08-25, directly against the production database.
**Updated:** 2026-08-31 — one line only (NumeroMoney's monetization state),
confirmed live via the new `/admin/affiliates/verification` dashboard
(see `docs/M-AFFILIATE-VERIFY1.md`) and cross-checked against
`docs/AFFILIATE-OFFER-REGISTRY.md`'s dated pause entry. Every other figure
below is **unchanged from 2026-08-25** — this update does not re-measure
the rest of the matrix, so treat click/conversion/registry-size counts as
that original snapshot's age, not today's.
Nothing here is estimated.

---

## Headline

| Metric | Value |
| --- | --- |
| Providers in registry | **50** (dashboard now reports 49 — unreconciled, not investigated as part of this update) |
| Active (visible to visitors) | 50 |
| **Approved and monetizing** | **2** — updated 2026-08-31. NumeroMoney was paused (`active = false`, destination site unreachable, see `docs/AFFILIATE-OFFER-REGISTRY.md`); its `affiliate_status` no longer reads `approved` in production either, confirmed via the verification dashboard's status filter, though only the `active` flag was changed by that pause action |
| Provider–country rows | 113 |
| Rows verified against the provider | **2** |
| Affiliate clicks recorded | 322 |
| Conversions recorded | **0** |
| Dead placeholder CTAs | **0** (was 49) |
| Hardcoded affiliate URLs | **0** |

**96% of the registry earns nothing** (2 of 50). That is the business in one
line: the infrastructure is complete, the approvals are not.

---

## Coverage by category

Every category below renders providers to visitors. The "Monetized" column is
the one that matters.

| Category | Active providers | Monetized | Gap |
| --- | --- | --- | --- |
| MONEY_TRANSFER | 21 | **1** (Wise) | 20 unmonetized; Wise has no cash pickup |
| TOURS | 3 | 0 | Travelpayouts — traffic-gated |
| PHONE_INTERNET | 3 | 0 — updated 2026-08-31 (was 1, NumeroMoney, now paused) | NumeroMoney's destination site is unreachable (see AFFILIATE-OFFER-REGISTRY.md); Airalo/Holafly pending |
| LEGAL | 3 | 0 | visa services, editorial only |
| HOTELS | 3 | 0 | Travelpayouts — traffic-gated |
| EDUCATION | 3 | 0 | no applications submitted |
| CAREER_TRAINING | 3 | 0 | no applications submitted |
| VPN | 2 | 0 | Impact programs, not applied |
| REMOTE_WORK | 2 | 0 | no applications submitted |
| HEALTH_INSURANCE | 2 | **1** (SafetyWing) | visitor contexts only |
| FLIGHTS | 2 | 0 | Travelpayouts — traffic-gated |
| RESUME | 1 | 0 | — |
| HOSTELS | 1 | 0 | Travelpayouts — traffic-gated |
| CAR_RENTAL | 1 | 0 | Travelpayouts — traffic-gated |

---

## The two revenue routes that exist

**Updated 2026-08-31** — this was "the three revenue routes" as of
2026-08-25; NumeroMoney is removed from this table because it no longer
monetizes (paused, `active = false`, its own destination site unreachable —
see `docs/AFFILIATE-OFFER-REGISTRY.md`'s dated entry for the full history
and the reactivation steps once it's fixed).

| Provider | Category | Surfaced on | Availability |
| --- | --- | --- | --- |
| **Wise** | MONEY_TRANSFER | `/mexico/receive-money-usa-to-mexico`, `/resources/money-transfer`, `/tools/return-home-cost` | MX **verified** — bank deposit only, **no cash pickup** |
| **SafetyWing** | HEALTH_INSURANCE | `/family-visit-travel` | global; **visitor contexts only** — home-country coverage is incidental |

---

## The biggest revenue gap

**Money transfer, Mexico.** Eight providers display, one is monetized, and it is
the one a reader without a bank account cannot use.

```
Remitly     verified corridor · cash pickup at OXXO/Elektra/Walmart · earns nothing
Wise        verified corridor · bank deposit only                   · earns
```

This is not a ranking problem. Ranking is country priority and is correct on the
merits. It is an approval problem, and Remitly runs on Impact — where an account
already appears to exist.

---

## Traffic-gated programs

Nine Travelpayouts brands are blocked, with a reason given:

> *"Your website doesn't currently have enough traffic. Submit for review once
> it has stable monthly traffic for at least three consecutive months."*

```
booking · trip-com · viator · agoda · klook
getyourguide · discover-cars · kiwi · hostelworld
```

They render today as ordinary tracked resources. The moment approval lands and a
tracking URL is saved, **every placement monetizes with no deploy** — proven by
`tests/affiliate-auto-activation.test.ts`.

---

## Pages with no monetization available

Not a defect — most of the site is informational and should stay that way.

- Emergency numbers, hospitals, legal rights pages — **deliberately never
  commercial**
- 38 country hubs with no provider rows — nothing renders, which is correct
  rather than showing providers we cannot vouch for
- Career and education pages — providers now render as ordinary resources
  (previously dead placeholders)

---

## Verification debt

**2 of 113 rows verified.** Both are Mexico money transfer (Wise, Remitly), both
Tier 1, both due for review by 2026-11-22.

The other 111 render with a *"Confirm availability with provider"* badge, which
is the honest state — but it is a hedge on every card, and hedges convert worse
than facts. Verification is the cheapest available improvement to conversion
that requires no approval from anyone.
