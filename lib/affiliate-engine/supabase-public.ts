// ============================================================
// M-AFFILIATE-1 — Cookie-free Supabase client for public engine reads
//
// WHY THIS EXISTS
//   lib/supabase/server.ts reads cookies(), which opts any page that calls it
//   into dynamic rendering. Country guides are statically generated and must
//   stay that way — turning 119 cached pages into per-request renders would be
//   a real performance and SEO regression, caused by monetization.
//
//   Engine reads are public: the views and RPCs are granted to `anon` and no
//   user session is involved. So this client uses the anon key with no cookie
//   handling, which keeps pages statically renderable (revalidated on a timer).
//
// SECURITY
//   Anon key only — the same key already shipped to the browser. It is never
//   the service role key, so RLS still applies and the restricted views remain
//   the only public read path.
// ============================================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getPublicSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  if (cached) return cached;

  cached = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}
