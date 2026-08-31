import { evaluateFreshness, type VerificationState } from "@/lib/affiliate/freshness";

const STYLES: Record<VerificationState, string> = {
  VERIFIED_CURRENT: "bg-emerald-50 text-emerald-800 border-emerald-200",
  VERIFIED_STALE: "bg-amber-50 text-amber-800 border-amber-200",
  UNVERIFIED: "bg-gray-100 text-gray-500 border-gray-200",
};

const SHORT_LABEL: Record<VerificationState, string> = {
  VERIFIED_CURRENT: "Fresh",
  VERIFIED_STALE: "Stale",
  UNVERIFIED: "Unverified",
};

interface Props {
  verifiedAt: string | null;
  category: string | null;
  /** Show the full reader-facing label instead of the compact admin one. */
  full?: boolean;
}

/**
 * Renders `evaluateFreshness()`'s result as a colored pill. Used on both
 * ProviderCountriesEditor.tsx and the verification page — the only two
 * places in the admin section that display a freshness state, which is
 * the bar this codebase uses before extracting a shared component
 * (see app/admin/articles/ArticleFormFields.tsx's own doc comment).
 */
export default function FreshnessBadge({ verifiedAt, category, full = false }: Props) {
  const result = evaluateFreshness(verifiedAt, category);

  return (
    <span
      title={result.label}
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${STYLES[result.state]}`}
    >
      {full ? result.label : SHORT_LABEL[result.state]}
      {result.ageDays !== null && ` · ${result.ageDays}d`}
    </span>
  );
}
