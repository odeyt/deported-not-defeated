"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_INPUT,
  INPUT_LIMITS,
  calculate,
  toQueryString,
  type CalculatorInput,
  type HousingChoice,
  type TransportChoice,
} from "@/lib/return-home/calculate";
import { FX_NOTE, convertToUsd, type CountryCostModel } from "@/data/returnHomeCosts";

/**
 * The interactive part of the Return-Home Cost Calculator.
 *
 * Kept deliberately small: the maths lives in lib/return-home/calculate.ts,
 * which is pure and tested. This component only collects choices and renders
 * the result, so the client bundle stays light and the numbers stay testable.
 */

interface Props {
  model: CountryCostModel;
  initialInput: CalculatorInput;
}

const HOUSING_OPTIONS: { value: HousingChoice; label: string; hint: string }[] = [
  { value: "staying_with_family", label: "Staying with family or friends", hint: "No housing cost" },
  { value: "rented_room", label: "Renting a room", hint: "Cuarto de renta" },
  { value: "own_place", label: "Renting your own place", hint: "Apartment" },
];

const TRANSPORT_OPTIONS: { value: TransportChoice; label: string; hint: string }[] = [
  { value: "minimal", label: "Mostly walking, some transit", hint: "Metro and bus" },
  { value: "regular", label: "Daily transit, occasional rides", hint: "Metro plus Uber/DiDi" },
];

const fieldClass =
  "w-full px-3 py-2.5 bg-navy-800 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent";
const labelClass = "block text-sm font-semibold text-white mb-1.5";

function formatMoney(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString("en-US")}`;
}

export default function ReturnHomeCalculator({ model, initialInput }: Props) {
  const [input, setInput] = useState<CalculatorInput>(initialInput);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculate(model, input), [model, input]);

  function update<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  }

  async function copyShareLink() {
    const url = `${window.location.origin}${window.location.pathname}?${toQueryString(input)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6">
      {/* ---------------------------------------------------------- inputs */}
      <form
        className="bg-navy-800/60 border border-white/10 rounded-2xl p-5 space-y-5"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Cost estimate options"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="people">
              How many people
            </label>
            <input
              id="people"
              type="number"
              inputMode="numeric"
              min={INPUT_LIMITS.people.min}
              max={INPUT_LIMITS.people.max}
              value={input.people}
              onChange={(e) => update("people", Number(e.target.value))}
              onBlur={(e) => {
                const n = Number(e.target.value);
                if (!Number.isFinite(n) || n < INPUT_LIMITS.people.min) update("people", 1);
                else if (n > INPUT_LIMITS.people.max) update("people", INPUT_LIMITS.people.max);
              }}
              className={fieldClass}
              aria-describedby="people-hint"
            />
            <p id="people-hint" className="text-xs text-gray-400 mt-1">
              1 to {INPUT_LIMITS.people.max}
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="weeks">
              For how long
            </label>
            <select
              id="weeks"
              value={input.weeks}
              onChange={(e) => update("weeks", Number(e.target.value))}
              className={fieldClass}
            >
              {[1, 2, 4, 8, 12, 26].map((w) => (
                <option key={w} value={w}>
                  {w === 1 ? "1 week" : w === 26 ? "6 months" : `${w} weeks`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>Where will you stay</legend>
          <div className="space-y-2">
            {HOUSING_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-white/25 cursor-pointer transition-colors has-[:checked]:border-brand-red has-[:checked]:bg-brand-red/10"
              >
                <input
                  type="radio"
                  name="housing"
                  value={option.value}
                  checked={input.housing === option.value}
                  onChange={() => update("housing", option.value)}
                  className="mt-1 w-4 h-4 accent-brand-red shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-sm text-white">{option.label}</span>
                  <span className="block text-xs text-gray-400">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {input.people > 1 && input.housing !== "staying_with_family" && (
          <label className="flex items-center gap-3 text-sm text-gray-200">
            <input
              type="checkbox"
              checked={input.separateRooms}
              onChange={(e) => update("separateRooms", e.target.checked)}
              className="w-4 h-4 accent-brand-red"
            />
            Each person needs their own room
          </label>
        )}

        <fieldset>
          <legend className={labelClass}>Getting around</legend>
          <div className="space-y-2">
            {TRANSPORT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-white/25 cursor-pointer transition-colors has-[:checked]:border-brand-red has-[:checked]:bg-brand-red/10"
              >
                <input
                  type="radio"
                  name="transport"
                  value={option.value}
                  checked={input.transport === option.value}
                  onChange={() => update("transport", option.value)}
                  className="mt-1 w-4 h-4 accent-brand-red shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-sm text-white">{option.label}</span>
                  <span className="block text-xs text-gray-400">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-3 text-sm text-gray-200">
            <input
              type="checkbox"
              checked={input.needsPhone}
              onChange={(e) => update("needsPhone", e.target.checked)}
              className="w-4 h-4 accent-brand-red"
            />
            I need a phone plan or data
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-200">
            <input
              type="checkbox"
              checked={input.includeEmergencyReserve}
              onChange={(e) => update("includeEmergencyReserve", e.target.checked)}
              className="w-4 h-4 accent-brand-red"
            />
            Add an emergency reserve
          </label>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => setInput(DEFAULT_INPUT)}
            className="px-4 py-2.5 rounded-xl border border-white/20 text-sm text-gray-200 hover:bg-white/5 transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={copyShareLink}
            className="px-4 py-2.5 rounded-xl border border-white/20 text-sm text-gray-200 hover:bg-white/5 transition-colors"
          >
            {copied ? "Link copied" : "Copy link to this estimate"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? "Share link copied to clipboard" : ""}
        </p>
      </form>

      {/* ---------------------------------------------------------- result */}
      <div className="space-y-4">
        <div className="bg-navy-800 border border-white/10 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-white mb-1">
            Estimated cost for {result.weeks} {result.weeks === 1 ? "week" : "weeks"}
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Based on {model.basedOn} figures. Costs elsewhere in {model.countryName} are often lower.
          </p>

          <div className="grid grid-cols-3 gap-3" role="group" aria-label="Estimate range">
            {[
              { label: "Lean", value: result.totals.low },
              { label: "Typical", value: result.totals.typical, emphasis: true },
              { label: "With buffer", value: result.totals.high },
            ].map((band) => (
              <div
                key={band.label}
                className={`rounded-xl p-3 border ${
                  band.emphasis ? "border-brand-red bg-brand-red/10" : "border-white/10"
                }`}
              >
                <p className="text-[11px] uppercase tracking-wide text-gray-400">{band.label}</p>
                <p className="text-lg font-extrabold text-white leading-tight mt-1 break-words">
                  {formatMoney(band.value, model.currency)}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  ≈ USD {Math.round(convertToUsd(band.value)).toLocaleString("en-US")}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-500 mt-3">{FX_NOTE}</p>
        </div>

        {/* Transparency: every line, and how it was derived. */}
        <div className="bg-navy-800 border border-white/10 rounded-2xl overflow-hidden">
          <h3 className="text-sm font-bold text-white px-5 pt-4 pb-2">How this is calculated</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Cost breakdown by category, showing lean, typical, and buffer estimates
              </caption>
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-gray-400 border-b border-white/10">
                  <th scope="col" className="text-left px-5 py-2 font-semibold">Category</th>
                  <th scope="col" className="text-right px-2 py-2 font-semibold">Lean</th>
                  <th scope="col" className="text-right px-2 py-2 font-semibold">Typical</th>
                  <th scope="col" className="text-right px-5 py-2 font-semibold">Buffer</th>
                </tr>
              </thead>
              <tbody>
                {result.lines.map((line) => (
                  <tr key={line.code} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-2.5">
                      <span className="block text-gray-100">{line.label}</span>
                      <span className="block text-[11px] text-gray-500">{line.basis}</span>
                    </td>
                    <td className="text-right px-2 py-2.5 text-gray-400 tabular-nums">
                      {line.low.toLocaleString("en-US")}
                    </td>
                    <td className="text-right px-2 py-2.5 text-white font-semibold tabular-nums">
                      {line.typical.toLocaleString("en-US")}
                    </td>
                    <td className="text-right px-5 py-2.5 text-gray-400 tabular-nums">
                      {line.high.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.notEstimated.length > 0 && (
            <div className="px-5 py-4 border-t border-white/10 bg-white/[0.02]">
              <p className="text-xs font-semibold text-gray-300 mb-1">Not included in the total</p>
              {result.notEstimated.map((line) => (
                <p key={line.code} className="text-xs text-gray-400">
                  <span className="text-gray-300">{line.label}:</span> {line.note}
                </p>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          This is an estimate to help you plan, not financial advice and not official pricing.
          Figures come from our {model.basedOn} cost research, last reviewed {model.lastReviewed}.
          Real costs vary by neighbourhood, season, and circumstance.
        </p>
      </div>
    </div>
  );
}
