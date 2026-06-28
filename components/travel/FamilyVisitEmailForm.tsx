"use client";

export default function FamilyVisitEmailForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to /api/subscribe or email marketing provider
    // TODO: Add analytics event tracking for checklist signup clicks
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/50 border border-white/10 rounded-2xl p-6 space-y-4 text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            placeholder="First name"
            className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">
            Country Visiting
          </label>
          <input
            type="text"
            placeholder="e.g. Mexico, Philippines"
            className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">
            Travel Month
          </label>
          <input
            type="text"
            placeholder="e.g. August 2025"
            className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
      >
        Send Me the Checklist →
      </button>
      <p className="text-gray-500 text-xs text-center">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
