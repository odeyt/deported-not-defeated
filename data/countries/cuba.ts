import type { CountryData } from "./schema";

const cuba: CountryData = {
  slug: "cuba",
  countryName: "Cuba",
  countryCode: "CU",
  flagEmoji: "🇨🇺",
  region: "Caribbean",
  capital: "Havana",
  languages: ["Spanish"],
  currency: "Cuban Peso (CUP)",
  summary:
    "Cuba presents unique challenges for deportees due to its centrally planned economy, limited internet access, and political environment. The country has a well-developed public healthcare and education system, but faces significant economic hardship. Deportees may find housing through family networks, as private real estate transactions are restricted. The Cuban government has its own processing procedures for returning nationals. Access to outside remittances is critically important for many returnees.",
  heroTitle: "Deported to Cuba: Your Survival Guide",
  heroSubtitle:
    "What to expect, what documents you need, and how to access support after deportation to Cuba.",
  cities: ["Havana", "Santiago de Cuba", "Holguín", "Camagüey"],
  quickFacts: [
    { label: "Capital", value: "Havana" },
    { label: "Language", value: "Spanish" },
    { label: "Currency", value: "Cuban Peso (CUP)" },
    { label: "Emergency Number", value: "106 (Police) / 105 (Fire)" },
    { label: "U.S. Embassy", value: "Havana (Calzada entre L y M, Vedado)" },
    { label: "Time Zone", value: "UTC-5 (EST) / UTC-4 (EDT in summer)" },
  ],
  returningHome: [
    "Deportation flights from the U.S. arrive in Havana — Cuban immigration authorities process returning nationals upon arrival.",
    "Cuba's Dirección de Inmigración processes your identity and status — cooperate fully with the process.",
    "Your carnet de identidad (national ID) is issued by the MININT — obtain or renew it as quickly as possible.",
    "Cuba has strict controls on housing, employment, and internet — understanding the system before arrival reduces shock.",
    "Remittances from family abroad are the primary source of support for many Cubans — maintaining contact with diaspora family is critical.",
  ],
  travelDocuments: [
    "The carnet de identidad is Cuba's national ID — issued by the Ministerio del Interior (MININT).",
    "A Cuban passport is required for international travel — available through MINREX (Ministerio de Relaciones Exteriores).",
    "Birth certificates are issued by the Registro Civil under local Tribunales Municipales.",
    "If your Cuban documents have expired or been lost, MININT offices can assist with replacement using birth registry records.",
    "U.S. citizen children retain their U.S. passports — Cuba allows dual citizenship to be maintained.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Cuba for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Cuba's housing system is state-controlled — private housing sales and rentals operate under restrictions and informal arrangements.",
    "Most returnees live with family — this is the primary and most practical option.",
    "The casas particulares (licensed private homestays) system allows some private rental — costs vary.",
    "State housing assignments are theoretically available but involve long waiting lists and bureaucratic processes.",
    "Rural areas and smaller provinces like Holguín and Camagüey may have more flexible informal housing arrangements.",
  ],
  jobs: [
    "Cuba has a large state employment system — registration with your local Poder Popular office may connect you with state jobs.",
    "Cuba has been expanding private sector (cuentapropistas) — small private businesses, restaurants (paladares), and services are legal.",
    "Tourism remains a significant employer — tourism industry jobs may be arranged through state tourism agencies.",
    "Agricultural work in cooperatives is available in rural areas.",
    "Remittances are effectively a form of income for many Cubans — maintaining family connections abroad is economically important.",
  ],
  healthcare: [
    "Cuba's public healthcare system is free and universal — hospitals and policlínicos (polyclinics) serve all citizens.",
    "Despite economic challenges, Cuba maintains a network of family doctors (médicos de familia) in every neighborhood.",
    "Hospital access requires your carnet de identidad — register at your local polyclinic upon return.",
    "Medications can be in short supply — diaspora support for importing essential medicines is common.",
    "Mental health services are integrated into the primary care system through community polyclinics.",
  ],
  mentalHealth: [
    "Community polyclinics have psychologists and social workers who can provide mental health support.",
    "Cuba's sistema de salud includes hospitales psiquiátricos for serious conditions.",
    "The adjustment back to Cuban life after years in the U.S. can be psychologically challenging — family support is critical.",
    "Religious communities (Catholic, Santería practitioners) offer informal spiritual and emotional support.",
    "IOM may have limited engagement in Cuba — check current availability of any external support programs.",
  ],
  moneyTransfer: [
    "Remittances to Cuba have faced restrictions due to U.S. sanctions — available channels change frequently.",
    "Western Union's service to Cuba has been suspended in the past — verify current status before transferring.",
    "Informal networks (mulas — people hand-carrying cash) have historically been used but carry risks.",
    "Cuban bank accounts can receive international transfers in some currencies — verify which services are currently authorized.",
    "MLC (Moneda Libremente Convertible) accounts at BANDEC or BPA allow receipt of foreign currency deposits.",
  ],
  phoneInternet: [
    "ETECSA (Empresa de Telecomunicaciones de Cuba) is the sole telecom provider — SIM cards from ETECSA stores.",
    "Cuba's internet is slow, censored, and expensive by international standards — social media and VoIP services may be restricted.",
    "Wi-Fi hotspots (known as 'parques Wi-Fi') in public plazas provide hourly internet access for CUP.",
    "Nauta is ETECSA's internet service — top-up cards available at ETECSA offices.",
    "International calls via ETECSA are possible but expensive — diaspora family may use WhatsApp when Wi-Fi is available.",
  ],
  transportation: [
    "Havana's public bus system (Metrobus and rutas) is the main city transport — fares are a few CUP.",
    "Cocotaxis (auto rickshaws) and bicitaxis serve tourist and residential areas in Havana.",
    "Intercity Víazul buses serve major cities — book in advance, fares are in CUP.",
    "Almendrones (classic American cars used as shared taxis) serve fixed routes in Havana for a few CUP.",
    "Interprovincial train service exists but is unreliable — buses are generally more dependable.",
  ],
  legalResources: [
    "The Bufete Colectivo (state legal office) provides legal services — available in every province.",
    "The Organización Nacional de Bufetes Colectivos (ONBC) manages legal services access.",
    "MINREX may assist with international legal matters involving Cuban citizens abroad.",
    "Human rights organizations have limited operations inside Cuba — external advocacy through international bodies may be an option.",
    "Cuban Americans with legal expertise sometimes offer remote consultation through diaspora networks.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Cuban Adjustment Act provisions may be relevant for some individuals — consult a licensed U.S. immigration attorney.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "Diaspora organizations like the Cuban American Bar Association or CLINIC may provide consultation on post-deportation options.",
    "Wet-foot/dry-foot policy ended in 2017 — do not attempt irregular migration to the U.S. by sea.",
  ],
  faqs: [
    {
      question: "What is the MLC and why does it matter?",
      answer:
        "MLC (Moneda Libremente Convertible) is Cuba's foreign-currency store system. Goods that are scarce in the regular peso economy — including food, electronics, and household items — are often available in MLC stores. Receiving family remittances in foreign currency that can be deposited to an MLC account significantly improves access to basic goods.",
    },
    {
      question: "Can I access the internet in Cuba?",
      answer:
        "Yes, but with limitations. ETECSA provides 4G data via SIM cards and Wi-Fi hotspots in public parks and some buildings. Internet access is censored — some sites and services are blocked. VPNs can sometimes bypass restrictions but are also subject to blocks. Access is slower and more expensive than in the U.S.",
    },
    {
      question: "How does free healthcare work in Cuba for a returnee?",
      answer:
        "Register at your neighborhood polyclinic with your carnet de identidad. You will be assigned a family doctor (médico de familia) for primary care. Referrals to specialists, hospitals, and medications are provided through this system free of charge, though medication availability can vary due to supply shortages.",
    },
    {
      question: "What should I know about housing in Cuba?",
      answer:
        "Cuba's housing market is heavily state-regulated. Private sales have been legalized to some extent, but the process is complex. Most returnees live with family. If you have no family housing option, notify local authorities — housing assistance may theoretically be available but expect lengthy waits and bureaucratic challenges.",
    },
    {
      question: "Is it possible to run a small business in Cuba?",
      answer:
        "Yes — Cuba has significantly expanded its cuentapropista (private entrepreneur) system in recent years. Licenses for hundreds of categories of small business are now available. Paladares (private restaurants), casas particulares (private homestays), and various services can be legally operated. Consult with local authorities about the current licensing process.",
    },
  ],
  seoTitle: "Deported to Cuba: Survival Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Cuba. Cuban ID, healthcare, remittances, internet access, and resources for starting over in Havana.",
  keywords: [
    "deported to Cuba",
    "Cuba deportee guide",
    "carnet de identidad Cuba",
    "ETECSA SIM Cuba",
    "Cuba remittances MLC",
    "Havana housing deportee",
  ],
  relatedCountries: ["dominican-republic", "haiti", "jamaica"],
};

export default cuba;
