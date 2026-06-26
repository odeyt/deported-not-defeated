-- ============================================================
-- Deported Not Defeated — Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- COUNTRIES
-- ============================================================
create table if not exists countries (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  name text not null,
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- CITIES
-- ============================================================
create table if not exists cities (
  id uuid primary key default uuid_generate_v4(),
  country_code text not null references countries(code),
  name text not null,
  created_at timestamptz default now()
);

-- ============================================================
-- CATEGORIES
-- ============================================================
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  icon text,
  created_at timestamptz default now()
);

-- ============================================================
-- DIRECTORY LISTINGS
-- ============================================================
create table if not exists directory_listings (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  category text not null,
  city text not null,
  address text,
  phone text,
  whatsapp text,
  facebook_url text,
  website_url text,
  google_maps_url text,
  english_speaking boolean default false,
  verified boolean default false,
  featured boolean default false,
  description text,
  notes text,
  is_affiliate boolean default false,
  country_code text not null default 'LA',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- ARTICLES
-- ============================================================
create table if not exists articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null default '',
  country_code text,
  category text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- RESOURCES
-- ============================================================
create table if not exists resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  url text,
  type text, -- 'checklist', 'guide', 'tool', 'link'
  country_code text,
  created_at timestamptz default now()
);

-- ============================================================
-- AFFILIATE LINKS
-- ============================================================
create table if not exists affiliate_links (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null,
  description text not null default '',
  url text not null,
  country text,
  active boolean default true,
  featured boolean default false,
  disclosure_text text,
  created_at timestamptz default now()
);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  country text,
  need_help_with text,
  created_at timestamptz default now()
);

-- ============================================================
-- USER PROFILES
-- ============================================================
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text default 'user', -- 'user', 'admin'
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Directory listings: public read
alter table directory_listings enable row level security;
create policy "Public can read listings" on directory_listings for select using (true);
create policy "Admins can manage listings" on directory_listings for all
  using (auth.role() = 'authenticated');

-- Affiliate links: public read
alter table affiliate_links enable row level security;
create policy "Public can read affiliates" on affiliate_links for select using (true);
create policy "Admins can manage affiliates" on affiliate_links for all
  using (auth.role() = 'authenticated');

-- Articles: public read published
alter table articles enable row level security;
create policy "Public can read published articles" on articles for select using (published = true);
create policy "Admins can manage articles" on articles for all
  using (auth.role() = 'authenticated');

-- Newsletter: insert only for public
alter table newsletter_subscribers enable row level security;
create policy "Anyone can subscribe" on newsletter_subscribers for insert with check (true);
create policy "Admins can view subscribers" on newsletter_subscribers for select
  using (auth.role() = 'authenticated');

-- Contact: insert only for public
alter table contact_messages enable row level security;
create policy "Anyone can send message" on contact_messages for insert with check (true);
create policy "Admins can view messages" on contact_messages for select
  using (auth.role() = 'authenticated');

-- Countries and cities: public read
alter table countries enable row level security;
create policy "Public can read countries" on countries for select using (true);

alter table cities enable row level security;
create policy "Public can read cities" on cities for select using (true);
