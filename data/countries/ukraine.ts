import type { CountryData } from "./schema";

const ukraine: CountryData = {
  slug: "ukraine",
  countryName: "Ukraine",
  countryCode: "UA",
  flagEmoji: "🇺🇦",
  region: "Europe",
  capital: "Kyiv",
  languages: ["Ukrainian"],
  currency: "Ukrainian Hryvnia (UAH)",
  summary:
    "Ukraine has been under full-scale Russian invasion since February 2022 and is experiencing an ongoing war that has caused enormous civilian displacement, destruction of infrastructure, and humanitarian crisis. Deportees considering return to Ukraine should carefully assess the current security situation, particularly in eastern, southern, and frontline areas. Western cities like Lviv have seen less direct conflict. Ukrainian-Americans deported to Ukraine face a uniquely difficult situation given the active war.",
  heroTitle: "Deported to Ukraine: Your Survival Guide",
  heroSubtitle:
    "Safety-first guidance for deportees returning to Ukraine during the ongoing conflict.",
  cities: ["Kyiv", "Lviv", "Kharkiv", "Odessa"],
  quickFacts: [
    { label: "Capital", value: "Kyiv" },
    { label: "Language", value: "Ukrainian (Russian widely spoken in some areas)" },
    { label: "Currency", value: "Ukrainian Hryvnia (UAH)" },
    { label: "Emergency Number", value: "112 (Unified Emergency)" },
    { label: "U.S. Embassy", value: "U.S. Embassy Kyiv operations are suspended — contact via Warsaw" },
    { label: "Time Zone", value: "UTC+2 (EET) / UTC+3 (EEST in summer)" },
  ],
  returningHome: [
    "URGENT: Ukraine is under active military invasion — assess current security conditions before and during any travel to Ukraine.",
    "The U.S. Embassy in Kyiv has suspended operations — U.S. citizens should contact the U.S. Embassy in Warsaw, Poland for consular assistance.",
    "Enter Ukraine from the western side (Polish border crossings via Lviv) as the safest entry point if you must enter.",
    "Lviv in western Ukraine is the most stable major city — eastern cities like Kharkiv and Odessa face direct attack risks.",
    "Contact family inside Ukraine to understand their current situation before attempting to return.",
  ],
  travelDocuments: [
    "A Ukrainian passport or internal passport (паспорт) is your primary document — apply at State Migration Service of Ukraine offices.",
    "Ukrainians also use ID cards (ID-картка) as national identification.",
    "Birth certificates are available from civil registry offices (органи РАЦС).",
    "If the U.S. Embassy is closed, U.S. citizen deportees should contact the embassy through its emergency line or through nearby U.S. consulates.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Ukraine for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Lviv has seen significant population influx from displaced Ukrainians — housing is tight. Basic apartments run UAH 10,000–25,000/month.",
    "Kyiv has continued functioning despite attacks — housing is available in many districts.",
    "Kharkiv, Odessa, and other frontline-adjacent cities have more significant risks — assess carefully.",
    "OLX Ukraine and DOM.RIA list rentals — many landlords have reduced prices due to wartime conditions.",
    "Family housing is the safest and most practical initial option anywhere in Ukraine.",
  ],
  jobs: [
    "Ukraine's labor market has been significantly disrupted by the war — many businesses have relocated or closed.",
    "Remote work for foreign companies (particularly IT) continues and is in demand — Ukrainian IT professionals are globally recognized.",
    "Reconstruction and logistics employment is growing — the enormous reconstruction effort will create employment.",
    "Work.ua and LinkedIn Ukraine list available positions.",
    "Military service is mandatory for men of military age — understand your obligations under Ukrainian law.",
  ],
  healthcare: [
    "Ukraine has a universal healthcare system that has been strained by the war — hospitals in conflict areas are under attack.",
    "National Health Service of Ukraine (NHSU) coordinates care across the country.",
    "Medical evacuation to Poland or other neighboring countries may be necessary for serious conditions.",
    "Volunteer medical brigades and international medical NGOs provide healthcare support in Ukraine.",
    "Lviv's hospitals are among the better-functioning medical facilities in wartime Ukraine.",
  ],
  mentalHealth: [
    "Wartime trauma is a massive public health issue in Ukraine — mental health needs far exceed current capacity.",
    "Ukrainian crisis support lines: Lifeline Ukraine 7333 provides 24/7 crisis counseling.",
    "International mental health organizations have deployed support to Ukraine.",
    "Community support among Ukrainians who are sharing the wartime experience is a primary resource.",
    "Remote counseling from Ukrainian diaspora organizations in the U.S. may be accessible online.",
  ],
  moneyTransfer: [
    "Wise, Western Union, and MoneyGram can transfer to Ukraine — verify current operational status.",
    "Ukrainian banks (PrivatBank, Monobank, Ощадбанк) have continued operations with adaptations.",
    "Monobank's app allows easy account management digitally.",
    "USD and EUR are widely accepted and preferred for major transactions in wartime Ukraine.",
    "NBU (National Bank of Ukraine) has maintained financial stability measures during the war.",
  ],
  phoneInternet: [
    "Kyivstar (Vodafone), lifecell, and Vodafone Ukraine are the main carriers.",
    "SIM cards require Ukrainian ID (паспорт) registration.",
    "Mobile networks continue to function across most of Ukraine — connection quality varies in conflict zones.",
    "Satellite internet (Starlink) has been deployed widely in Ukraine as a war-resilient connectivity option.",
    "Power grid attacks affect internet infrastructure — outages are common in some areas.",
  ],
  transportation: [
    "Kyiv's metro continues operating with wartime air raid shelter functions.",
    "Ukrzaliznytsia (Ukrainian Railways) continues operating — particularly the Kyiv-Lviv route.",
    "Buses connect Ukrainian cities — check security situation before travel.",
    "Western border crossings (Poland, Slovakia, Hungary, Romania) are the safest entry/exit points.",
    "Commercial airline service is suspended in Ukraine — overland travel is the only option.",
  ],
  legalResources: [
    "Ukrainian Bar Association can refer to attorneys.",
    "U.S. Embassy in Warsaw can assist U.S. citizens who need consular services related to Ukraine.",
    "UNHCR Ukraine is active for protection situations.",
    "Ukrainian Helsinki Human Rights Union monitors rights and may assist.",
    "International Criminal Court (ICC) is active in Ukraine for war crimes documentation.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Ukrainian-American community organizations in Chicago, New York, and Cleveland may know legal resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "Given the active conflict, consult a U.S. immigration attorney about whether temporary protection options may apply.",
  ],
  faqs: [
    {
      question: "Is it safe to return to Ukraine right now?",
      answer:
        "Ukraine has been under full-scale Russian invasion since February 2022, with ongoing attacks on civilian infrastructure, cities, and military targets across the country. No part of Ukraine is entirely safe. Lviv in the far west has experienced fewer direct attacks. The U.S. State Department has issued a Level 4 (Do Not Travel) advisory for Ukraine. Only consider return with extreme caution and with family support in place.",
    },
    {
      question: "What about military service obligations for men?",
      answer:
        "Ukrainian law requires men of military age (18-60) to register for and potentially serve in military defense. As a Ukrainian citizen returning to Ukraine, you may be subject to mobilization requirements. Understand this legal obligation before returning — it significantly affects your freedom of movement within and out of Ukraine.",
    },
    {
      question: "Which part of Ukraine is currently most stable?",
      answer:
        "Lviv in the Zakarpattia/Lviv Oblast area of western Ukraine has experienced fewer ground attacks, though missile strikes occur periodically. Western Ukraine's border areas near Poland are the most stable entry points. Cities like Kyiv continue to function but experience regular missile and drone attacks. Eastern cities (Kharkiv, Zaporizhzhia) and southern cities (Odessa, Mykolaiv) face more direct threats.",
    },
    {
      question: "Can family in the U.S. send me money in Ukraine?",
      answer:
        "Yes — major remittance services including Wise, Western Union, and MoneyGram have continued operations. PrivatBank and Monobank have maintained digital banking services. The National Bank of Ukraine has worked to keep the financial system functioning. Receiving in USD or EUR is often preferred for value stability during the wartime hryvnia pressures.",
    },
    {
      question: "What options exist if I cannot safely return to Ukraine?",
      answer:
        "If you face a removal order to Ukraine but cannot safely return due to the active war, consult a U.S. immigration attorney about temporary protected status (TPS), humanitarian protection, or other relief options. UNHCR and international protection frameworks may be relevant. Organizations like CLINIC can connect you with legal resources.",
    },
  ],
  seoTitle: "Deported to Ukraine: Safety Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Safety-focused guide for U.S. deportees facing return to Ukraine. Current conflict conditions, Lviv as safest city, Monobank, and legal resources.",
  keywords: [
    "deported to Ukraine",
    "Ukraine deportee guide",
    "Ukraine war safety deportee",
    "Lviv Ukraine safest city",
    "Monobank Ukraine",
    "Ukrainian community USA deportee",
    "TPS Ukraine",
  ],
  relatedCountries: ["poland", "romania", "albania"],
};

export default ukraine;
