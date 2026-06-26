import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Help & Documents in Laos",
  description: "Visas, passports, lawyers, and embassy contacts for deportees rebuilding life in Laos.",
};

export default function LegalHelpPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">⚖️ Legal Help & Documents</h1>
          <p className="text-gray-300 text-lg">Know your rights. Understand your status. Get the documents you need.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              title: "Know Your Visa Status",
              body: "When you arrive in Laos, you may be given a 30-day visa on arrival or a specific returnee status. Visit immigration within the first week to understand your options. Overstaying carries heavy fines.",
            },
            {
              title: "Get a Valid Passport",
              body: "If your Lao passport was expired or you need a new one, visit the Department of Immigration or your nearest Lao government office. Bring any ID documents you have. Family members can help gather documents.",
            },
            {
              title: "Embassy Contacts",
              body: "If you are not a Lao citizen and were deported to Laos, contact your home country's embassy immediately. They can assist with emergency travel documents and repatriation.",
            },
            {
              title: "Find a Lawyer",
              body: "For complex legal situations — criminal records, custody issues, business setup — consult a qualified lawyer. Look for ones with English-language capability. Our directory has vetted options.",
            },
          ].map((s) => (
            <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-navy-800 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Emergency Legal Help</p>
            <p className="text-gray-600 text-sm mb-4">Search our directory for lawyers and legal aid organizations in Laos.</p>
            <Link href="/laos/directory" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">Find Lawyers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
