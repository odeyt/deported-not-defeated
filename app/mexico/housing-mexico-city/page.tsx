import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "How to Find Housing in Mexico City After Deportation",
  description: "Guide to affordable housing in Mexico City — cuartos de renta, colonias, apps, and what to expect on a tight budget as a deportee.",
};

export default function MexicoHousingPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-wider text-sm mb-2">🇲🇽 Mexico Guide</p>
          <h1 className="text-4xl font-extrabold mb-4">How to Find Housing in Mexico City</h1>
          <p className="text-xl text-gray-300">Mexico City (CDMX) is one of the largest cities in the world. Rooms are available at every price point — here is how to find a safe, affordable place fast.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Night One: Budget Hotels & Hostales</h2>
            <p className="text-gray-300 text-sm mb-3">Budget hotels in CDMX start at $200–400 MXN/night ($11–22 USD). The Centro Histórico and Doctores areas have the cheapest options. Avoid areas like Tepito at night until you know the city.</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Centro Histórico — busy, central, affordable, many budget hotels</li>
              <li>• Colonia Doctores — affordable residential, near hospitals</li>
              <li>• Colonia Roma and Condesa — nicer, pricier, but safe and accessible</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Monthly Budget: What You Can Afford</h2>
            <div className="grid gap-4">
              {[
                { tier: "Survival Budget", price: "$2,000–4,000 MXN/month ($110–220)", desc: "Cuarto de renta (furnished room) in Iztapalapa, Venustiano Carranza, or Gustavo A. Madero. Shared bathroom typical." },
                { tier: "Stable Budget", price: "$4,000–8,000 MXN/month ($220–440)", desc: "Private room with AC, WiFi, and private bathroom. Colonias Doctores, Obrera, or Guerrero." },
                { tier: "Comfortable Budget", price: "$8,000–20,000 MXN/month ($440–1,100)", desc: "Studio or 1BR apartment. Colonia Roma, Condesa, Del Valle, or Narvarte — expat-friendly." },
              ].map((row) => (
                <div key={row.tier} className="bg-navy-800 rounded-xl p-5">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-white">{row.tier}</span>
                    <span className="text-brand-red font-bold">{row.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">How to Find a Room</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <strong className="text-white">Facebook Marketplace:</strong> Search "cuarto en renta CDMX" — largest selection for budget rooms</li>
              <li>• <strong className="text-white">Vivanuncios.com.mx:</strong> Mexico's top real estate classifieds</li>
              <li>• <strong className="text-white">Metros Cúbicos:</strong> Apartment listings with maps and photos</li>
              <li>• <strong className="text-white">Walk the colonia:</strong> Signs saying "Se Renta Cuarto" or "Se Renta Departamento" are common</li>
              <li>• <strong className="text-white">Ask family or acquaintances:</strong> Word-of-mouth housing is extremely common in Mexico</li>
            </ul>
          </div>

          <div className="bg-navy-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">What to Know Before Signing</h2>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• CURP and/or CDMX voter ID (INE) are commonly required by landlords</li>
              <li>• Most rooms are month-to-month — aval (co-signer) may be needed for apartments</li>
              <li>• Utilities (CFE electricity, gas, water) may or may not be included — always confirm</li>
              <li>• CFE electricity: ~$1–1.50/kWh at residential rates</li>
              <li>• Negotiate — first month free or reduced deposit is possible for multi-month commitments</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/mexico/first-30-days" className="text-brand-red hover:underline text-sm">← First 30 Days Checklist</Link>
            <Link href="/mexico/cost-of-living-mexico-city" className="text-brand-red hover:underline text-sm">Cost of Living →</Link>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
