import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-navy-800 mb-6">Terms of Service</h1>
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 text-gray-600 leading-relaxed">
          <div><h2 className="font-bold text-navy-800 mb-2">Use of Information</h2><p>The information on this website is provided for general guidance only. It is not legal, medical, or financial advice. Always consult a qualified professional for your specific situation.</p></div>
          <div><h2 className="font-bold text-navy-800 mb-2">Directory Listings</h2><p>We do our best to verify directory listings, but we cannot guarantee accuracy. Please verify details directly with businesses before relying on them.</p></div>
          <div><h2 className="font-bold text-navy-800 mb-2">Affiliate Links</h2><p>Some links may be affiliate links. See our <a href="/affiliate-disclosure" className="text-brand-red hover:underline">Affiliate Disclosure</a> for details.</p></div>
          <div><h2 className="font-bold text-navy-800 mb-2">Changes</h2><p>We may update these terms at any time. Continued use of the site constitutes acceptance of any changes.</p></div>
        </div>
      </div>
    </section>
  );
}
