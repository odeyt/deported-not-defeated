-- ============================================================
-- Deported Not Defeated — Affiliate System Migration
-- Run this in the Supabase SQL editor
-- ============================================================

-- ============================================================
-- AFFILIATE CATEGORIES
-- ============================================================
create table if not exists affiliate_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  display_order integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- AFFILIATE PARTNERS
-- ============================================================
create table if not exists affiliate_partners (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references affiliate_categories(id),
  company_name text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  why_it_fits text,
  typical_potential text,
  official_website_url text,
  affiliate_url text,
  placeholder_url text default '#',
  affiliate_status text default 'pending',
  cta_label text default 'Learn More',
  logo_url text,
  country_focus text default 'Laos',
  priority integer default 0,
  featured boolean default false,
  active boolean default true,
  show_on_homepage boolean default false,
  show_disclosure boolean default true,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- AFFILIATE CLICKS
-- ============================================================
create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references affiliate_partners(id),
  partner_slug text,
  page_path text,
  referrer text,
  user_agent text,
  ip_hash text,
  clicked_at timestamptz default now()
);

-- ============================================================
-- AFFILIATE APPLICATIONS
-- ============================================================
create table if not exists affiliate_applications (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references affiliate_partners(id),
  company_name text,
  application_url text,
  login_url text,
  username_used text,
  status text default 'not_applied',
  commission_notes text,
  approval_notes text,
  date_applied date,
  date_approved date,
  follow_up_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table affiliate_categories enable row level security;
create policy "Public can read categories" on affiliate_categories for select using (active = true);
create policy "Admins can manage categories" on affiliate_categories for all using (auth.role() = 'authenticated');

alter table affiliate_partners enable row level security;
create policy "Public can read active partners" on affiliate_partners for select using (active = true);
create policy "Admins can manage partners" on affiliate_partners for all using (auth.role() = 'authenticated');

alter table affiliate_clicks enable row level security;
create policy "Anyone can log clicks" on affiliate_clicks for insert with check (true);
create policy "Admins can view clicks" on affiliate_clicks for select using (auth.role() = 'authenticated');

alter table affiliate_applications enable row level security;
create policy "Admins can manage applications" on affiliate_applications for all using (auth.role() = 'authenticated');

-- ============================================================
-- SEED: AFFILIATE CATEGORIES
-- ============================================================
insert into affiliate_categories (name, slug, description, display_order) values
  ('Money Transfer',   'money-transfer',   'Services that help families send money internationally.',                            1),
  ('Phone & Internet', 'phone-internet',   'eSIM, phone data, and internet tools for new arrivals.',                            2),
  ('VPN & Privacy',    'vpn-privacy',      'Privacy tools for secure browsing, banking, and public WiFi.',                      3),
  ('Health Insurance', 'health-insurance', 'Insurance options for people living or traveling overseas.',                         4)
on conflict (slug) do nothing;

-- ============================================================
-- SEED: AFFILIATE PARTNERS
-- ============================================================
insert into affiliate_partners (
  category_id, company_name, slug,
  short_description, why_it_fits, typical_potential,
  official_website_url, affiliate_url, placeholder_url,
  affiliate_status, cta_label,
  priority, featured, active, show_on_homepage
)
select
  c.id,
  p.company_name, p.slug,
  p.short_description, p.why_it_fits, p.typical_potential,
  p.official_website_url, null, '#',
  'pending', p.cta_label,
  p.priority, p.featured, true, p.show_on_homepage
from affiliate_categories c
join (values
  -- Money Transfer
  ('money-transfer', 'Wise',       'wise',
   'International money transfers with transparent fees and real exchange rates.',
   'Transparent international money transfers for people receiving support from family overseas.',
   'Medium-High',
   'https://wise.com', 'View Wise Guide',      100, true,  true),
  ('money-transfer', 'Remitly',    'remitly',
   'Fast, affordable money transfers from the USA to over 100 countries.',
   'Popular money transfer option for families sending money from the USA.',
   'Medium',
   'https://www.remitly.com', 'View Remitly Guide',   95, true,  false),
  ('money-transfer', 'WorldRemit', 'worldremit',
   'Global remittance service available in over 130 countries.',
   'Global remittance service for international money transfers.',
   'Medium',
   'https://www.worldremit.com', 'View WorldRemit Guide', 90, false, false),
  ('money-transfer', 'MoneyGram',  'moneygram',
   'Cash pickup and worldwide money transfer with thousands of agent locations.',
   'Cash pickup and worldwide money transfer options.',
   'Medium',
   'https://www.moneygram.com', 'View MoneyGram Guide',  85, false, false),
  -- Phone & Internet
  ('phone-internet', 'Airalo',    'airalo',
   'Buy and activate eSIM data plans online before or after you arrive.',
   'eSIM service that helps people get internet access quickly after arrival.',
   'Medium',
   'https://www.airalo.com', 'View Airalo Guide',    100, true, true),
  ('phone-internet', 'Holafly',   'holafly',
   'Unlimited-data eSIM plans for international travelers and new arrivals.',
   'Unlimited-data eSIM option for international travelers and new arrivals.',
   'Medium',
   'https://esim.holafly.com', 'View Holafly Guide',   95, true, false),
  -- VPN & Privacy
  ('vpn-privacy', 'NordVPN',   'nordvpn',
   'Industry-leading VPN with servers in 60+ countries and strong privacy features.',
   'Helps protect online privacy, especially on public WiFi and during online banking.',
   'High',
   'https://nordvpn.com', 'View NordVPN Guide',    100, true, true),
  ('vpn-privacy', 'Surfshark', 'surfshark',
   'Budget-friendly VPN with unlimited devices and strong privacy tools.',
   'Budget-friendly VPN with support for multiple devices.',
   'High',
   'https://surfshark.com', 'View Surfshark Guide',  95, true, false),
  -- Health Insurance
  ('health-insurance', 'SafetyWing',  'safetywing',
   'Flexible, affordable international health insurance for travelers and expats.',
   'International health insurance option for people living or traveling abroad.',
   'High',
   'https://safetywing.com', 'View SafetyWing Guide', 100, true, true),
  ('health-insurance', 'Genki',       'genki',
   'Health insurance designed for expats, remote workers, and long-term travelers.',
   'Health insurance option for expats, travelers, and people living internationally.',
   'High',
   'https://genki.world', 'View Genki Guide',      95, true, false)
) as p(cat_slug, company_name, slug,
       short_description, why_it_fits, typical_potential,
       official_website_url, cta_label,
       priority, featured, show_on_homepage)
on (c.slug = p.cat_slug)
on conflict (slug) do nothing;

-- ============================================================
-- SEED: AFFILIATE APPLICATIONS (one per partner)
-- ============================================================
insert into affiliate_applications (partner_id, company_name, status)
select id, company_name, 'not_applied'
from affiliate_partners
on conflict do nothing;
