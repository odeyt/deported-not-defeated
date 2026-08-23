import type { AffiliateCategoryCode } from "./categories";
import type { AffiliateNetwork } from "./networks";

/**
 * Approval lifecycle for a provider relationship (spec §5).
 *
 * Only `approved` — combined with `active` and a stored affiliate URL —
 * ever produces an affiliate destination. Everything else falls through
 * to the provider's ordinary website or to a non-affiliate resource.
 */
export const AFFILIATE_STATUSES = [
  "not_applied",
  "applied",
  "pending",
  "approved",
  "rejected",
  "paused",
  "expired",
] as const;

export type AffiliateApprovalStatus = (typeof AFFILIATE_STATUSES)[number];

export function isAffiliateApprovalStatus(value: unknown): value is AffiliateApprovalStatus {
  return typeof value === "string" && (AFFILIATE_STATUSES as readonly string[]).includes(value);
}

/**
 * How a listing must be presented to the visitor (spec §23).
 *
 * `editorial` is the safe default: a resource we list because it is useful,
 * with no commercial relationship implied.
 */
export const PLACEMENT_TYPES = ["affiliate", "sponsored", "featured", "editorial"] as const;
export type PlacementType = (typeof PLACEMENT_TYPES)[number];

/**
 * A provider as the public site sees it.
 *
 * Deliberately omits `notes`, `internal_notes`, `account_identifier`,
 * `commission_value`, and `commission_notes`. Those are operator data and
 * must never be selected by a public-facing query — see
 * `PUBLIC_PROVIDER_COLUMNS` in ./service.
 */
export interface AffiliateProvider {
  id: string;
  slug: string;
  name: string;
  category: AffiliateCategoryCode | null;
  network: AffiliateNetwork | null;
  description: string | null;
  whyItHelps: string | null;
  websiteUrl: string | null;
  /** Present only when the provider is genuinely approved. */
  affiliateUrl: string | null;
  approvalStatus: AffiliateApprovalStatus;
  placementType: PlacementType;
  ctaLabel: string;
  active: boolean;
  featured: boolean;
  disclosureRequired: boolean;
  availableGlobally: boolean;
  trustScore: number | null;
  globalPriority: number;
  /** Per-country override, populated when the query was country-scoped. */
  countryPriority: number | null;
  /** Whether a human has confirmed availability in the requested country. */
  countryVerified: boolean;
  countryNotes: string | null;
}

/**
 * Outcome of resolving a `/go/...` request.
 *
 * `kind` records which branch of the fallback chain won, so the click log
 * can distinguish "we earned attribution" from "we sent them somewhere
 * useful but unmonetized".
 */
export type ResolvedDestination =
  | { kind: "affiliate"; url: string; provider: AffiliateProvider }
  | { kind: "website"; url: string; provider: AffiliateProvider }
  | { kind: "fallback"; url: string; provider: null };

/**
 * Fields recorded for a click.
 *
 * PRIVACY CONTRACT (spec §34): this shape is intentionally incapable of
 * carrying immigration status, deportation circumstances, case details,
 * identity documents, names, emails, or IP addresses. If a future change
 * needs to add a field here, that is the moment to re-read §34.
 */
export interface AffiliateClickRecord {
  providerId: string | null;
  providerSlug: string | null;
  /** Path only. Never a full URL, never a query string. */
  sourcePage: string | null;
  countryCode: string | null;
  category: AffiliateCategoryCode | null;
  placement: string | null;
  campaign: string | null;
  network: string | null;
  outcome: ResolvedDestination["kind"];
  sessionIdentifier: string | null;
}
