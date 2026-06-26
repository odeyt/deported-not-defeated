import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About Deported Not Defeated",
  description: "Our mission: help people deported from the USA rebuild their lives with dignity, direction, and support.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About This Project</h1>
          <p className="text-gray-300 text-lg">
            This is more than a website. It is a movement.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-brand-red text-white rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold mb-3">&ldquo;Deported, Not Defeated.&rdquo;</p>
            <p className="text-red-200">Your story is not over. Start again with dignity, direction, and support.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Deportation is one of the most disorienting experiences a person can face. You are removed from a place you called home, separated from family, and dropped into a country that may feel foreign — even if it is where you were born.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Deported Not Defeated exists to change that experience. We provide practical, honest, and human-centered resources to help people rebuild — starting with Laos, and expanding to other countries.
            </p>
            <p className="text-gray-600 leading-relaxed">
              No shame. No politics. Just practical help for real people starting over.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              {[
                "Country-specific survival guides, starting with Laos",
                "Searchable directory of verified local businesses and services",
                "Practical articles on housing, work, legal help, healthcare, and more",
                "Vetted affiliate tools for eSIM, money transfer, VPN, and insurance",
                "A newsletter with real resources, not noise",
                "A growing community of people who understand",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand-red font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Our Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Courage", desc: "It takes strength to start over.", pos: "0% 0%" },
                { title: "Faith", desc: "In yourself. In your future.", pos: "100% 0%" },
                { title: "Education", desc: "Knowledge opens every door.", pos: "0% 50%" },
                { title: "Opportunity", desc: "It exists. We help you find it.", pos: "100% 50%" },
                { title: "Success", desc: "On your own terms.", pos: "0% 100%" },
                { title: "Dignity", desc: "You deserve respect.", pos: "100% 100%" },
              ].map((v) => (
                <div key={v.title} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <div
                    className="w-full h-40"
                    style={{
                      backgroundImage: "url('/images/courage.png')",
                      backgroundSize: "200% 300%",
                      backgroundPosition: v.pos,
                    }}
                  />
                  <div className="p-4 bg-white text-center">
                    <p className="font-bold text-navy-800 text-sm">{v.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact" className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
