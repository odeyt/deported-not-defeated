import Link from "next/link";
import { ExternalLink, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import type { MoneyTransferProvider } from "@/data/moneyTransferProviders";

interface Props {
  provider: MoneyTransferProvider;
}

export default function ProviderGuidePage({ provider }: Props) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/resources/money-transfer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            ← Money Transfer Resources
          </Link>
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">
            {provider.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{provider.name}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{provider.bestFor}</p>
        </div>
      </section>

      {/* Disclosure banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-800 text-sm">
            <strong>Disclosure:</strong> Some links may be affiliate links. We may earn a commission if you use them, at no extra cost to you. We do not provide money transfer services and do not process funds.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Who It May Help */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Who It May Help</h2>
            <p className="text-gray-700 leading-relaxed">{provider.whyItMayHelp}</p>
          </div>

          {/* Payout Methods */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Possible Payout Methods</h2>
            <ul className="space-y-2">
              {provider.payoutMethods.map((m) => (
                <li key={m} className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle size={15} className="text-green-600 shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs mt-4">
              Payout method availability varies by destination country. Always confirm directly with the provider.
            </p>
          </div>

          {/* Speed + Bank */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-navy-800 mb-2">Estimated Speed</h3>
              <p className="text-gray-600 text-sm">{provider.speed}</p>
              <p className="text-gray-400 text-xs mt-2">Actual delivery time depends on destination and payout method.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-navy-800 mb-2">Bank Account Required</h3>
              <p className="text-gray-600 text-sm">{provider.bankRequired}</p>
              <p className="text-gray-400 text-xs mt-2">Requirements may vary by destination country and payout method.</p>
            </div>
          </div>

          {/* Countries */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Countries Where It May Be Useful</h2>
            <div className="flex flex-wrap gap-2">
              {provider.countriesFocus.map((c) => (
                <span
                  key={c}
                  className="text-sm bg-navy-800/10 text-navy-800 rounded-full px-3 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Coverage may vary. Confirm that this service is available in your specific country and region.
            </p>
          </div>

          {/* What to Check */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy-800 mb-4">What to Check Before Using</h2>
            <ul className="space-y-3">
              {[
                "Confirm current fees and exchange rates on the provider's official website before sending",
                "Verify that the service is available in the recipient's country and region",
                "Check what ID the recipient needs to collect cash pickup (if applicable)",
                "Confirm current payout methods — availability changes and varies by country",
                "Review transfer limits — some providers have minimum or maximum transfer amounts",
                "Compare with at least one other provider before deciding",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-gray-700">
                  <span className="text-brand-red font-bold mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Scam Warning */}
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
            <div className="flex gap-3 items-start">
              <AlertTriangle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">Scam Warning</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  Never send money to someone you do not know personally. Beware of romance scams, fake immigration help, job scams, and urgent family emergency scams. Legitimate providers never ask you to send money to claim a prize or avoid arrest.
                </p>
              </div>
            </div>
          </div>

          {/* Caution */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3 items-start">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm leading-relaxed">{provider.caution}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-navy-800 rounded-2xl p-6 text-center">
            <h3 className="text-white font-bold text-lg mb-2">Ready to check {provider.name}?</h3>
            <p className="text-gray-300 text-sm mb-5">
              Visit the official website to see current fees, rates, and availability for your country.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={provider.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <ExternalLink size={15} />
                Visit Official Website
              </a>
              <Link
                href="/resources/money-transfer/compare"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Compare with other providers <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Related countries */}
          {provider.countriesFocus.length > 0 && (
            <div>
              <h3 className="font-bold text-navy-800 mb-3">Related Country Guides</h3>
              <div className="flex flex-wrap gap-2">
                {provider.countriesFocus.slice(0, 6).map((c) => {
                  const slug = c.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={c}
                      href={`/${slug}`}
                      className="text-sm bg-gray-100 hover:bg-navy-800 hover:text-white text-gray-700 rounded-lg px-3 py-1.5 transition-colors"
                    >
                      {c} Guide
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Legal */}
      <section className="bg-gray-50 border-t border-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-white border border-blue-200 rounded-xl p-4 text-sm text-gray-600">
            <strong className="text-blue-700">Financial Safety Disclaimer: </strong>
            Availability, fees, exchange rates, delivery times, and payout methods vary by country and provider. Always confirm directly with the licensed provider before sending money.
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-500">
            <strong>Legal Disclaimer:</strong> The information on this page is provided for general informational and educational purposes only. Deported Not Defeated does not send, hold, process, or receive money. We are not a licensed money transfer operator. Always verify current terms, fees, and availability directly with the provider. Nothing on this page constitutes financial advice.
          </div>
        </div>
      </section>
    </main>
  );
}
