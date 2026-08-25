-- ============================================================
-- M-GROWTH1A — Corridor precision (ADDITIVE)
--
-- Adds origin-country precision to provider availability WITHOUT replacing the
-- existing model. Run in the Supabase SQL editor.
--
-- THE DISTINCTION THIS MAKES POSSIBLE
--   "Wise serves Mexico"           destination availability  (origin_country NULL)
--   "Wise supports USA -> Mexico"  corridor verification     (origin_country 'US')
--
--   For remittance these are different facts, and only the second one answers
--   the question a reader on this site is actually asking.
--
-- BACKWARD COMPATIBILITY
--   origin_country is NULLABLE and defaults to NULL. Every existing row keeps
--   working and keeps meaning exactly what it meant before: this provider
--   serves this destination, origin unspecified.
--
--   No existing row is converted to a corridor claim. Doing that would invent
--   evidence nobody gathered.
-- ============================================================

begin;

alter table affiliate_provider_countries
  add column if not exists origin_country text;

alter table affiliate_provider_countries
  drop constraint if exists affiliate_provider_countries_origin_check;

alter table affiliate_provider_countries
  add constraint affiliate_provider_countries_origin_check
  check (origin_country is null or origin_country ~ '^[A-Z]{2}$');

comment on column affiliate_provider_countries.origin_country is
  'ISO 3166-1 alpha-2 origin. NULL means destination availability with no corridor claim. A value means the specific corridor origin -> country_code was verified.';

comment on column affiliate_provider_countries.country_code is
  'Destination country. Retained as the primary availability key for backward compatibility.';

-- A provider may hold one generic row plus one row per corridor origin.
-- Postgres treats NULLs as distinct in unique indexes, so the generic row is
-- constrained separately from corridor rows.
create unique index if not exists idx_provider_country_corridor
  on affiliate_provider_countries (provider_id, country_code, origin_country)
  where origin_country is not null;

create index if not exists idx_provider_country_origin_lookup
  on affiliate_provider_countries (country_code, origin_country, available);

commit;

-- ============================================================
-- EVIDENCE-BACKED CORRIDOR RECORDS
--
-- Applied ONLY where an official provider page was actually read.
-- Everything else stays NULL until someone checks.
--
--   Wise     wise.com/us/send-money/send-money-to-mexico   bank deposit only
--   Remitly  remitly.com/us/en/mexico                      cash pickup + bank + wallet
--
-- Verified 2026-08-24 during M-AFFILIATE3.
-- ============================================================
update affiliate_provider_countries pc
   set origin_country = 'US'
  from affiliate_partners p
 where pc.provider_id = p.id
   and pc.country_code = 'MX'
   and p.slug in ('wise', 'remitly')
   and pc.verified_at is not null
   and pc.origin_country is null;

-- Verify:
--   select p.slug, pc.origin_country, pc.country_code, pc.verified_at
--     from affiliate_provider_countries pc
--     join affiliate_partners p on p.id = pc.provider_id
--    where pc.country_code = 'MX' order by p.slug;
--   -- expect: wise and remitly show origin_country 'US'; all others NULL
