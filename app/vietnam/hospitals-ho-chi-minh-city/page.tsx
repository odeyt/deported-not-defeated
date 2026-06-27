import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Hospitals in Ho Chi Minh City, Vietnam | Private & Public",
  description: "Guide to private and public hospitals in Ho Chi Minh City for deportees — FV Hospital, Vinmec, Cho Ray, with phone numbers and costs.",
};

const privateHospitals = [
  { name: "FV Hospital (Franco-Vietnamese)", phone: "+84 28 5411 3333", address: "6 Nguyen Luong Bang, District 7", note: "Best international hospital in HCMC. French-managed. English, French, and Vietnamese spoken. 24-hour ER.", cost: "Consultation: $50–120. ER: $100–300+" },
  { name: "Vinmec HCMC", phone: "+84 28 3622 1166", address: "208 Nguyen Huu Canh, Binh Thanh", note: "Modern private hospital. International standard care. English-speaking doctors available.", cost: "Consultation: $40–100. ER: $80–250+" },
  { name: "Columbia Asia Hospital", phone: "+84 28 3823 8888", address: "8 Alexandre de Rhodes, District 1", note: "International hospital, central location, English service.", cost: "Consultation: $40–80" },
];

const publicHospitals = [
  { name: "Cho Ray Hospital", phone: "+84 28 3855 4137", address: "201 Nguyen Chi Thanh, District 5", note: "Largest public hospital in HCMC. World-class specialists. Long waits. Free to very low cost for Vietnamese citizens.", cost: "Free–Very low for citizens. Specialist referral may take time." },
  { name: "Bach Mai Hospital HCMC affiliate", phone: "+84 28 3855 4890", address: "District 5 area", note: "Government hospital, low cost, long wait times.", cost: "Very low cost" },
];

export default function VietnamHospitalsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Best Hospitals in Ho Chi Minh City</h1>
          <p className="text-xl text-gray-300">Vietnam&apos;s private hospitals are excellent and affordable compared to Western prices. For emergencies, call 115 or go directly to FV or Vinmec.</p>
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
                    <a href={`tel:${h.phone}`} className="text-green-400 font-bold hover:text-green-300">{h.phone}</a>
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
                    <a href={`tel:${h.phone}`} className="text-green-400 font-bold hover:text-green-300">{h.phone}</a>
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
              <li>• Passport or Vietnamese ID (CCCD)</li>
              <li>• Cash VND or USD (most private hospitals accept both)</li>
              <li>• BHYT health card if enrolled (for public hospitals)</li>
              <li>• Any regular medication list in writing</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-2">Health Insurance</h2>
            <p className="text-gray-300 text-sm">SafetyWing covers Vietnam for $40–80/month. Vietnam&apos;s public BHYT insurance is available to residents — ask at your local BHXH office after getting a residency registration.</p>
            <Link href="/resources/health-insurance" className="text-brand-red hover:underline text-sm mt-2 block">View Health Insurance Options →</Link>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/vietnam/emergency-numbers-vietnam" className="text-brand-red hover:underline text-sm">← Emergency Numbers</Link>
            <Link href="/vietnam" className="text-brand-red hover:underline text-sm">← Back to Vietnam Guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
