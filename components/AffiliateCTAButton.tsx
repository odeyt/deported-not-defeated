"use client";

import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import type { AffiliatePartner } from "@/lib/types";
import { getEffectiveUrl, isApproved } from "@/lib/affiliate";

interface Props {
  partner: Pick<
    AffiliatePartner,
    "slug" | "company_name" | "cta_label" | "affiliate_status" | "affiliate_url" | "official_website_url"
  >;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClass = {
  sm:  "px-4 py-2 text-sm",
  md:  "px-5 py-2.5 text-sm",
  lg:  "px-7 py-3.5 text-base",
};

export default function AffiliateCTAButton({ partner, className = "", size = "md" }: Props) {
  const approved = isApproved(partner);
  const href = getEffectiveUrl(partner);
  const label = approved ? partner.cta_label : "Visit Official Website";

  function handleClick() {
    trackEvent("affiliate_cta_click", {
      partner: partner.slug,
      company: partner.company_name,
      status:  partner.affiliate_status,
    });
  }

  return (
    <Link
      href={href}
      target={approved ? "_self" : "_blank"}
      rel={approved ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className={`inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-xl transition-colors ${sizeClass[size]} ${className}`}
    >
      {label} →
    </Link>
  );
}
