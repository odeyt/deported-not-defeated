import type { CountryData } from "./schema";

const russia: CountryData = {
  slug: "russia",
  countryName: "Russia",
  countryCode: "RU",
  flagEmoji: "🇷🇺",
  region: "Europe",
  capital: "Moscow",
  languages: ["Russian"],
  currency: "Russian Ruble (RUB)",
  summary:
    "Russia is the world's largest country by area, spanning 11 time zones from Europe to the Pacific. Since February 2022, Russia has been subject to extensive international sanctions following its invasion of Ukraine, which has significantly complicated financial transfers, access to international services, and relations with Western countries. Russian-Americans deported to Russia may face a dramatically different political and media environment than in the U.S. Moscow and Saint Petersburg remain major urban centers with relatively functional infrastructure despite sanctions.",
  heroTitle: "Deported to Russia: Your Survival Guide",
  heroSubtitle:
    "Practical information for deportees returning to Russia's complex current environment.",
  cities: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"],
  quickFacts: [
    { label: "Capital", value: "Moscow" },
    { label: "Language", value: "Russian" },
    { label: "Currency", value: "Russian Ruble (RUB)" },
    { label: "Emergency Number", value: "112 (Unified Emergency)" },
    { label: "U.S. Embassy", value: "Moscow operations significantly reduced — limited consular services" },
    { label: "Time Zone", value: "UTC+3 (MSK — Moscow) to UTC+12" },
  ],
  returningHome: [
    "Russian citizens arrive at major airports (Sheremetyevo, Domodedovo in Moscow; Pulkovo in Saint Petersburg).",
    "Obtain your internal passport (Внутренний паспорт) from the Ministry of Internal Affairs (МВД) — required for banking and domestic transactions.",
    "Be aware that Russia is under international sanctions — access to Western financial services (PayPal, Visa, Mastercard for international use) is restricted.",
    "The U.S. Embassy in Moscow operates with significantly reduced capacity — U.S. citizens should contact the embassy before traveling.",
    "Family networks are the primary social support — community organizations have limited independent capacity in the current political environment.",
  ],
  travelDocuments: [
    "The internal passport (паспорт гражданина РФ) is required for all domestic services — apply at МВД offices.",
    "An international passport (загранпаспорт) is required for international travel — apply at МВД with biometric processing.",
    "Birth certificates are available from civil registry offices (ЗАГС).",
    "If documents were lost, МВД can reissue with family records.",
    "U.S. citizen children retain their U.S. passports — U.S. Embassy services are limited, plan carefully.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Russia for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Moscow is expensive by Russian standards — basic studio apartments in outer districts may run RUB 40,000–80,000/month.",
    "Saint Petersburg is slightly more affordable — studios from RUB 30,000–60,000/month.",
    "Novosibirsk and Yekaterinburg are significantly more affordable — apartments from RUB 15,000–35,000/month.",
    "CIAN.ru and Avito.ru list rental properties across Russia.",
    "Family housing is the most practical and affordable initial option.",
  ],
  jobs: [
    "Russia's labor market has been disrupted by sanctions-related company departures — but domestic employment continues in most sectors.",
    "IT and tech employment continues, particularly for companies serving domestic markets.",
    "Military service obligations exist for Russian male citizens — understand your legal status.",
    "HeadHunter.ru (hh.ru) is Russia's main job portal.",
    "Small business, trade, and service sector employment remains accessible.",
  ],
  healthcare: [
    "Russia's mandatory health insurance (ОМС — обязательное медицинское страхование) provides free care at polyclinics and hospitals.",
    "Register for ОМС through your employer or at a local insurance fund office.",
    "Polyclinics (поликлиники) provide primary care neighborhood level — register with one upon return.",
    "Major hospitals (НМИЦ, Moscow City Hospital No.1) provide specialist care.",
    "Private clinics (ГК Медси, СМ-Клиника) offer faster access for those with means.",
  ],
  mentalHealth: [
    "Public psychiatry is available through the polyclinic system — referral from a therapist (терапевт) is typically needed.",
    "Телефон доверия (crisis helplines) provide emergency psychological support.",
    "Private psychologists practice in Moscow and Saint Petersburg — fees RUB 3,000–7,000/session.",
    "The current political environment complicates open discussion of mental health topics related to political or military matters.",
    "Family support and community networks are the most accessible initial mental health resources.",
  ],
  moneyTransfer: [
    "Due to sanctions, most Western money transfer services (Wise, PayPal, Remitly) cannot transfer to Russia.",
    "Western Union suspended Russia operations following the 2022 invasion.",
    "Alternative channels include cryptocurrency transfers, informal networks, or banking through countries not under sanctions (e.g., UAE, Kazakhstan, Türkiye).",
    "Russian banks (Sberbank, VTB) operate domestically but face international restrictions.",
    "Mir payment system is used domestically — international Visa and Mastercard transactions are disabled.",
  ],
  phoneInternet: [
    "MTS, Beeline, Megafon, and Tele2 are the main mobile carriers in Russia.",
    "SIM cards require registration with an internal passport.",
    "Prepaid data plans from MTS or Megafon start around RUB 300–600/month.",
    "Many Western apps and services are blocked or restricted in Russia — VPN use is legally restricted.",
    "Russian alternatives (Yandex, VKontakte, Telegram) dominate the domestic internet landscape.",
  ],
  transportation: [
    "Moscow's Metro (15 lines) is one of the world's most extensive — fares around RUB 60 with Troika card.",
    "Saint Petersburg also has an extensive metro system.",
    "Russian Railways (РЖД) connects cities across Russia — Sapsan high-speed trains serve Moscow-Saint Petersburg in 4 hours.",
    "Yandex.Go (taxi/rideshare) operates across major Russian cities.",
    "Domestic air travel connects distant cities — Aeroflot and S7 Airlines serve major routes.",
  ],
  legalResources: [
    "The Russian Bar Association (Федеральная палата адвокатов) can refer to private attorneys.",
    "Legal aid (юридическая помощь) is available for qualifying cases through regional legal aid centers.",
    "The Ombudsman (Уполномоченный по правам человека) handles rights complaints.",
    "The U.S. Embassy has limited but some consular services for U.S. citizens — contact them for emergencies.",
    "Independent legal and civil society organizations face significant restrictions in Russia's current environment.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "U.S.-Russia relations are at a historic low — consular services are limited and complicated.",
    "U.S. citizen children retain the right to return to the U.S. at any time — contact the U.S. Embassy for assistance.",
    "Consult a U.S. immigration attorney about waiver options — U.S.-Russia dual citizen cases are particularly complex.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
  ],
  faqs: [
    {
      question: "Can I receive money from family in the U.S. in Russia?",
      answer:
        "This is currently very difficult due to international sanctions. Most Western money transfer services and card networks have suspended Russia operations. Alternative channels include cryptocurrency (Bitcoin, USDT) sent to Russian crypto wallets, transfers through third countries (UAE, Kazakhstan, Armenia) with physical cash pickup, or informal networks. Verify any channel's current legal status in both countries before using.",
    },
    {
      question: "What is the Mir card system?",
      answer:
        "Mir is Russia's domestic payment card system (operated by NSPK), created to provide payment infrastructure independent of Visa and Mastercard. It operates domestically at all Russian banks and merchants. However, Mir is not accepted internationally in most countries (due to sanctions). For domestic daily transactions, Mir works normally.",
    },
    {
      question: "What are the risks for Russian-American men regarding military service?",
      answer:
        "Russian law requires military registration (voinskoye uchetnoe) for male citizens. Since 2022, Russia has also conducted multiple mobilization waves for the Ukraine war. Returning to Russia as a male of military age (18-55+) carries potential mobilization risk. This is a serious legal consideration that should be understood before making any decision about return.",
    },
    {
      question: "How restricted is the internet in Russia?",
      answer:
        "Russia has significantly expanded internet restrictions since 2022. Instagram, Facebook, Twitter/X, and many Western media sites are blocked. VPN use to bypass these restrictions is legally restricted (though widely practiced). Domestic services (Yandex, VKontakte, Telegram) function normally. Google services operate with some restrictions. This significantly changes the information environment compared to the U.S.",
    },
    {
      question: "What should I know about the current political environment?",
      answer:
        "Russia is under wartime governance since February 2022. Laws restrict public criticism of military operations. Independent media has been largely shut down or forced to operate from abroad. Public dissent carries serious legal risks including criminal prosecution. Understanding this environment is critical for anyone returning to Russia — maintaining a low political profile is essential for personal safety.",
    },
  ],
  seoTitle: "Deported to Russia: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Practical guide for U.S. deportees returning to Russia. Sanctions impacts, money transfers, internal passport, and survival information for Moscow and beyond.",
  keywords: [
    "deported to Russia",
    "Russia deportee guide",
    "Russian internal passport МВД",
    "Moscow housing deportee",
    "Russia sanctions money transfer",
    "MTS Beeline SIM Russia",
    "Russian military mobilization deportee",
  ],
  relatedCountries: ["ukraine", "poland", "romania"],
  firstThirtyDays: [
    "Arrive at Sheremetyevo (Moscow) or Pulkovo (St. Petersburg) airport — Russian FSB border control processes returning Russian nationals",
    "Get an MTS, Beeline, MegaFon, or Tele2 SIM at any carrier store — requires your Russian internal passport (паспорт)",
    "Contact family networks in your home city or region — Russian city-based family ties are primary support",
    "Visit the MFC (Multifunctional Center, МФЦ) to obtain or renew your внутренний паспорт (internal Russian passport) — required for all services",
    "Open a bank account at Sberbank or VTB — most Western money transfer services are blocked due to sanctions; use Mir payment system",
    "Set up a SBP (Система Быстрых Платежей) transfer from family using alternative channels such as wire transfers through non-sanctioned banks or crypto",
    "Register at your local housing registry (ЖЭК/МФЦ) for your propiska (residence registration) — required for employment and services",
    "Be aware of mandatory military registration requirements if you are a male citizen of conscription age — consult legal counsel",
  ],
  businessDirectory: [
    "MFC (Многофункциональный Центр / МФЦ) — government services, passport renewal, and registration",
    "Sberbank and VTB branches — banking with internal passport documentation",
    "MTS and MegaFon stores — SIM cards and mobile data plans",
    "Gosuslugi (gosuslugi.ru) — government services portal for document applications and registrations",
    "Mir payment system — domestic card system for payments given Western card restrictions",
    "Pensionny Fond Rossii (PFR) — pension and social insurance registration",
  ],
};

export default russia;
