import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateGrid from "@/components/AffiliateGrid";

export const metadata: Metadata = {
  title: "International Health Insurance | Deported Not Defeated",
  description:
    "Health insurance options that may help cover medical costs while living in Laos. Compare SafetyWing, Genki, and more.",
  keywords: ["health insurance Laos", "expat insurance Laos", "SafetyWing Laos", "international health insurance deportee"],
};

export default async function HealthInsurancePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("active", true)
    .order("priority", { ascending: false });

  const partners = ((data ?? []) as AffiliatePartner[]).filter(
    (p) => (p.affiliate_categories as any)?.slug === "health-insurance"
  );

  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> All Resources
          </Link>
          <div className="text-4xl mb-3">🏥</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Health Insurance Options</h1>
          <p className="text-gray-300 text-lg">
            International health insurance that may help cover medical costs while living in Laos.
            Always read the full policy terms and compare plans carefully before deciding.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-800">
          <strong>Important:</strong> We are not insurance advisors. The options below are listed for informational
          purposes only. Coverage, eligibility, and terms vary. Always read the full policy and consult with a
          qualified advisor before purchasing health insurance.
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <AffiliateGrid partners={partners} />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-navy-800 rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Need a hospital in Vientiane?</p>
          <p className="text-gray-300 text-sm mb-4">Browse our guide to the best hospitals and clinics in Vientiane.</p>
          <Link href="/laos/hospitals-vientiane" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
            View Hospitals Guide →
          </Link>
        </div>
      </div>
    </>
  );
}
