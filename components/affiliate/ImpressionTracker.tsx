"use client";

import { useEffect, useRef } from "react";

import { queueImpression } from "@/lib/affiliate/impressionQueue";

/**
 * Records that ONE provider card was actually seen (M-GROWTH1A.4).
 *
 * DEFINITION OF AN IMPRESSION
 *   THIS card became meaningfully visible in the viewport. Not "the grid
 *   scrolled into view", not "the server rendered it", not "it was in the
 *   array". A reader who sees the first three cards of twenty generates three
 *   impressions, because the other seventeen were never an opportunity to
 *   click and counting them would depress the CTR of placements that work.
 *
 * WHY PER CARD
 *   The previous version observed the whole grid and flushed every provider at
 *   once. That produced ~20 rows with one identical timestamp for cards nobody
 *   had scrolled to, and truncation at 20 dropped the 21st — Wise, the only
 *   monetized provider in the list.
 *
 * DEDUPLICATION
 *   Handled by the shared module queue, keyed by provider, page, placement,
 *   category and campaign — so it survives this component unmounting and
 *   remounting, which a per-instance ref did not.
 *
 * FAILURE
 *   Silent. Analytics must never affect what the visitor sees.
 */

export interface TrackedImpression {
  providerId: string | null;
  providerSlug: string;
  countryCode?: string | null;
  category?: string | null;
  placement?: string | null;
  campaign?: string | null;
}

interface Props {
  impression: TrackedImpression;
  children?: React.ReactNode;
  /** Applied to the observed wrapper so it can be the grid item. */
  className?: string;
}

/**
 * Fraction of the card that must be on screen.
 *
 * Half. One pixel crossing the boundary is not "seen", and requiring the whole
 * card would miss a reader who stopped scrolling with the CTA visible.
 */
export const VISIBILITY_RATIO = 0.5;

/** No rootMargin: the viewport edge is the boundary, not an invented margin. */
export const ROOT_MARGIN = "0px";

export default function ImpressionTracker({
  impression,
  children,
  className,
}: Props) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const counted = useRef(false);

  const {
    providerId,
    providerSlug,
    countryCode,
    category,
    placement,
    campaign,
  } = impression;

  useEffect(() => {
    if (!providerSlug || counted.current) return;
    const node = nodeRef.current;
    if (!node) return;

    const record = () => {
      if (counted.current) return;
      counted.current = true;
      queueImpression({
        providerId: providerId ?? null,
        providerSlug,
        countryCode: countryCode ?? null,
        category: category ?? null,
        placement: placement ?? null,
        campaign: campaign ?? null,
        sourcePage: window.location.pathname,
      });
    };

    // No IntersectionObserver (very old browsers, some test environments):
    // count on mount rather than losing the measurement entirely.
    if (typeof IntersectionObserver === "undefined") {
      record();
      return;
    }

    // A card is small relative to the viewport, so the ratio is meaningful
    // directly. Guarding against a card taller than the viewport keeps the
    // rule honest on a narrow phone, where one card can fill the screen.
    const seenEnough = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return false;
      if (entry.intersectionRatio >= VISIBILITY_RATIO) return true;
      const rect = entry.boundingClientRect;
      const viewport = entry.rootBounds?.height ?? window.innerHeight;
      if (rect.height <= viewport) return false;
      const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      return visible >= viewport * VISIBILITY_RATIO;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(seenEnough)) {
          record();
          observer.disconnect();
        }
      },
      {
        threshold: [0, 0.25, VISIBILITY_RATIO, 0.75, 1],
        rootMargin: ROOT_MARGIN,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [providerId, providerSlug, countryCode, category, placement, campaign]);

  return (
    <div ref={nodeRef} className={className}>
      {children}
    </div>
  );
}
