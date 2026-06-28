import type { CountryData } from "./schema";

const somalia: CountryData = {
  slug: "somalia",
  countryName: "Somalia",
  countryCode: "SO",
  flagEmoji: "🇸🇴",
  region: "Africa",
  capital: "Mogadishu",
  languages: ["Somali", "Arabic"],
  currency: "Somali Shilling (SOS)",
  summary:
    "Somalia has faced decades of civil conflict and state failure, but significant progress has been made in stabilizing parts of the country, particularly Somaliland (a de facto independent region in the north) and Puntland. Mogadishu has been undergoing reconstruction but faces ongoing security threats from Al-Shabaab. Hargeisa in Somaliland is considered significantly more stable. Somali-Americans deported to Somalia often have roots in Minnesota (the largest Somali community in the U.S.) and may face immediate safety and documentation challenges upon return.",
  heroTitle: "Deported to Somalia: Your Survival Guide",
  heroSubtitle:
    "Safety information, community resources, and practical guidance for deportees returning to Somalia.",
  cities: ["Mogadishu", "Hargeisa", "Bosaso", "Kismayo"],
  quickFacts: [
    { label: "Capital", value: "Mogadishu" },
    { label: "Languages", value: "Somali, Arabic" },
    { label: "Currency", value: "Somali Shilling (SOS) — USD widely used" },
    { label: "Emergency Number", value: "999 (in Mogadishu)" },
    { label: "U.S. Embassy", value: "U.S. Embassy operations are limited — contact through regional embassy" },
    { label: "Time Zone", value: "UTC+3 (EAT — no daylight saving)" },
  ],
  returningHome: [
    "Assess current security conditions before arrival — conditions vary dramatically between Mogadishu, Hargeisa (Somaliland), Bosaso (Puntland), and other areas.",
    "Contact family or community members before departure if at all possible to arrange safe reception.",
    "Hargeisa in Somaliland is generally considered significantly more stable than Mogadishu — if your family is from Somaliland, consider going there.",
    "Somali diaspora organizations in Minneapolis may be able to connect you with contacts or resources.",
    "Islamic community organizations (mosques) play a critical role in community support across Somalia.",
  ],
  travelDocuments: [
    "Somalia's civil documentation infrastructure is very limited — obtaining official documents is challenging.",
    "NISA (National Intelligence and Security Agency) and local administrations handle identity documentation.",
    "Somaliland has its own government and issues its own national IDs and passports — if from Somaliland, contact Somaliland Immigration.",
    "If you hold U.S. citizenship, your U.S. passport remains your most reliable identity document.",
    "Birth certificates and civil records were largely destroyed during the civil war — family testimony may be used in their place.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Somalia for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Mogadishu's housing market has recovered significantly in some areas — basic rooms run $100–300/month (USD).",
    "Hargeisa in Somaliland is more affordable and stable — basic housing from $50–150/month.",
    "Bosaso in Puntland has reasonable security and affordable housing.",
    "Family networks and clan structures are the primary housing resource — clan community is the most important social safety net.",
    "Housing through family compounds is the norm — independent rental for a recently arrived deportee is risky without community connections.",
  ],
  jobs: [
    "Mogadishu's economy is recovering — construction, trade, and services are active sectors.",
    "Telecoms is a surprisingly robust sector in Somalia — operators like Hormuud and Somnet pay competitive salaries.",
    "Hargeisa has growing trade, healthcare, and education employment.",
    "Arabic language skills open opportunities in sectors connected to Gulf states.",
    "Remittances remain the backbone of many household incomes — maintaining family connections is economically essential.",
  ],
  healthcare: [
    "Mogadishu's health infrastructure has improved but remains limited — SOS Somalia hospital and some other facilities provide care.",
    "Hargeisa Group Hospital is the main facility in Somaliland — better-resourced than Mogadishu's public options.",
    "International NGOs (MSF, International Medical Corps) provide healthcare in Somalia's major cities.",
    "Islamic charitable organizations run some clinics and health services.",
    "Medical evacuation to Kenya (Nairobi) or Ethiopia (Addis Ababa) is the main option for serious conditions.",
  ],
  mentalHealth: [
    "Mental health resources in Somalia are extremely limited — a country that has experienced prolonged conflict and displacement.",
    "WHO and some NGOs have initiated community-based mental health programs.",
    "Mosque-based spiritual counseling is the most widely accessible support.",
    "Somali diaspora mental health organizations in Minneapolis may provide remote support.",
    "Community networks (clan, neighborhood, mosque) are the primary mental health resource.",
  ],
  moneyTransfer: [
    "Dahabshiil is the dominant remittance company serving Somalia — the most reliable channel for receiving money from the U.S.",
    "Hormuud's EVC Plus (mobile money) is widely used in Mogadishu — analogous to M-Pesa.",
    "Telesom ZAAD serves Somaliland for mobile money.",
    "USD is the primary currency for significant transactions in Somalia.",
    "Western Union has had limited operations — Dahabshiil is the most reliable option.",
  ],
  phoneInternet: [
    "Hormuud (Mogadishu), Telesom (Somaliland), and Golis (Puntland) are the main regional carriers.",
    "Somalia has surprisingly advanced telecommunications — mobile money is deeply integrated into daily life.",
    "SIM cards from the relevant regional carrier are essential — Hormuud in Mogadishu, Telesom in Hargeisa.",
    "Internet is available in major cities — Somalia was one of the first African countries to have affordable broadband (unusual given its other challenges).",
    "Social media (especially Facebook) is widely used across Somalia.",
  ],
  transportation: [
    "Mogadishu has local buses, shared taxis, and bajaj (three-wheelers) for city transport.",
    "Hargeisa has similar shared taxi and bajaj networks.",
    "Security checkpoints are common in Mogadishu — plan extra travel time.",
    "Intercity travel requires careful security assessment — AMISOM escorts may be needed in some areas.",
    "Domestic flights connect Mogadishu with Hargeisa, Bosaso, Kismayo, and other cities.",
  ],
  legalResources: [
    "Somali Federal Government's Attorney General may assist with some legal matters.",
    "Somaliland has its own functioning legal system — courts and a bar association.",
    "UNHCR Somalia is active and provides protection orientation.",
    "Lawyers Without Borders has had engagement in Somalia.",
    "International organizations monitoring Somalia (UNSOM, UNDP) may provide indirect legal resources.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Somali-American community organizations in Minneapolis (Somali Community Inc., CAPI) may provide family support and legal referrals.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "Some individuals deported to Somalia may have protection claims — UNHCR can provide orientation.",
  ],
  faqs: [
    {
      question: "Is Hargeisa really safer than Mogadishu?",
      answer:
        "Yes — Somaliland (of which Hargeisa is the capital) has functioned as a de facto autonomous region with its own government, police, and courts since 1991. Crime rates are lower, and the region has avoided the worst of Somalia's conflict. If your family roots are in Somaliland (Isaaq clan territory primarily), Hargeisa is a significantly safer environment than Mogadishu.",
    },
    {
      question: "What is Dahabshiil and how do I use it?",
      answer:
        "Dahabshiil is a Somali-owned financial services company with extensive networks in Somalia and internationally. It is the primary channel for receiving international remittances from the U.S. and elsewhere. Family in the U.S. can send money through Dahabshiil locations, and you can receive cash at their agents across Somalia and Somaliland.",
    },
    {
      question: "How important is clan identity in Somalia?",
      answer:
        "In Somalia, clan identity (Hawiye, Darood, Isaaq, Dir, etc.) is the primary social structure for security, housing, employment, and community support. Your clan connection determines which neighborhoods are safe for you in Mogadishu, which communities will provide support, and which leaders you can appeal to for assistance. Understanding and working within your clan's networks is critical for safety and survival.",
    },
    {
      question: "How does EVC Plus or ZAAD work?",
      answer:
        "EVC Plus (from Hormuud, used in Mogadishu) and ZAAD (from Telesom, used in Somaliland) are mobile money platforms built on telecom infrastructure. They allow receiving transfers, making payments, and sending money domestically using just a SIM card. They are deeply embedded in Somali daily commerce — even without a bank account, mobile money allows full participation in the local economy.",
    },
    {
      question: "What if I face immediate safety threats upon arrival?",
      answer:
        "Contact your clan community and family immediately — they are the most effective security resource in the Somali context. UNHCR Somalia can provide protection orientation. If you face imminent danger, contact the U.S. Embassy through its emergency line or consular services. Having community contacts arranged before you land is the single most important safety preparation.",
    },
  ],
  seoTitle: "Deported to Somalia: Survival Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Safety-focused guide for U.S. deportees returning to Somalia. Hargeisa vs Mogadishu, Dahabshiil remittances, clan networks, and UNHCR resources.",
  keywords: [
    "deported to Somalia",
    "Somalia deportee guide",
    "Hargeisa Somaliland safer deportee",
    "Dahabshiil Somalia",
    "EVC Plus ZAAD Somalia",
    "Somali community Minneapolis deportee",
    "UNHCR Somalia",
  ],
  relatedCountries: ["ethiopia", "kenya", "djibouti"],
};

export default somalia;
