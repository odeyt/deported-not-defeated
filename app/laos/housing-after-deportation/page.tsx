import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, CheckCircle } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Laos After Deportation",
  description: "Step-by-step guide to finding safe, affordable housing in Laos after deportation. Guesthouses, apartments, long-term rentals in Vientiane and beyond.",
  keywords: ["housing in Laos after deportation", "apartments Vientiane", "where to stay Laos deportee", "cheap housing Vientiane"],
};

export default function HousingAfterDeportationPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Laos Guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 p-2 rounded-lg"><Home size={20} className="text-white" /></div>
            <p className="text-brand-red font-bold uppercase tracking-widest text-xs">Housing Guide</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">How to Find Housing in Laos After Deportation</h1>
          <p className="text-gray-300 text-lg">Your first priority is a safe place to sleep. Here is exactly how to find it — from your first night to a long-term home.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg max-w-none">

          <div className="bg-brand-red text-white rounded-2xl p-6 mb-10 not-prose">
            <p className="font-bold text-lg mb-1">Your first night matters most.</p>
            <p className="text-red-200 text-sm">Do not sleep on the street. Vientiane has guesthouses for as little as $5–10 per night. Start there. Everything else comes after you are safe.</p>
          </div>

          <h2>Step 1 — Your First Night: Budget Guesthouses in Vientiane</h2>
          <p>When you first arrive in Laos, head to the <strong>Chao Anouvong area near the Mekong River</strong> in Vientiane. This is the backpacker and budget traveler zone with dozens of guesthouses that accept walk-ins with no reservation.</p>
          <ul>
            <li><strong>Price range:</strong> 50,000–100,000 LAK ($3–7) per night for a basic room</li>
            <li><strong>What to ask for:</strong> "Do you have a room? One night." — most staff speak basic English</li>
            <li><strong>What to bring:</strong> Your passport — all guesthouses will ask for it</li>
          </ul>

          <h2>Step 2 — First Week: Transition Housing (Weekly Rates)</h2>
          <p>Once you are stable, negotiate a weekly rate. Most guesthouses drop the nightly price by 30–40% for week-long stays.</p>
          <ul>
            <li><strong>Weekly rate:</strong> 300,000–600,000 LAK ($18–36) per week</li>
            <li><strong>Neighborhoods to look in:</strong> Chao Anouvong, Namphou Square, Talat Sao area</li>
            <li><strong>Ask about:</strong> Fan vs AC rooms, included WiFi, shared vs private bathroom</li>
          </ul>

          <h2>Step 3 — Long-Term: Monthly Apartment Rentals</h2>
          <p>After 2–4 weeks, move to a monthly rental. This is significantly cheaper per day and gives you stability to find work.</p>
          <div className="bg-gray-50 rounded-xl p-6 not-prose mb-6">
            <p className="font-bold text-navy-800 mb-3">Average monthly rent in Vientiane (2024):</p>
            <div className="space-y-2 text-sm">
              {[
                ["Basic room, shared bathroom", "$60–100/month"],
                ["Studio apartment, private bath", "$150–250/month"],
                ["1-bedroom apartment, furnished", "$250–400/month"],
                ["House with yard, local neighborhood", "$200–350/month"],
              ].map(([type, price]) => (
                <div key={type} className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-700">{type}</span>
                  <span className="font-bold text-navy-800">{price}</span>
                </div>
              ))}
            </div>
          </div>

          <h2>How to Find Apartments in Vientiane</h2>
          <ul>
            <li><strong>Facebook Groups:</strong> Search "Vientiane Housing" or "Laos Expat Housing" — most listings are posted there</li>
            <li><strong>Walk the streets:</strong> Look for "For Rent" signs — many landlords do not advertise online</li>
            <li><strong>Ask your guesthouse owner:</strong> They often know of rooms nearby</li>
            <li><strong>Markets:</strong> Ask vendors at Talat Sao or Talat Khua Din — local word of mouth is powerful</li>
          </ul>

          <h2>What You Need to Rent</h2>
          <ul>
            <li>Passport or Lao ID</li>
            <li>First month + security deposit (usually 1 month)</li>
            <li>Some landlords accept month-to-month — no long contract required</li>
          </ul>

          <h2>Safety Tips</h2>
          <ul>
            <li>Always see the room before paying</li>
            <li>Get a receipt for any payment</li>
            <li>Ask if water and electricity are included — these can add $20–40/month</li>
            <li>Check that the door locks properly</li>
          </ul>

          <div className="bg-navy-800 rounded-2xl p-6 text-white not-prose mt-10">
            <p className="font-bold text-lg mb-2">Find Housing Contacts in Our Directory</p>
            <p className="text-gray-300 text-sm mb-4">Browse verified guesthouses, apartment agents, and housing contacts in the Laos directory.</p>
            <Link href="/laos/directory?category=Housing" className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
              Browse Housing Directory →
            </Link>
          </div>

          <h2>Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4 not-prose">
            {[
              ["Find Work in Laos", "/laos/find-work-laos"],
              ["Cost of Living in Vientiane", "/laos/cost-of-living-vientiane"],
              ["Banking & Money", "/laos/banking-money"],
              ["Your First 30 Days", "/laos/first-30-days"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 font-medium text-navy-800 transition-colors text-sm">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
