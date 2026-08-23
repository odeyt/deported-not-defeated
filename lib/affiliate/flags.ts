/**
 * Feature flag for the affiliate engine (spec §36).
 *
 * The repository has no feature-flag platform and does not need one. A
 * single environment variable is enough, and it defaults to ON so that
 * an unset variable in an existing deployment does not silently switch
 * off a shipped feature.
 *
 * Turning it OFF is the emergency brake: recommendation components render
 * nothing, and `/go/...` stops emitting affiliate destinations. Provider
 * websites and non-affiliate fallbacks keep working, so a country guide
 * never loses its useful links because monetization was disabled
 * (spec §37).
 */

function readFlag(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value.trim() === "") return defaultValue;
  const normalized = value.trim().toLowerCase();
  if (["0", "false", "off", "no"].includes(normalized)) return false;
  if (["1", "true", "on", "yes"].includes(normalized)) return true;
  return defaultValue;
}

/** Master switch. When false, no affiliate destination is ever emitted. */
export function isAffiliateEngineEnabled(): boolean {
  return readFlag(process.env.AFFILIATE_ENGINE_ENABLED, true);
}

/**
 * Click logging, separable from the engine itself.
 *
 * Kept as its own flag so that analytics can be paused — for a privacy
 * review, say — without taking the recommendations down with it.
 */
export function isAffiliateClickLoggingEnabled(): boolean {
  return readFlag(process.env.AFFILIATE_CLICK_LOGGING_ENABLED, true);
}

/** Exported for tests; not part of the public surface. */
export const __readFlag = readFlag;
