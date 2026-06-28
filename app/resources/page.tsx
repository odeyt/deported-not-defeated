import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateCard from "@/components/AffiliateCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import { ArrowUpRight, Banknote, Wifi, ShieldCheck, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Recommended Services | Deported Not Defeated",
  description:
    "Trusted tools and services that may help you rebuild your life after deportation. Compare money transfer, eSIM, VPN, and health insurance options.",
  keywords: ["resources deportee", "money transfer Laos", "eSIM Laos", "VPN Laos", "health insurance expat"],
};

const SECTIONS = [
  { slug: "money-transfer",   label: "Send Money",           Icon: Banknote,    href: "/resources/money-transfer",   desc: "Wire transfers, remittance apps, and how to receive money from the USA." },
  { slug: "phone-internet",   label: "Stay Connected",        Icon: Wifi,        href: "/resources/phone-internet",   desc: "eSIM cards, local SIM plans, and affordable data options abroad." },
  { slug: "vpn-privacy",      label: "Protect Your Privacy",  Icon: ShieldCheck, href: "/resources/vpn-privacy",      desc: "VPN services to keep your browsing secure and private." },
  { slug: "health-insurance", label: "Health Insurance",      Icon: HeartPulse,  href: "/resources/health-insurance", desc: "International health coverage for people living outside the USA." },
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
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Resource Hub</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Recommended Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Trusted tools that may help you rebuild your life after deportation.
            Listed based on usefulness — always compare and check current terms.
          </p>
          {/* Category cards in hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {SECTIONS.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="group bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-xl p-4 text-center transition-all"
              >
                <s.Icon size={22} className={`mx-auto mb-2 group-hover:scale-110 transition-transform ${
                    s.slug === "money-transfer"   ? "text-emerald-400" :
                    s.slug === "phone-internet"   ? "text-blue-400" :
                    s.slug === "vpn-privacy"      ? "text-violet-400" :
                    s.slug === "health-insurance" ? "text-rose-400" :
                    "text-brand-red"
                  }`} />
                <p className="text-white text-xs font-semibold leading-tight">{s.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky category nav */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {SECTIONS.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-navy-800 transition-colors shrink-0"
              >
                <s.Icon size={14} className="text-brand-red" />
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 pb-8 space-y-16">
        {SECTIONS.map((s) => {
          const partners = byCategory(s.slug);
          if (!partners.length) return null;
          return (
            <section key={s.slug} id={s.slug}>
              <div className="flex items-start justify-between mb-6 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    s.slug === "money-transfer"   ? "bg-emerald-100 text-emerald-600" :
                    s.slug === "phone-internet"   ? "bg-blue-100 text-blue-600" :
                    s.slug === "vpn-privacy"      ? "bg-violet-100 text-violet-600" :
                    s.slug === "health-insurance" ? "bg-rose-100 text-rose-600" :
                    "bg-navy-800 text-brand-red"
                  }`}>
                    <s.Icon size={18} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-navy-800 leading-tight">{s.label}</h2>
                    <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <Link
                  href={s.href}
                  className="flex items-center gap-1 text-brand-red font-bold text-sm hover:underline shrink-0 mt-1"
                >
                  See all <ArrowUpRight size={14} />
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

      {/* Disclosure — bottom of page */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <AffiliateDisclosure />
      </div>
    </>
  );
}
