import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, DollarSign, ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Banking & Money in Laos for Deportees",
  description: "How to open a bank account, receive money from the USA, and manage your finances in Laos.",
};

export default function BankingMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/laos" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Laos Guide
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
              <DollarSign size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Banking & Money</h1>
            <p className="text-gray-300 text-lg">How to receive money, open accounts, and manage your finances in Laos.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Receive Money from the USA — Today</h2>
            <p className="text-gray-600 mb-4">Family or friends can send money using these services. No bank account required for most.</p>
            <div className="space-y-3">
              {[
                ["Western Union", "Widely available at BCEL bank branches. Fast pickup with passport. No account needed."],
                ["MoneyGram", "Available at Lao Development Bank (LDB). Compare fees before sending."],
                ["Wise (formerly TransferWise)", "Best exchange rates for regular transfers. Requires a bank account to receive."],
                ["Remitly", "App-based, good for recurring transfers. Family sends from USA, you pick up in Laos."],
                ["Xoom (by PayPal)", "Fast delivery option. Good for first transfers."],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                  <div><span className="font-semibold text-navy-800">{name}:</span> <span className="text-gray-600 text-sm"> {desc}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Opening a Bank Account</h2>
            <p className="text-gray-600 mb-4">A bank account unlocks better transfer rates and financial stability. To open one you typically need:</p>
            <ul className="space-y-2">
              {[
                "Valid Lao ID or passport",
                "Proof of address (rental agreement or utility bill)",
                "Starting deposit of $50–200 equivalent in LAK",
                "BCEL and Lao Development Bank (LDB) have branches nationwide",
                "Joint Development Bank (JDB) has English-speaking staff",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Currency & ATMs</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Lao Kip (LAK)</strong> is the official currency. USD and Thai Baht are widely accepted in cities.</p>
              <p><strong>ATMs</strong> are available in all major cities. Most accept Visa and Mastercard. Withdrawal fees: ~20,000–50,000 LAK per transaction.</p>
              <p><strong>Exchange rate tip:</strong> Shop around. Money changers at Talat Sao market often beat bank rates for USD to LAK.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-3">Protect Your Money</h2>
            <ul className="space-y-2">
              {[
                "Never share your PIN or account number",
                "Keep emergency cash hidden separately from your wallet",
                "Use a VPN when accessing banking apps on public WiFi",
                "Keep receipts of all Western Union / MoneyGram pickups",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={16} className="text-yellow-600 mt-0.5 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="font-bold text-navy-800 mb-2">Find Banks & Money Transfer in the Directory</p>
            <p className="text-gray-600 text-sm mb-4">Verified banks, Western Union agents, and money transfer locations across Laos.</p>
            <Link href="/laos/directory?category=Banks+%2F+Money+Transfer" className="bg-navy-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-700 transition-colors inline-block">
              Search Banking Listings →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
