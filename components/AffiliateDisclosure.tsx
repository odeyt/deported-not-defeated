export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-gray-400 text-xs">
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
