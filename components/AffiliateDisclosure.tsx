interface Props {
  /** Existing one-line variant. Unchanged behaviour for existing call sites. */
  compact?: boolean;
  /**
   * "default" keeps the original wording used across the site.
   * "engine" is the M-AFFILIATE-1 wording rendered beneath engine-driven
   * recommendations.
   */
  wording?: "default" | "engine";
  /** Match the surrounding section. "dark" is for navy backgrounds. */
  tone?: "light" | "dark";
}

export default function AffiliateDisclosure({
  compact = false,
  wording = "default",
  tone = "light",
}: Props) {
  const isDark = tone === "dark";

  if (wording === "engine") {
    return (
      <div
        className={
          isDark
            ? "bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300"
            : "bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600"
        }
      >
        <strong className={isDark ? "text-white" : "text-gray-700"}>Disclosure: </strong>
        We may earn compensation when you use some links on this page. This does not increase your
        cost. We prioritize availability and usefulness when presenting resources.
      </div>
    );
  }

  if (compact) {
    return (
      <p className={isDark ? "text-gray-400 text-xs" : "text-gray-400 text-xs"}>
        Some links may become affiliate links. If we earn a commission, it is at no extra cost to you.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
      <strong className="text-gray-600">Disclosure: </strong>
      Some links on this page may become affiliate links. If we earn a commission, it will be at no extra cost to you.
      Our goal is to recommend services that may help people rebuild their lives — not to sell products.
      We only list services we believe could be genuinely useful. Always compare options and check current terms before deciding.
    </div>
  );
}
