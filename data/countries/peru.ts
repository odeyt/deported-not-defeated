import type { CountryData } from "./schema";

const peru: CountryData = {
  slug: "peru",
  countryName: "Peru",
  countryCode: "PE",
  flagEmoji: "🇵🇪",
  region: "South America",
  capital: "Lima",
  languages: ["Spanish", "Quechua"],
  currency: "Peruvian Sol (PEN)",
  summary:
    "Peru is a country of extraordinary geographic and cultural diversity, spanning coastal desert, Andean highlands, and Amazon rainforest. Lima is a major Latin American metropolis with significant employment in services, manufacturing, and trade. Many Peruvian deportees have roots in the highland regions of Cusco, Huancayo, or Ayacucho, where Quechua is spoken alongside Spanish. Peru has a growing economy and well-developed infrastructure in coastal cities.",
  heroTitle: "Deported to Peru: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, healthcare, and work resources for deportees rebuilding life in Peru.",
  cities: ["Lima", "Cusco", "Arequipa", "Trujillo"],
  quickFacts: [
    { label: "Capital", value: "Lima" },
    { label: "Languages", value: "Spanish, Quechua" },
    { label: "Currency", value: "Peruvian Sol (PEN)" },
    { label: "Emergency Number", value: "105 (Police) / 116 (Medical)" },
    { label: "U.S. Embassy", value: "Lima (Avenida La Encalada, Surco)" },
    { label: "Time Zone", value: "UTC-5 (no daylight saving)" },
  ],
  returningHome: [
    "Peruvian citizens are received at Jorge Chávez International Airport in Lima — Migraciones processes returning nationals.",
    "Obtain your DNI (Documento Nacional de Identidad) at any RENIEC office — the primary national ID for all formal activities.",
    "Contact your local municipalidad for social assistance programs and CRED (social welfare services).",
    "The Ministerio de la Mujer y Poblaciones Vulnerables may connect you with transitional assistance programs.",
    "Organizations such as Caritas Peru and Jesuit migrant services may offer support for returning deportees.",
  ],
  travelDocuments: [
    "The DNI (Documento Nacional de Identidad) is Peru's national ID — apply at any RENIEC office with your birth certificate (partida de nacimiento).",
    "A Peruvian passport is available through the Ministerio de Relaciones Exteriores once you have your DNI.",
    "Birth certificates are available from the RENIEC or your municipality's civil registry.",
    "If your birth was unregistered, RENIEC has a process for late birth registration.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Peru for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Lima has a broad housing market — working-class districts like San Juan de Lurigancho, Comas, and Villa María del Triunfo offer rentals from PEN 500–1,000/month.",
    "Arequipa and Trujillo are more affordable than Lima — basic apartments may run PEN 400–800/month.",
    "Cusco has affordable informal housing in traditional neighborhoods — seasonal tourism fluctuations affect rental prices.",
    "Urbania, Trovit, and OLX Peru are the main rental platforms.",
    "Extended family housing (quintas, solares) is common in Lima's peripheral districts — affordable but crowded.",
  ],
  jobs: [
    "Lima has significant employment in manufacturing, mining services, retail, and call centers.",
    "English-speaking returnees may find work in BPO/call center companies serving U.S. clients.",
    "Computrabajo Peru and LinkedIn are the main formal job portals.",
    "The mining sector employs many in the Andes — technical skills and certifications are valued.",
    "Gastronomic tourism around Lima, Cusco, and Arequipa creates hospitality employment opportunities.",
  ],
  healthcare: [
    "Peru's public health system (MINSA) provides free or low-cost care at hospitals and centros de salud.",
    "EsSalud provides healthcare to formally employed workers through employer enrollment.",
    "SIS (Seguro Integral de Salud) provides subsidized coverage for low-income citizens — register at your MINSA facility.",
    "Farmacias Inkafarma and Mifarma are widespread pharmacy chains with low-cost medications.",
    "Emergency care is available at MINSA hospitals regardless of insurance status.",
  ],
  mentalHealth: [
    "MINSA has mental health units at major hospitals — request a referral at your centro de salud.",
    "CEPESJU and other NGOs offer counseling for vulnerable populations in Lima.",
    "Línea 113 (Ministry of Health hotline) provides health counseling including mental health guidance.",
    "Faith-based counseling is widely available through Catholic and evangelical communities.",
    "Private psychologists in Lima charge PEN 80–200/session — some offer sliding scale fees.",
  ],
  moneyTransfer: [
    "Wise, Remitly, and Western Union operate in Peru with bank deposits and cash pickup options.",
    "Banco de la Nación, BCP, and Interbank are major banks for account opening — requires DNI.",
    "Yape (BCP) and Plin (Interbank/Scotiabank) are widely-used mobile payment apps.",
    "Western Union agent locations are present in most Peruvian cities and towns.",
    "BCP and Interbank ATMs are widespread — accept international cards.",
  ],
  phoneInternet: [
    "Claro and Movistar Peru are the main carriers — Entel and Bitel are growing competitors with competitive pricing.",
    "SIM cards from any carrier cost about PEN 2–10 at retail stores.",
    "Prepaid data plans start around PEN 15–30/month for basic packages.",
    "Lima has excellent 4G coverage — Andean and Amazon regions have more limited service.",
    "Home fiber internet from Claro or Movistar typically costs PEN 60–120/month.",
  ],
  transportation: [
    "Lima's Metropolitan bus and El Metropolitano BRT system provide transit at PEN 2.50/ride.",
    "Combis (minibuses) serve fixed city routes for PEN 1–2 — faster but more crowded.",
    "Taxis and InDriver/Cabify are widely available in Lima and major cities.",
    "Intercity bus companies (Cruz del Sur, Oltursa, Tepsa) provide comfortable service to Arequipa, Trujillo, and Cusco.",
    "Cusco is accessible from Lima by air (1.5 hours) or bus (20+ hours over Andean roads).",
  ],
  legalResources: [
    "Defensoría del Pueblo provides free legal counseling and rights advocacy for citizens.",
    "ACNUR Peru assists those who may qualify for refugee status or protection.",
    "Caritas Peru provides humanitarian and legal assistance in some regions.",
    "The Colegio de Abogados de Lima can refer to private attorneys for civil and family matters.",
    "Law clinics at PUCP and UNMSM offer free legal consultation for low-income clients.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Consult a U.S. immigration attorney about waiver options — Peruvian community organizations in the U.S. (e.g., in New Jersey, Virginia) may know legal resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "Peruvian consulates in the U.S. may assist with documentation needs for family members.",
  ],
  faqs: [
    {
      question: "What is the DNI and how do I get one?",
      answer:
        "The DNI (Documento Nacional de Identidad) is Peru's national ID card, issued by RENIEC. You apply at any RENIEC office with your birth certificate. It is required for banking, formal employment, healthcare, and government services. A DNI renewal (for those who had one but it expired) is straightforward and relatively fast.",
    },
    {
      question: "What is SIS and who qualifies?",
      answer:
        "The Seguro Integral de Salud (SIS) is Peru's subsidized health insurance for low-income citizens. Qualification is based on economic vulnerability — register at any MINSA health center or hospital with your DNI. SIS covers consultations, medicines, and hospitalizations at MINSA facilities.",
    },
    {
      question: "How affordable is living in Lima compared to other Peruvian cities?",
      answer:
        "Lima is Peru's most expensive city but also offers the most employment opportunities. Cities like Trujillo, Arequipa, and Cusco offer lower costs of living with reasonable employment options. If you have family connections outside Lima, settling there initially may be financially wiser.",
    },
    {
      question: "Is Quechua knowledge helpful or required for settlement in highland areas?",
      answer:
        "In major highland cities (Cusco, Huancayo, Ayacucho), Spanish is the primary language for official and business transactions. However, Quechua is widely spoken in rural communities — if you or your family have Quechua heritage, it can help connect with community networks and local markets.",
    },
    {
      question: "What mobile payment apps should I use?",
      answer:
        "Yape (from BCP) and Plin (from Interbank, BBVA, and Scotiabank) are Peru's most widely used mobile payment apps. They allow instant transfers using just a phone number. Once you have a Peruvian bank account, linking these apps makes everyday transactions much easier.",
    },
  ],
  seoTitle: "Deported to Peru: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Peru. DNI, SIS healthcare, housing in Lima, and legal resources for starting over.",
  keywords: [
    "deported to Peru",
    "Peru deportee guide",
    "DNI RENIEC Peru",
    "Lima housing deportee",
    "SIS healthcare Peru",
    "Claro Entel SIM Peru",
  ],
  relatedCountries: ["ecuador", "colombia", "brazil"],
};

export default peru;
