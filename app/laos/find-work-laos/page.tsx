import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in Laos After Deportation",
  description: "Real job options for deportees in Laos. English teaching, freelance work, local jobs, and how to start a small business with limited capital.",
  keywords: ["find work Laos", "jobs Laos deportee", "English teaching Laos", "freelance Laos", "work permit Laos foreigner"],
};

export default function FindWorkLaosPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Laos Guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-600 p-2 rounded-lg"><Briefcase size={20} className="text-white" /></div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs">Work Guide</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">How to Find Work in Laos After Deportation</h1>
          <p className="text-gray-300 text-lg">Income is possible — even without connections. Here are the most realistic paths to earning money in Laos.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="font-bold text-blue-800 mb-1">Be honest about your situation.</p>
            <p className="text-blue-700 text-sm">Most employers in Laos do not ask about deportation history. What matters is your skills, your reliability, and whether you show up. Focus on what you can offer.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-5">Best Job Options for Returnees</h2>
            <div className="space-y-4">
              {[
                { title: "English Teacher", pay: "$500–1,200/month", timeline: "2–4 weeks to start", desc: "Highest-paying option if you speak English fluently. Private schools, language centers, and tutoring agencies actively hire. A TEFL certificate helps but is not always required.", action: "Search 'English teacher Vientiane' on Facebook Jobs" },
                { title: "Hotel / Guesthouse Staff", pay: "$150–400/month", timeline: "1–2 weeks", desc: "Front desk, cleaning, kitchen, or maintenance roles. Hotels that serve foreign tourists often want staff who speak English. Housing sometimes included.", action: "Walk in to hotels near the Mekong and ask in person" },
                { title: "Restaurant Worker", pay: "$100–300/month", timeline: "Days to 1 week", desc: "Quickest job to get. Tips in tourist restaurants can significantly boost base pay. Look for restaurants near Nam Phu fountain and the Mekong riverside.", action: "Walk in during off-peak hours (2–4pm) and ask to speak to the manager" },
                { title: "Freelance / Online Work", pay: "$300–2,000+/month", timeline: "Varies", desc: "If you have skills in writing, design, coding, customer service, or virtual assistance — you can work remotely for US or international clients while living cheaply in Laos.", action: "Register on Upwork, Fiverr, or Toptal" },
                { title: "Translator / Interpreter", pay: "$10–30/hour", timeline: "1–2 weeks", desc: "If you speak Lao and English, NGOs, embassies, and tour companies pay well for translation work. Part-time and freelance projects are common.", action: "Contact NGOs and the US Embassy directly" },
                { title: "Small Business / Street Vendor", pay: "Varies", timeline: "1 week setup", desc: "Selling food, goods, or services at local markets requires minimal capital. Many returnees start here and grow over time.", action: "Visit Talat Sao and Talat Khua Din markets" },
              ].map((j) => (
                <div key={j.title} className="border border-gray-200 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-navy-800 text-lg">{j.title}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold shrink-0 ml-2">{j.pay}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{j.desc}</p>
                  <div className="flex gap-3 text-xs flex-wrap">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"><strong>Start time:</strong> {j.timeline}</span>
                    <span className="bg-navy-800 text-white px-2 py-1 rounded-lg">{j.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Work Permit — Do You Need One?</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-800">
              <p className="font-bold mb-2">If you are a Lao citizen:</p>
              <p>No work permit needed. You have the right to work anywhere in Laos.</p>
              <p className="font-bold mt-3 mb-2">If you are not a Lao citizen:</p>
              <p>You technically need a work permit for formal employment. Talk to a lawyer about your status. Many short-term jobs and freelance work operate informally.</p>
            </div>
          </div>

          <div className="bg-navy-800 rounded-2xl p-6 text-white">
            <p className="font-bold text-lg mb-2">Browse Job Contacts in the Directory</p>
            <Link href="/laos/directory?category=Jobs" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
              Browse Jobs Directory →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
