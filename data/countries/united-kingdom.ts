import type { CountryData } from "./schema";

const unitedKingdom: CountryData = {
  slug: "united-kingdom",
  countryName: "United Kingdom",
  countryCode: "GB",
  flagEmoji: "🇬🇧",
  region: "Europe",
  capital: "London",
  languages: ["English"],
  currency: "British Pound Sterling (GBP)",
  summary:
    "The United Kingdom — comprising England, Scotland, Wales, and Northern Ireland — shares the English language with the U.S. and has deep cultural ties. British citizens deported from the U.S. return to one of Europe's most developed countries with a comprehensive welfare state, National Health Service (NHS), and mature legal system. London is Europe's largest financial center, while cities like Manchester, Birmingham, and Glasgow have their own strong economic identities. British deportees generally have access to better government services and support systems than deportees to most other countries.",
  heroTitle: "Deported to the UK: Your Survival Guide",
  heroSubtitle:
    "Housing, NHS healthcare, benefits, and work resources for British deportees returning from the U.S.",
  cities: ["London", "Manchester", "Birmingham", "Glasgow"],
  quickFacts: [
    { label: "Capital", value: "London" },
    { label: "Language", value: "English" },
    { label: "Currency", value: "British Pound Sterling (GBP)" },
    { label: "Emergency Number", value: "999" },
    { label: "U.S. Embassy", value: "London (33 Nine Elms Lane, Battersea)" },
    { label: "Time Zone", value: "UTC+0 (GMT) / UTC+1 (BST in summer)" },
  ],
  returningHome: [
    "British citizens returning from the U.S. re-enter through Heathrow, Gatwick, or other major airports — right to enter the UK is automatic.",
    "Apply for your National Insurance (NI) number at your local Jobcentre Plus — required for employment and claiming benefits.",
    "The Universal Credit system provides financial support for those who meet eligibility requirements — apply at your local Jobcentre Plus.",
    "Contact your local council for housing assistance if you have no fixed address — councils have a duty to prevent homelessness for eligible individuals.",
    "Organizations like Revolving Doors Agency, St Giles Trust, and Citizens Advice can help with reintegration support.",
  ],
  travelDocuments: [
    "A British passport is your primary travel document — apply at HM Passport Office online or at a Post Office.",
    "Your UK National Insurance number is essential for employment and benefits.",
    "A British driving license or biometric residence permit (if applicable) may also be needed for various services.",
    "Proof of British citizenship (passport, birth certificate) is required for passport renewal if expired.",
    "U.S. citizen children retain their U.S. passports and can travel between countries.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for the United Kingdom for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "London's private rental market is very expensive — basic rooms in outer boroughs start at £700–1,100/month.",
    "Manchester, Birmingham, and Glasgow are significantly more affordable — basic rooms from £400–700/month.",
    "Local councils provide emergency housing support and may place you in temporary accommodation if you are homeless.",
    "Rightmove and Zoopla are the main rental listing platforms in the UK.",
    "Hostels and temporary accommodation through local councils or charities can bridge the gap while permanent housing is arranged.",
  ],
  jobs: [
    "UK's labor market is diverse — London leads in finance, tech, and services; Manchester in creative industries and tech; Birmingham in manufacturing and logistics.",
    "Universal Jobmatch and Reed.co.uk are major UK job portals.",
    "Your U.S. work history and experience are directly transferable — the language and cultural compatibility give British deportees advantages.",
    "Zero-hours contracts and agency work provide immediate income while you seek permanent employment.",
    "Self-employment and the gig economy (Deliveroo, Uber) provide accessible income in most UK cities.",
  ],
  healthcare: [
    "The National Health Service (NHS) provides free healthcare to all UK citizens and residents — register with a GP (family doctor) in your area.",
    "Find your nearest GP surgery at nhs.uk and register — you should be accepted regardless of address.",
    "NHS Urgent Treatment Centres and walk-in clinics provide care without a GP appointment.",
    "Mental health services (IAPT — Improving Access to Psychological Therapies) are available through NHS referral.",
    "NHS 111 (phone or online) provides 24/7 healthcare guidance for non-emergency issues.",
  ],
  mentalHealth: [
    "NHS IAPT (Improving Access to Psychological Therapies) provides free talking therapy — self-refer or get a GP referral.",
    "Samaritans helpline (116 123) provides 24/7 crisis support.",
    "Mind and Rethink Mental Illness are major mental health charities with local resources and helplines.",
    "Community Mental Health Teams (CMHT) provide care for more serious mental health needs.",
    "Many local councils and voluntary organizations provide additional mental health support services.",
  ],
  moneyTransfer: [
    "Money transfers from the U.S. to the UK are straightforward — Wise, Remitly, and all major services operate in both countries.",
    "UK banks (Barclays, HSBC, NatWest, Lloyds) require address proof and ID — Monzo and Starling digital banks offer easier account opening.",
    "Monzo Bank can be opened with just a passport and selfie — no fixed address required initially.",
    "PayPal, Wise, and Revolut allow receiving USD and converting to GBP.",
    "UK Benefits (Universal Credit, housing benefit) are paid directly to a bank account — having a bank account is essential.",
  ],
  phoneInternet: [
    "EE, O2, Vodafone, and Three are the main UK carriers — giffgaff and SMARTY offer SIM-only budget plans.",
    "SMARTY (Three network) and giffgaff offer no-contract SIMs for £10–15/month.",
    "SIM cards are available at any supermarket or carrier store — no ID required for prepaid.",
    "4G/5G coverage is extensive across the UK — rural Scottish Highlands and some Welsh valleys have gaps.",
    "Home broadband from BT, Virgin Media, or Sky typically costs £25–45/month.",
  ],
  transportation: [
    "London's Transport for London (TfL) network includes Underground, buses, Overground, and Elizabeth line — Oyster card or contactless payment.",
    "National Rail and Avanti/CrossCountry/LNER intercity trains connect UK cities — advance tickets are significantly cheaper.",
    "National Coaches (National Express, Megabus) provide the cheapest intercity travel.",
    "Cycling and e-scooter schemes are available in most UK cities.",
    "Uber, Bolt, and local taxis operate in all major cities.",
  ],
  legalResources: [
    "Citizens Advice provides free legal advice on benefits, housing, employment, and immigration.",
    "Law centres and legal aid solicitors provide free legal representation for qualifying cases.",
    "Her Majesty's Courts and Tribunals Service handles legal proceedings.",
    "NACRO and St Giles Trust provide support for those with criminal records re-entering society.",
    "The Joint Council for the Welfare of Immigrants (JCWI) can assist with immigration-related legal matters.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Consult a U.S. immigration attorney about waiver options — British communities in U.S. cities may know legal resources.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "UK-based immigration solicitors can advise on U.S. immigration matters — some U.S. law firms have London offices.",
  ],
  faqs: [
    {
      question: "Am I entitled to NHS healthcare immediately after returning?",
      answer:
        "Yes — UK citizens have an automatic right to NHS care. Register with a local GP surgery as soon as possible after returning. For urgent needs, walk-in centres and A&E (Accident and Emergency) departments are available without a prior GP registration. NHS treatment is free at the point of use for all citizens.",
    },
    {
      question: "How do I access Universal Credit?",
      answer:
        "Universal Credit is the UK's main welfare benefit for those with low or no income. Apply online at gov.uk or at your local Jobcentre Plus. You will need a bank account, NI number, and identity documents. If you have a criminal record from the U.S., you should still be eligible for most benefits — the UK does not typically bar citizens from benefits based on foreign criminal records.",
    },
    {
      question: "What if I have no fixed address when I arrive?",
      answer:
        "Contact your local council's housing department immediately — councils have a legal duty to prevent homelessness for eligible British citizens. You may be placed in temporary accommodation while permanent housing is arranged. Hostels, night shelters, and charities like Shelter and St Mungo's can provide immediate emergency accommodation.",
    },
    {
      question: "How difficult is it to find work in the UK with a U.S. criminal record?",
      answer:
        "Most employers are only required to check UK Disclosure and Barring Service (DBS) records — U.S. convictions do not automatically appear. Some industries (finance, healthcare, working with children) require enhanced checks and ask about overseas convictions. Many employers, particularly in hospitality, logistics, and retail, do not require criminal record checks for entry-level positions.",
    },
    {
      question: "Is it difficult to open a bank account without a permanent address?",
      answer:
        "Traditional banks require proof of address, which can be a barrier if you have no fixed address. Monzo, Starling, and Revolut are digital banks that can open accounts with just a passport and selfie — without proof of address. These accounts function fully for direct deposits, bill payments, and spending, making them essential for deportees without an established address.",
    },
  ],
  seoTitle: "Deported to UK: Complete Guide for British Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to the United Kingdom. NHS healthcare, Universal Credit, housing support, and legal resources in London and beyond.",
  keywords: [
    "deported to UK",
    "British deportee guide",
    "NHS registration UK",
    "Universal Credit deportee",
    "London housing deportee",
    "Monzo Starling bank UK",
    "UK deportee from USA",
  ],
  relatedCountries: ["ireland", "romania", "poland"],
};

export default unitedKingdom;
