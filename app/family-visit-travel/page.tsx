import type { Metadata } from "next";
import Link from "next/link";
import { allCountries } from "@/data/countries/index";
import { countryVisitData } from "@/data/familyVisitData";
import TravelProviderCard from "@/components/travel/TravelProviderCard";
import TravelBudgetCalculator from "@/components/travel/TravelBudgetCalculator";
import FamilyVisitFAQ from "@/components/travel/FamilyVisitFAQ";
import FamilyVisitEmailForm from "@/components/travel/FamilyVisitEmailForm";

export const metadata: Metadata = {
  title: "Family Visit Travel Guide | Visit a Loved One After Deportation",
  description:
    "Plan travel to visit a loved one after deportation. Compare flights, hotels, hostels, car rentals, travel insurance, eSIMs, tours, and visa information by country.",
  keywords: [
    "visit deported family member",
    "family visit travel guide",
    "flights to visit deported loved one",
    "travel insurance deportation visit",
    "hotel visa travel after deportation",
    "family visit Mexico Guatemala El Salvador",
  ],
  openGraph: {
    title: "Family Visit Travel Guide | Deported Not Defeated",
    description:
      "Compare flights, hotels, travel insurance, eSIMs, and visa info for visiting a loved one in their home country.",
    type: "article",
  },
};

// ── Travel provider data ──────────────────────────────────────────────────────

const FLIGHTS = [
  {
    name: "Skyscanner",
    category: "Flight Search",
    description: "Compares hundreds of airlines and travel sites at once. The most comprehensive flight comparison tool available.",
    bestFor: "Finding the cheapest flight options across multiple airlines and dates.",
    priceLevel: "Varies" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Skyscanner affiliate link (Partners.skyscanner.net)
    ctaLabel: "Compare Flights",
    gradient: "from-blue-400 to-indigo-600",
    icon: "✈️",
  },
  {
    name: "Expedia",
    category: "Flight + Hotel",
    description: "Book flights and hotels together for potential bundle savings. Large inventory with flexible cancellation options.",
    bestFor: "Travelers who want to bundle flights and accommodation in one booking.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Expedia affiliate link
    ctaLabel: "Search Flights",
    gradient: "from-yellow-400 to-orange-500",
    icon: "🌐",
  },
  {
    name: "Trip.com",
    category: "International Flights",
    description: "Strong inventory for Asian routes and last-minute international deals. Often cheaper than Western booking platforms for Asia travel.",
    bestFor: "Flights to Southeast Asia, the Philippines, and other Asian destinations.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Trip.com affiliate link
    ctaLabel: "Find Cheap Flights",
    gradient: "from-teal-400 to-cyan-600",
    icon: "🛫",
  },
  {
    name: "CheapOair",
    category: "Discount Flights",
    description: "Specializes in discounted international airfares. Good for finding deals on less common routes to Latin America and Africa.",
    bestFor: "Discounted international fares, especially to Central America and Africa.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with CheapOair affiliate link
    ctaLabel: "Find Deals",
    gradient: "from-green-400 to-emerald-600",
    icon: "💺",
  },
  {
    name: "WayAway",
    category: "Cashback Flights",
    description: "Earn cashback on flight bookings. Compare prices from major airlines and get a percentage back on every booking.",
    bestFor: "Frequent travelers who want to earn cashback on every flight booked.",
    priceLevel: "Varies" as const,
    href: "#affiliate-placeholder", // TODO: Replace with WayAway affiliate link
    ctaLabel: "Earn Cashback on Flights",
    gradient: "from-violet-400 to-purple-600",
    icon: "💳",
  },
];

const HOTELS = [
  {
    name: "Booking.com",
    category: "Hotels",
    description: "The world's largest accommodation platform. Millions of properties including hotels, guesthouses, and apartments — most with free cancellation.",
    bestFor: "Finding verified, reviewed accommodation in any country at any budget.",
    priceLevel: "Varies" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Booking.com affiliate link
    ctaLabel: "Search Hotels",
    gradient: "from-blue-400 to-blue-600",
    icon: "🏨",
  },
  {
    name: "Agoda",
    category: "Hotels & Apartments",
    description: "Particularly strong for Asia and Latin America. Often has better deals than competitors for Thailand, Philippines, Mexico, and Central America.",
    bestFor: "Hotels and apartments in Southeast Asia and Latin America.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Agoda affiliate link
    ctaLabel: "Find Hotels",
    gradient: "from-red-400 to-rose-600",
    icon: "🏩",
  },
  {
    name: "Hotels.com",
    category: "Hotels + Rewards",
    description: "Earn free nights through the One Key rewards program. Large inventory with price-match guarantee.",
    bestFor: "Travelers who visit regularly and want to earn free nights over time.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Hotels.com affiliate link
    ctaLabel: "Browse Hotels",
    gradient: "from-orange-400 to-red-500",
    icon: "🔑",
  },
];

const HOSTELS = [
  {
    name: "Hostelworld",
    category: "Budget Hostels",
    description: "The world's #1 hostel booking platform. Verified reviews, private and dorm rooms, and the largest hostel inventory worldwide.",
    bestFor: "Budget travelers and solo visitors who want affordable, social accommodation.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Hostelworld affiliate link
    ctaLabel: "Find Hostels",
    gradient: "from-amber-400 to-orange-500",
    icon: "🛏️",
  },
  {
    name: "Agoda (Budget Stays)",
    category: "Budget Rooms",
    description: "Agoda lists budget guesthouses, small hotels, and cheap private rooms that don't appear on traditional hostel platforms.",
    bestFor: "Budget travelers who want private rooms at hostel prices.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Agoda affiliate link
    ctaLabel: "Find Budget Stays",
    gradient: "from-lime-400 to-green-600",
    icon: "🏡",
  },
];

const CAR_RENTALS = [
  {
    name: "DiscoverCars",
    category: "Car Rental Comparison",
    description: "Compares car rental prices from all major companies in one search. Full coverage insurance options and transparent pricing.",
    bestFor: "Finding the best car rental deal with full insurance coverage.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with DiscoverCars affiliate link
    ctaLabel: "Compare Cars",
    gradient: "from-sky-400 to-blue-600",
    icon: "🚗",
  },
  {
    name: "Rentalcars.com",
    category: "Car Rental",
    description: "Over 900 car rental locations globally. Backed by Booking.com — reliable pricing and customer support.",
    bestFor: "Reliable international car rental with broad global availability.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Rentalcars.com affiliate link
    ctaLabel: "Search Rentals",
    gradient: "from-indigo-400 to-violet-600",
    icon: "🚙",
  },
  {
    name: "EconomyBookings",
    category: "Budget Car Rental",
    description: "Budget-focused car rental comparison. Great for finding low-cost rental deals in Latin America and Eastern Europe.",
    bestFor: "Budget-conscious travelers needing affordable rental options.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with EconomyBookings affiliate link
    ctaLabel: "Find Deals",
    gradient: "from-emerald-400 to-teal-600",
    icon: "🚘",
  },
];

const INSURANCE = [
  {
    name: "SafetyWing",
    category: "Travel Medical Insurance",
    description: "Flexible monthly travel medical insurance. Subscribe and cancel anytime. Covers emergency medical, hospitalization, and evacuation.",
    bestFor: "Budget-conscious travelers who want solid medical coverage without long commitments.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with SafetyWing affiliate link (safetywing.com partner)
    ctaLabel: "Get Coverage",
    gradient: "from-teal-400 to-emerald-600",
    icon: "🛡️",
    sponsored: true,
  },
  {
    name: "VisitorsCoverage",
    category: "Insurance Comparison",
    description: "Compare multiple travel insurance plans side by side. Medical, trip cancellation, and comprehensive options from leading insurers.",
    bestFor: "Comparing multiple insurance plans to find the right coverage for your trip.",
    priceLevel: "Varies" as const,
    href: "#affiliate-placeholder", // TODO: Replace with VisitorsCoverage affiliate link
    ctaLabel: "Compare Plans",
    gradient: "from-blue-400 to-indigo-600",
    icon: "📋",
  },
  {
    name: "World Nomads",
    category: "Adventure Travel Insurance",
    description: "Comprehensive travel insurance including adventure activities, gear, and trip cancellation. Trusted by National Geographic and Lonely Planet.",
    bestFor: "Travelers planning adventure activities, tours, or extended travel.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with World Nomads affiliate link
    ctaLabel: "Get a Quote",
    gradient: "from-rose-400 to-red-600",
    icon: "🌍",
  },
];

const ESIMS = [
  {
    name: "Airalo",
    category: "eSIM",
    description: "The world's first and largest eSIM marketplace. Digital SIM cards for 200+ countries — activate before departure, no physical card needed.",
    bestFor: "Travelers with eSIM-compatible phones who want instant connectivity abroad.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Airalo affiliate link
    ctaLabel: "Get an eSIM",
    gradient: "from-violet-400 to-purple-600",
    icon: "📱",
    sponsored: true,
  },
  {
    name: "Holafly",
    category: "Unlimited Data eSIM",
    description: "Unlimited data eSIM plans for travelers. Simple setup, good coverage in Latin America and Europe.",
    bestFor: "Travelers who need unlimited data and want simple, predictable pricing.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Holafly affiliate link
    ctaLabel: "Buy eSIM",
    gradient: "from-pink-400 to-rose-600",
    icon: "🔗",
  },
  {
    name: "Nomad",
    category: "Travel eSIM",
    description: "Affordable data plans for travelers in 100+ countries. Pay only for what you need — no monthly commitment.",
    bestFor: "Short-trip travelers who want affordable data without an unlimited plan.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Nomad eSIM affiliate link
    ctaLabel: "Get Connected",
    gradient: "from-amber-400 to-orange-600",
    icon: "🌐",
  },
];

const TOURS = [
  {
    name: "Viator",
    category: "Tours & Experiences",
    description: "The largest tours and activities platform. Thousands of verified experiences in every country — day trips, cultural tours, food tours, and more.",
    bestFor: "Finding and booking local tours and activities in any destination worldwide.",
    priceLevel: "Varies" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Viator affiliate link
    ctaLabel: "Browse Tours",
    gradient: "from-orange-400 to-red-500",
    icon: "🗺️",
  },
  {
    name: "GetYourGuide",
    category: "Activities & Day Trips",
    description: "Instant booking for tours, museums, and experiences worldwide. Excellent cancellation policies and verified operator reviews.",
    bestFor: "Booking popular tourist activities, skip-the-line tickets, and guided tours.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with GetYourGuide affiliate link
    ctaLabel: "Find Activities",
    gradient: "from-yellow-400 to-amber-600",
    icon: "🎫",
  },
  {
    name: "Klook",
    category: "Asia & Budget Tours",
    description: "Particularly strong for Southeast Asia experiences. Budget-friendly tours, attraction tickets, and transportation passes.",
    bestFor: "Tours and activities in Southeast Asia and Asia-Pacific at budget-friendly prices.",
    priceLevel: "Budget" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Klook affiliate link
    ctaLabel: "Book Activities",
    gradient: "from-rose-400 to-pink-600",
    icon: "🎪",
  },
];

const VISA_HELP = [
  {
    name: "iVisa",
    category: "eVisa Service",
    description: "Online visa and travel authorization application service. Process tourist visas, eTAs, and travel documents for 150+ countries.",
    bestFor: "Travelers who need a visa and want a guided, simplified application process.",
    priceLevel: "Mid-range" as const,
    href: "#affiliate-placeholder", // TODO: Replace with iVisa affiliate link
    ctaLabel: "Check Visa Requirements",
    gradient: "from-blue-400 to-indigo-600",
    icon: "📄",
  },
  {
    name: "Sherpa",
    category: "Visa Requirement Checker",
    description: "Free visa requirement checker used by airlines. Enter your passport and destination — get instant entry requirements.",
    bestFor: "Quickly checking whether you need a visa before booking flights.",
    priceLevel: "Free" as const,
    href: "#affiliate-placeholder", // TODO: Replace with Sherpa affiliate link
    ctaLabel: "Check Requirements Free",
    gradient: "from-teal-400 to-cyan-600",
    icon: "🔍",
  },
  {
    name: "VisaHQ",
    category: "Visa Processing Service",
    description: "Professional visa processing with dedicated agents. Handles the paperwork for complex visa applications including Africa and Asia.",
    bestFor: "Complex visa applications requiring professional assistance and document handling.",
    priceLevel: "Premium" as const,
    href: "#affiliate-placeholder", // TODO: Replace with VisaHQ affiliate link
    ctaLabel: "Get Visa Help",
    gradient: "from-amber-400 to-orange-600",
    icon: "🏛️",
  },
];

// ── Country selector data ─────────────────────────────────────────────────────

const REGION_MAP: Record<string, string[]> = {
  "Central America": ["mexico", "el-salvador", "guatemala", "honduras", "belize", "nicaragua", "costa-rica", "panama"],
  Caribbean: ["jamaica", "dominican-republic", "haiti", "cuba", "bahamas", "trinidad-and-tobago"],
  "South America": ["colombia", "venezuela", "brazil", "peru", "ecuador", "guyana"],
  "Southeast Asia": ["laos", "cambodia", "vietnam", "philippines", "thailand", "myanmar", "indonesia"],
  "South & East Asia": ["nepal", "india", "pakistan", "bangladesh", "china"],
  Africa: ["nigeria", "ghana", "liberia", "cameroon", "ethiopia", "somalia", "sierra-leone"],
  Europe: ["united-kingdom", "romania", "albania", "poland", "ukraine", "russia"],
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FamilyVisitTravelPage() {
  const countries = allCountries;

  return (
    <main className="bg-white text-gray-900">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Family Visit Travel</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Plan a Visit to Your Loved One
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            A practical travel guide for family and friends visiting someone rebuilding life after deportation.
            Compare flights, hotels, hostels, car rentals, visa information, travel insurance, tours, and local transportation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* TODO: Replace with real affiliate tracking links for each CTA */}
            <a href="#flights" className="bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              ✈️ Compare Flights
            </a>
            <a href="#hotels" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              🏨 Find Hotels
            </a>
            <a href="#visa-help" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              📄 Check Visa Rules
            </a>
            <a href="#budget-tool" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              💰 Estimate Budget
            </a>
          </div>
        </div>
      </section>

      {/* ── Affiliate Disclosure ──────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-800 text-xs leading-relaxed text-center">
            <strong>Disclosure:</strong> Some links on this page may be affiliate links. We may earn a commission at no extra cost to you — this helps support Deported Not Defeated.
            Travel, visa, and safety information is educational only and should be verified with official sources before booking.
          </p>
        </div>
      </div>

      {/* ── Country Selector ──────────────────────────────────────── */}
      <section id="countries" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Country Guides</p>
            <h2 className="text-2xl font-extrabold text-navy-800 mb-2">Choose the Country You Are Visiting</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Each country guide includes airports, hotels, transportation, visa rules, safety tips, and suggested tours.
            </p>
          </div>

          {/* Region grid — links to each country page where CountryVisitSection is embedded */}
          {Object.entries(REGION_MAP).map(([region, slugs]) => {
            const regionCountries = countries.filter((c) => slugs.includes(c.slug));
            if (!regionCountries.length) return null;
            return (
              <div key={region} className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-1">{region}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {regionCountries.map((country) => (
                    <Link
                      key={country.slug}
                      href={`/${country.slug}`}
                      className="group bg-white border border-gray-200 hover:border-brand-red/40 rounded-xl p-3 flex items-center gap-3 transition-all hover:shadow-md"
                    >
                      <span className="text-2xl">{country.flagEmoji}</span>
                      <div className="min-w-0">
                        <p className="text-navy-800 font-semibold text-sm group-hover:text-brand-red transition-colors truncate">
                          {country.countryName}
                        </p>
                        {countryVisitData[country.slug] && (
                          <p className="text-gray-400 text-xs truncate">{countryVisitData[country.slug].currency.split(" — ")[0]}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Flights ───────────────────────────────────────────────── */}
      <section id="flights" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
              ✈️
            </div>
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">Step One</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Find Your Flight</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                Always check visa requirements before booking. Compare prices across platforms — prices vary significantly by date and booking window.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FLIGHTS.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Hotels ────────────────────────────────────────────────── */}
      <section id="hotels" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
              🏨
            </div>
            <div>
              <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-1">Accommodation</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Hotels & Accommodation</h2>
              <p className="text-gray-500 text-sm mt-1">Stay near family when safe. Book flexible cancellation rates when possible.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {HOTELS.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>

          {/* Budget Hostels subsection */}
          <div className="flex items-start gap-4 mb-6 mt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shrink-0 text-2xl shadow-md">
              🛏️
            </div>
            <div>
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-1">Budget Option</p>
              <h3 className="text-xl font-extrabold text-navy-800">Budget Hostels</h3>
              <p className="text-gray-500 text-sm mt-1">Many hostels offer private rooms for families at a fraction of hotel prices.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HOSTELS.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Car Rentals ───────────────────────────────────────────── */}
      <section id="car-rental" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
              🚗
            </div>
            <div>
              <p className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-1">Ground Transport</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Car Rentals</h2>
              <p className="text-gray-500 text-sm mt-1">
                An international driver's license is often required. Always check local insurance requirements.
                Avoid night driving in unfamiliar areas.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAR_RENTALS.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Travel Insurance ──────────────────────────────────────── */}
      <section id="insurance" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
              🛡️
            </div>
            <div>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-1">Protect Your Trip</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Travel Insurance</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                Medical emergencies abroad can cost tens of thousands of dollars without coverage. Travel insurance is not optional — it is essential.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INSURANCE.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── eSIM ──────────────────────────────────────────────────── */}
      <section id="esim" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
              📱
            </div>
            <div>
              <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-1">Stay Connected</p>
              <h2 className="text-2xl font-extrabold text-navy-800">eSIM & Phone Service</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                An eSIM lets you have local data on your phone as soon as you land — no physical SIM, no roaming fees.
                Check that your phone is eSIM-compatible before purchasing.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ESIMS.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Tours ─────────────────────────────────────────────────── */}
      <section id="tours" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shrink-0 text-3xl shadow-md">
              🗺️
            </div>
            <div>
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-1">Experiences</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Tours & Activities</h2>
              <p className="text-gray-500 text-sm mt-1">
                A shared cultural experience with your loved one creates lasting memories. Book tours you can do together.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOURS.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Visa Rules ────────────────────────────────────────────── */}
      <section id="visa-help" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shrink-0 text-3xl shadow-md">
              📄
            </div>
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">Entry Requirements</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Visa Rules and Entry Requirements</h2>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <p className="text-amber-900 text-sm leading-relaxed">
              <strong>⚠️ Important:</strong> Visa and entry requirements change frequently and vary by your citizenship,
              destination country, and travel purpose. Always verify your specific requirements through the official embassy,
              consulate, or government immigration website <strong>before</strong> purchasing flights or hotels.
              Do not rely solely on third-party services or this page for legal entry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {VISA_HELP.map((p) => <TravelProviderCard key={p.name} {...p} />)}
          </div>

          {/* Quick visa facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "No Visa Needed", desc: "US passport holders can enter most of Latin America, Southeast Asia, and Western Europe without a visa — just a valid passport.", icon: "✅" },
              { title: "eVisa Available", desc: "Countries like Vietnam, Cambodia, Kenya, and India offer online eVisa applications — apply before departure.", icon: "💻" },
              { title: "Visa on Arrival", desc: "Some countries issue tourist visas at the airport. Have passport photos, USD cash, and your accommodation details ready.", icon: "🛬" },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <p className="text-2xl mb-2">{icon}</p>
                <p className="font-bold text-navy-800 text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Budget Calculator ─────────────────────────────────────── */}
      <section id="budget-tool" className="py-14 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Planning Tool</p>
            <h2 className="text-2xl font-extrabold text-white mb-2">Estimate Your Visit Budget</h2>
            <p className="text-gray-400 text-sm">Get a rough cost range for accommodation, food, transport, and extras. Flights are not included.</p>
          </div>
          <TravelBudgetCalculator />
        </div>
      </section>

      {/* ── Checklist ─────────────────────────────────────────────── */}
      <section id="checklist" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Trip Preparation</p>
            <h2 className="text-2xl font-extrabold text-navy-800 mb-2">Family Visit Checklist</h2>
            <p className="text-gray-500 text-sm">Use this checklist to prepare at each stage of your trip.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                phase: "Before Booking",
                icon: "📋",
                color: "from-blue-400 to-indigo-600",
                items: [
                  "Check passport validity (6+ months)",
                  "Review visa requirements for destination",
                  "Compare flight prices across platforms",
                  "Confirm accommodation area with family",
                  "Arrange airport pickup in advance",
                  "Purchase travel insurance",
                  "Check US State Department travel advisory",
                ],
              },
              {
                phase: "Before Departure",
                icon: "🧳",
                color: "from-amber-400 to-orange-600",
                items: [
                  "Save all emergency contacts to phone",
                  "Download offline maps (Google Maps)",
                  "Set up eSIM or roaming plan",
                  "Make copies of all travel documents",
                  "Notify bank of travel dates and country",
                  "Bring some local currency (or plan ATM)",
                  "Pack medicines you may need",
                  "Register trip with US Embassy (STEP program)",
                ],
              },
              {
                phase: "After Arrival",
                icon: "🛬",
                color: "from-emerald-400 to-teal-600",
                items: [
                  "Use official taxis or Uber/Grab only",
                  "Keep passport secure at all times",
                  "Confirm eSIM or local SIM is working",
                  "Share your location with someone at home",
                  "Verify accommodation is what was booked",
                  "Coordinate plans with your loved one",
                  "Avoid carrying large amounts of cash",
                  "Research nearby hospital / clinic location",
                ],
              },
            ].map(({ phase, icon, color, items }) => (
              <div key={phase} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className={`bg-gradient-to-r ${color} px-5 py-4 flex items-center gap-3`}>
                  <span className="text-2xl">{icon}</span>
                  <h3 className="text-white font-bold text-base">{phase}</h3>
                </div>
                <ul className="p-5 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency & Safety ────────────────────────────────────── */}
      <section id="safety" className="py-14 px-4 bg-navy-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Stay Safe</p>
            <h2 className="text-2xl font-extrabold text-white mb-2">Emergency and Safety Guidance</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Preparation prevents most travel emergencies. Know your resources before you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: "🏛️", title: "Register with Embassy", desc: "Enroll in the US Smart Traveler Enrollment Program (STEP) at step.state.gov — free and takes 5 minutes." },
              { icon: "📄", title: "Copy Documents", desc: "Keep digital and physical copies of your passport, insurance policy, and accommodation bookings. Store separately from originals." },
              { icon: "🚕", title: "Trusted Transport", desc: "Use app-based rides (Uber, Grab, Bolt, Careem) in every country. Avoid unmarked taxis — especially from airports." },
              { icon: "🔒", title: "Personal Security", desc: "Avoid displaying expensive phones, jewelry, or cameras in public. Keep a minimal wallet. Use hotel safes for valuables." },
              { icon: "🏥", title: "Know Medical Resources", desc: "Research the nearest quality hospital or clinic to where you are staying before you need it." },
              { icon: "👥", title: "Share Itinerary", desc: "Give a trusted person at home your full itinerary — hotel name, address, and check-in/check-out dates." },
              { icon: "💊", title: "Travel Insurance", desc: "Purchase travel insurance before departure — emergency medical evacuation can cost $50,000+ without coverage." },
              { icon: "💵", title: "Carry Safe Cash", desc: "Carry only what you need each day. Keep emergency funds separate (a hidden money belt or a secondary card)." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gray-800/50 border border-white/10 rounded-2xl p-4">
                <p className="text-2xl mb-2">{icon}</p>
                <p className="text-white font-bold text-sm mb-1">{title}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-red/10 border border-brand-red/30 rounded-2xl p-5">
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-brand-red">Emergency contacts to save before departure:</strong>{" "}
              US Embassy in destination country • Local police emergency number • Your travel insurance 24/7 emergency line •
              Your hotel front desk • Your family member's phone number and a neighbor's number as backup.
            </p>
          </div>
        </div>
      </section>

      {/* ── Email Capture ─────────────────────────────────────────── */}
      <section id="email-capture" className="py-14 px-4 bg-navy-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Free Resource</p>
          <h2 className="text-2xl font-extrabold text-white mb-3">Get the Free Family Visit Travel Checklist</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
            Enter your details and we&apos;ll send you a printable family visit checklist, country-specific tips, and updates on the best travel deals.
          </p>
          {/* TODO: Connect FamilyVisitEmailForm to /api/subscribe or email marketing provider */}
          <FamilyVisitEmailForm />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">Questions</p>
            <h2 className="text-2xl font-extrabold text-navy-800 mb-2">Frequently Asked Questions</h2>
          </div>
          <FamilyVisitFAQ />
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="bg-brand-red py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Plan Your Visit?</h2>
          <p className="text-white/90 mb-6 text-base leading-relaxed">
            Compare flights, find accommodation, get travel insurance, and download your checklist — all in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#flights" className="inline-block bg-white text-brand-red font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm">
              ✈️ Compare Flights
            </a>
            <a href="#countries" className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
              🌍 Choose Your Country
            </a>
          </div>
        </div>
      </section>

      {/* ── Legal Disclaimer ──────────────────────────────────────── */}
      <section className="bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 border border-white/10 rounded-xl p-5">
            <p className="text-gray-400 text-xs leading-relaxed">
              <strong className="text-gray-300">Affiliate & Information Disclaimer:</strong> Some links on this page are affiliate links.
              We may earn a commission at no extra cost to you — this helps support Deported Not Defeated&apos;s free resources.
              Travel, visa, and safety information on this page is for general educational purposes only and should be verified
              through official embassy, consulate, or government immigration websites before making any travel decisions.
              Deported Not Defeated is not a travel agency, visa service, or legal advisor.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
