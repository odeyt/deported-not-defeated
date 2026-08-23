-- ============================================================
-- M-AFFILIATE-1 — OPTIONAL hardening
--
-- This file is deliberately SEPARATE from affiliate_engine.sql because it
-- CHANGES EXISTING BEHAVIOUR rather than adding to it. Read it before running.
--
-- WHAT IT DOES
--   Removes the unrestricted public INSERT policy on affiliate_clicks that was
--   created by supabase/affiliate_system.sql:
--
--     create policy "Anyone can log clicks" on affiliate_clicks
--       for insert with check (true);
--
--   That policy lets anyone holding the public anon key write arbitrary rows
--   into the click table (analytics pollution / fake click inflation).
--
-- WHY IT IS NOT AUTOMATIC
--   The legacy /go/[slug] fallback path inserts into affiliate_clicks directly
--   with the anon client. That path still runs for legacy affiliate_partners
--   slugs. Removing the policy without replacing that call will silently stop
--   legacy click logging.
--
-- BEFORE RUNNING THIS
--   1. Confirm every provider you care about has been migrated into
--      affiliate_providers (the new path logs through log_affiliate_click(),
--      a SECURITY DEFINER function that is unaffected by this change).
--   2. Accept that legacy affiliate_partners clicks will stop being recorded.
--   3. Run it in a non-production project first if you have one.
--
-- ROLLBACK
--   The final section restores the original policy exactly.
-- ============================================================


-- ---- HARDEN --------------------------------------------------------------
-- Removes anonymous direct writes. log_affiliate_click() keeps working because
-- SECURITY DEFINER functions execute with the owner's rights and bypass RLS.

-- drop policy if exists "Anyone can log clicks" on affiliate_clicks;

-- Optional: also prevent anonymous direct reads/writes at the grant level.
-- revoke insert on affiliate_clicks from anon;


-- ---- ROLLBACK ------------------------------------------------------------
-- create policy "Anyone can log clicks" on affiliate_clicks
--   for insert with check (true);
-- grant insert on affiliate_clicks to anon;


-- ============================================================
-- Both sections are commented out on purpose. Uncomment the HARDEN block only
-- after working through the checklist above.
-- ============================================================
