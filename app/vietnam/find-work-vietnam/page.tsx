import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in Vietnam After Deportation",
  description: "Best job options for deportees in Vietnam — English teaching, hospitality, tech, and remote work in Ho Chi Minh City and Hanoi.",
};

const jobs = [
  { title: "English Teacher", pay: "$1,000–2,500/month", timeline: "1–3 weeks", desc: "The highest-paying fast-start career in Vietnam for English speakers. Language centers like ILA, Wall Street English, and Apollo hire constantly.", tips: "TEFL/CELTA certification significantly increases salary. Bring a professional headshot and copy of your degree if you have one." },
  { title: "Hotel / Hospitality", pay: "$400–900/month", timeline: "1–2 weeks", desc: "Ho Chi Minh City has hundreds of hotels, hostels, and resorts. Front desk, bar, and guest services roles for English speakers are common.", tips: "Apply in person at 3–5 star hotels in Districts 1, 3, and 7." },
  { title: "Tech / Remote Work", pay: "Varies ($500–5,000)", timeline: "Depends on skills", desc: "HCMC has a growing tech sector and many international companies have offices there. Remote work is widely accepted — Vietnam has strong internet.", tips: "Topcv.vn, Vietnamworks.com, and LinkedIn for tech roles. Co-working spaces like Toong and Up Co-working are job networking hubs." },
  { title: "Translation / Interpretation", pay: "$500–2,000/month", timeline: "1–3 weeks", desc: "Khmer-Vietnamese-English or just English-Vietnamese translators are in demand for business, legal, and medical fields.", tips: "Freelance via ProZ.com or local translation agencies in HCMC." },
  { title: "Delivery / Gig Work", pay: "$300–600/month", timeline: "Same day–1 week", desc: "Grab Food and ShopeeFood hire drivers constantly. Requires a motorbike (can rent for ~$60/month) and a valid Vietnamese ID or work permit.", tips: "ShopeeFood signup: register via app. Grab: visit a Grab center in HCMC." },
];

export default function VietnamFindWorkPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Work in Vietnam</h1>
          <p className="text-xl text-gray-300">English teaching pays $1,000–2,500/month in Vietnam — the highest starting salary in Southeast Asia for native speakers. Here are your best options.</p>
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
              <li>• <strong className="text-white">Vietnamworks.com:</strong> Largest job board in Vietnam</li>
              <li>• <strong className="text-white">TopCV.vn:</strong> Resume platform + job search</li>
              <li>• <strong className="text-white">LinkedIn:</strong> International companies and remote roles</li>
              <li>• <strong className="text-white">Facebook:</strong> "Jobs in Ho Chi Minh City" and "Hanoi Expat Jobs" groups</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/vietnam/cost-of-living-ho-chi-minh-city" className="text-brand-red hover:underline text-sm">Cost of Living Guide →</Link>
            <Link href="/vietnam" className="text-brand-red hover:underline text-sm">← Back to Vietnam Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
