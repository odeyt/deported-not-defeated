-- ============================================================
-- M-AFFILIATE-1 — Central Affiliate Revenue Engine
-- Deported Not Defeated
--
-- HOW TO RUN
--   Paste this whole file into the Supabase SQL editor and run it.
--
-- SAFETY
--   * Fully ADDITIVE. Creates new tables/views/functions only.
--   * Touches ONE existing table (affiliate_clicks) and only by ADDING
--     nullable columns. No column is dropped, renamed, or retyped.
--   * Does NOT modify affiliate_partners, affiliate_links,
--     affiliate_categories, or affiliate_applications.
--   * Idempotent — safe to run more than once.
--
-- MONETIZATION SAFETY
--   Every provider is seeded NOT_APPLIED with affiliate_url = NULL.
--   Running this file monetizes nothing. A provider can only ever produce
--   a monetized link once an operator sets affiliate_status = 'APPROVED'
--   AND pastes a real affiliate_url AND sets active = true.
-- ============================================================


-- ============================================================
-- 1. CATEGORIES
--    A table (not an enum / not a CHECK) so new categories are an INSERT,
--    never a migration.
-- ============================================================
create table if not exists affiliate_provider_categories (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  label         text not null,
  description   text,
  display_order integer not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

insert into affiliate_provider_categories (code, label, display_order) values
  ('MONEY_TRANSFER',   'Money Transfer',      10),
  ('FLIGHTS',          'Flights',             20),
  ('HOTELS',           'Hotels',              30),
  ('HOSTELS',          'Hostels',             40),
  ('ESIM',             'eSIM & Mobile Data',  50),
  ('VPN',              'VPN & Privacy',       60),
  ('TRAVEL_INSURANCE', 'Travel Insurance',    70),
  ('CAR_RENTAL',       'Car Rental',          80),
  ('AIRPORT_TRANSFER', 'Airport Transfer',    90),
  ('TOURS',            'Tours & Activities',  100),
  ('EDUCATION',        'Education',           110),
  ('CAREER_TRAINING',  'Career Training',     120),
  ('TEFL_TESOL',       'TEFL / TESOL',        130),
  ('REMOTE_WORK',      'Remote Work',         140),
  ('RESUME',           'Resume Tools',        150),
  ('BUSINESS_TOOLS',   'Business Tools',      160),
  ('LEGAL',            'Legal Services',      170),
  ('TRANSLATION',      'Translation',         180),
  ('SHIPPING',         'Shipping',            190),
  ('PHONE_INTERNET',   'Phone & Internet',    200)
on conflict (code) do nothing;


-- ============================================================
-- 2. PROVIDER REGISTRY
-- ============================================================
create table if not exists affiliate_providers (
  id                 uuid primary key default gen_random_uuid(),
  slug               text unique not null,
  name               text not null,
  category           text not null references affiliate_provider_categories(code),

  -- Network is metadata. The provider is the business entity; the engine is
  -- never coupled to a single network.
  network            text not null default 'DIRECT'
                       check (network in ('TRAVELPAYOUTS','IMPACT','AWIN','PARTNERIZE',
                                          'PARTNERSTACK','CJ','DIRECT','OTHER')),

  description        text,
  website_url        text,   -- ordinary public site. Non-monetized fallback.
  affiliate_url      text,   -- real tracking URL. NULL until a human pastes one.

  -- Seven-state approval lifecycle.
  affiliate_status   text not null default 'NOT_APPLIED'
                       check (affiliate_status in ('NOT_APPLIED','APPLIED','PENDING',
                                                   'APPROVED','REJECTED','PAUSED','EXPIRED')),

  -- Commercial terms. NULL means unknown — never guess.
  commission_type    text check (commission_type in ('CPA','REVSHARE','HYBRID','CPL','UNKNOWN')),
  commission_value   numeric,
  commission_notes   text default 'Not publicly disclosed',
  cookie_days        integer,
  recurring          boolean not null default false,

  -- Presentation / ranking. Editorial, never commission-derived.
  featured           boolean not null default false,
  trust_score        integer not null default 50 check (trust_score between 0 and 100),
  global_priority    integer not null default 0,

  active             boolean not null default false,  -- visible on the site at all
  disclosure_required boolean not null default true,

  -- Per-network sub-id parameter name (e.g. Travelpayouts uses one name,
  -- Impact another). NULL = append nothing. Never guess this value; read the
  -- network's own documentation first.
  sub_id_param       text,

  terms_notes        text,

  -- Application tracker (operator workflow, not public).
  account_identifier text,   -- publisher/account id. NEVER a password or API secret.
  applied_at         date,
  approved_at        date,
  internal_notes     text,

  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);


-- ============================================================
-- 3. COUNTRY AVAILABILITY
--    Availability is NEVER assumed. No row = unknown = excluded from
--    country-scoped recommendations.
-- ============================================================
create table if not exists affiliate_provider_countries (
  id                 uuid primary key default gen_random_uuid(),
  provider_id        uuid not null references affiliate_providers(id) on delete cascade,
  country_code       text not null check (country_code ~ '^[A-Z]{2}$'),  -- ISO-3166-1 alpha-2
  available          boolean not null default true,
  priority           integer not null default 0,
  availability_notes text,
  verified_at        date,   -- NULL = not yet verified against the provider
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (provider_id, country_code)
);


-- ============================================================
-- 4. CLICK ANALYTICS (additive extension of the existing table)
--
--    PRIVACY: this engine writes commercial fields only. It never writes
--    immigration status, deportation reason, case details, or identity
--    documents. The log_affiliate_click() RPC below cannot accept them.
-- ============================================================

-- Fallback create for a fresh database where affiliate_system.sql was never run.
-- No FK to affiliate_partners here so this works standalone.
create table if not exists affiliate_clicks (
  id           uuid primary key default gen_random_uuid(),
  partner_id   uuid,
  partner_slug text,
  page_path    text,
  referrer     text,
  user_agent   text,
  ip_hash      text,
  clicked_at   timestamptz default now()
);

alter table affiliate_clicks add column if not exists provider_id        uuid references affiliate_providers(id) on delete set null;
alter table affiliate_clicks add column if not exists country_code       text;
alter table affiliate_clicks add column if not exists category           text;
alter table affiliate_clicks add column if not exists placement          text;
alter table affiliate_clicks add column if not exists campaign           text;
alter table affiliate_clicks add column if not exists session_identifier text;
-- NOTE: source_page maps onto the existing page_path column. No duplicate column.


-- ============================================================
-- 5. CONVERSIONS (schema + service boundary only)
--    No webhook, no fake data. Real network APIs connect here later.
-- ============================================================
create table if not exists affiliate_conversions (
  id                     uuid primary key default gen_random_uuid(),
  provider_id            uuid references affiliate_providers(id) on delete set null,
  network                text,
  external_conversion_id text,
  click_id               uuid references affiliate_clicks(id) on delete set null,
  country_code           text,
  revenue                numeric,
  currency               text default 'USD',
  status                 text not null default 'PENDING'
                           check (status in ('PENDING','APPROVED','REJECTED','PAID')),
  converted_at           timestamptz,
  created_at             timestamptz not null default now(),
  unique (network, external_conversion_id)
);


-- ============================================================
-- 6. INDEXES
-- ============================================================
create index if not exists idx_aff_providers_category_active on affiliate_providers (category, active);
create index if not exists idx_aff_providers_status          on affiliate_providers (affiliate_status);
create index if not exists idx_aff_providers_ranking         on affiliate_providers (global_priority desc, trust_score desc);
create index if not exists idx_aff_countries_country         on affiliate_provider_countries (country_code, available);
create index if not exists idx_aff_countries_provider        on affiliate_provider_countries (provider_id);
create index if not exists idx_aff_clicks_clicked_at         on affiliate_clicks (clicked_at desc);
create index if not exists idx_aff_clicks_provider           on affiliate_clicks (provider_id);
create index if not exists idx_aff_clicks_country            on affiliate_clicks (country_code);
create index if not exists idx_aff_clicks_category           on affiliate_clicks (category);
create index if not exists idx_aff_conversions_provider      on affiliate_conversions (provider_id);


-- ============================================================
-- 7. updated_at TRIGGERS
-- ============================================================
create or replace function set_affiliate_engine_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_aff_providers_updated on affiliate_providers;
create trigger trg_aff_providers_updated
  before update on affiliate_providers
  for each row execute function set_affiliate_engine_updated_at();

drop trigger if exists trg_aff_countries_updated on affiliate_provider_countries;
create trigger trg_aff_countries_updated
  before update on affiliate_provider_countries
  for each row execute function set_affiliate_engine_updated_at();


-- ============================================================
-- 8. ROW LEVEL SECURITY
--
--    affiliate_providers has NO public SELECT policy on purpose. The public
--    never reads the base table, so affiliate_url, commission terms, account
--    identifiers, and internal notes are never exposed. Public reads go
--    through the restricted views in section 9.
-- ============================================================
alter table affiliate_provider_categories enable row level security;
drop policy if exists "Public reads affiliate categories" on affiliate_provider_categories;
create policy "Public reads affiliate categories"
  on affiliate_provider_categories for select using (active = true);
drop policy if exists "Admins manage affiliate categories" on affiliate_provider_categories;
create policy "Admins manage affiliate categories"
  on affiliate_provider_categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table affiliate_providers enable row level security;
drop policy if exists "Admins manage affiliate providers" on affiliate_providers;
create policy "Admins manage affiliate providers"
  on affiliate_providers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table affiliate_provider_countries enable row level security;
drop policy if exists "Admins manage affiliate provider countries" on affiliate_provider_countries;
create policy "Admins manage affiliate provider countries"
  on affiliate_provider_countries for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table affiliate_conversions enable row level security;
drop policy if exists "Admins manage affiliate conversions" on affiliate_conversions;
create policy "Admins manage affiliate conversions"
  on affiliate_conversions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');


-- ============================================================
-- 9. PUBLIC READ VIEWS
--
--    These views run with the owner's rights (PostgreSQL default:
--    security_invoker = false), so they can read the RLS-protected base
--    tables while exposing ONLY render-safe columns.
--
--    Deliberately NOT exposed: affiliate_url, commission_*, cookie_days,
--    account_identifier, internal_notes, terms_notes, sub_id_param.
-- ============================================================
create or replace view affiliate_providers_public as
  select
    p.id,
    p.slug,
    p.name,
    p.category,
    p.network,
    p.description,
    p.website_url,
    -- Whether a monetized destination exists. Not the URL itself.
    (p.affiliate_status = 'APPROVED' and p.affiliate_url is not null) as monetized,
    p.featured,
    p.trust_score,
    p.global_priority,
    p.disclosure_required
  from affiliate_providers p
  where p.active = true;

create or replace view affiliate_provider_countries_public as
  select
    c.provider_id,
    c.country_code,
    c.available,
    c.priority,
    c.availability_notes
  from affiliate_provider_countries c
  join affiliate_providers p on p.id = c.provider_id
  where p.active = true;

grant select on affiliate_providers_public          to anon, authenticated;
grant select on affiliate_provider_countries_public to anon, authenticated;


-- ============================================================
-- 10. DESTINATION RESOLVER
--
--     The monetization gate lives in the database, not only in application
--     code. A provider that is not APPROVED + active can never return an
--     affiliate URL, no matter what the caller asks for.
-- ============================================================
create or replace function resolve_affiliate_destination(p_slug text)
returns table (
  provider_id     uuid,
  provider_name   text,
  provider_slug   text,
  category        text,
  destination_url text,
  monetized       boolean,
  sub_id_param    text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.name,
    p.slug,
    p.category,
    case
      when p.affiliate_status = 'APPROVED' and p.affiliate_url is not null
        then p.affiliate_url
      else p.website_url
    end,
    (p.affiliate_status = 'APPROVED' and p.affiliate_url is not null),
    -- Not a secret: the sub-id parameter name is visible in the final URL.
    -- Returned so the router can attach campaign context for the network.
    p.sub_id_param
  from affiliate_providers p
  where p.slug = p_slug
    and p.active = true
  limit 1;
$$;

grant execute on function resolve_affiliate_destination(text) to anon, authenticated;


-- ============================================================
-- 11. CLICK LOGGER
--
--     Commercial fields only. There is deliberately no parameter for IP,
--     user agent, immigration status, or any personal circumstance — the
--     function signature makes that class of mistake impossible.
-- ============================================================
create or replace function log_affiliate_click(
  p_provider_id  uuid,
  p_country_code text default null,
  p_category     text default null,
  p_source_page  text default null,
  p_placement    text default null,
  p_campaign     text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text;
  v_id   uuid;
begin
  -- Only log clicks for providers that actually exist and are active.
  select slug into v_slug
  from affiliate_providers
  where id = p_provider_id and active = true;

  if v_slug is null then
    return null;
  end if;

  insert into affiliate_clicks (
    provider_id, partner_slug, country_code, category, page_path, placement, campaign
  ) values (
    p_provider_id,
    v_slug,
    nullif(upper(left(coalesce(p_country_code, ''), 2)), ''),
    left(p_category,    64),
    left(p_source_page, 512),
    left(p_placement,   64),
    left(p_campaign,    128)
  )
  returning id into v_id;

  return v_id;
end;
$$;

grant execute on function log_affiliate_click(uuid, text, text, text, text, text) to anon, authenticated;


-- ============================================================
-- 12. PROVIDER SEED
--
--     Every row: affiliate_status = 'NOT_APPLIED', affiliate_url = NULL.
--     No tracking ID, commission rate, or cookie duration is invented.
--
--     active = true ONLY for the five money-transfer services this site
--     already recommends in existing content, whose public homepages are
--     already recorded in supabase/affiliate_system.sql and
--     supabase/affiliate_links_expanded.sql. Those render as ordinary
--     non-monetized resource links and fix the ~16 dead /go/ slugs
--     documented in docs/M-AFFILIATE-1-AUDIT.md section 4.2.
--
--     Everything else is active = false: present in the registry for the
--     operator to work through, invisible to visitors until activated.
-- ============================================================
insert into affiliate_providers
  (slug, name, category, network, description, website_url, affiliate_status,
   active, trust_score, global_priority, internal_notes)
values
  -- ---- Money transfer: active, non-monetized (already recommended on-site)
  ('wise',            'Wise',             'MONEY_TRANSFER', 'PARTNERIZE',
   'Multi-currency transfers with mid-market exchange rates. Requires a bank account to receive.',
   'https://wise.com',              'NOT_APPLIED', true,  80, 80,
   'Homepage from supabase/affiliate_system.sql. Wise runs its program through Partnerize - verify before applying.'),
  ('remitly',         'Remitly',          'MONEY_TRANSFER', 'DIRECT',
   'Family remittances with cash pickup, bank deposit, and mobile wallet options in many countries.',
   'https://www.remitly.com',       'NOT_APPLIED', true,  75, 75,
   'Homepage from supabase/affiliate_system.sql.'),
  ('western-union',   'Western Union',    'MONEY_TRANSFER', 'DIRECT',
   'Long-established cash pickup network with wide agent coverage.',
   'https://www.westernunion.com',  'NOT_APPLIED', true,  70, 70,
   'Homepage from supabase/affiliate_links_expanded.sql. Fixes the previously dead /go/western-union slug.'),
  ('moneygram',       'MoneyGram',        'MONEY_TRANSFER', 'DIRECT',
   'Cash pickup and bank deposit through a large worldwide agent network.',
   'https://www.moneygram.com',     'NOT_APPLIED', true,  70, 65,
   'Homepage from supabase/affiliate_system.sql.'),
  ('worldremit',      'WorldRemit',       'MONEY_TRANSFER', 'DIRECT',
   'Online transfers to mobile wallets, cash pickup agents, and bank accounts.',
   'https://www.worldremit.com',    'NOT_APPLIED', true,  70, 60,
   'Homepage from supabase/affiliate_system.sql.'),

  -- ---- Money transfer: registry only (inactive until operator verifies)
  ('ria',             'Ria Money Transfer','MONEY_TRANSFER','DIRECT',
   'International money transfer with a large physical agent network.',
   'https://www.riamoneytransfer.com','NOT_APPLIED', false, 60, 50,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('paysend',         'Paysend',          'MONEY_TRANSFER', 'DIRECT',
   'Card-to-card international transfers with flat fees.',
   'https://paysend.com',           'NOT_APPLIED', false, 55, 40,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('xe',              'Xe Money Transfer','MONEY_TRANSFER', 'DIRECT',
   'Currency data provider that also offers international transfers.',
   'https://www.xe.com',            'NOT_APPLIED', false, 60, 40,
   'Homepage recorded from public knowledge - verify before activation.'),

  -- ---- Travel
  ('travelpayouts',   'Travelpayouts',    'FLIGHTS',        'TRAVELPAYOUTS',
   'Travel affiliate network covering flights, hotels, and related services.',
   'https://www.travelpayouts.com', 'NOT_APPLIED', false, 60, 100,
   'Network, not a consumer brand. Strategic application priority #1.'),
  ('booking-com',     'Booking.com',      'HOTELS',         'OTHER',
   'Global hotel and accommodation booking platform.',
   'https://www.booking.com',       'NOT_APPLIED', false, 75, 90,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('agoda',           'Agoda',            'HOTELS',         'OTHER',
   'Accommodation booking with strong Asia-Pacific coverage.',
   'https://www.agoda.com',         'NOT_APPLIED', false, 70, 70,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('trip-com',        'Trip.com',         'FLIGHTS',        'OTHER',
   'Flights, hotels, and rail booking platform.',
   'https://www.trip.com',          'NOT_APPLIED', false, 65, 60,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('hostelworld',     'Hostelworld',      'HOSTELS',        'OTHER',
   'Hostel and budget accommodation booking.',
   'https://www.hostelworld.com',   'NOT_APPLIED', false, 70, 60,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('kiwi',            'Kiwi.com',         'FLIGHTS',        'OTHER',
   'Flight search combining carriers that do not normally interline.',
   'https://www.kiwi.com',          'NOT_APPLIED', false, 60, 50,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('discover-cars',   'Discover Cars',    'CAR_RENTAL',     'OTHER',
   'Rental car comparison across local and international suppliers.',
   'https://www.discovercars.com',  'NOT_APPLIED', false, 65, 50,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('getyourguide',    'GetYourGuide',     'TOURS',          'OTHER',
   'Tours, activities, and airport transfer bookings.',
   'https://www.getyourguide.com',  'NOT_APPLIED', false, 70, 50,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('viator',          'Viator',           'TOURS',          'OTHER',
   'Tours and activities marketplace.',
   'https://www.viator.com',        'NOT_APPLIED', false, 65, 40,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('klook',           'Klook',            'TOURS',          'OTHER',
   'Activities, transport passes, and attractions, strongest in Asia.',
   'https://www.klook.com',         'NOT_APPLIED', false, 65, 40,
   'Homepage recorded from public knowledge - verify before activation.'),

  -- ---- Connectivity
  ('airalo',          'Airalo',           'ESIM',           'OTHER',
   'eSIM data plans that can be bought and activated before arrival.',
   'https://www.airalo.com',        'NOT_APPLIED', false, 70, 80,
   'Homepage from supabase/affiliate_system.sql. Also present in legacy affiliate_partners.'),
  ('holafly',         'Holafly',          'ESIM',           'OTHER',
   'Unlimited-data eSIM plans for travelers.',
   'https://esim.holafly.com',      'NOT_APPLIED', false, 65, 60,
   'Homepage from supabase/affiliate_system.sql. Also present in legacy affiliate_partners.'),

  -- ---- Insurance
  ('safetywing',      'SafetyWing',       'TRAVEL_INSURANCE','OTHER',
   'Travel medical insurance aimed at long-term travelers and remote workers.',
   'https://safetywing.com',        'NOT_APPLIED', false, 70, 70,
   'Homepage from supabase/affiliate_system.sql. Also present in legacy affiliate_partners.'),

  -- ---- Privacy
  ('nordvpn',         'NordVPN',          'VPN',            'IMPACT',
   'VPN service for protecting browsing on public and untrusted networks.',
   'https://nordvpn.com',           'NOT_APPLIED', false, 70, 60,
   'Homepage from supabase/affiliate_system.sql. Also present in legacy affiliate_partners.'),
  ('surfshark',       'Surfshark',        'VPN',            'IMPACT',
   'VPN service with unlimited simultaneous device connections.',
   'https://surfshark.com',         'NOT_APPLIED', false, 65, 50,
   'Homepage from supabase/affiliate_system.sql. Also present in legacy affiliate_partners.'),

  -- ---- Education / career
  ('coursera',        'Coursera',         'EDUCATION',      'OTHER',
   'Online courses and certificates from universities and companies.',
   'https://www.coursera.org',      'NOT_APPLIED', false, 70, 50,
   'Homepage recorded from public knowledge - verify before activation.'),
  ('udemy',           'Udemy',            'CAREER_TRAINING','OTHER',
   'Marketplace of practical, job-oriented online courses.',
   'https://www.udemy.com',         'NOT_APPLIED', false, 60, 40,
   'Homepage recorded from public knowledge - verify before activation.')
on conflict (slug) do nothing;


-- ============================================================
-- 13. COUNTRY AVAILABILITY SEED — Guatemala only
--
--     Seeded ONLY where existing site content already asserts the service is
--     used for this corridor, and the source is recorded per row. Nothing is
--     assumed. verified_at is NULL everywhere: no row here has been confirmed
--     against the provider yet.
--
--     Every other country is intentionally empty. A provider with no row for
--     a country is treated as UNKNOWN and excluded from that country's
--     recommendations — never silently assumed to be available.
-- ============================================================
insert into affiliate_provider_countries
  (provider_id, country_code, available, priority, availability_notes)
select p.id, v.country_code, true, v.priority, v.notes
from (values
  ('remitly',       'GT', 100, 'Listed as the primary option on /guatemala/receive-money-usa-to-guatemala. Not yet verified with the provider.'),
  ('western-union', 'GT',  90, 'Listed for nationwide cash pickup on /guatemala/receive-money-usa-to-guatemala. Not yet verified with the provider.'),
  ('wise',          'GT',  80, 'Listed for bank transfer to Guatemalan banks on /guatemala/receive-money-usa-to-guatemala. Not yet verified with the provider.')
) as v(slug, country_code, priority, notes)
join affiliate_providers p on p.slug = v.slug
on conflict (provider_id, country_code) do nothing;


-- ============================================================
-- DONE
--
-- Verify with:
--   select slug, name, category, affiliate_status, active from affiliate_providers order by category, slug;
--   select * from affiliate_providers_public;
--   select * from resolve_affiliate_destination('remitly');
--
-- Expected after this migration:
--   * 26 providers, ALL affiliate_status = 'NOT_APPLIED', ALL affiliate_url NULL
--   * 5 providers active (money transfer), 21 inactive
--   * 3 Guatemala availability rows
--   * resolve_affiliate_destination('remitly') -> remitly.com, monetized = false
-- ============================================================
