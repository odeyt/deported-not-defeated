import type { CountryData } from "./schema";

const sierraLeone: CountryData = {
  slug: "sierra-leone",
  countryName: "Sierra Leone",
  countryCode: "SL",
  flagEmoji: "🇸🇱",
  region: "Africa",
  capital: "Freetown",
  languages: ["English", "Krio"],
  currency: "Sierra Leonean Leone (SLL)",
  summary:
    "Sierra Leone is a West African nation that endured a devastating civil war from 1991–2002 and the 2014–2016 Ebola epidemic, and has been in a challenging but hopeful rebuilding process. English is the official language and Krio (an English-based creole) is the lingua franca spoken by most Sierra Leoneans. Freetown is the capital and largest city. Sierra Leonean-Americans deported to Sierra Leone often have roots in communities with strong U.S. diaspora connections and returnee networks.",
  heroTitle: "Deported to Sierra Leone: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and community resources for deportees returning to Sierra Leone.",
  cities: ["Freetown", "Bo", "Kenema", "Koidu"],
  quickFacts: [
    { label: "Capital", value: "Freetown" },
    { label: "Languages", value: "English (official), Krio (lingua franca)" },
    { label: "Currency", value: "Sierra Leonean Leone (SLL)" },
    { label: "Emergency Number", value: "999 (Police) / 999 (Fire)" },
    { label: "U.S. Embassy", value: "Freetown (Southridge-Hill Station)" },
    { label: "Time Zone", value: "UTC+0 (GMT — no daylight saving)" },
  ],
  returningHome: [
    "Sierra Leonean citizens arrive at Lungi International Airport (connected to Freetown by ferry or helicopter) — Immigration authorities process returning nationals.",
    "Obtain your National Identity Card (NIC) at the National Civil Registration Authority (NCRA).",
    "The U.S. Embassy in Freetown can assist U.S. citizens with emergency consular services.",
    "Church communities — both Christian and Muslim — provide strong social support across Sierra Leone.",
    "The Ministry of Social Welfare provides some support programs for vulnerable returning citizens.",
  ],
  travelDocuments: [
    "The National Identity Card (NIC) is available through the National Civil Registration Authority (NCRA) with your birth certificate.",
    "A Sierra Leone passport is available through the Department of Immigration once you have your NIC.",
    "Birth certificates are issued by the Births and Deaths Registry.",
    "If documents are unavailable, NCRA has processes for late birth registration using witness testimony.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Sierra Leone for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Freetown has housing across price points — basic rooms in areas like Kissy, Waterloo, or Wellington may run SLL 500,000–1,500,000/month (approximately $30–90 USD).",
    "Bo in the Southern Province is more affordable — basic housing from SLL 300,000–800,000/month.",
    "Kenema in the Eastern Province has lower living costs.",
    "Family compound housing is the most common and culturally appropriate initial housing.",
    "Facebook Marketplace Sierra Leone and community notice boards list some available rentals.",
  ],
  jobs: [
    "Freetown's economy includes NGO sector employment (significant given international aid presence), trade, and services.",
    "Mining (diamonds, rutile, bauxite) employs many in Bo, Kenema, and Koidu areas.",
    "Fishing and agriculture are the main rural livelihoods.",
    "Teaching is in demand — English-speaking returnees may find positions at private schools.",
    "Small trade, market vending, and transport are the most accessible informal economy options.",
  ],
  healthcare: [
    "The Connaught Hospital in Freetown is the main public hospital — resources are limited.",
    "The Free Healthcare Initiative provides free care for pregnant women, lactating mothers, and children under 5.",
    "District hospitals serve provincial capitals with basic care.",
    "NGOs (MSF, Partners in Health-Wellbody Alliance) provide healthcare in some areas.",
    "Pharmacies in Freetown and Bo stock essential medications.",
  ],
  mentalHealth: [
    "Kissy Mental Health Hospital in Freetown is the main public psychiatric facility.",
    "Partners in Health has integrated mental health into primary care in some areas.",
    "Church communities and spiritual healers provide community-level mental health support.",
    "Post-conflict and post-Ebola trauma is community-wide — peer support from community members who share these experiences can be valuable.",
    "Remote support from Sierra Leonean diaspora organizations in the U.S. may be accessible by phone.",
  ],
  moneyTransfer: [
    "Western Union and MoneyGram have agents in Freetown and major towns.",
    "Orange Money and Africell Money are mobile wallet options in Sierra Leone.",
    "Sierra Leone Commercial Bank (SLCB) and Rokel Commercial Bank allow account opening with NIC.",
    "USD is widely accepted for larger transactions in Freetown.",
    "Remittances from diaspora are a major income source for many Sierra Leonean families.",
  ],
  phoneInternet: [
    "Africell is the largest mobile carrier in Sierra Leone with wide coverage.",
    "Orange Sierra Leone and Sierratel also operate.",
    "SIM cards from Africell cost about SLL 5,000–10,000 at retail stores.",
    "Prepaid data plans are available but relatively expensive given incomes.",
    "Internet infrastructure is limited outside Freetown — Africell has the best coverage.",
  ],
  transportation: [
    "Poda-podas (shared minibuses) are the main affordable city transport in Freetown — fares SLL 1,000–3,000.",
    "Okadas (motorcycle taxis) serve shorter distances in Freetown and towns across Sierra Leone.",
    "Ferries cross the Sierra Leone River connecting Freetown to Lungi and Aberdeen.",
    "Intercity bush taxis connect Freetown with Bo, Kenema, and Koidu.",
    "Rainy season significantly impacts road travel in rural Sierra Leone.",
  ],
  legalResources: [
    "Legal Aid Board Sierra Leone provides free legal services to qualifying individuals.",
    "Sierra Leone Bar Association can refer to private attorneys.",
    "National Commission for Human Rights investigates rights violations.",
    "UNHCR Sierra Leone engages for protection situations.",
    "Timap for Justice provides community legal assistance in rural areas.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Sierra Leonean community organizations in the U.S. (particularly in the DC metro area and New York) may have family support resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "U.S. citizens who were deported retain the right to return to the U.S. with a valid U.S. passport.",
  ],
  faqs: [
    {
      question: "What is Krio and can I use it to communicate?",
      answer:
        "Krio is an English-based creole language that serves as the lingua franca across all ethnic groups in Sierra Leone. It is spoken by most Sierra Leoneans as a second language (after their ethnic language) and is the language of everyday communication across Freetown and major towns. Because it is English-based, Krio is relatively accessible to English speakers — you will likely be able to communicate the basics very quickly.",
    },
    {
      question: "How do I get to Freetown from the airport?",
      answer:
        "Lungi International Airport is across the Sierra Leone River from Freetown. The main options are the Lungi Ferry (most affordable, schedules vary), government helicopter (Bristow Helicopters, weather-dependent), private speed boat (expensive but fast), or the long road route via Lungi-to-Tagrin and ferry to the capital. Plan your arrival logistics in advance, especially for night or irregular arrivals.",
    },
    {
      question: "What is the Free Healthcare Initiative?",
      answer:
        "Sierra Leone's Free Healthcare Initiative (FHCI) provides free healthcare to pregnant women, breastfeeding mothers, and children under 5 at government health facilities. For those outside these categories, government hospital fees exist but are subsidized. Bringing your NIC or any identity document to healthcare facilities is recommended.",
    },
    {
      question: "How do I access the NGO job market in Freetown?",
      answer:
        "Freetown has a significant international NGO presence (UN agencies, USAID-funded programs, European NGOs). Jobs are advertised on NGO websites, ReliefWeb, and LinkedIn. English proficiency and U.S. cultural experience are assets. Entry-level positions may require a degree or specific skills — research which organizations are active and what roles you may qualify for.",
    },
    {
      question: "How safe is Freetown compared to other West African capitals?",
      answer:
        "Freetown is generally considered relatively safe by West African standards. Petty crime (theft, scams) is the main concern rather than violent crime. Neighborhoods like Hill Station and Aberdeen are calmer, while areas like Kissy can be more challenging. Connecting with family or community upon arrival and staying aware of your surroundings are the main safety practices.",
    },
  ],
  seoTitle: "Deported to Sierra Leone: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Sierra Leone. NIC, Africell SIM, housing in Freetown, and resources for Sierra Leonean deportees.",
  keywords: [
    "deported to Sierra Leone",
    "Sierra Leone deportee guide",
    "NIC Sierra Leone",
    "Freetown housing deportee",
    "Africell SIM Sierra Leone",
    "Krio Sierra Leone",
    "Sierra Leone diaspora deportee",
  ],
  relatedCountries: ["liberia", "ghana", "cameroon"],
  firstThirtyDays: [
    "Arrive at Lungi International Airport (Freetown) — Sierra Leone immigration processes returning nationals",
    "Take the ferry or hovercraft from Lungi to Freetown — the airport is located across the estuary from the capital",
    "Get an Africell or Orange Sierra Leone SIM at any vendor — requires your national ID or passport",
    "Contact family networks in Freetown or your home district — Krio, Mende, Temne, and other ethnic community ties are vital",
    "Visit the National Civil Registration Authority (NCRA) to obtain your National ID card",
    "Open a bank account at Sierra Leone Commercial Bank (SLCB), Rokel Commercial Bank, or EcoBank using your national ID",
    "Set up Africell Money or Orange Money mobile wallet for receiving remittances from family in the U.S.",
    "Register with the Ministry of Labour and Social Security for employment placement programs",
  ],
  businessDirectory: [
    "National Civil Registration Authority (NCRA) — national ID card issuance and registration",
    "Sierra Leone Commercial Bank (SLCB) and EcoBank branches — banking with national ID",
    "Africell and Orange Sierra Leone stores — SIM cards and mobile data plans",
    "Africell Money and Orange Money — mobile wallets for remittances and digital payments",
    "Ministry of Labour and Social Security — employment placement and skills training",
    "IOM Sierra Leone — reintegration assistance and transitional support for returning migrants",
  ],
};

export default sierraLeone;
