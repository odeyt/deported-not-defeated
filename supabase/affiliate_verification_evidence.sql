-- ============================================================
-- M-AFFILIATE-VERIFY1 — Verification evidence (ADDITIVE)
--
-- Adds a queryable citation to an availability/corridor verification,
-- WITHOUT replacing the existing model. Run in the Supabase SQL editor,
-- AFTER supabase/affiliate_corridor.sql.
--
-- THE GAP THIS CLOSES
--   affiliate_provider_countries.verified_at already records THAT a row was
--   checked. It has never recorded WHAT was checked. The two rows already
--   verified in this codebase (wise/MX, remitly/MX — see
--   supabase/affiliate_corridor.sql's own bottom comment) have real source
--   URLs, but only as SQL comments — invisible to any query, any admin page,
--   any operator who did not read this file.
--
-- BACKWARD COMPATIBILITY
--   Both columns are NULLABLE and default to NULL. Every existing row keeps
--   working and keeps meaning exactly what it meant before: verified_at
--   alone still means "a human checked this", evidence_url/evidence_tier
--   just add citation on top where it exists.
--
--   No existing row is upgraded to a fabricated citation. A verified row
--   with no recorded evidence_url stays exactly that — verified, uncited —
--   rather than being backfilled with a guessed URL.
-- ============================================================

begin;

alter table affiliate_provider_countries
  add column if not exists evidence_url text;

alter table affiliate_provider_countries
  add column if not exists evidence_tier text;

alter table affiliate_provider_countries
  drop constraint if exists affiliate_provider_countries_evidence_tier_check;

alter table affiliate_provider_countries
  add constraint affiliate_provider_countries_evidence_tier_check
  check (evidence_tier is null or evidence_tier in ('TIER_1', 'TIER_2', 'TIER_3'));

comment on column affiliate_provider_countries.evidence_url is
  'The source page actually read to verify this row. NULL means no citation recorded yet, independent of whether verified_at is set.';
comment on column affiliate_provider_countries.evidence_tier is
  'TIER_1 = the provider''s own published page (required before stating availability plainly). TIER_2 = a secondary official-adjacent source. TIER_3 = a third-party directory or affiliate-network listing — never sufficient on its own; recorded only to show what was considered and rejected. See docs/M-AFFILIATE3-PROVIDER-VERIFICATION.md for the tier definitions this reuses verbatim.';

commit;

-- ============================================================
-- EVIDENCE BACKFILL — the two rows this codebase already has real citations for
--
-- These URLs are not new research. They are already committed, dated facts
-- in supabase/affiliate_corridor.sql's own bottom comment ("Verified
-- 2026-08-24 during M-AFFILIATE3"). This block makes that existing evidence
-- queryable instead of leaving it stranded in a SQL comment.
--
-- Every other row (111 of 113) stays NULL on both columns until an operator
-- actually reads that provider's own page and records it — that gap is
-- itself the first thing the new /admin/affiliates/verification view
-- surfaces, not something this migration should paper over.
-- ============================================================
update affiliate_provider_countries pc
   set evidence_url = 'https://wise.com/us/send-money/send-money-to-mexico',
       evidence_tier = 'TIER_1'
  from affiliate_partners p
 where pc.provider_id = p.id
   and pc.country_code = 'MX'
   and p.slug = 'wise'
   and pc.verified_at is not null
   and pc.evidence_url is null;

update affiliate_provider_countries pc
   set evidence_url = 'https://www.remitly.com/us/en/mexico',
       evidence_tier = 'TIER_1'
  from affiliate_partners p
 where pc.provider_id = p.id
   and pc.country_code = 'MX'
   and p.slug = 'remitly'
   and pc.verified_at is not null
   and pc.evidence_url is null;

-- Verify:
--   select p.slug, pc.country_code, pc.origin_country, pc.verified_at,
--          pc.evidence_tier, pc.evidence_url
--     from affiliate_provider_countries pc
--     join affiliate_partners p on p.id = pc.provider_id
--    where pc.evidence_url is not null;
--   -- expect: exactly wise/MX and remitly/MX, both TIER_1
