import { NextRequest } from "next/server";
import { getProvidersForCategory } from "@/lib/affiliate/service";
import { recordAffiliateClick } from "@/lib/affiliate/clicks";
import { selectDestination } from "@/lib/affiliate/selection";
import { isAffiliateEngineEnabled } from "@/lib/affiliate/flags";
import { slugToCategory } from "@/lib/affiliate/categories";
import {
  sourcePathFromReferer,
  buildSubId,
  withTrackingParams,
} from "@/lib/affiliate/url";
import { trackingParamsFor } from "@/lib/affiliate/networks";
import { fallbackPathForCategory, readRequestContext, redirectResponse } from "../../shared";

export const dynamic = "force-dynamic";

/**
 * GET /go/category/<category-slug>?country=GT
 *
 * Picks the best eligible provider for a category, optionally scoped to a
 * country, and redirects there. Used where a page wants to say "send money
 * home" without committing to a named provider that may not operate in the
 * visitor's country.
 *
 * Selection is fully deterministic — see lib/affiliate/selection.ts. It
 * considers country availability, country priority, global priority, and
 * trust score. It does NOT consider commission (spec §11, §23, §43).
 *
 * Fallback chain (spec §12):
 *   highest-ranked monetizable provider -> affiliate destination
 *   highest-ranked provider with a site -> that provider's own website
 *   nothing eligible                    -> the category's resource page
 *
 * The last step is the important one. If we have no affiliate program for
 * money transfers in Guatemala, the visitor still lands on a page that
 * explains their options. We just do not get paid for it.
 */
export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  const category = slugToCategory(params.category);
  const ctx = readRequestContext(req);

  const fallbackPath = fallbackPathForCategory(category);
  const fallback = new URL(fallbackPath, req.url).toString();

  // Unknown category: send them to the resource hub rather than guessing.
  if (!category) {
    return redirectResponse(fallback);
  }

  if (!isAffiliateEngineEnabled()) {
    return redirectResponse(fallback);
  }

  const providers = await getProvidersForCategory({
    category,
    country: ctx.country,
  });

  const destination = selectDestination(providers, {
    country: ctx.country,
    fallbackUrl: fallback,
  });

  let url = destination.url;

  if (destination.kind === "affiliate" && destination.provider) {
    const subId = buildSubId({
      country: ctx.country,
      category,
      placement: ctx.placement,
      campaign: ctx.campaign,
    });
    url = withTrackingParams(url, trackingParamsFor(destination.provider.network, subId));
  }

  await recordAffiliateClick({
    providerId: destination.provider?.id ?? null,
    providerSlug: destination.provider?.slug ?? null,
    sourcePage: sourcePathFromReferer(req.headers.get("referer"), req.url) ?? ctx.sourcePage,
    countryCode: ctx.country,
    category,
    placement: ctx.placement,
    campaign: ctx.campaign,
    network: destination.provider?.network ?? null,
    outcome: destination.kind,
    sessionIdentifier: ctx.sessionIdentifier,
  });

  return redirectResponse(url);
}
