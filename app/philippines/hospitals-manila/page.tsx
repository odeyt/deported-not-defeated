import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Hospitals in Manila, Philippines | Private & Public",
  description: "Guide to private and public hospitals in Manila for deportees — Manila Doctors, The Medical City, St. Luke's, PGH — with phone numbers and costs.",
};

const privateHospitals = [
  { name: "Manila Doctors Hospital", phone: "+63 2 8558 0888", address: "667 United Nations Ave, Ermita, Manila", note: "24-hour ER. Central Manila. English-speaking staff. One of the oldest and most trusted private hospitals.", cost: "Consultation: ₱500–2,000. ER: ₱2,000–10,000+" },
  { name: "The Medical City", phone: "+63 2 8988 1000", address: "Ortigas Ave, Pasig City", note: "Full-service international-standard hospital. Excellent emergency department. Multiple specialty centers.", cost: "Consultation: ₱800–3,000. ER: ₱2,500–15,000+" },
  { name: "St. Luke's Medical Center BGC", phone: "+63 2 8789 7700", address: "Rizal Dr, Bonifacio Global City, Taguig", note: "Most modern hospital in the Philippines. JCI-accredited. English fluent staff.", cost: "Consultation: ₱1,000–4,000. ER: ₱3,000–20,000+" },
  { name: "St. Luke's Quezon City", phone: "+63 2 8723 0101", address: "279 E Rodriguez Sr Ave, Quezon City", note: "Original St. Luke's campus. Excellent specialists and emergency care.", cost: "Similar to BGC campus" },
];

const publicHospitals = [
  { name: "Philippine General Hospital (PGH)", phone: "+63 2 8554 8400", address: "Taft Ave, Ermita, Manila", note: "Largest public hospital in the Philippines. Free or very low cost for indigent patients. Always busy — bring patience.", cost: "Free–Very low cost. Long wait times." },
  { name: "Quirino Memorial Medical Center", phone: "+63 2 8921 5085", address: "Project 4, Quezon City", note: "Government hospital with low-cost emergency and specialist care.", cost: "Very low cost" },
];

export default function PhilippinesHospitalsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇵🇭 Philippines Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">Best Hospitals in Manila</h1>
          <p className="text-xl text-gray-300">The Philippines has excellent hospitals. Private options are world-class and affordable. PGH is free for those who qualify. Know where to go before you need it.</p>
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
            <h2 className="text-2xl font-bold text-white mb-4">Public Hospitals (Low/Free Cost)</h2>
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
            <h2 className="text-xl font-bold text-white mb-3">PhilHealth Coverage</h2>
            <p className="text-gray-300 text-sm">Enroll in PhilHealth as soon as you have a job. It covers a significant portion of hospitalization costs at both public and private hospitals. Voluntary membership is available for the self-employed or unemployed.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/philippines/emergency-numbers-philippines" className="text-brand-red hover:underline text-sm">← Emergency Numbers</Link>
            <Link href="/philippines" className="text-brand-red hover:underline text-sm">← Back to Philippines Guide</Link>
          </div>
        </div>
      </section>
    </>
  );
}
