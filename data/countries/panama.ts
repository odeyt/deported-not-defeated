import type { CountryData } from "./schema";

const panama: CountryData = {
  slug: "panama",
  countryName: "Panama",
  countryCode: "PA",
  flagEmoji: "🇵🇦",
  region: "Central America",
  capital: "Panama City",
  languages: ["Spanish"],
  currency: "Panamanian Balboa / US Dollar (USD)",
  summary:
    "Panama is a small but economically dynamic country known for the Panama Canal, a strong financial services sector, and a dollarized economy. The U.S. dollar is legal tender, making financial adjustment easier for deportees. Panama City is one of Latin America's most modern capitals with strong employment in finance, logistics, and the service sector. Colón and David are secondary urban centers with different economic profiles.",
  heroTitle: "Deported to Panama: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and practical resources for deportees rebuilding life in Panama.",
  cities: ["Panama City", "Colón", "David", "Santiago"],
  quickFacts: [
    { label: "Capital", value: "Panama City" },
    { label: "Language", value: "Spanish" },
    { label: "Currency", value: "US Dollar (USD)" },
    { label: "Emergency Number", value: "911" },
    { label: "U.S. Embassy", value: "Panama City (Demetrio Basilio Lakas Avenue)" },
    { label: "Time Zone", value: "UTC-5 (EST)" },
  ],
  returningHome: [
    "Contact the Tribunal Electoral for a cédula de identidad — Panama's national ID required for all formal activities.",
    "The Registro Civil can provide a certified birth certificate for nationals born in Panama.",
    "If arriving by deportation flight, ONPAR (Panama's migration office) manages reception processing.",
    "Social assistance may be available through the Ministerio de Desarrollo Social (MIDES) for low-income returning citizens.",
    "Panama City has some NGOs providing migrant and returnee support — contact Cáritas Panama for initial guidance.",
  ],
  travelDocuments: [
    "The cédula de identidad is Panama's national ID — apply at any Tribunal Electoral office.",
    "A Panamanian passport is available through the Servicio Nacional de Migración once you have your cédula.",
    "Birth certificates are available from the Registro Civil in the Tribunal Electoral.",
    "If your birth is unregistered, the Tribunal Electoral has a late inscription process.",
    "U.S. citizen children retain their U.S. passports and all rights associated with U.S. citizenship.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Panama for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Panama City has expensive central neighborhoods — working-class areas like Chorillo, Curundú, or La Chorrera offer more affordable rents starting at $250–$500/month.",
    "David in Chiriquí Province is much more affordable with rents around $200–$400/month.",
    "Santiago in Veraguas Province offers lower cost of living for those with roots in the interior.",
    "Encuentra24.com and Facebook Marketplace Panama list rental options.",
    "Many Panamanians rent cuartos (rooms) in family homes — affordable entry-level option in most cities.",
  ],
  jobs: [
    "The Panama Canal Zone and logistics sector employ thousands — English speakers with relevant experience may find opportunities.",
    "Financial services, insurance, and multinational company back-offices in Panama City hire English-speaking workers.",
    "Tourism in the Bocas del Toro, Boquete, and Panama City areas creates employment for hospitality and service workers.",
    "Computrabajo Panama and LinkedIn are the main formal job search platforms.",
    "The informal economy in Colón's free trade zone and street markets offers entry-level opportunities.",
  ],
  healthcare: [
    "The Caja de Seguro Social (CSS) provides healthcare to insured workers and their families — enrollment requires employer registration.",
    "The Ministry of Health (MINSA) operates public hospitals and polyclinics for citizens not covered by CSS.",
    "Hospital Santo Tomás and Hospital del Niño in Panama City are major public hospitals.",
    "Private hospitals include Hospital Nacional and Hospital Punta Pacífica for those with means.",
    "Basic medications are subsidized at public pharmacies within CSS and MINSA facilities.",
  ],
  mentalHealth: [
    "The Hospital Psiquiátrico Nacional in Ancón provides public psychiatric care.",
    "MINSA-affiliated polyclinics offer limited mental health referrals — ask your primary care provider.",
    "Cáritas Panama and faith-based organizations offer counseling for vulnerable populations.",
    "IOM Panama has provided psychosocial support for migrants — verify current program status.",
    "Private psychologists in Panama City typically charge $60–$120 per session.",
  ],
  moneyTransfer: [
    "Panama uses the U.S. dollar — no currency conversion needed for transfers from the U.S.",
    "Wise, Remitly, and Western Union all operate in Panama.",
    "Banco Nacional de Panamá, Banistmo, and Banco General are major banks — open an account with your cédula.",
    "Nequi (from Bancolombia Panama) offers a mobile banking option with easier signup.",
    "ATM networks are widespread in Panama City and major towns.",
  ],
  phoneInternet: [
    "Claro and Tigo are the main mobile carriers in Panama — SIM cards available at retail stores.",
    "Digicel also operates in Panama.",
    "Prepaid SIM cards cost about $1–$3 with data plans starting at $10–$20/month.",
    "Panama City has excellent 4G and growing 5G coverage — rural areas have more limited service.",
    "Home fiber internet from Claro or Cable Onda typically costs $40–$70/month.",
  ],
  transportation: [
    "Panama City's Metro (two lines) provides efficient transit for $0.35 per ride.",
    "Metrobus operates the city's surface bus routes for $0.25 per ride.",
    "Taxis are available city-wide — negotiate or use Uber for transparent pricing.",
    "Intercity buses from Albrook Terminal connect Panama City with David, Colón, and Santiago for $4–$18.",
    "Colón is connected to Panama City via the Trans-Istmic Highway and frequent bus service.",
  ],
  legalResources: [
    "The Defensoría del Pueblo investigates human rights complaints against government entities.",
    "The Instituto de la Defensa de Oficio provides free criminal defense for those who cannot afford attorneys.",
    "UNHCR has a presence in Panama for protection-related legal needs.",
    "The Colegio Nacional de Abogados can refer you to private attorneys for civil and family matters.",
    "Legal aid clinics affiliated with the University of Panama serve low-income clients.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Consult a U.S. immigration attorney about waiver options before taking any action.",
    "U.S. citizen children of deported Panamanians retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can provide post-deportation legal referrals.",
    "Panama's stable dollar economy means you can plan finances in USD without exchange risk.",
  ],
  faqs: [
    {
      question: "Is Panama expensive for a deportee with limited savings?",
      answer:
        "Panama City is relatively expensive by Central American standards, but areas outside the capital — like David, Santiago, or La Chorrera — are much more affordable. The dollarized economy means no currency fluctuation risk, and your savings from the U.S. maintain their value directly.",
    },
    {
      question: "Can I find English-language work in Panama?",
      answer:
        "Yes — Panama has a significant demand for English speakers, particularly in financial services, logistics, and multinational company offices. The Panama Canal authority and related industries also employ bilingual professionals. English-speaking returnees are often competitive for customer service and supervisory roles.",
    },
    {
      question: "What is the CSS and how do I enroll?",
      answer:
        "The Caja de Seguro Social (CSS) is Panama's social security and health insurance system. Enrollment is automatic when you start formal employment — your employer registers you. Without CSS, you can access public hospitals through MINSA, though CSS coverage is significantly more comprehensive.",
    },
    {
      question: "How do I get a Panamanian cédula?",
      answer:
        "Visit any Tribunal Electoral office with your birth certificate. If you were born in Panama, citizenship is confirmed and the cédula is issued — processing times vary by office. The cédula is essential for banking, employment, and government services.",
    },
    {
      question: "Is Panama safe compared to other Central American countries?",
      answer:
        "Panama generally has lower crime rates than El Salvador, Honduras, or Guatemala, though Colón and some Panama City neighborhoods have elevated crime. The country's economic stability and strong rule of law make it a relatively safe Central American destination for returnees.",
    },
  ],
  seoTitle: "Deported to Panama: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Panama. Housing, jobs, healthcare, and legal resources in Panama City and beyond.",
  keywords: [
    "deported to Panama",
    "Panama deportee guide",
    "cédula Panama Tribunal Electoral",
    "Panama City housing deportee",
    "Panama Canal jobs",
    "CSS Panama healthcare",
  ],
  relatedCountries: ["costa-rica", "colombia", "nicaragua"],
  firstThirtyDays: [
    "Arrive at Tocumen International Airport in Panama City — Panamanian immigration processes returning nationals",
    "Get a Cable & Wireless (Más Móvil), Claro, or Movistar Panama SIM at the airport — requires cédula or passport",
    "Contact family networks — Panama's small size means strong regional community connections",
    "Visit the Tribunal Electoral office to obtain or renew your cédula de identidad panameña",
    "Open a bank account at Banco Nacional de Panamá or BAC Panama using your cédula",
    "Register with the MITRADEL (Ministerio de Trabajo y Desarrollo Laboral) for employment services",
    "Enroll in the CSS (Caja de Seguro Social) for healthcare and social security coverage",
    "Contact the Defensoría del Pueblo for legal assistance and human rights support",
  ],
  businessDirectory: [
    "Tribunal Electoral — cédula de identidad issuance and registration services",
    "CSS (Caja de Seguro Social) — public healthcare and social security enrollment",
    "MITRADEL (Ministerio de Trabajo) offices — employment placement and labor rights",
    "Banco Nacional de Panamá branches — banking with cédula documentation",
    "Claro Panama and Movistar Panama stores — SIM cards and mobile plans",
    "Defensoría del Pueblo — human rights and legal assistance for returning citizens",
  ],
};

export default panama;
