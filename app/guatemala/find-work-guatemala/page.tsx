import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in Guatemala After Deportation",
  description: "Best job options for deportees in Guatemala — call centers, trades, tourism, agriculture, and how to use your bilingual skills in Guatemala City.",
};

const jobs = [
  { title: "Call Center / BPO", pay: "Q3,000–7,000/month ($385–897)", timeline: "1–3 weeks", desc: "Guatemala City has a growing bilingual call center sector. Transactel, Alorica, and Teleperformance hire English-Spanish speakers constantly.", tips: "Apply online or walk in to Zona 4 and Pradera Concepción areas. Bring DPI and any work history documentation." },
  { title: "Construction / Trades", pay: "Q100–250/day ($13–32)", timeline: "1 week", desc: "Demand for skilled construction workers is high in Guatemala City and Antigua. US-trained electricians, welders, and plumbers command premium rates.", tips: "Hardware stores (Cemaco, Agencias Way) have job boards. Construction contractors also post on Facebook groups." },
  { title: "Tourism / Hospitality", pay: "Q3,000–6,000/month ($385–770)", timeline: "1–2 weeks", desc: "Antigua, Lago Atitlán, and Flores are booming tourist destinations. Hotels, restaurants, and tour operators need English-speaking staff.", tips: "Apply in person to hotels in Antigua and Panajachel. Bilingual tour guides earn significantly more with tips." },
  { title: "Agriculture", pay: "Q50–120/day ($6–15)", timeline: "Same week", desc: "Guatemala is a major coffee, cardamom, and palm oil exporter. Agricultural work is abundant, especially in Huehuetenango, Alta Verapaz, and Retalhuleu.", tips: "Basic income, but extremely accessible immediately. Often includes meals and housing on the farm." },
  { title: "Delivery / Gig Work", pay: "Q100–300/day ($13–38)", timeline: "Same week", desc: "Hugo App and Uber Eats operate in Guatemala City. Bicycle or motorcycle required. Consistent daily income with flexible hours.", tips: "Hugo App: download and register with DPI. InDriver also available for rideshare." },
];

export default function GuatemalaFindWorkPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Work in Guatemala</h1>
          <p className="text-xl text-gray-300">Your English fluency and any trade skills are rare and valuable in Guatemala. Call centers hire fast. Tourism pays well with tips. Here are your options.</p>
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
              <li>• <strong className="text-white">Encuentra24.com:</strong> Guatemala&apos;s main job classifieds</li>
              <li>• <strong className="text-white">Computrabajo Guatemala:</strong> Professional and trade job listings</li>
              <li>• <strong className="text-white">INTECAP:</strong> Free government vocational training and placement</li>
              <li>• <strong className="text-white">Facebook:</strong> "Empleos en Guatemala" groups — large and active</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/guatemala/cost-of-living-guatemala-city" className="text-brand-red hover:underline text-sm">Cost of Living Guide →</Link>
            <Link href="/guatemala" className="text-brand-red hover:underline text-sm">← Back to Guatemala Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
