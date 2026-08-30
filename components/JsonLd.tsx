/**
 * Renders one or more JSON-LD `<script>` blocks.
 *
 * Replaces the one hand-built inline precedent at
 * app/resources/money-transfer/compare/page.tsx. `data` content is always
 * built server-side from trusted values (article fields, static copy) —
 * never raw user input — so dangerouslySetInnerHTML here carries the same
 * trust level as every other server-rendered JSON-LD block in Next.js apps.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
