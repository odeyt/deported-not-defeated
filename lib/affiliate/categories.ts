/**
 * Canonical affiliate category vocabulary.
 *
 * Mirrors the `affiliate_canonical_categories` table. The database is the
 * source of truth at runtime; this list exists so that route params and
 * component props are typed, and so that a typo fails at build time rather
 * than silently returning zero providers.
 *
 * Adding a category = one row in the DB + one entry here. No migration.
 */

export const AFFILIATE_CATEGORIES = [
  "MONEY_TRANSFER",
  "FLIGHTS",
  "HOTELS",
  "HOSTELS",
  "ESIM",
  "PHONE_INTERNET",
  "VPN",
  "TRAVEL_INSURANCE",
  "HEALTH_INSURANCE",
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
] as const;

export type AffiliateCategoryCode = (typeof AFFILIATE_CATEGORIES)[number];

const CATEGORY_SET: ReadonlySet<string> = new Set(AFFILIATE_CATEGORIES);

export function isAffiliateCategory(value: string): value is AffiliateCategoryCode {
  return CATEGORY_SET.has(value);
}

/** Human-readable label, used in headings and admin tables. */
export const CATEGORY_LABELS: Record<AffiliateCategoryCode, string> = {
  MONEY_TRANSFER:   "Money Transfer",
  FLIGHTS:          "Flights",
  HOTELS:           "Hotels",
  HOSTELS:          "Hostels",
  ESIM:             "eSIM",
  PHONE_INTERNET:   "Phone & Internet",
  VPN:              "VPN & Privacy",
  TRAVEL_INSURANCE: "Travel Insurance",
  HEALTH_INSURANCE: "Health Insurance",
  CAR_RENTAL:       "Car Rental",
  AIRPORT_TRANSFER: "Airport Transfer",
  TOURS:            "Tours & Activities",
  EDUCATION:        "Education",
  CAREER_TRAINING:  "Career Training",
  TEFL_TESOL:       "TEFL / TESOL",
  REMOTE_WORK:      "Remote Work",
  RESUME:           "Resume & CV",
  BUSINESS_TOOLS:   "Business Tools",
  LEGAL:            "Legal",
  TRANSLATION:      "Translation",
  SHIPPING:         "Shipping",
};

/**
 * URL segment for `/go/category/<slug>`, e.g. MONEY_TRANSFER -> "money-transfer".
 */
export function categoryToSlug(code: AffiliateCategoryCode): string {
  return code.toLowerCase().replace(/_/g, "-");
}

/**
 * Reverse of `categoryToSlug`, plus a small set of aliases so that the
 * legacy `affiliate_categories.slug` values and a few obvious shorthands
 * keep resolving. Returns null for anything unrecognised — callers must
 * treat that as "no category", never as "all categories".
 */
export function slugToCategory(slug: string): AffiliateCategoryCode | null {
  if (typeof slug !== "string") return null;

  const normalized = slug.trim().toLowerCase();
  if (!normalized || normalized.length > 40) return null;

  const alias = CATEGORY_ALIASES[normalized];
  if (alias) return alias;

  const candidate = normalized.replace(/-/g, "_").toUpperCase();
  return isAffiliateCategory(candidate) ? candidate : null;
}

const CATEGORY_ALIASES: Record<string, AffiliateCategoryCode> = {
  // Legacy affiliate_categories.slug values already in the database
  "money-transfer":   "MONEY_TRANSFER",
  "phone-internet":   "PHONE_INTERNET",
  "vpn-privacy":      "VPN",
  "health-insurance": "HEALTH_INSURANCE",
  // Convenience shorthands
  "money":            "MONEY_TRANSFER",
  "remittance":       "MONEY_TRANSFER",
  "hotel":            "HOTELS",
  "hostel":           "HOSTELS",
  "flight":           "FLIGHTS",
  "sim":              "ESIM",
  "insurance":        "TRAVEL_INSURANCE",
  "car-hire":         "CAR_RENTAL",
  "courses":          "EDUCATION",
};
