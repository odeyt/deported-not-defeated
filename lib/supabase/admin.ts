import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. SERVER ONLY.
 *
 * `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security entirely, so this
 * module must never be imported from a Client Component or anything that
 * ends up in a browser bundle. The guard below turns a mistake into an
 * immediate, obvious crash instead of a leaked key.
 *
 * Used for exactly two things in M-AFFILIATE-1:
 *   1. reading a provider's affiliate URL inside the /go route
 *   2. inserting click rows
 *
 * Both are best-effort. `createAdminClient()` returns null when the key is
 * not configured, and every caller falls back to the anon client or simply
 * skips the work — a missing service key must never break a redirect.
 */

if (typeof window !== "undefined") {
  throw new Error(
    "lib/supabase/admin.ts was imported in a browser bundle. This module holds a service-role key and must stay server-only."
  );
}

let cached: SupabaseClient | null = null;

export function createAdminClient(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  cached = createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}

/** True when a service-role key is configured. Surfaced in the admin UI. */
export function hasServiceRoleKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
