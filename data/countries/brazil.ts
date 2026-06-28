import type { CountryData } from "./schema";

const brazil: CountryData = {
  slug: "brazil",
  countryName: "Brazil",
  countryCode: "BR",
  flagEmoji: "🇧🇷",
  region: "South America",
  capital: "Brasília",
  languages: ["Portuguese"],
  currency: "Brazilian Real (BRL)",
  summary:
    "Brazil is the largest country in South America and has the region's largest economy. While the official language is Portuguese — which may require an adjustment period for those who only know Spanish or English — Brazil offers significant economic opportunity in cities like São Paulo and Rio de Janeiro. The country has a large informal economy and strong community networks. Many Brazilian deportees come from the states of Minas Gerais, Goiás, and São Paulo.",
  heroTitle: "Deported to Brazil: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, jobs, and resources for deportees rebuilding life in Brazil.",
  cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
  quickFacts: [
    { label: "Capital", value: "Brasília" },
    { label: "Language", value: "Portuguese" },
    { label: "Currency", value: "Brazilian Real (BRL)" },
    { label: "Emergency Number", value: "190 (Police) / 192 (Medical)" },
    { label: "U.S. Embassy", value: "Brasília (SES, Quadra 801, Lote 3)" },
    { label: "Time Zone", value: "UTC-3 (Brasília Time)" },
  ],
  returningHome: [
    "Brazilian citizens are received at Guarulhos International Airport (São Paulo) or other major airports — Federal Police processes returning nationals.",
    "Obtain your RG (Registro Geral, state ID) and CPF (Cadastro de Pessoas Físicas, tax ID) — both are essential for all formal activities.",
    "The CPF is applied for at Receita Federal offices or online via gov.br — your RG is obtained at state Secretaria de Segurança Pública.",
    "Cadastro Único (CadÚnico) registration at your local CRAS (Social Assistance Reference Center) may qualify you for Bolsa Família and other benefits.",
    "Organizations such as Serviço Jesuíta a Migrantes and Missão Paz (São Paulo) may provide transitional support.",
  ],
  travelDocuments: [
    "The RG (Registro Geral) is Brazil's state-issued ID — apply at your state's SSP with your birth certificate.",
    "The CPF (Cadastro de Pessoas Físicas) is the federal tax registration number needed for banking and formal transactions.",
    "A Brazilian passport is available through the Polícia Federal with a valid RG and CPF.",
    "Birth certificates (certidão de nascimento) are available from your municipality's cartório de registro civil.",
    "U.S. citizen children retain their U.S. passports and can travel independently.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Brazil for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "São Paulo and Rio de Janeiro are expensive by Brazilian standards — basic apartments in peripheral neighborhoods may run BRL 800–2,000/month.",
    "Brasília has more affordable options in satellite cities like Ceilândia and Samambaia.",
    "Salvador in Bahia is one of the more affordable major cities — basic rentals start around BRL 600–1,200/month.",
    "Zap Imóveis, VivaReal, and OLX Brazil are the main rental platforms.",
    "Favela communities often have informal housing at lower costs — be aware of local security dynamics.",
  ],
  jobs: [
    "São Paulo has Brazil's largest formal labor market — manufacturing, services, technology, and finance.",
    "Portuguese language skills are essential for most formal employment — if you only speak Spanish or English, intensive Portuguese study is a priority.",
    "Catho, InfoJobs, and LinkedIn Brazil are the main formal job portals.",
    "Construction and manual labor offer accessible entry-level work in most cities.",
    "Brazil's gig economy (iFood delivery, Uber, app-based services) provides accessible informal income.",
  ],
  healthcare: [
    "Brazil's Unified Health System (SUS — Sistema Único de Saúde) provides free, universal healthcare to all citizens and residents.",
    "UBS (Unidades Básicas de Saúde) are neighborhood-level clinics for primary care — find your nearest UBS upon arrival.",
    "Major public hospitals (Hospital das Clínicas in São Paulo, Hospital Universitário in Rio) handle complex cases.",
    "CAPS (Centro de Atenção Psicossocial) provides free mental health services through SUS.",
    "Private health plans (planos de saúde) are available for formal sector workers through employers.",
  ],
  mentalHealth: [
    "CAPS (Centro de Atenção Psicossocial) is Brazil's network of free public mental health centers — locate your nearest CAPS at saude.gov.br.",
    "CVV (Centro de Valorização da Vida) provides free 24-hour crisis counseling by phone at 188.",
    "Missão Paz and other migrant organizations in São Paulo offer psychosocial support for returning Brazilians.",
    "NASF (Núcleo Ampliado de Saúde da Família) provides mental health services integrated with primary care.",
    "Private psychologists are available in major cities — fees vary widely (BRL 80–300/session).",
  ],
  moneyTransfer: [
    "Wise, Remitly, and Western Union all operate in Brazil with bank transfers and cash pickup options.",
    "Banco do Brasil, Caixa Econômica Federal, Bradesco, and Itaú are major banks for account opening.",
    "PIX is Brazil's instant payment system — once you have a bank account, PIX allows instant transfers between accounts 24/7.",
    "Caixa Econômica Federal has a wide branch network including in smaller cities and rural areas.",
    "Nubank and Banco Inter are digital banks with easier signup for those building banking history.",
  ],
  phoneInternet: [
    "Vivo (Telefônica), Claro, TIM, and Oi are the main mobile carriers in Brazil.",
    "Prepaid SIM cards from Vivo or Claro are available at pharmacies, supermarkets, and carrier stores for around BRL 10–20.",
    "Data plans start around BRL 30–60/month for basic packages.",
    "Brazil has extensive 4G coverage in urban areas — rural coverage varies by region.",
    "Home fiber internet from Claro, Vivo, or regional providers typically costs BRL 80–120/month.",
  ],
  transportation: [
    "São Paulo has an extensive Metro, CPTM commuter rail, and bus network — fare is BRL 5.00 with single ticket.",
    "Rio de Janeiro has Metro, BRT, and ferry services.",
    "Intercity buses (rodoviárias) connect all Brazilian cities — companies like Comfortbus and 1001 serve major routes.",
    "Uber and 99 (local competitor) provide ride-hailing across major Brazilian cities.",
    "Mototaxi services are common in smaller cities and towns for short-distance travel.",
  ],
  legalResources: [
    "Defensoria Pública (Public Defender's Office) provides free legal services in every state for those who qualify.",
    "ACNUR Brasil (UNHCR) assists those who may qualify for refugee status.",
    "Cáritas Brasileira and Missão Paz provide legal orientation for migrants and returnees in São Paulo.",
    "Conselho Federal da OAB (Brazilian Bar Association) can refer to pro bono attorneys.",
    "Law clinics at major universities (USP, UFMG, UERJ) offer free legal consultation.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Consult a U.S. immigration attorney about waiver options — Brazilian communities in Massachusetts, Florida, and New York may have community legal resources.",
    "U.S. citizen children of deported Brazilians retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "Brazilian community organizations in cities like Boston, Miami, and Newark may have support networks for deportee families.",
  ],
  faqs: [
    {
      question: "What is the difference between RG and CPF?",
      answer:
        "The RG (Registro Geral) is your state-issued photo ID, obtained at your state's SSP office with your birth certificate. The CPF (Cadastro de Pessoas Físicas) is your federal tax registration number, required for banking, property, and any formal transaction. Both are essential — get both as early as possible.",
    },
    {
      question: "What is PIX and how does it work?",
      answer:
        "PIX is Brazil's government-created instant payment system, available 24/7. Once you have any bank account, you can send and receive money instantly using your PIX key (which can be your CPF, phone number, or email). It has replaced many traditional transfer methods and is widely used for rent, services, and everyday purchases.",
    },
    {
      question: "Do I need to speak Portuguese immediately?",
      answer:
        "For informal work, family support, and daily survival, you can get by with some Portuguese initially. However, formal employment, banking, and government services require Portuguese. Spanish speakers can often understand written Portuguese more easily than spoken. Many communities in São Paulo have Portuguese language programs for returnees and migrants.",
    },
    {
      question: "What is SUS and how do I access it?",
      answer:
        "The SUS (Sistema Único de Saúde) is Brazil's free public health system, guaranteed by the constitution to all citizens. Register at your nearest UBS (Unidade Básica de Saúde) with your RG and CPF. This gives you access to primary care, specialist referrals, laboratory tests, and emergency care at no cost.",
    },
    {
      question: "What financial assistance might I qualify for?",
      answer:
        "Registering for CadÚnico at your local CRAS may qualify you for Bolsa Família (income transfer program) and other government benefits if you meet income criteria. This requires your RG, CPF, and proof of residence. The CRAS social workers can explain current program eligibility.",
    },
  ],
  seoTitle: "Deported to Brazil: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Brazil. RG, CPF, SUS healthcare, PIX banking, and legal resources in São Paulo and beyond.",
  keywords: [
    "deported to Brazil",
    "Brazil deportee guide",
    "RG CPF Brazil",
    "SUS healthcare Brazil",
    "São Paulo housing deportee",
    "PIX banking Brazil",
    "Missão Paz São Paulo",
  ],
  relatedCountries: ["venezuela", "colombia", "peru"],
};

export default brazil;
