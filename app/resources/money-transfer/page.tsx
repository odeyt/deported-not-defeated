import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateGrid from "@/components/AffiliateGrid";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export const metadata: Metadata = {
  title: "Money Transfer Services | Deported Not Defeated",
  description:
    "Compare international money transfer services that may help families send money from the USA to Laos. Wise, Remitly, WorldRemit, and more.",
  keywords: ["send money USA to Laos", "Wise Laos", "Remitly Laos", "international money transfer deportee"],
};

export default async function MoneyTransferPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("active", true)
    .order("priority", { ascending: false });

  const partners = ((data ?? []) as AffiliatePartner[]).filter(
    (p) => (p.affiliate_categories as any)?.slug === "money-transfer"
  );

  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> All Resources
          </Link>
          <div className="text-4xl mb-3">💸</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Send Money Internationally</h1>
          <p className="text-gray-300 text-lg">
            Services that may help families send money from the USA to Laos.
            Compare options and check current fees before deciding.
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
          <p className="font-bold text-lg mb-2">How does international money transfer work?</p>
          <p className="text-gray-300 text-sm mb-4">
            Read our full guide on how to receive money from the USA to Laos.
          </p>
          <Link href="/laos/receive-money-usa-to-laos" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors">
            Read the Money Transfer Guide →
          </Link>
        </div>
      </div>
    </>
  );
}
