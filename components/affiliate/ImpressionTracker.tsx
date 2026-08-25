"use client";

import { useEffect, useRef } from "react";

/**
 * Reports that provider cards were actually shown (M-GROWTH1A Phase 2).
 *
 * DEFINITION OF AN IMPRESSION
 *   The card entered the viewport. Not "the page rendered it somewhere below
 *   the fold" — a card nobody scrolled to was never an opportunity to click,
 *   and counting it would depress every CTR figure with impressions that never
 *   had a chance.
 *
 * DEDUPLICATION
 *   One impression per provider per placement per page view, held in a ref.
 *   React re-renders, scrolling a card out and back, and Strict Mode's double
 *   effect all resolve to a single row.
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
  impressions: TrackedImpression[];
  /** Element to observe. Defaults to the wrapper this component renders. */
  children?: React.ReactNode;
}

export default function ImpressionTracker({ impressions, children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sent = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!impressions.length) return;
    const node = containerRef.current;
    if (!node) return;

    const key = (i: TrackedImpression) =>
      `${i.providerSlug}|${i.placement ?? ""}|${window.location.pathname}`;

    const flush = () => {
      const unsent = impressions.filter((i) => !sent.current.has(key(i)));
      if (!unsent.length) return;

      unsent.forEach((i) => sent.current.add(key(i)));

      const payload = JSON.stringify({
        impressions: unsent.map((i) => ({
          providerId: i.providerId,
          providerSlug: i.providerSlug,
          countryCode: i.countryCode ?? null,
          category: i.category ?? null,
          placement: i.placement ?? null,
          campaign: i.campaign ?? null,
          sourcePage: window.location.pathname,
        })),
      });

      // sendBeacon survives the page being closed mid-flight and does not
      // delay navigation. fetch with keepalive is the fallback.
      try {
        const blob = new Blob([payload], { type: "application/json" });
        if (!navigator.sendBeacon?.("/api/affiliate-impression", blob)) {
          void fetch("/api/affiliate-impression", {
            method: "POST",
            body: payload,
            headers: { "Content-Type": "application/json" },
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Never surface an analytics failure.
      }
    };

    // No IntersectionObserver (very old browsers, some test environments):
    // count on mount rather than losing the measurement entirely.
    if (typeof IntersectionObserver === "undefined") {
      flush();
      return;
    }

    // A fixed 0.5 threshold measures half of the ELEMENT, so a provider grid
    // taller than the viewport can never reach it and would never report at
    // all. Measure against whichever is smaller — the element or the viewport —
    // so "half of it was on screen" keeps meaning that for a block of any size.
    const seenEnough = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return false;
      const rect = entry.boundingClientRect;
      const viewport = entry.rootBounds?.height ?? window.innerHeight;
      const reference = Math.min(rect.height, viewport);
      if (reference <= 0) return true;
      const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      return visible >= reference * 0.5;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(seenEnough)) {
          flush();
          observer.disconnect();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [impressions]);

  return <div ref={containerRef}>{children}</div>;
}
