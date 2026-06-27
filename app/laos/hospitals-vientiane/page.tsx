import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Best Hospitals in Vientiane, Laos — Public & Private Options",
  description: "The best hospitals and clinics in Vientiane for deportees. Costs, locations, English-speaking doctors, and what to do in a medical emergency.",
  keywords: ["hospitals Vientiane", "best hospital Laos", "English doctor Vientiane", "medical care Laos deportee", "clinic Vientiane"],
};

export default function HospitalsVientianePage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Laos Guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-600 p-2 rounded-lg"><Heart size={20} className="text-white" /></div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs">Healthcare Guide</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Best Hospitals in Vientiane, Laos</h1>
          <p className="text-gray-300 text-lg">Know where to go before you need it. Public options are cheap. Private clinics are faster. Here is the full breakdown.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <p className="font-bold text-red-800 mb-1">In a life-threatening emergency: call 195 (Ambulance)</p>
            <p className="text-red-700 text-sm">Or go directly to Mahosot Hospital emergency room — it is the main public emergency facility in Vientiane, open 24/7.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Private Hospitals & Clinics</h2>
            <p className="text-gray-600 text-sm mb-5">Faster service, English-speaking staff, better equipment. Costs more but still affordable by US standards.</p>
            <div className="space-y-4">
              {[
                {
                  name: "Alliance International Medical Center (AIC)",
                  phone: "+856 21 513095",
                  cost: "$30–100+ per visit",
                  english: true,
                  desc: "The best private hospital in Vientiane. Full diagnostic services, surgery, ICU. Used by expats and embassy staff. Accepts insurance.",
                  address: "Khouvieng Road, Vientiane",
                },
                {
                  name: "Wattana Clinic",
                  phone: "+856 21 413502",
                  cost: "$15–50 per visit",
                  english: true,
                  desc: "Popular private clinic with English-speaking doctors. Good for general checkups, infections, and minor emergencies. Shorter wait times than hospitals.",
                  address: "Near That Luang, Vientiane",
                },
                {
                  name: "French-Lao Clinic (Clinique Setthi)",
                  phone: "+856 21 413723",
                  cost: "$20–60 per visit",
                  english: true,
                  desc: "French and Lao doctors. Good for complex diagnoses. Medical evacuation coordination available.",
                  address: "Setthatilath Road, Vientiane",
                },
              ].map((h) => (
                <div key={h.name} className="border-2 border-blue-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-navy-800">{h.name}</h3>
                    {h.english && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold shrink-0 ml-2">English spoken</span>}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{h.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="bg-brand-red text-white px-3 py-1.5 rounded-lg font-bold hover:opacity-90">{h.phone}</a>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">{h.cost}</span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">{h.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Public Hospitals</h2>
            <p className="text-gray-600 text-sm mb-5">Lower cost or free for Lao nationals. Longer waits. Less English spoken. Go for non-urgent care or if cost is a barrier.</p>
            <div className="space-y-4">
              {[
                { name: "Mahosot Hospital", phone: "+856 21 214022", desc: "Main public hospital in Vientiane. 24-hour emergency department. Large facility. Some English spoken. Free or very low cost for Lao citizens.", address: "Fa Ngum Road, Vientiane" },
                { name: "Setthathirath Hospital", phone: "+856 21 352005", desc: "Large public hospital in Vientiane. Good for general medicine and surgery. Lower cost than private options.", address: "Khouvieng Road, Vientiane" },
                { name: "Mother & Child Hospital", phone: "+856 21 214018", desc: "Specialized in women's and children's health. Best option for maternity care.", address: "Vientiane center" },
              ].map((h) => (
                <div key={h.name} className="border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold text-navy-800 mb-1">{h.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{h.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="bg-navy-800 text-white px-3 py-1.5 rounded-lg font-bold">{h.phone}</a>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">{h.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">What to Bring to the Hospital</h2>
            <ul className="space-y-2">
              {["Your passport or Lao ID", "Cash in LAK or USD (most private hospitals do not accept cards)", "Any existing prescriptions or medical records", "A translator if possible — Google Translate works in a pinch"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="text-green-600 mt-0.5 shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy-800 rounded-2xl p-6 text-white">
            <p className="font-bold text-lg mb-2">Find More Healthcare Contacts</p>
            <Link href="/laos/directory?category=Healthcare" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
              Browse Healthcare Directory →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
