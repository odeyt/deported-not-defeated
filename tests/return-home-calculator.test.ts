import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_INPUT,
  calculate,
  fromQueryParams,
  sanitizeInput,
  INPUT_LIMITS,
  toQueryString,
  type CalculatorInput,
} from "../lib/return-home/calculate.ts";
import { MEXICO_COST_MODEL } from "../data/returnHomeCosts.ts";

/**
 * Return-Home Cost Calculator (M-AFFILIATE2, spec §42).
 *
 * The calculator gives people a number they may plan around, so it has to be
 * deterministic, defensible, and impossible to push around from a URL.
 */

const model = MEXICO_COST_MODEL;
const input = (overrides: Partial<CalculatorInput> = {}): CalculatorInput => ({
  ...DEFAULT_INPUT,
  ...overrides,
});

// ---------------------------------------------------------------- determinism

test("identical inputs always produce identical output", () => {
  const a = calculate(model, input());
  const b = calculate(model, input());
  assert.deepEqual(a, b);
});

test("the default estimate is positive and ordered low < typical < high", () => {
  const { totals } = calculate(model, input());
  assert.ok(totals.low > 0);
  assert.ok(totals.low < totals.typical, "low must be below typical");
  assert.ok(totals.typical < totals.high, "typical must be below high");
});

// ---------------------------------------------------------------- scaling

test("more people costs more, but housing does not multiply when sharing", () => {
  const one = calculate(model, input({ people: 1, separateRooms: false }));
  const three = calculate(model, input({ people: 3, separateRooms: false }));

  assert.ok(three.totals.typical > one.totals.typical, "three people must cost more");

  const housingOne = one.lines.find((l) => l.code === "HOUSING");
  const housingThree = three.lines.find((l) => l.code === "HOUSING");
  assert.equal(
    housingOne?.typical,
    housingThree?.typical,
    "shared housing must not scale per person"
  );
});

test("separate rooms multiplies housing by the number of people", () => {
  const shared = calculate(model, input({ people: 2, separateRooms: false }));
  const separate = calculate(model, input({ people: 2, separateRooms: true }));

  const sharedHousing = shared.lines.find((l) => l.code === "HOUSING")!;
  const separateHousing = separate.lines.find((l) => l.code === "HOUSING")!;
  assert.equal(separateHousing.typical, sharedHousing.typical * 2);
});

test("longer stays cost proportionally more", () => {
  const four = calculate(model, input({ weeks: 4 }));
  const twelve = calculate(model, input({ weeks: 12 }));
  const ratio = twelve.totals.typical / four.totals.typical;
  assert.ok(ratio > 2.8 && ratio < 3.2, `expected roughly 3x, got ${ratio.toFixed(2)}`);
});

// ---------------------------------------------------------------- choices

test("staying with family removes the housing line entirely", () => {
  const result = calculate(model, input({ housing: "staying_with_family" }));
  assert.equal(
    result.lines.find((l) => l.code === "HOUSING"),
    undefined,
    "no zero-value housing line — it should be absent, not zero"
  );
  const renting = calculate(model, input({ housing: "rented_room" }));
  assert.ok(result.totals.typical < renting.totals.typical);
});

test("declining a phone removes the phone line", () => {
  const without = calculate(model, input({ needsPhone: false }));
  assert.equal(without.lines.find((l) => l.code === "PHONE"), undefined);
});

test("minimal transport costs less than regular transport", () => {
  const minimal = calculate(model, input({ transport: "minimal" }));
  const regular = calculate(model, input({ transport: "regular" }));
  const a = minimal.lines.find((l) => l.code === "TRANSPORT")!;
  const b = regular.lines.find((l) => l.code === "TRANSPORT")!;
  assert.ok(a.typical < b.typical);
});

test("the emergency reserve is a stated fraction of the subtotal and can be turned off", () => {
  const withReserve = calculate(model, input({ includeEmergencyReserve: true }));
  const without = calculate(model, input({ includeEmergencyReserve: false }));

  const reserve = withReserve.lines.find((l) => l.code === "EMERGENCY_RESERVE")!;
  assert.ok(reserve, "reserve line must exist when requested");
  assert.match(reserve.basis, /25% of the subtotal/);
  assert.equal(without.lines.find((l) => l.code === "EMERGENCY_RESERVE"), undefined);
  assert.ok(withReserve.totals.typical > without.totals.typical);
});

// ---------------------------------------------------------------- honesty

test("unsourced categories are reported as not estimated, never as a number", () => {
  const result = calculate(model, input());
  const documents = result.notEstimated.find((l) => l.code === "DOCUMENTS");

  assert.ok(documents, "documents must be surfaced as a consideration");
  assert.equal(documents.estimated, false);
  assert.equal(documents.typical, 0);
  assert.ok(
    !result.lines.some((l) => l.code === "DOCUMENTS"),
    "an unsourced category must never contribute a figure to the total"
  );
});

test("every estimated line explains how it was derived", () => {
  const result = calculate(model, input());
  for (const line of result.lines) {
    assert.ok(line.basis.length > 0, `${line.code} must state its basis`);
  }
});

test("totals are rounded so the output never implies false precision", () => {
  const result = calculate(model, input({ people: 3, weeks: 7 }));
  for (const line of result.lines) {
    assert.equal(line.typical % 50, 0, `${line.code} should be rounded to the nearest 50`);
  }
});

// ---------------------------------------------------------------- untrusted input

test("out-of-range values are clamped rather than accepted", () => {
  assert.equal(sanitizeInput({ people: 9999 }).people, 8);
  assert.equal(sanitizeInput({ people: -5 }).people, 1);
  assert.equal(sanitizeInput({ people: 0 }).people, 1);
  assert.equal(sanitizeInput({ weeks: 100000 }).weeks, 26);
  assert.equal(sanitizeInput({ weeks: -1 }).weeks, 1);
});

test("NaN, junk, and missing values fall back to defaults", () => {
  assert.equal(sanitizeInput({ people: "abc" }).people, DEFAULT_INPUT.people);
  assert.equal(sanitizeInput({ people: NaN }).people, DEFAULT_INPUT.people);
  assert.equal(sanitizeInput({ weeks: undefined }).weeks, DEFAULT_INPUT.weeks);
  assert.equal(sanitizeInput({}).housing, DEFAULT_INPUT.housing);
});

test("unknown enum values fall back instead of flowing through", () => {
  assert.equal(sanitizeInput({ housing: "mansion" }).housing, DEFAULT_INPUT.housing);
  assert.equal(sanitizeInput({ transport: "helicopter" }).transport, DEFAULT_INPUT.transport);
  assert.equal(sanitizeInput({ housing: "<script>" }).housing, DEFAULT_INPUT.housing);
});

test("a tampered URL cannot produce a broken or absurd estimate", () => {
  const tampered = fromQueryParams({
    people: "1e9",
    weeks: "-40",
    housing: "'; drop table affiliate_partners; --",
    transport: "../../etc/passwd",
  });
  const result = calculate(model, tampered);

  assert.ok(Number.isFinite(result.totals.typical));
  assert.ok(result.totals.typical > 0);

  // The property that matters is "always inside the allowed range", not any
  // particular coerced value. ("1e9" parses to 1 under parseInt, which is safe
  // but not obvious — asserting the exact number would test the coercion quirk
  // rather than the guarantee.)
  assert.ok(
    tampered.people >= INPUT_LIMITS.people.min && tampered.people <= INPUT_LIMITS.people.max,
    `people escaped its range: ${tampered.people}`
  );
  assert.ok(
    tampered.weeks >= INPUT_LIMITS.weeks.min && tampered.weeks <= INPUT_LIMITS.weeks.max,
    `weeks escaped its range: ${tampered.weeks}`
  );
  assert.equal(tampered.housing, DEFAULT_INPUT.housing, "injected enum must not survive");
  assert.equal(tampered.transport, DEFAULT_INPUT.transport);

  // And an explicitly huge number is still clamped.
  assert.equal(sanitizeInput({ people: 10 ** 9 }).people, INPUT_LIMITS.people.max);
});

// ---------------------------------------------------------------- sharing

test("share links round-trip and carry only calculator selections", () => {
  const original = input({ people: 3, weeks: 8, housing: "own_place", transport: "minimal" });
  const query = toQueryString(original);
  const restored = fromQueryParams(Object.fromEntries(new URLSearchParams(query)));

  assert.deepEqual(restored, original);

  for (const forbidden of ["email", "name", "status", "case", "passport", "reason"]) {
    assert.ok(!query.includes(forbidden), `share URL must not carry "${forbidden}"`);
  }
});

// ---------------------------------------------------------------- independence

test("the calculation never consults affiliate or commission data", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const source = fs.readFileSync(
    path.join(import.meta.dirname, "..", "lib/return-home/calculate.ts"),
    "utf8"
  );
  const code = source
    .split("\n")
    .filter((line) => !line.trim().startsWith("*") && !line.trim().startsWith("//"))
    .join("\n");

  for (const forbidden of ["affiliate", "commission", "provider", "payout"]) {
    assert.ok(
      !new RegExp(forbidden, "i").test(code),
      `the budget must not depend on "${forbidden}" — commercial economics cannot move an estimate`
    );
  }
});
