import type { CountryData } from "./schema";

const philippines: CountryData = {
  slug: "philippines",
  countryName: "Philippines",
  countryCode: "PH",
  flagEmoji: "🇵🇭",
  region: "Asia",
  capital: "Manila",
  languages: ["Filipino", "English"],
  currency: "Philippine Peso (PHP)",
  summary:
    "The Philippines is a Southeast Asian archipelago nation of over 7,600 islands where English is an official language co-equal with Filipino. This makes it one of the more linguistically accessible Asian countries for U.S. deportees. The country has a massive diaspora in the U.S. (the largest Asian-American group in many West Coast cities), and many deportees have family networks across the islands. Manila is the chaotic, dense capital, while cities like Cebu and Davao offer alternatives.",
  heroTitle: "Deported to Philippines: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and resources for deportees rebuilding life in the Philippines.",
  cities: ["Manila", "Cebu City", "Davao", "Quezon City"],
  quickFacts: [
    { label: "Capital", value: "Manila" },
    { label: "Languages", value: "Filipino (Tagalog), English" },
    { label: "Currency", value: "Philippine Peso (PHP)" },
    { label: "Emergency Number", value: "911" },
    { label: "U.S. Embassy", value: "Manila (1201 Roxas Boulevard, Ermita)" },
    { label: "Time Zone", value: "UTC+8 (Philippine Standard Time)" },
  ],
  returningHome: [
    "Deportation flights to the Philippines arrive at Ninoy Aquino International Airport (NAIA) in Manila — Bureau of Immigration and local contacts process arriving nationals.",
    "Obtain your Philippine Identification (PhilSys ID) or passport through PSA (Philippine Statistics Authority) — required for all formal activities.",
    "The Overseas Workers Welfare Administration (OWWA) and DFA (Department of Foreign Affairs) have programs for returning overseas Filipinos.",
    "BALIBALIK Center, a coalition of Filipino-American organizations, advocates for deported Filipinos.",
    "English is an official language — the transition to daily life is linguistically easier than in other Asian deportation destinations.",
  ],
  travelDocuments: [
    "A Philippine passport is the primary travel document — apply at any DFA office with your PSA birth certificate.",
    "The PhilSys ID (national ID) is available at PSA satellite registration centers.",
    "PSA birth certificates (formerly NSO) are available at PSA offices or online via PSAHelpline.ph.",
    "If your birth was not registered, PSA has a late registration process.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for the Philippines for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Manila and Metro Manila have housing across all price ranges — basic rooms in cities like Caloocan or Valenzuela may run PHP 3,000–8,000/month.",
    "Cebu City offers more affordable living than Manila — basic apartments start around PHP 5,000–12,000/month.",
    "Davao in Mindanao is affordable with lower crime — popular for those with family in southern Philippines.",
    "Lamudi.ph and Property24 Philippines list rental properties — Facebook Marketplace is also widely used.",
    "Many Filipinos live in extended family compounds (bahay-bahayan) — returning to family is often the easiest initial housing.",
  ],
  jobs: [
    "The BPO (Business Process Outsourcing) industry is one of the Philippines' largest — English-speaking workers are in constant demand in Metro Manila, Cebu, and Davao.",
    "English-medium education creates demand for tutors and teachers.",
    "Jobstreet.com, Kalibrr, and LinkedIn Philippines are the main formal job portals.",
    "The gig economy (Grab, Angkas motorbike delivery, freelance platforms) provides accessible income.",
    "OFW (Overseas Filipino Worker) return programs may offer job placement assistance for returning nationals.",
  ],
  healthcare: [
    "PhilHealth (Philippine Health Insurance Corporation) provides public health insurance — enroll with your PSA birth certificate.",
    "Government hospitals (Philippine General Hospital, Lung Center) provide free or subsidized care for PhilHealth members.",
    "Barangay Health Centers provide free primary care at the neighborhood level.",
    "Private hospitals (St. Luke's, The Medical City) offer higher-quality care for those with means.",
    "Pharmacies (Mercury Drug, Watsons, Rose Pharmacy) are ubiquitous — generic medications are very affordable.",
  ],
  mentalHealth: [
    "National Center for Mental Health (NCMH) in Mandaluyong provides public psychiatric services.",
    "Barangay health workers and social workers provide community-level mental health support.",
    "The Mental Health Act of 2018 expanded public mental health services — ask at your barangay health center.",
    "Pastoral counseling through Catholic, Iglesia ni Cristo, and other church communities is widely available.",
    "Filipino-American community organizations in the U.S. may provide remote peer support for deportee families.",
  ],
  moneyTransfer: [
    "Western Union, Remitly, Wise, and dozens of other services operate in the Philippines — one of the most competitive remittance markets in the world.",
    "GCash and Maya (PayMaya) are the Philippines' main mobile wallets — widely accepted for receiving transfers and making payments.",
    "BDO, BPI, and Metrobank are the major banks for account opening — requires valid ID.",
    "Palawan Pawnshop and Cebuana Lhuillier are agent networks for cash pickup with thousands of locations.",
    "Remittance shops (padala centers) are in nearly every barangay for cash transfers.",
  ],
  phoneInternet: [
    "Globe and Smart (PLDT subsidiary) are the two main mobile carriers — TNT (under Smart) and TM (under Globe) are budget options.",
    "SIM cards cost PHP 40–100 at any convenience store or carrier outlet.",
    "Prepaid data plans from Globe or Smart start around PHP 99–299/month for basic packages.",
    "4G coverage is widespread in Luzon, Visayas, and Mindanao major cities — 5G rolling out in Metro Manila.",
    "Home fiber from Globe At Home or PLDT typically costs PHP 1,299–2,499/month.",
  ],
  transportation: [
    "Jeepneys are the iconic Filipino public transit — routes serve most Metro Manila neighborhoods for PHP 13+.",
    "Metro Manila has LRT (Line 1, 2) and MRT (Line 3) for rail transit.",
    "Grab operates in Metro Manila, Cebu, and Davao for reliable ride-hailing.",
    "Tricycles (motorcycle with sidecar) are the main local transport in provincial cities and towns.",
    "Intercity buses and ferries connect the islands — 2GO Travel handles inter-island ferry service.",
  ],
  legalResources: [
    "Public Attorney's Office (PAO) provides free legal services to qualifying low-income Filipinos.",
    "Integrated Bar of the Philippines (IBP) can refer to attorneys for civil and family matters.",
    "UNHCR has a presence in the Philippines for protection matters.",
    "Commission on Human Rights (CHR) investigates rights violations.",
    "BALIBALIK and Filipino Advocates for Justice in the U.S. advocate for deported Filipinos.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Some Filipino deportees hold U.S. citizenship — those individuals can return to the U.S. legally.",
    "Filipino Advocates for Justice, BALIBALIK, and CLINIC may provide post-deportation legal resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "The large Filipino-American community means community legal clinics exist in cities like Los Angeles, San Francisco, and Daly City.",
  ],
  faqs: [
    {
      question: "Do I need to speak Filipino (Tagalog) to live in the Philippines?",
      answer:
        "No — English is an official language used in schools, business, courts, and government. In Manila and major cities, English is spoken daily. In provincial areas, local languages (Cebuano, Ilocano, Hiligaynon, etc.) are more common than Tagalog. Most Filipinos speak enough English to communicate with you.",
    },
    {
      question: "What is GCash and how does it help with daily life?",
      answer:
        "GCash is the Philippines' most popular mobile wallet with over 90 million users. Once registered with a Philippine ID, you can receive money transfers, pay bills, shop online, send money to family, and access basic financial services — all from your smartphone. It is accepted at most convenience stores, supermarkets, and online platforms.",
    },
    {
      question: "What is PhilHealth and how do I enroll?",
      answer:
        "PhilHealth is the government's health insurance system. Informal sector members (those not employed by a company) can enroll individually by visiting any PhilHealth office with a birth certificate. Premium contributions are income-based and can be very low. PhilHealth significantly reduces out-of-pocket hospital costs.",
    },
    {
      question: "Is the BPO sector a realistic option for a deportee with limited Filipino language?",
      answer:
        "Yes — the BPO industry specifically values native-level U.S. English accents. Many call center agents serve U.S. clients, and your accent and cultural familiarity with the U.S. are actual assets. Companies in Manila, Cebu, and Davao regularly recruit. Starting wages are typically PHP 18,000–30,000/month with performance bonuses.",
    },
    {
      question: "How is Cebu City different from Manila as a place to settle?",
      answer:
        "Cebu City is significantly less congested and expensive than Metro Manila. It has its own active BPO, tourism, and manufacturing sectors, and it is a hub for Visayas and Mindanao communities. Crime rates are generally lower than Metro Manila. If you have family or community connections in the Visayas, Cebu is often a more manageable and affordable entry point.",
    },
  ],
  seoTitle: "Deported to Philippines: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to the Philippines. PhilHealth, BPO jobs, GCash, housing in Manila and Cebu, and legal resources.",
  keywords: [
    "deported to Philippines",
    "Philippines deportee guide",
    "PhilSys ID Philippines",
    "Manila housing deportee",
    "BPO call center Philippines deportee",
    "GCash Philippines",
    "Globe Smart SIM Philippines",
  ],
  relatedCountries: ["vietnam", "cambodia", "indonesia"],
};

export default philippines;
