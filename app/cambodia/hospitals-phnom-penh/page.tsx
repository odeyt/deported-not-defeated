import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Hospitals in Phnom Penh, Cambodia | Private & Public Options",
  description: "Guide to private and public hospitals in Phnom Penh for deportees — AIC, Royal Phnom Penh, Calmette, with phone numbers and what to expect.",
};

const privateHospitals = [
  { name: "AIC Hospital", phone: "+855 23 213 888", address: "Norodom Blvd, Phnom Penh", note: "Best for expats and English speakers. International standard. Has ER, lab, pharmacy, and specialists.", cost: "Consultation: $30–80. ER visit: $50–200+" },
  { name: "Royal Phnom Penh Hospital", phone: "+855 23 991 000", address: "Samdech Monivong Blvd", note: "24-hour emergency, good facilities, English-speaking doctors available.", cost: "Consultation: $25–60. ER: $50–150+" },
  { name: "Sen Sok International University Hospital", phone: "+855 23 999 111", address: "National Road 5, Sen Sok district", note: "Modern hospital northwest of the city center. Full emergency services.", cost: "Consultation: $20–50" },
];

const publicHospitals = [
  { name: "Calmette Hospital", phone: "+855 23 426 948", address: "Monivong Blvd, Daun Penh", note: "French-Cambodian public hospital. Largest government hospital in Phnom Penh. Free or low-cost for Khmer citizens.", cost: "Free–Low cost for citizens. Basic facilities." },
  { name: "Preah Ang Duong Hospital", phone: "+855 23 217 090", address: "Sothearos Blvd", note: "Public hospital with lower fees. Good for non-emergency care if you are uninsured.", cost: "Very low cost" },
];

export default function CambodiaHospitalsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇰🇭 Cambodia Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Best Hospitals in Phnom Penh</h1>
          <p className="text-xl text-gray-300">Medical care in Cambodia has improved dramatically. Private hospitals are affordable by Western standards. Here are your best options with phone numbers.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Private Hospitals</h2>
            <div className="space-y-4">
              {privateHospitals.map((h) => (
                <div key={h.name} className="bg-navy-800 rounded-xl p-6">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h3 className="font-bold text-white text-lg">{h.name}</h3>
                    <a href={`tel:${h.phone}`} className="text-green-400 font-bold text-lg hover:text-green-300">{h.phone}</a>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{h.address}</p>
                  <p className="text-gray-300 text-sm mb-1">{h.note}</p>
                  <p className="text-yellow-400 text-xs mt-2">{h.cost}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Public Hospitals (Low Cost)</h2>
            <div className="space-y-4">
              {publicHospitals.map((h) => (
                <div key={h.name} className="bg-navy-800 rounded-xl p-6">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h3 className="font-bold text-white text-lg">{h.name}</h3>
                    <a href={`tel:${h.phone}`} className="text-green-400 font-bold text-lg hover:text-green-300">{h.phone}</a>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{h.address}</p>
                  <p className="text-gray-300 text-sm mb-1">{h.note}</p>
                  <p className="text-yellow-400 text-xs mt-2">{h.cost}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Bring</h2>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Passport or Cambodian ID</li>
              <li>• Cash USD (private hospitals rarely accept KHR at private rates)</li>
              <li>• Any prescription medication you take regularly</li>
              <li>• Insurance card if you have travel or health insurance</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-2">Health Insurance</h2>
            <p className="text-gray-300 text-sm">SafetyWing and other travel health insurance plans cover Cambodia. A basic plan costs $40–80/month and covers ER visits and hospitalization at private hospitals.</p>
            <Link href="/resources/health-insurance" className="text-brand-red hover:underline text-sm mt-2 block">View Health Insurance Options →</Link>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cambodia/emergency-numbers-cambodia" className="text-brand-red hover:underline text-sm">← Emergency Numbers</Link>
            <Link href="/cambodia" className="text-brand-red hover:underline text-sm">← Back to Cambodia Guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
