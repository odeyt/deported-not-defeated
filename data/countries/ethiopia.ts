import type { CountryData } from "./schema";

const ethiopia: CountryData = {
  slug: "ethiopia",
  countryName: "Ethiopia",
  countryCode: "ET",
  flagEmoji: "🇪🇹",
  region: "Africa",
  capital: "Addis Ababa",
  languages: ["Amharic"],
  currency: "Ethiopian Birr (ETB)",
  summary:
    "Ethiopia is Africa's second-most populous country and a nation of ancient civilization and cultural pride. Addis Ababa is one of Africa's largest and most important capital cities, hosting the African Union headquarters. The country has experienced rapid economic growth but also ongoing regional conflicts (particularly in Tigray, Amhara, and Oromia regions). Ethiopian-Americans deported to Ethiopia often have Amharic, Oromo, or Tigrinya language backgrounds and community connections across the country.",
  heroTitle: "Deported to Ethiopia: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and community resources for deportees returning to Ethiopia.",
  cities: ["Addis Ababa", "Dire Dawa", "Mekelle", "Gondar"],
  quickFacts: [
    { label: "Capital", value: "Addis Ababa" },
    { label: "Language", value: "Amharic (official), Oromo, Tigrinya, Somali, others" },
    { label: "Currency", value: "Ethiopian Birr (ETB)" },
    { label: "Emergency Number", value: "991 (Police) / 907 (Ambulance)" },
    { label: "U.S. Embassy", value: "Addis Ababa (Entoto Street)" },
    { label: "Time Zone", value: "UTC+3 (EAT — no daylight saving)" },
  ],
  returningHome: [
    "Ethiopian nationals arriving at Bole International Airport — Department of Immigration and Nationality Affairs (DINA) processes returning nationals.",
    "Obtain your national ID card (Fayda) at any Kebele (local administrative unit) office.",
    "Note that regional conflicts in Tigray, Amhara, and parts of Oromia may make some home regions unsafe — assess conditions before traveling to your hometown.",
    "The Ethiopian Orthodox Church and mosque communities provide strong social support networks across Ethiopia.",
    "Contact your regional community organization or diaspora network before arrival if possible.",
  ],
  travelDocuments: [
    "The Ethiopian national ID (Fayda) is available at your local Kebele administrative office.",
    "An Ethiopian passport is available through the Ministry of Foreign Affairs or regional immigration offices.",
    "Birth certificates (Ye'lidad t'ejil) are available from your Kebele.",
    "The Kebele ID is the local-level ID used for many everyday transactions.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Ethiopia for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Addis Ababa has a wide range of housing — basic rooms in areas like Kirkos, Kolfe, or Akaki may run ETB 3,000–8,000/month.",
    "Dire Dawa is more affordable — basic housing from ETB 2,000–5,000/month.",
    "Gondar in Amhara region has affordable housing but access may be affected by regional security conditions.",
    "Ethiopian Real Estate (Engocha.com) and Facebook Marketplace Ethiopia list rentals.",
    "Extended family homes and compound housing are the norm — returning to family is the most accessible initial option.",
  ],
  jobs: [
    "Addis Ababa has a growing commercial sector with retail, hospitality, and services employment.",
    "Ethiopian Airlines is one of Africa's premier airlines with significant employment at its Addis hub.",
    "NGO and international organization employment is substantial in Addis Ababa.",
    "Agriculture (coffee, flowers, teff) employs the vast majority of Ethiopians in rural areas.",
    "The growing tech sector (iCog Labs, various startups) creates opportunities in Addis.",
  ],
  healthcare: [
    "Tikur Anbessa (Black Lion) Hospital and St. Paul's Hospital Millennium Medical College in Addis are the major public referral hospitals.",
    "Community health centers (health posts, health centers) serve neighborhoods at no cost.",
    "CBHIs (Community-Based Health Insurance) are expanding access in rural areas.",
    "Private hospitals (St. Gabriel Hospital, Bethzatha General Hospital) provide better-resourced care.",
    "Pharmacies are available in Addis and major cities — some medications are in short supply.",
  ],
  mentalHealth: [
    "Amanuel Mental Specialized Hospital in Addis Ababa is Ethiopia's main public psychiatric facility.",
    "Mental Health Innovation Network and TPO Ethiopia provide community mental health support.",
    "The Ethiopian Orthodox Church and Islamic community structures provide spiritual and social support.",
    "Post-conflict trauma from regional conflicts adds to mental health needs in some communities.",
    "Remote support from Ethiopian diaspora organizations in Minneapolis and Washington D.C. may be accessible.",
  ],
  moneyTransfer: [
    "Western Union, Remitly, and MoneyGram have agent networks in Ethiopia.",
    "CBE (Commercial Bank of Ethiopia), Awash Bank, and Dashen Bank are major banks for account opening.",
    "Telebirr (Ethio Telecom's mobile wallet) is Ethiopia's rapidly growing mobile payment platform.",
    "The government requires most transfers to go through official bank channels — verify current regulations.",
    "Ethiopian diaspora remittances are a significant part of the economy — transfer infrastructure is improving.",
  ],
  phoneInternet: [
    "Ethio Telecom is the main (and until recently sole) carrier — Safaricom Ethiopia is a new entrant.",
    "SIM cards from Ethio Telecom are available at their shops.",
    "Prepaid data plans start around ETB 100–300/month.",
    "4G is available in Addis Ababa and major cities — rural areas have more limited service.",
    "Internet has been subject to government shutdowns during periods of civil unrest — plan for connectivity disruptions.",
  ],
  transportation: [
    "Addis Ababa has a Light Rail Transit (LRT) system — fares are ETB 1–6.",
    "Blue and white minibuses (weyiyit) cover city routes for ETB 2–10.",
    "Taxis and Ride are available in Addis for private rides.",
    "Intercity bus service from the Autobus Terra connects major cities.",
    "Ethiopian Airlines domestic flights serve Dire Dawa, Bahir Dar, Gondar, and other cities.",
  ],
  legalResources: [
    "Ethiopian Human Rights Commission (EHRC) investigates rights violations.",
    "Ethiopian Bar Association can refer to private attorneys.",
    "UNHCR Ethiopia has one of Africa's largest operations for protection situations.",
    "Legal aid is limited — UNHCR is the most accessible international legal resource.",
    "The Diaspora Engagement Affairs General Directorate under MFA may provide guidance for returning nationals.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Ethiopian-American community organizations in Minneapolis, Washington D.C., and Northern Virginia may know legal resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "If you are from a conflict-affected region and face threats, consult UNHCR about available protection options.",
  ],
  faqs: [
    {
      question: "Which regions in Ethiopia are currently experiencing conflict?",
      answer:
        "The Tigray conflict (2020–2022) resulted in a peace agreement, but tensions remain. Parts of Amhara and Oromia regions have experienced insecurity. Before traveling to any region outside Addis Ababa, check current U.S. State Department travel advisories and Ethiopian government announcements. Starting in Addis Ababa while assessing regional conditions is the safer approach.",
    },
    {
      question: "What is Telebirr?",
      answer:
        "Telebirr is Ethio Telecom's mobile money platform, launched in 2021. It allows you to receive money, send domestically, pay bills, and make purchases via mobile phone. It has rapidly expanded and is now one of Africa's fastest-growing mobile wallets. Telebirr requires an Ethio Telecom SIM and national ID.",
    },
    {
      question: "What are Kebele offices and why do they matter?",
      answer:
        "Kebeles are Ethiopia's smallest administrative units — essentially neighborhood-level governments. Your Kebele office issues your local ID, birth certificate, and various permits. Registering at your Kebele upon return is one of the first administrative steps and provides access to local community services and documentation.",
    },
    {
      question: "Is English useful in Ethiopia?",
      answer:
        "English is the medium of instruction in Ethiopian secondary and higher education, so educated Ethiopians generally speak English. In business and international organization contexts in Addis, English is commonly used. In rural areas and for daily street interactions, Amharic (or the regional language) is essential.",
    },
    {
      question: "Are there organizations supporting Ethiopian deportees from the U.S.?",
      answer:
        "Ethiopian community organizations in Minneapolis (large Ethiopian community) and Washington D.C./Northern Virginia may provide family support resources. Within Ethiopia, diaspora engagement offices in the Ministry of Foreign Affairs may offer guidance. UNHCR Ethiopia handles protection situations for those facing threats.",
    },
  ],
  seoTitle: "Deported to Ethiopia: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Ethiopia. Fayda ID, Telebirr, housing in Addis Ababa, and resources for Ethiopian deportees.",
  keywords: [
    "deported to Ethiopia",
    "Ethiopia deportee guide",
    "Fayda national ID Ethiopia",
    "Addis Ababa housing deportee",
    "Telebirr Ethiopia",
    "Ethio Telecom SIM Ethiopia",
    "Ethiopian diaspora deportee",
  ],
  relatedCountries: ["somalia", "cameroon", "nigeria"],
};

export default ethiopia;
