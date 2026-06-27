import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Hospitals in San Salvador, El Salvador | Private & Public",
  description: "Guide to hospitals in San Salvador for deportees — Hospital de Diagnóstico, Hospital Rosales, with phone numbers and what to expect.",
};

const privateHospitals = [
  { name: "Hospital de Diagnóstico", phone: "+503 2226 8787", address: "Calle El Mirador 4436, San Salvador", note: "Best private hospital in San Salvador. 24-hour ER. English-speaking doctors available. Modern facilities.", cost: "Consultation: $50–100. ER visit: $100–500+" },
  { name: "Hospital de la Mujer", phone: "+503 2208 5000", address: "89 Av. Norte y Calle El Mirador, San Salvador", note: "Good for general care and women's health. Private, well-equipped.", cost: "Consultation: $40–80" },
  { name: "Hospital Centro de Emergencias", phone: "+503 2260 3400", address: "Colonia Médica, San Salvador", note: "Private emergency and specialist hospital, good reputation.", cost: "Consultation: $40–80. ER: $80–300+" },
];

const publicHospitals = [
  { name: "Hospital Nacional Rosales", phone: "+503 2231 9200", address: "Calle Arce y Avenida Mártires, San Salvador", note: "Largest public hospital in El Salvador. Free emergency care for all. Can be very crowded — go for true emergencies.", cost: "Free emergency care. Very long waits for non-urgent." },
  { name: "ISSS Hospital (Social Security)", phone: "+503 2208 5000", address: "Colonia Médica, San Salvador", note: "For workers enrolled in ISSS (El Salvador social security). Excellent care if covered.", cost: "Free with ISSS enrollment through employer." },
];

export default function ElSalvadorHospitalsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇸🇻 El Salvador Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Best Hospitals in San Salvador</h1>
          <p className="text-xl text-gray-300">Hospital de Diagnóstico is the best private option. Hospital Rosales provides free emergency care. Know both before you need them.</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Public Hospitals</h2>
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
            <h2 className="text-xl font-bold text-white mb-2">Health Insurance</h2>
            <p className="text-gray-300 text-sm">SafetyWing and similar travel health plans cover El Salvador. A basic plan costs $40–80/month. Once employed, push for ISSS enrollment — it covers hospitalization at excellent ISSS hospitals.</p>
            <Link href="/resources/health-insurance" className="text-brand-red hover:underline text-sm mt-2 block">View Health Insurance Options →</Link>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/el-salvador/emergency-numbers-el-salvador" className="text-brand-red hover:underline text-sm">← Emergency Numbers</Link>
            <Link href="/el-salvador" className="text-brand-red hover:underline text-sm">← Back to El Salvador Guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
