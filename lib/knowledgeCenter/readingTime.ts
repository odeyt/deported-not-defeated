/**
 * Estimate reading time from HTML article content.
 *
 * Pure and dependency-free — strips tags with a regex rather than pulling in
 * an HTML parser, and uses the conventional 200 words/minute rate. This is an
 * estimate shown to readers, not a precise measurement.
 */
export function estimateReadingTimeMinutes(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
