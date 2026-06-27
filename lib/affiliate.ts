import type { AffiliatePartner, AffiliateCategory } from "./types";

export function getEffectiveUrl(partner: Pick<AffiliatePartner, "affiliate_status" | "affiliate_url" | "slug" | "official_website_url">): string {
  if (partner.affiliate_status === "approved" && partner.affiliate_url) {
    return `/go/${partner.slug}`;
  }
  return partner.official_website_url ?? "/resources";
}

export function isApproved(partner: Pick<AffiliatePartner, "affiliate_status" | "affiliate_url">): boolean {
  return partner.affiliate_status === "approved" && !!partner.affiliate_url;
}

export function getStatusLabel(status: AffiliatePartner["affiliate_status"]): string {
  const labels: Record<string, string> = {
    pending:  "Affiliate Partnership Pending",
    applied:  "Application Submitted",
    approved: "Partner Link Available",
    rejected: "Not Available",
    paused:   "Temporarily Paused",
  };
  return labels[status] ?? status;
}

export function getCategoryMeta(slug: string): { title: string; description: string; icon: string } {
  const map: Record<string, { title: string; description: string; icon: string }> = {
    "money-transfer": {
      title:       "Send Money Internationally",
      description: "Services that may help families send money from the USA to Laos.",
      icon:        "💸",
    },
    "phone-internet": {
      title:       "Stay Connected",
      description: "eSIM and data plans that may help you get online quickly after arrival.",
      icon:        "📱",
    },
    "vpn-privacy": {
      title:       "Protect Your Privacy",
      description: "VPN tools that may help secure your browsing on public WiFi.",
      icon:        "🔒",
    },
    "health-insurance": {
      title:       "Health Insurance",
      description: "International health insurance options for people living or traveling abroad.",
      icon:        "🏥",
    },
  };
  return map[slug] ?? { title: slug, description: "", icon: "📋" };
}
