import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Briefcase, ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Find Work in Laos After Deportation",
  description: "Jobs, freelance work, and small business ideas for people rebuilding life in Laos.",
};

export default function JobsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Laos Guide
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
              <Briefcase size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Work in Laos</h1>
            <p className="text-gray-300 text-lg">Income gives you options. Here is how to start earning.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-brand-red text-white rounded-2xl p-6 text-center">
            <p className="font-bold text-lg">Your English is an asset in Laos.</p>
            <p className="text-red-200 text-sm mt-1">Most returnees speak fluent English. That opens doors most locals do not have.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Quick Income — Start This Week</h2>
            <div className="space-y-4">
              {[
                ["English Tutoring", "Teach English to locals or businesses. $5–15/hour. No degree required to start. Post flyers near schools and markets."],
                ["Motorbike Taxi / Delivery", "Food delivery apps and motorbike taxi services. Start earning day one with your own bike."],
                ["Translation Work", "English-Lao translation for businesses, tourists, or NGOs. High demand in Vientiane."],
                ["Market Sales", "Sell food, goods, or handicrafts at local markets. Low startup cost."],
                ["Day Labor", "Construction, farming, or warehouse work. Show up early at job sites."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy-800">{title}</p>
                    <p className="text-gray-600 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Longer-Term Career Options</h2>
            <div className="space-y-4">
              {[
                ["NGO / Nonprofit Work", "Many international NGOs in Laos hire English-speaking staff. Check reliefweb.int and NGO job boards."],
                ["Tourism Industry", "Hotels, tour operators, and guesthouses actively hire English speakers as guides, receptionists, and managers."],
                ["Online Freelancing", "Upwork, Fiverr, Toptal — design, writing, virtual assistant, data entry. Work from anywhere in Laos."],
                ["Small Business", "Open a food stall, repair shop, translation service, or export business. Many returnees succeed this way."],
                ["Language School Teaching", "Schools like Lao-American College actively recruit fluent English speakers. Salary + benefits possible."],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy-800">{title}</p>
                    <p className="text-gray-600 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Work Permit Note</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Foreign nationals working in Laos technically need a work permit. If you are a Lao citizen returning, this does not apply. If you are not a Lao citizen, consult a lawyer about your options. Many returnees work informally at first while sorting their legal status.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Jobs in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Browse verified employers, language schools, and NGOs hiring in Laos.</p>
            <Link href="/laos/directory?category=Jobs" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">
              Search Job Listings →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
