import type { CountryData } from "./schema";

const myanmar: CountryData = {
  slug: "myanmar",
  countryName: "Myanmar",
  countryCode: "MM",
  flagEmoji: "🇲🇲",
  region: "Asia",
  capital: "Naypyidaw",
  languages: ["Burmese"],
  currency: "Myanmar Kyat (MMK)",
  summary:
    "Myanmar has been under military rule since the February 2021 coup and faces ongoing civil conflict, human rights abuses, and economic crisis. Deportees returning to Myanmar face a particularly difficult environment. Yangon (the commercial capital) and Mandalay are the main urban centers where some services exist. The U.S. Embassy suspended normal operations following the coup. Connecting with community and ethnic organizations is critical. Myanmar-Americans deported to Myanmar often come from Karen, Burmese, or other ethnic backgrounds.",
  heroTitle: "Deported to Myanmar: Your Survival Guide",
  heroSubtitle:
    "Safety information, community resources, and practical guidance for deportees in Myanmar's challenging environment.",
  cities: ["Yangon", "Mandalay", "Naypyidaw", "Bago"],
  quickFacts: [
    { label: "Capital", value: "Naypyidaw (official) / Yangon (commercial)" },
    { label: "Language", value: "Burmese (and many ethnic languages)" },
    { label: "Currency", value: "Myanmar Kyat (MMK)" },
    { label: "Emergency Number", value: "199 (Police) / 192 (Medical)" },
    { label: "U.S. Embassy", value: "Yangon (110 University Avenue, Kamayut) — operations limited" },
    { label: "Time Zone", value: "UTC+6:30 (MMT)" },
  ],
  returningHome: [
    "Myanmar is under military rule since the 2021 coup — understand the current political situation before and upon arrival.",
    "Arrive with as much documentation as possible — your National Registration Card (NRC) or birth certificate is essential.",
    "Ethnic community organizations (Karen National Union, Kachin organizations) may provide support for people from their communities.",
    "Contact the U.S. Embassy in Yangon if you are a U.S. citizen — operations are limited but consular services may still be available.",
    "Avoid political activities and demonstrations — the current government has severely restricted civil liberties.",
  ],
  travelDocuments: [
    "The National Registration Card (NRC or မှတ်ပုံတင်) is Myanmar's national ID — apply at your township GAD (General Administration Department) office.",
    "A Myanmar passport is available through the Ministry of Immigration and Population.",
    "Birth certificates are issued by the GAD township office.",
    "If your NRC was lost, the GAD can reissue it using household registration records.",
    "U.S. citizen deportees should carry their U.S. passport and contact the U.S. Embassy.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Myanmar for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Yangon has rental apartments in working-class townships like Hlaing, Insein, and Shwe Pyi Tha — basic rooms may run MMK 150,000–400,000/month.",
    "Mandalay is generally more affordable than Yangon — basic housing starts around MMK 100,000–250,000/month.",
    "Many Myanmar families live in extended family compounds — returning to family is the safest initial housing approach.",
    "Housing markets have been volatile since the 2021 coup — expect significant price fluctuations.",
    "Connect with your ethnic community organization for housing referrals in safe areas.",
  ],
  jobs: [
    "Myanmar's economy has contracted significantly since the 2021 coup — formal employment is difficult to find.",
    "The garment sector in Yangon continues to employ many, though under difficult conditions.",
    "Small-scale trade, agriculture, and informal work are the most accessible livelihoods.",
    "NGO and international organization employment exists in Yangon for professionals with relevant skills.",
    "English teaching opportunities exist at some private schools in Yangon — though the educational sector is also strained.",
  ],
  healthcare: [
    "Myanmar's public health system is very limited — government hospitals provide basic care but resources are severely constrained.",
    "Yangon General Hospital and Mandalay General Hospital are the main public facilities.",
    "Private clinics in Yangon and Mandalay offer better care for those who can afford fees.",
    "Ethnic health organizations (like those affiliated with Karen and Kachin communities) may provide health support in their regions.",
    "Essential medications can be found at pharmacies (hsai zine) in Yangon and Mandalay.",
  ],
  mentalHealth: [
    "Mental health resources in Myanmar are extremely limited.",
    "Buddhist monks and community leaders provide spiritual and emotional support.",
    "International NGOs with mental health components have been operating in conflict-affected areas.",
    "Remote support from Myanmar-American community organizations in the U.S. may be accessible with internet.",
    "Family and community network is the primary mental health resource.",
  ],
  moneyTransfer: [
    "Due to Myanmar's political situation and banking system disruptions since the coup, money transfer options are limited and change frequently.",
    "Western Union has had limited operations — verify current availability before transferring.",
    "Informal hawala networks may be the most practical option — connect with trusted community members for guidance.",
    "KBZ Bank and AYA Bank are among the remaining functional banks — account opening may require NRC.",
    "USD cash carried by family members (informal courier) remains a common method.",
  ],
  phoneInternet: [
    "MPT (Myanma Posts and Telecommunications) and Ooredoo are the main carriers — Telenor's Myanmar operations were sold.",
    "SIM cards from MPT or Ooredoo are available at carrier stores and authorized dealers.",
    "Internet access has been frequently restricted by the military government — speeds and reliability are inconsistent.",
    "VPNs are used by many residents to bypass internet restrictions — though their use carries risks under current laws.",
    "Mobile data plans are available but infrastructure stability is uncertain.",
  ],
  transportation: [
    "Yangon's city bus system covers major routes at very low fares (MMK 200–500).",
    "Taxis and Grab operate in Yangon for city transport.",
    "Mandalay has horse carts (shaleh) in some areas and tuk-tuks alongside regular taxis.",
    "Intercity bus services connect major cities — conditions and reliability have varied since the coup.",
    "Trains operate on some intercity routes — slower but potentially safer in some areas.",
  ],
  legalResources: [
    "The legal system in Myanmar is under military control — access to independent legal aid is severely restricted.",
    "Myanmar lawyers operate under significant risk — legal options are constrained by the current political environment.",
    "UNHCR may be engaged for some protection situations — verify current status.",
    "The U.S. Embassy in Yangon maintains a list of attorneys for U.S. citizens — contact them if you are a U.S. citizen.",
    "International human rights organizations monitor the situation from outside Myanmar.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Some Myanmar deportees hold U.S. citizenship — those individuals can return to the U.S. legally with a valid U.S. passport.",
    "Consult a U.S. immigration attorney about your situation — Myanmar's conditions may be relevant to any protection claim.",
    "Organizations like SEARAC and Burma Task Force USA advocate for Burmese/Myanmar deportees.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
  ],
  faqs: [
    {
      question: "Is it safe to return to Myanmar given the current political situation?",
      answer:
        "Myanmar's security situation is serious and varies by region. Urban areas like Yangon have some stability, while rural and conflict-affected areas face significant danger. Before or upon arrival, connect with trusted family or ethnic community organizations to understand local conditions. Avoid political gatherings and maintain a low profile.",
    },
    {
      question: "What if I am from a Karen, Kachin, or other ethnic minority community?",
      answer:
        "Ethnic community organizations (Karen National Union social services, Kachin community groups) maintain networks that may provide housing, healthcare, and support within their communities. These networks can be particularly important for deportees who may face additional vulnerability as ethnic minorities under the current military government.",
    },
    {
      question: "How do I get money from family in the U.S.?",
      answer:
        "Myanmar's banking system has been disrupted since the coup, making formal transfers unreliable. The most reliable methods currently involve informal networks through trusted intermediaries, or carrying cash when family visit. Verify current options with community contacts before your family attempts any transfer.",
    },
    {
      question: "How do I get my National Registration Card (NRC)?",
      answer:
        "The NRC is issued by your township's GAD (General Administration Department) office. You will need your birth certificate and possibly your parents' NRC information. Given current administrative disruptions, the process may be slower than normal — bring all available documentation and be patient with the process.",
    },
    {
      question: "What resources exist specifically for Myanmar deportees from the U.S.?",
      answer:
        "SEARAC (Southeast Asia Resource Action Center), Burma Task Force USA, and the National Coalition Government of the Union of Burma (NCGUB) in exile may be able to provide information and advocacy. Myanmar-American community organizations in cities like Los Angeles, Anaheim, and Fort Wayne, Indiana may have support networks for deportee families.",
    },
  ],
  seoTitle: "Deported to Myanmar: Survival Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Safety information and practical guide for U.S. deportees returning to Myanmar. Community resources, NRC, and survival strategies under current conditions.",
  keywords: [
    "deported to Myanmar",
    "Myanmar deportee guide",
    "National Registration Card Myanmar",
    "Yangon housing deportee",
    "Myanmar coup deportee safety",
    "SEARAC Myanmar deportee",
    "Burma Task Force USA",
  ],
  relatedCountries: ["thailand", "laos", "bangladesh"],
};

export default myanmar;
