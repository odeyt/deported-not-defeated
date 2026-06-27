import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AffiliateLink } from "@/lib/types";
import NewsletterForm from "@/components/NewsletterForm";
import AffiliateCard from "@/components/AffiliateCard";

export const metadata: Metadata = {
  title: "Resources & Recommended Tools for Laos",
  description: "Vetted tools and resources for deportees rebuilding life in Laos — eSIM, VPN, money transfer, insurance, and more.",
};

export default async function ResourcesPage() {
  let links: AffiliateLink[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("affiliate_links")
      .select("*")
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("category");
    links = data ?? [];
  } catch {
    // Supabase unavailable — render page with empty links
  }

  const grouped = links.reduce<Record<string, AffiliateLink[]>>((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">📚 Resources & Tools</h1>
          <p className="text-gray-300 text-lg">Vetted tools to help you rebuild. eSIM, VPN, money transfer, insurance, and more.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Affiliate disclosure */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-10 text-sm text-yellow-800">
            <strong>Affiliate Disclosure:</strong> Some links below may be affiliate links. We may earn a commission at no extra cost to you. We only recommend tools that may genuinely help people rebuild their lives.
          </div>

          {Object.keys(grouped).length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">Resources coming soon.</p>
              <p className="text-sm mt-2">Subscribe below to get notified.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-navy-800 mb-5">{category}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((link) => (
                      <AffiliateCard key={link.id} link={link} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
