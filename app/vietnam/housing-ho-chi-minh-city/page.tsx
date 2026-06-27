import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Ho Chi Minh City After Deportation",
  description: "Guide to affordable housing in Ho Chi Minh City, Vietnam — mini hotels, rooms, apartments, apps, and what to expect on a tight budget.",
};

export default function VietnamHousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇻🇳 Vietnam Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Housing in Ho Chi Minh City</h1>
          <p className="text-xl text-gray-300">HCMC is a city of 9 million. Mini hotels, shared rooms, and apartment buildings are everywhere. Here is how to find the right fit fast.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Night One: Mini Hotels</h2>
            <p className="text-gray-300 text-sm mb-3">Mini hotels (nhà nghỉ) and budget hotels are everywhere in HCMC. Expect 200,000–400,000 VND ($8–16) per night. District 1 and District 3 have the most options near the city center.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• District 1 (Phạm Ngũ Lão area) — backpacker hub, English spoken, WiFi included</li>
              <li>• District 3 — local feel, quieter, cheaper nightly rates</li>
              <li>• Bình Thạnh — residential, great for monthly room searches</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Monthly Budget: What You Can Afford</h2>
            <div className="grid gap-4">
              {[
                { tier: "Survival Budget", price: "$80–200/month", desc: "Phòng trọ (boarding rooms) in Gò Vấp, Bình Thạnh, or Tân Phú. Fan-cooled, shared bathroom. 2,000,000–5,000,000 VND." },
                { tier: "Stable Budget", price: "$200–450/month", desc: "Private AC room with private bathroom, WiFi. Districts 3, 7, or Bình Thạnh. 5,000,000–11,000,000 VND." },
                { tier: "Comfortable Budget", price: "$450–900/month", desc: "Studio apartment with full kitchen, elevator building, gym. District 2 or Phú Mỹ Hưng." },
              ].map((row) => (
                <div key={row.tier} className="bg-navy-800 rounded-xl p-5">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-white">{row.tier}</span>
                    <span className="text-brand-red font-bold">{row.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">How to Find a Room</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">Chotot.com:</strong> Vietnam's biggest classified ads — search "phòng trọ" for rooms</li>
              <li>• <strong className="text-white">Facebook Groups:</strong> Search "Ho Chi Minh City Rooms for Rent" or "Phòng trọ HCMC"</li>
              <li>• <strong className="text-white">Walk the area:</strong> Signs saying "Cho Thuê Phòng" = room for rent</li>
              <li>• <strong className="text-white">Batdongsan.com.vn:</strong> Real estate listings with maps</li>
              <li>• <strong className="text-white">Ask at your mini hotel:</strong> Owners often know monthly landlords</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Know Before Signing</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Landlords typically ask for 1–2 months deposit plus first month's rent</li>
              <li>• Electricity is billed separately — landlords often charge 3,500–4,000 VND/kWh</li>
              <li>• Contracts are simple — written in Vietnamese, have a trusted person review</li>
              <li>• Negotiate — asking for a lower price after viewing is expected and normal</li>
              <li>• Keep a copy of your rental contract — required for some visa extensions</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/vietnam/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days Checklist</Link>
            <Link href="/vietnam/cost-of-living-ho-chi-minh-city" className="text-brand-red hover:underline text-sm">Cost of Living →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
