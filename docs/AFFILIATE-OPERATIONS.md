# Affiliate Operations Manual

**Audience:** the site operator
**System:** the central affiliate engine (M-AFFILIATE-1)
**Admin:** `/admin/affiliate-engine`

This is the day-to-day runbook. Architecture lives in
[`M-AFFILIATE-1-ARCHITECTURE.md`](./M-AFFILIATE-1-ARCHITECTURE.md).

---

## 0. First-time setup

1. Open the Supabase SQL editor.
2. Paste and run **`supabase/affiliate_engine.sql`**.
3. Verify:

```sql
select slug, name, category, affiliate_status, active from affiliate_providers order by category, slug;
```

Expected: **25 providers, every one `NOT_APPLIED`, every `affiliate_url` NULL**,
5 active (money transfer), 3 Guatemala availability rows.

4. Confirm `AFFILIATE_ENGINE_ENABLED` is unset or `true` in the hosting environment.
5. Load `/admin/affiliate-engine`. If it reports missing tables, step 2 did not run.

> Running the migration **monetizes nothing**. Providers become plain resource links
> until you complete the approval flow below.

---

## 1. The golden rule

**A provider earns money only when all four are true:**

| Condition | Where |
| --- | --- |
| `affiliate_status = 'APPROVED'` | Provider manager → Approval status |
| `affiliate_url` is a real tracking URL from the network | Provider manager → Affiliate URL |
| `active = true` | Provider manager → Active checkbox |
| The provider has an available row for the visitor's country | Provider manager → Country availability |

Miss any one and the visitor is sent to the ordinary website instead. That is the
designed behaviour, not a failure.

---

## 2. Adding a provider

1. `/admin/affiliate-engine` → find it in the registry, or insert a row:

```sql
insert into affiliate_providers (slug, name, category, network, description, website_url)
values ('example', 'Example', 'MONEY_TRANSFER', 'DIRECT',
        'What this service does, in plain language.', 'https://example.com');
```

2. Open it in the provider manager and fill in the description and website URL.
3. Leave status `NOT_APPLIED` and `affiliate_url` empty.
4. Set `active = true` only if you are happy for visitors to see it as an ordinary
   (non-monetized) resource.

**Never invent an affiliate URL, tracking ID, commission rate, or cookie duration.**
Unknown commission terms stay `NULL` with `commission_notes = 'Not publicly disclosed'`.

---

## 3. Applying to a program

1. Apply on the network's own site. **This is a human task — it cannot be automated.**
2. In the provider manager set status `APPLIED` and fill in **Applied on**.
3. Record your publisher/account ID in **Publisher / account ID**.
   *Never* put a password, API key, or secret in this field — those belong in the
   hosting environment's secret store.
4. If the network says "under review", set status `PENDING`.

---

## 4. Recording an approval and going live

1. Copy the **real** tracking URL from the network dashboard.
2. Provider manager → paste it into **Affiliate URL**.
3. Set status `APPROVED` and fill in **Approved on**.
4. Tick **Active**.
5. Save. The form refuses to save `APPROVED` without a valid `https://` affiliate URL —
   that guardrail is there so a program cannot go live half-configured.
6. Test the redirect in a private window:

```
https://deportednotdefeated.com/go/<slug>
```

You should land on the provider with your tracking parameters intact.

7. Confirm the click was recorded: `/admin/affiliate-engine` → Clicks today.

> Do not tell anyone a program is live until step 6 has actually been performed.

---

## 5. Sub-ID / campaign tracking

If the network supports a sub-id (for attributing conversions back to a page):

1. Find the parameter name in **that network's own documentation**. Do not guess —
   networks disagree, and a wrong name breaks attribution silently.
2. Provider manager → **Sub-ID parameter name**.
3. The engine appends the campaign string automatically, e.g.
   `gt_money_transfer_country_guide`, and stores the same value on the click row.

Leave the field blank and nothing is appended. That is the safe default.

---

## 6. Country availability

Recommendations are country-gated. **No row means the provider does not appear for
that country.** This is intentional — availability is never assumed.

To add one: provider manager → Country availability → enter the ISO-3166-1 alpha-2 code
(`GT`, `MX`, `PH`), a priority, and a note recording *where the claim came from*.

Priority controls order within that country. Highest wins.

```
GT  Remitly       100   ← shown first
GT  Western Union  90
GT  Wise           80
```

Verify availability with the provider before treating a row as confirmed, then set
`verified_at`:

```sql
update affiliate_provider_countries
set verified_at = current_date
where provider_id = (select id from affiliate_providers where slug = 'remitly')
  and country_code = 'GT';
```

---

## 7. Changing priority

- **Within one country:** change that country row's priority.
- **Everywhere:** change the provider's **Global priority**.
- **Trust score (0–100):** editorial judgement of reliability; breaks ties.

Ordering is: country priority → global priority → trust score → featured → name.
**Commission is not part of this ordering, and must not be.** If you find yourself
wanting to rank by payout, that is the moment to stop.

---

## 8. Pausing, expiring, replacing

| Situation | Action |
| --- | --- |
| Temporarily stop monetizing | Status → `PAUSED`. Visitors fall back to the ordinary website. |
| Program ended | Status → `EXPIRED`. |
| Rejected | Status → `REJECTED`. |
| Hide completely | Untick **Active**. |
| Affiliate URL stopped working | Paste the new URL, save, retest `/go/<slug>`. |
| Unavailable in one country | Toggle that country row to **Unavailable**. |

Never delete a provider that has click history — deactivate it instead, so the analytics
stay intact.

---

## 9. Reading the numbers

`/admin/affiliate-engine` shows clicks (all time / today / 7d / 30d), registry counts,
and top providers, countries, categories, and source pages.

**Conversions and revenue show "No conversion data recorded" until a real network
reporting integration is connected.** The schema (`affiliate_conversions`) is ready; the
importer is future work. Nothing on that panel is ever estimated or filled in by hand.

---

## 10. Adding a category

Categories are rows, not code:

```sql
insert into affiliate_provider_categories (code, label, display_order)
values ('COWORKING', 'Coworking', 210);
```

Then add the same code to `AFFILIATE_CATEGORIES` in `lib/affiliate-engine/types.ts` so
pages get compile-time safety.

---

## 11. Emergency switches

| Need | Action |
| --- | --- |
| Turn off all engine recommendations | Set `AFFILIATE_ENGINE_ENABLED=false` and redeploy |
| Stop one provider immediately | Untick **Active** (takes effect within the hour on cached pages) |
| Stop one country | Toggle that country row to Unavailable |

The site never depends on the engine: if it is disabled or the database is unreachable,
recommendation blocks disappear and every guide renders normally.

---

## 12. Things only a human can do

Claude cannot and must not do any of these:

- [ ] Register affiliate/network accounts
- [ ] Accept network terms and conditions
- [ ] Complete tax and payment information
- [ ] Obtain approval from a program
- [ ] Obtain tracking IDs, markers, or publisher IDs
- [ ] Enter secrets into the hosting environment
- [ ] Sign legal agreements

Anything that claims one of these is done without you having done it is wrong.

---

## 13. Current application queue

Shown live at `/admin/affiliate-engine` with each provider's real status. Strategic
order:

1. Travelpayouts · 2. Wise · 3. Impact · 4. Awin · 5. Airalo
6. SafetyWing · 7. NordVPN · 8. Surfshark · 9. Coursera · 10. PartnerStack

**This is a work list, not evidence of approval.** As of this document, **no program has
approved this site, and no provider is monetizing.**
