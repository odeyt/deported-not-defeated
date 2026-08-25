// ============================================================
// Provider-level impression queue (M-GROWTH1A.4)
//
// WHAT WENT WRONG BEFORE
//   One IntersectionObserver watched the whole recommendation GRID, and firing
//   it flushed every provider in the array at once. One calculator interaction
//   therefore wrote ~20 rows sharing a single timestamp, describing providers
//   the reader had never scrolled to. Worse, the batch was truncated at 20, so
//   Wise — rendered 21st, and the only monetized provider in that list — was
//   silently dropped.
//
// THE RULE NOW
//   ONE PROVIDER CARD -> ONE PROVIDER IMPRESSION, and only when THAT card
//   became meaningfully visible. Cards nobody scrolled to record nothing.
//
// BATCHING
//   Kept for transport only. A batch may contain a provider ONLY after that
//   provider's own card satisfied the visibility rule, so several cards
//   scrolled past together still cost one request without ever describing a
//   card that was not seen.
//
// TRUNCATION
//   None. Oversized queues are CHUNKED, never sliced. A cap that silently
//   drops the tail is what hid Wise three separate times.
// ============================================================

import { MAX_BATCH, type AffiliateImpressionRecord } from "./impressions";

/** Coalescing window. Long enough to group a scroll, short enough to survive. */
export const FLUSH_DELAY_MS = 300;

const ENDPOINT = "/api/affiliate-impression";

/**
 * Deduplication identity (spec §5).
 *
 * Provider, page, placement, category and campaign. The same provider in a
 * genuinely different placement stays independently measurable — Wise in
 * `calculator-result` and Wise in `comparison-top` are two different facts —
 * while scrolling one card out of view and back is one impression.
 */
export function impressionDedupKey(record: AffiliateImpressionRecord): string {
  return [
    record.providerSlug,
    record.sourcePage ?? "",
    record.placement ?? "",
    record.category ?? "",
    record.campaign ?? "",
  ].join("|");
}

/** Module-scoped: shared by every card on the page, unlike a per-card ref. */
const sent = new Set<string>();
let pending: AffiliateImpressionRecord[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;

/** Split into transport-sized chunks. Nothing is ever dropped. */
export function chunkImpressions(
  records: AffiliateImpressionRecord[],
  size: number = MAX_BATCH,
): AffiliateImpressionRecord[][] {
  const safeSize = Math.max(1, size);
  const chunks: AffiliateImpressionRecord[][] = [];
  for (let i = 0; i < records.length; i += safeSize) {
    chunks.push(records.slice(i, i + safeSize));
  }
  return chunks;
}

function send(records: AffiliateImpressionRecord[]): void {
  if (!records.length) return;

  for (const chunk of chunkImpressions(records)) {
    const payload = JSON.stringify({ impressions: chunk });
    try {
      const blob = new Blob([payload], { type: "application/json" });
      if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
        void fetch(ENDPOINT, {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Analytics must never surface to the visitor.
    }
  }
}

/** Send whatever is queued right now. */
export function flushImpressions(): void {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  const batch = pending;
  pending = [];
  send(batch);
}

function bindLifecycleFlush(): void {
  if (listenersBound || typeof document === "undefined") return;
  listenersBound = true;
  // A reader who scrolls to a card and immediately leaves still saw it.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushImpressions();
  });
  window.addEventListener("pagehide", flushImpressions);
}

/**
 * Queue one provider's impression.
 *
 * @returns true if it was accepted, false if this provider/placement/page was
 *          already counted. The boolean is what the tests assert against.
 */
export function queueImpression(record: AffiliateImpressionRecord): boolean {
  const key = impressionDedupKey(record);
  if (sent.has(key)) return false;
  sent.add(key);

  pending.push(record);
  bindLifecycleFlush();

  if (pending.length >= MAX_BATCH) {
    flushImpressions();
    return true;
  }

  if (timer === null) {
    timer = setTimeout(flushImpressions, FLUSH_DELAY_MS);
  }
  return true;
}

/** Test seam. Never called by application code. */
export function __resetImpressionQueue(): void {
  sent.clear();
  pending = [];
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
}

/** Test seam: what is queued but not yet sent. */
export function __pendingImpressions(): AffiliateImpressionRecord[] {
  return [...pending];
}
