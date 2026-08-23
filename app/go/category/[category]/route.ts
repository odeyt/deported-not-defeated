// ============================================================
// M-AFFILIATE-1 — Category redirect router
//
// /go/category/money-transfer?country=GT
// /go/category/esim
//
// Picks the highest-ranked eligible provider for a category (optionally scoped
// to a country) and redirects to it. Selection is deterministic — see
// lib/affiliate-engine/selection.ts. No AI, no commission-weighted ordering.
//
// Next.js resolves the static "category" segment ahead of the dynamic [slug]
// segment, so this route takes precedence over /go/[slug].
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { logClick, resolveCategoryTarget, resolveDestination, sourcePageFromReferer } from "@/lib/affiliate-engine/service";
import {
  buildSubId,
  normalizeCategoryCode,
  normalizeCountryCode,
  safeAffiliateUrlOrNull,
  withSubId,
} from "@/lib/affiliate-engine/url";

export const dynamic = "force-dynamic";

const NOINDEX_HEADERS = { "X-Robots-Tag": "noindex, nofollow" };

function redirectTo(destination: string): NextResponse {
  return NextResponse.redirect(destination, { status: 302, headers: NOINDEX_HEADERS });
}

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  const fallback = new URL("/resources", req.url).toString();

  const category = normalizeCategoryCode(params.category);
  if (!category) return redirectTo(fallback);

  const countryCode = normalizeCountryCode(req.nextUrl.searchParams.get("country"));
  const placement = req.nextUrl.searchParams.get("placement")?.slice(0, 64) ?? null;
  const sourcePage = sourcePageFromReferer(req.headers.get("referer"));

  // Deterministic pick: country priority → global priority → trust → featured.
  const target = await resolveCategoryTarget({ category, countryCode });
  if (!target) return redirectTo(fallback);

  // Re-resolve through the database gate so the destination URL is subject to
  // exactly the same approval check as a direct /go/[slug] request.
  const resolved = await resolveDestination(target.provider.slug);
  if (!resolved) return redirectTo(fallback);

  const destination = safeAffiliateUrlOrNull(resolved.destination_url);
  if (!destination) return redirectTo(fallback);

  const campaign = buildSubId({
    country: countryCode,
    category,
    placement: placement ?? "category-router",
  });

  await logClick({
    providerId: resolved.provider_id,
    countryCode,
    category,
    sourcePage,
    placement: placement ?? "category-router",
    campaign: campaign || null,
  });

  const finalUrl = resolved.monetized
    ? withSubId(destination, resolved.sub_id_param, campaign)
    : destination;

  return redirectTo(finalUrl);
}
