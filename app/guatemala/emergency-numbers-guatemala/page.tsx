import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Numbers in Guatemala | 110, 122, 1551, US Embassy",
  description: "Essential emergency contacts in Guatemala for deportees — PNC 110, Bomberos 122, SAMU 1551, US Embassy, hospitals in Guatemala City.",
};

const emergency = [
  { label: "PNC (Police)", number: "110", note: "National Civil Police emergency" },
  { label: "Bomberos (Fire)", number: "122", note: "Bomberos Voluntarios" },
  { label: "SAMU (Ambulance)", number: "1551", note: "National ambulance emergency service" },
  { label: "Cruz Roja Guatemala", number: "125", note: "Red Cross emergency assistance" },
];

const embassy = [
  { label: "US Embassy Guatemala City", number: "+502 2326 4000", note: "Main line — citizen services, arrests, emergencies" },
  { label: "US Citizen Services", number: "+502 2326 4000", note: "After-hours: listen for the emergency option" },
];

const hospitals = [
  { name: "Hospital General San Juan de Dios", phone: "+502 2251 8191", note: "Largest public hospital, Guatemala City" },
  { name: "Hospital Herrera Llerandi", phone: "+502 2384 5959", note: "Top private hospital, 24-hour emergency" },
  { name: "Hospital Centro Médico", phone: "+502 2279 4949", note: "Private, central Guatemala City" },
  { name: "Hospital Roosevelt", phone: "+502 2321 9191", note: "Public hospital, specialized departments" },
];

const ngos = [
  { name: "Casa del Migrante Guatemala", phone: "+502 2232 3835", note: "Shelter and support for returnees" },
  { name: "Caritas Guatemala", phone: "+502 2285 0000", note: "Social services and humanitarian support" },
  { name: "CONAMIGUA", phone: "+502 2317 1100", note: "National Commission for Guatemalan Migrants" },
];

export default function GuatemalaEmergencyPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-red-200">🇬🇹 Guatemala</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in Guatemala</h1>
          <p className="text-xl text-red-100">
            Police 110. Fire 122. Ambulance 1551. Save these now — do not wait for a crisis.
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
            <h2 className="text-2xl font-bold text-white mb-4">US Embassy Guatemala</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Hospitals in Guatemala City</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Deportee Support Organizations</h2>
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
            <p className="text-gray-300 text-sm">Hospital de Salud Mental Federico Mora: +502 2471 8401. If you are in immediate danger, call 110 (PNC) or go to the nearest hospital emergency room.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/guatemala" className="text-brand-red hover:underline text-sm">← Back to Guatemala Guide</Link>
            <Link href="/guatemala/hospitals-guatemala-city" className="text-brand-red hover:underline text-sm">Best Hospitals in Guatemala City →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
