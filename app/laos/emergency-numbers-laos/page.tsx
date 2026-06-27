import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Emergency Numbers in Laos — Police, Ambulance, Fire, Embassy",
  description: "All emergency phone numbers in Laos. Police, ambulance, fire, US Embassy, hospitals, and crisis support for deportees in Laos.",
  keywords: ["emergency numbers Laos", "police Laos", "ambulance Vientiane", "US Embassy Laos phone", "emergency contacts Laos"],
};

export default function EmergencyNumbersPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-2 text-red-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Laos Guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg"><Phone size={20} className="text-white" /></div>
            <p className="text-red-200 font-bold uppercase tracking-widest text-xs">Emergency Guide</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in Laos</h1>
          <p className="text-red-100 text-lg">Save these to your phone right now. You may need them before you need anything else.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Primary emergency numbers */}
          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Primary Emergency Numbers</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { service: "Police", number: "191", color: "bg-blue-600" },
                { service: "Ambulance", number: "195", color: "bg-red-600" },
                { service: "Fire", number: "190", color: "bg-orange-600" },
              ].map((e) => (
                <a key={e.service} href={`tel:${e.number}`} className={`${e.color} text-white rounded-2xl p-6 text-center block hover:opacity-90 transition-opacity`}>
                  <p className="text-5xl font-extrabold mb-2">{e.number}</p>
                  <p className="font-bold text-lg">{e.service}</p>
                  <p className="text-white/70 text-xs mt-1">Tap to call</p>
                </a>
              ))}
            </div>
          </div>

          {/* Embassy contacts */}
          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Embassy & Consulate Contacts</h2>
            <div className="space-y-3">
              {[
                { name: "US Embassy Vientiane", phone: "+856 21 487000", hours: "Mon–Fri 8:00am–5:00pm", note: "For emergency assistance outside hours, call the same number and follow prompts" },
                { name: "US Embassy Emergency (after hours)", phone: "+856 21 487000", hours: "24/7 emergency line", note: "Press option for American Citizen Services" },
              ].map((e) => (
                <div key={e.name} className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-navy-800 mb-1">{e.name}</p>
                  <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="text-2xl font-extrabold text-brand-red hover:underline block mb-2">{e.phone}</a>
                  <p className="text-gray-500 text-sm">{e.hours}</p>
                  <p className="text-gray-400 text-xs mt-1">{e.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hospitals */}
          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Hospital Emergency Contacts</h2>
            <div className="space-y-3">
              {[
                { name: "Mahosot Hospital", phone: "+856 21 214022", note: "Main public hospital. 24-hour emergency. Basic English spoken.", type: "Public" },
                { name: "Wattana Clinic", phone: "+856 21 413502", note: "Private clinic with English-speaking doctors. Faster service.", type: "Private" },
                { name: "Setthathirath Hospital", phone: "+856 21 352005", note: "Public hospital. Large facility with emergency department.", type: "Public" },
                { name: "Alliance International Medical Center", phone: "+856 21 513095", note: "Best private hospital in Vientiane for serious emergencies.", type: "Private" },
              ].map((h) => (
                <div key={h.name} className="flex items-start gap-4 border border-gray-200 rounded-2xl p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold shrink-0 mt-1 ${h.type === "Private" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{h.type}</span>
                  <div>
                    <p className="font-bold text-navy-800">{h.name}</p>
                    <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="text-brand-red font-bold hover:underline">{h.phone}</a>
                    <p className="text-gray-500 text-sm mt-1">{h.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support services */}
          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Support & Crisis Services</h2>
            <div className="space-y-3">
              {[
                { name: "Caritas Laos", phone: "+856 21 413789", note: "Free social support services. Housing, food, and counseling assistance." },
                { name: "UNHCR Laos", phone: "+856 21 267003", note: "UN refugee agency. Can provide guidance on legal status and protection." },
                { name: "Lao Red Cross", phone: "+856 21 241838", note: "Humanitarian assistance. Can help connect to emergency support services." },
              ].map((s) => (
                <div key={s.name} className="bg-gray-50 rounded-2xl p-4">
                  <p className="font-bold text-navy-800">{s.name}</p>
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="text-brand-red font-bold hover:underline block mb-1">{s.phone}</a>
                  <p className="text-gray-500 text-sm">{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-2xl p-6 text-white text-center">
            <p className="font-bold text-xl mb-2">Save These Numbers Now</p>
            <p className="text-gray-300 text-sm mb-4">Download the free checklist — it includes emergency contacts plus a full 30-day survival guide.</p>
            <Link href="/laos/first-30-days" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-xl font-bold transition-colors">
              View First 30 Days Guide →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
