// ============================================================
// Affiliate impression recording (M-GROWTH1A Phase 2)
//
// Clicks were already recorded. This supplies the denominator so affiliate CTR
// is a measurement rather than an approximation.
//
// PRIVACY CONTRACT — identical to clicks
//   Commercial fields only. No IP, no user agent, no referrer, no session, and
//   nothing about a person's circumstances. The record type below cannot
//   express those things, which is a stronger guarantee than remembering not
//   to send them.
//
// WRITE PATH
//   Service role, server-side only. Anonymous inserts are never granted —
//   the same posture as the click-forgery hardening.
// ============================================================

import { createAdminClient } from "@/lib/supabase/admin";
import { isAffiliateClickLoggingEnabled } from "./flags";

export interface AffiliateImpressionRecord {
  providerId: string | null;
  providerSlug: string;
  countryCode?: string | null;
  category?: string | null;
  placement?: string | null;
  campaign?: string | null;
  sourcePage?: string | null;
}

/** Trim to a sane length; PostgREST rejects nothing, so bound it here. */
function clamp(value: string | null | undefined, max: number): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

/**
 * Record one or more impressions.
 *
 * Batched deliberately: a comparison page renders six cards at once, and six
 * separate requests would be six chances to fail and six rows of write load
 * for one page view.
 *
 * Returns the number written. Failure is silent by design — analytics must
 * never affect what the visitor sees.
 */
export async function recordAffiliateImpressions(
  records: AffiliateImpressionRecord[],
): Promise<number> {
  if (!isAffiliateClickLoggingEnabled()) return 0;
  if (!records.length) return 0;

  const supabase = createAdminClient();
  if (!supabase) {
    // No service-role key. Record nothing rather than falling back to an
    // anonymous insert, which is the hole hardening closed.
    return 0;
  }

  // CHUNKED, never sliced. Truncating here is what dropped Wise — rendered
  // 21st in a 21-provider list — from the very batch meant to measure it.
  const rows = records.map((record) => ({
    provider_id: record.providerId,
    partner_slug: clamp(record.providerSlug, 64),
    country_code: clamp(record.countryCode, 2),
    category: clamp(record.category, 64),
    placement: clamp(record.placement, 64),
    campaign: clamp(record.campaign, 64),
    page_path: clamp(record.sourcePage, 512),
  }));

  let written = 0;
  try {
    for (let i = 0; i < rows.length; i += MAX_BATCH) {
      const chunk = rows.slice(i, i + MAX_BATCH);
      const { error } = await supabase
        .from("affiliate_impressions")
        .insert(chunk);
      if (error) return written;
      written += chunk.length;
    }
    return written;
  } catch {
    return written;
  }
}

/**
 * Rows per INSERT — a transport chunk size, NOT a limit on what can be
 * recorded. More than this many observed cards produces more than one insert,
 * never a truncated one.
 */
export const MAX_BATCH = 20;

/**
 * Hard bound on a single HTTP request, purely an abuse guard. The client
 * chunks at MAX_BATCH, so legitimate traffic never approaches this.
 */
export const MAX_REQUEST_IMPRESSIONS = 64;

/**
 * Build a deduplication key.
 *
 * One impression per provider per placement per page view. Without this, a
 * React re-render or a card scrolling in and out of view would inflate the
 * denominator and quietly depress every CTR figure.
 */
export function impressionKey(record: AffiliateImpressionRecord): string {
  return [
    record.providerSlug,
    record.placement ?? "",
    record.sourcePage ?? "",
    record.category ?? "",
    record.campaign ?? "",
  ].join("|");
}
