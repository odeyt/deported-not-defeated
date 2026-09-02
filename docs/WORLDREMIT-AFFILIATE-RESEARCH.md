# WorldRemit Affiliate Research Record

## Task Scope

```text
Task requested: One-provider public evidence review, local documentation, validation, and local commit.
Provider: WorldRemit.
Provider category: money transfer.
Scope: local duplicate/reference checks plus current public evidence only.
Public-source limit: eight distinct pages maximum.
Observed date: 2026-09-01 UTC.
```

## Local Registry and Duplicate Checks

- **Verified local context:** Existing identity `worldremit` appears in tracked provider data and SQL seeds; existing canonical route reference is `/go/worldremit`.
- **Verified local context:** Existing SQL corridor seeds include `PH` and `KH`; they are seed/implementation context, not independent evidence of customer availability, affiliate acceptance, or commercial terms.
- **Verified local context:** Existing product copy includes broad payout/corridor language and Mexico payment assertions. Runtime code and database files were inspected but deliberately not changed; their claims require independent current evidence.
- **Verified local context:** No dedicated prior WorldRemit affiliate research record or application/verification record was found in documentation.
- **Verified local context:** Tracking/affiliate-URL presence was checked without revealing any value. No tracking value was created, displayed, tested, or stored.
- **Duplicate result:** No identity or slug conflict found. The existing identity and `/go/worldremit` reference were preserved. Similar money-transfer providers were not changed.

## Evidence Ledger

### Source 1
- Tier 1 official WorldRemit affiliate page — observed 2026-09-01 UTC.
- Supports: Active public affiliate program, customer-acquisition qualification, published commission/payout language, and the public hosted signup direction.[1]

### Source 2
- Tier 1 official WorldRemit affiliate supported-country page — observed 2026-09-01 UTC.
- Supports: Publisher promotion-country eligibility list, including all six requested countries.[2]

### Source 3
- Tier 1 official WorldRemit consumer transfer page — observed 2026-09-01 UTC.
- Supports: General service footprint and that receiving method/payment options vary by receiving country and sender location.[3]

### Attempted source, not evidence
- `https://www.worldremit.com/en/mexico` — public extraction attempt returned the research backend's HTTP 429 rate-limit error; no access-control bypass or retry escalation was attempted. This attempted page is not cited and supports no claim.

## Findings

### Verified facts

- WorldRemit publicly presents a **WorldRemit Affiliate Program** and states that affiliates earn after a new customer signs up and successfully completes a transfer using the affiliate's unique tracking number.[1]
- The official program page directs prospective affiliates to join through a public signup flow hosted by Impact. The exact campaign/signup URI is deliberately omitted because it may contain campaign or query values; no form interaction occurred.[1]
- Official public program language states a default commission of **£30**, with a **£50 minimum spend**; it says lower rates may apply to incentivised websites and higher CPAs may be available based on traffic performance and quality.[1]
- Official public program language says affiliate commission payments are made **30 days after the performance month ends**.[1]
- The official program page offers localised creative assets, promotional codes, a Marketing API, and affiliate-management support after joining.[1]
- The official affiliate supported-country page lists Mexico, Guatemala, El Salvador, Cambodia, Laos, and the Philippines as countries where WorldRemit can be promoted.[2]
- The official consumer page states WorldRemit has more than 50 send countries and more than 130 receive countries, and that transfer cost/speed and available receive methods depend on the receiving country, receive method, and sending location.[1][3]

### Inferences

- **Inference:** WorldRemit is materially relevant to the target editorial audience because the official affiliate eligibility list explicitly includes all six target countries. That is publisher promotion-country evidence, not a guarantee that every customer sending/receiving corridor or payout method is available.[2]
- **Inference:** The public program is quality-sensitive: its commission language explicitly distinguishes incentivised websites and traffic quality. This is not a complete published traffic-policy rulebook.[1]

### Unverified

- Cookie duration, click attribution window, reversal/clawback rules, contract termination, tax/payment onboarding, and complete eligibility criteria.
- Specific paid-search, trademark, email, coupon, incentive, social, messaging, privacy, cookie/data, and disclosure restrictions. The program mentions incentivised websites, but detailed restrictions require approved access to the current program terms.
- Exact publisher categories, traffic thresholds, and application approval criteria.
- Whether Impact is the current exclusive network operator versus the public hosted signup platform.
- Mexico, Guatemala, El Salvador, Cambodia, Laos, and Philippines customer receiving availability and payout methods individually. Source 2 is publisher promotion-country eligibility; source 3 is general consumer service language, not target-country corridor proof.
- USA-to-Mexico cash-pickup availability. The Mexico-specific page could not be retrieved through the research backend, and no assertion is made.

## Country and Corridor Assessment

| Country | Publisher promotion eligibility | Customer/corridor result | Classification |
| --- | --- | --- | --- |
| Mexico | Listed by official affiliate supported-country page.[2] | Customer receiving and USA sender/cash-pickup status not verified in this review. | Verified available for promotion; customer corridor not verified |
| Guatemala | Listed by official affiliate supported-country page.[2] | Customer receiving/sender/payout-method status not verified. | Verified available for promotion; customer corridor not verified |
| El Salvador | Listed by official affiliate supported-country page.[2] | Customer receiving/sender/payout-method status not verified. | Verified available for promotion; customer corridor not verified |
| Cambodia | Listed by official affiliate supported-country page.[2] | Customer receiving/sender/payout-method status not verified. | Verified available for promotion; customer corridor not verified |
| Laos | Listed by official affiliate supported-country page.[2] | Customer receiving/sender/payout-method status not verified. | Verified available for promotion; customer corridor not verified |
| Philippines | Listed by official affiliate supported-country page.[2] | Customer receiving/sender/payout-method status not verified. | Verified available for promotion; customer corridor not verified |

## Compliance and Commercial Terms

- **Commission:** £30 default with £50 minimum spend, subject to lower incentivised-site rates and possible higher CPAs for quality/performance.[1]
- **Cookie/attribution:** Unverified; payment timing is not a cookie duration.
- **Traffic:** Quality influences commission; no public threshold verified.[1]
- **Promotion rules:** Incentivised websites may receive lower rates; full policy unverified.[1]
- **Disclosure, privacy, email, messaging, paid-search, trademark, coupons, and social:** Unverified; operator input or approved program-terms access required.
- **Publisher geography:** All six requested countries appear in the official country list for promoting WorldRemit.[2]

## Priority Score

- Country and audience relevance: 32/35
- Earning opportunity: 16/25
- Trust and transparency: 20/25
- Application difficulty: 8/15
- **Total: 76/100 — high-priority, approval-gated candidate.**

## Recommendation

- **Recommendation:** Keep WorldRemit as an evidence-backed high-priority candidate, but do not apply, publish, alter routing, or use any tracking data.
- **Recommendation:** Before any future application, obtain an exact-action approval and review the current program terms for cookie, compliance, geo, payment, and restriction details.

## Application, Tracking, and Production Gates

- Application status: Not started.
- Public program URL: `https://www.worldremit.com/en-us/partners-and-affiliates`.
- Public application destination: Impact-hosted signup flow linked from the official program page; exact campaign URI omitted.
- Tracking-link status: None obtained, stored, displayed, tested, or activated.
- `/go/worldremit` status: Existing local reference preserved; no runtime/redirect change made.
- Production/database status: No change.

## Audit Record

- Task requested: Sequential one-provider WorldRemit evidence work unit.
- Provider: WorldRemit.
- Observed UTC date: 2026-09-01.
- Public pages retrieved: 3 of 8 maximum; one additional Mexico page retrieval attempt failed due research-backend rate limiting.
- Tools used: local Git/read-only repository search, `web_search`, `web_extract`, citation ledger, documentation tooling.
- Actions performed: Local reference/duplicate checks; public official evidence review; this documentation record.
- Actions deliberately not performed: Account login/creation; form entry/submission; terms acceptance; contact; CAPTCHA/access-control bypass; tracking-link handling; runtime/migration/database/Supabase/Vercel/production change; push/PR/deployment/remote modification.
- Approval obtained: Research, provider-specific documentation, validation, and one local documentation commit only.
- Remaining uncertainties: Listed above; require current public terms or separately approved authenticated review.

## Sources

[1] https://www.worldremit.com/en-us/partners-and-affiliates
[2] https://www.worldremit.com/en/partners-and-affiliates/supported-countries
[3] https://www.worldremit.com/en
