import { NextRequest, NextResponse } from "next/server";
import {
  MAX_BATCH,
  recordAffiliateImpressions,
  type AffiliateImpressionRecord,
} from "@/lib/affiliate/impressions";

/**
 * Impression beacon (M-GROWTH1A Phase 2).
 *
 * Provider cards are rendered inside statically generated pages, so a
 * server-side count would record one impression per revalidation rather than
 * one per visitor. The count has to come from the client.
 *
 * The client sends only what it was already given to display — provider slug,
 * category, placement, campaign, and the path it is on. It cannot send
 * anything personal because the payload shape has nowhere to put it.
 *
 * Always returns 204. An analytics endpoint must never give a caller a reason
 * to retry, and must never surface an error to the visitor.
 */

export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/;
const SHORT = /^[A-Za-z0-9_-]{1,64}$/;

function sanitize(raw: unknown): AffiliateImpressionRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;

  const slug = typeof value.providerSlug === "string" ? value.providerSlug.trim() : "";
  if (!SLUG.test(slug)) return null;

  const optional = (key: string, pattern: RegExp): string | null => {
    const candidate = value[key];
    if (typeof candidate !== "string") return null;
    const trimmed = candidate.trim();
    return pattern.test(trimmed) ? trimmed : null;
  };

  // Path only, and only from this site. A full URL would carry a query string,
  // which is the part most likely to hold something personal.
  const page = typeof value.sourcePage === "string" ? value.sourcePage.split("?")[0] : "";
  const sourcePage = /^\/[A-Za-z0-9/_-]{0,255}$/.test(page) ? page : null;

  const providerId = typeof value.providerId === "string" ? value.providerId.trim() : "";

  return {
    providerId: /^[0-9a-f-]{36}$/i.test(providerId) ? providerId : null,
    providerSlug: slug,
    countryCode: optional("countryCode", /^[A-Za-z]{2}$/)?.toUpperCase() ?? null,
    category: optional("category", SHORT),
    placement: optional("placement", SHORT),
    campaign: optional("campaign", SHORT),
    sourcePage,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const list = Array.isArray(body?.impressions) ? body.impressions : [];

    const records = list
      .slice(0, MAX_BATCH)
      .map(sanitize)
      .filter((record: AffiliateImpressionRecord | null): record is AffiliateImpressionRecord =>
        record !== null
      );

    if (records.length) {
      await recordAffiliateImpressions(records);
    }
  } catch {
    // Malformed body, no service-role key, database unavailable — all the same
    // from the visitor's point of view: nothing happens and nothing breaks.
  }

  return new NextResponse(null, { status: 204 });
}
