import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Hospitals in Mexico City | Private & IMSS Public Hospitals",
  description: "Guide to hospitals in Mexico City for deportees — ABC Medical Center, Médica Sur, IMSS, Hospital General — with phone numbers and costs.",
};

const privateHospitals = [
  { name: "ABC Medical Center (The American British Cowdray)", phone: "+52 55 5230 8000", address: "Sur 136 No. 116, Col. Las Américas, CDMX", note: "Top private hospital in Mexico. English-speaking doctors. JCI accredited. 24-hour ER.", cost: "Consultation: $1,500–4,000 MXN. ER visit: $3,000–15,000+ MXN" },
  { name: "Médica Sur", phone: "+52 55 5424 7200", address: "Puente de Piedra 150, Toriello Guerra, CDMX", note: "Excellent specialist hospital with modern ER. English service available.", cost: "Consultation: $1,200–3,500 MXN. ER: $2,500–12,000+ MXN" },
  { name: "Hospital Español", phone: "+52 55 5255 9600", address: "Ejército Nacional 613, Polanco, CDMX", note: "Historic private hospital, good reputation, central location.", cost: "Consultation: $1,000–3,000 MXN" },
];

const publicHospitals = [
  { name: "Hospital General de México", phone: "+52 55 2789 2000", address: "Dr. Balmis 148, Col. Doctores, CDMX", note: "Largest public hospital in Mexico. Free emergency care for anyone. Can be very busy.", cost: "Free emergency care. Specialist care may have fees." },
  { name: "IMSS Hospitals (Social Security)", phone: "800 623 2323", address: "Multiple locations in CDMX", note: "IMSS hospitals require IMSS enrollment (via employer). Excellent care if covered. Ask your employer about IMSS enrollment.", cost: "Free with IMSS. Near-zero cost." },
];

export default function MexicoHospitalsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Best Hospitals in Mexico City</h1>
          <p className="text-xl text-gray-300">Mexico City has world-class private hospitals and free emergency care at public hospitals. Know where to go before you need it.</p>
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
            <h2 className="text-xl font-bold text-white mb-2">IMSS Enrollment</h2>
            <p className="text-gray-300 text-sm">Once you have formal employment, your employer is legally required to register you with IMSS. This gives you access to free hospital care at IMSS facilities. It is one of Mexico&apos;s most valuable benefits.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/mexico/emergency-numbers-mexico" className="text-brand-red hover:underline text-sm">← Emergency Numbers</Link>
            <Link href="/mexico" className="text-brand-red hover:underline text-sm">← Back to Mexico Guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
