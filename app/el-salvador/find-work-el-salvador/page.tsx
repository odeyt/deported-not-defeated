import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in El Salvador After Deportation",
  description: "Best job options for deportees in El Salvador — construction, hospitality, tech, delivery apps, and how to use your bilingual skills.",
};

const jobs = [
  { title: "Construction / Trades", pay: "$10–25/day", timeline: "1 week", desc: "El Salvador's construction sector is active. US-trained tradespeople (electrical, plumbing, HVAC, welding) can earn significantly more than average.", tips: "Visit hardware stores (Freund, EPA) in the morning — they often have labor boards. Contractors post on Facebook groups too." },
  { title: "Call Center / BPO", pay: "$500–1,000/month", timeline: "1–3 weeks", desc: "El Salvador has a growing bilingual BPO sector. Companies like Transcom, TTEC, and Conduent hire English-Spanish speakers actively.", tips: "Apply online or walk in to free zones in San Salvador and Santa Ana. Bring DUI and school record if available." },
  { title: "Hospitality / Tourism", pay: "$400–800/month", timeline: "1–2 weeks", desc: "Hotels, restaurants, and growing surf tourism (El Tunco, La Libertad) need bilingual staff. Tips from international visitors can double your income.", tips: "Apply to hotels in Escalón, Santa Elena, and beach towns like El Zonte and La Libertad." },
  { title: "Delivery / Gig Work", pay: "$8–20/day", timeline: "Same week", desc: "Hugo App and Uber Eats are the main delivery platforms. Requires a bike or motorcycle and DUI. Consistent daily income.", tips: "Hugo App signup: download app and register. Uber Eats: requires vehicle and license." },
  { title: "Tech / Remote Work", pay: "Varies ($500–5,000+)", timeline: "Depends on skills", desc: "El Salvador is investing in tech infrastructure (Bitcoin, fintech). Remote work pays in USD and is increasingly common. Stable internet is widely available.", tips: "FUSADES and Invest in El Salvador have startup resources. Spaces like Impact Hub in CDMX serves returning tech professionals." },
];

export default function ElSalvadorFindWorkPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Work in El Salvador</h1>
          <p className="text-xl text-gray-300">Your bilingual skills and any US trade experience give you a real advantage here. El Salvador uses USD — every dollar you earn goes further than you think.</p>
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
              <li>• <strong className="text-white">Tecoloco.com:</strong> El Salvador&apos;s main job board</li>
              <li>• <strong className="text-white">Computrabajo El Salvador:</strong> Classifieds for skilled work</li>
              <li>• <strong className="text-white">INSAFORP:</strong> Free government training and job placement</li>
              <li>• <strong className="text-white">Facebook:</strong> "Empleos en El Salvador" groups</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/el-salvador/cost-of-living-san-salvador" className="text-brand-red hover:underline text-sm">Cost of Living Guide →</Link>
            <Link href="/el-salvador" className="text-brand-red hover:underline text-sm">← Back to El Salvador Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
