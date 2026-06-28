import type { CountryData } from "./schema";

const poland: CountryData = {
  slug: "poland",
  countryName: "Poland",
  countryCode: "PL",
  flagEmoji: "🇵🇱",
  region: "Europe",
  capital: "Warsaw",
  languages: ["Polish"],
  currency: "Polish Złoty (PLN)",
  summary:
    "Poland is one of Central Europe's largest and most economically vibrant countries, and a full EU member since 2004. Warsaw is a modern, thriving capital that has rebuilt dramatically from WWII destruction. Kraków is a cultural and university city. Poland has experienced significant economic growth and offers EU citizens full freedom of movement across the Schengen Area. Polish-Americans deported to Poland often have roots in Chicago (one of the largest Polish communities outside Poland) and other Midwestern cities.",
  heroTitle: "Deported to Poland: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, EU rights, healthcare, and work resources for deportees returning to Poland.",
  cities: ["Warsaw", "Kraków", "Wrocław", "Gdańsk"],
  quickFacts: [
    { label: "Capital", value: "Warsaw" },
    { label: "Language", value: "Polish" },
    { label: "Currency", value: "Polish Złoty (PLN)" },
    { label: "Emergency Number", value: "112 (Unified Emergency)" },
    { label: "U.S. Embassy", value: "Warsaw (Aleje Ujazdowskie 29/31)" },
    { label: "Time Zone", value: "UTC+1 (CET) / UTC+2 (CEST in summer)" },
  ],
  returningHome: [
    "Polish citizens are EU citizens — they have full right of movement within the EU/EEA and an automatic right to enter Poland.",
    "Obtain your Dowód Osobisty (Polish national ID card) at your local Urząd Miasta or Gminy.",
    "Register your address (meldunek) at your local municipal office — required for many services.",
    "The Urząd Pracy (Labor Office) provides job placement services and may offer training programs.",
    "Caritas Polska and other NGOs may provide transitional support for vulnerable returnees.",
  ],
  travelDocuments: [
    "The Dowód Osobisty (Polish national ID) is your primary document — apply at your local municipal office with your birth certificate.",
    "A Polish passport is available through the Ministry of Interior passport services.",
    "As an EU citizen, the Dowód Osobisty serves as a travel document within the EU/EEA.",
    "Birth certificates are available from your Urząd Stanu Cywilnego (Civil Status Office).",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Poland for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Warsaw has moderate European housing costs — basic studio apartments in areas like Praga or Bielany may run PLN 2,500–4,000/month.",
    "Kraków and Wrocław are somewhat more affordable — studios from PLN 2,000–3,500/month.",
    "Gdańsk on the Baltic coast has growing but still affordable housing.",
    "otodom.pl and gratka.pl are the main rental platforms in Poland.",
    "Family housing in smaller towns or the countryside is more affordable and available.",
  ],
  jobs: [
    "Poland has a tight labor market with low unemployment — many industries are hiring.",
    "Warsaw's tech sector, financial services, and shared service centers employ English speakers.",
    "Manufacturing employs many in Silesia, Łódź, and other industrial centers.",
    "pracuj.pl and LinkedIn Poland are the main job portals.",
    "EU membership means Polish deportees can also seek work in Germany, Netherlands, UK (post-Brexit restrictions apply), or other EU countries.",
  ],
  healthcare: [
    "Poland's National Health Fund (NFZ — Narodowy Fundusz Zdrowia) provides public healthcare to insured citizens.",
    "Enroll with NFZ by registering as a contribution payer — or if employed, your employer registers you.",
    "Primary care clinics (przychodnie) and hospitals (szpitale) serve NFZ members.",
    "Private healthcare networks (Medicover, LUX MED) provide faster access for those with private insurance or ability to pay.",
    "Emergency care (Szpitalny Oddział Ratunkowy, SOR) is available to everyone regardless of insurance.",
  ],
  mentalHealth: [
    "NFZ covers psychiatric care at public mental health centers (Centra Zdrowia Psychicznego).",
    "Telefon Zaufania dla Dorosłych (116 123) provides crisis support.",
    "Private psychologists and therapists are available in major cities — PLN 150–350/session.",
    "Caritas and other NGOs operate counseling programs.",
    "Poland has been expanding community mental health centers as part of a national reform.",
  ],
  moneyTransfer: [
    "Wise, Revolut, and standard international transfers all work well for Poland.",
    "PKO BP, Pekao, and mBank are major Polish banks — account opening requires national ID.",
    "Revolut has a large user base in Poland and offers easy multi-currency accounts.",
    "BLIK is Poland's instant mobile payment system — widely used by Polish bank customers.",
    "PLN to USD exchange is straightforward through banks or online services.",
  ],
  phoneInternet: [
    "Orange Poland, Play, T-Mobile Poland, and Plus are the main carriers.",
    "Play offers aggressive prepaid pricing — SIM cards available at supermarkets and carrier stores.",
    "Prepaid plans from Play start around PLN 15–30/month for generous data.",
    "4G/5G is extensively available in cities and good along major transport corridors.",
    "Home fiber from Orange or local ISPs typically costs PLN 50–80/month.",
  ],
  transportation: [
    "Warsaw's Metro (2 lines), trams, and buses provide comprehensive city transit — monthly pass around PLN 110.",
    "Kraków and Wrocław have extensive tram networks.",
    "Bolt and Uber operate in major Polish cities.",
    "PKP Intercity trains connect Polish cities — ExpressPendolino serves Warsaw-Kraków in under 2.5 hours.",
    "FlixBus and Polish bus companies provide affordable intercity connections.",
  ],
  legalResources: [
    "Okręgowa Rada Adwokacka (Regional Bar Council) in each city can refer to private attorneys.",
    "Legal aid (nieodpłatna pomoc prawna) is provided at local points established under the 2016 Legal Aid Act.",
    "RPO (Rzecznik Praw Obywatelskich — Ombudsman) investigates rights violations.",
    "UNHCR Poland engages for protection situations.",
    "Refugee and migrant support organizations like Stowarzyszenie Interwencji Prawnej provide advocacy.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Polish-American organizations in Chicago (Polish American Congress) may know legal resources for deportee families.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "As an EU citizen, you have full freedom to work across the EU/EEA — significant flexibility compared to non-EU deportees.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
  ],
  faqs: [
    {
      question: "As a Polish EU citizen, can I work elsewhere in Europe?",
      answer:
        "Yes — as an EU citizen, you have the right to live and work in any EU/EEA country without a work permit. Germany (with its large Polish community), Netherlands, and Scandinavian countries are common destinations for Polish workers seeking higher wages. This EU mobility right significantly expands your options beyond just the Polish job market.",
    },
    {
      question: "How do I get a Dowód Osobisty?",
      answer:
        "Visit your local municipal office (Urząd Miasta or Urząd Gminy) with your birth certificate and a passport photo. The process is typically straightforward for Polish citizens — processing takes 30 days. You will also need to register your address (zameldowanie) at the same office.",
    },
    {
      question: "How good is Poland's healthcare system?",
      answer:
        "Poland's NFZ system provides universal coverage for all insured citizens. Primary care and specialist referrals are available through registered przychodnias (clinics). Wait times can be long for specialists in the public system — many Poles use private networks like Medicover or LUX MED for faster access. Emergency care is always available regardless of insurance status.",
    },
    {
      question: "What is BLIK?",
      answer:
        "BLIK is Poland's mobile payment system used by almost all Polish bank customers. It generates a 6-digit code from your banking app that you enter at ATMs or online checkouts to authorize payments without a card. Once you have a Polish bank account, BLIK makes cashless daily transactions seamless.",
    },
    {
      question: "Is English spoken in Poland?",
      answer:
        "English proficiency has grown significantly among younger Poles and in urban professional environments. In Warsaw, Kraków, and Wrocław, English is commonly used in tech, business, and tourism contexts. In rural areas and among older generations, Polish is essential. Polish is a complex language — expect a significant learning curve.",
    },
  ],
  seoTitle: "Deported to Poland: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Poland. EU citizenship rights, Dowód Osobisty, NFZ healthcare, housing in Warsaw, and work resources.",
  keywords: [
    "deported to Poland",
    "Poland deportee guide",
    "Dowód Osobisty Poland",
    "Warsaw housing deportee",
    "NFZ healthcare Poland",
    "Poland EU work rights",
    "Polish community Chicago deportee",
  ],
  relatedCountries: ["romania", "ukraine", "albania"],
  firstThirtyDays: [
    "Arrive at Warsaw Chopin Airport or Kraków John Paul II Airport — Polish Border Guard processes returning Polish nationals",
    "Get a Play, Orange, T-Mobile, or Plus Poland SIM at the airport or any carrier store — prepaid SIMs require your dowód osobisty (national ID) or passport",
    "Contact family networks in your home city or gmina — Polish Catholic parish communities are strong social networks",
    "Visit the Urząd Gminy or Urząd Miasta to register your pobyt (residence) and obtain or renew your dowód osobisty",
    "Open a bank account at PKO Bank Polski, Bank Pekao, or mBank using your dowód osobisty — or use BLIK digital payments",
    "Register with the Powiatowy Urząd Pracy (PUP — county employment office) for free job placement and retraining",
    "Enroll in NFZ (Narodowy Fundusz Zdrowia) for public health insurance coverage",
    "As an EU citizen, you have full right to work in any EU/EEA country — explore opportunities across Europe if needed",
  ],
  businessDirectory: [
    "Urząd Gminy / Urząd Miasta — residence registration and dowód osobisty (national ID) issuance",
    "Powiatowy Urząd Pracy (PUP) — free employment placement, retraining, and unemployment benefits",
    "PKO Bank Polski and mBank branches — banking with dowód osobisty documentation",
    "Play and Orange Poland stores — SIM cards and mobile data plans",
    "NFZ (Narodowy Fundusz Zdrowia) offices — public health insurance enrollment",
    "ZUS (Zakład Ubezpieczeń Społecznych) — social security and pension registration",
  ],
};

export default poland;
