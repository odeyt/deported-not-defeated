# SEO Opportunity Report

**Date:** 2026-08-25
**Search Console data:** **NOT AVAILABLE — not connected**

---

## The honest headline

Every ranking-based opportunity in this report is **unavailable**, because
Search Console has never been connected. There is a Google site-verification
meta tag in `app/layout.tsx`, but a verification tag is not a data connection —
no API client, no credentials, no ingestion, no history.

So this report contains what could be **measured directly** instead: the
technical health of what Google would crawl if it came today.

| Metric | Value |
| --- | --- |
| Organic clicks | NOT AVAILABLE |
| Organic impressions | NOT AVAILABLE |
| CTR | NOT AVAILABLE |
| Average position | NOT AVAILABLE |
| Top query | NOT AVAILABLE |
| Top landing page | NOT AVAILABLE |
| Indexed URLs | NOT AVAILABLE (Google's count) |

Nothing above is estimated. An estimate here would be a guess wearing a number's
clothes, and it would then be used to make decisions.

---

## What was measured (live crawl, 2026-08-25)

### Sitemap health — clean

Every URL in the sitemap was fetched:

```
URLs in sitemap:  142
200 OK:           142
redirects:          0
404:                0
other:              0
```

**This corrects an earlier claim of mine.** The M-AFFILIATE0 audit said the
sitemap covered "52 of 605 pages". The generated sitemap actually contains 142
URLs — the source has 52 literal entries plus a `allCountries.map()` expansion.
The 605 figure was Next's prerendered-path count, which includes paths that were
never meant to be sitemap entries.

### Titles — healthier than previously reported

All 142 live pages were fetched and their `<title>` extracted:

```
pages with a title:        142 / 142
missing titles:              0
duplicate title groups:      1
titles over 60 characters:   3
```

The single duplicate is the generic layout fallback `"Deported Not Defeated"`,
appearing on pages that export no metadata of their own. That is the one title
issue worth fixing, and it is small.

### Canonical health — correct

```
canonical host:        www (apex 308s to it)
apex URLs in sitemap:  0
per-route canonicals:  correct (/mexico → /mexico, not the homepage)
robots sitemap:        www
```

---

## Opportunities that can be stated without Search Console

**A — Pages with no metadata of their own.** A handful inherit the generic
title. These are the cheapest wins available and need no data to justify.

**B — Verification debt on 111 provider–country rows.** Every unverified row
renders a *"Confirm availability with provider"* hedge. Hedges convert worse
than facts. This needs no approval from any network.

**C — The money-transfer mismatch.** On the Mexico corridor the only monetized
provider (Wise) requires a bank account; the one supporting cash pickup
(Remitly) earns nothing. Traffic to that page converts worse than it should for
a structural reason.

**D — 38 country hubs with no depth.** Real, but **not actionable yet** — see
`NEXT-COUNTRY-GROWTH-PRIORITY.md`. Expanding before knowing what ranks is how
sites accumulate pages nobody reads.

---

## Opportunity classes that stay empty until GSC is connected

The engine described in the milestone brief — high impressions / low CTR,
position 5–20, traffic with commercial intent but no monetized provider — cannot
be populated. All four require impression and position data.

**This is the single highest-value operator action in the entire milestone.**
Without it, every content and SEO decision from here is a guess, and Travelpayouts'
traffic requirement cannot even be measured.

---

## Operator setup — Search Console

1. https://search.google.com/search-console
2. Add property → **URL prefix** → `https://www.deportednotdefeated.com`
   — the `www` host, since the apex 308s to it and a mismatched property
   collects nothing
3. Verify — the HTML tag in `app/layout.tsx` may already satisfy this
4. Submit sitemap: `https://www.deportednotdefeated.com/sitemap.xml`
5. Wait. Data appears over days, and the three-month history Travelpayouts wants
   starts from connection, not from today

Once connected, the ingestion layer becomes worth building, because there will
be something to ingest.
