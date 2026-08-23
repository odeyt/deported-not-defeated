-- ============================================================
-- M-AFFILIATE-1 — Central Affiliate Revenue Engine
-- Additive migration. Run this in the Supabase SQL editor.
--
-- SAFETY CONTRACT FOR THIS FILE:
--   * Every statement is ADDITIVE or IDEMPOTENT.
--   * No table is dropped, renamed, or truncated.
--   * No column is dropped or retyped.
--   * No existing row is deleted.
--   * No existing RLS policy is dropped or made more restrictive.
--   * Safe to run while the CURRENT production build is live —
--     old code simply ignores the new columns and tables.
--
-- Restrictive changes (policy tightening, column-grant revocation)
-- live in supabase/affiliate_engine_m1_hardening.sql and MUST be
-- run only AFTER the M-AFFILIATE-1 application build is deployed.
--
-- ROLLBACK: see docs/AFFILIATE-OPERATIONS.md, "Rolling back M-AFFILIATE-1".
-- ============================================================


-- ============================================================
-- 1. CANONICAL CATEGORY REGISTRY
--
-- A lookup table rather than a CHECK constraint or a Postgres
-- enum, so that adding a future category is a single INSERT
-- and never a schema migration (spec §7, §42).
-- ============================================================
create table if not exists affiliate_canonical_categories (
  code          text primary key,
  label         text not null,
  description   text,
  display_order integer default 0,
  active        boolean default true,
  created_at    timestamptz default now()
);

insert into affiliate_canonical_categories (code, label, description, display_order) values
  ('MONEY_TRANSFER',    'Money Transfer',      'Sending and receiving money across borders.',                     10),
  ('FLIGHTS',           'Flights',             'Air travel search and booking.',                                  20),
  ('HOTELS',            'Hotels',              'Hotel and short-stay accommodation booking.',                     30),
  ('HOSTELS',           'Hostels',             'Budget and shared accommodation booking.',                        40),
  ('ESIM',              'eSIM',                'Digital SIM and mobile data plans.',                              50),
  ('PHONE_INTERNET',    'Phone & Internet',    'Physical SIM, mobile plans, and home internet.',                  60),
  ('VPN',               'VPN & Privacy',       'Privacy and secure-browsing tools.',                              70),
  ('TRAVEL_INSURANCE',  'Travel Insurance',    'Short-term travel and trip insurance.',                           80),
  ('HEALTH_INSURANCE',  'Health Insurance',    'International and expatriate medical cover.',                     90),
  ('CAR_RENTAL',        'Car Rental',          'Vehicle hire.',                                                  100),
  ('AIRPORT_TRANSFER',  'Airport Transfer',    'Pre-booked airport ground transport.',                           110),
  ('TOURS',             'Tours & Activities',  'Guided tours, experiences, and activities.',                      120),
  ('EDUCATION',         'Education',           'Academic courses, degrees, and certificates.',                    130),
  ('CAREER_TRAINING',   'Career Training',     'Vocational and job-skills training.',                             140),
  ('TEFL_TESOL',        'TEFL / TESOL',        'English-teaching qualifications.',                                150),
  ('REMOTE_WORK',       'Remote Work',         'Remote and freelance work platforms.',                            160),
  ('RESUME',            'Resume & CV',         'Resume building and job-application tools.',                      170),
  ('BUSINESS_TOOLS',    'Business Tools',      'Software and services for running a small business.',             180),
  ('LEGAL',             'Legal',               'Legal information, document, and representation services.',       190),
  ('TRANSLATION',       'Translation',         'Document translation and certification.',                         200),
  ('SHIPPING',          'Shipping',            'Parcel, freight, and personal-effects shipping.',                 210)
on conflict (code) do nothing;


-- ============================================================
-- 2. PROVIDER REGISTRY — additive columns on affiliate_partners
--
-- affiliate_partners IS the provider registry. It is extended
-- rather than replaced so that the existing admin screens and
-- public resource pages keep working unchanged.
-- ============================================================
alter table affiliate_partners
  add column if not exists network              text,
  add column if not exists canonical_category   text,
  add column if not exists commission_type      text,
  add column if not exists commission_value     numeric(10,4),
  add column if not exists commission_notes     text,
  add column if not exists cookie_days          integer,
  add column if not exists recurring            boolean default false,
  add column if not exists trust_score          integer,
  add column if not exists global_priority      integer default 0,
  add column if not exists placement_type       text default 'editorial',
  add column if not exists disclosure_required  boolean default true,
  add column if not exists terms_notes          text,
  add column if not exists available_globally   boolean default false,
  add column if not exists application_date     date,
  add column if not exists approval_date        date,
  add column if not exists account_identifier   text,
  add column if not exists internal_notes       text;

comment on column affiliate_partners.network is
  'Affiliate network the relationship is managed through: travelpayouts | impact | awin | partnerize | partnerstack | cj | direct | other. NULL until known.';
comment on column affiliate_partners.canonical_category is
  'FK into affiliate_canonical_categories.code. The legacy category_id / affiliate_categories relation is retained for the existing resource pages.';
comment on column affiliate_partners.commission_value is
  'NULL whenever the rate is not publicly disclosed. Never populate with an estimate.';
comment on column affiliate_partners.available_globally is
  'Defaults to false. Global availability is never assumed — it must be an explicit operator decision (spec §6).';
comment on column affiliate_partners.account_identifier is
  'Publisher / account ID with the network. NOT a secret store — never put passwords or API tokens here.';
comment on column affiliate_partners.placement_type is
  'affiliate | sponsored | featured | editorial. Determines how the listing must be labelled to the visitor (spec §23).';

-- New rows default to not_applied. Existing rows are left exactly as they are.
alter table affiliate_partners alter column affiliate_status set default 'not_applied';

-- Backfill canonical_category from the legacy affiliate_categories relation.
-- Only fills rows that are still NULL — never overwrites an operator choice.
update affiliate_partners p
   set canonical_category = m.code
  from (values
        ('money-transfer',   'MONEY_TRANSFER'),
        ('phone-internet',   'PHONE_INTERNET'),
        ('vpn-privacy',      'VPN'),
        ('health-insurance', 'HEALTH_INSURANCE')
       ) as m(legacy_slug, code)
  join affiliate_categories c on c.slug = m.legacy_slug
 where p.category_id = c.id
   and p.canonical_category is null;

-- Default network for anything already carrying an approved affiliate URL is
-- unknown, not "direct" — leave NULL rather than assert a relationship shape.

-- Foreign key to the canonical category registry (added only if absent).
do $$
begin
  if not exists (
    select 1 from pg_constraint
     where conname = 'affiliate_partners_canonical_category_fkey'
  ) then
    alter table affiliate_partners
      add constraint affiliate_partners_canonical_category_fkey
      foreign key (canonical_category)
      references affiliate_canonical_categories(code)
      on update cascade
      on delete set null
      not valid;
  end if;
end $$;

-- Approval-state constraint (spec §5). Added NOT VALID so that any
-- unexpected legacy value cannot block the migration; it is enforced
-- for every INSERT and UPDATE from this point forward.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'affiliate_partners_affiliate_status_check'
  ) then
    alter table affiliate_partners
      add constraint affiliate_partners_affiliate_status_check
      check (affiliate_status in (
        'not_applied','applied','pending','approved','rejected','paused','expired'
      )) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'affiliate_partners_placement_type_check'
  ) then
    alter table affiliate_partners
      add constraint affiliate_partners_placement_type_check
      check (placement_type in ('affiliate','sponsored','featured','editorial')) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'affiliate_partners_trust_score_check'
  ) then
    alter table affiliate_partners
      add constraint affiliate_partners_trust_score_check
      check (trust_score is null or (trust_score between 0 and 100)) not valid;
  end if;
end $$;

-- Defence in depth: the application validates redirect URLs, and so does the
-- database. A provider URL must be http(s) or NULL — never javascript:, data:,
-- file:, or a protocol-relative value (spec §32).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'affiliate_partners_affiliate_url_scheme_check'
  ) then
    alter table affiliate_partners
      add constraint affiliate_partners_affiliate_url_scheme_check
      check (affiliate_url is null or affiliate_url ~* '^https?://[^/\s]') not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'affiliate_partners_website_url_scheme_check'
  ) then
    alter table affiliate_partners
      add constraint affiliate_partners_website_url_scheme_check
      check (official_website_url is null
             or official_website_url = '#'
             or official_website_url ~* '^https?://[^/\s]') not valid;
  end if;
end $$;


-- ============================================================
-- 3. COUNTRY AVAILABILITY (spec §6)
--
-- Absence of a row means "not known to be available here".
-- Global availability is never inferred.
-- ============================================================
create table if not exists affiliate_provider_countries (
  id                 uuid primary key default gen_random_uuid(),
  provider_id        uuid not null references affiliate_partners(id) on delete cascade,
  country_code       text not null,
  available          boolean not null default true,
  priority           integer not null default 0,
  availability_notes text,
  verified_at        timestamptz,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now(),
  constraint affiliate_provider_countries_unique unique (provider_id, country_code),
  constraint affiliate_provider_countries_code_check check (country_code ~ '^[A-Z]{2}$')
);

comment on table affiliate_provider_countries is
  'Per-country availability and ranking for a provider. country_code is ISO 3166-1 alpha-2, uppercase.';
comment on column affiliate_provider_countries.priority is
  'Higher wins within a country. Overrides affiliate_partners.global_priority.';
comment on column affiliate_provider_countries.verified_at is
  'Set only when a human has confirmed availability against the provider''s own published corridor list. NULL = unverified editorial research.';


-- ============================================================
-- 4. CLICK ANALYTICS (spec §14)
--
-- Extends the existing affiliate_clicks table.
--
-- PRIVACY CONTRACT — this table records commercial performance only.
-- It must NEVER carry deportation reason, immigration status, criminal
-- history, case details, passport or immigration ID numbers, names,
-- email addresses, or full IP addresses (spec §34).
--
-- The M-AFFILIATE-1 application code stops writing `user_agent` and
-- `referrer`. Those columns are retained (not dropped) so no existing
-- data is destroyed; they are simply no longer populated. `ip_hash`
-- has never been populated and remains unpopulated.
-- ============================================================
alter table affiliate_clicks
  add column if not exists country_code       text,
  add column if not exists category           text,
  add column if not exists placement          text,
  add column if not exists campaign           text,
  add column if not exists network            text,
  add column if not exists session_identifier text,
  add column if not exists outcome            text;

comment on column affiliate_clicks.page_path is
  'Source page. Path only — query strings and fragments are stripped before insert.';
comment on column affiliate_clicks.outcome is
  'affiliate | website | fallback — which destination class the visitor was sent to.';
comment on column affiliate_clicks.session_identifier is
  'Optional non-identifying first-party session id. The M-AFFILIATE-1 build never issues such a cookie, so this stays NULL until a future consented-analytics milestone.';
comment on column affiliate_clicks.referrer is
  'DEPRECATED — no longer written. Retained so existing rows are not destroyed.';
comment on column affiliate_clicks.user_agent is
  'DEPRECATED — no longer written. Retained so existing rows are not destroyed.';
comment on column affiliate_clicks.ip_hash is
  'DEPRECATED — never written. Do not populate without an explicit privacy-policy change.';


-- ============================================================
-- 5. CONVERSIONS (spec §16)
--
-- Schema and service boundary only. NOTHING writes to this table in
-- M-AFFILIATE-1. No webhook, no importer, no synthetic data.
-- ============================================================
create table if not exists affiliate_conversions (
  id                     uuid primary key default gen_random_uuid(),
  provider_id            uuid references affiliate_partners(id) on delete set null,
  network                text,
  external_conversion_id text,
  click_id               uuid references affiliate_clicks(id) on delete set null,
  country_code           text,
  revenue                numeric(12,2),
  currency               text,
  status                 text default 'pending',
  converted_at           timestamptz,
  created_at             timestamptz default now(),
  constraint affiliate_conversions_status_check
    check (status in ('pending','approved','rejected','paid','reversed')),
  constraint affiliate_conversions_external_unique
    unique (network, external_conversion_id)
);

comment on table affiliate_conversions is
  'Populated only by a future real network API or webhook integration. Never seed, never estimate, never backfill with modelled revenue.';


-- ============================================================
-- 6. INDEXES (spec §35)
-- ============================================================
create index if not exists idx_affiliate_partners_slug
  on affiliate_partners (slug);
create index if not exists idx_affiliate_partners_lookup
  on affiliate_partners (canonical_category, active, affiliate_status);
create index if not exists idx_affiliate_partners_ranking
  on affiliate_partners (active, global_priority desc, priority desc);

create index if not exists idx_provider_countries_country
  on affiliate_provider_countries (country_code, available, priority desc);
create index if not exists idx_provider_countries_provider
  on affiliate_provider_countries (provider_id);

create index if not exists idx_affiliate_clicks_clicked_at
  on affiliate_clicks (clicked_at desc);
create index if not exists idx_affiliate_clicks_partner
  on affiliate_clicks (partner_id, clicked_at desc);
create index if not exists idx_affiliate_clicks_country
  on affiliate_clicks (country_code, clicked_at desc);
create index if not exists idx_affiliate_clicks_category
  on affiliate_clicks (category, clicked_at desc);

create index if not exists idx_affiliate_conversions_provider
  on affiliate_conversions (provider_id, converted_at desc);
create index if not exists idx_affiliate_conversions_click
  on affiliate_conversions (click_id);


-- ============================================================
-- 7. RLS FOR THE NEW TABLES
--
-- Additive only. Public gets read access to availability rows (needed
-- to render recommendations) and NO access at all to conversions.
-- Tightening of the PRE-EXISTING policies is in the hardening file.
-- ============================================================
alter table affiliate_canonical_categories enable row level security;
drop policy if exists "Public can read canonical categories" on affiliate_canonical_categories;
create policy "Public can read canonical categories"
  on affiliate_canonical_categories for select using (active = true);
drop policy if exists "Authenticated can manage canonical categories" on affiliate_canonical_categories;
create policy "Authenticated can manage canonical categories"
  on affiliate_canonical_categories for all using (auth.role() = 'authenticated');

alter table affiliate_provider_countries enable row level security;
drop policy if exists "Public can read available countries" on affiliate_provider_countries;
create policy "Public can read available countries"
  on affiliate_provider_countries for select using (available = true);
drop policy if exists "Authenticated can manage provider countries" on affiliate_provider_countries;
create policy "Authenticated can manage provider countries"
  on affiliate_provider_countries for all using (auth.role() = 'authenticated');

-- Conversions carry revenue. No anonymous access, and no client-side
-- writes ever: the future network integration will use the service role.
alter table affiliate_conversions enable row level security;
drop policy if exists "Authenticated can read conversions" on affiliate_conversions;
create policy "Authenticated can read conversions"
  on affiliate_conversions for select using (auth.role() = 'authenticated');
revoke all on affiliate_conversions from anon;


-- ============================================================
-- 8. FORWARD-COMPATIBLE VIEW
--
-- The specification names the registry `affiliate_providers`.
-- The physical table is `affiliate_partners`. This read-only view
-- gives the specified name without forking the data.
-- ============================================================
create or replace view affiliate_providers as
select
  p.id,
  p.slug,
  p.company_name           as name,
  p.canonical_category     as category,
  p.network,
  p.short_description      as description,
  p.official_website_url   as website_url,
  p.affiliate_url,
  p.affiliate_status,
  p.affiliate_status       as approval_status,
  p.commission_type,
  p.commission_value,
  p.commission_notes,
  p.cookie_days,
  p.recurring,
  p.featured,
  p.placement_type,
  p.trust_score,
  p.global_priority,
  p.priority               as legacy_priority,
  p.available_globally,
  p.active,
  p.disclosure_required,
  p.terms_notes,
  p.created_at,
  p.updated_at
from affiliate_partners p;

comment on view affiliate_providers is
  'Read-only alias over affiliate_partners using the M-AFFILIATE-1 field names. Deliberately omits notes, internal_notes, and account_identifier.';


-- ============================================================
-- 9. PROVIDER SEED
--
-- EVERY provider below is seeded as:
--     affiliate_status = 'not_applied'
--     affiliate_url    = NULL
--     placement_type   = 'editorial'
--     active           = true   (the entry is visible as a resource)
--
-- Being in this table does NOT monetize a provider. The /go router
-- requires affiliate_status = 'approved' AND a stored affiliate_url
-- before it will ever emit an affiliate destination.
--
-- commission_value is NULL everywhere. Commission terms are not
-- publicly disclosed by these programs and are NEVER estimated.
--
-- Existing rows are protected by `on conflict (slug) do nothing`.
-- ============================================================
insert into affiliate_partners (
  company_name, slug, canonical_category, network,
  short_description, official_website_url,
  affiliate_url, affiliate_status, placement_type,
  commission_value, commission_notes,
  cta_label, priority, global_priority,
  featured, active, show_on_homepage, show_disclosure,
  disclosure_required, available_globally
)
select
  v.company_name, v.slug, v.canonical_category, v.network,
  v.short_description, v.official_website_url,
  null, 'not_applied', 'editorial',
  null, 'Not publicly disclosed',
  'Visit Official Website', 0, v.global_priority,
  false, true, false, true,
  true, false
from (values
  -- ---------- MONEY TRANSFER ----------
  ('Ria Money Transfer', 'ria',            'MONEY_TRANSFER', null, 'Money transfer with a large cash-pickup agent network.',                     'https://www.riamoneytransfer.com', 70),
  ('Paysend',            'paysend',        'MONEY_TRANSFER', null, 'Card-to-card international transfers with flat fees.',                       'https://paysend.com',              60),
  ('Xe Money Transfer',  'xe',             'MONEY_TRANSFER', null, 'Currency exchange and international bank transfers.',                        'https://www.xe.com',               60),
  ('OFX',                'ofx',            'MONEY_TRANSFER', null, 'International transfers oriented toward larger amounts.',                    'https://www.ofx.com',              50),
  ('Xoom',               'xoom',           'MONEY_TRANSFER', null, 'PayPal service for sending money abroad.',                                   'https://www.xoom.com',             55),
  ('Payoneer',           'payoneer',       'MONEY_TRANSFER', null, 'Cross-border payments aimed at freelancers and businesses.',                 'https://www.payoneer.com',         45),
  ('Instarem',           'instarem',       'MONEY_TRANSFER', null, 'Online transfers with published rates, strongest in Asia-Pacific.',          'https://www.instarem.com',         45),
  ('Western Union',      'western-union',  'MONEY_TRANSFER', null, 'One of the largest cash-pickup networks worldwide.',                         'https://www.westernunion.com',     75),
  ('TapTap Send',        'taptap-send',    'MONEY_TRANSFER', null, 'Mobile-first remittance app focused on Africa and Asia corridors.',          'https://www.taptapsend.com',       40),
  ('LemFi',              'lemfi',          'MONEY_TRANSFER', null, 'Remittance app focused on African and South Asian corridors.',               'https://www.lemfi.com',            40),
  ('Small World',        'small-world',    'MONEY_TRANSFER', null, 'Money transfer with cash pickup and bank deposit.',                          'https://www.smallworldfs.com',     35),
  ('Revolut',            'revolut',        'MONEY_TRANSFER', null, 'Multi-currency account and card with international transfers.',              'https://www.revolut.com',          40),
  ('Skrill',             'skrill',         'MONEY_TRANSFER', null, 'Digital wallet supporting international transfers.',                         'https://www.skrill.com',           30),
  ('Panda Remit',        'panda-remit',    'MONEY_TRANSFER', null, 'Online remittance service with a focus on Asian corridors.',                 'https://www.pandaremit.com',       30),
  ('Airtm',              'airtm',          'MONEY_TRANSFER', null, 'Peer-to-peer dollar wallet used widely in Latin America.',                   'https://www.airtm.com',            30),
  ('Grey',               'grey',           'MONEY_TRANSFER', null, 'Virtual foreign accounts for receiving international payments.',             'https://www.grey.co',              30),
  ('ACE Money Transfer', 'ace',            'MONEY_TRANSFER', null, 'Remittance service covering Asian and African corridors.',                   'https://acemoneytransfer.com',     30),

  -- ---------- TRAVEL ----------
  ('Travelpayouts',      'travelpayouts',  'FLIGHTS',           'travelpayouts', 'Travel affiliate network aggregating flight, hotel, and activity partners.', 'https://www.travelpayouts.com', 90),
  ('Booking.com',        'booking',        'HOTELS',            null,            'Large global accommodation booking platform.',                              'https://www.booking.com',       85),
  ('Agoda',              'agoda',          'HOTELS',            null,            'Accommodation booking with strong Asia-Pacific coverage.',                  'https://www.agoda.com',         80),
  ('Trip.com',           'trip-com',       'HOTELS',            null,            'Flights, hotels, and rail booking.',                                        'https://www.trip.com',          70),
  ('Hostelworld',        'hostelworld',    'HOSTELS',           null,            'Hostel and budget accommodation booking.',                                  'https://www.hostelworld.com',   70),
  ('Kiwi.com',           'kiwi',           'FLIGHTS',           null,            'Flight search including self-transfer multi-stop routes.',                  'https://www.kiwi.com',          70),
  ('Discover Cars',      'discover-cars',  'CAR_RENTAL',        null,            'Car rental comparison across local and international suppliers.',           'https://www.discovercars.com',  70),
  ('GetYourGuide',       'getyourguide',   'TOURS',             null,            'Tours, activities, and skip-the-line tickets.',                             'https://www.getyourguide.com',  70),
  ('Viator',             'viator',         'TOURS',             null,            'Tours and experiences marketplace.',                                        'https://www.viator.com',        65),
  ('Klook',              'klook',          'TOURS',             null,            'Activities, transport passes, and attraction tickets in Asia-Pacific.',     'https://www.klook.com',         65),

  -- ---------- INSURANCE ----------
  -- SafetyWing is NOT seeded here. A 'safetywing' row already exists in the
  -- production database with an approved status and a real Ambassador
  -- tracking URL. Adding a second SafetyWing row would fork a live,
  -- earning relationship across two records.

  -- ---------- CAREER / EDUCATION ----------
  ('Coursera',           'coursera',       'EDUCATION',         null,            'University and industry certificate courses.',                              'https://www.coursera.org',      70),
  ('Udemy',              'udemy',          'CAREER_TRAINING',   null,            'Practical skills courses across a wide catalogue.',                         'https://www.udemy.com',         60)
) as v(company_name, slug, canonical_category, network, short_description, official_website_url, global_priority)
on conflict (slug) do nothing;

-- ------------------------------------------------------------
-- The ONE genuinely approved relationship.
--
-- NumeroMoney is seeded as 'approved' with a real, operator-owned
-- referral URL because that relationship is already proven inside this
-- repository: the link ships live on app/family-visit-travel/page.tsx
-- and was committed in 0424749 / c97019f, before this milestone.
--
-- This is a MIGRATION of an existing hardcoded link into the registry,
-- not the creation of a new affiliate relationship. It is the only row
-- in this file with a non-NULL affiliate_url.
-- ------------------------------------------------------------
insert into affiliate_partners (
  company_name, slug, canonical_category, network,
  short_description, official_website_url,
  affiliate_url, affiliate_status, placement_type,
  commission_value, commission_notes,
  cta_label, priority, global_priority,
  featured, active, show_on_homepage, show_disclosure,
  disclosure_required, available_globally, approval_date
) values (
  'NumeroMoney', 'numeromoney', 'ESIM', 'direct',
  'eSIM data plans and international phone numbers, usable before arrival.',
  'https://numero.app',
  'https://numero.app?ref=RE_29X3K', 'approved', 'affiliate',
  null, 'Not publicly disclosed',
  'Get an eSIM', 0, 95,
  false, true, false, true,
  true, true, null
)
on conflict (slug) do nothing;

-- Bring the ten pre-existing seeded partners onto the canonical vocabulary
-- WITHOUT changing their monetization state. affiliate_status is deliberately
-- untouched here — see docs/AFFILIATE-OPERATIONS.md for how the operator
-- corrects a legacy 'pending' that was never actually applied for.
update affiliate_partners
   set global_priority = coalesce(nullif(global_priority, 0), priority),
       placement_type  = coalesce(placement_type, 'editorial'),
       commission_notes = coalesce(commission_notes, 'Not publicly disclosed')
 where global_priority is null or global_priority = 0 or placement_type is null;

-- Keep the application tracker in step with any newly seeded provider.
insert into affiliate_applications (partner_id, company_name, status)
select p.id, p.company_name, 'not_applied'
  from affiliate_partners p
 where not exists (
   select 1 from affiliate_applications a where a.partner_id = p.id
 );


-- ============================================================
-- 10. VERIFICATION QUERIES (run these after applying)
-- ============================================================
-- Nothing should be monetized yet other than genuinely approved programs:
--   select slug, affiliate_status, affiliate_url is not null as has_url
--     from affiliate_partners where affiliate_status = 'approved';
--
-- Every provider should carry a canonical category:
--   select slug from affiliate_partners where canonical_category is null;
--
-- No fabricated commission figures:
--   select slug, commission_value from affiliate_partners where commission_value is not null;


-- ============================================================
-- 11. COUNTRY AVAILABILITY SEED
--
-- SOURCE OF THIS DATA: data/moneyTransferProviders.ts, field
-- `countriesFocus`. That is pre-existing editorial research already
-- shipping on the public comparison page — it is being MIGRATED into
-- the registry, not invented here.
--
-- Consequences, stated plainly:
--   * verified_at is NULL on every row. Nobody has checked these
--     corridors against each provider's own published country list.
--   * availability_notes says so, and the admin UI surfaces it.
--   * `priority` encodes the order the corridor was listed in the
--     editorial data. It is a display ordering, NOT a claim that one
--     provider is cheaper, faster, or better than another.
--
-- Countries the site has no guide for were skipped.
-- ============================================================
insert into affiliate_provider_countries
  (provider_id, country_code, available, priority, availability_notes, verified_at)
select p.id, v.country_code, true, v.priority,
       'Editorial research migrated from data/moneyTransferProviders.ts. Corridor not yet verified against the provider''s own published country list.',
       null
from (values
  ('wise', 'PH', 70),
  ('wise', 'VN', 60),
  ('wise', 'IN', 50),
  ('wise', 'TH', 40),
  ('wise', 'MX', 30),
  ('wise', 'GB', 20),
  ('wise', 'RO', 10),
  ('remitly', 'MX', 80),
  ('remitly', 'GT', 70),
  ('remitly', 'SV', 60),
  ('remitly', 'HN', 50),
  ('remitly', 'PH', 40),
  ('remitly', 'IN', 30),
  ('remitly', 'NG', 20),
  ('remitly', 'JM', 10),
  ('worldremit', 'NG', 70),
  ('worldremit', 'GH', 60),
  ('worldremit', 'PH', 50),
  ('worldremit', 'VN', 40),
  ('worldremit', 'KH', 30),
  ('worldremit', 'JM', 20),
  ('worldremit', 'HN', 10),
  ('moneygram', 'MX', 90),
  ('moneygram', 'GT', 80),
  ('moneygram', 'SV', 70),
  ('moneygram', 'PH', 60),
  ('moneygram', 'VN', 50),
  ('moneygram', 'KH', 40),
  ('moneygram', 'LA', 30),
  ('moneygram', 'NG', 20),
  ('moneygram', 'GH', 10),
  ('western-union', 'MX', 100),
  ('western-union', 'SV', 90),
  ('western-union', 'GT', 80),
  ('western-union', 'HN', 70),
  ('western-union', 'PH', 60),
  ('western-union', 'LA', 50),
  ('western-union', 'KH', 40),
  ('western-union', 'VN', 30),
  ('western-union', 'NG', 20),
  ('western-union', 'GH', 10),
  ('ria', 'MX', 60),
  ('ria', 'GT', 50),
  ('ria', 'SV', 40),
  ('ria', 'HN', 30),
  ('ria', 'DO', 20),
  ('ria', 'JM', 10),
  ('xe', 'IN', 50),
  ('xe', 'PH', 40),
  ('xe', 'GB', 30),
  ('xe', 'RO', 20),
  ('xe', 'PL', 10),
  ('ofx', 'IN', 30),
  ('ofx', 'PH', 20),
  ('ofx', 'GB', 10),
  ('paysend', 'VN', 60),
  ('paysend', 'PH', 50),
  ('paysend', 'IN', 40),
  ('paysend', 'PK', 30),
  ('paysend', 'UA', 20),
  ('paysend', 'RO', 10),
  ('payoneer', 'PH', 70),
  ('payoneer', 'IN', 60),
  ('payoneer', 'PK', 50),
  ('payoneer', 'BD', 40),
  ('payoneer', 'NG', 30),
  ('payoneer', 'GH', 20),
  ('payoneer', 'VN', 10),
  ('xoom', 'MX', 70),
  ('xoom', 'GT', 60),
  ('xoom', 'SV', 50),
  ('xoom', 'HN', 40),
  ('xoom', 'PH', 30),
  ('xoom', 'IN', 20),
  ('xoom', 'DO', 10),
  ('ace', 'PK', 50),
  ('ace', 'BD', 40),
  ('ace', 'IN', 30),
  ('ace', 'NG', 20),
  ('ace', 'GH', 10),
  ('small-world', 'MX', 50),
  ('small-world', 'CO', 40),
  ('small-world', 'EC', 30),
  ('small-world', 'RO', 20),
  ('small-world', 'AL', 10),
  ('instarem', 'PH', 50),
  ('instarem', 'IN', 40),
  ('instarem', 'ID', 30),
  ('instarem', 'TH', 20),
  ('instarem', 'VN', 10),
  ('taptap-send', 'NG', 40),
  ('taptap-send', 'GH', 30),
  ('taptap-send', 'CM', 20),
  ('taptap-send', 'ET', 10),
  ('lemfi', 'NG', 20),
  ('lemfi', 'GH', 10),
  ('revolut', 'GB', 50),
  ('revolut', 'RO', 40),
  ('revolut', 'AL', 30),
  ('revolut', 'PL', 20),
  ('revolut', 'UA', 10),
  ('skrill', 'IN', 50),
  ('skrill', 'PH', 40),
  ('skrill', 'VN', 30),
  ('skrill', 'RO', 20),
  ('skrill', 'AL', 10),
  ('panda-remit', 'CN', 10),
  ('airtm', 'VE', 40),
  ('airtm', 'EC', 30),
  ('airtm', 'CO', 20),
  ('airtm', 'MX', 10),
  ('grey', 'NG', 20),
  ('grey', 'GH', 10)
) as v(slug, country_code, priority)
join affiliate_partners p on p.slug = v.slug
on conflict (provider_id, country_code) do nothing;
