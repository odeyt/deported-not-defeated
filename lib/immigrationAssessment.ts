// ─────────────────────────────────────────────────────────────────────────────
// Immigration Assessment — Types, Report Generator, Tag Engine
// No legal claims. Educational only.
// ─────────────────────────────────────────────────────────────────────────────

export const REPORT_DISCLAIMER =
  "This report is educational only and is not legal advice. Immigration laws are complex and change frequently. Every case is different. Speak with a licensed immigration attorney before making legal decisions or filing immigration forms.";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AssessmentAnswers {
  deportationReason: string;
  deportationYear: string;
  removalCount: string;
  hasCitizenSpouse: string;
  hasLPRSpouse: string;
  hasCitizenParent: string;
  hasCitizenChild: string;
  hasCriminalConviction: string;
  criminalCategory: string;
  attemptedIllegalReturn: string;
  outsideUS: string;
  hasAttorney: string;
  primaryGoal: string;
  currentCountry: string;
  biggestConcern: string;
  wantsAttorney: string;
  // Contact
  firstName: string;
  email: string;
  consent: boolean;
}

export interface ReportSection {
  title: string;
  items: string[];
}

export interface GeneratedReport {
  recipientName: string;
  topics: ReportSection;
  attorneyQuestions: ReportSection;
  documents: ReportSection;
  resources: ReportSection;
  services: ReportSection;
  nextSteps: ReportSection;
  tags: string[];
}

// ── Tag Engine ────────────────────────────────────────────────────────────────

export function generateTags(a: AssessmentAnswers): string[] {
  const tags: string[] = ["Newsletter"];
  if (a.wantsAttorney === "Yes" || a.wantsAttorney === "Maybe") tags.push("Needs Attorney");
  if (a.hasCitizenSpouse === "Yes" || a.hasLPRSpouse === "Yes" || a.hasCitizenParent === "Yes" || a.hasCitizenChild === "Yes")
    tags.push("Family Sponsorship");
  if (a.biggestConcern === "Waivers" || a.deportationReason === "Unlawful presence") tags.push("Waiver Interest");
  if (a.hasCriminalConviction === "Yes") tags.push("Criminal History");
  if (a.primaryGoal === "Employment") tags.push("Employment");
  if (a.primaryGoal === "Visit family" || a.primaryGoal === "Return permanently") tags.push("Travel");
  if (a.biggestConcern === "Finding lawyer") tags.push("Needs Attorney");
  if (a.biggestConcern === "Family petition") tags.push("Family Sponsorship");
  if (a.biggestConcern === "Employment sponsorship") tags.push("Employment");
  if (a.biggestConcern === "Appeal") tags.push("Appeal");
  tags.push("Document Help");
  if (a.currentCountry && a.currentCountry.toLowerCase() !== "united states") tags.push("Translation");
  tags.push("FOIA");
  return Array.from(new Set(tags));
}

// ── Report Generator ──────────────────────────────────────────────────────────

export function generateReport(a: AssessmentAnswers): GeneratedReport {
  const name = a.firstName || "Visitor";
  const tags = generateTags(a);

  // ── Educational Topics ──────────────────────────────────────────────────────
  const topicItems: string[] = [];

  if (a.deportationReason === "Visa overstay" || a.deportationReason === "Removal after immigration court")
    topicItems.push("Re-entry bars and waiting periods after removal");
  if (a.deportationReason === "Expedited removal")
    topicItems.push("Expedited removal consequences and the 5-year re-entry bar");
  if (a.deportationReason === "Criminal conviction" || a.hasCriminalConviction === "Yes")
    topicItems.push("How criminal convictions affect immigration eligibility (topic to discuss with an attorney)");
  if (a.deportationReason === "Immigration fraud")
    topicItems.push("Bars related to immigration fraud and possible waiver options");
  if (a.hasCitizenSpouse === "Yes")
    topicItems.push("Family-based immigration: spouse petitions and what may be required");
  if (a.hasLPRSpouse === "Yes")
    topicItems.push("LPR spouse petitions and possible waiver requirements");
  if (a.hasCitizenParent === "Yes")
    topicItems.push("Parent-based immigration petitions and eligibility considerations");
  if (a.hasCitizenChild === "Yes")
    topicItems.push("Adult U.S. citizen child petitions and possible pathways");
  if (a.removalCount === "2" || a.removalCount === "3+")
    topicItems.push("Consequences of multiple removals and potential 20-year bars");
  if (a.attemptedIllegalReturn === "Yes")
    topicItems.push("Consequences of attempted unauthorized re-entry after deportation");
  if (a.primaryGoal === "Employment")
    topicItems.push("Employment-based immigration sponsorship topics");
  if (a.primaryGoal === "Return permanently")
    topicItems.push("Permanent re-entry options and waiver pathways to discuss with an attorney");
  if (a.primaryGoal === "Marriage")
    topicItems.push("Marriage-based immigration after deportation and steps that may be required");
  if (a.biggestConcern === "Waivers")
    topicItems.push("Waiver of inadmissibility (Form I-601) — general educational overview");
  if (a.biggestConcern === "Appeal")
    topicItems.push("Motion to reopen or appeal removal orders — eligibility depends on case specifics");
  if (a.biggestConcern === "Waiting period")
    topicItems.push("Understanding re-entry bars: 5, 10, and 20-year bars and how they work");
  topicItems.push("How to request your immigration records (FOIA/A-file)");
  topicItems.push("How to find and evaluate a licensed immigration attorney");

  // ── Attorney Questions ──────────────────────────────────────────────────────
  const questionItems: string[] = [
    "Based on my removal history, what re-entry bar(s) may apply to me?",
    "Would I need to file Form I-212 (Permission to Reapply) before being eligible for a visa?",
    "Should I request my A-file and immigration records before we proceed?",
    "What documents should I gather and organize before our consultation?",
    "Are there any waivers I may need to apply for, and what are the general requirements?",
  ];

  if (a.hasCitizenSpouse === "Yes" || a.hasLPRSpouse === "Yes")
    questionItems.push("Could my U.S. citizen or LPR spouse petition for me, and what would be required?");
  if (a.hasCitizenParent === "Yes")
    questionItems.push("Could my U.S. citizen parent file a petition for me, and what steps would follow?");
  if (a.hasCitizenChild === "Yes")
    questionItems.push("Could my adult U.S. citizen child file a petition on my behalf?");
  if (a.hasCriminalConviction === "Yes")
    questionItems.push("How might my prior criminal conviction(s) affect my immigration options?");
  if (a.primaryGoal === "Employment")
    questionItems.push("Is employment-based immigration sponsorship potentially available in my situation?");
  if (a.biggestConcern === "Appeal")
    questionItems.push("Is it too late to file a motion to reopen my removal case, and what would that involve?");

  while (questionItems.length < 10)
    questionItems.push("What should my realistic next step be, given my current situation?");

  // ── Documents to Gather ────────────────────────────────────────────────────
  const docItems = [
    "Valid passport (if available) or expired passport",
    "Any removal or deportation order you received",
    "Immigration court notices and hearing records",
    "Any prior visas, stamps, or entry documents",
    "Birth certificate (certified copy if possible)",
  ];

  if (a.hasCitizenSpouse === "Yes" || a.primaryGoal === "Marriage")
    docItems.push("Marriage certificate (certified copy if applicable)");
  if (a.hasCitizenParent === "Yes")
    docItems.push("Parents' U.S. citizenship or naturalization certificate");
  if (a.hasCitizenChild === "Yes")
    docItems.push("Children's U.S. birth certificates or passports");
  if (a.hasCriminalConviction === "Yes")
    docItems.push("Criminal case disposition records, court documents, and any sentencing records");
  docItems.push("Any prior immigration applications or receipts (I-485, I-130, etc.)");
  docItems.push("Employment records or letters if relevant to your goals");
  docItems.push("Proof of residence in your current country");
  docItems.push("Photos of yourself (immigration-standard size)");

  // ── Internal Resources ─────────────────────────────────────────────────────
  const resourceItems = [
    "Can a Deported Person Return to the U.S.? → deportednotdefeated.com/legal-resources/can-deported-person-return-to-usa",
    "Legal Resources for Deportees → deportednotdefeated.com/legal-resources",
    "Find Immigration Legal Help → deportednotdefeated.com/legal-resources#find-legal-help",
    "Legal Tools & Document Help → deportednotdefeated.com/legal-resources#legal-tools",
  ];
  if (a.currentCountry) {
    const country = a.currentCountry.toLowerCase();
    if (country.includes("laos")) resourceItems.push("Laos Survival Guide → deportednotdefeated.com/laos");
    if (country.includes("cambodia")) resourceItems.push("Cambodia Survival Guide → deportednotdefeated.com/cambodia");
    if (country.includes("vietnam")) resourceItems.push("Vietnam Survival Guide → deportednotdefeated.com/vietnam");
    if (country.includes("philippines")) resourceItems.push("Philippines Survival Guide → deportednotdefeated.com/philippines");
    if (country.includes("mexico")) resourceItems.push("Mexico Survival Guide → deportednotdefeated.com/mexico");
    if (country.includes("el salvador")) resourceItems.push("El Salvador Survival Guide → deportednotdefeated.com/el-salvador");
    if (country.includes("guatemala")) resourceItems.push("Guatemala Survival Guide → deportednotdefeated.com/guatemala");
  }

  // ── Recommended Services ───────────────────────────────────────────────────
  const serviceItems: string[] = [];
  if (tags.includes("Needs Attorney"))
    serviceItems.push("Immigration Attorney Directory — Connect with attorneys who handle deportation and re-entry cases → deportednotdefeated.com/legal-resources#find-legal-help");
  serviceItems.push("FOIA / Immigration Records Help — Request your A-file before consulting an attorney → deportednotdefeated.com/legal-resources#legal-tools");
  serviceItems.push("Case Document Organizer — Keep removal orders, court notices, and filings organized → deportednotdefeated.com/legal-resources#legal-tools");
  if (tags.includes("Translation") || (a.currentCountry && a.currentCountry.toLowerCase() !== "united states"))
    serviceItems.push("Certified Translation Services — Translate birth certificates and legal documents for immigration use → deportednotdefeated.com/legal-resources#legal-tools");
  if (tags.includes("Waiver Interest"))
    serviceItems.push("Form Preparation Support — Educational guidance on common immigration forms (not legal advice) → deportednotdefeated.com/legal-resources#legal-tools");
  serviceItems.push("Attorney Consultation Booking Tool — Prepare questions and schedule your first attorney meeting → deportednotdefeated.com/legal-resources#legal-tools");

  // ── Next Steps ─────────────────────────────────────────────────────────────
  const nextItems = [
    "Gather the documents listed in this report and keep them in a safe, organized place.",
    "Request your immigration records from U.S. government agencies (FOIA/A-file) — this may take time to process.",
    "Write down all important dates: deportation date, court dates, any previous applications.",
    "Do not pay for immigration services before verifying the credentials of any provider.",
    "Read the suggested educational articles on deportednotdefeated.com.",
    "Prepare the attorney questions listed in this report before your consultation.",
    "If you are considering any legal steps, consult a licensed immigration attorney first.",
  ];
  if (a.wantsAttorney === "Yes" || a.wantsAttorney === "Maybe")
    nextItems.push("Contact the attorney directory at deportednotdefeated.com/legal-resources to explore consultation options.");
  if (a.biggestConcern === "Waivers")
    nextItems.push("Read about the general waiver process (Form I-601) at deportednotdefeated.com/legal-resources before speaking with an attorney.");

  return {
    recipientName: name,
    topics: {
      title: "Educational Topics That May Be Relevant to Your Situation",
      items: topicItems,
    },
    attorneyQuestions: {
      title: "Questions You May Want to Ask an Immigration Attorney",
      items: questionItems.slice(0, 10),
    },
    documents: {
      title: "Suggested Documents to Gather",
      items: docItems,
    },
    resources: {
      title: "Educational Resources",
      items: resourceItems,
    },
    services: {
      title: "Potentially Relevant Services",
      items: serviceItems,
    },
    nextSteps: {
      title: "Suggested Educational Next Steps",
      items: nextItems,
    },
    tags,
  };
}
