import type { CountryData } from "./schema";

const costaRica: CountryData = {
  slug: "costa-rica",
  countryName: "Costa Rica",
  countryCode: "CR",
  flagEmoji: "🇨🇷",
  region: "Central America",
  capital: "San José",
  languages: ["Spanish"],
  currency: "Costa Rican Colón (CRC)",
  summary:
    "Costa Rica enjoys one of the highest standards of living in Central America with a stable democracy, strong public healthcare, and a thriving tourism industry. While the cost of living is higher than its neighbors, wages are also higher and formal employment opportunities are broader. San José is the economic and cultural hub, while regions like Alajuela, Cartago, and the Guanacaste coast offer alternatives for settling outside the capital.",
  heroTitle: "Deported to Costa Rica: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, healthcare, and work resources for deportees rebuilding life in Costa Rica.",
  cities: ["San José", "Alajuela", "Cartago", "Liberia"],
  quickFacts: [
    { label: "Capital", value: "San José" },
    { label: "Language", value: "Spanish" },
    { label: "Currency", value: "Costa Rican Colón (CRC)" },
    { label: "Emergency Number", value: "911" },
    { label: "U.S. Embassy", value: "San José (Calle 98, Vía 104, Pavas)" },
    { label: "Time Zone", value: "UTC-6 (CST)" },
  ],
  returningHome: [
    "Costa Rican citizens may obtain their cédula de identidad at the Tribunal Supremo de Elecciones (TSE) — the primary national ID.",
    "Contact the Registro Civil for a certified birth certificate if you don't have one.",
    "Organizations such as ACAI (Asociación de Consultoría e Investigación) and Pastoral Social may offer transitional support.",
    "Costa Rica's CAJA (Seguro Social) is a well-developed public healthcare system available to citizens.",
    "Contact IMAS (Instituto Mixto de Ayuda Social) for social assistance programs for low-income returning citizens.",
  ],
  travelDocuments: [
    "The cédula de identidad is Costa Rica's national ID — apply at TSE offices with your birth certificate.",
    "A Costa Rican passport is available through the Ministry of Foreign Affairs once you have your cédula.",
    "If your birth is unregistered, the Registro Civil has a process for late birth registration.",
    "U.S. citizen family members retain their U.S. passports and can travel independently.",
    "Children born in the U.S. to Costa Rican parents have dual citizenship and carry both U.S. and Costa Rican rights.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Costa Rica for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "San José suburbs like Alajuela, Heredia, and Desamparados have more affordable rents than the capital's center — basic apartments may run ₡200,000–400,000/month.",
    "Liberia in Guanacaste offers lower costs and is a tourism hub with employment opportunities.",
    "Finds24.cr and Encuentra24 are popular rental platforms in Costa Rica.",
    "Many Costa Ricans rent rooms in family homes (casas de habitación) — this is the most affordable entry-level option.",
    "IMAS may assist low-income citizens with emergency housing vouchers — eligibility requires documentation.",
  ],
  jobs: [
    "Costa Rica's call center sector is large — companies like Amazon, HP, and Sykes employ English-speaking workers at competitive wages.",
    "Tourism employs many in the hotel, restaurant, and tour guide sectors — English is a significant asset.",
    "Manufacturing (free trade zones near Alajuela airport) offers formal sector employment with benefits.",
    "Teaching English as a second language is in demand at private language schools.",
    "Computrabajo Costa Rica and LinkedIn are the main formal job portals.",
  ],
  healthcare: [
    "The Caja Costarricense de Seguro Social (CCSS or 'La Caja') provides universal healthcare to citizens and insured residents — it is one of the best public systems in Latin America.",
    "Registration with CCSS requires a cédula — register at any CCSS clinic (EBAIS) in your neighborhood.",
    "Public hospitals include Hospital México, Hospital San Juan de Dios, and Hospital Calderón Guardia in San José.",
    "Medications are heavily subsidized through CCSS — many essential drugs are free or very low cost.",
    "Private clinics and hospitals (Hospital Clínica Bíblica, Hospital CIMA) are available for faster service at higher cost.",
  ],
  mentalHealth: [
    "CCSS offers psychiatric and psychological services at major hospitals — a referral from your EBAIS clinic is typically required.",
    "IAFA (Instituto sobre Alcoholismo y Farmacodependencia) provides free substance abuse and mental health counseling.",
    "Centro de Orientación Familiar and church-affiliated counseling centers serve communities across Costa Rica.",
    "IOM Costa Rica has supported returned migrants with psychosocial programs — verify current availability.",
    "Peer support networks for returnees may exist through migrant-serving NGOs in San José.",
  ],
  moneyTransfer: [
    "Wise, Remitly, and Western Union are all available in Costa Rica with bank transfer and cash pickup options.",
    "Banco Nacional, BAC San José, and Banco de Costa Rica are major banks for account opening — requires cédula.",
    "SINPE Móvil allows inter-bank transfers in Costa Rica via mobile — useful once you have a local bank account.",
    "USD is widely accepted in tourist areas — exchange at a banco or casa de cambio for colones.",
    "ATMs (cajeros automáticos) from Banco Nacional and BAC are widespread.",
  ],
  phoneInternet: [
    "Kölbi (ICE) is the state-owned operator with the widest nationwide coverage.",
    "Movistar and Claro are private competitors with good urban coverage.",
    "Prepaid SIM cards from Kölbi cost around ₡1,000 and data plans start at ₡5,000–10,000/month.",
    "Costa Rica has good 4G coverage in urban areas — fiber internet is available in many neighborhoods.",
    "Free Wi-Fi is available at public libraries, MINAE parks, and many cafes.",
  ],
  transportation: [
    "San José's TUASA and Metrobus systems provide city bus service at ₡500–650 per ride.",
    "Intercity bus terminals (Terminal del Caribe, Coca-Cola terminal) connect to all major cities.",
    "Taxis are regulated — look for the orange color and use the meter (María) or use Uber/InDriver for app-based rides.",
    "The San José–Alajuela–Heredia commuter rail runs limited hours but is affordable.",
    "Car ownership is expensive — most urban residents use buses and rideshare.",
  ],
  legalResources: [
    "The Defensoría de los Habitantes (Ombudsman) investigates human rights violations by government entities.",
    "The Colegio de Abogados can refer you to attorneys for family, immigration, and civil law matters.",
    "CEJIL (Center for Justice and International Law) handles serious human rights cases in the region.",
    "UNHCR has a presence in Costa Rica for those who may qualify for refugee status.",
    "Legal aid clinics at the University of Costa Rica's School of Law provide pro bono services.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Consult a U.S. immigration attorney about waiver options before taking any action.",
    "U.S.-citizen children of deported Costa Ricans retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal consultation.",
    "Costa Rica's stable legal environment means you may have access to better legal support than in some neighboring countries.",
  ],
  faqs: [
    {
      question: "How good is Costa Rica's free healthcare for a returnee?",
      answer:
        "Costa Rica's CCSS (La Caja) is genuinely one of the best public health systems in Latin America. Once you have your cédula and register at your local EBAIS clinic, you have access to primary care, specialist referrals, hospitalization, and heavily subsidized medications. Wait times for specialists can be long, but emergency care is immediate.",
    },
    {
      question: "What are the best cities to settle as a deportee?",
      answer:
        "Alajuela near the airport is popular due to job opportunities in free trade zones and lower rents than San José. Liberia in Guanacaste has growing tourism employment. Smaller cities like Cartago offer quiet, affordable living with easy commute access to San José.",
    },
    {
      question: "Is it easy to find work in Costa Rica with U.S. experience?",
      answer:
        "English-speaking returnees with U.S. work experience are often competitive candidates for call center jobs, hotel management, and bilingual roles. Costa Rica has a formalized labor market — most jobs require a cédula, and employers value documented work history.",
    },
    {
      question: "How much does it cost to live in Costa Rica?",
      answer:
        "Costa Rica is more expensive than neighboring Central American countries. A modest lifestyle in Alajuela or Cartago might cost $600–$900/month for a single person including rent, food, and transport. San José's central neighborhoods are more expensive.",
    },
    {
      question: "Can I bring my U.S.-citizen children to Costa Rica?",
      answer:
        "Yes — U.S. citizens can enter and reside in Costa Rica. Your children would maintain their U.S. citizenship and can return to the U.S. at any time. Enrolling them in Costa Rican schools is straightforward with birth certificate and immunization records.",
    },
  ],
  seoTitle: "Deported to Costa Rica: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Costa Rica. Find housing, jobs, CCSS healthcare, and legal resources in San José and beyond.",
  keywords: [
    "deported to Costa Rica",
    "Costa Rica deportee guide",
    "cédula Costa Rica TSE",
    "CCSS healthcare Costa Rica",
    "San José housing deportee",
    "Costa Rica call center jobs",
  ],
  relatedCountries: ["panama", "nicaragua", "colombia"],
};

export default costaRica;
