import type { Metadata } from "next";

export const metadata: Metadata = { title: "Affiliate Disclosure" };

export default function AffiliateDisclosurePage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-navy-800 mb-6">Affiliate Disclosure</h1>
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-4 text-gray-600 leading-relaxed">
          <p>Deported Not Defeated participates in affiliate programs. Some links on this website may be affiliate links, meaning we may earn a small commission if you click through and make a purchase or sign up for a service — at no extra cost to you.</p>
          <p>We only recommend products and services that we genuinely believe may help people rebuild their lives after deportation. Our editorial content is not influenced by affiliate relationships.</p>
          <p>These commissions help us keep this resource free and continue expanding it to more countries.</p>
          <p>If you have any questions about our affiliate relationships, please <a href="/contact" className="text-brand-red hover:underline">contact us</a>.</p>
        </div>
      </div>
    </section>
  );
}
