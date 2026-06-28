import type { CountryData } from "./schema";

const venezuela: CountryData = {
  slug: "venezuela",
  countryName: "Venezuela",
  countryCode: "VE",
  flagEmoji: "🇻🇪",
  region: "South America",
  capital: "Caracas",
  languages: ["Spanish"],
  currency: "Venezuelan Bolívar (VES)",
  summary:
    "Venezuela has experienced severe economic and political crisis, with high inflation, scarcity of goods, and significant emigration of its own population. Deportees returning to Venezuela face a difficult environment with limited formal employment, dollar-dependent informal economy, and strained public services. Despite these challenges, family networks remain strong, and communities outside Caracas may offer more manageable conditions. Remittances in USD are critically important for daily life.",
  heroTitle: "Deported to Venezuela: Your Survival Guide",
  heroSubtitle:
    "What to know about housing, documents, money, and resources after deportation to Venezuela.",
  cities: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"],
  quickFacts: [
    { label: "Capital", value: "Caracas" },
    { label: "Language", value: "Spanish" },
    { label: "Currency", value: "Venezuelan Bolívar (VES) — USD widely used" },
    { label: "Emergency Number", value: "171 (Unified Emergency)" },
    { label: "U.S. Embassy", value: "U.S. Embassy Caracas is currently suspended — contact nearest embassy" },
    { label: "Time Zone", value: "UTC-4 (VET, no daylight saving)" },
  ],
  returningHome: [
    "Deportees arriving at Simón Bolívar International Airport in Maiquetía are processed by SAIME (Servicio Administrativo de Identificación, Migración y Extranjería).",
    "Obtain your cédula de identidad at any SAIME office — required for banking, employment, and services.",
    "Venezuela's economy is heavily dollarized in practice — having access to USD dramatically improves purchasing power.",
    "Contact family immediately upon arrival — family networks are the most important resource in the Venezuelan context.",
    "International organizations operating in Venezuela may provide limited humanitarian assistance in some areas.",
  ],
  travelDocuments: [
    "The cédula de identidad is Venezuela's national ID — apply at SAIME offices with your birth certificate (partida de nacimiento).",
    "A Venezuelan passport is available through SAIME — processing can be slow and passport availability has been limited.",
    "Birth certificates are available from civil registry offices (Registro Civil) in your municipality.",
    "If birth was unregistered, SAIME has a late registration process.",
    "U.S. citizen children retain their U.S. passports — note that the U.S. Embassy in Caracas is not currently operational.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Venezuela for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Caracas has highly varied rents — neighborhood safety and quality differ dramatically. Basic apartments in working-class zones may run $100–300/month in USD informal rates.",
    "Valencia and Barquisimeto can be more affordable and less congested than Caracas.",
    "Many Venezuelans live in extended family homes — returning to family is the primary housing strategy.",
    "Rental transactions are typically in USD or equivalent Bolívares — landlords often prefer dollar payments.",
    "OLX Venezuela and social media groups are the main informal channels for finding rentals.",
  ],
  jobs: [
    "Formal employment in Venezuela is severely constrained by the economic crisis — many people work in informal trade.",
    "Skills in technology, engineering, and medicine are valued — professionals may find work despite the general economic difficulties.",
    "Informal commerce (bachaqueros, street markets) is a common livelihood.",
    "Agricultural work in regions like Barinas and Apure employs many in rural Venezuela.",
    "USD-based freelance work (online services, remote work for international clients) is increasingly common for those with internet and skills.",
  ],
  healthcare: [
    "Venezuela's public health system is severely under-resourced — medicines, equipment, and staff are in short supply.",
    "IVSS (Instituto Venezolano de los Seguros Sociales) theoretically covers formal workers but capacity is greatly diminished.",
    "Public hospitals (hospitales universitarios) operate with significant shortages — bring your own supplies when possible.",
    "Private clinics exist in major cities but charge in USD — unaffordable for most.",
    "PAHO (Pan American Health Organization) and some NGOs provide humanitarian health support in Venezuela.",
  ],
  mentalHealth: [
    "Mental health resources in Venezuela are extremely limited due to the broader health system crisis.",
    "Family and community support networks are the primary mental health resource.",
    "Some religious organizations and pastoral centers offer counseling services.",
    "Remote mental health support from Venezuelan diaspora organizations may be accessible with internet connectivity.",
    "Acknowledging the stress of both deportation and returning to a difficult economic environment is important — seek any available community support.",
  ],
  moneyTransfer: [
    "Venezuela's economy is highly dollarized — receiving USD from family in the U.S. is crucial for maintaining purchasing power.",
    "Zelle (U.S. bank feature) is widely used informally for sending USD to Venezuelan recipients via intermediaries.",
    "Western Union and Remitly operate but may have limitations — verify current availability.",
    "Banco de Venezuela and Mercantil are main local banks — opening an account requires a cédula.",
    "Binance and cryptocurrency transfers have been used as an alternative when traditional remittance services are restricted.",
  ],
  phoneInternet: [
    "Movistar Venezuela and Digitel are the main mobile carriers — Movilnet is the state carrier.",
    "SIM cards from Movistar or Digitel are available at retail stores.",
    "Mobile data is expensive relative to incomes — WhatsApp and basic internet are prioritized by most users.",
    "Internet speeds are slow in most areas and infrastructure is deteriorating.",
    "CANTV (state telecom) provides home internet but with reliability issues.",
  ],
  transportation: [
    "Caracas has a Metro (5 lines) with very low fares but frequent service interruptions.",
    "Por puestos (shared route taxis) and buses serve cities and towns.",
    "Intercity bus service exists but fuel scarcity has affected frequency and reliability.",
    "Motorbike taxis (mototaxis) serve shorter distances in smaller cities.",
    "Private car ownership is limited — many rely on informal transport networks.",
  ],
  legalResources: [
    "Defensoría del Pueblo provides citizen rights advice and complaints.",
    "SAIME handles immigration and civil documentation legal matters.",
    "Private attorneys can be consulted for family and civil law — fees are typically USD-denominated.",
    "International human rights organizations monitor Venezuelan conditions — their reports may be relevant for those seeking protection elsewhere.",
    "UNHCR has operations in Venezuela for those with protection needs.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "The U.S. Embassy in Caracas is currently suspended — for emergency consular services, the nearest U.S. Embassy in the region should be contacted.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and Venezuelan-American legal organizations in Miami may provide post-deportation legal consultation.",
    "Consult a U.S. immigration attorney about whether any temporary protected status or other relief may apply.",
  ],
  faqs: [
    {
      question: "Why is the U.S. dollar so important in Venezuela?",
      answer:
        "Venezuela's Bolívar has suffered extreme inflation, making it difficult to store value or price goods. The economy has become largely dollarized in practice — most goods, rents, and services are priced in or indexed to USD. Having access to dollar remittances from family dramatically improves your quality of life in Venezuela.",
    },
    {
      question: "Can I get my cédula if I have been away for many years?",
      answer:
        "Yes — visit any SAIME office with your birth certificate (partida de nacimiento). If your birth was registered in Venezuela, the process should be straightforward regardless of how long you were abroad. Processing times at SAIME can be long — arrive early and bring all available documents.",
    },
    {
      question: "What cities are most livable for a returnee?",
      answer:
        "Cities like Valencia, Barquisimeto, and Mérida tend to have lower crime rates and may be more manageable than Caracas or Maracaibo. If you have family in smaller towns or rural areas, those communities may offer the safest and most affordable initial conditions.",
    },
    {
      question: "Is it possible to work remotely for international clients from Venezuela?",
      answer:
        "Yes — with a reliable internet connection, many Venezuelans work remotely for clients in the U.S., Europe, or elsewhere, receiving payment in USD via platforms like PayPal, Payoneer, or cryptocurrency. This has become a significant survival strategy for educated and skilled Venezuelans.",
    },
    {
      question: "How do I contact the U.S. Embassy if needed?",
      answer:
        "The U.S. Embassy in Caracas has been suspended since 2019. U.S. citizens needing consular services may need to travel to a neighboring country (Colombia or Panama) or contact the U.S. Embassy through its emergency line. The U.S. State Department's Overseas Citizens Services can also be reached by phone from the U.S.",
    },
  ],
  seoTitle: "Deported to Venezuela: Survival Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Venezuela. Cédula, USD remittances, housing, and limited resources for surviving in Caracas and beyond.",
  keywords: [
    "deported to Venezuela",
    "Venezuela deportee guide",
    "cédula SAIME Venezuela",
    "Venezuela USD remittances",
    "Caracas housing deportee",
    "Movistar Digitel SIM Venezuela",
  ],
  relatedCountries: ["colombia", "guyana", "brazil"],
  firstThirtyDays: [
    "Arrive at Simón Bolívar International Airport (Caracas) or La Chinita (Maracaibo) — Venezuelan immigration processes returning nationals",
    "Get a Movistar, Digitel, or Movilnet SIM at any carrier store — requires cédula or passport",
    "Contact family networks immediately — family support is critical given Venezuela's ongoing economic situation",
    "Visit the SAIME (Servicio Administrativo de Identificación, Migración y Extranjería) to renew your cédula de identidad",
    "Open a bank account at Banesco or Banco Mercantil — required for receiving Bs. transfers and USD remittances",
    "Set up a Zelle-linked account through family or acquaintances — USD via Zelle is the dominant informal payment system",
    "Contact SENCAMER or local government Misiones (Misión Hogar, Misión Alimentación) for transitional support",
    "Register with INCE (Instituto Nacional de Capacitación y Educación Socialista) for free vocational training",
  ],
  businessDirectory: [
    "SAIME (Servicio Administrativo de Identificación) — cédula de identidad and passport renewal",
    "INCE (Instituto Nacional de Capacitación) — free vocational training and skills programs",
    "Banesco and Banco Mercantil branches — banking services with cédula documentation",
    "Movistar Venezuela and Digitel stores — SIM cards and mobile data plans",
    "Misiones Sociales offices — government social programs for food, housing, and health support",
    "Defensoría del Pueblo — human rights and legal assistance for returnees",
  ],
};

export default venezuela;
