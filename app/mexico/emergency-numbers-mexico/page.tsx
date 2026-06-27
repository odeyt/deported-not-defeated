import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Numbers in Mexico | 911, US Embassy, Hospitals",
  description: "Essential emergency contacts in Mexico for deportees — 911 unified, US Embassy, hospitals in Mexico City, and crisis support lines.",
};

const emergency = [
  { label: "Emergency (All)", number: "911", note: "Police, fire, ambulance — unified nationwide" },
  { label: "LOCATEL Mexico City", number: "55 5658 1111", note: "CDMX information and emergency referral" },
  { label: "Cruz Roja (Red Cross)", number: "55 5557 5757", note: "Ambulance and emergency medical" },
  { label: "Bomberos CDMX", number: "55 5768 2500", note: "Mexico City fire department direct" },
];

const embassy = [
  { label: "US Embassy Mexico City", number: "+52 55 5080 2000", note: "Main line — citizen services, arrests, emergencies" },
  { label: "US Consulate Tijuana", number: "+52 664 977 2000", note: "For northern border emergencies" },
  { label: "US Consulate Guadalajara", number: "+52 33 3268 2100", note: "Western Mexico citizen services" },
];

const hospitals = [
  { name: "ABC Medical Center (CDMX)", phone: "+52 55 5230 8000", note: "International standard, English-speaking doctors" },
  { name: "Médica Sur (CDMX)", phone: "+52 55 5424 7200", note: "Top private hospital, 24-hour emergency" },
  { name: "Hospital General de México", phone: "+52 55 2789 2000", note: "Public hospital, CDMX — free care" },
  { name: "IMSS Hospitals", phone: "800 623 2323", note: "Social security hospitals nationwide (requires IMSS)" },
];

const ngos = [
  { name: "Casa del Migrante Tijuana", phone: "+52 664 682 3840", note: "Shelter and support for returnees in Tijuana" },
  { name: "Grupos Beta (INAMI)", phone: "078", note: "Government migrant support — nationwide" },
  { name: "Cruz Roja Nacional", phone: "800 712 2222", note: "Humanitarian emergencies nationwide" },
];

export default function MexicoEmergencyPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-red-200">🇲🇽 Mexico</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in Mexico</h1>
          <p className="text-xl text-red-100">
            Mexico uses a unified 911 for all emergencies. Save these contacts now — do not wait for a crisis.
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
            <h2 className="text-2xl font-bold text-white mb-4">US Embassy & Consulates Mexico</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Hospitals in Mexico City</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Migrant Support</h2>
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
            <p className="text-gray-300 text-sm">SAPTEL (CDMX mental health line): 55 5259 8121 — 24 hours, free, bilingual. CONADIC addiction support: 800 911 2000.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/mexico" className="text-brand-red hover:underline text-sm">← Back to Mexico Guide</Link>
            <Link href="/mexico/hospitals-mexico-city" className="text-brand-red hover:underline text-sm">Best Hospitals in Mexico City →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
