import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-free anonymous Supabase client for public affiliate reads.
 *
 * WHY THIS EXISTS
 *   lib/supabase/server.ts reads cookies(), and calling it during render opts
 *   the page into dynamic rendering. Country guides and resource pages are
 *   statically generated; letting a monetization block quietly convert them
 *   into per-request renders is a real caching and SEO cost paid for no gain.
 *
 *   Affiliate reads need no user session — the provider view and availability
 *   rows are readable by `anon` through RLS. So the fallback read path uses
 *   the anon key with no cookie handling, and pages stay static.
 *
 * ORDERING (see getReadClient in service.ts)
 *   1. service-role admin client — preferred, and required after the
 *      hardening migration narrows anonymous column access
 *   2. this client — cookie-free, keeps pages statically renderable
 *
 *   The cookie-bound server client is deliberately NOT in that chain.
 *
 * SECURITY
 *   Anon key only. It is the same key already shipped to the browser, so RLS
 *   still applies and this client can never read more than a visitor could.
 */

let cached: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  if (cached) return cached;

  cached = createSupabaseClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}
