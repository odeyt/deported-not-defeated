import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Numbers in El Salvador | 911, 913, US Embassy, Hospitals",
  description: "Essential emergency contacts in El Salvador — 911 police/ambulance, 913 fire, US Embassy, hospitals in San Salvador.",
};

const emergency = [
  { label: "Police & Ambulance", number: "911", note: "National emergency — police and medical" },
  { label: "Bomberos (Fire)", number: "913", note: "National fire department" },
  { label: "Cruz Roja El Salvador", number: "2222 5155", note: "Red Cross emergency and ambulance" },
  { label: "PNC (Police) Direct", number: "2231 5000", note: "National Civil Police direct line" },
];

const embassy = [
  { label: "US Embassy San Salvador", number: "+503 2501 2999", note: "Main line — citizen services, arrests, emergencies" },
  { label: "US Citizen Services", number: "+503 2501 2999", note: "After-hours: ask operator for duty officer" },
];

const hospitals = [
  { name: "Hospital Nacional Rosales", phone: "+503 2231 9200", note: "Largest public hospital in El Salvador" },
  { name: "Hospital de Diagnóstico", phone: "+503 2226 8787", note: "Private hospital, 24-hour ER, San Salvador" },
  { name: "Hospital de la Mujer (ISSS)", phone: "+503 2208 5000", note: "Social security hospital — maternal health" },
  { name: "Hospital Bloom", phone: "+503 2225 4114", note: "National children's hospital" },
];

const ngos = [
  { name: "Bienvenido a Casa Program", phone: "+503 2205 7700", note: "Government returnee integration program" },
  { name: "Casa del Migrante San Salvador", phone: "+503 2235 2434", note: "Shelter and support for deportees" },
  { name: "Caritas El Salvador", phone: "+503 2231 5557", note: "Social services and humanitarian aid" },
];

export default function ElSalvadorEmergencyPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-red-200">🇸🇻 El Salvador</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in El Salvador</h1>
          <p className="text-xl text-red-100">
            911 for police and medical. 913 for fire. Save these contacts now — do not wait for a crisis.
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
            <h2 className="text-2xl font-bold text-white mb-4">US Embassy El Salvador</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Hospitals in San Salvador</h2>
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
            <p className="text-gray-300 text-sm">Instituto Salvadoreño de Salud Mental: +503 2231 0800. ISNA (children/youth): +503 2205 7200. If you are in immediate danger, call 911.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/el-salvador" className="text-brand-red hover:underline text-sm">← Back to El Salvador Guide</Link>
            <Link href="/el-salvador/hospitals-san-salvador" className="text-brand-red hover:underline text-sm">Best Hospitals in San Salvador →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
