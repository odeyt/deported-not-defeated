import type { AffiliatePartner } from "@/lib/types";
import AffiliateCard from "./AffiliateCard";
import AffiliateDisclosure from "./AffiliateDisclosure";

interface Props {
  partners: AffiliatePartner[];
  showDisclosure?: boolean;
}

export default function AffiliateGrid({ partners, showDisclosure = true }: Props) {
  if (!partners.length) {
    return (
      <p className="text-center text-gray-500 py-12">
        No resources available yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((p) => (
          <AffiliateCard key={p.id} partner={p} />
        ))}
      </div>
      {showDisclosure && <AffiliateDisclosure />}
    </div>
  );
}
