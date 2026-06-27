import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateGrid from "@/components/AffiliateGrid";

export const metadata: Metadata = {
  title: "VPN & Privacy Tools | Deported Not Defeated",
  description:
    "VPN options that may help protect your privacy online in Laos. Secure browsing, public WiFi protection, and safe online banking.",
  keywords: ["VPN Laos", "NordVPN Laos", "online privacy Laos", "secure internet Laos", "VPN deportee"],
};

export default async function VpnPrivacyPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("active", true)
    .order("priority", { ascending: false });

  const partners = ((data ?? []) as AffiliatePartner[]).filter(
    (p) => (p.affiliate_categories as any)?.slug === "vpn-privacy"
  );

  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> All Resources
          </Link>
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Protect Your Privacy</h1>
          <p className="text-gray-300 text-lg">
            VPN tools that may help keep your browsing private — especially on hotel WiFi, café networks,
            and when doing online banking from a new country.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          <strong>Why consider a VPN?</strong> Public WiFi in guesthouses, cafés, and airports can expose your
          passwords and banking details. A VPN may encrypt your connection. Always do your own research and
          read the terms of any service before purchasing.
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <AffiliateGrid partners={partners} />
        </div>
      </section>
    </>
  );
}
