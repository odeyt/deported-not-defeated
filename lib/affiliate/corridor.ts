// ============================================================
// Corridor resolution (M-GROWTH1A Phase 3)
//
// Pure. Decides which availability row answers a reader's actual question.
//
// THREE DIFFERENT FACTS, KEPT SEPARATE
//   1. The provider exists.
//   2. The provider serves Mexico.               (destination availability)
//   3. The provider supports USA -> Mexico.      (corridor verification)
//
// A remittance reader is asking (3). Answering with (2) and calling it (3) is
// the fabrication this module exists to prevent.
//
// BACKWARD COMPATIBILITY
//   `origin_country` is added by supabase/affiliate_corridor.sql and may be
//   absent entirely (before the migration) or NULL (a legacy row). Both mean
//   the same thing here: destination availability, no corridor claim. Legacy
//   rows keep working and keep their original meaning.
// ============================================================

export interface AvailabilityRow {
  country_code: string;
  available: boolean;
  priority?: number;
  verified_at?: string | null;
  availability_notes?: string | null;
  /** Absent before the migration; NULL on a legacy row. */
  origin_country?: string | null;
}

export type CorridorMatch =
  /** A row verified for exactly this origin -> destination pair. */
  | "CORRIDOR"
  /** A destination row with no corridor claim attached. */
  | "DESTINATION_ONLY"
  /** Nothing available for this destination. */
  | "NONE";

export interface CorridorResolution {
  match: CorridorMatch;
  row: AvailabilityRow | null;
  /**
   * True only when a row explicitly names this origin. Never inferred from a
   * destination-only row, however well verified that row is.
   */
  corridorVerified: boolean;
}

function normalizeCountry(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(trimmed) ? trimmed : null;
}

/** A row carrying no origin — either pre-migration or a legacy NULL. */
function isDestinationOnly(row: AvailabilityRow): boolean {
  return normalizeCountry(row.origin_country) === null;
}

/**
 * Pick the row that best answers "can this provider move money from `origin`
 * to `destination`".
 *
 * Preference order:
 *   1. an exact corridor row for this origin
 *   2. a destination-only row (honest, but makes no corridor claim)
 *   3. nothing
 *
 * A corridor row for a DIFFERENT origin is never used. "Wise supports CA -> MX"
 * is not evidence about US -> MX.
 */
export function resolveCorridor(
  rows: AvailabilityRow[],
  destination: string,
  origin?: string | null
): CorridorResolution {
  const wantedDestination = normalizeCountry(destination);
  const wantedOrigin = normalizeCountry(origin);

  if (!wantedDestination) {
    return { match: "NONE", row: null, corridorVerified: false };
  }

  const forDestination = rows.filter(
    (row) => normalizeCountry(row.country_code) === wantedDestination && row.available
  );

  if (forDestination.length === 0) {
    return { match: "NONE", row: null, corridorVerified: false };
  }

  if (wantedOrigin) {
    const exact = forDestination.find(
      (row) => normalizeCountry(row.origin_country) === wantedOrigin
    );
    if (exact) {
      return { match: "CORRIDOR", row: exact, corridorVerified: true };
    }
  }

  const generic = forDestination.find(isDestinationOnly);
  if (generic) {
    return { match: "DESTINATION_ONLY", row: generic, corridorVerified: false };
  }

  // Only rows for other origins exist. They say nothing about this journey, so
  // the provider is not presented as available for it.
  return { match: "NONE", row: null, corridorVerified: false };
}

/**
 * The claim the UI may make, given a resolution and its freshness state.
 * Deliberately conservative: a corridor claim requires a corridor row AND a
 * verification date that is still current.
 */
export function corridorClaim(
  resolution: CorridorResolution,
  freshnessState: "VERIFIED_CURRENT" | "VERIFIED_STALE" | "UNVERIFIED",
  originName?: string,
  destinationName?: string
): string {
  if (resolution.match === "NONE") return "";

  const route =
    originName && destinationName ? `${originName} to ${destinationName}` : "this route";

  if (resolution.corridorVerified && freshnessState === "VERIFIED_CURRENT") {
    return `Confirmed for ${route}`;
  }

  if (resolution.corridorVerified && freshnessState === "VERIFIED_STALE") {
    return `Previously confirmed for ${route} — check current availability`;
  }

  if (freshnessState === "VERIFIED_CURRENT") {
    // Destination verified, corridor not. Say exactly that.
    return destinationName
      ? `Serves ${destinationName} — confirm this specific route`
      : "Serves this destination — confirm this specific route";
  }

  return "Confirm availability with provider";
}
