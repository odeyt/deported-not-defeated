import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Heart, ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Healthcare in Laos for Deportees",
  description: "Hospitals, clinics, mental health support, and emergency care in Laos.",
};

export default function HealthcarePage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Laos Guide
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
              <Heart size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Healthcare in Laos</h1>
            <p className="text-gray-300 text-lg">Your health is not optional. Here is how to access care.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Emergency Numbers — Save These Now</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Police", "191"],
                ["Ambulance", "195"],
                ["Fire", "190"],
                ["Lao Red Cross", "+856 21 252239"],
              ].map(([label, number]) => (
                <a key={label} href={`tel:${number}`} className="bg-white border border-red-200 rounded-xl p-3 text-center hover:bg-red-50 transition-colors">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-bold text-brand-red text-lg">{number}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Public Hospitals</h2>
            <p className="text-gray-600 mb-3">Laos has public hospitals in every major city. Care is low cost but quality varies. Good for emergencies and basic care.</p>
            <ul className="space-y-2">
              {[
                "Mahosot Hospital — largest public hospital in Vientiane (+856 21 214018)",
                "Savannakhet Provincial Hospital — main hospital for southern Laos",
                "Luang Prabang Provincial Hospital — main hospital for northern Laos",
                "Cost: typically $5–20 per visit",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Private Clinics (English-Speaking)</h2>
            <p className="text-gray-600 mb-3">For better care, English communication, and faster service. Cost: $20–100+ per visit.</p>
            <ul className="space-y-2">
              {[
                "Wattana Clinic — most recommended English clinic in Vientiane (+856 21 413502)",
                "International SOS Clinic — international standard, highest quality (+856 21 241741)",
                "Clinic Settasiphone — affordable local private clinic",
                "COPE Centre — free prosthetics and physical rehabilitation",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Mental Health After Deportation</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Deportation is trauma. Grief, anger, shame, and disorientation are normal reactions. You are not weak for struggling — you are human. Getting mental health support is one of the most important things you can do.
            </p>
            <ul className="space-y-2">
              {[
                "Caritas Laos — community support and counselling referrals",
                "Religious communities — churches and temples often provide informal support",
                "Online therapy — BetterHelp and Talkspace work from Laos with a VPN",
                "Talk to someone you trust — even one honest conversation helps",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Pharmacies</h2>
            <p className="text-gray-600 leading-relaxed">
              Pharmacies are widely available in cities. Most basic medications are available without a prescription. For specific or controlled medications, bring documentation from your previous doctor if possible.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Clinics & Hospitals in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Verified hospitals, clinics, and mental health resources across Laos.</p>
            <Link href="/laos/directory?category=Hospitals+%2F+Clinics" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">
              Search Healthcare Listings →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
