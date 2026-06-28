interface TravelProviderCardProps {
  name: string;
  category: string;
  description: string;
  bestFor: string;
  priceLevel: "Budget" | "Mid-range" | "Premium" | "Varies" | "Free";
  href?: string;
  ctaLabel?: string;
  gradient: string;
  icon: string;
  sponsored?: boolean;
}

const PRICE_COLORS: Record<string, string> = {
  Budget: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Mid-range": "bg-blue-50 text-blue-700 border-blue-100",
  Premium: "bg-purple-50 text-purple-700 border-purple-100",
  Varies: "bg-gray-50 text-gray-700 border-gray-200",
  Free: "bg-teal-50 text-teal-700 border-teal-100",
};

export default function TravelProviderCard({
  name,
  category,
  description,
  bestFor,
  priceLevel,
  href = "#affiliate-placeholder",
  ctaLabel = "Learn More",
  gradient,
  icon,
  sponsored = false,
}: TravelProviderCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Sponsored badge */}
        {sponsored && (
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full self-start">
            Sponsored / Affiliate Partner
          </span>
        )}

        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-2xl">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy-800 text-base leading-tight group-hover:text-brand-red transition-colors">
              {name}
            </h3>
            <span className="text-xs text-gray-500 font-medium">{category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

        {/* Best For */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Best For</p>
          <p className="text-gray-700 text-sm leading-snug">{bestFor}</p>
        </div>

        {/* Price level badge */}
        <div>
          <span className={`inline-block text-xs font-semibold border px-2.5 py-0.5 rounded-full ${PRICE_COLORS[priceLevel]}`}>
            {priceLevel}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          {/* TODO: Replace href="#affiliate-placeholder" with real affiliate URL + tracking parameters */}
          <a
            href={href}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors w-full"
          >
            {ctaLabel} →
          </a>
        </div>
      </div>
    </div>
  );
}
