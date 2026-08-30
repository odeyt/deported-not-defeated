/**
 * Canonical Knowledge Center category vocabulary.
 *
 * Mirrors lib/affiliate/categories.ts: a typed const array so a typo fails at
 * build time, plus a CHECK constraint on `articles.category` in
 * supabase/knowledge_center_m1.sql as the runtime source of truth.
 *
 * Dependency-free on purpose — safe to import from "use client" admin forms
 * and from server routes alike.
 */

export const KNOWLEDGE_CATEGORIES = [
  "legal",
  "self-deporting",
  "money",
  "jobs",
  "housing",
  "family",
  "travel",
  "healthcare",
  "mental-health",
  "technology",
  "starting-over",
  "success-stories",
  "news",
] as const;

export type KnowledgeCategoryCode = (typeof KNOWLEDGE_CATEGORIES)[number];

const CATEGORY_SET: ReadonlySet<string> = new Set(KNOWLEDGE_CATEGORIES);

export function isKnowledgeCategory(value: string): value is KnowledgeCategoryCode {
  return CATEGORY_SET.has(value);
}

export const CATEGORY_LABELS: Record<KnowledgeCategoryCode, string> = {
  legal: "Legal Resources",
  "self-deporting": "Self-Deporting & Voluntary Departure",
  money: "Money & Banking",
  jobs: "Jobs & Career Training",
  housing: "Housing",
  family: "Family & Visitors",
  travel: "Travel & Documents",
  healthcare: "Healthcare",
  "mental-health": "Mental Health",
  technology: "Technology",
  "starting-over": "Starting Over",
  "success-stories": "Success Stories",
  news: "News & Policy Updates",
};

export const CATEGORY_DESCRIPTIONS: Record<KnowledgeCategoryCode, string> = {
  legal: "Educational guides on legal pathways, waivers, and re-entry bars.",
  "self-deporting": "Understand voluntary departure, removal, and what comes after.",
  money: "Sending, receiving, and managing money across borders.",
  jobs: "Finding work, building skills, and career training options.",
  housing: "Finding a place to live and settling into a new city.",
  family: "Staying connected with family and planning visits.",
  travel: "Travel documents, planning, and border logistics.",
  healthcare: "Finding care and understanding health coverage options.",
  "mental-health": "Coping with the emotional impact of deportation.",
  technology: "Phones, internet, and staying connected digitally.",
  "starting-over": "Practical first steps for rebuilding a life.",
  "success-stories": "Real stories from people who have rebuilt after deportation.",
  news: "Policy changes and news relevant to deportees and their families.",
};

/**
 * lucide-react icon name per category. Kept as a string (not the component
 * itself) so this file stays free of a React/lucide import — components
 * that render tiles look the name up in their own local icon map.
 */
export const CATEGORY_ICONS: Record<KnowledgeCategoryCode, string> = {
  legal: "Scale",
  "self-deporting": "DoorOpen",
  money: "Banknote",
  jobs: "Briefcase",
  housing: "Home",
  family: "Users",
  travel: "Plane",
  healthcare: "HeartPulse",
  "mental-health": "Brain",
  technology: "Laptop",
  "starting-over": "Sparkles",
  "success-stories": "Star",
  news: "Newspaper",
};
