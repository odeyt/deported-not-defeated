/**
 * Redirect-safety and tracking-parameter helpers.
 *
 * This module is the single choke point between "a string stored in the
 * database" and "a URL the browser is told to navigate to". It has no
 * Next.js, React, or Supabase imports so that it can be exercised directly
 * by the test suite.
 *
 * Threat model (spec §32):
 *   - open redirect via a query parameter        -> we never read one
 *   - javascript:/data:/vbscript: URL injection  -> scheme allowlist
 *   - protocol-relative //evil.example           -> rejected, no scheme
 *   - credential-stuffed URLs (user:pass@host)   -> rejected
 *   - control characters / newline smuggling     -> rejected
 */

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/** Hard ceiling so a corrupt row cannot produce a multi-megabyte Location header. */
const MAX_URL_LENGTH = 2048;

/**
 * True only for an absolute http(s) URL that is safe to hand to a redirect.
 *
 * Deliberately strict. A provider URL that fails this check is treated as
 * missing, which sends the visitor down the fallback chain rather than to an
 * attacker-controlled destination.
 */
export function isSafeAffiliateUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const raw = value.trim();
  if (!raw || raw.length > MAX_URL_LENGTH) return false;

  // Reject anything carrying control characters, including the CR/LF that
  // would be needed to smuggle an extra response header.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(raw)) return false;

  // A scheme-relative URL ("//evil.example") inherits our protocol and would
  // otherwise parse cleanly once a base is supplied. Reject before parsing.
  if (raw.startsWith("//")) return false;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) return false;
  if (!parsed.hostname) return false;

  // Embedded credentials are never legitimate in an affiliate destination
  // and are a classic phishing-display trick.
  if (parsed.username || parsed.password) return false;

  // A bare hostname with no dot is either localhost or an intranet name.
  if (!parsed.hostname.includes(".")) return false;

  return true;
}

/**
 * Slugs are compared against the database, so this is defence in depth
 * rather than the only protection. It keeps obviously hostile input from
 * ever reaching a query, and bounds what can land in a log line.
 */
export function isValidProviderSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9][a-z0-9-]{0,63}$/.test(value);
}

/** ISO 3166-1 alpha-2, uppercase. Returns null rather than guessing. */
export function normalizeCountryCode(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

/**
 * Reduce a referrer to a bare path for click analytics.
 *
 * Query strings and fragments are dropped: on this site a referrer query
 * can carry a visitor's own search terms, and those must not reach the
 * affiliate analytics table (spec §34).
 *
 * Returns null for anything off-site, so we never store a third-party URL.
 */
export function sourcePathFromReferer(referer: string | null, requestOrigin: string): string | null {
  if (!referer) return null;
  try {
    const url = new URL(referer);
    const origin = new URL(requestOrigin);
    if (url.origin !== origin.origin) return null;
    const path = url.pathname;
    return path.length > 512 ? path.slice(0, 512) : path;
  } catch {
    return null;
  }
}

/**
 * Build the sub-ID / campaign string a network will echo back on conversion.
 *
 * Shape: `<country>_<category>_<placement>` lowercased, e.g.
 *   mexico_money_transfer_compare
 *
 * Kept deliberately free of anything identifying a person. Networks surface
 * sub-IDs in reporting dashboards that we do not control.
 */
export function buildSubId(parts: {
  country?: string | null;
  category?: string | null;
  placement?: string | null;
  campaign?: string | null;
}): string {
  const segments = [parts.country, parts.category, parts.placement, parts.campaign]
    .filter((segment): segment is string => typeof segment === "string" && segment.trim().length > 0)
    .map((segment) =>
      segment
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
    )
    .filter(Boolean);

  // Most networks silently truncate long sub-IDs; do it ourselves so the
  // value we store matches the value they will report back.
  return segments.join("_").slice(0, 64);
}

/**
 * Append query parameters to an already-validated affiliate URL.
 *
 * Existing parameters are preserved, and a parameter the affiliate URL
 * already specifies is never overwritten — the network's own link builder
 * knows better than we do.
 *
 * Returns the input unchanged if it is not a safe URL, so this can never
 * turn a rejected URL into an accepted one.
 */
export function withTrackingParams(
  url: string,
  params: Record<string, string | null | undefined>
): string {
  if (!isSafeAffiliateUrl(url)) return url;

  const parsed = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    if (!key || value == null || value === "") continue;
    if (parsed.searchParams.has(key)) continue;
    parsed.searchParams.set(key, value);
  }
  return parsed.toString();
}
