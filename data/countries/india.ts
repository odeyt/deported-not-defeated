import type { CountryData } from "./schema";

const india: CountryData = {
  slug: "india",
  countryName: "India",
  countryCode: "IN",
  flagEmoji: "🇮🇳",
  region: "Asia",
  capital: "New Delhi",
  languages: ["Hindi", "English", "and 21 other official languages"],
  currency: "Indian Rupee (INR)",
  summary:
    "India is the world's most populous country and one of its largest economies. English is an official language used in government, education, and business, giving Indian-American deportees a significant communication advantage. India has a large, diverse economy with strong IT, services, and manufacturing sectors. Deportees often have family connections across states from Punjab and Gujarat to Kerala and Tamil Nadu. India's vast size means the experience varies enormously by region and city.",
  heroTitle: "Deported to India: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, healthcare, and work resources for deportees rebuilding life in India.",
  cities: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
  quickFacts: [
    { label: "Capital", value: "New Delhi" },
    { label: "Languages", value: "Hindi, English + 21 official regional languages" },
    { label: "Currency", value: "Indian Rupee (INR)" },
    { label: "Emergency Number", value: "112 (Unified Emergency)" },
    { label: "U.S. Embassy", value: "New Delhi (Shantipath, Chanakyapuri)" },
    { label: "Time Zone", value: "UTC+5:30 (IST — no daylight saving)" },
  ],
  returningHome: [
    "Indian citizens returning after deportation arrive at a major international airport — immigration authorities process return.",
    "Obtain your Aadhaar card at any Aadhaar enrollment center — this is India's primary biometric national ID.",
    "A PAN card (Permanent Account Number from Income Tax Department) is required for banking and financial transactions.",
    "Contact your state's Social Welfare Department for any available reintegration programs.",
    "Family networks across India vary by state and community — connecting with your home community is the primary initial support system.",
  ],
  travelDocuments: [
    "Aadhaar is India's biometric national ID — enroll at any India Post office or authorized enrollment center.",
    "An Indian passport is available through Passport Seva Kendra offices once you have an Aadhaar and proof of address.",
    "Birth certificates are issued by municipal corporations (Nagar Palika) — request at your local BMC, MCGM, or equivalent body.",
    "If returning without documentation, contact the Indian Embassy or nearest Foreigners Regional Registration Office (FRRO) upon arrival.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for India for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "India's housing market is enormously varied by city and neighborhood — Mumbai's suburbs and peripheral areas (Navi Mumbai, Thane, Vasai) offer basic 1BHK apartments from INR 7,000–15,000/month.",
    "Delhi's outer areas (Noida, Gurgaon outskirts, Faridabad) have affordable rentals from INR 6,000–12,000/month.",
    "Bangalore (Bengaluru) is India's IT capital — Outer Ring Road areas and North Bangalore offer rents from INR 8,000–15,000/month.",
    "99acres.com, MagicBricks, and NoBroker are the main rental platforms in India.",
    "Returning to family home in your home state or village is often the most immediate and affordable option.",
  ],
  jobs: [
    "India's IT sector (Bangalore, Hyderabad, Pune, Chennai) is among the world's largest — tech experience from the U.S. is highly valued.",
    "BPO and call center work is extremely large in India — English-speaking returnees with U.S. cultural knowledge are competitive candidates.",
    "Naukri.com, Indeed India, and LinkedIn are the main formal job portals.",
    "Manufacturing, construction, and agriculture employ millions across India.",
    "Gig economy work (Swiggy, Zomato delivery; Ola/Uber driving) provides accessible informal income in urban areas.",
  ],
  healthcare: [
    "Ayushman Bharat (Pradhan Mantri Jan Arogya Yojana) provides free hospitalization for low-income families — check eligibility at your health center.",
    "Government hospitals (AIIMS, state government hospitals) provide free or subsidized care for citizens.",
    "ESI (Employees' State Insurance) covers formal sector workers — employer enrollment required.",
    "Private hospitals (Apollo, Fortis, Manipal) offer high-quality care but at significant cost.",
    "Jan Aushadhi generic pharmacies provide essential medications at very low prices across India.",
  ],
  mentalHealth: [
    "NIMHANS (National Institute of Mental Health and Neurosciences) in Bangalore is India's premier mental health institution.",
    "iCall (iCall.in) provides free or low-cost telephone and online counseling across India.",
    "Government hospital psychiatry departments provide public mental health services.",
    "iYOGA and traditional Ayurvedic wellness practices are widely available across India.",
    "The Indian Association for Social Psychiatry (IASP) can refer to community mental health resources.",
  ],
  moneyTransfer: [
    "Wise, Remitly, and Western Union all operate in India — bank transfers and cash pickups available.",
    "UPI (Unified Payments Interface) is India's real-time payment system — link a bank account to PhonePe, Google Pay, or BHIM for instant transfers.",
    "SBI, HDFC, ICICI, and Axis Bank are major banks for account opening — requires Aadhaar and PAN.",
    "Paytm Payments Bank and Airtel Payments Bank offer basic accounts with easier registration requirements.",
    "SWIFT wire transfers to Indian bank accounts work well for larger amounts from the U.S.",
  ],
  phoneInternet: [
    "Jio (Reliance) has disrupted the Indian telecom market with very affordable data — SIM available at Jio stores.",
    "Airtel and Vi (Vodafone Idea) are the other major carriers.",
    "SIM cards require Aadhaar for KYC — without Aadhaar, registration may be delayed.",
    "Jio's 5G network is expanding rapidly — 4G is available virtually everywhere in India.",
    "Home fiber from JioFiber or Airtel Xstream typically costs INR 399–1,499/month for high-speed connections.",
  ],
  transportation: [
    "Mumbai's local trains (Western, Central, Harbor lines) are the backbone of city transport — fares from INR 5–25.",
    "Delhi Metro is extensive — 12 lines serving the NCR for INR 10–60.",
    "Auto rickshaws and app-based rides (Ola, Uber) are available in all major cities.",
    "Indian Railways connects all major cities — IRCTC app for ticket booking.",
    "Low-cost airlines (IndiGo, Air India Express, SpiceJet) make intercity travel affordable — often cheaper than trains for long distances.",
  ],
  legalResources: [
    "Legal Services Authority (DLSA at district level, SLSA at state level) provides free legal aid to qualifying individuals.",
    "Bar Council of India can refer to private attorneys.",
    "National Human Rights Commission (NHRC) investigates rights violations.",
    "UNHCR India has engagement for certain protection situations.",
    "Law school clinics at NLUs (National Law Universities) provide pro bono services.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "India has large diaspora legal communities in cities like Edison, NJ and Fremont, CA — Indian-American attorneys may offer consultations.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "Consult a U.S. immigration attorney about waiver options — the large Indian-American legal community may know specific resources.",
  ],
  faqs: [
    {
      question: "What is Aadhaar and why is it so important?",
      answer:
        "Aadhaar is India's biometric national ID — a 12-digit number linked to your fingerprints and iris scan. It is used for virtually everything: banking, SIM registration, government benefits, tax filing, and property registration. Getting your Aadhaar enrolled as soon as you arrive is the most important administrative priority.",
    },
    {
      question: "What is UPI and how does it transform daily transactions?",
      answer:
        "UPI (Unified Payments Interface) is India's real-time payment system that allows instant bank-to-bank transfers using just a phone number or QR code. Apps like PhonePe, Google Pay, and Paytm all use UPI. Once you have a bank account linked to UPI, you can pay for virtually anything in India instantly — from street food to utility bills.",
    },
    {
      question: "Is India's IT sector accessible to returning Indian-Americans?",
      answer:
        "Yes — U.S. work experience in technology, particularly from Silicon Valley or tech-adjacent roles, is highly valued by Indian IT companies and startups. Bangalore, Hyderabad, Pune, and Chennai all have thriving tech ecosystems. Returnees with strong English and U.S. tech culture familiarity are often preferred for roles serving U.S. or global clients.",
    },
    {
      question: "Which state and city should I settle in?",
      answer:
        "This depends on your family connections, language skills, and career goals. If you have family in Punjab, Gujarat, Kerala, or Tamil Nadu, return to your home state first. For IT careers, Bangalore and Hyderabad are top choices. For finance, Mumbai. For government services, Delhi. Each state also has different local languages — your home state language is a significant daily-life advantage.",
    },
    {
      question: "How do I access free healthcare through Ayushman Bharat?",
      answer:
        "Ayushman Bharat covers hospitalization costs up to INR 5 lakh/year for eligible low-income families at empanelled government and private hospitals. Check eligibility at the nearest Ayushman Bharat center or via the PM-JAY website. You will need Aadhaar and income/ration card documentation. For primary care, government health centers (PHC) are free for all citizens.",
    },
  ],
  seoTitle: "Deported to India: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to India. Aadhaar, Ayushman Bharat healthcare, IT jobs, and housing in Mumbai, Delhi, and Bangalore.",
  keywords: [
    "deported to India",
    "India deportee guide",
    "Aadhaar India national ID",
    "Mumbai Delhi housing deportee",
    "India IT jobs returnee",
    "Jio Airtel SIM India",
    "Ayushman Bharat healthcare",
  ],
  relatedCountries: ["pakistan", "bangladesh", "nepal"],
  firstThirtyDays: [
    "Arrive at Indira Gandhi International Airport (Delhi) or Chhatrapati Shivaji (Mumbai) — immigration processes returning Indian nationals",
    "Get a Jio, Airtel, or Vi (Vodafone Idea) SIM at the airport or any authorized outlet — requires your Aadhaar or passport",
    "Contact family networks in your home state — Indian regional, caste, and linguistic community ties are essential support",
    "Visit the nearest Aadhaar Seva Kendra to update your Aadhaar card (biometric national ID) — foundational document for all services",
    "Your Aadhaar is linked to bank accounts, SIM cards, healthcare, and government services — top priority",
    "Open a bank account at State Bank of India (SBI), Punjab National Bank, or any public sector bank using your Aadhaar",
    "Register with the nearest employment exchange or use the National Career Service (NCS) portal for job placement",
    "Enroll in Ayushman Bharat (PM-JAY) if eligible for free public healthcare coverage",
  ],
  businessDirectory: [
    "Aadhaar Seva Kendra — Aadhaar card update and biometric re-enrollment centers",
    "State Bank of India (SBI) branches — banking with Aadhaar documentation nationwide",
    "Jio and Airtel stores — SIM cards and mobile data plans",
    "National Career Service (NCS) portal — online job placement and employment exchanges",
    "Pradhan Mantri Jan Dhan Yojana centers — zero-balance bank account program for low-income citizens",
    "Ayushman Bharat (PM-JAY) enrollment centers — free public healthcare for qualifying families",
  ],
};

export default india;
