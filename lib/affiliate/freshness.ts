// ============================================================
// Verification freshness (M-GROWTH1A Phase 4)
//
// Availability changes. A corridor confirmed in August may not hold in
// December, and a claim that was true once should not keep presenting itself
// as current forever.
//
// This module is the ONLY place that does date arithmetic on verification.
// Scattering it through UI components is how two surfaces end up disagreeing
// about whether the same fact is still true.
//
// WHAT THIS DELIBERATELY DOES NOT DO
//   * It never marks a provider unavailable. Age is not evidence of absence.
//   * It never deletes anything.
//   * It never disables a working affiliate link. A passed review date says
//     our checking is old, not that the program ended.
//
// It only softens the CLAIM the site makes to the reader.
// ============================================================

/** Windows from docs/M-AFFILIATE3-PROVIDER-VERIFICATION.md. */
export const FRESHNESS_WINDOW_DAYS = {
  /** Money movement changes fastest — fees, corridors, and payout networks. */
  FINANCIAL: 90,
  /** Travel, connectivity, and insurance move more slowly. */
  TRAVEL: 180,
} as const;

/** Categories treated as financial for freshness purposes. */
const FINANCIAL_CATEGORIES = new Set(["MONEY_TRANSFER"]);

export type VerificationState =
  /** Checked against the provider, and recently enough to state plainly. */
  | "VERIFIED_CURRENT"
  /** Checked against the provider, but long enough ago to hedge again. */
  | "VERIFIED_STALE"
  /** Never confirmed with the provider. */
  | "UNVERIFIED";

export interface FreshnessResult {
  state: VerificationState;
  /** Days since verification, or null when never verified. */
  ageDays: number | null;
  /** The window applied, in days. */
  windowDays: number;
  /** Reader-facing claim. Never overstates what we actually know. */
  label: string;
}

export function windowForCategory(category: string | null | undefined): number {
  return category && FINANCIAL_CATEGORIES.has(category)
    ? FRESHNESS_WINDOW_DAYS.FINANCIAL
    : FRESHNESS_WINDOW_DAYS.TRAVEL;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Classify a verification date.
 *
 * `now` is injectable so tests can pin boundaries rather than depend on the
 * clock — a freshness test that passes today and fails in 91 days is worse
 * than no test.
 */
export function evaluateFreshness(
  verifiedAt: string | Date | null | undefined,
  category: string | null | undefined,
  now: Date = new Date()
): FreshnessResult {
  const windowDays = windowForCategory(category);

  if (!verifiedAt) {
    return {
      state: "UNVERIFIED",
      ageDays: null,
      windowDays,
      label: "Confirm availability with provider",
    };
  }

  const verified = verifiedAt instanceof Date ? verifiedAt : new Date(verifiedAt);

  // An unparseable date is not evidence of anything.
  if (Number.isNaN(verified.getTime())) {
    return {
      state: "UNVERIFIED",
      ageDays: null,
      windowDays,
      label: "Confirm availability with provider",
    };
  }

  const ageDays = Math.floor((now.getTime() - verified.getTime()) / MS_PER_DAY);

  // A future date is a data error, not a fresher fact. Treat it as unverified
  // rather than letting a typo buy an extra year of confident language.
  if (ageDays < 0) {
    return {
      state: "UNVERIFIED",
      ageDays: null,
      windowDays,
      label: "Confirm availability with provider",
    };
  }

  if (ageDays <= windowDays) {
    return {
      state: "VERIFIED_CURRENT",
      ageDays,
      windowDays,
      label: "Availability confirmed with provider",
    };
  }

  return {
    state: "VERIFIED_STALE",
    ageDays,
    windowDays,
    label: "Previously verified — confirm current availability",
  };
}

/** True only when we can state availability plainly. */
export function canStateAvailabilityPlainly(result: FreshnessResult): boolean {
  return result.state === "VERIFIED_CURRENT";
}

/** When the next review is due, or null when never verified. */
export function nextReviewDate(
  verifiedAt: string | Date | null | undefined,
  category: string | null | undefined
): Date | null {
  if (!verifiedAt) return null;
  const verified = verifiedAt instanceof Date ? verifiedAt : new Date(verifiedAt);
  if (Number.isNaN(verified.getTime())) return null;

  return new Date(verified.getTime() + windowForCategory(category) * MS_PER_DAY);
}
