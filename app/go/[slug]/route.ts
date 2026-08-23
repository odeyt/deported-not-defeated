import { NextRequest, NextResponse } from "next/server";
import { getProviderBySlug } from "@/lib/affiliate/service";
import { recordAffiliateClick } from "@/lib/affiliate/clicks";
import { resolveProviderDestination } from "@/lib/affiliate/selection";
import { isAffiliateEngineEnabled } from "@/lib/affiliate/flags";
import {
  isValidProviderSlug,
  normalizeCountryCode,
  sourcePathFromReferer,
  buildSubId,
  withTrackingParams,
  isSafeAffiliateUrl,
} from "@/lib/affiliate/url";
import { trackingParamsFor } from "@/lib/affiliate/networks";
import { slugToCategory } from "@/lib/affiliate/categories";
import { FALLBACK_PATHS, readRequestContext, redirectResponse } from "../shared";

export const dynamic = "force-dynamic";

/**
 * GET /go/<provider-slug>
 *
 * The single exit point from the site to a provider.
 *
 * Open-redirect protection (spec §10, §32): the destination is only ever
 * read from the database and only after passing `isSafeAffiliateUrl`. No
 * query parameter can influence where the visitor lands — `?url=`,
 * `?to=`, `?redirect=` and friends are simply not read.
 *
 * Resolution order:
 *   approved + active + safe affiliate URL -> affiliate destination
 *   otherwise, provider's own website      -> unmonetized, still useful
 *   unknown slug or no usable URL          -> /resources
 */
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const fallback = new URL(FALLBACK_PATHS.default, req.url).toString();

  // Reject a malformed slug before it reaches the database.
  if (!isValidProviderSlug(slug)) {
    return redirectResponse(fallback);
  }

  const provider = await getProviderBySlug(slug);
  const ctx = readRequestContext(req);

  // Master switch off: never emit an affiliate destination. The provider's
  // ordinary website is still a perfectly good place to send someone.
  const destination =
    isAffiliateEngineEnabled() || !provider
      ? resolveProviderDestination(provider, fallback)
      : isSafeAffiliateUrl(provider.websiteUrl)
        ? ({ kind: "website", url: provider.websiteUrl, provider } as const)
        : ({ kind: "fallback", url: fallback, provider: null } as const);

  let url = destination.url;

  // Sub-ID / campaign attribution, but only for networks whose parameter
  // name has actually been verified. Unconfigured networks get nothing
  // appended rather than a guessed parameter (spec §15, §24).
  if (destination.kind === "affiliate" && destination.provider) {
    const subId = buildSubId({
      country: ctx.country,
      category: destination.provider.category,
      placement: ctx.placement,
      campaign: ctx.campaign,
    });
    url = withTrackingParams(url, trackingParamsFor(destination.provider.network, subId));
  }

  // Best-effort, never blocking, never carrying personal data.
  await recordAffiliateClick({
    providerId: destination.provider?.id ?? null,
    providerSlug: destination.provider?.slug ?? (provider ? provider.slug : null),
    sourcePage: sourcePathFromReferer(req.headers.get("referer"), req.url) ?? ctx.sourcePage,
    countryCode: ctx.country,
    category: destination.provider?.category ?? slugToCategory(ctx.categoryHint ?? ""),
    placement: ctx.placement,
    campaign: ctx.campaign,
    network: destination.provider?.network ?? null,
    outcome: destination.kind,
    sessionIdentifier: ctx.sessionIdentifier,
  });

  return redirectResponse(url);
}

