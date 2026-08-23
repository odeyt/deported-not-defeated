import { NextRequest, NextResponse } from "next/server";
import { normalizeCountryCode } from "@/lib/affiliate/url";

/**
 * Shared plumbing for the `/go` redirect endpoints.
 *
 * Not a route file — Next.js only treats `route.ts` as a handler, so this
 * co-located module is safe here and keeps the two handlers honest about
 * behaving identically.
 */

/**
 * Where a visitor goes when we have nothing monetizable and nothing
 * specific to offer. These are real, useful pages — the point of the
 * fallback is that the visitor still gets help (spec §12).
 */
export const FALLBACK_PATHS = {
  default: "/resources",
  MONEY_TRANSFER: "/resources/money-transfer",
  PHONE_INTERNET: "/resources/phone-internet",
  ESIM: "/resources/phone-internet",
  VPN: "/resources/vpn-privacy",
  HEALTH_INSURANCE: "/resources/health-insurance",
  TRAVEL_INSURANCE: "/resources/health-insurance",
  FLIGHTS: "/family-visit-travel",
  HOTELS: "/family-visit-travel",
  HOSTELS: "/family-visit-travel",
  CAR_RENTAL: "/family-visit-travel",
  AIRPORT_TRANSFER: "/family-visit-travel",
  TOURS: "/family-visit-travel",
  EDUCATION: "/career-education",
  CAREER_TRAINING: "/career-education",
  TEFL_TESOL: "/career-education",
  REMOTE_WORK: "/career-education",
  RESUME: "/career-education",
  LEGAL: "/legal-resources",
} as const;

/** Non-affiliate landing page for a category, or the generic resource hub. */
export function fallbackPathForCategory(category: string | null): string {
  if (!category) return FALLBACK_PATHS.default;
  const path = (FALLBACK_PATHS as Record<string, string>)[category];
  return path ?? FALLBACK_PATHS.default;
}

/** Free-text query values are bounded and stripped of anything unexpected. */
function readToken(value: string | null, maxLength = 48): string | null {
  if (!value) return null;
  const cleaned = value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!cleaned) return null;
  return cleaned.slice(0, maxLength);
}

export interface RequestContext {
  country: string | null;
  placement: string | null;
  campaign: string | null;
  categoryHint: string | null;
  sourcePage: string | null;
  sessionIdentifier: string | null;
}

/**
 * Read the attribution context off the request.
 *
 * Every value is an opaque, bounded token used for grouping clicks. None
 * of them can influence the redirect destination, and none of them may
 * carry personal information — see the privacy contract in
 * lib/affiliate/clicks.ts.
 */
export function readRequestContext(req: NextRequest): RequestContext {
  const q = req.nextUrl.searchParams;

  return {
    country: normalizeCountryCode(q.get("country")),
    placement: readToken(q.get("placement")),
    campaign: readToken(q.get("campaign")),
    categoryHint: readToken(q.get("category")),
    sourcePage: readToken(q.get("from"), 128),
    // We do not issue a session cookie. If a future consented-analytics
    // milestone adds one, this is where it gets picked up; until then this
    // stays null and the column stays empty.
    sessionIdentifier: null,
  };
}

/**
 * Build the redirect response.
 *
 * - `302`, because an affiliate destination is rotated whenever a program
 *   is re-approved or a tracking link is reissued. A `301` would be cached
 *   by browsers and intermediaries and would keep sending traffic to a
 *   dead link long after we changed it.
 * - `no-store`, for the same reason.
 * - `X-Robots-Tag: noindex, nofollow`, so a redirect endpoint never becomes
 *   search-result content (spec §29). `app/robots.ts` disallows `/go/` as
 *   well; this header covers crawlers that reach the URL anyway.
 * - `Referrer-Policy: origin`. Networks attribute on the tracking URL, so
 *   they do not need our path — and our paths are things like
 *   /mexico/start-over-after-deportation. Sending the bare origin keeps
 *   domain-level attribution intact without handing a commercial partner
 *   the fact that this visitor was reading a deportation guide (spec §34).
 */
export function redirectResponse(destination: string): NextResponse {
  const res = NextResponse.redirect(destination, { status: 302 });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Referrer-Policy", "origin");
  return res;
}
