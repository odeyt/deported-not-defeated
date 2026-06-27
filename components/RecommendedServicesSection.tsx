import Link from "next/link";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateCard from "./AffiliateCard";
import AffiliateDisclosure from "./AffiliateDisclosure";

interface Props {
  partners: AffiliatePartner[];
}

export default function RecommendedServicesSection({ partners }: Props) {
  if (!partners.length) return null;

  return (
    <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">Recommended Resources</p>
            <h2 className="text-3xl font-extrabold text-navy-800">Services That May Help</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Tools and services others have found useful when rebuilding.
              Always compare options and check current terms.
            </p>
          </div>
          <Link
            href="/resources"
            className="text-brand-red font-bold text-sm hover:underline shrink-0"
          >
            See all resources →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {partners.slice(0, 4).map((p) => (
            <AffiliateCard key={p.id} partner={p} />
          ))}
        </div>

        <AffiliateDisclosure compact />
      </div>
    </section>
  );
}
