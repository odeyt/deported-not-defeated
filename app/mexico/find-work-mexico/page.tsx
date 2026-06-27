import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in Mexico After Deportation",
  description: "Best job options for deportees in Mexico — restaurants, trades, tech, gig work, and how to use your bilingual skills.",
};

const jobs = [
  { title: "Restaurant / Food Service", pay: "$4,000–12,000 MXN/month ($220–660)", timeline: "1–2 weeks", desc: "Mexico City, Guadalajara, and tourist areas have thousands of restaurants constantly hiring. Bilingual staff can earn tips in USD in tourist zones.", tips: "Apply in person in the mornings. Tourist areas (Zona Rosa, Condesa, San Miguel de Allende) pay best." },
  { title: "Construction / Trades", pay: "$300–600 MXN/day ($16–33)", timeline: "1 week", desc: "Electricians, plumbers, welders, and general laborers are in high demand across Mexico. US-trained tradespeople have a skill advantage.", tips: "Construction sites hire at the gate. IMSS social security registration increases your legitimacy as a skilled worker." },
  { title: "Gig Economy", pay: "₱$200–500 MXN/day ($11–28)", timeline: "Same week", desc: "Uber, DiDi, InDriver, and Rappi Delivery hire continuously. Daily payout available with most platforms. Requires CURP and vehicle registration.", tips: "Rappi and DiDi Food can be started with just a bicycle. Uber requires a 2008+ vehicle." },
  { title: "Tech / Remote Work", pay: "Varies ($500–5,000/month)", timeline: "2–4 weeks", desc: "Mexico City has Latin America's fastest-growing tech ecosystem. Remote jobs paying in USD are abundant if you have tech skills.", tips: "LinkedIn, OCC Mundial, Computrabajo. Co-working spaces like WeWork and spaces in Roma Norte are job networking hubs." },
  { title: "Tourism / Tour Guide", pay: "$6,000–18,000 MXN/month ($330–990)", timeline: "1–4 weeks", desc: "Border cities (Tijuana, Nuevo Laredo), tourist cities (CDMX, Cancún), and colonial towns need bilingual guides and hospitality staff.", tips: "Mexico Tourism Board certification optional but increases pay. Hotels near Zócalo and Chapultepec are good targets." },
];

export default function MexicoFindWorkPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Work in Mexico</h1>
          <p className="text-xl text-gray-300">Your bilingual Spanish-English skills are a significant advantage in Mexico. Gig work starts the same week. Trade and tech jobs pay well. Here are your best paths.</p>
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
              <li>• <strong className="text-white">OCC Mundial:</strong> Mexico&apos;s top job board for professional roles</li>
              <li>• <strong className="text-white">Computrabajo:</strong> Classifieds for skilled and unskilled work</li>
              <li>• <strong className="text-white">LinkedIn:</strong> Tech, sales, and professional sector jobs</li>
              <li>• <strong className="text-white">Facebook Marketplace:</strong> Local job postings in your colonia</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/mexico/cost-of-living-mexico-city" className="text-brand-red hover:underline text-sm">Cost of Living Guide →</Link>
            <Link href="/mexico" className="text-brand-red hover:underline text-sm">← Back to Mexico Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
