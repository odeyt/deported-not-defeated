import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Work in the Philippines After Deportation",
  description: "Best job options for deportees in the Philippines — BPO, English teaching, construction, hospitality, and Grab driving.",
};

const jobs = [
  { title: "BPO / Call Center", pay: "₱18,000–35,000/month ($320–625)", timeline: "1–3 weeks", desc: "The Philippines BPO sector employs 1.5 million people. Native English speakers are prioritized for voice accounts. No degree required for many positions.", tips: "Apply to Concentrix, Sutherland, TTEC, Teleperformance. Walk-in applications accepted at most. Bring government ID and NBI clearance." },
  { title: "English Teaching", pay: "₱25,000–60,000/month ($445–1,070)", timeline: "2–4 weeks", desc: "Private schools, language centers, and online teaching platforms (Palfish, GogoKid) hire native speakers consistently.", tips: "TEFL certification helps. Try iTutorGroup, Preply for online work — earn USD from home." },
  { title: "Construction / Trades", pay: "₱500–900/day ($9–16)", timeline: "1 week", desc: "Filipino construction is booming. Skilled trades (electrical, welding, plumbing) earn above-average pay. Unskilled labor is also available.", tips: "Look for construction sites in BGC, Quezon City, and Cavite. Workers are often hired directly at site gates." },
  { title: "Hospitality / Restaurant", pay: "₱15,000–25,000/month ($268–446)", timeline: "1–2 weeks", desc: "Hotels, resorts, and restaurants in Manila, Cebu, and Boracay hire regularly. English-speaking staff command a premium.", tips: "Apply to Marriott, Hilton, SM Hotels, and Jollibee group restaurants. Walk-in applications are common." },
  { title: "Grab / Angkas Driving", pay: "₱500–1,500/day", timeline: "1–2 weeks", desc: "Grab Car, Grab Food, and Angkas (motorcycle taxi) accept applications continuously. Requires valid PH driver's license and vehicle registration.", tips: "Grab Car: own or rent a Grab-qualified vehicle. Angkas: motorcycle + safety course required." },
];

export default function PhilippinesFindWorkPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Work in the Philippines</h1>
          <p className="text-xl text-gray-300">The BPO sector alone employs 1.5 million Filipinos. Your English fluency is your biggest asset. Here are the fastest paths to income.</p>
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
              <li>• <strong className="text-white">Jobstreet.com.ph:</strong> Largest Philippine job board</li>
              <li>• <strong className="text-white">Kalibrr.com:</strong> Modern platform for professional roles</li>
              <li>• <strong className="text-white">OLX Philippines:</strong> Classifieds with job listings</li>
              <li>• <strong className="text-white">OnlineJobs.ph:</strong> Remote work for Filipino workers</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/philippines/cost-of-living-manila" className="text-brand-red hover:underline text-sm">Cost of Living Guide →</Link>
            <Link href="/philippines" className="text-brand-red hover:underline text-sm">← Back to Philippines Guide</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
