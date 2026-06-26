import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-navy-800 mb-6">Privacy Policy</h1>
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 text-gray-600 leading-relaxed">
          <div><h2 className="font-bold text-navy-800 mb-2">What We Collect</h2><p>When you subscribe to our newsletter or submit a contact form, we collect your name (optional) and email address. We do not sell or share your information with third parties for marketing purposes.</p></div>
          <div><h2 className="font-bold text-navy-800 mb-2">How We Use It</h2><p>Your email is used to send you the resources you requested and occasional updates about new guides and tools. You can unsubscribe at any time.</p></div>
          <div><h2 className="font-bold text-navy-800 mb-2">Cookies</h2><p>We use minimal cookies for site functionality. We do not use tracking cookies for advertising.</p></div>
          <div><h2 className="font-bold text-navy-800 mb-2">Contact</h2><p>Questions? <a href="/contact" className="text-brand-red hover:underline">Contact us</a>.</p></div>
        </div>
      </div>
    </section>
  );
}
