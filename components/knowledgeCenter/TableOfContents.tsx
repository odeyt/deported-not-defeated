import type { TocEntry } from "@/lib/knowledgeCenter/toc";

export default function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (!entries.length) return null;

  return (
    <nav aria-label="Table of contents" className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
        In This Article
      </p>
      <ul className="space-y-1.5 text-sm">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "pl-4" : ""}>
            <a href={`#${entry.id}`} className="text-navy-800 hover:text-brand-red transition-colors">
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
