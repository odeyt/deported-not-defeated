import type { CountryData } from "./schema";

const jamaica: CountryData = {
  slug: "jamaica",
  countryName: "Jamaica",
  countryCode: "JM",
  flagEmoji: "🇯🇲",
  region: "Caribbean",
  capital: "Kingston",
  languages: ["English", "Jamaican Patois"],
  currency: "Jamaican Dollar (JMD)",
  summary:
    "Jamaica is an English-speaking Caribbean island nation with a vibrant culture, strong diaspora ties to the U.S. and UK, and a tourism-driven economy. Many deportees have family networks in Kingston, Spanish Town, and rural parishes. While Jamaica faces economic and security challenges, English fluency gives returnees a significant advantage in the job market. The country's official language is English, making administrative processes more accessible than in Spanish-speaking countries.",
  heroTitle: "Deported to Jamaica: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and community resources for deportees returning to Jamaica.",
  cities: ["Kingston", "Montego Bay", "Spanish Town", "Portmore"],
  quickFacts: [
    { label: "Capital", value: "Kingston" },
    { label: "Languages", value: "English, Jamaican Patois" },
    { label: "Currency", value: "Jamaican Dollar (JMD)" },
    { label: "Emergency Number", value: "119 (Police) / 110 (Ambulance)" },
    { label: "U.S. Embassy", value: "Kingston (142 Old Hope Road)" },
    { label: "Time Zone", value: "UTC-5 (EST, no daylight saving)" },
  ],
  returningHome: [
    "Jamaican citizens deported from the U.S. typically arrive at Norman Manley International Airport in Kingston or Sangster International in Montego Bay.",
    "The Passport, Immigration and Citizenship Agency (PICA) processes returning nationals — bring any available identity documents.",
    "Obtain your national ID from the National Identification and Registration Authority (NIRA) or a Jamaican passport from PICA.",
    "The Social Development Commission (SDC) may connect you with community-level support programs.",
    "Organizations such as the Returning Residents Facilitation Unit (under the Ministry of Foreign Affairs) provide assistance for Jamaicans returning from abroad.",
  ],
  travelDocuments: [
    "A Jamaican passport is your primary travel document — apply through PICA in Kingston or at regional offices.",
    "Birth certificates are available from the Registrar General's Department (RGD) in Kingston.",
    "A national ID card can be obtained through NIRA once your identity is confirmed.",
    "If your documents were lost during deportation, PICA can verify citizenship through birth records and witnesses.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Jamaica for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Kingston's housing market varies greatly by area — working-class neighborhoods like Portmore or Spanish Town offer rents around J$30,000–60,000/month.",
    "Montego Bay has tourist-area housing that can be expensive but more affordable options exist in Bogue and Flankers.",
    "Many Jamaicans rent rooms in family homes — this is the most affordable entry for returning deportees.",
    "Facebook Marketplace Jamaica and jamaicarealty.com list available rentals.",
    "Rural parish communities often have affordable land and housing where returnees with family connections can resettle.",
  ],
  jobs: [
    "The Business Process Outsourcing (BPO) sector in Kingston and Montego Bay employs thousands of English speakers — companies like Teleperformance and itel operate major centers.",
    "Tourism in Montego Bay, Ocho Rios, and Negril employs hotel, restaurant, and tour workers.",
    "Construction is active island-wide — certified tradespeople may find consistent work.",
    "The Jamaica Jobs Online (jjobs.com) and LinkedIn list formal sector openings.",
    "Small businesses — food vending, transportation (route taxi), and services — are accessible entry points for the informal economy.",
  ],
  healthcare: [
    "Public hospitals under the Ministry of Health are free for Jamaican citizens — major facilities include Kingston Public Hospital (KPH) and Cornwall Regional Hospital in Montego Bay.",
    "Community health centers (health clinics) provide primary care island-wide.",
    "The National Health Fund (NHF) subsidizes medications for chronic conditions like diabetes and hypertension.",
    "Private hospitals and doctors operate in Kingston and Montego Bay for those who can pay out-of-pocket.",
    "Pharmacy chains like Fontana and MedX offer prescription and OTC medications.",
  ],
  mentalHealth: [
    "Bellevue Hospital in Kingston is Jamaica's main public psychiatric facility.",
    "Community mental health nurses and social workers operate through regional health authorities.",
    "Faith-based counseling is widely available — churches of all denominations provide pastoral support.",
    "The Returning Residents Facilitation Unit may refer returnees to social services including mental health support.",
    "Peer support groups for returning residents exist in some communities — ask at your local health center.",
  ],
  moneyTransfer: [
    "Western Union and MoneyGram have extensive agent networks in Jamaica — cash pickups available at SuperPlus, Hi-Lo, and other agents.",
    "Remitly and Wise offer competitive digital transfers to Jamaican bank accounts.",
    "National Commercial Bank (NCB), Scotiabank Jamaica, and JN Bank are the main banks for account opening — requires national ID.",
    "JN Money offers mobile wallet services for Jamaicans with basic documentation.",
    "Cambio (money exchange) shops are present in major towns for currency exchange.",
  ],
  phoneInternet: [
    "Digicel and Flow are Jamaica's two main mobile carriers — SIM cards are available at any carrier store or authorized dealer.",
    "Prepaid SIM cards cost about J$200–500 with data plans starting at J$500–1,000/month.",
    "Digicel has wider rural coverage; Flow is stronger in some urban areas.",
    "4G coverage is good in Kingston and tourist areas; rural areas may have 3G or lower.",
    "Cybercafés exist in most towns for internet access at J$100–200 per hour.",
  ],
  transportation: [
    "Route taxis are the main inexpensive transport in Kingston and across the island — fixed-route shared taxis with standard fares.",
    "JUTC (Jamaica Urban Transit Company) operates public buses in Kingston for J$60–90.",
    "Intercity travel by minibus or shared taxi is available — fares depend on distance.",
    "Uber and InDriver operate in Kingston and Montego Bay.",
    "Renting or purchasing a vehicle is common for those who can afford it — Jamaica drives on the left.",
  ],
  legalResources: [
    "Legal Aid Council Jamaica provides free legal services to qualifying low-income individuals.",
    "The Office of the Public Defender investigates human rights and justice complaints.",
    "The Bar Association of Jamaica can refer you to private attorneys for immigration and family law.",
    "UNHCR has a regional presence for those with protection needs.",
    "Caribbean Vulnerable Communities Coalition (CVC) advocates for vulnerable populations including deportees.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Consult a U.S. immigration attorney about waivers or appeals applicable to your case.",
    "U.S. citizen children of deported Jamaicans retain the right to return to the U.S. at any time.",
    "Jamaica's English-language legal system makes it easier to research your rights independently.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal consultation.",
  ],
  faqs: [
    {
      question: "What is the Returning Residents Facilitation Unit?",
      answer:
        "The Returning Residents Facilitation Unit, under Jamaica's Ministry of Foreign Affairs, assists Jamaicans returning from abroad — including deportees. They may provide information on accessing government services, employment programs, and social support. Contact them upon arrival to understand available resources.",
    },
    {
      question: "How do I get Jamaican ID if I have no documents?",
      answer:
        "Start at the Registrar General's Department (RGD) to obtain your birth certificate — bring any available records and family members who can testify to your identity. Once you have a birth certificate, NIRA can issue a national ID and PICA can issue a passport.",
    },
    {
      question: "Is the BPO sector a realistic job option for returnees?",
      answer:
        "Yes — Jamaica's BPO industry specifically values English fluency and U.S. cultural familiarity, which many deportees have. Companies in Kingston and Montego Bay hire regularly, and the pay (typically J$60,000–120,000+/month) is above the local average for non-specialized workers.",
    },
    {
      question: "What areas of Kingston should deportees be cautious about?",
      answer:
        "Areas such as Tivoli Gardens, Arnett Gardens, and parts of Spanish Town have historically high crime rates. Connect with family or community organizations before settling in any neighborhood. Many returnees live safely by staying within known community networks and avoiding unfamiliar areas at night.",
    },
    {
      question: "Can I access free healthcare in Jamaica without insurance?",
      answer:
        "Yes — public hospitals and health clinics under the Ministry of Health are free to Jamaican citizens. No insurance is required for emergency and primary care. The National Health Fund also subsidizes medications for chronic conditions through registered pharmacies.",
    },
  ],
  seoTitle: "Deported to Jamaica: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Jamaica. Housing, BPO jobs, healthcare, and legal resources in Kingston and Montego Bay.",
  keywords: [
    "deported to Jamaica",
    "Jamaica deportee guide",
    "Jamaican passport PICA",
    "Kingston housing deportee",
    "Jamaica BPO jobs",
    "Digicel SIM Jamaica",
  ],
  relatedCountries: ["dominican-republic", "trinidad-and-tobago", "bahamas"],
};

export default jamaica;
