import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Scale, ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Legal Help & Documents in Laos",
  description: "Visas, passports, lawyers, and embassy contacts for deportees rebuilding life in Laos.",
};

export default function LegalHelpPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Laos Guide
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
              <Scale size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Legal Help & Documents</h1>
            <p className="text-gray-300 text-lg">Know your rights. Understand your status. Get the documents you need.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-brand-red text-white rounded-2xl p-6 text-center">
            <p className="font-bold text-lg">Your legal status is your foundation.</p>
            <p className="text-red-200 text-sm mt-1">Do not ignore visa or document issues — they get harder to fix the longer you wait.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Step 1 — Understand Your Visa Status</h2>
            <p className="text-gray-600 mb-4">When you arrive in Laos after deportation, you may be given a 30-day visa on arrival or a specific returnee status. Visit the immigration office within the first week.</p>
            <ul className="space-y-2">
              {[
                "Lao citizens — contact the Department of Immigration to confirm residency rights",
                "Non-Lao nationals — contact your home country embassy immediately",
                "Overstaying your visa carries heavy fines — act quickly",
                "Extension options may be available — consult an immigration lawyer",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Getting a Valid Passport or ID</h2>
            <p className="text-gray-600 mb-4">If your passport is expired or you do not have ID, this is urgent. You cannot open a bank account, rent properly, or work legally without ID.</p>
            <ul className="space-y-2">
              {[
                "Visit the Department of Immigration, Vientiane (Lane Xang Avenue)",
                "Bring any ID documents you have — birth certificate, old passport, family records",
                "Family members in Laos can help gather supporting documents",
                "Processing time: typically 2–6 weeks for a new Lao passport",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Embassy Contacts in Vientiane</h2>
            <p className="text-gray-600 mb-4">If you are not a Lao citizen or need help as a US person, your embassy is a key resource.</p>
            <div className="space-y-3">
              {[
                ["US Embassy Vientiane", "Thadeua Road, Km 9", "+856 21 487000"],
                ["Lao Department of Immigration", "Ministry of Public Security, Vientiane", "+856 21 212520"],
                ["Lao Red Cross", "Vientiane", "+856 21 252239"],
              ].map(([name, address, phone]) => (
                <div key={name} className="bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold text-navy-800">{name}</p>
                  <p className="text-gray-500 text-sm">{address}</p>
                  <a href={`tel:${phone}`} className="text-brand-red text-sm font-medium hover:underline">{phone}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">When You Need a Lawyer</h2>
            <p className="text-gray-600 mb-4">For complex situations, a qualified lawyer can save you significant time and money.</p>
            <ul className="space-y-2">
              {[
                "Immigration status or visa appeals",
                "Business registration and permits",
                "Criminal record issues from the USA",
                "Family law — custody, marriage, inheritance",
                "Document legalization and translation",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-3">DFDL Legal and Tax is the most established international firm in Laos. The National Legal Aid Center (NLAC) offers free services for those who cannot afford a lawyer.</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Lawyers & Legal Aid in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Verified lawyers, legal aid centers, and embassy contacts in Laos.</p>
            <Link href="/laos/directory?category=Lawyers+%2F+Legal+Help" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">
              Find Legal Help →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
