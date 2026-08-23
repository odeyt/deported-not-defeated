// ============================================================
// M-AFFILIATE-1 — Provider redirect router
//
// /go/wise, /go/remitly, /go/airalo …
//
// OPEN REDIRECT PREVENTION
//   This route accepts a SLUG, never a URL. There is no query parameter that
//   can influence the destination. `/go?url=https://evil.example` cannot work
//   here because no code path reads a destination from the request.
//   The looked-up destination is then validated by isSafeAffiliateUrl() before
//   it is ever handed to NextResponse.redirect().
//
// RESOLUTION ORDER
//   1. New affiliate_providers registry (via the DB-side approval gate)
//   2. Legacy affiliate_partners table — preserved so every existing /go/ link
//      keeps working exactly as before
//   3. /resources fallback — the visitor always lands somewhere useful
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logClick, resolveDestination, sourcePageFromReferer } from "@/lib/affiliate-engine/service";
import {
  buildSubId,
  normalizeCountryCode,
  normalizeSlug,
  safeAffiliateUrlOrNull,
  withSubId,
} from "@/lib/affiliate-engine/url";

export const dynamic = "force-dynamic";

/** Redirects must never be indexed as content pages. */
const NOINDEX_HEADERS = { "X-Robots-Tag": "noindex, nofollow" };

function redirectTo(destination: string): NextResponse {
  return NextResponse.redirect(destination, { status: 302, headers: NOINDEX_HEADERS });
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const fallback = new URL("/resources", req.url).toString();

  const slug = normalizeSlug(params.slug);
  if (!slug) return redirectTo(fallback);

  const referer = req.headers.get("referer");
  const sourcePage = sourcePageFromReferer(referer);
  const countryCode = normalizeCountryCode(req.nextUrl.searchParams.get("country"));
  const placement = req.nextUrl.searchParams.get("placement")?.slice(0, 64) ?? null;

  // ---- 1. New registry ----------------------------------------------------
  const resolved = await resolveDestination(slug);

  if (resolved) {
    const destination = safeAffiliateUrlOrNull(resolved.destination_url);

    if (destination) {
      const campaign = buildSubId({
        country: countryCode,
        category: resolved.category,
        placement,
      });

      // Click logging is best-effort and must never delay the visitor.
      await logClick({
        providerId: resolved.provider_id,
        countryCode,
        category: resolved.category,
        sourcePage,
        placement,
        campaign: campaign || null,
      });

      // Sub-id is attached only for monetized destinations, and only when the
      // operator has configured the network's parameter name.
      const finalUrl = resolved.monetized
        ? withSubId(destination, resolved.sub_id_param, campaign)
        : destination;

      return redirectTo(finalUrl);
    }
  }

  // ---- 2. Legacy affiliate_partners ---------------------------------------
  try {
    const supabase = await createClient();
    const { data: partner } = await supabase
      .from("affiliate_partners")
      .select("id, slug, affiliate_url, official_website_url, affiliate_status, active")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (partner) {
      try {
        await supabase.from("affiliate_clicks").insert({
          partner_id: partner.id,
          partner_slug: partner.slug,
          page_path: sourcePage ?? "",
          referrer: referer ?? "",
          user_agent: req.headers.get("user-agent") ?? "",
        });
      } catch {
        // Click tracking failure must not break the redirect.
      }

      // Same approval gate as lib/affiliate.ts: monetize only when approved.
      const monetized =
        partner.affiliate_status === "approved"
          ? safeAffiliateUrlOrNull(partner.affiliate_url)
          : null;

      const destination = monetized ?? safeAffiliateUrlOrNull(partner.official_website_url);

      if (destination) return redirectTo(destination);
    }
  } catch {
    // Fall through to the safe fallback below.
  }

  // ---- 3. Safe fallback ---------------------------------------------------
  return redirectTo(fallback);
}
