"use client";

import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/components/Analytics";
import { AffiliateLink } from "@/lib/types";

export default function AffiliateCard({ link }: { link: AffiliateLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("affiliate_click", { name: link.title, category: link.category })}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group block"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-navy-800 group-hover:text-brand-red transition-colors">
          {link.title}
          {link.featured && (
            <span className="ml-2 text-xs bg-brand-red text-white px-2 py-0.5 rounded-full font-normal">
              Top Pick
            </span>
          )}
        </h3>
        <ExternalLink size={14} className="text-gray-400 shrink-0 mt-1" />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">{link.description}</p>
      {link.disclosure_text && (
        <p className="text-gray-400 text-xs italic">{link.disclosure_text}</p>
      )}
    </a>
  );
}
