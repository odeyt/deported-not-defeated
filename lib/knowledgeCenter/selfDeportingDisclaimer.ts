/**
 * Exact wording required by docs/Knowledge-Center-Master-Spec.md's
 * Self-Deporting Section. Kept in a plain .ts file (not the .tsx component
 * that renders it) so tests/knowledge-center-routes.test.ts can import it
 * directly under Node's native TypeScript execution, which strips types but
 * does not transform JSX — importing a .tsx file with real JSX syntax would
 * fail to parse outside of Next.js's build pipeline.
 */
export const SELF_DEPORTING_DISCLAIMER =
  "This information is educational only and is not legal advice. Immigration outcomes depend on individual circumstances. Speak with a licensed immigration attorney before making decisions.";
