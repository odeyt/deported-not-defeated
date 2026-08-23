/**
 * Central affiliate engine — public surface.
 *
 * `@/lib/affiliate` used to resolve to a single file of helpers. That file
 * is now ./legacy.ts and is re-exported here unchanged, so every existing
 * import keeps working.
 *
 * Server-only modules are NOT re-exported from this barrel. `./service`
 * and `./clicks` reach for a service-role key and must be imported
 * explicitly from server code, so that they can never be pulled into a
 * client bundle by an innocent-looking barrel import.
 */

// Pre-existing helpers — unchanged behaviour.
export { getEffectiveUrl, isApproved, getStatusLabel, getCategoryMeta } from "./legacy";

export {
  AFFILIATE_CATEGORIES,
  CATEGORY_LABELS,
  categoryToSlug,
  slugToCategory,
  isAffiliateCategory,
  type AffiliateCategoryCode,
} from "./categories";

export {
  AFFILIATE_NETWORKS,
  NETWORK_ADAPTERS,
  isAffiliateNetwork,
  trackingParamsFor,
  type AffiliateNetwork,
  type NetworkAdapter,
} from "./networks";

export {
  AFFILIATE_STATUSES,
  PLACEMENT_TYPES,
  isAffiliateApprovalStatus,
  type AffiliateApprovalStatus,
  type AffiliateClickRecord,
  type AffiliateProvider,
  type PlacementType,
  type ResolvedDestination,
} from "./types";

export {
  isSafeAffiliateUrl,
  isValidProviderSlug,
  normalizeCountryCode,
  sourcePathFromReferer,
  buildSubId,
  withTrackingParams,
} from "./url";

export {
  isMonetizable,
  isAvailableIn,
  rankProviders,
  buildFallbackChain,
  selectDestination,
  resolveProviderDestination,
  partitionByCountryEvidence,
} from "./selection";

export { isAffiliateEngineEnabled, isAffiliateClickLoggingEnabled } from "./flags";
