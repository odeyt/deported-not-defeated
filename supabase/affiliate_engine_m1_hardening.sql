-- ============================================================
-- M-AFFILIATE-1 — Security hardening (RESTRICTIVE)
--
-- ⚠ RUN ORDER MATTERS ⚠
--   1. Apply supabase/affiliate_engine_m1.sql
--   2. Deploy the M-AFFILIATE-1 application build
--   3. THEN apply this file
--
-- Running this BEFORE the deploy will break the live public resource
-- pages, because the currently-deployed code issues `select("*")`
-- against affiliate_partners and would lose column privileges.
--
-- Every statement here is reversible. The rollback for each block is
-- written directly above it.
-- ============================================================


-- ============================================================
-- H1. Stop anonymous readers from seeing internal operator fields
--
-- Threat: secret / commercial leakage (spec §32, §33).
-- Before: RLS allowed `select using (active = true)` over ALL columns,
--         so `notes` was readable by anyone with the anon key.
--
-- ROLLBACK:  grant select on affiliate_partners to anon, authenticated;
-- ============================================================
revoke select on affiliate_partners from anon;

grant select (
  id, category_id, company_name, slug,
  short_description, full_description, why_it_fits, typical_potential,
  official_website_url, affiliate_url, affiliate_status,
  cta_label, logo_url, country_focus,
  priority, global_priority, featured, active,
  show_on_homepage, show_disclosure,
  canonical_category, network, placement_type,
  disclosure_required, available_globally, trust_score,
  cookie_days, recurring, commission_type,
  created_at, updated_at
) on affiliate_partners to anon;

-- Deliberately NOT granted to anon:
--   notes, internal_notes, account_identifier,
--   commission_value, commission_notes, terms_notes,
--   application_date, approval_date
--
-- `affiliate_url` IS granted because the public /go router runs with the
-- anon key when no service-role key is configured. If you would rather
-- keep affiliate URLs entirely server-side, set SUPABASE_SERVICE_ROLE_KEY
-- in the deployment environment and then also run:
--     revoke select (affiliate_url) on affiliate_partners from anon;
-- Verify /go/<an approved slug> still redirects before leaving it revoked.

revoke select on affiliate_applications from anon;
revoke select on affiliate_conversions   from anon;


-- ============================================================
-- H2. Close the unauthenticated click-forgery hole
--
-- Threat: analytics abuse (spec §32).
-- Before: `create policy "Anyone can log clicks" ... with check (true)`
--         let anybody POST unlimited rows against any partner_id.
-- After:  clicks are inserted only by the server, through the service
--         role, from inside the /go route handler.
--
-- REQUIRES: SUPABASE_SERVICE_ROLE_KEY set in the deployment environment.
--           Without it, click logging stops. The redirect itself keeps
--           working either way — logging is best-effort by design.
--
-- ROLLBACK:  create policy "Anyone can log clicks"
--              on affiliate_clicks for insert with check (true);
--            grant insert on affiliate_clicks to anon;
-- ============================================================
drop policy if exists "Anyone can log clicks" on affiliate_clicks;
revoke insert, select, update, delete on affiliate_clicks from anon;


-- ============================================================
-- H3. Restrict affiliate writes to actual administrators
--
-- Threat: admin authorization bypass (spec §32, §33).
-- Before: every policy used `auth.role() = 'authenticated'`, i.e. ANY
--         signed-in Supabase user could change an affiliate URL,
--         approve a provider, or edit commission data.
-- After:  a caller must also hold user_profiles.role = 'admin'.
--
-- ⚠ PROMOTE YOURSELF FIRST, IN A SEPARATE STATEMENT, BEFORE RUNNING
--   THIS BLOCK — otherwise you will lock yourself out of the admin UI:
--
--     insert into user_profiles (id, email, role)
--     select id, email, 'admin' from auth.users where email = 'YOUR@EMAIL'
--     on conflict (id) do update set role = 'admin';
--
--   Confirm with:  select id, email, role from user_profiles;
--
-- ROLLBACK: recreate each policy with `using (auth.role() = 'authenticated')`.
-- ============================================================
create or replace function public.is_affiliate_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from user_profiles
     where id = auth.uid()
       and role = 'admin'
  );
$$;

comment on function public.is_affiliate_admin() is
  'True when the calling user is an administrator. SECURITY DEFINER so it can read user_profiles without granting the caller broad access to that table.';

drop policy if exists "Admins can manage partners"                on affiliate_partners;
create policy "Admins can manage partners"
  on affiliate_partners for all
  using (public.is_affiliate_admin())
  with check (public.is_affiliate_admin());

drop policy if exists "Admins can manage categories"              on affiliate_categories;
create policy "Admins can manage categories"
  on affiliate_categories for all
  using (public.is_affiliate_admin())
  with check (public.is_affiliate_admin());

drop policy if exists "Admins can manage applications"            on affiliate_applications;
create policy "Admins can manage applications"
  on affiliate_applications for all
  using (public.is_affiliate_admin())
  with check (public.is_affiliate_admin());

drop policy if exists "Admins can view clicks"                    on affiliate_clicks;
create policy "Admins can view clicks"
  on affiliate_clicks for select
  using (public.is_affiliate_admin());

drop policy if exists "Authenticated can manage provider countries" on affiliate_provider_countries;
create policy "Admins can manage provider countries"
  on affiliate_provider_countries for all
  using (public.is_affiliate_admin())
  with check (public.is_affiliate_admin());

drop policy if exists "Authenticated can manage canonical categories" on affiliate_canonical_categories;
create policy "Admins can manage canonical categories"
  on affiliate_canonical_categories for all
  using (public.is_affiliate_admin())
  with check (public.is_affiliate_admin());

drop policy if exists "Authenticated can read conversions"        on affiliate_conversions;
create policy "Admins can read conversions"
  on affiliate_conversions for select
  using (public.is_affiliate_admin());


-- ============================================================
-- H4. Validate the constraints added NOT VALID by the main migration
--
-- Run these one at a time. If one errors, it is telling you a real row
-- violates the rule — fix that row, then re-run the statement. Do not
-- drop the constraint to make the error go away.
--
-- ROLLBACK: constraints stay enforced for new writes either way;
--           `alter table ... drop constraint <name>` fully reverses.
-- ============================================================
alter table affiliate_partners validate constraint affiliate_partners_affiliate_status_check;
alter table affiliate_partners validate constraint affiliate_partners_placement_type_check;
alter table affiliate_partners validate constraint affiliate_partners_trust_score_check;
alter table affiliate_partners validate constraint affiliate_partners_affiliate_url_scheme_check;
alter table affiliate_partners validate constraint affiliate_partners_website_url_scheme_check;
alter table affiliate_partners validate constraint affiliate_partners_canonical_category_fkey;


-- ============================================================
-- H5. Post-hardening verification
-- ============================================================
-- Anonymous role must NOT be able to see operator notes:
--   select column_name from information_schema.column_privileges
--    where grantee = 'anon' and table_name = 'affiliate_partners'
--      and column_name in ('notes','internal_notes','account_identifier',
--                          'commission_value','commission_notes');
--   -- expected: zero rows
--
-- Anonymous role must NOT be able to insert clicks:
--   select privilege_type from information_schema.role_table_grants
--    where grantee = 'anon' and table_name = 'affiliate_clicks';
--   -- expected: zero rows
--
-- At least one administrator must exist:
--   select count(*) from user_profiles where role = 'admin';
--   -- expected: >= 1
