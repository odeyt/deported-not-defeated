import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare in Laos for Deportees",
  description: "Hospitals, clinics, mental health support, and emergency care in Laos.",
};

export default function HealthcarePage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🏥 Healthcare in Laos</h1>
          <p className="text-gray-300 text-lg">Your health is not optional. Here is how to access care.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-2">Emergency Numbers in Laos</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Police:</strong> 191</p>
              <p><strong>Ambulance:</strong> 195</p>
              <p><strong>Fire:</strong> 190</p>
              <p><strong>Lao Red Cross:</strong> +856 21 252239</p>
            </div>
          </div>

          {[
            {
              title: "Public Hospitals",
              body: "Laos has public hospitals in every major city. Care is low cost but may be limited in quality. Mahosot Hospital in Vientiane is the largest. For serious illness, consider private clinics.",
            },
            {
              title: "Private Clinics",
              body: "For better English-speaking care and faster service, use private clinics. Costs range from $20–100 per visit. Some accept USD. International SOS Clinic in Vientiane is well-regarded.",
            },
            {
              title: "Mental Health After Deportation",
              body: "Deportation is trauma. It is normal to feel grief, anger, shame, and loss. You are not weak for struggling. Look for counseling through NGOs, religious communities, or online therapy apps. Talking helps.",
            },
            {
              title: "Pharmacies",
              body: "Pharmacies are widely available in cities. Most basic medications are available without prescription. For serious medications, bring documentation from your previous doctor.",
            },
          ].map((s) => (
            <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-navy-800 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}

          <Link href="/laos/directory" className="inline-block bg-navy-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-700 transition-colors">
            Find Clinics in Directory →
          </Link>
        </div>
      </section>
    </>
  );
}
