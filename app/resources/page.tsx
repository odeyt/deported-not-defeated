import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateCard from "@/components/AffiliateCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export const metadata: Metadata = {
  title: "Recommended Services | Deported Not Defeated",
  description:
    "Trusted tools and services that may help you rebuild your life after deportation. Compare money transfer, eSIM, VPN, and health insurance options.",
  keywords: ["resources deportee", "money transfer Laos", "eSIM Laos", "VPN Laos", "health insurance expat"],
};

const SECTIONS = [
  { slug: "money-transfer",   label: "Send Money",          icon: "💸", href: "/resources/money-transfer" },
  { slug: "phone-internet",   label: "Stay Connected",       icon: "📱", href: "/resources/phone-internet" },
  { slug: "vpn-privacy",      label: "Protect Your Privacy", icon: "🔒", href: "/resources/vpn-privacy" },
  { slug: "health-insurance", label: "Health Insurance",     icon: "🏥", href: "/resources/health-insurance" },
];

async function getPartnersByCategory(categorySlug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("affiliate_categories.slug", categorySlug)
    .eq("active", true)
    .order("priority", { ascending: false });
  return (data ?? []) as AffiliatePartner[];
}

async function getAllActivePartners() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("active", true)
    .order("priority", { ascending: false });
  return (data ?? []) as AffiliatePartner[];
}

export default async function ResourcesPage() {
  const all = await getAllActivePartners();

  const byCategory = (slug: string) =>
    all.filter((p) => (p.affiliate_categories as any)?.slug === slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Resource Hub</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Recommended Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Trusted tools that may help you rebuild your life after deportation.
            All options here are listed based on usefulness — always compare and check current terms.
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {SECTIONS.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-navy-800 transition-colors shrink-0"
              >
                <span>{s.icon}</span> {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <AffiliateDisclosure />
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-16">
        {SECTIONS.map((s) => {
          const partners = byCategory(s.slug);
          if (!partners.length) return null;
          return (
            <section key={s.slug} id={s.slug}>
              <div className="flex items-end justify-between mb-6 pt-8 border-t border-gray-100">
                <div>
                  <span className="text-3xl mr-3">{s.icon}</span>
                  <h2 className="inline text-2xl font-extrabold text-navy-800">{s.label}</h2>
                </div>
                <Link
                  href={s.href}
                  className="text-brand-red font-bold text-sm hover:underline shrink-0"
                >
                  See all →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {partners.slice(0, 3).map((p) => (
                  <AffiliateCard key={p.id} partner={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
