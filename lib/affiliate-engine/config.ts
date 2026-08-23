// ============================================================
// M-AFFILIATE-1 — Feature flag and environment gating
// ============================================================

/**
 * Master switch for the affiliate engine.
 *
 * Default: ON. Set AFFILIATE_ENGINE_ENABLED=false to disable every engine
 * surface (recommendations render nothing, `/go/` falls back to the legacy
 * partner table) without a code change.
 *
 * "Default safely" here means the engine cannot monetize anything on its own:
 * every provider ships NOT_APPLIED with no affiliate URL, so leaving the flag
 * on adds resource links, never tracking links.
 */
export function isAffiliateEngineEnabled(): boolean {
  return process.env.AFFILIATE_ENGINE_ENABLED?.toLowerCase() !== "false";
}

/**
 * True only when Supabase credentials are present.
 *
 * Guards against build-time and misconfiguration failures: without this,
 * a statically generated country page calling the engine would throw during
 * `next build` on a machine with no environment file.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** The engine may run only when it is both enabled and configured. */
export function isAffiliateEngineOperational(): boolean {
  return isAffiliateEngineEnabled() && isSupabaseConfigured();
}
