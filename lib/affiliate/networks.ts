/**
 * Affiliate network adapters.
 *
 * Every network names its sub-ID parameter differently, and several ignore
 * extra query parameters entirely. Blindly appending `?subid=...` to every
 * destination would break links and, worse, could look like tampering with
 * a partner's tracking URL.
 *
 * So: each network declares how (and whether) it accepts a sub-ID, and the
 * router only ever adds what that network documents. A network we have not
 * configured gets NOTHING appended.
 *
 * The parameter names below are placeholders marked `subIdParam: null` until
 * an actual publisher account exists and the network's own documentation has
 * been read. Nothing here is guessed from memory — see
 * docs/AFFILIATE-OPERATIONS.md, "Turning on sub-ID tracking".
 */

export const AFFILIATE_NETWORKS = [
  "travelpayouts",
  "impact",
  "awin",
  "partnerize",
  "partnerstack",
  "cj",
  "direct",
  "other",
] as const;

export type AffiliateNetwork = (typeof AFFILIATE_NETWORKS)[number];

const NETWORK_SET: ReadonlySet<string> = new Set(AFFILIATE_NETWORKS);

export function isAffiliateNetwork(value: unknown): value is AffiliateNetwork {
  return typeof value === "string" && NETWORK_SET.has(value);
}

export interface NetworkAdapter {
  /** Display name for the admin UI. */
  label: string;
  /**
   * Query parameter this network reads a publisher sub-ID from.
   *
   * `null` means "not configured" — the router will append nothing. This is
   * the correct default: an unknown parameter name is worse than no sub-ID,
   * because it silently produces unattributable clicks that look tracked.
   */
  subIdParam: string | null;
  /** What the operator must confirm before `subIdParam` may be filled in. */
  verificationNote: string;
}

export const NETWORK_ADAPTERS: Record<AffiliateNetwork, NetworkAdapter> = {
  travelpayouts: {
    label: "Travelpayouts",
    subIdParam: null,
    verificationNote:
      "Travelpayouts links carry a publisher marker plus an optional sub-ID. Confirm both parameter names in your own Travelpayouts dashboard before setting this — do not copy them from a blog post.",
  },
  impact: {
    label: "Impact",
    subIdParam: null,
    verificationNote:
      "Impact supports several sub-ID slots. Confirm which one your specific brand contract exposes in the Impact publisher UI.",
  },
  awin: {
    label: "Awin",
    subIdParam: null,
    verificationNote:
      "Awin uses a click-reference parameter. Confirm the exact name and permitted length for your publisher account.",
  },
  partnerize: {
    label: "Partnerize",
    subIdParam: null,
    verificationNote:
      "Partnerize encodes sub-IDs into the tracking path rather than a query string for some brands. Confirm the format with the brand's Partnerize setup before enabling.",
  },
  partnerstack: {
    label: "PartnerStack",
    subIdParam: null,
    verificationNote:
      "Confirm sub-ID support per-vendor in PartnerStack; it is not uniform across programs.",
  },
  cj: {
    label: "CJ Affiliate",
    subIdParam: null,
    verificationNote:
      "CJ supports publisher-defined tracking values. Confirm the parameter name in the CJ link generator.",
  },
  direct: {
    label: "Direct (no network)",
    subIdParam: null,
    verificationNote:
      "A direct relationship. Whether a sub-ID is supported is entirely up to the merchant — ask them.",
  },
  other: {
    label: "Other",
    subIdParam: null,
    verificationNote: "Unknown network. Nothing is appended until it is identified and documented.",
  },
};

/**
 * Query parameters to add to a destination URL for a given network.
 *
 * Returns an empty object whenever the network is unknown, unconfigured, or
 * the sub-ID is blank. Callers can pass the result straight to
 * `withTrackingParams` without a null check.
 */
export function trackingParamsFor(
  network: string | null | undefined,
  subId: string | null | undefined
): Record<string, string> {
  if (!subId) return {};
  if (!isAffiliateNetwork(network)) return {};

  const param = NETWORK_ADAPTERS[network].subIdParam;
  if (!param) return {};

  return { [param]: subId };
}
