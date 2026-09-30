-- ============================================================
-- MoneyGram — US corridor evidence (ADDITIVE, CONTENT ACCURACY)
--
-- Run in the Supabase SQL editor. Safe to run more than once.
--
-- ⚠ THIS FILE HAS NOTHING TO DO WITH AFFILIATE MONETIZATION. ⚠
--
-- MoneyGram is not monetized and this migration does not change that. It
-- writes no affiliate_url, touches no affiliate_status, and adds no tracking
-- parameter. It only records WHICH pages were read to confirm that MoneyGram
-- serves six specific US corridors.
--
-- WHAT THIS CHANGES, AND WHAT READERS WILL SEE
--
--   Six affiliate_provider_countries rows for MoneyGram (MX, GT, SV, KH, LA,
--   PH) are currently destination-only and unverified: origin_country NULL,
--   verified_at NULL, evidence_url NULL. Because they are unverified, the
--   recommendation card renders a visible
--       "Confirm availability with provider"
--   hedge next to each one.
--
--   After this runs, those six rows become evidence-backed US -> destination
--   corridor rows, and that hedge is replaced by a plain statement of
--   availability. THAT IS A USER-VISIBLE CHANGE to what the site asserts
--   about a financial service, so it needs an owner decision — it is not a
--   silent cleanup.
--
-- WHY IT IS DEFENSIBLE
--
--   This is not new research and nothing here is inferred. Every URL below is
--   already a committed, dated fact in docs/MONEYGRAM-AFFILIATE-RESEARCH.md,
--   evidence ledger sources [1]-[6]: Tier 1 (the provider's own published
--   pages), observed 2026-09-01. The migration makes evidence that already
--   exists in a markdown file queryable by the admin verification view, which
--   is exactly the gap supabase/affiliate_verification_evidence.sql was added
--   to close for wise/MX and remitly/MX.
--
--   verified_at is set to the OBSERVATION date (2026-09-01), not today. The
--   freshness system in lib/affiliate/freshness.ts then ages these rows
--   honestly from when the pages were actually read.
--
-- WHAT IS DELIBERATELY LEFT ALONE
--
--   MoneyGram also has availability rows for VN, NG, and GH. Those corridors
--   were NOT part of the 2026-09-01 review. They stay destination-only and
--   unverified rather than being backfilled with a guessed corridor URL.
--
-- PREREQUISITES
--   supabase/affiliate_corridor.sql            (adds origin_country)
--   supabase/affiliate_verification_evidence.sql (adds evidence_url/tier)
--   Both are already applied in production as of 2026-09-10.
--
-- ROLLBACK
--   update affiliate_provider_countries pc
--      set origin_country = null, evidence_url = null, evidence_tier = null,
--          verified_at = null
--     from affiliate_partners p
--    where pc.provider_id = p.id
--      and p.slug = 'moneygram'
--      and pc.country_code in ('MX','GT','SV','KH','LA','PH');
--   -- availability_notes keeps its appended sentence; clear it by hand if wanted.
-- ============================================================

begin;

update affiliate_provider_countries pc
   set origin_country = 'US',
       evidence_url   = v.url,
       evidence_tier  = 'TIER_1',
       verified_at    = coalesce(pc.verified_at, timestamptz '2026-09-01 00:00:00+00'),
       availability_notes = concat_ws(
         ' ',
         nullif(pc.availability_notes, ''),
         'US corridor confirmed against MoneyGram''s own corridor page (2026-09-01).',
         'Recipient options vary by transaction — confirm with MoneyGram before sending.'
       ),
       updated_at = now()
  from affiliate_partners p,
       (values
         ('MX', 'https://www.moneygram.com/us/en/corridor/mexico'),
         ('GT', 'https://www.moneygram.com/us/en/corridor/guatemala'),
         ('SV', 'https://www.moneygram.com/us/en/corridor/el-salvador'),
         ('KH', 'https://www.moneygram.com/us/en/corridor/cambodia'),
         ('LA', 'https://www.moneygram.com/us/en/corridor/laos'),
         ('PH', 'https://www.moneygram.com/us/en/corridor/philippines')
       ) as v(country_code, url)
 where pc.provider_id = p.id
   and p.slug = 'moneygram'
   and pc.country_code = v.country_code
   and pc.origin_country is null
   and pc.evidence_url is null;

commit;


-- ============================================================
-- VERIFICATION — run after applying
-- ============================================================
-- Exactly six rows changed, and the unreviewed three did not:
--   select pc.country_code, pc.origin_country, pc.evidence_tier,
--          pc.verified_at, pc.evidence_url
--     from affiliate_provider_countries pc
--     join affiliate_partners p on p.id = pc.provider_id
--    where p.slug = 'moneygram' order by pc.country_code;
--   -- expect: GT KH LA MX PH SV -> origin US, TIER_1, verified 2026-09-01
--   --         GH NG VN          -> all three columns still NULL
--
-- MoneyGram is still not monetized — this file must not have changed that:
--   select slug, affiliate_status, active, affiliate_url
--     from affiliate_partners where slug = 'moneygram';
--   -- expect: affiliate_status 'pending', affiliate_url NULL
