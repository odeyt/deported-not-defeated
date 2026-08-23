import { createAdminClient } from "@/lib/supabase/admin";
import { isAffiliateClickLoggingEnabled } from "./flags";
import type { AffiliateClickRecord } from "./types";

/**
 * Affiliate click logging. SERVER ONLY.
 *
 * PRIVACY CONTRACT (spec §14, §34)
 * --------------------------------
 * This table measures commercial performance. It is not, and must not
 * become, a profile of the people who use this site.
 *
 * NEVER recorded here, under any circumstances:
 *   deportation reason · immigration status · criminal history ·
 *   legal case details · passport or immigration ID numbers ·
 *   names · email addresses · full or partial IP addresses ·
 *   full user-agent strings · full referrer URLs including query strings
 *
 * The pre-M-AFFILIATE-1 implementation stored the complete user-agent and
 * the complete referrer. Both are now dropped at the source: the columns
 * still exist so that historical rows survive, but nothing writes to them.
 *
 * Writes go through the service-role client so that anonymous visitors
 * cannot forge click rows once the hardening migration removes the public
 * INSERT policy (spec §32).
 */

/** Bound anything free-text before it reaches the database. */
function clamp(value: string | null, max: number): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

/**
 * Record a click. Best-effort and non-blocking by contract.
 *
 * Returns true when a row was written. A false return is never surfaced to
 * the visitor — losing analytics is always preferable to failing a redirect
 * (spec §37).
 */
export async function recordAffiliateClick(record: AffiliateClickRecord): Promise<boolean> {
  if (!isAffiliateClickLoggingEnabled()) return false;

  const supabase = createAdminClient();
  if (!supabase) {
    // No service-role key configured. Log nothing rather than falling back to
    // an anonymous insert, which is exactly the hole the hardening step closes.
    return false;
  }

  try {
    const { error } = await supabase.from("affiliate_clicks").insert({
      partner_id:         record.providerId,
      partner_slug:       clamp(record.providerSlug, 64),
      page_path:          clamp(record.sourcePage, 512),
      country_code:       record.countryCode,
      category:           record.category,
      placement:          clamp(record.placement, 64),
      campaign:           clamp(record.campaign, 64),
      network:            clamp(record.network, 32),
      outcome:            record.outcome,
      session_identifier: clamp(record.sessionIdentifier, 64),
      // referrer / user_agent / ip_hash are intentionally omitted — see above.
    });

    return !error;
  } catch {
    return false;
  }
}
