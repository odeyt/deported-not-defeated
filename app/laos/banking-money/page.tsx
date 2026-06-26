import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Banking & Money in Laos for Deportees",
  description: "How to open a bank account, receive money from the USA, and manage your finances in Laos.",
};

export default function BankingMoneyPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">💰 Banking & Money</h1>
          <p className="text-gray-300 text-lg">How to receive money, open accounts, and manage finances in Laos.</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Receiving Money from the USA</h2>
            <p className="text-gray-600 mb-4">Family can send money through these services:</p>
            <div className="space-y-3">
              {[
                ["Western Union", "Widely available. Fast. Pickup at agents across Laos."],
                ["MoneyGram", "Similar to Western Union. Check for lower fees."],
                ["Wise (formerly TransferWise)", "Best exchange rates. Requires bank account."],
                ["Remitly", "Good for regular transfers. App-based."],
                ["Xoom (PayPal)", "Fast delivery. Good for first transfers."],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                  <div><span className="font-semibold text-navy-800">{name}:</span> <span className="text-gray-600 text-sm">{desc}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Opening a Bank Account</h2>
            <p className="text-gray-600 mb-3">To open a basic account in Laos you typically need:</p>
            <ul className="space-y-2">
              {["Valid Lao ID or passport", "Proof of address (rental agreement)", "Starting deposit ($50–200 equivalent)", "BCEL and Lao Development Bank have branches nationwide"].map(i => (
                <li key={i} className="flex items-start gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />{i}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy-800 mb-4">Currency</h2>
            <p className="text-gray-600">The Lao Kip (LAK) is the official currency. USD and Thai Baht are widely accepted in cities. ATMs are available in all major cities. Exchange rates vary — shop around.</p>
          </div>

          <Link href="/laos/directory" className="inline-block bg-navy-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-700 transition-colors">
            Find Banks & Money Transfer in Directory →
          </Link>
        </div>
      </section>
    </>
  );
}
