import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Numbers in the Philippines | 911, US Embassy, Hospitals",
  description: "Essential emergency contacts in the Philippines — 911 unified, US Embassy, NBI, hospitals in Manila and beyond.",
};

const emergency = [
  { label: "Emergency (All)", number: "911", note: "Police, fire, ambulance — unified emergency number" },
  { label: "Philippine National Police", number: "117", note: "Alternative police line" },
  { label: "Bureau of Fire Protection", number: "116", note: "Alternative fire line" },
  { label: "Red Cross Philippines", number: "143", note: "Disaster and medical assistance" },
];

const embassy = [
  { label: "US Embassy Manila", number: "+63 2 5301 2000", note: "Main line — citizen services, arrests, emergencies" },
  { label: "US Citizen Services", number: "+63 2 5301 2000", note: "Passport, notarial, and emergency services" },
];

const hospitals = [
  { name: "Manila Doctors Hospital", phone: "+63 2 8558 0888", note: "24-hour ER, Manila" },
  { name: "The Medical City", phone: "+63 2 8988 1000", note: "Ortigas — full emergency services" },
  { name: "St. Luke's Medical Center", phone: "+63 2 8723 0101", note: "BGC and Quezon City campuses" },
  { name: "Philippine General Hospital", phone: "+63 2 8554 8400", note: "Public hospital, Manila — free for indigent patients" },
];

const ngos = [
  { name: "PAO (Public Attorney's Office)", phone: "1800 10 742 2006", note: "Free legal aid for all Filipinos" },
  { name: "DSWD 24-Hour Crisis Hotline", phone: "1800 10 888 3797", note: "Social welfare and crisis support" },
  { name: "OWWA (OFW Welfare)", phone: "+63 2 8891 7601", note: "Support for returnees and OFWs" },
];

export default function PhilippinesEmergencyPage() {
  return (
    <>
      <section className="bg-brand-red text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-sm mb-2 text-red-200">🇵🇭 Philippines</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Emergency Numbers in the Philippines</h1>
          <p className="text-xl text-red-100">
            The Philippines has a unified 911 emergency line. Save these contacts now — do not wait for a crisis.
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
            <h2 className="text-2xl font-bold text-white mb-4">US Embassy Philippines</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Hospitals in Manila</h2>
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
            <p className="text-gray-300 text-sm">NCMH Crisis Hotline: 1800 10 254 6467 (toll-free). Hopeline: 028 804 4673. Available 24/7 in Filipino and English.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/philippines" className="text-brand-red hover:underline text-sm">← Back to Philippines Guide</Link>
            <Link href="/philippines/hospitals-manila" className="text-brand-red hover:underline text-sm">Best Hospitals in Manila →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
