/**
 * Columns of `affiliate_partners` that anonymous visitors may read.
 *
 * WHY THIS EXISTS
 *   The public resource pages used `select("*")`. Once
 *   supabase/affiliate_engine_m1_hardening.sql revokes blanket SELECT from
 *   `anon` and grants specific columns instead, `select("*")` fails with a
 *   permission error on the first ungranted column — taking /resources and its
 *   four category pages down with it. The hardening file's own header warns
 *   about exactly this.
 *
 * THE CONSTRAINT THIS LIST SATISFIES
 *   Every column below must be BOTH:
 *     1. present before affiliate_engine_m1.sql runs, and
 *     2. granted to `anon` by the hardening file.
 *
 *   That intersection is what makes these queries correct at every point in
 *   the migration sequence — before M1, after M1, and after hardening — so the
 *   deploy and the migration no longer have to be ordered relative to
 *   each other.
 *
 * DELIBERATELY EXCLUDED
 *   notes, internal_notes, account_identifier, commission_value,
 *   commission_notes, terms_notes, application_date, approval_date,
 *   placeholder_url — operator data that no public component renders.
 */
export const PUBLIC_PARTNER_COLUMNS = [
  "id",
  "category_id",
  "company_name",
  "slug",
  "short_description",
  "full_description",
  "why_it_fits",
  "typical_potential",
  "official_website_url",
  "affiliate_url",
  "affiliate_status",
  "cta_label",
  "logo_url",
  "country_focus",
  "priority",
  "featured",
  "active",
  "show_on_homepage",
  "show_disclosure",
  "created_at",
  "updated_at",
].join(", ");

/** The same list plus the joined category relation the resource pages render. */
export const PUBLIC_PARTNER_COLUMNS_WITH_CATEGORY =
  `${PUBLIC_PARTNER_COLUMNS}, affiliate_categories(id, name, slug)`;
