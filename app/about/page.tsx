import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { ExternalLink } from "lucide-react";

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
              Deported Not Defeated exists to change that experience. We provide practical, honest, and human-centered resources to help people rebuild — across Laos, Cambodia, Vietnam, Philippines, Mexico, El Salvador, Guatemala, and growing.
            </p>
            <p className="text-gray-600 leading-relaxed">
              No shame. No politics. Just practical help for real people starting over.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              {[
                "Country-specific survival guides for Laos, Cambodia, Vietnam, Philippines, Mexico, El Salvador, and Guatemala",
                "Step-by-step first 30 days checklists tailored to each country",
                "Practical guides on housing, work, legal help, healthcare, banking, and more",
                "Vetted tools for eSIM, money transfer, VPN, and international health insurance",
                "A free downloadable restart checklist you can save to your phone",
                "A newsletter with real resources, not noise",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand-red font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why This Project Exists */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-navy-800">Why This Project Exists</h2>

            <p className="text-gray-600 leading-relaxed">
              Every year, hundreds of thousands of people are removed from the United States and returned to countries around the world. In fiscal year 2024 alone, U.S. Immigration and Customs Enforcement (ICE) deported more than{" "}
              <strong>271,000 people</strong> to <strong>192 different countries</strong> — the highest annual total in nearly a decade.{" "}
              <a href="https://www.axios.com/2024/12/20/deportations-immigration-record-2024-ice" target="_blank" rel="noopener noreferrer" className="text-brand-red underline inline-flex items-center gap-0.5">Axios<ExternalLink size={11} /></a>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Following changes in U.S. immigration enforcement beginning in 2025, deportation activity increased further. ICE reported removing{" "}
              <strong>more than 442,000 people during fiscal year 2025</strong>, and government officials have stated that enforcement efforts are expected to continue at a high level.{" "}
              <a href="https://www.axios.com/2026/04/15/ice-deportations-us-immigration-trump-biden-2025" target="_blank" rel="noopener noreferrer" className="text-brand-red underline inline-flex items-center gap-0.5">Axios<ExternalLink size={11} /></a>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Many of those returned arrive with little preparation. Some left their birth country as children and return decades later. Others have no family, no job, limited financial resources, and may not speak the local language fluently. For many, deportation means starting life over from the beginning.
            </p>

            <div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Why People Are Deported</h3>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Overstaying a visa.",
                  "Entering the country without authorization.",
                  "Violating immigration laws or court orders.",
                  "Certain criminal convictions.",
                  "Denial of asylum or other immigration applications.",
                  "Expiration or loss of lawful immigration status.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-3 italic">Every immigration case is different, and deportation does not necessarily mean someone committed a serious crime.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-800 mb-3">Why This Website Matters</h3>
              <p className="text-gray-600 mb-3">Being deported often creates immediate challenges:</p>
              <ul className="space-y-2 text-gray-600 mb-4">
                {[
                  "Finding a safe place to live.",
                  "Getting identification documents.",
                  "Finding employment.",
                  "Opening a bank account.",
                  "Accessing healthcare.",
                  "Understanding local laws and customs.",
                  "Reconnecting with family.",
                  "Coping with stress and rebuilding confidence.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Many deportees struggle because reliable information is scattered across many websites — or not available at all.{" "}
                <strong>Deported Not Defeated</strong> was created to bring practical resources together in one place.
              </p>
            </div>

            <div>
              <p className="text-gray-600 font-semibold mb-2">Our mission is simple:</p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Help people rebuild their lives.",
                  "Connect them with trustworthy resources.",
                  "Provide country-specific guidance.",
                  "Share job opportunities and support services.",
                  "Offer financial, legal, and educational information.",
                  "Remind every visitor that deportation is not the end of their story.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-red font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 leading-relaxed">
              We believe everyone deserves the opportunity to rebuild with dignity, regardless of how they arrived back in their home country.
            </p>
          </div>

          {/* Key Facts */}
          <div className="bg-navy-800 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Key Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { stat: "271,484+", label: "people deported by ICE during U.S. fiscal year 2024", source: "https://www.axios.com/2024/12/20/deportations-immigration-record-2024-ice" },
                { stat: "442,000+", label: "people removed during fiscal year 2025 per ICE reporting", source: "https://www.axios.com/2026/04/15/ice-deportations-us-immigration-trump-biden-2025" },
                { stat: "190+",     label: "countries deportees were returned to worldwide", source: "https://www.axios.com/2024/12/20/deportations-immigration-record-2024-ice" },
                { stat: "1",        label: "platform dedicated to helping them rebuild — this one", source: null },
              ].map((f) => (
                <div key={f.stat} className="bg-white/10 rounded-xl p-5">
                  <p className="text-3xl font-extrabold text-brand-red mb-1">{f.stat}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{f.label}</p>
                  {f.source && (
                    <a href={f.source} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 underline mt-1 inline-flex items-center gap-0.5 hover:text-white">
                      Source <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Closing quote */}
          <div className="bg-brand-red text-white rounded-2xl p-8 text-center">
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              &ldquo;A deportation may change where you live — but it does not define who you are. This project exists to help people rebuild, reconnect, and move forward with hope.&rdquo;
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Our Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "Courage",     desc: "It takes strength to start over.",      href: "/laos/first-30-days",                img: "/images/value-courage.jpg" },
                { title: "Faith",       desc: "In yourself. In your future.",          href: "/about",                             img: "/images/value-faith.jpg" },
                { title: "Education",   desc: "Knowledge opens every door.",           href: "/resources",                         img: "/images/value-education.jpg" },
                { title: "Opportunity", desc: "It exists. We help you find it.",       href: "/resources",                         img: "/images/value-opportunity.jpg" },
                { title: "Success",     desc: "On your own terms.",                    href: "/laos/start-over-after-deportation", img: "/images/value-success.jpg" },
                { title: "Dignity",     desc: "You deserve respect.",                  href: "/contact",                           img: "/images/value-dignity.jpg" },
              ].map((v) => (
                <Link key={v.title} href={v.href} className="group rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow block overflow-hidden">
                  <div
                    className="w-full h-44 bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${v.img}')` }}
                  />
                  <div className="px-4 py-3 bg-white text-center">
                    <p className="font-bold text-navy-800 text-sm group-hover:text-brand-red transition-colors">{v.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{v.desc}</p>
                  </div>
                </Link>
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
