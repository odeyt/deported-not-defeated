import type { CountryData } from "./schema";

const bahamas: CountryData = {
  slug: "bahamas",
  countryName: "Bahamas",
  countryCode: "BS",
  flagEmoji: "🇧🇸",
  region: "Caribbean",
  capital: "Nassau",
  languages: ["English"],
  currency: "Bahamian Dollar (BSD)",
  summary:
    "The Bahamas is an English-speaking island nation of 700+ islands just off the coast of Florida. The Bahamian Dollar is pegged 1:1 to the U.S. dollar. Tourism dominates the economy, with Nassau and Freeport as the main economic centers. While the cost of living is high by Caribbean standards, English fluency and cultural familiarity with the U.S. give Bahamian deportees advantages in accessing services and employment.",
  heroTitle: "Deported to the Bahamas: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and resources for Bahamians rebuilding after deportation.",
  cities: ["Nassau", "Freeport", "Marsh Harbour", "George Town"],
  quickFacts: [
    { label: "Capital", value: "Nassau" },
    { label: "Language", value: "English" },
    { label: "Currency", value: "Bahamian Dollar (BSD) — pegged 1:1 to USD" },
    { label: "Emergency Number", value: "919" },
    { label: "U.S. Embassy", value: "Nassau (42 Queen Street)" },
    { label: "Time Zone", value: "UTC-5 (EST)" },
  ],
  returningHome: [
    "Bahamian citizens are received at Lynden Pindling International Airport in Nassau — Immigration officers process returning nationals.",
    "Obtain or renew your National ID Card through the Department of Immigration.",
    "A Bahamian passport is your primary travel document — apply at the Passport Office in Nassau.",
    "The Department of Social Services may provide emergency assistance for qualifying low-income returnees.",
    "Community organizations and churches provide transitional support in Nassau and Freeport.",
  ],
  travelDocuments: [
    "A Bahamian passport is the primary travel document — apply at the Passport Office on Thompson Blvd, Nassau.",
    "Birth certificates are available from the Registrar General's Office in Nassau.",
    "A National Insurance Number (NIB) card is required for formal employment.",
    "If documents were lost, the Registrar General and Immigration can verify citizenship through birth records.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for the Bahamas for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Nassau's rental market is expensive — basic apartments in working-class areas like Englerston or Farm Road may run BSD $600–1,200/month.",
    "Freeport on Grand Bahama Island tends to be more affordable — rents may start around BSD $500–900/month.",
    "The Family Islands (Out Islands) offer more affordable informal housing for those with community ties there.",
    "Bahamas Realty and local Facebook groups are the main ways to find rental listings.",
    "Many Bahamians rent rooms in family homes — the most affordable entry-level option.",
  ],
  jobs: [
    "Tourism in Nassau, Freeport, Paradise Island, and the Out Islands employs the majority of working Bahamians.",
    "Construction is active in Nassau and resort development areas — tradesperson skills are in demand.",
    "Government employment is a significant sector — civil service vacancies are posted at bahamas.gov.bs.",
    "Financial services in Nassau include banking and offshore finance — professional experience in this area is valuable.",
    "Self-employment (fishing, small retail, food services) is a common livelihood in Family Island communities.",
  ],
  healthcare: [
    "Princess Margaret Hospital in Nassau is the main public hospital — free or subsidized care for Bahamian citizens.",
    "The Rand Memorial Hospital in Freeport serves Grand Bahama Island.",
    "Community clinics operate throughout Nassau and the Family Islands.",
    "The National Insurance Board (NIB) provides health coverage for enrolled workers.",
    "Private clinics and Doctor's Hospital in Nassau serve those with private insurance or means.",
  ],
  mentalHealth: [
    "The Sandilands Rehabilitation Centre in Nassau provides public psychiatric services.",
    "Community counseling services are available through some churches and social service agencies.",
    "The Department of Social Services may provide referrals to counseling services.",
    "Crisis support can be accessed through the government's emergency social services.",
    "Private therapists practice in Nassau for those who can afford sessions (typically BSD $80–150).",
  ],
  moneyTransfer: [
    "The Bahamian dollar is pegged 1:1 to the USD — transfers from the U.S. involve no exchange rate loss.",
    "Western Union and MoneyGram operate in the Bahamas.",
    "Wise and Remitly can transfer to Bahamian bank accounts.",
    "Bank of the Bahamas, Commonwealth Bank, and Scotiabank Bahamas are major local banks.",
    "RoyalStar Money Services is a local remittance provider.",
  ],
  phoneInternet: [
    "BTC (Bahamas Telecommunications Company) and Aliv are the two mobile carriers.",
    "SIM cards from BTC or Aliv are available at their retail stores in Nassau and Freeport.",
    "Prepaid plans start around BSD $20–40/month for basic data packages.",
    "4G coverage is good in Nassau and Freeport — Family Islands may have limited service.",
    "Home internet from BTC is available in Nassau and major settlements.",
  ],
  transportation: [
    "Jitneys (small buses) are the main public transport in Nassau — fares are BSD $1.25.",
    "Taxis in Nassau have regulated rates — confirm the fare before departure.",
    "Water taxis and ferries connect Nassau to nearby islands including Paradise Island.",
    "Mail boats connect Nassau with the Family Islands — a slow but affordable option.",
    "Rental cars are available in Nassau and Freeport for those with licenses — Bahamas drives on the left.",
  ],
  legalResources: [
    "The Bahamas Legal Aid Clinic provides free legal services to qualifying individuals.",
    "The Public Defender's Office handles criminal defense for those who cannot afford attorneys.",
    "The Bahamas Bar Association can refer you to private attorneys.",
    "Office of the Attorney General handles civil rights and constitutional matters.",
    "UNHCR regional office may provide orientation for those with protection needs.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "The Bahamas' proximity to Florida does not make illegal re-entry safer — maritime enforcement is active.",
    "Consult a U.S. immigration attorney about waiver options before any action.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can provide post-deportation legal consultations.",
  ],
  faqs: [
    {
      question: "Is the Bahamian dollar the same as the U.S. dollar?",
      answer:
        "The Bahamian dollar (BSD) is pegged exactly 1:1 to the U.S. dollar. U.S. dollars are accepted everywhere in the Bahamas at face value, and most businesses and ATMs dispense both currencies interchangeably.",
    },
    {
      question: "What kind of jobs are realistic for a deportee in Nassau?",
      answer:
        "Tourism-related work is the most accessible — hotels, restaurants, water sports, and transportation services hire regularly. Construction is also active. Many Bahamians work in retail, security, and domestic services. Bilingual skills or hospitality experience from the U.S. are directly applicable.",
    },
    {
      question: "How do I get a NIB card for formal employment?",
      answer:
        "Visit any National Insurance Board (NIB) office with your birth certificate and national ID. The NIB card is required by employers for payroll and benefits. The process is straightforward and free.",
    },
    {
      question: "Are the Family Islands a good option for settling?",
      answer:
        "If you have family ties in Abaco, Exuma, Eleuthera, or another Family Island, these communities offer a slower pace of life and tight-knit community support. Costs can be lower but employment options are more limited. Fishing, small farming, and informal trading are common livelihoods.",
    },
    {
      question: "Is there free healthcare in the Bahamas?",
      answer:
        "Yes — Princess Margaret Hospital in Nassau and Rand Memorial Hospital in Freeport provide free or subsidized care to Bahamian citizens and residents. You should bring your national ID or passport for registration. Community clinics provide primary care in Nassau neighborhoods and the Out Islands.",
    },
  ],
  seoTitle: "Deported to the Bahamas: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to the Bahamas. Housing, tourism jobs, healthcare, and legal resources in Nassau and beyond.",
  keywords: [
    "deported to Bahamas",
    "Bahamas deportee guide",
    "Nassau housing deportee",
    "Bahamas passport Office",
    "BTC Aliv SIM Bahamas",
    "Bahamas tourism jobs",
  ],
  relatedCountries: ["jamaica", "dominican-republic", "trinidad-and-tobago"],
};

export default bahamas;
