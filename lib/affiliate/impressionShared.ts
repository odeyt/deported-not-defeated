// ============================================================
// Impression types and bounds shared by client and server.
//
// WHY THIS FILE EXISTS
//   `impressions.ts` imports the service-role Supabase client, which carries a
//   browser guard that throws if it reaches a client bundle. The client-side
//   queue only needed a constant and a type from it — but importing a runtime
//   VALUE pulls the whole module graph, so the guard fired on hydration and
//   took the calculator down with "Application error: a client-side exception".
//
//   The guard was right. Nothing here may import a server module.
// ============================================================

export interface AffiliateImpressionRecord {
  providerId: string | null;
  providerSlug: string;
  countryCode?: string | null;
  category?: string | null;
  placement?: string | null;
  campaign?: string | null;
  sourcePage?: string | null;
}

/**
 * Rows per INSERT — a transport chunk size, NOT a limit on what can be
 * recorded. More observed cards than this produce more than one insert, never
 * a truncated one.
 */
export const MAX_BATCH = 20;

/**
 * Hard bound on a single HTTP request, purely an abuse guard. The client
 * chunks at MAX_BATCH, so legitimate traffic never approaches this.
 */
export const MAX_REQUEST_IMPRESSIONS = 64;

/**
 * Deduplication identity: provider, page, placement, category, campaign.
 *
 * One impression per provider per placement per page. The same provider in a
 * genuinely different placement stays independently measurable.
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
