import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateGrid from "@/components/AffiliateGrid";

export const metadata: Metadata = {
  title: "Phone & Internet Services | Deported Not Defeated",
  description:
    "eSIM and data plan options that may help you get connected quickly after arrival in Laos. Compare Airalo, Holafly, and more.",
  keywords: ["eSIM Laos", "Airalo Laos", "Holafly Laos", "internet Laos deportee", "phone data plan Laos"],
};

export default async function PhoneInternetPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("active", true)
    .order("priority", { ascending: false });

  const partners = ((data ?? []) as AffiliatePartner[]).filter(
    (p) => (p.affiliate_categories as any)?.slug === "phone-internet"
  );

  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> All Resources
          </Link>
          <div className="text-4xl mb-3">📱</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Stay Connected</h1>
          <p className="text-gray-300 text-lg">
            eSIM and data plan services that may help you get online quickly after arrival.
            You can purchase and activate an eSIM before or after you land.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <AffiliateGrid partners={partners} />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-navy-800 rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Prefer a local SIM card?</p>
          <p className="text-gray-300 text-sm mb-4">
            Read our guide on how to buy a local SIM card in Laos and compare data plans.
          </p>
          <Link href="/laos/sim-card-laos" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
            Read the SIM Card Guide →
          </Link>
        </div>
      </div>
    </>
  );
}
