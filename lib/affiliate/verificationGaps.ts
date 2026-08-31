// ============================================================
// M-AFFILIATE-VERIFY1 — gap detection
//
// Pure. Composes the ALREADY-EXISTING truth-model modules (corridor.ts,
// freshness.ts, selection.ts's isMonetizable) into a list of "this record
// needs operator attention" flags. It never does its own date arithmetic
// (that stays freshness.ts's job) and never reimplements corridor
// resolution (that stays corridor.ts's job) — this module only decides
// which combinations of their outputs are worth surfacing.
//
// A provider can hold MORE than one row for the same destination country —
// one generic (origin_country NULL) plus one per verified corridor origin
// (see supabase/affiliate_corridor.sql's partial unique index). This module
// therefore takes the FULL array of rows for a destination, exactly like
// resolveCorridor() itself does, rather than collapsing to a single row and
// silently discarding whichever one didn't survive the collapse.
// ============================================================

import { resolveCorridor, type AvailabilityRow } from "./corridor";
import { evaluateFreshness } from "./freshness";
import { isMonetizable } from "./selection";
import type { AffiliateProvider } from "./types";

export type GapFlag =
  | "APPROVED_NO_LINK"
  | "LINK_PRESENT_NOT_APPROVED"
  | "MONETIZED_VERIFICATION_STALE"
  | "COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN"
  | "CORRIDOR_CLAIM_NO_EVIDENCE"
  | "PENDING_TOO_LONG"
  | "PROVIDER_NEVER_VERIFIED";

export const GAP_LABELS: Record<GapFlag, string> = {
  APPROVED_NO_LINK: "Approved but no affiliate link",
  LINK_PRESENT_NOT_APPROVED: "Affiliate link present but status not approved",
  MONETIZED_VERIFICATION_STALE: "Monetized but verification is stale",
  COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN: "Country available but corridor unknown",
  CORRIDOR_CLAIM_NO_EVIDENCE: "Corridor claimed without recorded evidence",
  PENDING_TOO_LONG: "Application pending too long",
  PROVIDER_NEVER_VERIFIED: "Never verified",
};

/**
 * New in this milestone, not previously documented anywhere: an
 * application sitting in `applied`/`pending` for longer than this is
 * surfaced as needing a follow-up. Adjustable — this is an operational
 * default, not a policy carried over from an existing doc.
 */
export const PENDING_TOO_LONG_DAYS = 60;

export interface GapCountryRow extends AvailabilityRow {
  evidence_url: string | null;
  evidence_tier: string | null;
}

export interface GapDetectionInput {
  affiliate_status: string | null;
  active: boolean | null;
  affiliate_url: string | null;
  canonical_category: string | null;
  application_date: string | null;
  /** Every row this provider has for `destinationCountry`. Empty when it has none. */
  countryRows: GapCountryRow[];
  destinationCountry: string;
  originCountry?: string | null;
}

/**
 * `isMonetizable` only reads `.active` / `.approvalStatus` / `.affiliateUrl`.
 * The cast avoids duplicating its three-condition rule here, which would
 * risk silently drifting from the definition the public site actually uses
 * (`lib/affiliate/selection.ts`) — reuse, don't reimplement.
 */
export function isMonetizedRow(row: {
  active: boolean | null;
  affiliate_status: string | null;
  affiliate_url: string | null;
}): boolean {
  return isMonetizable({
    active: row.active === true,
    approvalStatus: row.affiliate_status ?? "not_applied",
    affiliateUrl: row.affiliate_url,
  } as AffiliateProvider);
}

export function detectGaps(input: GapDetectionInput, now: Date = new Date()): GapFlag[] {
  const flags: GapFlag[] = [];
  const monetized = isMonetizedRow(input);

  if (input.affiliate_status === "approved" && !input.affiliate_url) {
    flags.push("APPROVED_NO_LINK");
  }
  if (input.affiliate_url && input.affiliate_status !== "approved") {
    flags.push("LINK_PRESENT_NOT_APPROVED");
  }

  const resolution = resolveCorridor(
    input.countryRows,
    input.destinationCountry,
    input.originCountry ?? undefined,
  );
  const relevantVerifiedAt = resolution.row?.verified_at ?? null;
  const freshness = evaluateFreshness(relevantVerifiedAt, input.canonical_category, now);

  if (monetized && freshness.state === "VERIFIED_STALE") {
    flags.push("MONETIZED_VERIFICATION_STALE");
  }

  // DESTINATION_ONLY: a generic row exists but names no corridor.
  // NONE with rows present: every row this provider has is for a DIFFERENT
  // origin (or destination availability is otherwise unestablished) — from
  // the reader's actual question ("does this work from MY country"), that
  // is exactly as unanswered as DESTINATION_ONLY, so it gets the same flag.
  if (
    resolution.match === "DESTINATION_ONLY" ||
    (resolution.match === "NONE" && input.countryRows.length > 0)
  ) {
    flags.push("COUNTRY_AVAILABLE_CORRIDOR_UNKNOWN");
  }

  if (resolution.corridorVerified && !(resolution.row as GapCountryRow | null)?.evidence_url) {
    flags.push("CORRIDOR_CLAIM_NO_EVIDENCE");
  }

  if (
    (input.affiliate_status === "applied" || input.affiliate_status === "pending") &&
    input.application_date
  ) {
    const applied = new Date(input.application_date);
    if (!Number.isNaN(applied.getTime())) {
      const days = Math.floor((now.getTime() - applied.getTime()) / (24 * 60 * 60 * 1000));
      if (days > PENDING_TOO_LONG_DAYS) flags.push("PENDING_TOO_LONG");
    }
  }

  if (input.countryRows.length === 0 || freshness.state === "UNVERIFIED") {
    flags.push("PROVIDER_NEVER_VERIFIED");
  }

  return flags;
}
