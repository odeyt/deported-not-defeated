import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Numbers in Cambodia | Police, Ambulance, Fire, US Embassy",
  description: "Essential emergency contacts in Cambodia for deportees — Police 117, Ambulance 119, Fire 118, US Embassy, hospitals, and crisis lines.",
};

const emergency = [
  { label: "Police", number: "117", note: "National police emergency line" },
  { label: "Ambulance", number: "119", note: "Medical emergency" },
  { label: "Fire Department", number: "118", note: "Fire emergency" },
  { label: "Tourist Police", number: "012 942 484", note: "Phnom Penh — English-speaking" },
];

const embassy = [
  { label: "US Embassy Phnom Penh", number: "+855 23 728 000", note: "After-hours emergencies: ask for duty officer" },
  { label: "US Citizen Services", number: "+855 23 728 000", note: "Passports, emergencies, arrests" },
];

const hospitals = [
  { name: "AIC Hospital", phone: "+855 23 213 888", note: "International hospital, English staff" },
  { name: "Royal Phnom Penh Hospital", phone: "+855 23 991 000", note: "24-hour emergency, central Phnom Penh" },
  { name: "Calmette Hospital", phone: "+855 23 426 948", note: "French-Cambodian, public hospital" },
  { name: "Sen Sok International University Hospital", phone: "+855 23 999 111", note: "Modern facility, northwest Phnom Penh" },
];

const ngos = [
  { name: "Caritas Cambodia", phone: "+855 23 884 104", note: "Social services for vulnerable adults" },
  { name: "LICADHO", phone: "+855 23 220 786", note: "Human rights and legal aid" },
  { name: "Cambodian Center for Human Rights", phone: "+855 23 726 901", note: "Legal support and rights advocacy" },
];

export default function CambodiaEmergencyPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-red-200">🇰🇭 Cambodia</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in Cambodia</h1>
          <p className="text-xl text-red-100">
            Save these contacts now. In a crisis, you should not need to search for them.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Emergency Services</h2>
            <div className="grid gap-3">
              {emergency.map((e) => (
                <div key={e.label} className="flex items-center justify-between bg-navy-800 rounded-xl p-4">
                  <div>
                    <p className="text-white font-bold">{e.label}</p>
                    <p className="text-gray-400 text-sm">{e.note}</p>
                  </div>
                  <a href={`tel:${e.number}`} className="text-2xl font-extrabold text-brand-red hover:text-red-400">{e.number}</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">US Embassy Cambodia</h2>
            <div className="grid gap-3">
              {embassy.map((e) => (
                <div key={e.label} className="flex items-center justify-between bg-navy-800 rounded-xl p-4">
                  <div>
                    <p className="text-white font-bold">{e.label}</p>
                    <p className="text-gray-400 text-sm">{e.note}</p>
                  </div>
                  <a href={`tel:${e.number}`} className="text-lg font-bold text-blue-400 hover:text-blue-300">{e.number}</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Hospitals in Phnom Penh</h2>
            <div className="grid gap-3">
              {hospitals.map((h) => (
                <div key={h.name} className="flex items-center justify-between bg-navy-800 rounded-xl p-4">
                  <div>
                    <p className="text-white font-bold">{h.name}</p>
                    <p className="text-gray-400 text-sm">{h.note}</p>
                  </div>
                  <a href={`tel:${h.phone}`} className="text-lg font-bold text-green-400 hover:text-green-300">{h.phone}</a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">NGOs & Support Organizations</h2>
            <div className="grid gap-3">
              {ngos.map((n) => (
                <div key={n.name} className="flex items-center justify-between bg-navy-800 rounded-xl p-4">
                  <div>
                    <p className="text-white font-bold">{n.name}</p>
                    <p className="text-gray-400 text-sm">{n.note}</p>
                  </div>
                  <a href={`tel:${n.phone}`} className="text-lg font-bold text-yellow-400 hover:text-yellow-300">{n.phone}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Mental Health Crisis</h2>
            <p className="text-gray-300 text-sm mb-2">If you are in emotional crisis, you are not alone. Talk to someone:</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• TPO Cambodia (Transcultural Psychosocial Organization): +855 23 990 390</li>
              <li>• International SOS (medical evacuation and mental health): +855 23 216 911</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/cambodia" className="text-brand-red hover:underline text-sm">← Back to Cambodia Guide</Link>
            <Link href="/cambodia/hospitals-phnom-penh" className="text-brand-red hover:underline text-sm">Best Hospitals in Phnom Penh →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
