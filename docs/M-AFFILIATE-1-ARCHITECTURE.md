# M-AFFILIATE-1 — Affiliate Engine Architecture

Companion to [`M-AFFILIATE-1-AUDIT.md`](./M-AFFILIATE-1-AUDIT.md) (what existed before) and
[`AFFILIATE-OPERATIONS.md`](./AFFILIATE-OPERATIONS.md) (how to run it day to day).

---

## 1. The one-sentence version

Every commercial link on the site resolves through a single, validated, centrally-configured
redirect endpoint, and every provider list is derived from a database registry rather than
hand-maintained per page.

```
Page or component
      │
      ▼
<AffiliateRecommendations country="GT" category="MONEY_TRANSFER" />
      │  (server component, fail-safe, never throws)
      ▼
lib/affiliate/service.ts ──▶ Supabase: affiliate_partners
      │                                 affiliate_provider_countries
      ▼
lib/affiliate/selection.ts   deterministic ranking + eligibility
      │
      ▼
/go/<slug>   or   /go/category/<category>?country=GT
      │
      ├─ slug / category validation
      ├─ provider lookup
      ├─ active?  approved?  affiliate URL present?
      ├─ isSafeAffiliateUrl()   ← the only path to a Location header
      ├─ network sub-ID (only where the parameter name is verified)
      ├─ click logged (service role, no personal data)
      ▼
302 → affiliate URL │ provider website │ non-affiliate resource page
```

---

## 2. Why the schema was extended rather than replaced

The specification names a table `affiliate_providers`. The repository already had
`affiliate_partners`, populated, wired into three admin screens, five public pages, and — as the
audit found — carrying **three live, approved affiliate relationships**.

Creating a second table would have:

- forked a live earning registry across two records,
- orphaned the working admin UI,
- and repeated the exact mistake that `affiliate_links` vs `affiliate_partners` already was.

So `affiliate_partners` **is** the provider registry. It gains columns; nothing is renamed or
dropped. A read-only view named `affiliate_providers` supplies the specified vocabulary for
anything that wants it.

---

## 3. Data model

### 3.1 `affiliate_partners` — the registry

Pre-existing columns are unchanged. Added by this milestone:

| Column | Purpose |
|---|---|
| `canonical_category` | FK → `affiliate_canonical_categories.code`. What the engine selects on. |
| `network` | `travelpayouts` / `impact` / `awin` / `partnerize` / `partnerstack` / `cj` / `direct` / `other`. NULL until known. |
| `commission_type`, `commission_value`, `commission_notes` | Operator-only. `commission_value` is NULL wherever the rate is not published. Never estimated. |
| `cookie_days`, `recurring` | Operator-only program terms. NULL when unknown. |
| `trust_score` (0–100) | Optional editorial confidence score. NULL sorts last. |
| `global_priority` | Ranking weight when no country row applies. |
| `placement_type` | `affiliate` / `sponsored` / `featured` / `editorial`. Drives labelling (§23). |
| `disclosure_required` | Whether a disclosure must accompany this listing. |
| `terms_notes` | Restrictions the program imposes on us. |
| `available_globally` | **Defaults to `false`.** Global reach is never inferred. |
| `application_date`, `approval_date`, `account_identifier`, `internal_notes` | Application tracking. Not a secret store. |

Constraints added (all `NOT VALID` initially, validated in the hardening step):

- `affiliate_status ∈ {not_applied, applied, pending, approved, rejected, paused, expired}`
- `placement_type ∈ {affiliate, sponsored, featured, editorial}`
- `trust_score` between 0 and 100 or NULL
- `affiliate_url` and `official_website_url` must match `^https?://[^/\s]` or be NULL

That last pair is deliberate belt-and-braces. The application validates redirect URLs, and so
does the database, so a bad URL cannot be introduced by a direct SQL edit either.

### 3.2 `affiliate_canonical_categories` — the category vocabulary

A lookup table, not a Postgres enum and not a `CHECK` list. Adding a category is one `INSERT`;
no schema migration, which is what §7 and §42 ask for. Twenty-one codes ship, covering the
twenty in the brief plus `HEALTH_INSURANCE`, which the site already had content for.

`lib/affiliate/categories.ts` mirrors the list so route params and component props are typed and
a typo fails at build time rather than silently returning nothing.

### 3.3 `affiliate_provider_countries` — eligibility

```
(provider_id, country_code) UNIQUE
country_code ~ '^[A-Z]{2}$'      -- ISO 3166-1 alpha-2
available    boolean
priority     integer             -- higher wins within the country
verified_at  timestamptz         -- NULL = unverified editorial research
```

**Absence of a row means "not known to be available here."** A provider with no row and
`available_globally = false` is excluded from that country. This is the single most important
design decision in the model: it makes the honest answer the default one.

`verified_at` is not decoration. Unverified rows render a visible
*"Confirm availability with provider"* badge to the visitor, so the difference between
"we researched this" and "we checked this" reaches the person making the decision.

### 3.4 `affiliate_clicks` — analytics

Extended with `country_code`, `category`, `placement`, `campaign`, `network`,
`session_identifier`, `outcome`.

`referrer`, `user_agent`, and `ip_hash` are **retained but no longer written**. Existing rows are
not destroyed; nothing new lands in them. See §6.

### 3.5 `affiliate_conversions` — schema only

Created, indexed, RLS'd, and **completely unwritten**. No webhook, no importer, no synthetic
rows. It exists so the service boundary is settled before a real network integration arrives.
The admin dashboard shows "no conversion data" rather than a zero, because a zero would read as
*measured and none* rather than *not measured*.

---

## 4. Code layout

| Path | Role | Environment |
|---|---|---|
| `lib/affiliate/categories.ts` | Category vocabulary, slug ⇄ code | pure |
| `lib/affiliate/networks.ts` | Network adapters, sub-ID parameters | pure |
| `lib/affiliate/url.ts` | **Redirect safety**, sub-ID building, referrer reduction | pure |
| `lib/affiliate/selection.ts` | Eligibility, deterministic ranking, fallback chain | pure |
| `lib/affiliate/types.ts` | Provider / click / destination shapes | pure |
| `lib/affiliate/flags.ts` | `AFFILIATE_ENGINE_ENABLED` and click-logging flag | reads `process.env` |
| `lib/affiliate/service.ts` | Supabase reads, fail-safe | **server only** |
| `lib/affiliate/clicks.ts` | Click writes via service role | **server only** |
| `lib/affiliate/legacy.ts` | The pre-existing `lib/affiliate.ts` helpers, verbatim | pure |
| `lib/affiliate/index.ts` | Barrel. Deliberately does **not** re-export the server-only modules | — |
| `lib/supabase/admin.ts` | Service-role client, throws if imported in a browser bundle | **server only** |

The five pure modules carry the entire security and ranking contract and have no Next.js,
React, or Supabase imports. That is what makes them testable without a server, and it is why the
test suite needs no framework, no bundler, and no new dependency.

### Routes

| Route | Behaviour |
|---|---|
| `app/go/[slug]/route.ts` | One provider. Approved → affiliate URL; known but unapproved → provider website; unknown → `/resources`. |
| `app/go/category/[category]/route.ts` | Best eligible provider for a category, optionally country-scoped. |
| `app/go/shared.ts` | Fallback map, query-parameter reading, redirect response construction. Not a route file. |
| `app/robots.ts` | **New.** Allows everything except `/go/`, `/admin/`, `/api/`; declares the sitemap. |

### Components

| Component | Role |
|---|---|
| `components/affiliate/AffiliateRecommendations.tsx` | Server component. The public API of the engine. |
| `components/affiliate/ProviderRecommendationCard.tsx` | One provider card. |
| `components/AffiliateDisclosure.tsx` | Existing component, copy revised. |

---

## 5. Security model

### 5.1 The redirect choke point

`isSafeAffiliateUrl` is the only way a string becomes a `Location` header. It rejects:

| Input | Why |
|---|---|
| `javascript:`, `data:`, `vbscript:`, `file:`, `ftp:` | scheme allowlist is `http:`/`https:` only |
| `//evil.example` | protocol-relative — rejected before parsing, since a base would make it parse cleanly |
| `https://user:pass@host` | embedded credentials are a phishing-display trick, never a legitimate affiliate URL |
| any control character (U+0000–U+001F, U+007F) | CR/LF response-header smuggling |
| `https://localhost`, `https://intranet` | hostname with no dot — SSRF-adjacent |
| longer than 2048 characters | bounds the header |
| non-strings, including objects with a `toString` | no coercion |

**No query parameter can influence the destination.** `?url=`, `?to=`, `?redirect=`, `?next=`,
and `?dest=` are not read — there is a test asserting the handlers never read them. The only
query parameters consulted are `country`, `placement`, `campaign`, `category`, and `from`, all
of which are normalised to bounded opaque tokens used purely for grouping clicks.

A provider that fails validation is treated as having no affiliate URL, which drops it into the
fallback chain. Failure degrades to *useful but unmonetized*, never to *attacker-controlled*.

### 5.2 Authorization

| Layer | Before | After hardening |
|---|---|---|
| Admin UI | authenticated Supabase user | unchanged (session check in `app/admin/layout.tsx`) |
| Provider / category / application writes | **any authenticated user** | `user_profiles.role = 'admin'` via `public.is_affiliate_admin()` |
| Click inserts | **anyone, unauthenticated** | service role only |
| Anonymous column access | all columns including `notes` | explicit allowlist; operator fields revoked |
| Conversions | n/a | admin read only; `anon` has no grant at all |

### 5.3 Secrets

`SUPABASE_SERVICE_ROLE_KEY` is read only in `lib/supabase/admin.ts`, which throws immediately if
it is ever evaluated in a browser bundle. `lib/affiliate/index.ts` does not re-export the
server-only modules, so a careless barrel import cannot pull it clientward. No network
credential exists yet, and `.env.example` documents the naming convention as commented-out
placeholders explicitly marked "not yet required".

---

## 6. Privacy model

Affiliate analytics on this site sits next to content about deportation, immigration status, and
legal jeopardy. The governing rule is that **the click table measures commerce, not people.**

Removed from what gets written:

- full `user-agent` strings — a high-entropy fingerprint
- full `referer` URLs — reduced to a same-origin **path only**, query and fragment discarded, and
  off-site referrers dropped entirely rather than stored
- `ip_hash` — never populated, and marked in the schema as not to be populated without an
  explicit privacy-policy change

`Referrer-Policy: origin` is set on every `/go` redirect. Networks attribute on the tracking URL,
so they do not need our path — and our paths look like
`/mexico/start-over-after-deportation`. Sending the bare origin preserves domain-level
attribution without telling a commercial partner what this visitor was reading.

`session_identifier` exists in the schema but stays NULL: this build issues no session cookie
and does not create one to fill the column.

The `AffiliateClickRecord` type is the enforcement point — it is structurally incapable of
carrying immigration status, case details, identity documents, names, or emails, and a test
asserts that none of those field names ever appear in it.

---

## 7. Ranking — and what it deliberately ignores

Display order, in strict sequence:

1. explicit country availability, ahead of merely-global providers
2. country priority, descending
3. global priority, descending
4. trust score, descending (NULL last)
5. name, A→Z — so the order is stable and reproducible

**Approval status and commission are not inputs.** What we are paid must not decide what a
deportee is shown first. Approval decides only whether the *destination* may be an affiliate
URL. There is a test named *"ranking does not reorder for approval status"* that fails if anyone
changes this.

The whole thing is pure: no clock, no randomness, no model. M-AFFILIATE-1 is deterministic by
requirement (§43), and the tests assert that identical input produces identical output.

### The fallback chain

```
MONEY_TRANSFER in Guatemala
  ├─ highest-ranked monetizable provider   → affiliate destination
  ├─ highest-ranked provider with a site   → that provider's own website
  └─ nothing eligible                      → /resources/money-transfer
```

The last step is the one that matters. When we have no approved program, the visitor still gets
the help they came for. We just do not get paid, and we do not fake a tracking parameter to
pretend otherwise.

---

## 8. Failure behaviour

Every function in `service.ts` catches its own errors and returns an empty result. There is no
code path where affiliate infrastructure can throw into a country guide.

Verified in the browser against the real deployment state — the migration is deliberately
**not** applied, so every affiliate query currently fails. Result:
`/resources/money-transfer?country=GT` renders normally, the hand-maintained provider grid is
untouched, and the recommendation block degrades to a single line pointing at the comparison
page. No error, no boundary, no crash.

| Failure | Result |
|---|---|
| Migration not applied | recommendations render the non-affiliate fallback link |
| Supabase unreachable | same |
| `AFFILIATE_ENGINE_ENABLED=false` | no affiliate destinations; provider websites still work |
| `SUPABASE_SERVICE_ROLE_KEY` missing | clicks not logged; redirects unaffected |
| Provider row corrupt / hostile URL | treated as unapproved; falls through the chain |

---

## 9. SEO

- `/go/*` responses carry `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`.
- `app/robots.ts` disallows `/go/`, `/admin/`, `/api/` and **allows everything else** — no
  content page's crawlability changed.
- `app/sitemap.ts` is untouched; the new robots file declares it.
- No canonical URL, metadata block, structured-data script, or internal link was modified.
- `302`, not `301`: affiliate URLs get reissued when a program is re-approved, and a cached
  permanent redirect would keep sending traffic to a dead link.

One behavioural change: `/resources/money-transfer` moves from static to server-rendered,
because it now reads Supabase per request. This matches `/resources`, `/resources/vpn-privacy`,
`/resources/phone-internet`, and `/resources/health-insurance`, which were already dynamic for
the same reason.

---

## 10. Deliberate limits

- No AI or adaptive ranking. Deterministic only.
- No conversion ingestion. Schema and boundary only.
- No sub-ID appended for any network, because no publisher account exists and no parameter name
  has been verified against a network's own documentation. Guessing one produces clicks that
  *look* tracked and are not.
- Only one page consumes the engine. Broad rollout waits until the architecture is proven in
  production, per §47.
