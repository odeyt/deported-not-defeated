// ============================================================
// M-AFFILIATE-1 — Redirect destination validation and campaign tracking
//
// This module is the last line of defence before the engine hands a URL to
// NextResponse.redirect(). It is pure and dependency-free so it can be unit
// tested directly.
//
// THREAT MODEL
//   * Open redirect — the router never accepts a URL from the request. It
//     accepts a slug, looks the destination up, and validates it here.
//   * Script execution — javascript:/data:/vbscript: destinations are rejected
//     even if one somehow reaches the database.
//   * SSRF-ish internal targets — loopback, link-local, and RFC-1918 hosts are
//     rejected so a stored destination cannot probe internal services.
//   * Credential leakage — URLs carrying user:password@ are rejected.
// ============================================================

/** Hard cap. Real affiliate URLs with tracking parameters stay well under this. */
const MAX_URL_LENGTH = 2048;

/** Only ordinary encrypted web traffic may be a redirect destination. */
const ALLOWED_PROTOCOL = "https:";

/** Hostnames that must never be redirect destinations. */
const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "::1",
  "metadata.google.internal",
]);

/** Private / loopback / link-local IPv4 ranges. */
const PRIVATE_IPV4 =
  /^(?:10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/;

/**
 * True when the string contains an ASCII control character, a space, or DEL.
 * Those can be used to smuggle a second URL past a naive parser, so any
 * occurrence disqualifies the destination.
 */
function hasControlOrSpace(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code <= 0x20 || code === 0x7f) return true;
  }
  return false;
}

/**
 * Whether a stored destination is safe to redirect a visitor to.
 *
 * Fails closed: anything unparseable, non-https, internal, or malformed is
 * rejected rather than guessed at.
 */
export function isSafeAffiliateUrl(raw: unknown): raw is string {
  if (typeof raw !== "string") return false;

  const value = raw.trim();
  if (value.length === 0 || value.length > MAX_URL_LENGTH) return false;

  // Surrounding whitespace was trimmed above; anything left is embedded.
  if (hasControlOrSpace(value)) return false;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  // Blocks javascript:, data:, file:, vbscript:, blob:, and plain http:.
  if (url.protocol !== ALLOWED_PROTOCOL) return false;

  // Credentials in a redirect target are always suspicious.
  if (url.username || url.password) return false;

  const host = url.hostname.toLowerCase();
  if (!host) return false;
  if (BLOCKED_HOSTNAMES.has(host)) return false;
  if (PRIVATE_IPV4.test(host)) return false;

  // Require a real public hostname: at least one dot, and no trailing dot.
  if (!host.includes(".") || host.endsWith(".")) return false;

  return true;
}

/**
 * Returns the URL when it is safe, otherwise null.
 * Convenience wrapper so callers can write `?? fallback`.
 */
export function safeAffiliateUrlOrNull(raw: unknown): string | null {
  return isSafeAffiliateUrl(raw) ? raw.trim() : null;
}

/**
 * Build a deterministic campaign / sub-id string from placement context.
 *
 * Example: { country: "GT", category: "MONEY_TRANSFER", placement: "country-guide" }
 *          -> "gt_money_transfer_country_guide"
 *
 * The same string is stored on the click row, so network-reported conversions
 * can later be matched back to the placement that produced them.
 */
export function buildSubId(parts: {
  country?: string | null;
  category?: string | null;
  placement?: string | null;
}): string {
  const segments = [parts.country, parts.category, parts.placement]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
    )
    .filter((part) => part.length > 0);

  return segments.join("_").slice(0, 64).replace(/_+$/g, "");
}

/**
 * Attach the campaign sub-id to an affiliate URL using the parameter name the
 * network actually uses.
 *
 * `paramName` comes from the provider record and is set by an operator who has
 * read that network's documentation. When it is not set, nothing is appended —
 * the engine never guesses a tracking parameter name, because a wrong one is
 * either ignored or breaks attribution silently.
 */
export function withSubId(
  destinationUrl: string,
  paramName: string | null | undefined,
  subId: string | null | undefined
): string {
  if (!paramName || !subId) return destinationUrl;
  if (!isSafeAffiliateUrl(destinationUrl)) return destinationUrl;

  const cleanParam = paramName.trim();
  if (!/^[A-Za-z0-9_-]{1,32}$/.test(cleanParam)) return destinationUrl;

  try {
    const url = new URL(destinationUrl);
    url.searchParams.set(cleanParam, subId);
    const result = url.toString();
    return result.length <= MAX_URL_LENGTH ? result : destinationUrl;
  } catch {
    return destinationUrl;
  }
}

/**
 * Normalize a country code coming from a request or a page prop.
 * Returns null for anything that is not a plausible ISO-3166-1 alpha-2 code.
 */
export function normalizeCountryCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(value) ? value : null;
}

/**
 * Normalize a category code coming from a URL segment.
 * Accepts "money-transfer" or "MONEY_TRANSFER" and returns "MONEY_TRANSFER".
 */
export function normalizeCategoryCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim().toUpperCase().replace(/-/g, "_");
  return /^[A-Z][A-Z0-9_]{1,63}$/.test(value) ? value : null;
}

/**
 * Normalize a provider slug coming from a URL segment.
 * Rejects path traversal, encoded separators, and anything non-slug-shaped.
 */
export function normalizeSlug(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim().toLowerCase();
  return /^[a-z0-9][a-z0-9-]{0,63}$/.test(value) ? value : null;
}
