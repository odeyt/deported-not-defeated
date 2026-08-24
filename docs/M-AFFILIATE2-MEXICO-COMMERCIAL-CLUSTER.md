# M-AFFILIATE2 — Mexico Commercial Cluster + Return-Home Cost Calculator

**Date:** 2026-08-24
**Branch:** `feature/m-affiliate2-mexico`
**Starting SHA:** `f22f50b`

---

## Scope decision

The brief lists thirteen possible Mexico categories. Mexico already has nine pages, and §5 says to
prefer strengthening existing pages over proliferating thin URLs. So this milestone added **one**
route and rebuilt **one** existing page, rather than creating a dozen shells with nothing behind
them.

The constraint that drove this: **Mexico has provider rows for exactly one category.** Adding
`/mexico/flights`, `/mexico/hotels`, or `/mexico/esim` today would produce pages where the
recommendation component renders nothing, because no provider has a Mexico availability row in
those categories. Those routes are worth creating *after* the verification queue is worked, not
before.

---

## Existing Mexico routes (retained, unchanged)

```
/mexico                                  hub, served by app/[country]/page.tsx
/mexico/first-30-days
/mexico/start-over-after-deportation
/mexico/housing-mexico-city
/mexico/cost-of-living-mexico-city       ← source of the calculator's cost data
/mexico/find-work-mexico
/mexico/sim-card-mexico
/mexico/hospitals-mexico-city
/mexico/emergency-numbers-mexico
/mexico/receive-money-usa-to-mexico      ← rebuilt
```

**Duplicate routes avoided:** no `/mexico/money-transfer` (would duplicate
`receive-money-usa-to-mexico`), no `/mexico/esim` (would duplicate `sim-card-mexico`), no
`/mexico/visit-family` (the existing `/family-visit-travel` covers this and has no Mexico provider
rows to draw on yet).

---

## Product A — Mexico money-transfer page

`/mexico/receive-money-usa-to-mexico`

### What was removed, and why

The page carried a hand-written table:

```
Remitly         Minutes   Low (~$2–4)      "Best overall"
Zelle           Same day  Free             "Best if your family has a US bank"
Western Union   Minutes   Moderate ($5–15) "Best for cash pickup"
Wise            1–2 days  Very low (0.5–1%) "Best for large amounts — lowest fees"
```

Every fee, speed, and superlative was unsourced and undated. Fees on the US→MX corridor vary by
amount, payout method, and state, and change constantly. Under §7 and §9 those claims cannot stand:
"lowest fees" and "fastest" require current comparable data, and inventing fee figures is
prohibited outright.

They were **removed rather than restated**. The page now says what it can defend — which services
operate on this corridor, and whether that has been confirmed — and tells the reader to check the
current price with the provider.

### What replaced it

`<AffiliateRecommendations country="MX" category="MONEY_TRANSFER" limit={6} />`, driven entirely by
the central registry. **No affiliate URL appears in this page's source.**

Eight providers are eligible for Mexico. One (Wise) is approved and routes through `/go/wise`; the
rest render as ordinary non-monetized resources. All eight are unverified, so each card carries the
availability hedge.

### What was kept

Zelle and OXXO cash pickup are **not** in the affiliate registry and earn us nothing. They stayed,
under a heading that says so, because on this corridor they are often the right answer. §8 forbids
hiding a better provider because we do not earn from it.

The bank-account and cash-pickup-network guidance was left untouched — it is the genuinely useful
part of the page.

---

## Product B — Return-Home Cost Calculator

`/tools/return-home-cost`

### Route choice

`/tools/…` rather than `/mexico/…` because §13 requires the architecture to support other
countries later. The cost model is keyed by country code; adding a second country is a data entry,
not a new route pattern.

### Cost model

`data/returnHomeCosts.ts` — structured, never scattered through JSX.

Every band is converted from the USD figures already published on
`/mexico/cost-of-living-mexico-city`, at an approximate rate the source page itself implies
(`$400–700/month` ≈ `7,000–12,000 MXN` → ~17.5 MXN/USD).

| Category | Low | Typical | High | Source |
| --- | --- | --- | --- | --- |
| Housing | 1,925 | 3,850 | 7,700 | editorial research |
| Food | 1,750 | 2,800 | 4,375 | editorial research |
| Transport | 263 | 525 | 1,225 | editorial research |
| Phone | 105 | 210 | 350 | editorial research |
| Clothing/personal | 525 | 1,050 | 1,750 | editorial research |
| **Documents** | — | — | — | **not estimated** |

Monthly MXN, per person except housing. Each entry records `sourceType`, `sourceReference`, and
`lastVerified`.

**Documents is deliberately unestimated.** CURP, INE, and consular document fees vary by document
and state, and we have no source. It appears as a named consideration with "not estimated" rather
than a number that looks researched but is not. A test enforces that an unsourced category can
never contribute to a total.

### Calculation

`lib/return-home/calculate.ts` — pure, deterministic, no dependencies.

Inputs: people (1–8), weeks (1–26), housing situation, separate rooms, transport level, phone
needed, emergency reserve. Nothing sensitive is collected: no deportation reason, immigration
status, criminal history, case number, or identity document — and there is no field that could
carry one.

Coefficients are either sourced or chosen by the user. Where no source exists, the user decides
rather than a hidden multiplier:

- **Housing with multiple people** — the user says whether they need separate rooms. No invented
  household-sharing coefficient.
- **Transport** — the user picks minimal or regular, which selects the low or typical band.
- **Emergency reserve** — 25% of subtotal, labelled in the UI as a rule of thumb, not research.

Output is rounded to the nearest 50 so it never implies false precision, and every line shows its
basis (`"3 people × 8 weeks"`).

### Commercial independence

The estimate is computed before any resource is shown, and the calculator never reads affiliate
data. A test asserts that `calculate.ts` contains no reference to affiliate, commission, provider,
or payout — so a budget cannot move because a provider pays more (§22).

### Resources afterwards

Money transfer and eSIM recommendations follow the result, through the same central engine, with
`campaign = mx_return_cost_results`. Both have non-affiliate fallbacks.

### Sharing

`?people=3&weeks=8&housing=own_place&…` — calculator selections only. A test asserts the share URL
carries no field named for email, name, status, case, passport, or reason. No signup is required to
see a result (§24).

---

## Analytics

Existing affiliate click tracking, with Mexico attribution:

| Placement | Campaign |
| --- | --- |
| `mx-money-transfer` | `mx_money_transfer_compare` |
| `return-cost-results` | `mx_return_cost_results` |

Clicks record country, category, placement, campaign, and source page. No user-level profile.

**Calculator usage events: NOT CURRENTLY MEASURED.** The site has GA4, but no
`calculator_started` / `calculator_completed` events are wired. That belongs with a wider analytics
milestone rather than being bolted on here.

---

## SEO

- Both routes self-canonicalize on the www host, via the root `metadataBase` + `"./"`
- Unique title and description on each
- `/tools/return-home-cost` added to the sitemap (priority 0.9, monthly)
- The calculator is `ƒ` (dynamic) because it reads `searchParams` for shareable results —
  intentional
- The money page stays statically served with `revalidate = 3600`, so provider changes appear
  within the hour without a deploy
- No structured data added: `SoftwareApplication` on a calculator is arguable, and
  `Review`/`AggregateRating` would be fabrication. Left for a deliberate schema pass.

---

## Tests

**118 total, 118 passing** — 21 new in `tests/return-home-calculator.test.ts`:

determinism · ordering (low < typical < high) · per-person scaling · shared vs separate rooms ·
duration proportionality · housing/phone/transport choices · emergency reserve on and off ·
unsourced categories excluded from totals · every line explains its basis · rounding ·
clamping · NaN and junk · unknown enums · tampered URLs · share round-trip · commercial
independence.

One test initially failed on my own wrong assumption — `parseInt("1e9", 10)` is `1`, not a huge
number. The assertion was rewritten to check the guarantee (always within range) rather than the
coercion quirk.

---

## Not done, deliberately

- No Trigger.dev, Firecrawl, n8n, or agents (§48)
- No LLM in the calculator (§49) — it is deterministic and testable
- No mass country expansion (§26) — the model is country-keyed and ready, but Mexico must prove
  itself first
- No admin redesign (§32) — the verification queue is a document, not new admin UI
- No email gate (§24)

---

## Remaining manual verification

See [`AFFILIATE-PROVIDER-VERIFICATION.md`](./AFFILIATE-PROVIDER-VERIFICATION.md). The single
highest-value item: **SafetyWing is approved and earning but has no Mexico availability row**, so it
cannot appear on any Mexico page. Adding that row is minutes of work against a live program.
