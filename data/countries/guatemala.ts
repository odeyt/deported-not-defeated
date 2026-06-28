import type { CountryData } from "./schema";

const guatemala: CountryData = {
  slug: "guatemala",
  countryName: "Guatemala",
  countryCode: "GT",
  flagEmoji: "🇬🇹",
  region: "Central America",
  capital: "Guatemala City",
  languages: ["Spanish", "Indigenous Mayan languages"],
  currency: "Guatemalan Quetzal (GTQ)",
  summary:
    "Guatemala is home to more than 20 Mayan language groups alongside Spanish speakers. It is the most populous country in Central America. Many deportees have deep roots in rural highland communities where indigenous traditions remain strong. Guatemala City is the economic hub, while cities like Quetzaltenango serve as regional centers for the western highlands where many deportees originate.",
  heroTitle: "Deported to Guatemala: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and community resources for deportees returning to Guatemala.",
  cities: ["Guatemala City", "Antigua", "Quetzaltenango", "Cobán"],
  quickFacts: [
    { label: "Capital", value: "Guatemala City" },
    { label: "Languages", value: "Spanish + 22 Mayan languages" },
    { label: "Currency", value: "Guatemalan Quetzal (GTQ)" },
    { label: "Emergency Number", value: "110 (Police) / 122 (Fire)" },
    { label: "U.S. Embassy", value: "Guatemala City (Reforma 7-01, Zone 10)" },
    { label: "Time Zone", value: "UTC-6 (CST)" },
  ],
  returningHome: [
    "Guatemalan citizens have the right to return and must not be denied entry — carry any available identity documents when arriving.",
    "Obtain your DPI (Documento Personal de Identificación) at the Registro Nacional de las Personas (RENAP) — required for banking, employment, and government services.",
    "The government's Dirección General de Migración operates a deportee reception center at La Aurora International Airport.",
    "Organizations such as Asociación Pop No'j and Fundación Sobrevivientes offer support for returnees, particularly from indigenous communities.",
    "Contact your local municipalidad for referrals to community social programs — each department has different available resources.",
  ],
  travelDocuments: [
    "The DPI is Guatemala's national ID — apply at RENAP offices with your birth certificate (partida de nacimiento).",
    "A Guatemalan passport can be obtained through the Ministerio de Relaciones Exteriores once you have your DPI.",
    "If your birth was not registered, RENAP has a supplementary registration process — community health records or witness testimony may be used.",
    "Indigenous community members may also need documentation recognizing their community membership if applying for community-based programs.",
    "U.S. citizen family members retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Guatemala for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Guatemala City has a broad rental market — basic apartments in Zone 6 or 12 may run 1,000–2,500 GTQ/month; areas like Zone 10 are much more expensive.",
    "Quetzaltenango (Xela) is more affordable with rentals starting around 800–1,500 GTQ/month.",
    "Many deportees from rural highland areas return to family land — rebuilding or sharing a family home is common.",
    "Facebook Marketplace Guatemala and Encuentra24 are popular platforms for finding rental listings.",
    "Casas del Migrante exist in Guatemala City and other cities — they provide emergency shelter for newly arrived deportees.",
  ],
  jobs: [
    "Guatemala City's economy includes manufacturing, textiles, call centers, and a growing tech sector.",
    "English-speaking deportees may find call center work in Guatemala City — companies like Teleperformance and Concentrix hire bilinguals.",
    "Agricultural work is prevalent in rural areas — coffee, cardamom, and banana industries hire seasonally.",
    "Computrabajo Guatemala and OLX are the main job listing sites.",
    "Weaving, crafts, and cultural tourism in Antigua and Lake Atitlán areas can support small businesses for those with traditional skills.",
  ],
  healthcare: [
    "The Ministry of Public Health (MSPAS) operates public hospitals and health centers with free or low-cost care for citizens.",
    "The Guatemalan Social Security Institute (IGSS) provides healthcare to formal employees — requires employer registration.",
    "Médicos Sin Fronteras and other NGOs operate clinics in underserved areas.",
    "Pharmacies (farmacias) are abundant — many provide basic consultations for a small fee alongside medication.",
    "Traditional Mayan medicine practitioners (comadronas, curanderos) serve many indigenous communities as primary healthcare providers.",
  ],
  mentalHealth: [
    "Deportation trauma combined with potential violence-related displacement can compound mental health needs for Guatemalan returnees.",
    "Fundación para la Sobrevivencia del Pueblo Maya (Sobrevivientes) offers psychosocial services for trauma survivors.",
    "MSPAS has mental health units at some regional hospitals — access varies by department.",
    "Religious communities (Catholic, evangelical) often provide informal counseling and peer support groups.",
    "IOM Guatemala has offered psychosocial support programs for returnees — check their current program availability.",
  ],
  moneyTransfer: [
    "Remitly, Wise, and Western Union all operate in Guatemala with bank deposit and cash pickup options.",
    "Banco Industrial, Banrural, and G&T Continental are major banks for account opening — a DPI is typically required.",
    "Banrural has an extensive rural network making it accessible outside Guatemala City.",
    "Many deportees receive remittances via agent networks (remesadoras) in their hometowns — Ria and Moneygram are widely available.",
    "Mobile money options are expanding — Tigo Money allows basic transfers via cell phone.",
  ],
  phoneInternet: [
    "Claro and Tigo are the two dominant carriers in Guatemala — SIM cards cost about 10–25 GTQ.",
    "Movistar also operates in urban areas.",
    "Prepaid data plans start around 25–50 GTQ for 1GB — unlimited plans are available for around 100–200 GTQ/month.",
    "Internet is widely available in Guatemala City and major towns — rural areas may have spotty coverage.",
    "Cybercafés remain common in smaller towns for around 3–5 GTQ per hour.",
  ],
  transportation: [
    "Chicken buses (camionetas) — colorfully painted former U.S. school buses — are the main affordable intercity transport, costing 2–15 GTQ.",
    "Monja Blanca and other bus lines offer more comfortable first-class intercity service at higher prices.",
    "Guatemala City has a Transmetro bus rapid transit system and Transurbano for intra-city travel.",
    "Tuk-tuks (mototaxis) are the main transport in Antigua and smaller towns.",
    "Uber operates in Guatemala City for app-based ride-hailing.",
  ],
  legalResources: [
    "Asociación de Abogados y Notarios Maya Chuj offers indigenous legal representation in highland communities.",
    "Instituto de la Defensa Pública Penal (IDPP) provides free criminal defense for those who cannot afford attorneys.",
    "ACNUR (UNHCR) has offices in Guatemala City and assists those who may qualify for refugee protection.",
    "Fundación Myrna Mack advocates for human rights and may assist in cases involving state abuses.",
    "Organización Internacional para las Migraciones (OIM) offers legal orientation for returning migrants.",
  ],
  reentryInfo: [
    "Re-entering the U.S. while under a removal order without authorization may result in permanent inadmissibility.",
    "U.S. citizen children of deportees retain the right to return to the U.S. at any time.",
    "Some waivers (I-212) may be available for certain deportees — consult a licensed U.S. immigration attorney before any action.",
    "Organizations like Casa Guatemala in Los Angeles may connect you with legal resources for post-deportation planning.",
    "Seeking asylum in Guatemala as a way to build a path to the U.S. is not a recognized pathway — consult an attorney for options.",
  ],
  faqs: [
    {
      question: "What is the DPI and how do I get one?",
      answer:
        "The DPI (Documento Personal de Identificación) is Guatemala's national ID card. You obtain it at any RENAP office with your birth certificate. It is required for most formal activities including banking, employment, and voting. If you were born in a remote area without a registered birth, RENAP has a supplementary registration process.",
    },
    {
      question: "Can I access free healthcare without IGSS?",
      answer:
        "Yes. The public health system (MSPAS) operates hospitals and health centers that provide free or subsidized care to all citizens regardless of employment status. Quality and availability vary by region — major public hospitals in Guatemala City have the most services.",
    },
    {
      question: "What if I am from an indigenous community and don't speak Spanish well?",
      answer:
        "Many RENAP and MSPAS offices in highland departments have indigenous language interpreters. Organizations like Asociación Pop No'j specifically serve Mayan communities with culturally appropriate services in languages including K'iche', Mam, and Kaqchikel.",
    },
    {
      question: "How much does it cost to live in Quetzaltenango compared to Guatemala City?",
      answer:
        "Quetzaltenango (Xela) is significantly more affordable — basic living costs may be 30–40% lower than Guatemala City. Rent, food, and transport are all cheaper, making it a practical option for deportees with family connections in the western highlands.",
    },
    {
      question: "Is it dangerous to return to Guatemala as a deportee?",
      answer:
        "Safety depends heavily on your specific community and circumstances. Some deportees face risks from gang activity or pre-existing conflicts. Organizations like UNHCR can assess whether you may qualify for protection if you face threats. Connecting with community organizations before arrival can help you plan a safer return.",
    },
  ],
  seoTitle: "Deported to Guatemala: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Practical guide for U.S. deportees returning to Guatemala. Get DPI, find housing, work, healthcare, and legal resources in Guatemala City and beyond.",
  keywords: [
    "deported to Guatemala",
    "Guatemala deportee guide",
    "DPI Guatemala RENAP",
    "Guatemala City housing deportee",
    "Quetzaltenango returnee resources",
    "indigenous deportee Guatemala",
  ],
  relatedCountries: ["el-salvador", "honduras", "mexico"],
  firstThirtyDays: [
    "Arrive at La Aurora International Airport in Guatemala City — Guatemalan immigration processes returning nationals",
    "Get a Claro or Tigo Guatemala SIM card at the airport or any authorized vendor — requires your DPI or passport",
    "Contact family in your departamento immediately — extended family networks in rural areas are the primary support system",
    "Visit the RENAP (Registro Nacional de las Personas) office to obtain or reactivate your DPI (Documento Personal de Identificación)",
    "Your DPI is the master ID required for banking, employment, and all government services — priority number one",
    "Open a bank account at Banco Industrial, G&T Continental, or Banrural using your DPI",
    "Register with MINTRAB (Ministerio de Trabajo) for free employment placement assistance",
    "Contact IGSS (Instituto Guatemalteco de Seguridad Social) to understand healthcare and social security options",
  ],
  businessDirectory: [
    "RENAP (Registro Nacional de las Personas) — DPI issuance and identity document services nationwide",
    "IGSS (Instituto Guatemalteco de Seguridad Social) — social security healthcare and benefits registration",
    "MINTRAB (Ministerio de Trabajo) offices — free employment placement and labor rights information",
    "Banco Industrial and Banrural branches — banking accessible with DPI documentation",
    "Claro Guatemala and Tigo Guatemala stores — SIM cards and mobile data plans",
    "Asociación Pop No'j — mental health and legal support for returning deportees",
  ],
};

export default guatemala;
