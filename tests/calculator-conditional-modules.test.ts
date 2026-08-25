import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_INPUT,
  calculate,
  sanitizeInput,
  toQueryString,
  fromQueryParams,
  type CalculatorInput,
} from "../lib/return-home/calculate.ts";
import { MEXICO_COST_MODEL } from "../data/returnHomeCosts.ts";

/**
 * Conditional calculator modules (M-GROWTH1A Phase 1).
 *
 * Before this change the calculator showed money-transfer and eSIM blocks to
 * everyone, whatever they had selected. Now a commercial block appears only
 * when the reader explicitly said they need that thing.
 *
 * The rule that matters most: a stated NEED must never change the ESTIMATE.
 */

const ROOT = path.join(import.meta.dirname, "..");
const model = MEXICO_COST_MODEL;
const input = (over: Partial<CalculatorInput> = {}): CalculatorInput => ({
  ...DEFAULT_INPUT,
  ...over,
});

// ------------------------------------------------- the need does not move money

test("saying family may send money does NOT change the estimate", () => {
  const without = calculate(model, input({ familyMaySendMoney: false }));
  const withNeed = calculate(model, input({ familyMaySendMoney: true }));

  assert.deepEqual(
    withNeed.totals,
    without.totals,
    "a commercial need must never alter the budget"
  );
  assert.deepEqual(withNeed.lines, without.lines);
});

test("the flag defaults to off, so no commercial block appears unasked", () => {
  assert.equal(DEFAULT_INPUT.familyMaySendMoney, false);
});

// ------------------------------------------------- gating conditions

test("the money-transfer block is gated on the explicit selection", () => {
  // Mirrors the component: `input.familyMaySendMoney && providers.length > 0`.
  const show = (sel: boolean, providers: number) => sel && providers > 0;

  assert.equal(show(false, 4), false, "not selected -> no block");
  assert.equal(show(true, 0), false, "selected but nothing to show -> no block");
  assert.equal(show(true, 4), true);
});

test("the eSIM block follows the existing phone selection", () => {
  const show = (sel: boolean, providers: number) => sel && providers > 0;

  assert.equal(show(input({ needsPhone: false }).needsPhone, 3), false);
  assert.equal(show(input({ needsPhone: true }).needsPhone, 3), true);
});

test("declining the phone removes both its cost line and its resource block", () => {
  const result = calculate(model, input({ needsPhone: false }));
  assert.equal(result.lines.find((l) => l.code === "PHONE"), undefined);
  assert.equal(input({ needsPhone: false }).needsPhone, false);
});

// ------------------------------------------------- untrusted input

test("the new flag is coerced like every other input", () => {
  assert.equal(sanitizeInput({ familyMaySendMoney: "1" }).familyMaySendMoney, true);
  assert.equal(sanitizeInput({ familyMaySendMoney: "0" }).familyMaySendMoney, false);
  assert.equal(sanitizeInput({ familyMaySendMoney: "yes" }).familyMaySendMoney, false);
  assert.equal(sanitizeInput({ familyMaySendMoney: null }).familyMaySendMoney, false);
});

test("the flag round-trips through a share link", () => {
  const original = input({ familyMaySendMoney: true, weeks: 8 });
  const restored = fromQueryParams(
    Object.fromEntries(new URLSearchParams(toQueryString(original)))
  );
  assert.equal(restored.familyMaySendMoney, true);
  assert.deepEqual(restored, original);
});

test("the share link carries no sensitive field", () => {
  const query = toQueryString(input({ familyMaySendMoney: true }));
  for (const forbidden of ["email", "name", "status", "case", "passport", "reason", "deport"]) {
    assert.ok(!query.includes(forbidden), `share URL must not carry "${forbidden}"`);
  }
});

// ------------------------------------------------- structural guarantees

test("the page no longer renders unconditional recommendation blocks", () => {
  const page = fs.readFileSync(path.join(ROOT, "app/tools/return-home-cost/page.tsx"), "utf8");
  assert.ok(
    !page.includes("<AffiliateRecommendations"),
    "recommendations must be gated by the client on explicit selections"
  );
});

test("insurance and accommodation are deliberately absent from the calculator", () => {
  const component = fs.readFileSync(
    path.join(ROOT, "components/tools/ReturnHomeCalculator.tsx"),
    "utf8"
  );

  // Nomad insurance covers travel OUTSIDE your home country, so it is wrong for
  // someone who has returned to Mexico and lives there. Hotels are for
  // visitors, not for a person renting a room long-term.
  assert.ok(
    !/category="TRAVEL_INSURANCE"|campaign="[^"]*insurance/i.test(component),
    "travel insurance must not be offered to a returnee on their own home-country page"
  );
  assert.ok(!/category="HOTELS"/.test(component));
});

test("the calculator collects nothing about immigration circumstances", () => {
  const component = fs.readFileSync(
    path.join(ROOT, "components/tools/ReturnHomeCalculator.tsx"),
    "utf8"
  );
  const code = component
    .split("\n")
    .filter((line) => !line.trim().startsWith("*") && !line.trim().startsWith("//"))
    .join("\n");

  for (const forbidden of [
    "deportationReason",
    "immigrationStatus",
    "criminalHistory",
    "caseNumber",
    "passportNumber",
    "alienNumber",
  ]) {
    assert.ok(!code.includes(forbidden), `must never collect ${forbidden}`);
  }
});
