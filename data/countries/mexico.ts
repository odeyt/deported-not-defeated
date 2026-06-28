import type { CountryData } from "./schema";

const mexico: CountryData = {
  slug: "mexico",
  countryName: "Mexico",
  countryCode: "MX",
  flagEmoji: "🇲🇽",
  region: "North America",
  capital: "Mexico City",
  languages: ["Spanish"],
  currency: "Mexican Peso (MXN)",
  summary:
    "Mexico is the most common destination for U.S. deportees, sharing a nearly 2,000-mile border and deep cultural ties. Many deportees have family networks, Spanish language skills, and some prior knowledge of Mexican life that can ease the transition. Cities like Tijuana and Nogales sit right at the border, while Mexico City offers major employment and services hubs.",
  heroTitle: "Deported to Mexico: Your Survival Guide",
  heroSubtitle:
    "Practical steps for housing, work, documents, and rebuilding your life after deportation to Mexico.",
  cities: ["Mexico City", "Guadalajara", "Monterrey", "Tijuana"],
  quickFacts: [
    { label: "Capital", value: "Mexico City" },
    { label: "Language", value: "Spanish" },
    { label: "Currency", value: "Mexican Peso (MXN)" },
    { label: "Time Zones", value: "UTC-6 to UTC-8" },
    { label: "Emergency Number", value: "911" },
    { label: "U.S. Embassy", value: "Mexico City (Paseo de la Reforma 305)" },
  ],
  returningHome: [
    "If you were born in Mexico, you are a Mexican citizen by birth — contact the Registro Civil to obtain your birth certificate if you don't have one.",
    "Apply for a CURP (Clave Única de Registro de Población) at any CURP office or online via gob.mx — this is your primary government ID number.",
    "Obtain a credencial del INE (voter ID) at your local INE office — this serves as your main national photo ID.",
    "If you have children or property in the U.S., contact a cross-border family attorney before making long-term housing commitments.",
    "Organizations like Al Otro Lado, Deportee Welcome Center (Casa del Migrante Tijuana), and Coalición de Derechos Humanos may offer transitional support near the border.",
  ],
  travelDocuments: [
    "Your Mexican birth certificate (acta de nacimiento) is the foundation — request it from the civil registry of the state where you were born.",
    "CURP registration is free and required for most government services, banking, and school enrollment.",
    "A Mexican passport may be needed if you plan to travel internationally — apply at a Secretaría de Relaciones Exteriores (SRE) office.",
    "If your documents were lost or seized during deportation, you may request emergency consular documentation from a Mexican consulate or via a Mexican government representative at the port of entry.",
    "A U.S. passport is still valid for travel if you hold U.S. citizenship — however entering the U.S. may violate your removal order.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Mexico for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Border cities like Tijuana and Ciudad Juárez have migrant shelters (casas del migrante) that offer temporary housing for newly deported individuals.",
    "Rental prices vary widely: Tijuana averages 5,000–10,000 MXN/month for a basic apartment; Mexico City ranges from 8,000–18,000 MXN/month.",
    "Use Facebook Marketplace, Inmuebles24, or Vivaanuncios to search for rentals — most landlords in Mexico do not require credit checks.",
    "In many cities, informal cuartos de renta (rooms for rent) can be found by word of mouth or handwritten signs on walls and poles.",
    "Migrant organizations such as Casa del Migrante network can provide short-term shelter referrals across different Mexican states.",
  ],
  jobs: [
    "Spanish fluency and U.S. work experience (especially in manufacturing, construction, or services) can be valuable in border cities with maquiladoras.",
    "Tijuana and Monterrey have strong manufacturing and call center job markets — English speakers are often in high demand.",
    "OCC Mundial, Indeed México, and Computrabajo are the main online job portals in Mexico.",
    "Day labor markets (mercados de trabajo) exist in many cities where people gather early morning looking for construction or agricultural work.",
    "Self-employment as a street vendor, food cart operator, or informal tradesperson is common — start-up costs can be low.",
  ],
  healthcare: [
    "Mexico has a public healthcare system (IMSS) available to citizens and formal workers — registration usually requires a CURP and an employer.",
    "INSABI (now called IMSS-Bienestar) provides free or low-cost healthcare to uninsured Mexicans at government clinics (Centros de Salud).",
    "Pharmacy chains like Farmacias Similares and Farmacias del Ahorro have attached low-cost medical consultation windows for around 50–80 MXN.",
    "Public hospitals (hospitales generales) accept walk-in patients for emergency care — bring your CURP or birth certificate.",
    "Mental health services are available at some IMSS clinics and through NGOs operating in border cities.",
  ],
  mentalHealth: [
    "Deportation trauma is real — anxiety, depression, and grief are common responses to sudden forced removal from the country you called home.",
    "Centro de Integración Juvenil has locations across Mexico offering affordable counseling and substance abuse support.",
    "Many Catholic and evangelical churches in border cities offer free pastoral counseling and peer support groups for migrants.",
    "IMSS offers limited psychiatric services through their hospital network — ask your clinic for a referral.",
    "International organizations like the International Organization for Migration (IOM) may connect you with psychosocial support in certain areas.",
  ],
  moneyTransfer: [
    "Wise, Remitly, and WorldRemit offer competitive rates for receiving money from the U.S. — funds can be deposited directly to a Mexican bank account or picked up at OXXO stores.",
    "OXXO convenience stores accept Remitly and MoneyGram transfers for cash pickup — they are ubiquitous across Mexico.",
    "Opening a Mexican bank account (Banamex, BBVA, Santander, Banorte) typically requires a CURP and an address proof.",
    "Cuenta Akesi and Klar are digital banks with easier signup for those without established credit or full documentation.",
    "Western Union has thousands of agent locations across Mexico for cash pickups.",
  ],
  phoneInternet: [
    "Telcel is Mexico's largest mobile network and has the best coverage nationwide — SIM cards can be bought at OXXO, Telcel stores, or pharmacies.",
    "Movistar and AT&T México are also widely available with competitive prepaid plans.",
    "A basic prepaid SIM costs around 50–100 MXN with data plans starting at around 100 MXN/month.",
    "Internet cafes still exist in smaller towns — typically 10–20 MXN per hour.",
    "Most public spaces, libraries, and government offices offer free Wi-Fi under the Puntos México Conectado program.",
  ],
  transportation: [
    "Mexico City has an extensive metro system with 12 lines — tickets cost 5 MXN per ride as of 2024.",
    "Intercity bus travel is reliable and affordable — ADO, ETN, and Primera Plus serve most major routes.",
    "Taxis and Uber are widely available in larger cities — always confirm the fare or use the app for safety.",
    "In border cities, many people walk or bicycle across the city — local buses (microbuses) are the main affordable option.",
    "Driving requires a valid license — Mexican states issue licenses with CURP and a local address.",
  ],
  legalResources: [
    "Al Otro Lado provides free legal services to deportees along the U.S.-Mexico border.",
    "Coalición de Derechos Humanos offers advocacy and legal support in the Sonora/Arizona border region.",
    "COMAR (Comisión Mexicana de Ayuda a Refugiados) can assist those who may qualify for refugee status in Mexico.",
    "Mexico's Comisión Nacional de Derechos Humanos (CNDH) investigates human rights complaints and may assist in cases of mistreatment.",
    "Barra de Abogados and local bar associations can refer you to low-cost or pro bono immigration and family law attorneys.",
  ],
  reentryInfo: [
    "If you were deported with a 10-year bar, attempting to re-enter the U.S. without authorization could result in permanent inadmissibility.",
    "Certain waivers (Form I-212) may allow some deportees to apply for legal re-entry — consult a licensed U.S. immigration attorney before taking any steps.",
    "U.S. citizens who were deported are not barred from returning — a U.S. passport and no outstanding criminal warrants are the key requirements.",
    "Children who are U.S. citizens have the right to return to the U.S. regardless of a parent's deportation status.",
    "Organizations like CLINIC and AILA's Pro Bono programs may connect you with attorneys who handle post-deportation cases.",
  ],
  faqs: [
    {
      question: "Can I get Mexican citizenship if I was born in Mexico?",
      answer:
        "Yes. If you were born in Mexico, you are a Mexican citizen by birth. You can obtain your birth certificate from the Registro Civil in the state where you were born, even if you have been living in the U.S. for decades.",
    },
    {
      question: "What is a CURP and why do I need it?",
      answer:
        "A CURP (Clave Única de Registro de Población) is a unique 18-character government ID code issued to all Mexican citizens and residents. You need it to access government health care, open a bank account, enroll children in school, and more. It is free and can be requested at any SRE or government office.",
    },
    {
      question: "Is it safe to live in Tijuana as a deportee?",
      answer:
        "Tijuana has areas of higher crime, and deportees can sometimes be targeted. Local shelters and community organizations can help you navigate which areas to avoid and introduce you to community networks. Many thousands of deportees live and work in Tijuana safely.",
    },
    {
      question: "Can my U.S.-citizen children stay in Mexico with me?",
      answer:
        "Yes, your U.S.-citizen children can live in Mexico with you. They retain all U.S. citizenship rights and can return to the U.S. at any time. You should update their documents (passport, school enrollment) and consult a cross-border family attorney about long-term plans.",
    },
    {
      question: "How do I receive money from family in the U.S.?",
      answer:
        "Services like Remitly, Wise, and WorldRemit allow fast transfers to Mexican bank accounts or OXXO cash pickups. Rates and fees vary — comparing services before each transfer can save money over time.",
    },
  ],
  seoTitle: "Deported to Mexico: Survival Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Practical guide for U.S. deportees returning to Mexico. Find housing, jobs, documents, healthcare, and legal resources for starting over after deportation.",
  keywords: [
    "deported to Mexico",
    "deportee Mexico guide",
    "CURP after deportation",
    "Mexico housing deportee",
    "Al Otro Lado Mexico",
    "Tijuana deportee resources",
    "Mexican citizenship by birth",
  ],
  relatedCountries: ["guatemala", "el-salvador", "honduras"],
  firstThirtyDays: [
    "Cross into Mexico at the border port — Mexican migration officials will process your entry; get your FMM or document stamp",
    "Get a Telcel or AT&T México SIM card at any OXXO convenience store or carrier store — no ID required for prepaid",
    "Visit a Casa del Migrante or Al Otro Lado shelter near the border for transitional housing and food",
    "Request your acta de nacimiento (birth certificate) online at gob.mx/actas — free for returning Mexicans",
    "Apply for your CURP at any módulo CURP or online at gob.mx — needed for banking, schools, and government services",
    "Get your INE voter ID card at your local INE office — this is your primary national photo ID",
    "Open a bank account at BBVA, Banamex, or Banorte using your CURP and INE card",
    "Register with Servicio Nacional de Empleo (SNE) for free job placement services",
  ],
  businessDirectory: [
    "Casa del Migrante network — transitional shelter for recently deported individuals in Tijuana, Ciudad Juárez, and other cities",
    "Al Otro Lado — legal aid and services for deportees, based in Tijuana",
    "INE (Instituto Nacional Electoral) offices — voter ID (credencial) issuance nationwide",
    "CURP módulos — registration for government identity number at any DIF or government office",
    "Servicio Nacional de Empleo (SNE) — free government job placement across Mexico",
    "BBVA México and Banamex branches — account opening with CURP and INE",
  ],
};

export default mexico;
