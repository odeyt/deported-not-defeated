import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in Cambodia After Deportation",
  description: "Best job options for deportees in Cambodia — English teaching, NGO work, hospitality, tuk-tuk driving, and freelancing.",
};

const jobs = [
  { title: "English Teacher", pay: "$600–1,200/month", timeline: "1–4 weeks", desc: "High demand at language schools. Many schools hire native speakers without a formal degree. CELTA certification increases pay significantly.", tips: "Top schools: IDP, ACE, Pannasastra. Teaching license helps but not always required." },
  { title: "Hotel / Hospitality", pay: "$200–500/month", timeline: "1–2 weeks", desc: "Guesthouses, hotels, and restaurants in Phnom Penh and Siem Reap hire English speakers quickly. Entry-level positions fill fast in tourist areas.", tips: "Apply in person. Morning applications when managers are around (8–11am)." },
  { title: "NGO / Development Work", pay: "$400–1,500/month", timeline: "1–4 weeks", desc: "Cambodia has hundreds of NGOs — many need bilingual Khmer-English speakers. Admin, outreach, and project support roles are common.", tips: "Search on CambodiaJobs.biz and DevJobsScanner.com. Caritas, LICADHO, PSI all hire locally." },
  { title: "Tuk-Tuk / Ride Driving", pay: "$200–500/month", timeline: "Same day", desc: "If you have a license and some capital (or rental), tuk-tuks earn reliable daily income in Phnom Penh and Siem Reap, especially near tourist areas.", tips: "Rental tuk-tuks: $50–100/month. Grab Tuk-Tuk registration available in Phnom Penh." },
  { title: "Freelance / Remote Work", pay: "Varies widely", timeline: "Immediate if you have clients", desc: "Cambodia has fast fiber internet, a low cost of living, and no restrictions on remote work. Web development, design, writing, and customer service are popular.", tips: "Upwork, Toptal, and Freelancer.com work well in Cambodia." },
];

export default function CambodiaFindWorkPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Work in Cambodia</h1>
          <p className="text-xl text-gray-300">English teaching and NGO work are the fastest paths to stable income. Here are your best options with realistic pay and timelines.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-6">
          {jobs.map((job) => (
            <div key={job.title} className="bg-navy-800 rounded-xl p-6">
              <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                <h2 className="text-xl font-bold text-white">{job.title}</h2>
                <div className="flex gap-2">
                  <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded">{job.pay}</span>
                  <span className="text-yellow-400 text-xs font-semibold bg-yellow-400/10 px-2 py-1 rounded">{job.timeline}</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-2">{job.desc}</p>
              <p className="text-gray-400 text-xs italic">{job.tips}</p>
            </div>
          ))}

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Where to Search</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong className="text-white">CambodiaJobs.biz:</strong> Largest Cambodian job board</li>
              <li>• <strong className="text-white">Khmer24.com:</strong> Classifieds including job listings</li>
              <li>• <strong className="text-white">LinkedIn:</strong> NGO and professional sector jobs</li>
              <li>• <strong className="text-white">Facebook:</strong> Groups like "Jobs in Cambodia" and "Phnom Penh Jobs"</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cambodia/cost-of-living-phnom-penh" className="text-brand-red hover:underline text-sm">Cost of Living Guide →</Link>
            <Link href="/cambodia" className="text-brand-red hover:underline text-sm">← Back to Cambodia Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
