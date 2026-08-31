/**
 * Country-specific "restart checklist" PDF content.
 *
 * Every item here is a direct reference to text already published in
 * data/countries/{mexico,el-salvador,guatemala}.ts — nothing is invented.
 * See app/api/checklist/[country]/route.ts and lib/checklist/buildChecklistPdf.ts.
 *
 * Plain .ts on purpose: the API route (.ts) imports this directly, and this
 * repo's tests import content modules directly under Node's native
 * TypeScript execution, which strips types but does not transform JSX — a
 * .tsx file would fail to parse there.
 */

export interface ChecklistSection {
  title: string;
  items: string[];
}

export interface ChecklistContact {
  label: string;
  value: string;
}

export interface CountryChecklistContent {
  slug: "mexico" | "el-salvador" | "guatemala";
  countryLabel: string;
  headerTitle: string;
  filename: string;
  sections: ChecklistSection[];
  contacts: ChecklistContact[];
}

const QUOTE_TEXT = "Start with one safe place to sleep, one phone number, one step forward.";

function whoForText(countryName: string): string {
  return `This checklist is for (1) self-deportees who have voluntarily returned to ${countryName}, and (2) individuals who have recently been removed and arrived in ${countryName}. If you are still in a reception or detention facility, please ask staff for assistance first.`;
}

export const COUNTRY_CHECKLISTS: Record<string, CountryChecklistContent> = {
  mexico: {
    slug: "mexico",
    countryLabel: "Mexico",
    headerTitle: "MEXICO RESTART CHECKLIST",
    filename: "mexico-restart-checklist.pdf",
    sections: [
      {
        title: "DAYS 1-7: LAND & GET CONNECTED",
        items: [
          "Cross into Mexico at the border port -- Mexican migration officials will process your entry; get your FMM or document stamp",
          "Get a Telcel or AT&T México SIM card at any OXXO convenience store or carrier store -- no ID required for prepaid",
          "Visit a Casa del Migrante or Al Otro Lado shelter near the border for transitional housing and food",
          "Request your acta de nacimiento (birth certificate) online at gob.mx/actas -- free for returning Mexicans",
        ],
      },
      {
        title: "WEEK 2: DOCUMENTS & STABILITY",
        items: [
          "Apply for your CURP at any módulo CURP or online at gob.mx -- needed for banking, schools, and government services",
          "Get your INE voter ID card at your local INE office -- this is your primary national photo ID",
          "Open a bank account at BBVA, Banamex, or Banorte using your CURP and INE card",
          "Register with Servicio Nacional de Empleo (SNE) for free job placement services",
        ],
      },
      {
        title: "HOUSING & STABILITY",
        items: [
          "Border cities like Tijuana and Ciudad Juárez have migrant shelters (casas del migrante) that offer temporary housing for newly deported individuals",
          "Rental prices vary widely: Tijuana averages 5,000-10,000 MXN/month for a basic apartment; Mexico City ranges from 8,000-18,000 MXN/month",
          "Use Facebook Marketplace, Inmuebles24, or Vivaanuncios to search for rentals -- most landlords in Mexico do not require credit checks",
        ],
      },
      {
        title: "WORK & INCOME",
        items: [
          "Spanish fluency and U.S. work experience (especially in manufacturing, construction, or services) can be valuable in border cities with maquiladoras",
          "Tijuana and Monterrey have strong manufacturing and call center job markets -- English speakers are often in high demand",
          "OCC Mundial, Indeed México, and Computrabajo are the main online job portals in Mexico",
        ],
      },
    ],
    contacts: [
      { label: "Phone", value: "Telcel is Mexico's largest mobile network and has the best coverage nationwide -- SIM cards can be bought at OXXO, Telcel stores, or pharmacies." },
      { label: "Money", value: "Wise, Remitly, and WorldRemit offer competitive rates for receiving money from the U.S. -- funds can be deposited directly to a Mexican bank account or picked up at OXXO stores." },
      { label: "Legal", value: "Al Otro Lado provides free legal services to deportees along the U.S.-Mexico border." },
      { label: "Health", value: "Mexico has a public healthcare system (IMSS) available to citizens and formal workers -- registration usually requires a CURP and an employer." },
      { label: "Emergency", value: "911  |  U.S. Embassy: Mexico City (Paseo de la Reforma 305)" },
      { label: "Community", value: "Casa del Migrante network -- transitional shelter for recently deported individuals in Tijuana, Ciudad Juárez, and other cities." },
    ],
  },

  "el-salvador": {
    slug: "el-salvador",
    countryLabel: "El Salvador",
    headerTitle: "EL SALVADOR RESTART CHECKLIST",
    filename: "el-salvador-restart-checklist.pdf",
    sections: [
      {
        title: "DAYS 1-7: LAND & GET CONNECTED",
        items: [
          "Arrive at Monseñor Óscar Arnulfo Romero International Airport in San Salvador -- Salvadoran immigration processes returning nationals",
          "Get a Claro or Tigo SIM card at the airport or any authorized vendor -- requires your DUI or passport",
          "Contact family immediately -- family networks in your municipio or community are the most reliable support",
          "Visit the RNPN (Registro Nacional de las Personas Naturales) to reactivate or obtain your DUI (Documento Único de Identidad)",
        ],
      },
      {
        title: "WEEK 2: DOCUMENTS & STABILITY",
        items: [
          "Your DUI is required for banking, government services, and employment -- it is the top priority document",
          "Open a bank account at Banco Agrícola, Davivienda, or Banco de América Central using your DUI",
          "Register with the Ministry of Labor (MTPS) for free job placement assistance and training programs",
          "Contact Cristosal or the Procuraduría para la Defensa de los Derechos Humanos if you face human rights concerns",
        ],
      },
      {
        title: "HOUSING & STABILITY",
        items: [
          "San Salvador has a range of rental options -- basic apartments in working-class neighborhoods (colonias populares) typically run $150-$400/month",
          "Facebook Marketplace and OLX El Salvador are common platforms for finding room and apartment rentals",
          "Many deportees initially stay with family -- extended family networks (red familiar) are an important safety net in Salvadoran culture",
        ],
      },
      {
        title: "WORK & INCOME",
        items: [
          "El Salvador's economy includes strong manufacturing (textiles/maquila), service sector, and growing tech hubs in San Salvador",
          "English proficiency is a major asset -- call centers (BPO industry) actively hire bilingual workers and pay above average wages",
          "Computrabajo El Salvador and Indeed are the main job search platforms",
        ],
      },
    ],
    contacts: [
      { label: "Phone", value: "Claro and Tigo are the dominant mobile carriers -- SIM cards are available at any phone store or supermarket for around $1-$3." },
      { label: "Money", value: "El Salvador uses U.S. dollars, making money transfers from the U.S. simple -- no currency conversion needed. Remitly, Wise, and Western Union all operate here." },
      { label: "Legal", value: "Cristosal provides human rights legal defense and may assist deportees facing threats or legal complications." },
      { label: "Health", value: "The public health system (MINSAL) operates hospitals and clinics (Unidades de Salud) that provide free or heavily subsidized care to citizens." },
      { label: "Emergency", value: "911  |  U.S. Embassy: Santa Elena, Antiguo Cuscatlán" },
      { label: "Community", value: "RNPN (Registro Nacional de las Personas Naturales) -- DUI issuance and identity document registration." },
    ],
  },

  guatemala: {
    slug: "guatemala",
    countryLabel: "Guatemala",
    headerTitle: "GUATEMALA RESTART CHECKLIST",
    filename: "guatemala-restart-checklist.pdf",
    sections: [
      {
        title: "DAYS 1-7: LAND & GET CONNECTED",
        items: [
          "Arrive at La Aurora International Airport in Guatemala City -- Guatemalan immigration processes returning nationals",
          "Get a Claro or Tigo Guatemala SIM card at the airport or any authorized vendor -- requires your DPI or passport",
          "Contact family in your departamento immediately -- extended family networks in rural areas are the primary support system",
          "Visit the RENAP (Registro Nacional de las Personas) office to obtain or reactivate your DPI (Documento Personal de Identificación)",
        ],
      },
      {
        title: "WEEK 2: DOCUMENTS & STABILITY",
        items: [
          "Your DPI is the master ID required for banking, employment, and all government services -- priority number one",
          "Open a bank account at Banco Industrial, G&T Continental, or Banrural using your DPI",
          "Register with MINTRAB (Ministerio de Trabajo) for free employment placement assistance",
          "Contact IGSS (Instituto Guatemalteco de Seguridad Social) to understand healthcare and social security options",
        ],
      },
      {
        title: "HOUSING & STABILITY",
        items: [
          "Guatemala City has a broad rental market -- basic apartments in Zone 6 or 12 may run 1,000-2,500 GTQ/month; areas like Zone 10 are much more expensive",
          "Quetzaltenango (Xela) is more affordable with rentals starting around 800-1,500 GTQ/month",
          "Many deportees from rural highland areas return to family land -- rebuilding or sharing a family home is common",
        ],
      },
      {
        title: "WORK & INCOME",
        items: [
          "Guatemala City's economy includes manufacturing, textiles, call centers, and a growing tech sector",
          "English-speaking deportees may find call center work in Guatemala City -- companies like Teleperformance and Concentrix hire bilinguals",
          "Agricultural work is prevalent in rural areas -- coffee, cardamom, and banana industries hire seasonally",
        ],
      },
    ],
    contacts: [
      { label: "Phone", value: "Claro and Tigo are the two dominant carriers in Guatemala -- SIM cards cost about 10-25 GTQ." },
      { label: "Money", value: "Remitly, Wise, and Western Union all operate in Guatemala with bank deposit and cash pickup options." },
      { label: "Legal", value: "Asociación de Abogados y Notarios Maya Chuj offers indigenous legal representation in highland communities." },
      { label: "Health", value: "The Ministry of Public Health (MSPAS) operates public hospitals and health centers with free or low-cost care for citizens." },
      { label: "Emergency", value: "110 (Police) / 122 (Fire)  |  U.S. Embassy: Guatemala City (Reforma 7-01, Zone 10)" },
      { label: "Community", value: "RENAP (Registro Nacional de las Personas) -- DPI issuance and identity document services nationwide." },
    ],
  },
};

export function getChecklistQuoteText(): string {
  return QUOTE_TEXT;
}

export function getChecklistWhoForText(countryName: string): string {
  return whoForText(countryName);
}
