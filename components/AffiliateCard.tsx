import Link from "next/link";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateStatusBadge from "./AffiliateStatusBadge";
import AffiliateCTAButton from "./AffiliateCTAButton";

interface Props {
  partner: AffiliatePartner;
  showFullDetail?: boolean;
}

export default function AffiliateCard({ partner, showFullDetail = false }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/resources/${partner.slug}`} className="hover:underline">
            <h3 className="font-bold text-navy-800 text-xl">{partner.company_name}</h3>
          </Link>
          {partner.affiliate_categories && (
            <p className="text-gray-400 text-xs mt-0.5 uppercase tracking-wide">
              {partner.affiliate_categories.name}
            </p>
          )}
        </div>
        <AffiliateStatusBadge status={partner.affiliate_status} />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {showFullDetail && partner.full_description
          ? partner.full_description
          : partner.short_description}
      </p>

      {/* Why it fits */}
      {partner.why_it_fits && (
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p className="text-xs font-semibold text-navy-800 mb-0.5 uppercase tracking-wide">Why it may help</p>
          <p className="text-gray-600 text-sm">{partner.why_it_fits}</p>
        </div>
      )}

      {/* Status note */}
      {partner.affiliate_status !== "approved" && (
        <p className="text-yellow-700 text-xs bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
          Affiliate partnership pending. This guide is informational only. No commission is earned from this link.
        </p>
      )}

      {/* CTA */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
        <AffiliateCTAButton partner={partner} size="sm" />
        <Link
          href={`/resources/${partner.slug}`}
          className="text-navy-800 hover:text-brand-red text-xs font-medium transition-colors"
        >
          Full Guide →
        </Link>
      </div>
    </div>
  );
}
