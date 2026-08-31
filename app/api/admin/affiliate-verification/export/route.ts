import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  buildVerificationRows,
  filterVerificationRows,
  parseVerificationFilters,
  DEFAULT_ORIGIN_COUNTRY,
  type ProviderRecord,
  type CountryRecord,
} from "@/lib/affiliate/verificationQuery";

export const dynamic = "force-dynamic";

const CSV_COLUMNS = [
  "provider_slug",
  "provider_name",
  "category",
  "origin_country",
  "destination_country",
  "country_availability",
  "corridor_status",
  "affiliate_status",
  "affiliate_link_present",
  "monetized",
  "verification_status",
  "verified_at",
  "evidence_url",
] as const;

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

/**
 * GET /api/admin/affiliate-verification/export
 *
 * Authenticated admin export of the SAME filtered dataset the verification
 * page shows — via lib/affiliate/verificationQuery.ts, so this route cannot
 * silently disagree with the page about what a row or a filter means.
 *
 * RLS on affiliate_partners / affiliate_provider_countries already limits
 * writes to admins (is_affiliate_admin() in
 * supabase/affiliate_engine_m1_hardening.sql), but that policy alone
 * returning fewer rows to a non-admin is not the same as a hard, legible
 * 403 for a route whose entire purpose is exporting operator data — so this
 * checks the same user_profiles.role = 'admin' fact explicitly, using the
 * RLS-respecting server client (never lib/supabase/admin.ts's service-role
 * client — this is a read on behalf of one signed-in operator, not a
 * privileged background job).
 */
export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const url = new URL(request.url);
  const filters = parseVerificationFilters(Object.fromEntries(url.searchParams));

  const [providersRes, countryRes] = await Promise.all([
    supabase
      .from("affiliate_partners")
      .select(
        "id, slug, company_name, canonical_category, network, affiliate_status, active, affiliate_url, application_date",
      )
      .order("company_name", { ascending: true }),
    supabase
      .from("affiliate_provider_countries")
      .select("provider_id, country_code, available, origin_country, verified_at, evidence_url, evidence_tier"),
  ]);

  const providers = (providersRes.data ?? []) as ProviderRecord[];
  const countryRows = (countryRes.data ?? []) as CountryRecord[];

  const rows = filterVerificationRows(
    buildVerificationRows(providers, countryRows, filters.country, DEFAULT_ORIGIN_COUNTRY),
    filters,
  );

  const lines = [CSV_COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.slug,
        row.companyName,
        row.category ?? "",
        row.originCountry ?? "",
        row.destinationCountry,
        row.hasCountryRow ? (row.countryAvailable ? "available" : "not_available") : "no_row",
        row.corridorVerified ? "verified" : row.hasCountryRow && row.countryAvailable ? "unknown" : "n/a",
        row.affiliateStatus ?? "not_applied",
        row.affiliateUrl ? "yes" : "no",
        row.monetized ? "yes" : "no",
        row.freshnessState,
        row.verifiedAt ?? "",
        row.evidenceUrl ?? "",
      ]
        .map((v) => csvEscape(String(v)))
        .join(","),
    );
  }

  const csv = lines.join("\n") + "\n";
  const filename = `affiliate-verification-${filters.country.toLowerCase()}-${filters.tab}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
