import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import AffiliateRecommendations from "@/components/affiliate/AffiliateRecommendations";

// Provider cards come from the registry, so refresh hourly rather than only on
// deploy. The page is still served statically.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "How to Receive Money from USA to Mexico | Transfer Options Compared",
  description:
    "Ways for family to send money from the USA to Mexico — cash pickup at OXXO, bank deposit, and mobile wallet options, with what each one requires.",
};

/**
 * Provider cards come from the central affiliate registry via
 * <AffiliateRecommendations>, not from a hardcoded list.
 *
 * The previous version of this page carried a hand-written table asserting
 * specific fees ("Low (~$2–4)"), speeds, and superlatives ("Best overall",
 * "lowest fees"). None of it was sourced or dated, and fees on this corridor
 * change constantly. Those claims are removed rather than restated: the
 * registry says which services operate here and whether that has been
 * confirmed, and the reader checks the current price with the provider.
 *
 * Options that are not in the registry but genuinely useful — Zelle to a
 * Mexican bank, OXXO cash pickup — are kept below as editorial guidance, so
 * nobody loses a good option just because we do not earn from it.
 */

export default function MexicoReceiveMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Receive Money from the USA to Mexico</h1>
          <p className="text-xl text-gray-300">Mexico is the world&apos;s largest remittance corridor. OXXO stores provide cash pickup on every block. Your family has many easy options.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* limit is 8 because eight providers are eligible for this corridor.
              An earlier limit of 6 cut the list at rank 7 of 8, which happened
              to hide Wise — the only provider here with a live affiliate
              relationship. The fix was to remove the arbitrary cutoff, not to
              promote Wise: ranking stays country priority, and commission is
              never an input. */}
          <AffiliateRecommendations
            country="MX"
            category="MONEY_TRANSFER"
            heading="Transfer services that operate on this corridor"
            intro="Fees and delivery times change often and differ by amount, payout method, and state. Confirm the current cost with the provider before sending — we deliberately do not quote prices we cannot keep accurate."
            placement="mx-money-transfer"
            campaign="mx_money_transfer_compare"
            limit={8}
            fallbackHref="/resources/money-transfer"
            fallbackLabel="See all money transfer options"
          />

          {/* Useful options that are not in the affiliate registry. Kept
              because they are genuinely among the best choices on this
              corridor, and hiding them would make the page worse. */}
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">
              Other options worth knowing about
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              We earn nothing from either of these. They are here because they are often the
              right answer.
            </p>
            <ul className="text-gray-300 text-sm space-y-3">
              <li>
                <strong className="text-white">Zelle to a Mexican bank.</strong> If your family in
                the US banks somewhere that supports Zelle and you hold an account at a Mexican
                bank that receives it, this can be same-day with no transfer fee on the US side.
                Check current support with both banks — the list of participating banks changes.
              </li>
              <li>
                <strong className="text-white">OXXO cash pickup.</strong> Several services pay out
                at OXXO, which matters when you have no bank account yet. Ask the sender which
                payout networks their service reaches in your state.
              </li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Opening a Bank Account in Mexico</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">BBVA México:</strong> Largest private bank — bring CURP and ID, some branches require proof of address</li>
              <li>• <strong className="text-white">Santander México:</strong> Easy account opening, good for transfers</li>
              <li>• <strong className="text-white">HSBC México:</strong> Accepts international transfers easily</li>
              <li>• <strong className="text-white">Nu México (Nubank):</strong> Fully digital — open from your phone with CURP</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Cash Pickup Without a Bank Account</h2>
            <p className="text-gray-300 text-sm">No bank account yet? Use cash pickup:</p>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>• OXXO — on every block in Mexico, accepts Western Union and Remitly pickup</li>
              <li>• Elektra — major electronics/financial chain, extensive Western Union network</li>
              <li>• Walmart Mexico — Western Union and MoneyGram available</li>
              <li>• Telecomm Telegrafos — government-run money transfer points nationwide</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/mexico/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days</Link>
            <Link href="/resources/money-transfer" className="text-brand-red hover:underline text-sm">Compare All Money Transfer Services →</Link>
            <Link href="/tools/return-home-cost" className="text-brand-red hover:underline text-sm">Estimate your first weeks in Mexico →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
