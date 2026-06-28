"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Can I visit someone after they were deported?",
    a: "Yes. Deportation applies to the individual deported — it does not prevent US citizens or residents from traveling to the destination country as tourists or visitors. You are free to visit your loved one in their home country as long as you comply with that country's entry requirements.",
  },
  {
    q: "Do I need a visa to visit?",
    a: "It depends on the country. US passport holders can enter many countries without a visa (Mexico, Central America, most of Southeast Asia, UK, EU). Some countries require visas or eTourist authorizations. Always verify requirements through the official embassy website or a trusted visa checker before booking flights.",
  },
  {
    q: "Should I book flights before checking visa rules?",
    a: "No — check visa rules first. Some countries require visas that take weeks to process. Book flights only after confirming your entry requirements are met. Use iVisa.com or Sherpa to check requirements, then book through Skyscanner or Expedia.",
  },
  {
    q: "Is travel insurance worth it?",
    a: "Yes — especially for international travel. Medical emergencies abroad can cost tens of thousands of dollars. Travel insurance covers hospitalization, emergency evacuation, trip cancellation, and lost luggage. SafetyWing offers affordable monthly plans from around $40/month per person.",
  },
  {
    q: "Should I stay near the airport or near my family?",
    a: "Stay near family whenever it is safe to do so — this is the point of the visit. If your family lives in a challenging area, consider staying in a hotel in a safer neighborhood nearby, and arrange visits during the day. Coordinate everything in advance with your loved one.",
  },
  {
    q: "Are hostels safe for family visits?",
    a: "Modern hostels are generally very safe, well-reviewed, and much more affordable than hotels. Many have private rooms for families while still being significantly cheaper. Hostelworld and Booking.com both allow filtering by review score — stick to properties with 8.0+ ratings.",
  },
  {
    q: "Can I rent a car internationally?",
    a: "Yes, most countries accept a valid US driver's license with an International Driving Permit (IDP). Some countries require local insurance on top of what your rental company offers. DiscoverCars.com and Rentalcars.com compare prices across multiple providers.",
  },
  {
    q: "What should I bring when visiting family?",
    a: "Essential documents (passport + copies), local currency, a travel insurance policy, an eSIM or unlocked phone, any gifts or supplies your loved one needs, and emergency contact information written on paper. Also bring any medications you need — they may not be available locally.",
  },
  {
    q: "How do I send money while traveling?",
    a: "Wise (formerly TransferWise) offers some of the best exchange rates for international transfers. You can also use Western Union, MoneyGram, or Remitly. Avoid exchanging currency at airports — rates are typically 5–15% worse than bank ATMs or Wise.",
  },
  {
    q: "How can I stay connected by phone?",
    a: "The best options are: (1) eSIM through Airalo, Holafly, or NumeroMoney — no physical card needed, activate before you arrive (use code RE_29X3K on NumeroMoney for €3 off); (2) purchase a local SIM card at the destination airport; (3) international roaming plan from your US carrier (expensive but convenient). We recommend eSIM for the easiest experience.",
  },
];

export default function FamilyVisitFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
          >
            <span className="text-navy-800 font-semibold text-sm leading-snug">{faq.q}</span>
            <span className={`text-gray-400 text-xs flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed pt-3">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
