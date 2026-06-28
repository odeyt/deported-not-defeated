"use client";

import { useState } from "react";

// Rough cost estimates per person per night [hostel, hotel, food/day, transport/day]
// [budget, standard, comfortable] × [hostel, hotel, food, transport]
const COUNTRY_COSTS: Record<string, { budget: number[]; standard: number[]; comfortable: number[] }> = {
  mexico:             { budget: [20, 65, 20, 12], standard: [45, 110, 35, 22], comfortable: [75, 200, 60, 45] },
  "el-salvador":      { budget: [18, 55, 18, 10], standard: [40, 90, 30, 20], comfortable: [65, 160, 55, 40] },
  guatemala:          { budget: [12, 45, 15, 10], standard: [30, 80, 28, 18], comfortable: [55, 150, 50, 35] },
  honduras:           { budget: [20, 60, 18, 12], standard: [40, 100, 32, 22], comfortable: [65, 170, 55, 40] },
  belize:             { budget: [25, 80, 22, 14], standard: [50, 140, 40, 28], comfortable: [80, 240, 70, 55] },
  nicaragua:          { budget: [10, 40, 14, 8],  standard: [25, 70, 25, 15], comfortable: [45, 120, 45, 30] },
  "costa-rica":       { budget: [25, 90, 25, 15], standard: [55, 160, 45, 35], comfortable: [90, 280, 75, 65] },
  panama:             { budget: [22, 75, 20, 12], standard: [50, 130, 38, 25], comfortable: [80, 220, 65, 50] },
  jamaica:            { budget: [30, 100, 30, 18], standard: [60, 180, 50, 35], comfortable: [95, 300, 85, 65] },
  "dominican-republic": { budget: [25, 90, 25, 15], standard: [55, 160, 45, 30], comfortable: [85, 280, 75, 60] },
  haiti:              { budget: [35, 80, 25, 20], standard: [60, 140, 40, 35], comfortable: [90, 200, 60, 55] },
  cuba:               { budget: [30, 70, 20, 12], standard: [55, 120, 35, 22], comfortable: [80, 200, 55, 40] },
  bahamas:            { budget: [60, 150, 40, 20], standard: [100, 250, 65, 40], comfortable: [150, 400, 100, 70] },
  "trinidad-and-tobago": { budget: [35, 90, 28, 15], standard: [65, 160, 50, 30], comfortable: [100, 260, 80, 55] },
  colombia:           { budget: [15, 50, 18, 10], standard: [35, 90, 32, 20], comfortable: [60, 160, 55, 40] },
  venezuela:          { budget: [20, 55, 15, 10], standard: [40, 90, 28, 18], comfortable: [65, 150, 50, 35] },
  brazil:             { budget: [18, 65, 22, 12], standard: [45, 120, 40, 25], comfortable: [75, 220, 65, 50] },
  peru:               { budget: [12, 50, 18, 10], standard: [30, 90, 32, 20], comfortable: [55, 180, 55, 40] },
  ecuador:            { budget: [12, 50, 16, 8],  standard: [28, 85, 30, 18], comfortable: [50, 160, 52, 35] },
  guyana:             { budget: [35, 80, 25, 15], standard: [60, 140, 45, 28], comfortable: [90, 220, 70, 50] },
  laos:               { budget: [8,  30, 12, 6],  standard: [20, 60, 22, 12], comfortable: [40, 120, 40, 25] },
  cambodia:           { budget: [8,  30, 12, 6],  standard: [18, 60, 22, 12], comfortable: [35, 120, 40, 25] },
  vietnam:            { budget: [8,  35, 12, 6],  standard: [20, 70, 22, 12], comfortable: [40, 140, 40, 25] },
  philippines:        { budget: [12, 45, 15, 8],  standard: [28, 85, 28, 16], comfortable: [50, 160, 50, 35] },
  thailand:           { budget: [10, 40, 14, 7],  standard: [25, 80, 25, 15], comfortable: [50, 160, 45, 32] },
  myanmar:            { budget: [12, 40, 12, 8],  standard: [28, 80, 22, 15], comfortable: [50, 150, 40, 30] },
  indonesia:          { budget: [10, 40, 14, 7],  standard: [25, 80, 25, 15], comfortable: [50, 160, 45, 32] },
  nepal:              { budget: [8,  30, 10, 6],  standard: [18, 60, 20, 12], comfortable: [35, 120, 38, 25] },
  india:              { budget: [8,  35, 10, 5],  standard: [20, 70, 20, 12], comfortable: [45, 150, 40, 28] },
  pakistan:           { budget: [15, 45, 12, 8],  standard: [30, 85, 22, 15], comfortable: [55, 160, 40, 30] },
  bangladesh:         { budget: [20, 50, 14, 8],  standard: [35, 90, 25, 15], comfortable: [60, 160, 45, 30] },
  china:              { budget: [15, 55, 15, 8],  standard: [35, 100, 30, 18], comfortable: [65, 200, 55, 40] },
  nigeria:            { budget: [35, 90, 25, 15], standard: [65, 160, 45, 30], comfortable: [100, 260, 75, 55] },
  ghana:              { budget: [20, 65, 20, 12], standard: [45, 120, 38, 22], comfortable: [75, 200, 60, 45] },
  liberia:            { budget: [35, 80, 22, 15], standard: [60, 140, 40, 28], comfortable: [90, 220, 65, 50] },
  cameroon:           { budget: [30, 75, 20, 12], standard: [55, 130, 38, 22], comfortable: [85, 210, 60, 45] },
  ethiopia:           { budget: [15, 50, 16, 8],  standard: [30, 90, 28, 15], comfortable: [55, 160, 50, 32] },
  somalia:            { budget: [40, 90, 20, 20], standard: [70, 150, 38, 35], comfortable: [100, 220, 60, 55] },
  "sierra-leone":     { budget: [30, 70, 18, 12], standard: [55, 130, 35, 22], comfortable: [80, 200, 58, 45] },
  "united-kingdom":   { budget: [35, 130, 45, 20], standard: [70, 220, 75, 40], comfortable: [110, 380, 120, 75] },
  romania:            { budget: [18, 65, 22, 10], standard: [40, 120, 40, 20], comfortable: [70, 220, 65, 40] },
  albania:            { budget: [14, 50, 18, 8],  standard: [30, 90, 32, 15], comfortable: [55, 160, 55, 30] },
  poland:             { budget: [18, 70, 22, 10], standard: [40, 130, 40, 20], comfortable: [70, 230, 68, 40] },
  ukraine:            { budget: [20, 60, 18, 10], standard: [40, 110, 32, 18], comfortable: [65, 180, 55, 35] },
  russia:             { budget: [20, 70, 20, 10], standard: [45, 130, 38, 20], comfortable: [75, 240, 65, 42] },
};

const DEFAULT_COSTS = { budget: [20, 65, 20, 12], standard: [45, 115, 38, 22], comfortable: [80, 200, 65, 45] };

const COUNTRIES = Object.keys(COUNTRY_COSTS).map((slug) => ({
  slug,
  label: slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
}));

export default function TravelBudgetCalculator() {
  const [country, setCountry] = useState("mexico");
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(7);
  const [style, setStyle] = useState<"budget" | "standard" | "comfortable">("standard");
  const [useHotel, setUseHotel] = useState(true);
  const [carRental, setCarRental] = useState(false);
  const [tours, setTours] = useState(false);
  const [insurance, setInsurance] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const costs = COUNTRY_COSTS[country] ?? DEFAULT_COSTS;
  const tier = costs[style];
  const [hostelCost, hotelCost, foodPerDay, transportPerDay] = tier;

  function calculate() {
    setShowResult(true);
  }

  // Per person per night accommodation
  const accomPerPersonNight = useHotel ? hotelCost : hostelCost;
  const accomTotal = accomPerPersonNight * travelers * nights;

  // Food
  const foodTotal = foodPerDay * travelers * nights;

  // Local transport (per person per day)
  const transportTotal = transportPerDay * travelers * nights;

  // Flights: rough estimate (not included — too variable)
  const carTotal = carRental ? 45 * nights : 0;
  const toursTotal = tours ? 50 * travelers * Math.min(nights, 3) : 0;
  const insuranceTotal = insurance ? 3 * travelers * nights : 0;

  const totalLow = Math.round((accomTotal + foodTotal + transportTotal + carTotal + toursTotal + insuranceTotal) * 0.85);
  const totalHigh = Math.round((accomTotal + foodTotal + transportTotal + carTotal + toursTotal + insuranceTotal) * 1.2);

  return (
    <div className="bg-gray-950 border border-white/10 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-navy-800 to-gray-900 px-6 py-5 border-b border-white/10">
        <h3 className="text-white font-bold text-xl">Estimate Your Visit Budget</h3>
        <p className="text-gray-400 text-sm mt-1">Get a rough cost range before you book. Flights are not included — prices vary greatly.</p>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">Destination Country</label>
            <select
              value={country}
              onChange={(e) => { setCountry(e.target.value); setShowResult(false); }}
              className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
            >
              {COUNTRIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">Travel Style</label>
            <select
              value={style}
              onChange={(e) => { setStyle(e.target.value as typeof style); setShowResult(false); }}
              className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
            >
              <option value="budget">Budget (hostels, street food, local transport)</option>
              <option value="standard">Standard (mid-range hotels, restaurants)</option>
              <option value="comfortable">Comfortable (quality hotels, more dining out)</option>
            </select>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">Number of Travelers</label>
            <input
              type="number"
              min={1}
              max={10}
              value={travelers}
              onChange={(e) => { setTravelers(Number(e.target.value)); setShowResult(false); }}
              className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>

          {/* Nights */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1.5">Number of Nights</label>
            <input
              type="number"
              min={1}
              max={90}
              value={nights}
              onChange={(e) => { setNights(Number(e.target.value)); setShowResult(false); }}
              className="w-full bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Hotel (vs Hostel)", state: useHotel, set: setUseHotel },
            { label: "Car Rental", state: carRental, set: setCarRental },
            { label: "Tours & Activities", state: tours, set: setTours },
            { label: "Travel Insurance", state: insurance, set: setInsurance },
          ].map(({ label, state, set }) => (
            <button
              key={label}
              onClick={() => { set(!state); setShowResult(false); }}
              className={`rounded-xl px-3 py-2.5 text-xs font-bold border transition-all ${
                state
                  ? "bg-brand-red border-brand-red text-white"
                  : "bg-gray-800 border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {state ? "✓ " : ""}{label}
            </button>
          ))}
        </div>

        <button
          onClick={calculate}
          className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
        >
          Calculate Estimated Budget
        </button>

        {showResult && (
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-5 space-y-3">
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest">Estimated Budget Breakdown</p>
            <div className="space-y-2">
              {[
                ["Accommodation", `$${Math.round(accomTotal * 0.9).toLocaleString()} – $${Math.round(accomTotal * 1.15).toLocaleString()}`],
                ["Food & Dining", `$${Math.round(foodTotal * 0.85).toLocaleString()} – $${Math.round(foodTotal * 1.2).toLocaleString()}`],
                ["Local Transportation", `$${Math.round(transportTotal * 0.85).toLocaleString()} – $${Math.round(transportTotal * 1.2).toLocaleString()}`],
                ...(carRental ? [["Car Rental (est.)", `$${Math.round(carTotal * 0.9).toLocaleString()} – $${Math.round(carTotal * 1.15).toLocaleString()}`]] : []),
                ...(tours ? [["Tours & Activities", `$${Math.round(toursTotal * 0.8).toLocaleString()} – $${Math.round(toursTotal * 1.3).toLocaleString()}`]] : []),
                ...(insurance ? [["Travel Insurance", `$${Math.round(insuranceTotal * 0.85).toLocaleString()} – $${Math.round(insuranceTotal * 1.2).toLocaleString()}`]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-white font-bold">Estimated Total</span>
              <span className="text-brand-red font-extrabold text-lg">
                ${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              ⚠️ Flights not included. Actual costs vary by season, city, airline, exchange rate, and availability. These are rough estimates only.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {/* TODO: Add analytics event tracking for calculator CTA clicks */}
              <a href="#affiliate-placeholder" className="flex-1 text-center bg-brand-red hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                Search Flights →
              </a>
              <a href="#affiliate-placeholder" className="flex-1 text-center border border-white/20 hover:border-white/40 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                Find Hotels →
              </a>
              <a href="#affiliate-placeholder" className="flex-1 text-center border border-white/20 hover:border-white/40 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                Get Insurance →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
