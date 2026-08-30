-- ============================================================
-- Knowledge Center M1 — additive columns on the existing `articles` table
-- Additive migration. Run this in the Supabase SQL editor.
--
-- SAFETY CONTRACT FOR THIS FILE:
--   * Every statement is ADDITIVE or IDEMPOTENT.
--   * No table is dropped, renamed, or truncated.
--   * No column is dropped or retyped.
--   * No existing row is deleted.
--   * No existing RLS policy is dropped or made more restrictive.
--   * Safe to run while the CURRENT production build is live —
--     old code simply ignores the new columns.
--
-- `articles` already exists (supabase/schema.sql) with RLS in place:
--   "Public can read published articles" using (published = true)
--   "Admins can manage articles"        using (auth.role() = 'authenticated')
-- Both policies apply to every column, so no new RLS policy is needed here.
-- ============================================================

alter table articles
  add column if not exists tags                 text[] not null default '{}',
  add column if not exists reading_time_minutes  integer,
  add column if not exists last_updated_at       date default current_date,
  add column if not exists related_article_slugs text[] not null default '{}',
  add column if not exists related_country_slugs text[] not null default '{}',
  add column if not exists featured              boolean not null default false,
  add column if not exists affiliate_category    text,
  add column if not exists faqs                  jsonb not null default '[]'::jsonb;

comment on column articles.last_updated_at is
  'Editor-controlled content-freshness date shown to readers. Distinct from updated_at, which bumps on every row touch.';
comment on column articles.affiliate_category is
  'FK into affiliate_canonical_categories.code. Nullable — not every Knowledge Center category has an honest affiliate mapping (e.g. housing, family, success-stories).';
comment on column articles.faqs is
  'Array of {question, answer} objects rendered as an FAQBlock and, when non-empty, an FAQPage JSON-LD block.';

-- Knowledge Center category vocabulary. NOT VALID so any pre-existing legacy
-- `category` value cannot block the migration; enforced for every INSERT and
-- UPDATE from this point forward, mirroring the pattern in
-- supabase/affiliate_engine_m1.sql (affiliate_partners_placement_type_check).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'articles_category_check'
  ) then
    alter table articles
      add constraint articles_category_check
      check (category is null or category in (
        'legal', 'self-deporting', 'money', 'jobs', 'housing', 'family',
        'travel', 'healthcare', 'mental-health', 'technology',
        'starting-over', 'success-stories', 'news'
      )) not valid;
  end if;
end $$;

-- Same NOT VALID FK pattern as affiliate_partners.canonical_category
-- (supabase/affiliate_engine_m1.sql). on delete set null: removing a
-- canonical category must never delete an article, only unlink it.
do $$
begin
  if not exists (
    select 1 from pg_constraint
     where conname = 'articles_affiliate_category_fkey'
  ) then
    alter table articles
      add constraint articles_affiliate_category_fkey
      foreign key (affiliate_category)
      references affiliate_canonical_categories(code)
      on update cascade
      on delete set null
      not valid;
  end if;
end $$;

create index if not exists idx_articles_category_published
  on articles (category, published, featured desc, last_updated_at desc);
