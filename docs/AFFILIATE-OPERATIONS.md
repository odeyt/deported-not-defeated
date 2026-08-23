# Affiliate Operations Runbook

Day-to-day guide for running the affiliate engine. Architecture lives in
[`M-AFFILIATE-1-ARCHITECTURE.md`](./M-AFFILIATE-1-ARCHITECTURE.md).

**The one rule that matters:** a provider earns money only when
`affiliate_status = approved` **and** `active = true` **and** a real tracking URL is saved.
Any other combination sends visitors to the provider's ordinary website, which is fine — they
still get help, we just don't get paid.

---

## 0. First-time setup (do this once, in order)

### Step 1 — Apply the additive migration

Supabase → SQL Editor → paste and run `supabase/affiliate_engine_m1.sql`.

Safe to run against the live database while the current site is serving. It adds columns and
tables; it drops, renames, and deletes nothing. The existing eleven providers — including the
three that are already approved and earning — are untouched.

Verify:

```sql
select count(*) from affiliate_partners;                    -- was 11, now ~40
select count(*) from affiliate_provider_countries;          -- ~113
select slug from affiliate_partners where canonical_category is null;   -- expect 0 rows
select slug, affiliate_status from affiliate_partners where affiliate_status = 'approved';
-- expect exactly: wise, safetywing, numeromoney
```

If that last query returns anything else, stop and investigate before continuing.

### Step 2 — Set the service-role key

Add `SUPABASE_SERVICE_ROLE_KEY` to the deployment environment (Vercel → Settings → Environment
Variables). Without it, redirects still work but **no clicks are recorded**.

`/admin/affiliates/dashboard` shows an amber banner when the key is missing.

### Step 3 — Deploy the application

Deploy the M-AFFILIATE-1 build. Do not skip ahead to step 5 before this.

### Step 4 — Promote yourself to admin

**Run this before step 5, or you will lock yourself out of the admin UI.**

```sql
insert into user_profiles (id, email, role)
select id, email, 'admin' from auth.users where email = 'YOUR@EMAIL'
on conflict (id) do update set role = 'admin';

select id, email, role from user_profiles;   -- confirm at least one admin
```

### Step 5 — Apply the security hardening

Run `supabase/affiliate_engine_m1_hardening.sql`.

This closes the anonymous click-forgery hole, stops anonymous readers seeing operator notes and
commission data, and restricts affiliate writes to actual admins. Every statement documents its
own rollback.

Afterwards, open `/resources/money-transfer` in a private window and confirm the provider cards
still render. If they do not, run the `H1` rollback line and report it.

---

## 1. Adding a provider

**Admin UI:** `/admin/affiliates` → **+ Add Partner**.

Required: company name, slug (lowercase, hyphens, no spaces), canonical category.
Leave status at `not_applied` and the affiliate URL blank — that is the honest starting state.

Then open the provider's edit screen and add country availability (see §5).

**SQL alternative:**

```sql
insert into affiliate_partners
  (company_name, slug, canonical_category, official_website_url,
   affiliate_status, active, placement_type, commission_notes)
values
  ('Example Co', 'example-co', 'MONEY_TRANSFER', 'https://example.com',
   'not_applied', true, 'editorial', 'Not publicly disclosed');
```

---

## 2. Applying for a program

1. Apply on the network's or merchant's own site.
2. Provider edit screen → **Application Record** → set `Application Date`.
3. Set status to `applied`.
4. If they acknowledge but haven't decided, move it to `pending`.

Never store passwords or API tokens in `Publisher / Account ID` or `Internal Notes`. Secrets go
in environment variables.

---

## 3. Recording an approval and going live

This is the step that starts real money moving. Do it deliberately.

1. Copy the tracking URL **from the network's own dashboard**. Not from an email, not from a
   blog post, not reconstructed by hand.
2. Provider edit screen:
   - paste it into **Affiliate URL**
   - set **Affiliate Network**
   - set **Affiliate Status** → `approved`
   - set **Approval Date**
   - set **Placement Type** → `affiliate`
   - confirm **Active** is ticked
3. Save. The form refuses `approved` without a URL, and refuses any URL that is not absolute
   `http(s)`.
4. **Test it before walking away:**

```bash
curl -sI "https://deportednotdefeated.com/go/example-co" | grep -i "^location"
```

The `Location` header must be the affiliate URL you just pasted. If it is
`/resources` or the provider's plain website, something in step 2 did not take.

5. Confirm the click landed:

```sql
select partner_slug, outcome, country_code, clicked_at
  from affiliate_clicks order by clicked_at desc limit 5;
```

`outcome` should read `affiliate`. If it reads `website`, the provider is not actually
monetizing.

---

## 4. Pausing, expiring, and replacing a link

| Situation | Action |
|---|---|
| Temporarily stop promoting | Status → `paused`. Visitors get the provider's own website. |
| Program terminated us | Status → `rejected`. Clear the affiliate URL. |
| Tracking link went stale | Status → `expired` until you have the replacement. |
| Reissued tracking link | Paste the new URL, keep status `approved`. Re-run the curl test in §3.4. |
| Remove entirely from the site | Untick **Active**. The row and its history are kept. |

Never leave a dead tracking URL on an `approved` provider. `expired` exists precisely so the
site stops sending traffic into a link that no longer credits us.

---

## 5. Country availability and priority

Provider edit screen → **Country Availability**.

- **Add** a two-letter ISO code (`MX`, `GT`, `PH`) with a priority. Higher wins in that country.
- **Available** unticked hides the provider in that country without deleting the row.
- **Verified** means *a human checked the provider's own published country list.* Until it is
  ticked, visitors see a "Confirm availability with provider" note on the card. Do not tick it
  to make the badge go away.

The 113 seeded rows came from the editorial research already in
`data/moneyTransferProviders.ts`. **None of them is verified.** Working through them is the
highest-value manual task available — it is what turns a hedge into a recommendation.

`Available globally` on the main form is the escape hatch for a provider that genuinely serves
everywhere. It is off by default on purpose: we never assume worldwide coverage.

### Ranking

1. explicit country row beats global-only
2. country priority, high → low
3. global priority, high → low
4. trust score, high → low (blank sorts last)
5. name, A→Z

Commission is **not** an input, and neither is approval status. If you want a provider higher,
raise its priority for a reason you could defend to a visitor.

---

## 6. Reading the analytics

`/admin/affiliates/dashboard`.

- **Clicks** — total, today, 7 days, 30 days.
- **Providers** — how many are actually earning versus applied, not-applied, rejected.
- **Destination type** — `affiliate` = we may be credited. `website` = useful but unmonetized.
  `fallback` = we had nothing for them; investigate those.
- **Top countries / categories / source pages** — where demand actually is.
- **Conversions** — blank until a network is connected. It says "no conversion data" rather than
  showing zero, because zero would look like a measurement.

A high `fallback` count for one category is the clearest signal available about which program to
apply for next.

### What is deliberately not recorded

No IP addresses, no user agents, no full referrer URLs, no names or emails, and nothing about
anyone's immigration circumstances. Source pages are stored as paths only, with query strings
stripped. If a future change needs to widen this, re-read §34 of the milestone brief first.

---

## 7. Connecting a network's sub-ID tracking

Every adapter in `lib/affiliate/networks.ts` currently has `subIdParam: null`, so **nothing is
appended to any affiliate URL**. That is intentional: a guessed parameter name produces clicks
that look tracked and are not.

To turn it on for a network:

1. Log into that network's publisher dashboard.
2. Find the sub-ID parameter in **their** documentation or link generator.
3. Set `subIdParam` in the adapter and delete the verification note.
4. Test that a real click still attributes in their reporting before relying on it.

Sub-IDs are shaped `country_category_placement`, e.g. `mx_money_transfer_compare`. They contain
nothing that identifies a person — networks surface sub-IDs in dashboards we do not control.

---

## 8. Feature flags

| Variable | Default | Effect when off |
|---|---|---|
| `AFFILIATE_ENGINE_ENABLED` | on | No affiliate destinations anywhere. Recommendation blocks render their fallback. Provider websites still work. |
| `AFFILIATE_CLICK_LOGGING_ENABLED` | on | Clicks not recorded. Redirects unaffected. |

Both default to on when unset, so an existing deployment does not silently lose a shipped
feature. `AFFILIATE_ENGINE_ENABLED=false` is the emergency brake — it stops monetization without
taking any country guide down.

---

## 9. Using the engine on a new page

```tsx
import AffiliateRecommendations from "@/components/affiliate/AffiliateRecommendations";

<AffiliateRecommendations
  country="GT"                       // ISO alpha-2, or omit
  category="MONEY_TRANSFER"
  placement="guatemala_money_guide"  // shows up in click analytics
  campaign="country_guide"
  fallbackHref="/resources/money-transfer"
/>
```

It is an async Server Component that never throws. If the database is unreachable it renders the
fallback link, or nothing when no `fallbackHref` is given.

**Do not** convert editorial brand mentions in country guides into affiliate links. Use the
component where a commercial recommendation genuinely belongs, and leave prose as prose.

---

## 10. Rolling back M-AFFILIATE-1

**Application:** revert the branch and redeploy. The additive migration is harmless to the old
code — it ignores the new columns and tables entirely.

**Hardening:** each block in `affiliate_engine_m1_hardening.sql` carries its rollback statement
in the comment directly above it. The most likely one you will want:

```sql
-- restore broad anonymous read access
grant select on affiliate_partners to anon, authenticated;
```

**Schema:** the additive migration is intentionally hard to reverse, because reversing it means
dropping columns and destroying data. Do not drop these tables to "undo" the milestone. If the
engine must go away, turn `AFFILIATE_ENGINE_ENABLED` off and leave the schema in place.

---

## 11. Routine checks

**Monthly**

```sql
-- Approved providers that cannot actually earn
select slug, affiliate_status, active, affiliate_url is null as no_url
  from affiliate_partners
 where affiliate_status = 'approved' and (active = false or affiliate_url is null);

-- Providers with no category — invisible to every recommendation block
select slug from affiliate_partners where canonical_category is null and active;

-- Country rows nobody has verified
select count(*) from affiliate_provider_countries where verified_at is null;
```

**Quarterly** — re-test every approved link with the curl check in §3.4. Tracking URLs expire
quietly, and a dead one costs traffic without any error to alert you.

**Before every deploy**

```bash
npm run typecheck && npm test && npm run build
```
