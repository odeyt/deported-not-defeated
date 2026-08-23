import { ExternalLink } from "lucide-react";
import type { RankedProvider } from "@/lib/affiliate-engine/types";

export type CardTone = "light" | "dark";

interface Props {
  provider: RankedProvider;
  /** ISO country code passed through to the router for click attribution. */
  countryCode?: string | null;
  /** Human country name for the availability chip. Falls back to the code. */
  countryName?: string | null;
  /** Where on the site this card is rendered. Recorded with the click. */
  placement?: string;
  tone?: CardTone;
}

const TONE = {
  light: {
    card: "bg-white border-gray-200 hover:shadow-md",
    name: "text-navy-800",
    body: "text-gray-600",
    note: "text-gray-500",
    meta: "text-gray-500",
    cta: "bg-brand-red hover:bg-brand-red-dark text-white focus-visible:ring-brand-red",
  },
  dark: {
    card: "bg-navy-800 border-white/10 hover:border-white/25",
    name: "text-white",
    body: "text-gray-300",
    note: "text-gray-400",
    meta: "text-gray-400",
    cta: "bg-brand-red hover:bg-red-700 text-white focus-visible:ring-white",
  },
} as const;

/**
 * One provider in a recommendation set.
 *
 * LABEL HONESTY (M-AFFILIATE-1 §23)
 *   "Affiliate partner" appears only when an approved affiliate destination
 *   actually exists. There is no "Best", no "#1", no star rating, no fake
 *   discount, and no countdown. Nothing here is derived from commission.
 */
export default function ProviderRecommendationCard({
  provider,
  countryCode,
  countryName,
  placement = "recommendations",
  tone = "light",
}: Props) {
  const t = TONE[tone];

  const query = new URLSearchParams();
  if (countryCode) query.set("country", countryCode);
  if (placement) query.set("placement", placement);
  const queryString = query.toString();
  const href = `/go/${provider.slug}${queryString ? `?${queryString}` : ""}`;

  const availabilityLabel = countryCode
    ? `Available in ${countryName ?? countryCode}`
    : null;

  return (
    <div
      className={`border rounded-2xl p-5 flex flex-col gap-3 shadow-sm transition-all ${t.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={`font-bold text-base leading-tight ${t.name}`}>{provider.name}</h3>
        {provider.monetized && (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
            Affiliate partner
          </span>
        )}
      </div>

      {provider.description && (
        <p className={`text-sm leading-relaxed ${t.body}`}>{provider.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {availabilityLabel && (
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
            {availabilityLabel}
          </span>
        )}
        {provider.featured && (
          <span className="text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* availability_note is deliberately not rendered: it is operator context
          ("not yet verified with the provider"), shown in the admin screens
          rather than to visitors. */}

      <a
        href={href}
        rel="sponsored nofollow noopener"
        className={`mt-auto inline-flex items-center justify-center gap-2 text-sm font-bold px-4 py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${t.cta}`}
      >
        <ExternalLink size={14} aria-hidden="true" />
        {/* Accessible name states the provider explicitly, so a screen-reader
            user hearing links out of context knows where each one goes. */}
        <span>
          Visit {provider.name}
          <span className="sr-only">
            {provider.monetized ? " (affiliate link, opens provider site)" : " (opens provider site)"}
          </span>
        </span>
      </a>
    </div>
  );
}
