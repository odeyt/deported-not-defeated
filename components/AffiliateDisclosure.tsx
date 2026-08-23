/**
 * Reusable affiliate disclosure (spec §22).
 *
 * Wording notes — these are deliberate, not stylistic:
 *   - "may earn compensation", not "earn a commission". We do not have a
 *     commission arrangement with most listed providers.
 *   - "does not increase your cost" is scoped to the link itself. The
 *     earlier copy asserted that compensation could never affect pricing,
 *     which is not something we can verify across every program.
 *   - the ordering claim is the one that matters to this audience, so it
 *     is stated plainly: availability and usefulness decide the order,
 *     not what we get paid.
 *
 * Render this close enough to the recommendations that a visitor sees both
 * without hunting for it.
 */
export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-gray-500 text-xs leading-relaxed">
        <span className="font-semibold text-gray-600">Disclosure:</span> We may earn compensation
        when you use some links on this page. This does not increase your cost. We prioritize
        availability and usefulness when presenting resources.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
      <strong className="text-gray-700">Disclosure: </strong>
      We may earn compensation when you use some links on this page. This does not increase your
      cost. We prioritize availability and usefulness when presenting resources — the order
      services appear in is never decided by what we are paid.
      <span className="block mt-2 text-gray-500">
        Fees, exchange rates, delivery times, and country availability change often. Always confirm
        the current terms directly with the provider before you commit to anything.
      </span>
    </div>
  );
}
