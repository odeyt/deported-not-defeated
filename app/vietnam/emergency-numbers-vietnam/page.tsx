import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Numbers in Vietnam | Police 113, Ambulance 115, Fire 114",
  description: "Essential emergency contacts in Vietnam for deportees — Police 113, Ambulance 115, Fire 114, US Embassy, hospitals, and crisis lines.",
};

const emergency = [
  { label: "Police", number: "113", note: "National police emergency" },
  { label: "Ambulance", number: "115", note: "Medical emergency" },
  { label: "Fire Department", number: "114", note: "Fire emergency" },
  { label: "Traffic Police", number: "1800 599 946", note: "Road accidents and traffic emergencies" },
];

const embassy = [
  { label: "US Consulate General HCMC", number: "+84 28 3520 4200", note: "Ho Chi Minh City — citizen services" },
  { label: "US Embassy Hanoi", number: "+84 24 3850 5000", note: "Hanoi — after-hours: ask for duty officer" },
];

const hospitals = [
  { name: "FV Hospital (HCMC)", phone: "+84 28 5411 3333", note: "International standard, English-speaking doctors" },
  { name: "Vinmec HCMC", phone: "+84 28 3622 1166", note: "Modern private hospital, central HCMC" },
  { name: "Cho Ray Hospital", phone: "+84 28 3855 4137", note: "Largest public hospital in HCMC" },
  { name: "Hanoi French Hospital", phone: "+84 24 3577 1100", note: "International hospital in Hanoi" },
];

const ngos = [
  { name: "Pacific Links Foundation", phone: "+84 28 3930 0050", note: "Support for vulnerable returnees" },
  { name: "Vietnam Red Cross HCMC", phone: "+84 28 3929 5483", note: "Humanitarian aid and emergency support" },
];

export default function VietnamEmergencyPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-red-200">🇻🇳 Vietnam</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in Vietnam</h1>
          <p className="text-xl text-red-100">
            Save these contacts now — Police 113, Ambulance 115, Fire 114. In a crisis, you should not need to search.
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
            <h2 className="text-2xl font-bold text-white mb-4">US Embassy Vietnam</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Hospitals</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Support Organizations</h2>
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
            <p className="text-gray-300 text-sm">Vietnam does not have a 24-hour English mental health hotline. If you are in crisis, go to FV Hospital or Vinmec ER — they have mental health staff. International SOS: +84 28 3829 8424.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/vietnam" className="text-brand-red hover:underline text-sm">← Back to Vietnam Guide</Link>
            <Link href="/vietnam/hospitals-ho-chi-minh-city" className="text-brand-red hover:underline text-sm">Best Hospitals in HCMC →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
