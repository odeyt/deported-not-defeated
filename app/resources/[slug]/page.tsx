import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { AffiliatePartner } from "@/lib/types";
import AffiliateCTAButton from "@/components/AffiliateCTAButton";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import NewsletterForm from "@/components/NewsletterForm";

interface Props {
  params: { slug: string };
}

async function getPartner(slug: string): Promise<AffiliatePartner | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_partners")
    .select("*, affiliate_categories(id, name, slug)")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  return data as AffiliatePartner | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const partner = await getPartner(params.slug);
  if (!partner) return { title: "Not Found" };
  const catName = (partner.affiliate_categories as any)?.name ?? "Resource";
  return {
    title: `${partner.company_name} ${catName} Guide | Deported Not Defeated`,
    description:
      `Learn how ${partner.company_name} may help with ${catName.toLowerCase()} for people rebuilding life after deportation.`,
    keywords: [partner.company_name, catName, "Laos", "deportee", "rebuild"],
  };
}

export default async function PartnerPage({ params }: Props) {
  const partner = await getPartner(params.slug);
  if (!partner) notFound();

  const cat = partner.affiliate_categories as any;
  const catSlug = cat?.slug ?? "resources";
  const catName = cat?.name ?? "Resources";
  const isApproved = partner.affiliate_status === "approved" && !!partner.affiliate_url;

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
            <span className="text-gray-600">/</span>
            <Link href={`/resources/${catSlug}`} className="text-gray-400 hover:text-white transition-colors">{catName}</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">{partner.company_name}</span>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-extrabold">{partner.company_name}</h1>
          </div>
          {partner.short_description && (
            <p className="text-gray-300 text-lg mt-3">{partner.short_description}</p>
          )}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">


          {/* Full description */}
          {(partner.full_description || partner.short_description) && (
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-3">About {partner.company_name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {partner.full_description ?? partner.short_description}
              </p>
            </div>
          )}

          {/* Why it may help */}
          {partner.why_it_fits && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-navy-800 mb-2">Why It May Help</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{partner.why_it_fits}</p>
            </div>
          )}


          {/* CTA */}
          <div className="bg-navy-800 rounded-2xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">
              {isApproved ? `Visit ${partner.company_name}` : `View ${partner.company_name} Official Website`}
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Compare options and check current terms before deciding.
            </p>
            <AffiliateCTAButton partner={partner} size="lg" />
            {!isApproved && partner.official_website_url && (
              <p className="text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                <ExternalLink size={10} /> Opens official website in a new tab
              </p>
            )}
          </div>

          {/* Country focus */}
          {partner.country_focus && (
            <p className="text-gray-400 text-sm text-center">
              Coverage / focus: {partner.country_focus}
            </p>
          )}

          {/* Disclosure */}
          {partner.show_disclosure && <AffiliateDisclosure />}

          {/* Back links */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/resources/${catSlug}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-800 transition-colors"
            >
              <ArrowLeft size={14} /> Back to {catName}
            </Link>
            <Link href="/resources" className="text-sm text-gray-600 hover:text-navy-800 transition-colors">
              All Resources →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
