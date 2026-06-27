import type { AffiliateStatus } from "@/lib/types";

const config: Record<AffiliateStatus, { label: string; className: string }> = {
  pending:  { label: "Affiliate Pending",   className: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
  applied:  { label: "Application Sent",    className: "bg-blue-100 text-blue-800 border border-blue-200" },
  approved: { label: "Partner Link Active", className: "bg-green-100 text-green-800 border border-green-200" },
  rejected: { label: "Not Available",       className: "bg-gray-100 text-gray-600 border border-gray-200" },
  paused:   { label: "Paused",              className: "bg-orange-100 text-orange-700 border border-orange-200" },
};

export default function AffiliateStatusBadge({ status }: { status: AffiliateStatus }) {
  const { label, className } = config[status] ?? config.pending;
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      {label}
    </span>
  );
}
