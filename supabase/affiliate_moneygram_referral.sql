-- ============================================================
-- MoneyGram — referral code metadata + corridor evidence (ADDITIVE)
--
-- Run in the Supabase SQL editor. Safe to run more than once.
--
-- ⚠ THIS MIGRATION DELIBERATELY DOES NOT MONETIZE MONEYGRAM. ⚠
--
-- WHAT THE OPERATOR SUPPLIED
--   The code RAFV3FFRWZCD.
--
-- WHAT IT ACTUALLY IS — verified 2026-09-10 against MoneyGram's own
-- published program terms at
-- https://www.moneygram.com/us/en/services/invite-friends-terms-and-conditions
--
--   It is an "Invite Friends" CUSTOMER REFERRAL code, not an affiliate or
--   publisher tracking ID. MoneyGram's terms describe it as "A customer
--   referral program ... offered by MoneyGram Payment Systems, Inc. ... to
--   existing online users (an 'Advocate')". Specifically:
--
--   * The Advocate must be an individual MGO customer who has already
--     completed at least one online transaction. A website is not eligible.
--   * The reward is a DISCOUNT on the Advocate's own next transfer, capped at
--     ten. There is no commission, no publisher payout, and no revenue share.
--   * Discounts "cannot be purchased, sold, combined or transferred in any way".
--   * The program covers the Advocate's "eligible family and friends residing
--     in the same country" — not an anonymous public audience.
--   * "By sending an invitation you confirm that you have obtained the
--     Referee's prior consent to receive it." Publishing a link to anonymous
--     site visitors cannot satisfy a prior-consent requirement.
--   * The link is generated inside the Advocate's logged-in MoneyGram account.
--     Its URL structure is not published anywhere public, so it CANNOT be
--     derived from the code. No URL is written by this migration.
--
--   See docs/MONEYGRAM-AFFILIATE-RESEARCH.md for the full evidence ledger.
--
-- CONSEQUENCE
--   MoneyGram stays non-monetized. affiliate_url stays NULL, affiliate_status
--   is not promoted, and /go/moneygram continues to send visitors to
--   https://www.moneygram.com — which is still a useful destination.
--
--   The code is recorded ONLY as operator metadata, in columns that
--   supabase/affiliate_engine_m1_hardening.sql revokes from `anon`
--   (account_identifier, internal_notes, terms_notes). Confirmed blocked in
--   production on 2026-09-10: anonymous SELECT on those columns returns 42501.
-- ============================================================

begin;

-- ------------------------------------------------------------
-- 1. Record the code as operator metadata — NOT as a tracking ID
--
-- The value is stored self-labelled. `account_identifier` is documented as
-- "Publisher / account ID with the network", and a bare RAFV3FFRWZCD sitting
-- in that column is exactly the kind of thing a future reader turns into a
-- guessed URL. The prefix makes that misreading impossible. No code path
-- parses this column — it is admin-display only.
-- ------------------------------------------------------------
update affiliate_partners
   set account_identifier = 'INVITE_FRIENDS_CUSTOMER_REFERRAL_CODE:RAFV3FFRWZCD',

       internal_notes = concat_ws(
         E'\n',
         nullif(internal_notes, ''),
         'Operator supplied MoneyGram code RAFV3FFRWZCD on 2026-09-10.',
         'VERIFIED 2026-09-10: this is an "Invite Friends" customer referral code,',
         'NOT an affiliate/publisher tracking ID. Source:',
         'https://www.moneygram.com/us/en/services/invite-friends-terms-and-conditions',
         'Reward is a discount on the operator''s OWN next transfer (max 10), not commission.',
         'The shareable link is generated inside the logged-in MoneyGram account and its',
         'URL structure is not published, so it cannot be derived from the code.',
         'DO NOT construct a URL from this code. DO NOT set affiliate_status = approved.'
       ),

       terms_notes = concat_ws(
         E'\n',
         nullif(terms_notes, ''),
         'MoneyGram Invite Friends program restrictions that block site-wide use:',
         '(1) Advocate must be an individual MGO customer, not a business or website.',
         '(2) Scope is "eligible family and friends residing in the same country".',
         '(3) "By sending an invitation you confirm that you have obtained the Referee''s',
         '    prior consent to receive it." — incompatible with publishing to anonymous visitors.',
         '(4) Reward is a capped personal discount; discounts "cannot be purchased, sold,',
         '    combined or transferred in any way".',
         'Publishing this code as a site CTA would risk the operator''s personal MoneyGram',
         'account under section 4 (suspension/cancellation) without producing revenue.'
       ),

       updated_at = now()
 where slug = 'moneygram'
   -- Idempotent: only writes if the code is not already recorded.
   and (account_identifier is null
        or account_identifier not like '%RAFV3FFRWZCD%');

-- ------------------------------------------------------------
-- 2. Application record — reflect that no affiliate application exists
--
-- affiliate_applications.status for MoneyGram is already 'not_applied', which
-- is correct: an Invite Friends code is not an affiliate application. This
-- only adds the note explaining why it will stay that way.
--
-- affiliate_partners.affiliate_status is deliberately LEFT UNTOUCHED at
-- 'pending'. docs/AFFILIATE-OFFER-REGISTRY.md flags that value as unverified
-- for the eight legacy rows, and resolving it is an operator decision, not a
-- migration's. It does not monetize anything either way: monetization needs
-- affiliate_status = 'approved' AND a stored affiliate_url, and there is no URL.
-- ------------------------------------------------------------
update affiliate_applications a
   set approval_notes = concat_ws(
         E'\n',
         nullif(a.approval_notes, ''),
         '2026-09-10: Operator supplied code RAFV3FFRWZCD. Verified against MoneyGram''s',
         'published terms as an Invite Friends CUSTOMER referral code, not an affiliate',
         'program. No affiliate application has been made. No public MoneyGram affiliate',
         'program was found in either this review or the 2026-09-01 corridor review.'
       ),
       updated_at = now()
  from affiliate_partners p
 where a.partner_id = p.id
   and p.slug = 'moneygram'
   and (a.approval_notes is null or a.approval_notes not like '%RAFV3FFRWZCD%');

commit;


-- ============================================================
-- 3. CORRIDOR EVIDENCE — separate, optional, and independently useful
--
-- Run this block only if you also want MoneyGram's availability rows to carry
-- the citations the 2026-09-01 review already gathered.
--
-- This is NOT new research and NOT an affiliate claim. It records that
-- MoneyGram's own corridor pages were read and what they said, promoting six
-- destination-only rows to evidence-backed US -> destination corridor rows.
--
-- Source of every URL below: docs/MONEYGRAM-AFFILIATE-RESEARCH.md, evidence
-- ledger sources [1]-[6], Tier 1 (the provider's own published pages),
-- observed 2026-09-01.
--
-- VN, NG, and GH availability rows also exist for MoneyGram but were NOT part
-- of that review. They are deliberately left destination-only and unverified
-- rather than backfilled with a guessed corridor URL.
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
-- MoneyGram must still be non-monetized:
--   select slug, affiliate_status, active, affiliate_url
--     from affiliate_partners where slug = 'moneygram';
--   -- expect: affiliate_url NULL. Anything else means something activated it.
--
-- The code is recorded and self-labelled:
--   select account_identifier from affiliate_partners where slug = 'moneygram';
--   -- expect: INVITE_FRIENDS_CUSTOMER_REFERRAL_CODE:RAFV3FFRWZCD
--
-- The code is NOT publicly readable (run with the ANON key, not service role):
--   select account_identifier from affiliate_partners where slug = 'moneygram';
--   -- expect: error 42501 permission denied
--
-- Corridor evidence landed on exactly six rows:
--   select pc.country_code, pc.origin_country, pc.evidence_tier, pc.verified_at
--     from affiliate_provider_countries pc
--     join affiliate_partners p on p.id = pc.provider_id
--    where p.slug = 'moneygram' order by pc.country_code;
--   -- expect: GT KH LA MX PH SV show origin US / TIER_1; GH NG VN stay NULL
