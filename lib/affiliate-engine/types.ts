// ============================================================
// M-AFFILIATE-1 — Central Affiliate Engine: shared types
//
// Kept dependency-free so the pure logic modules can be unit tested
// without a bundler or a database.
// ============================================================

/**
 * Canonical categories. Mirrors the `affiliate_provider_categories` table.
 * The table is the source of truth at runtime — this union exists for
 * compile-time safety at call sites. Adding a category is an INSERT plus a
 * one-line addition here, never a schema migration.
 */
export const AFFILIATE_CATEGORIES = [
  "MONEY_TRANSFER",
  "FLIGHTS",
  "HOTELS",
  "HOSTELS",
  "ESIM",
  "VPN",
  "TRAVEL_INSURANCE",
  "CAR_RENTAL",
  "AIRPORT_TRANSFER",
  "TOURS",
  "EDUCATION",
  "CAREER_TRAINING",
  "TEFL_TESOL",
  "REMOTE_WORK",
  "RESUME",
  "BUSINESS_TOOLS",
  "LEGAL",
  "TRANSLATION",
  "SHIPPING",
  "PHONE_INTERNET",
] as const;

export type AffiliateCategoryCode = (typeof AFFILIATE_CATEGORIES)[number];

/** Human labels for the categories above. */
export const AFFILIATE_CATEGORY_LABELS: Record<AffiliateCategoryCode, string> = {
  MONEY_TRANSFER: "Money Transfer",
  FLIGHTS: "Flights",
  HOTELS: "Hotels",
  HOSTELS: "Hostels",
  ESIM: "eSIM & Mobile Data",
  VPN: "VPN & Privacy",
  TRAVEL_INSURANCE: "Travel Insurance",
  CAR_RENTAL: "Car Rental",
  AIRPORT_TRANSFER: "Airport Transfer",
  TOURS: "Tours & Activities",
  EDUCATION: "Education",
  CAREER_TRAINING: "Career Training",
  TEFL_TESOL: "TEFL / TESOL",
  REMOTE_WORK: "Remote Work",
  RESUME: "Resume Tools",
  BUSINESS_TOOLS: "Business Tools",
  LEGAL: "Legal Services",
  TRANSLATION: "Translation",
  SHIPPING: "Shipping",
  PHONE_INTERNET: "Phone & Internet",
};

/**
 * Provider approval lifecycle. Only APPROVED (plus an affiliate URL and an
 * active provider) may ever produce a monetized link.
 */
export const AFFILIATE_STATUSES = [
  "NOT_APPLIED",
  "APPLIED",
  "PENDING",
  "APPROVED",
  "REJECTED",
  "PAUSED",
  "EXPIRED",
] as const;

export type AffiliateStatusCode = (typeof AFFILIATE_STATUSES)[number];

/** Networks we may work through. Metadata only — the provider is the entity. */
export const AFFILIATE_NETWORKS = [
  "TRAVELPAYOUTS",
  "IMPACT",
  "AWIN",
  "PARTNERIZE",
  "PARTNERSTACK",
  "CJ",
  "DIRECT",
  "OTHER",
] as const;

export type AffiliateNetworkCode = (typeof AFFILIATE_NETWORKS)[number];

/**
 * Render-safe provider shape. Matches the `affiliate_providers_public` view.
 *
 * Deliberately does NOT include affiliate_url, commission terms, cookie days,
 * account identifiers, or internal notes — the public view does not expose them.
 */
export interface PublicProvider {
  id: string;
  slug: string;
  name: string;
  category: string;
  network: string;
  description: string | null;
  website_url: string | null;
  /** True when an approved affiliate destination exists. Not the URL itself. */
  monetized: boolean;
  featured: boolean;
  trust_score: number;
  global_priority: number;
  disclosure_required: boolean;
}

/** Matches the `affiliate_provider_countries_public` view. */
export interface ProviderCountryRule {
  provider_id: string;
  country_code: string;
  available: boolean;
  priority: number;
  availability_notes: string | null;
}

/** A provider after country filtering and deterministic ranking. */
export interface RankedProvider extends PublicProvider {
  /** Country priority from the availability row, or 0 when country-agnostic. */
  country_priority: number;
  /** Note attached to this provider's availability in the requested country. */
  availability_note: string | null;
}

/** Result of resolving a slug through `resolve_affiliate_destination`. */
export interface ResolvedDestination {
  provider_id: string;
  provider_name: string;
  provider_slug: string;
  category: string;
  destination_url: string | null;
  monetized: boolean;
  sub_id_param: string | null;
}

/** Context recorded with a click. Commercial fields only — never personal. */
export interface ClickContext {
  providerId: string;
  countryCode?: string | null;
  category?: string | null;
  sourcePage?: string | null;
  placement?: string | null;
  campaign?: string | null;
}
