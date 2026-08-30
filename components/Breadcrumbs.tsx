import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Styling per docs/05_Information_Architecture.md's Breadcrumb Implementation
 * Notes: `<nav aria-label="Breadcrumb">` + `<ol>`, final item `aria-current`
 * and unlinked, separator `/` in text-gray-300, link text-gray-500
 * hover:text-navy-800, current page text-gray-800 font-medium.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">/</span>}
              {isLast || !item.href ? (
                <span
                  className="text-gray-800 font-medium"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-gray-500 hover:text-navy-800 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
