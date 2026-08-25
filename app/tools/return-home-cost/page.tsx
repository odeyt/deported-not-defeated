import type { Metadata } from "next";
import Link from "next/link";
import ReturnHomeCalculator from "@/components/tools/ReturnHomeCalculator";
import { getProvidersForCategory } from "@/lib/affiliate/service";
import { MEXICO_COST_MODEL } from "@/data/returnHomeCosts";
import { fromQueryParams } from "@/lib/return-home/calculate";

export const metadata: Metadata = {
  title: "Return-Home Cost Calculator for Mexico | How Much Money Do You Need",
  description:
    "Estimate what your first weeks back in Mexico may cost — housing, food, transport, and phone. Free, no signup, and it shows exactly how each number is calculated.",
  keywords: [
    "cost of returning to Mexico",
    "moving back to Mexico cost",
    "how much money to start over in Mexico",
    "deported to Mexico cost",
    "Mexico first month budget",
  ],
};

/**
 * Return-Home Cost Calculator (M-AFFILIATE2, Product B).
 *
 * A server component that reads shareable selections from the query string and
 * hands them to a small client island. The maths is pure and tested; the page
 * itself renders the surrounding context and the resources that follow from
 * what the reader said they need.
 *
 * The estimate is produced before any commercial resource is shown, and the
 * two never interact — see lib/return-home/calculate.ts.
 */
export default async function ReturnHomeCostPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const model = MEXICO_COST_MODEL;
  const initialInput = fromQueryParams(searchParams ?? {});

  // Fetched once on the server. The client decides whether to SHOW them based
  // on what the reader selected — fetching here keeps toggling instant and
  // avoids a request per checkbox.
  const [allMoneyTransfer, allEsim] = await Promise.all([
    getProvidersForCategory({ category: "MONEY_TRANSFER", country: model.countryCode }),
    getProvidersForCategory({ category: "ESIM", country: model.countryCode }),
  ]);
  const moneyTransferProviders = allMoneyTransfer.slice(0, 4);
  const esimProviders = allEsim.slice(0, 3);

  return (
    <main>
      <section className="bg-navy-800 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/mexico"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-5 transition-colors"
          >
            ← Mexico guide
          </Link>
          <p className="text-brand-red font-semibold uppercase tracking-wider text-xs mb-2">
            🇲🇽 Free tool · no signup
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            How much money will your first weeks in Mexico cost?
          </h1>
          <p className="text-gray-300 leading-relaxed max-w-2xl">
            An honest estimate for the period right after arriving — housing, food, getting around,
            and staying reachable. Every figure shows where it came from, and nothing here is
            guesswork dressed up as data.
          </p>
        </div>
      </section>

      <section className="bg-gray-950 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <ReturnHomeCalculator
            model={model}
            initialInput={initialInput}
            moneyTransferProviders={moneyTransferProviders}
            esimProviders={esimProviders}
          />
        </div>
      </section>

      <section className="bg-navy-800 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Next steps in Mexico</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: "/mexico/first-30-days", label: "Your first 30 days", desc: "What to do week by week" },
              { href: "/mexico/housing-mexico-city", label: "Finding housing", desc: "Rooms and apartments" },
              { href: "/mexico/receive-money-usa-to-mexico", label: "Receiving money", desc: "Compare transfer services" },
              { href: "/mexico/find-work-mexico", label: "Finding work", desc: "Jobs and income" },
              { href: "/mexico/sim-card-mexico", label: "Phone and data", desc: "Getting connected" },
              { href: "/mexico/cost-of-living-mexico-city", label: "Cost of living", desc: "The research behind these numbers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-4 rounded-xl border border-white/10 hover:border-brand-red hover:bg-white/5 transition-colors"
              >
                <span className="block text-white font-semibold text-sm">{link.label}</span>
                <span className="block text-gray-400 text-xs mt-0.5">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
