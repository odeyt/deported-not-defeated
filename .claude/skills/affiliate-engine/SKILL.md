---
name: affiliate-engine
description: DeportedNotDefeated affiliate monetization architecture and guardrails. Use when working on affiliate networks, affiliate providers or partners, affiliate links, /go/[slug] redirects, country-specific affiliate recommendations, money-transfer providers, travel affiliates, eSIM affiliates, VPN affiliates, education/career affiliates, local business monetization, sponsored providers, affiliate analytics, affiliate approvals, or affiliate disclosures.
---

# Affiliate Engine — DeportedNotDefeated

This skill exists so that every future affiliate change on DeportedNotDefeated.com converges on
**one consistent, country-aware, centrally-managed monetization architecture** instead of
accumulating one-off hardcoded links and inconsistent monetization logic.

Follow it whenever the task touches monetization, providers, partner links, redirects,
recommendations, approvals, disclosures, or affiliate analytics.

---

## 1. Business context

DeportedNotDefeated.com helps people deported or returned from the United States rebuild their
lives in their destination country, and helps their family and friends support or visit them.

Users are often in a financially precarious, high-stress, low-trust situation. Monetization is
allowed and intended — but it is downstream of usefulness.

**Ranking order for any recommendation. Always in this order:**

1. Usefulness to this specific reader
2. Trust and honesty
3. Country availability
4. User suitability (bank account? cash pickup? smartphone? documents?)
5. Provider reputation
6. Conversion potential
7. Affiliate revenue

**Commission is never the sole ranking factor, and never the top one.** If a non-affiliate option
is the genuinely better answer for the reader, present it.

---

## 2. Central affiliate architecture

**Never scatter hardcoded affiliate URLs throughout the application.** A raw affiliate URL in a
page component is a defect, not a shortcut.

Required flow:

```text
Content Page
→ Recommendation Component
→ /go/[slug]
→ Provider Validation
→ Country Eligibility
→ Click Tracking
→ Affiliate Destination
```

### Repository ground truth

Verify these against the working tree before relying on them — this is a snapshot, not a contract.

| Layer | Where it lives today |
| --- | --- |
| Redirect route | `app/go/[slug]/route.ts` (server route handler, `force-dynamic`) |
| Engine (M-AFFILIATE-1) | `lib/affiliate/` — `service.ts`, `selection.ts`, `url.ts`, `clicks.ts`, `networks.ts`, `categories.ts`, `flags.ts`, `public-client.ts` |
| Legacy helpers | `lib/affiliate/legacy.ts` — `getEffectiveUrl`, `isApproved`, `getStatusLabel`, `getCategoryMeta` |
| Types | `lib/types.ts` — `AffiliatePartner`, `AffiliateCategory`, `AffiliateClick`, `AffiliateApplication`, `AffiliateStatus`, `ApplicationStatus` |
| Canonical schema | `supabase/affiliate_system.sql` (original) + `supabase/affiliate_engine_m1.sql` (M-AFFILIATE-1 extension) |
| Provider registry | `affiliate_partners` — ONE table. `affiliate_providers` is a read-only VIEW over it, never a second table |
| Country availability | `affiliate_provider_countries` — no row means unknown, never "available" |
| Display components | `components/AffiliateCard.tsx`, `AffiliateCTAButton.tsx`, `AffiliateGrid.tsx`, `AffiliateStatusBadge.tsx`, `AffiliateDisclosure.tsx`, `RecommendedServicesSection.tsx`, `ProviderGuidePage.tsx`, `CompareMoneyTransfer.tsx`, `components/travel/*`, `components/career/*` |
| Static provider data | `data/moneyTransferProviders.ts`, `data/familyVisitData.ts`, `data/careerData.ts`, `data/countries/*.ts` |
| Admin surfaces | `app/admin/affiliates`, `app/admin/affiliate-applications`, `app/admin/affiliate-clicks` |
| Documented decisions | `docs/DECISIONS.md` D-003, D-004, D-007; `docs/01_Product_Strategy.md` "Affiliate Strategy"; `docs/02_Brand_Guidelines.md` "Affiliate Disclosure Formatting"; `docs/03_UI_Design_System.md` "Affiliate Cards" |

**Inspect the actual implementation before writing code. Do not assume table names, column
names, or component props from memory or from this file alone.**

### Known drift to respect (do not silently "fix" outside your task)

- Two provider stores coexist: the canonical `affiliate_partners` system and a legacy flat
  `affiliate_links` table (`supabase/schema.sql`, `supabase/affiliate_links_expanded.sql`).
  New work targets `affiliate_partners`. Migrating the legacy table is its own task.
- Some pages still hold hardcoded outbound URLs (e.g. the NumeroMoney referral link in
  `app/family-visit-travel/page.tsx`). Route these through `/go/[slug]` when the task
  legitimately covers them — not as a drive-by rewrite.
- `components/travel/TravelProviderCard.tsx` defaults `href` to a placeholder anchor. A
  placeholder is acceptable; a fake affiliate URL is not.

---

## 3. Approval safety — the hard rule

**Never fabricate any of the following. Not as a placeholder, not as an example, not "to be
filled in later":**

- affiliate IDs, referral IDs, tracking IDs, sub-IDs
- affiliate URLs or deep links
- API credentials, keys, tokens
- commission rates
- cookie durations
- approval status
- conversion data
- revenue figures

If a real value is not available, leave the field null/empty, keep the provider in a non-approved
state, and tell the operator exactly what value is needed and where it comes from.

**A provider may use a monetized affiliate link only when its approval is actually confirmed.**

`docs/AFFILIATE-OFFER-REGISTRY.md` is the operator's record of which relationships exist and on
what terms. Read it before proposing or building any monetized link, and **never promote a
PROSPECT, PENDING, or UNVERIFIED program to ACTIVE without explicit operator confirmation** — not
even when a task appears to call for it. Its statuses map onto the database lifecycle as
PROSPECT→`not_applied`, PENDING→`applied`/`pending`, ACTIVE→`approved`, RETIRED→`expired`
(the database values are lowercase).
When the file and the database disagree, that is a bug to raise, not an ambiguity to resolve by
picking one.

**Never infer live affiliate status from the repository.** Seed files record what was true when
they were written; production drifts away from them. On 2026-08-23 every seed file in this repo
showed all providers `pending` with no affiliate URL, while production had three approved,
earning programs (wise, safetywing, numeromoney). Work built on the seed files came close to
replacing a live Wise affiliate link with a plain one — silently, with no error. Before seeding,
activating, or reporting on any provider, read the actual row. If you cannot reach the database,
say "the repo shows X, I have not verified production" rather than stating it as fact.

Approval states (conceptual set the system must support):

```text
NOT_APPLIED
APPLIED
PENDING
APPROVED
REJECTED
PAUSED
EXPIRED
```

Today these map onto `AffiliateStatus` (`pending | applied | approved | rejected | paused`) on
`affiliate_partners`, and `ApplicationStatus` (`not_applied | applied | approved | rejected |
needs_follow_up`) on `affiliate_applications`. If a task needs a state that does not exist yet
(e.g. `expired`), add it additively — extend the type and the DB constraint; never repurpose an
existing state.

**Gating rule, encoded in `lib/affiliate/service.ts` and enforced again by DB constraints:**

```text
status === approved AND affiliate_url present AND active
  → /go/[slug]  (monetized)
otherwise
  → official_website_url  (plain, non-monetized, still useful)
otherwise
  → /resources  (safe fallback)
```

Never route to `#`, an empty string, or a dead link.

---

## 4. Providers of interest

Strategic candidates only. **Do not assume approval exists for any of them.**

- **Money transfer:** Wise, Remitly, WorldRemit, MoneyGram, Western Union, Ria, Paysend, Xe
- **Travel:** Travelpayouts, Booking.com, Agoda, Trip.com, Hostelworld, Discover Cars,
  GetYourGuide, Viator, Klook
- **Connectivity:** Airalo, Holafly
- **Insurance:** SafetyWing
- **Privacy:** NordVPN, Surfshark
- **Education / career:** Coursera, Udemy, TEFL/TESOL providers

Adding a name to the provider table is fine. Adding a monetized link for it is not, until
approval is confirmed by the operator.

---

## 5. Network priority

Current strategic order:

1. Travelpayouts
2. Impact
3. Awin
4. Partnerize / Wise
5. PartnerStack

Other networks may be investigated when useful. **Do not assume membership in any network.**
Do not write network-specific tracking parameters unless the operator supplied real credentials.

---

## 6. Country-aware behavior

**Never assume a provider operates in every country.** A recommendation that is wrong for the
reader's country is worse than no recommendation.

Every affiliate recommendation must consider:

```text
country
category
provider availability
approval state
active state
country priority
provider trust
```

Fallback chain when the preferred provider is unavailable in that country:

```text
Provider A
↓
Provider B
↓
Provider C
↓
ordinary non-affiliate resource
```

**The visitor must still receive useful information even when no affiliate relationship exists.**
An empty section is a failure; a helpful non-monetized answer is a success.

---

## 7. High-priority commercial categories

International money transfer · flights · hotels · hostels · eSIM · travel insurance ·
rental cars · airport transfers · tours · VPN/privacy · career education · TEFL/TESOL ·
remote work · resume tools · business tools · translation · shipping

---

## 8. Family visit strategy

The "Visit Your Loved One" journey (`app/family-visit-travel`, `components/travel/*`,
`data/familyVisitData.ts`) should eventually support:

```text
Flights
Hotels
Hostels
Airport Transportation
eSIM
Travel Insurance
Rental Cars
Tours
Visa/Entry Information
```

Prefer centralized, country-aware recommendation components over individually hardcoded links.

---

## 9. Money transfer strategy

Money-transfer recommendations should move toward country-aware comparison
(`data/moneyTransferProviders.ts`, `components/CompareMoneyTransfer.tsx`, the
`receive-money-usa-to-*` country pages).

Useful labels: **Best Overall · Cash Pickup · Bank Deposit · Fast Transfer · Alternative**

**Do not claim** *cheapest*, *fastest*, *best rate*, or *guaranteed savings* without current
evidence. Prefer qualified, verifiable framing ("often used for cash pickup", "requires a bank
account to receive funds", "fees and rates vary — confirm before sending").

---

## 10. Disclosure

Affiliate recommendations require **clear disclosure close to the commercial content** — inside
or immediately adjacent to the section containing the links. Use
`components/AffiliateDisclosure.tsx` (`compact` inline, full on resource pages) and follow
`docs/02_Brand_Guidelines.md` → "Affiliate Disclosure Formatting".

Conceptual wording:

> Disclosure: We may earn compensation when you use some links on this page. This does not
> increase your cost. We prioritize availability and usefulness when presenting resources.

**Never** rely on the footer, `/terms`, or `/affiliate-disclosure` alone to satisfy disclosure for
a monetized section.

---

## 11. Trust

Never use fake ratings, fake testimonials, fake discounts, fake countdowns, fake scarcity,
misleading buttons, or deceptive sponsored rankings.

Keep these labels distinct and honest:

```text
affiliate
sponsored
featured
editorial
```

`featured` and `priority` are editorial/ordering controls — they must not be used to disguise a
paid placement. If a placement is paid, label it as such.

---

## 12. Security

Protect against open redirects, arbitrary destination injection, XSS, SQL injection,
unauthorized affiliate changes, secret exposure, and malicious URLs.

**Never** build or accept anything of this shape:

```text
/go?url=https://arbitrary-site.example
```

Destinations must come from provider-controlled, allowlisted records — never from a query string,
request body, referrer, or any other user input. Concretely:

- Redirect only to a URL read from the provider record for a known slug.
- Validate the scheme (`https:` only) and reject anything else before redirecting.
- Keep affiliate writes behind the authenticated admin path and RLS
  (`auth.role() = 'authenticated'` policies on `affiliate_partners` / `affiliate_applications`).
- Keep affiliate and network secrets in env (`.env.example` documents names only). Never commit a
  real key, and never print one into logs, tests, docs, or a commit message.
- Non-monetized external links get `rel="noopener noreferrer"`.

---

## 13. Privacy

Affiliate analytics measure **commercial performance only**.

**Never store, join, or forward** any of the following in affiliate, click, or analytics paths:

- deportation reason
- immigration status
- criminal history
- legal case information
- passport numbers
- immigration identifiers

`affiliate_clicks` may hold partner slug, page path, referrer, coarse user agent, hashed IP, and
timestamp. Do not extend it with anything that identifies a person or their immigration
situation, and never attach affiliate identifiers to immigration-assessment data.

---

## 14. Development rules

Before any significant affiliate work:

1. Read `CLAUDE.md` if present; otherwise read `docs/README.md` and the relevant Project Bible
   docs (`01_Product_Strategy.md`, `02_Brand_Guidelines.md`, `03_UI_Design_System.md`,
   `DECISIONS.md`).
2. Inspect the current repository architecture.
3. Inspect the existing affiliate implementation (route, lib, types, SQL, components) and read
   `docs/AFFILIATE-OFFER-REGISTRY.md` for the current relationship status of every provider.
4. Check `git status`.
5. Preserve unrelated changes — never revert or reformat work you did not touch.
6. Follow existing patterns (Next.js App Router, TypeScript, Tailwind, Supabase, `@/` imports).
7. Prefer additive migrations (`create table if not exists`, `add column if not exists`,
   `on conflict do nothing`). Do not drop or rewrite existing affiliate tables.
8. Run appropriate tests.
9. Run typecheck / lint / build when applicable (`npm run lint`, `npm run build`).
10. Never claim production success without evidence. Quote the actual command output.

---

## 15. Milestone discipline

Do not expand a small affiliate task into an unnecessary site rewrite.

```text
audit
→ implement smallest correct architecture
→ test
→ verify
→ expand
```

For a large rollout across countries, prove the architecture on **one representative page or
country first**, unless the requested task explicitly requires immediate broad rollout and tests
provide sufficient safeguards.

---

## 16. Operator actions vs Claude actions

**Claude can do:** schema and migration drafts, route and component implementation, provider
records built from real public URLs, country eligibility logic, fallback logic, disclosure
placement, analytics wiring, audits, documentation, and preparing application checklists.

**Only the human operator can do:**

- registering affiliate accounts
- agreeing to network terms
- completing tax/payment information
- obtaining affiliate approval
- obtaining tracking IDs
- entering secrets
- completing legal agreements

State plainly which items are blocked on the operator, and the exact value needed for each.
**Never claim an external task was completed without direct evidence.**

---

## 17. Definition of done

- [ ] No hardcoded affiliate URL added to a page component
- [ ] All monetized links route through `/go/[slug]`
- [ ] No fabricated IDs, URLs, rates, cookie durations, or approval states
- [ ] `docs/AFFILIATE-OFFER-REGISTRY.md` still matches the database, and its `Last Verified` /
      review dates were updated if a relationship changed
- [ ] Non-approved providers fall back to a useful non-monetized destination
- [ ] Country availability considered; fallback chain ends in a helpful answer
- [ ] Disclosure present next to the commercial content
- [ ] `affiliate` / `sponsored` / `featured` / `editorial` labeled honestly
- [ ] No open-redirect surface; destinations allowlisted and `https:`-validated
- [ ] No immigration-sensitive data in affiliate analytics
- [ ] Migrations additive; unrelated changes preserved
- [ ] Lint/build (and tests, where they exist) run, with output quoted
- [ ] Operator-only follow-ups listed explicitly
