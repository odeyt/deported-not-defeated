export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extract a table of contents from `<h2 id="...">`/`<h3 id="...">` tags in
 * admin-authored article HTML. Pure and dependency-free — a regex walk
 * rather than a DOM/HTML parser, since content is trusted admin input (see
 * docs/Knowledge-Center-Master-Spec.md deviations — no markdown pipeline
 * exists in this codebase).
 *
 * A heading with no `id` attribute is skipped: it has nothing to link to and
 * would produce a dead ToC entry.
 */
export function extractToc(html: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const pattern = /<h([23])[^>]*\bid=["']([^"']+)["'][^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    if (text) entries.push({ id, text, level });
  }

  return entries;
}
