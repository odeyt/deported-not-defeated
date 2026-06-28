"use client";

import { ExternalLink } from "lucide-react";

interface CareerAffiliateCardProps {
  name: string;
  category: string;
  description: string;
  bestFor: string;
  price: string;
  hasCertificate: boolean;
  hasFree: boolean;
  // TODO: Replace href with real affiliate link when approved
  href?: string;
  ctaLabel?: string;
  sponsored?: boolean;
  gradient: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

export default function CareerAffiliateCard({
  name,
  category,
  description,
  bestFor,
  price,
  hasCertificate,
  hasFree,
  href = "#affiliate-placeholder",
  ctaLabel = "Start Learning Today",
  sponsored = false,
  gradient,
  iconBg,
  iconColor,
  icon,
}: CareerAffiliateCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        {sponsored && (
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full self-start">
            Sponsored / Affiliate Partner
          </span>
        )}
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            <span className={iconColor}>{icon}</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy-800 text-base leading-tight group-hover:text-brand-red transition-colors">
              {name}
            </h3>
            <span className={`inline-block text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mt-1 ${iconBg} ${iconColor}`}>
              {category}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">Best For</p>
          <p className="text-gray-700 text-sm">{bestFor}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2 py-0.5">{price}</span>
          {hasFree && <span className="text-xs bg-green-50 text-green-700 border border-green-100 rounded-full px-2 py-0.5">Free Courses</span>}
          {hasCertificate && <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-2 py-0.5">Certificate</span>}
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100">
          {/* TODO: Replace href="#affiliate-placeholder" with real affiliate URL */}
          <a
            href={href}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
          >
            {ctaLabel} <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
