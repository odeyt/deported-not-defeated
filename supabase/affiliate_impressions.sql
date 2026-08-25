-- ============================================================
-- M-GROWTH1A — Affiliate impression tracking (ADDITIVE)
--
-- Clicks were already recorded. Without the denominator, affiliate CTR could
-- not be calculated at all, and using pageviews instead would have been an
-- approximation dressed up as a measurement.
--
-- PRIVACY
--   Commercial fields only. There is deliberately no column for IP, user
--   agent, referrer, session, or anything about a person's circumstances —
--   the same contract as affiliate_clicks. A schema that cannot hold personal
--   data cannot leak it.
--
-- WRITE PATH
--   Server-side only, through the service role, from /api/affiliate-impression.
--   Anonymous inserts are never granted, matching the click-forgery hardening.
-- ============================================================

begin;

create table if not exists affiliate_impressions (
  id           uuid primary key default gen_random_uuid(),
  provider_id  uuid references affiliate_partners(id) on delete set null,
  partner_slug text,
  country_code text,
  category     text,
  placement    text,
  campaign     text,
  page_path    text,
  occurred_at  timestamptz not null default now()
);

comment on table affiliate_impressions is
  'One row per provider card actually rendered to a visitor. Denominator for affiliate CTR. Commercial fields only - never personal data.';

create index if not exists idx_aff_impressions_occurred  on affiliate_impressions (occurred_at desc);
create index if not exists idx_aff_impressions_provider  on affiliate_impressions (provider_id, occurred_at desc);
create index if not exists idx_aff_impressions_placement on affiliate_impressions (placement, occurred_at desc);
create index if not exists idx_aff_impressions_country   on affiliate_impressions (country_code, occurred_at desc);

alter table affiliate_impressions enable row level security;

-- Same posture as affiliate_clicks after hardening: no anonymous access at all.
-- The service role bypasses RLS; admins read through their own policy.
revoke all on affiliate_impressions from anon;

drop policy if exists "Admins can view impressions" on affiliate_impressions;
create policy "Admins can view impressions"
  on affiliate_impressions for select
  using (public.is_affiliate_admin());

commit;

-- ============================================================
-- CTR, once there is data
--
--   select
--     i.partner_slug,
--     i.placement,
--     count(distinct i.id)                        as impressions,
--     count(distinct c.id)                        as clicks,
--     round(100.0 * count(distinct c.id)
--           / nullif(count(distinct i.id), 0), 2) as ctr_percent
--   from affiliate_impressions i
--   left join affiliate_clicks c
--     on c.partner_slug = i.partner_slug
--    and c.placement    = i.placement
--    and c.clicked_at   >= i.occurred_at
--    and c.clicked_at   <  i.occurred_at + interval '30 minutes'
--   group by 1, 2
--   order by impressions desc;
--
-- Page CTR and affiliate-module CTR are different numbers. This one is the
-- module CTR: clicks per card actually shown.
-- ============================================================
