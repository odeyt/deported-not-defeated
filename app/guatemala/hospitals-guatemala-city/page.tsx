import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Hospitals in Guatemala City | Private & Public",
  description: "Guide to hospitals in Guatemala City for deportees — Hospital Herrera Llerandi, Hospital San Juan de Dios, with phone numbers and costs.",
};

const privateHospitals = [
  { name: "Hospital Herrera Llerandi", phone: "+502 2384 5959", address: "6 Ave. 8-71, Zona 10, Guatemala City", note: "Top private hospital in Guatemala. 24-hour ER. English-speaking doctors. Zone 10 location.", cost: "Consultation: Q200–600 ($26–77). ER: Q500–2,000+ ($64–256)" },
  { name: "Hospital Centro Médico", phone: "+502 2279 4949", address: "6 Calle 3-47, Zona 10", note: "Private, modern facilities, good emergency care. Zone 10 area.", cost: "Consultation: Q200–500. ER: Q400–1,500+" },
  { name: "Hospital San Juan de Dios de la Privada", phone: "+502 2380 9500", address: "Zona 1, Guatemala City", note: "Private wing within the public hospital complex. Lower cost than Zona 10 private hospitals.", cost: "Consultation: Q150–400" },
];

const publicHospitals = [
  { name: "Hospital General San Juan de Dios", phone: "+502 2251 8191", address: "1 Ave. 10-50, Zona 1, Guatemala City", note: "Largest public hospital in Guatemala. Free emergency care. Busy — bring patience. Good specialists.", cost: "Free emergency care. Low cost for admitted patients." },
  { name: "Hospital Roosevelt", phone: "+502 2321 9191", address: "Calzada Roosevelt, Zona 11", note: "Second major public hospital. Emergency care available. Large capacity.", cost: "Very low cost. Free for emergency." },
];

export default function GuatemalaHospitalsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇬🇹 Guatemala Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Best Hospitals in Guatemala City</h1>
          <p className="text-xl text-gray-300">Hospital Herrera Llerandi is the top private option. San Juan de Dios provides free emergency care. Know both before you need them.</p>
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
            <h2 className="text-xl font-bold text-white mb-2">IGSS Enrollment</h2>
            <p className="text-gray-300 text-sm">Once employed formally, your employer enrolls you in IGSS (Instituto Guatemalteco de Seguridad Social). This gives you access to IGSS hospitals at no cost. Push to be enrolled as soon as you start formal work.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/guatemala/emergency-numbers-guatemala" className="text-brand-red hover:underline text-sm">← Emergency Numbers</Link>
            <Link href="/guatemala" className="text-brand-red hover:underline text-sm">← Back to Guatemala Guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
