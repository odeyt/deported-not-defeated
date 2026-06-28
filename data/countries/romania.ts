import type { CountryData } from "./schema";

const romania: CountryData = {
  slug: "romania",
  countryName: "Romania",
  countryCode: "RO",
  flagEmoji: "🇷🇴",
  region: "Europe",
  capital: "Bucharest",
  languages: ["Romanian"],
  currency: "Romanian Leu (RON)",
  summary:
    "Romania is an Eastern European EU member state with a rich cultural heritage, growing economy, and affordable cost of living by Western European standards. Bucharest is a vibrant capital with a growing tech sector. Cluj-Napoca has emerged as a major tech hub. Romanian-Americans deported to Romania often come from communities in cities like New York, Chicago, and Detroit, and may have strong family ties in regions like Moldova (Romanian Moldova, not the country), Transylvania, and Wallachia.",
  heroTitle: "Deported to Romania: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, healthcare, and work resources for deportees returning to Romania.",
  cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași"],
  quickFacts: [
    { label: "Capital", value: "Bucharest" },
    { label: "Language", value: "Romanian" },
    { label: "Currency", value: "Romanian Leu (RON)" },
    { label: "Emergency Number", value: "112 (Unified Emergency)" },
    { label: "U.S. Embassy", value: "Bucharest (4-6 Doctor Liviu Librescu Blvd)" },
    { label: "Time Zone", value: "UTC+2 (EET) / UTC+3 (EEST in summer)" },
  ],
  returningHome: [
    "Romanian citizens are EU citizens — they have free movement across EU/EEA states.",
    "Obtain your Romanian ID card (carte de identitate) at your local Serviciul Public Comunitar de Evidență a Persoanelor (SPCLEP).",
    "Contact your local primărie (mayor's office) for social assistance programs available in your municipality.",
    "Organizations like Caritas România and Diaconia may provide transitional support for vulnerable returnees.",
    "The Agenția Națională pentru Ocuparea Forței de Muncă (ANOFM) helps with job placement and retraining programs.",
  ],
  travelDocuments: [
    "The carte de identitate (Romanian national ID) is available at your local SPCLEP with your birth certificate.",
    "A Romanian passport is available through the Ministry of Internal Affairs passport service.",
    "Birth certificates are available from the civil status registry (Starea Civilă) in your municipality.",
    "As EU citizens, Romanians can also use their national ID card to travel within the EU/EEA.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Romania for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Bucharest has moderate European housing costs — basic studio apartments in areas like Militari or Drumul Taberei may run RON 1,500–2,500/month.",
    "Cluj-Napoca has become expensive by Romanian standards due to the tech sector — basic studios from RON 1,800–3,000/month.",
    "Timișoara and Iași are more affordable — basic apartments from RON 1,200–2,000/month.",
    "OLX Romania and imobiliare.ro are the main rental platforms.",
    "Family housing in smaller towns and villages is the most affordable initial option.",
  ],
  jobs: [
    "Romania has a significant IT sector — Bucharest and Cluj-Napoca have many tech companies and outsourcing firms.",
    "English is widely used in Romanian IT and corporate environments — a significant advantage for returnees.",
    "The manufacturing sector employs many in cities like Ploiești, Pitești, and Brașov.",
    "ejobs.ro, bestjobs.eu, and LinkedIn Romania are the main job portals.",
    "Romania's growing economy and EU membership create diverse employment opportunities.",
  ],
  healthcare: [
    "Romania's public health system (Sistemul Național de Sănătate) is available to insured citizens — register with CNAS (National Health Insurance House).",
    "As a returning citizen, you can register for health insurance through CNAS — contributions are income-based.",
    "County hospitals (spitale județene) provide specialist care; polyclinici provide primary care.",
    "Family doctors (medici de familie) are the primary care entry point — register with one in your area.",
    "Private clinics (MedLife, Regina Maria) offer faster access to better-resourced care.",
  ],
  mentalHealth: [
    "Public psychiatry services are available at county hospitals — referral from a family doctor is typically needed.",
    "SOS Telefonul Copilului and other crisis lines provide support.",
    "Private psychologists and therapists are available in major cities — fees range from RON 150–350/session.",
    "NGOs like Salvaţi Copiii (Save the Children) and Caritas have some counseling programs.",
    "Mental health awareness is growing in Romania but stigma remains — private services are more accessible.",
  ],
  moneyTransfer: [
    "Wise, Revolut, and Western Union all operate in Romania.",
    "BCR, BRD, Raiffeisen, and ING are major banks — Revolut and Wise offer easier digital account options.",
    "Revolut is particularly popular in Romania — easy account opening and multi-currency management.",
    "Romania is in the EU but not the Eurozone — payments are in RON domestically.",
    "SWIFT transfers to Romanian bank accounts work well for larger amounts from U.S. banks.",
  ],
  phoneInternet: [
    "Orange Romania, Vodafone Romania, and Digi Mobil are the main carriers.",
    "Digi (RCS&RDS) offers extremely competitive rates — SIM cards at their stores.",
    "Prepaid plans from Orange or Vodafone start around RON 10–30/month.",
    "Romania has some of the fastest and most affordable home internet in Europe — Digi home fiber for RON 30–50/month.",
    "4G/5G is widely available in Romanian cities and towns.",
  ],
  transportation: [
    "Bucharest has a metro network (4 lines), buses, trams, and trolleybuses.",
    "STB (Societatea de Transport București) provides city bus and tram service.",
    "Bolt and Uber operate in Bucharest and other major cities.",
    "InterCity and InterRegio trains connect major Romanian cities — CFR Călători is the national operator.",
    "FlixBus serves major Romanian cities from Western European connections.",
  ],
  legalResources: [
    "Baroul (Bar Association) in each county can refer to private attorneys.",
    "National Legal Aid Board (Sistemul de Ajutor Public Judiciar) provides legal aid for qualifying individuals.",
    "Avocatul Poporului (Ombudsman) investigates administrative complaints.",
    "UNHCR Romania has an office for protection matters.",
    "Pro Democrația and other civil society organizations provide advocacy support.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Romanian-American community organizations (particularly in Detroit, Chicago, and New York) may know legal resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "As an EU citizen, you have freedom of movement within EU/EEA — work opportunities extend across Europe.",
  ],
  faqs: [
    {
      question: "As a Romanian citizen, can I work anywhere in the EU?",
      answer:
        "Yes — as an EU citizen, you have the right to live and work in any EU/EEA country (Germany, France, Austria, Ireland, etc.) without a work permit. This is a significant advantage for Romanian deportees — you are not limited to the Romanian job market and can pursue opportunities in more prosperous EU countries while maintaining Romanian citizenship.",
    },
    {
      question: "How affordable is Romania compared to Western Europe?",
      answer:
        "Romania is significantly more affordable than Western European countries. A basic monthly budget in a smaller city might be €400–600, compared to €1,500+ in Germany or the UK. The lower cost of living combined with EU access to higher-wage markets (remote work for Western European companies) creates real opportunities for returning Romanian deportees.",
    },
    {
      question: "How do I get my carte de identitate?",
      answer:
        "Visit your local Serviciul Public Comunitar de Evidenţă a Persoanelor (SPCLEP) with your birth certificate and any prior ID. If you lived at a specific address in Romania before leaving, you can register there. If returning to a new address, bring proof of residence (rental agreement, utility bill). Processing takes a few days to a few weeks.",
    },
    {
      question: "What is the healthcare enrollment process?",
      answer:
        "Romania has a national health insurance system (CNAS). As a citizen returning from abroad without a Romanian employer, you can register as a voluntary contributor (plătitor de contribuţii de sănătate) and pay health insurance premiums. Once enrolled, you register with a family doctor (medic de familie) in your area for primary care access.",
    },
    {
      question: "Does my U.S. criminal record affect job prospects in Romania?",
      answer:
        "Romanian employers typically conduct background checks on Romanian criminal records. U.S. criminal records do not automatically appear in Romanian checks unless you disclose them. Some government, military, and security positions may require disclosure of foreign convictions. Private sector and tech employment is generally less restrictive.",
    },
  ],
  seoTitle: "Deported to Romania: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Romania. EU citizenship benefits, Romanian ID, healthcare, housing in Bucharest, and work resources.",
  keywords: [
    "deported to Romania",
    "Romania deportee guide",
    "carte de identitate Romania",
    "Bucharest housing deportee",
    "Romania EU work rights",
    "Orange Digi SIM Romania",
    "Romania IT sector jobs",
  ],
  relatedCountries: ["albania", "ukraine", "poland"],
};

export default romania;
