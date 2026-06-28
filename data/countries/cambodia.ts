import type { CountryData } from "./schema";

const cambodia: CountryData = {
  slug: "cambodia",
  countryName: "Cambodia",
  countryCode: "KH",
  flagEmoji: "🇰🇭",
  region: "Asia",
  capital: "Phnom Penh",
  languages: ["Khmer"],
  currency: "Cambodian Riel (KHR)",
  summary:
    "Cambodia is a Southeast Asian nation with a complex history, including the Khmer Rouge genocide, and a population that has been rebuilding for decades. Many Cambodian-Americans who are deported grew up as refugees or children of refugees in the U.S. and may have limited Khmer language skills. Phnom Penh has grown into a dynamic capital with a developing economy, and U.S. dollars are widely used alongside Cambodian Riel. Communities like Battambang are known for having strong Cambodian-American returnee networks.",
  heroTitle: "Deported to Cambodia: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, community support, and work resources for deportees rebuilding life in Cambodia.",
  cities: ["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville"],
  quickFacts: [
    { label: "Capital", value: "Phnom Penh" },
    { label: "Language", value: "Khmer" },
    { label: "Currency", value: "Cambodian Riel (KHR) — USD widely used" },
    { label: "Emergency Number", value: "117 (Police) / 119 (Medical)" },
    { label: "U.S. Embassy", value: "Phnom Penh (#1, Street 96, Sangkat Wat Phnom)" },
    { label: "Time Zone", value: "UTC+7 (Indochina Time)" },
  ],
  returningHome: [
    "Deportation flights from the U.S. arrive at Phnom Penh International Airport — Cambodian immigration and Ministry of Interior officials receive returning nationals.",
    "The Cambodian American community organization 1Love Movement and Khmer Girls in Action have worked to support deportees — contact these organizations for peer support.",
    "Obtain your Cambodian national ID (Samdech) at the Ministry of Interior — your birth certificate is the foundation document.",
    "Battambang has a notable Cambodian-American returnee community and may feel more familiar than Phnom Penh for some deportees.",
    "Buddhist temples (wats) serve as community centers and may offer temporary accommodation or meals in many communities.",
  ],
  travelDocuments: [
    "A Cambodian national ID or passport is your primary identity document.",
    "Apply for a national ID at the Ministry of Interior with your birth certificate (certificate of birth).",
    "A Cambodian passport is available through the Ministry of Foreign Affairs once you have a national ID.",
    "If documents were lost, family records and village commune registration can help establish identity.",
    "U.S. citizen deportees may have U.S. passports — the U.S. Embassy in Phnom Penh can assist with emergency passport services.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for Cambodia for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Phnom Penh has a wide range of housing — basic rooms in working-class areas may run $100–250/month.",
    "Battambang is significantly more affordable — rooms or small apartments may cost $50–150/month.",
    "Siem Reap near Angkor Wat has tourism-driven housing prices — mid-range accommodations run $150–400/month.",
    "Facebook Marketplace Cambodia and expat community boards list available rentals in English.",
    "Many Cambodian-American returnees in Battambang have formed informal community housing networks.",
  ],
  jobs: [
    "English language teaching is in strong demand at private schools and language centers across Cambodia.",
    "Phnom Penh has a growing NGO sector with employment in social work, community development, and education.",
    "Tourism in Siem Reap and Phnom Penh employs guides, hotel staff, and hospitality workers.",
    "Garment manufacturing in Phnom Penh employs many in production work — less competitive but accessible.",
    "Small business (food stalls, transportation, handicrafts) is a common livelihood for returnees.",
  ],
  healthcare: [
    "Cambodia's public hospitals are available but have limited resources — Calmette Hospital and Kossamak Hospital are the main public facilities in Phnom Penh.",
    "Private clinics (Royal Phnom Penh Hospital, Sunrise Japan Hospital) offer better quality care for those who can afford USD fees.",
    "The National Maternal and Child Health Center and NICU provide specialized services.",
    "Pharmacies are widespread in Phnom Penh — many medications are available without prescriptions.",
    "For serious conditions, some residents seek care in Thailand (Bangkok, 9 hours by bus) for better facilities.",
  ],
  mentalHealth: [
    "Trauma is deeply embedded in Cambodian history — many families carry intergenerational trauma from the Khmer Rouge period.",
    "1Love Movement provides peer support and some mental health connections specifically for Cambodian deportees.",
    "The Transcultural Psychosocial Organization (TPO) Cambodia provides free or subsidized mental health services in Phnom Penh.",
    "Buddhist monks offer spiritual counseling and community support throughout Cambodia.",
    "Remote counseling from Cambodian-American organizations in Long Beach and Lowell may be accessible via internet.",
  ],
  moneyTransfer: [
    "USD is widely accepted in Cambodia — receiving money in USD from the U.S. is straightforward.",
    "Wing Money is Cambodia's main mobile payment and money transfer platform — widely used for cash pickup.",
    "Western Union and MoneyGram have agents throughout Phnom Penh and major cities.",
    "ABA Bank, Canadia Bank, and ACLEDA Bank are the main banks for account opening.",
    "Wise can transfer directly to Cambodian bank accounts.",
  ],
  phoneInternet: [
    "Cellcard (Mobitel), Smart (Axiata), and Metfone (Viettel) are the main carriers in Cambodia.",
    "Smart and Metfone have strong coverage — SIM cards cost about $1–3 at any carrier shop.",
    "Prepaid data plans start around $5–10/month for 5–10GB of data.",
    "4G coverage is excellent in Phnom Penh and Siem Reap — Battambang and smaller cities have good 4G too.",
    "Internet speeds are good in urban areas — home fiber available in Phnom Penh from $15–30/month.",
  ],
  transportation: [
    "Phnom Penh has tuk-tuks, motos (mototaxis), and electric tuk-tuks for city transport.",
    "Grab (ride-hailing app) operates in Phnom Penh for reliable pricing.",
    "Intercity buses connect Phnom Penh with Siem Reap, Battambang, and Sihanoukville for $5–15.",
    "Phnom Penh Sorya Transport and Giant Ibis are reputable intercity bus operators.",
    "Motorbike rental is very common and practical — basic motorbikes rent for $5–10/day.",
  ],
  legalResources: [
    "Legal Aid of Cambodia (LAC) provides free legal services to those who qualify.",
    "LICADHO (Cambodian League for the Promotion and Defense of Human Rights) monitors rights and can assist in serious cases.",
    "OHCHR (UN Human Rights) has an office in Phnom Penh.",
    "The Bar Association of the Kingdom of Cambodia can refer to private attorneys.",
    "1Love Movement may be able to connect deportees with legal referrals.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Some Cambodian deportees hold U.S. citizenship — those individuals can return to the U.S. with a valid U.S. passport.",
    "Organizations like SEARAC (Southeast Asia Resource Action Center) and Khmer Girls in Action advocate for Cambodian deportees.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "Consult a U.S. immigration attorney about your specific situation.",
  ],
  faqs: [
    {
      question: "I don't speak Khmer — how do I communicate when I first arrive?",
      answer:
        "English is widely spoken in Phnom Penh's tourism, NGO, and business sectors. Battambang's returnee community can provide peer support in English. Khmer language classes are available — learning even basic Khmer significantly helps with daily navigation. The 1Love Movement and similar organizations can connect you with others who share your experience.",
    },
    {
      question: "What is the 1Love Movement?",
      answer:
        "1Love Movement is a Cambodian-American organization founded by and for Cambodian deportees. They provide peer support, community connections, and advocacy for Cambodian-Americans who have been deported. Connecting with them early in your return can significantly ease the transition.",
    },
    {
      question: "Is it safe to live in Cambodia as a deportee?",
      answer:
        "Cambodia is generally safe for day-to-day living, particularly in Phnom Penh, Siem Reap, and Battambang. Petty theft and scams targeting foreigners exist — stay alert, especially in tourist areas. Political freedoms are limited under the current government, so maintaining a low political profile is advisable.",
    },
    {
      question: "What is Wing Money and how does it work?",
      answer:
        "Wing is Cambodia's largest mobile money platform. Once registered with a Cambodian national ID or phone number, you can receive transfers (including from Western Union and MoneyGram), send money, pay bills, and make purchases — all via a mobile phone. It is widely used across Cambodia including in rural areas without bank branches.",
    },
    {
      question: "How can I access mental health support after deportation?",
      answer:
        "TPO Cambodia (Transcultural Psychosocial Organization) provides free or subsidized mental health services with therapists trained specifically in Cambodian trauma. They have offices in Phnom Penh and some provincial areas. The deportation experience often intersects with family separation trauma, intergenerational Khmer Rouge trauma, and culture shock — specialized support matters.",
    },
  ],
  seoTitle: "Deported to Cambodia: Survival Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to Cambodia. 1Love Movement, housing, Khmer language resources, and healthcare in Phnom Penh and Battambang.",
  keywords: [
    "deported to Cambodia",
    "Cambodia deportee guide",
    "1Love Movement Cambodia",
    "Phnom Penh housing deportee",
    "TPO Cambodia mental health",
    "Smart Metfone SIM Cambodia",
    "SEARAC Cambodian deportee",
  ],
  relatedCountries: ["laos", "vietnam", "thailand"],
  firstThirtyDays: [
    "Arrive at Phnom Penh International Airport or Siem Reap International — Cambodian immigration processes returning nationals",
    "Get a Smart, Metfone, or CellCard SIM at the airport or any vendor — prepaid SIMs are widely available",
    "Contact family networks immediately — Buddhist temple communities are key support structures",
    "Visit the Ministry of Interior to obtain or renew your National ID Card (Khmer ID)",
    "Open an ABA Bank or ACLEDA Bank account using your national ID — both offer mobile banking apps",
    "Connect with SEARAC (Southeast Asia Resource Action Center) for deportee family and community resources",
    "Register with the Ministry of Labour and Vocational Training for employment placement programs",
    "Seek support from TPO Cambodia (Transcultural Psychosocial Organization) for mental health services",
  ],
  businessDirectory: [
    "Ministry of Interior — Khmer national ID card issuance and registration",
    "ABA Bank and ACLEDA Bank branches — banking and mobile money services",
    "Smart Axiata, Metfone, and CellCard stores — SIM cards and mobile data plans",
    "Ministry of Labour and Vocational Training — employment placement and skills programs",
    "TPO Cambodia — mental health and psychosocial support for returning deportees",
    "National Authority for Combating Human Trafficking — legal protection for vulnerable returnees",
  ],
};

export default cambodia;
