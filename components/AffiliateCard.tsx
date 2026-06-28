import Link from "next/link";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateCTAButton from "./AffiliateCTAButton";
import { Banknote, Wifi, ShieldCheck, HeartPulse, Globe2 } from "lucide-react";

interface Props {
  partner: AffiliatePartner;
  showFullDetail?: boolean;
}

// Per-category color scheme: [gradient top bar, icon bg, icon color, badge bg, badge text]
const CATEGORY_THEME: Record<string, { bar: string; iconBg: string; iconColor: string; badgeBg: string; badgeText: string; Icon: React.ElementType }> = {
  "money-transfer": {
    bar: "from-emerald-400 to-teal-600",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    Icon: Banknote,
  },
  "phone-internet": {
    bar: "from-blue-400 to-indigo-600",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    Icon: Wifi,
  },
  "vpn-privacy": {
    bar: "from-violet-400 to-purple-600",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    Icon: ShieldCheck,
  },
  "health-insurance": {
    bar: "from-rose-400 to-red-600",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    Icon: HeartPulse,
  },
};

const DEFAULT_THEME = {
  bar: "from-gray-400 to-gray-600",
  iconBg: "bg-gray-50",
  iconColor: "text-gray-600",
  badgeBg: "bg-gray-50",
  badgeText: "text-gray-700",
  Icon: Globe2,
};

export default function AffiliateCard({ partner, showFullDetail = false }: Props) {
  const categorySlug = (partner.affiliate_categories as any)?.slug ?? "";
  const theme = CATEGORY_THEME[categorySlug] ?? DEFAULT_THEME;
  const { Icon } = theme;

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Gradient accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.bar}`} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* Colored icon */}
          <div className={`w-11 h-11 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
            <Icon size={20} className={theme.iconColor} />
          </div>
          <div className="min-w-0">
            <Link href={`/resources/${partner.slug}`} className="hover:underline">
              <h3 className="font-bold text-navy-800 text-lg leading-tight group-hover:text-brand-red transition-colors">
                {partner.company_name}
              </h3>
            </Link>
            {partner.affiliate_categories && (
              <span className={`inline-block text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mt-1 ${theme.badgeBg} ${theme.badgeText}`}>
                {partner.affiliate_categories.name}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {showFullDetail && partner.full_description
            ? partner.full_description
            : partner.short_description}
        </p>

        {/* Why it fits */}
        {partner.why_it_fits && (
          <div className={`rounded-xl p-3 border ${theme.badgeBg} border-opacity-60`} style={{ borderColor: "currentColor" }}>
            <p className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${theme.badgeText}`}>Why it may help</p>
            <p className="text-gray-600 text-sm">{partner.why_it_fits}</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <AffiliateCTAButton partner={partner} size="sm" />
          <Link
            href={`/resources/${partner.slug}`}
            className="text-gray-500 hover:text-brand-red text-xs font-semibold transition-colors whitespace-nowrap"
          >
            Full Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
