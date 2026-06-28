// ─────────────────────────────────────────────────────────────────────────────
// Legal Resources Data
// Replace placeholder hrefs and details with real partner info after approval.
// ─────────────────────────────────────────────────────────────────────────────

export const DISCLAIMER =
  "This information is for educational purposes only and is not legal advice. Immigration law is complex and every case is different. Speak with a licensed immigration attorney before making legal decisions or filing immigration forms.";

export const AFFILIATE_DISCLOSURE =
  "Some links on this page may be affiliate, referral, or sponsored links. Deported Not Defeated may earn compensation if users click or purchase through these links. Sponsored placement does not guarantee legal results.";

// ── Law Firm Partners ─────────────────────────────────────────────────────────
export const lawFirmPartners = [
  {
    id: "law-firm-1",
    name: "Immigration Law Partner",
    specialty: "Deportation defense, waivers, family petitions",
    location: "United States / Remote Consultations",
    cta: "Request Consultation",
    href: "#affiliate-law-firm-1", // ← Replace with affiliate/partner URL
    badge: "Sponsored",
  },
  {
    id: "law-firm-2",
    name: "Waiver & Reentry Attorney",
    specialty: "I-212, I-601, unlawful presence, re-entry bars",
    location: "United States / International Clients",
    cta: "Learn More",
    href: "#affiliate-law-firm-2", // ← Replace with affiliate/partner URL
    badge: "Affiliate",
  },
  {
    id: "law-firm-3",
    name: "Family Petition Lawyer",
    specialty: "Spouse petitions, parent petitions, adult child petitions",
    location: "U.S. Immigration Cases",
    cta: "Contact Firm",
    href: "#affiliate-law-firm-3", // ← Replace with affiliate/partner URL
    badge: "Sponsored",
  },
];

// ── Legal Tool Partners ───────────────────────────────────────────────────────
export const legalToolPartners = [
  {
    id: "document-organizer",
    name: "Immigration Case Document Organizer",
    desc: "Organize removal orders, court notices, criminal records, family documents, and prior immigration filings.",
    cta: "View Tool",
    href: "#affiliate-document-organizer", // ← Replace with affiliate URL
  },
  {
    id: "foia-help",
    name: "FOIA / Immigration Records Help",
    desc: "Request immigration records from U.S. government agencies before speaking with an attorney.",
    cta: "Get Records Help",
    href: "#affiliate-foia-help", // ← Replace with affiliate URL
  },
  {
    id: "translation",
    name: "Certified Translation Services",
    desc: "Translate birth certificates, marriage certificates, court records, and supporting documents.",
    cta: "Translate Documents",
    href: "#affiliate-translation", // ← Replace with affiliate URL
  },
  {
    id: "form-support",
    name: "Form Preparation Support",
    desc: "Educational support for understanding common immigration forms before attorney review.",
    cta: "Learn More",
    href: "#affiliate-form-support", // ← Replace with affiliate URL
  },
  {
    id: "notary",
    name: "Notary & Apostille Services",
    desc: "Help prepare official documents needed for immigration or family sponsorship cases.",
    cta: "Find Service",
    href: "#affiliate-notary", // ← Replace with affiliate URL
  },
  {
    id: "consultation-tool",
    name: "Attorney Consultation Booking Tool",
    desc: "Book consultations with immigration professionals or organize questions before a legal appointment.",
    cta: "Book Consultation",
    href: "#affiliate-consultation-tool", // ← Replace with affiliate URL
  },
];

// ── Legal Pathway Cards ───────────────────────────────────────────────────────
export const legalPathwayCards = [
  {
    title: "Family-Based Immigration",
    desc: "For people with a U.S. citizen spouse, parent, or adult child who may qualify to petition for them.",
  },
  {
    title: "Permission to Reapply",
    desc: "Some deported individuals may need permission to reapply for admission before returning legally.",
  },
  {
    title: "Waivers of Inadmissibility",
    desc: "Certain cases may require a waiver if there are re-entry bars, unlawful presence, fraud, or other inadmissibility issues.",
  },
  {
    title: "Employment Sponsorship",
    desc: "Some individuals may qualify through a U.S. employer, depending on skills, job category, and immigration history.",
  },
  {
    title: "Motion to Reopen or Appeal",
    desc: "Some cases may be challenged if there was legal error, ineffective assistance, or new evidence.",
  },
  {
    title: "Humanitarian Options",
    desc: "Rare humanitarian options may exist depending on country conditions, safety concerns, or family circumstances.",
  },
];

// ── Advertising Options ───────────────────────────────────────────────────────
export const advertisingOptions = [
  "Sponsored law firm listing",
  "Featured legal resource placement",
  "Sponsored article",
  "Newsletter sponsorship",
  "Country-specific page sponsorship",
  "Lead referral partnership",
];

// ── Return Scenarios Table ────────────────────────────────────────────────────
export const returnScenarios = [
  { reason: "Visa overstay",                          outlook: "possible",      note: "Often possible after waiting period and/or obtaining required waivers." },
  { reason: "Unlawful presence",                      outlook: "possible",      note: "Often possible with the proper visa and waivers." },
  { reason: "Minor non-violent criminal offense",     outlook: "case-by-case",  note: "Possible in some cases depending on the conviction." },
  { reason: "Immigration fraud",                      outlook: "difficult",     note: "Difficult, but waivers may exist depending on the facts." },
  { reason: "Aggravated felony",                      outlook: "very-difficult",note: "Very difficult and highly case-specific." },
  { reason: "Multiple illegal re-entries after removal", outlook: "very-difficult", note: "Extremely difficult due to additional criminal penalties." },
];
