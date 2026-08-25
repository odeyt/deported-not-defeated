// ============================================================
// Return-Home Cost Calculator — deterministic engine (M-AFFILIATE2)
//
// Pure and dependency-free: same inputs, same output, every time. No model,
// no randomness, no network. That is what makes the estimate explainable to
// someone deciding whether they can afford to eat next month.
//
// COMMERCIAL INDEPENDENCE (spec §22)
//   Nothing in this file reads affiliate status, commission, or provider data.
//   The budget cannot move because a provider pays more. Which resources are
//   *offered afterwards* is a separate decision made by the page.
// ============================================================

import type { CostCategoryCode, CountryCostModel } from "@/data/returnHomeCosts";

export type HousingChoice = "staying_with_family" | "rented_room" | "own_place";
export type TransportChoice = "minimal" | "regular";
export type SpendLevel = "low" | "typical" | "high";

export interface CalculatorInput {
  people: number;
  weeks: number;
  housing: HousingChoice;
  /** Each person has their own room rather than sharing one. */
  separateRooms: boolean;
  transport: TransportChoice;
  needsPhone: boolean;
  includeEmergencyReserve: boolean;
  /**
   * Whether family in the United States may send money.
   *
   * A stated NEED, not a cost input: it never touches the estimate. It exists
   * only so the page can decide whether a money-transfer resource block is
   * relevant to this reader. See the commercial-independence test.
   */
  familyMaySendMoney: boolean;
}

export interface LineItem {
  code: CostCategoryCode;
  label: string;
  estimated: boolean;
  low: number;
  typical: number;
  high: number;
  note?: string;
  /** How this line was derived, shown to the reader (spec §20). */
  basis: string;
}

export interface CalculatorResult {
  currency: string;
  weeks: number;
  months: number;
  lines: LineItem[];
  totals: { low: number; typical: number; high: number };
  /** Categories we deliberately did not estimate. */
  notEstimated: LineItem[];
}

export const INPUT_LIMITS = {
  people: { min: 1, max: 8 },
  weeks: { min: 1, max: 26 },
} as const;

export const DEFAULT_INPUT: CalculatorInput = {
  people: 1,
  weeks: 4,
  housing: "rented_room",
  separateRooms: false,
  transport: "regular",
  needsPhone: true,
  includeEmergencyReserve: true,
  familyMaySendMoney: false,
};

/** Average weeks per month. Used so "4 weeks" is not silently treated as a month. */
const WEEKS_PER_MONTH = 4.345;

/**
 * Coerce anything — query strings, form values, tampered URLs — into a valid
 * input. The client is not trusted (spec §38): out-of-range values are clamped,
 * unknown enum values fall back to the default, and NaN never survives.
 */
export function sanitizeInput(raw: Partial<Record<keyof CalculatorInput, unknown>>): CalculatorInput {
  const toInt = (value: unknown, fallback: number, min: number, max: number): number => {
    const parsed = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, Math.trunc(parsed)));
  };

  const toEnum = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
    allowed.includes(value as T) ? (value as T) : fallback;

  const toBool = (value: unknown, fallback: boolean): boolean => {
    if (typeof value === "boolean") return value;
    if (value === "true" || value === "1") return true;
    if (value === "false" || value === "0") return false;
    return fallback;
  };

  return {
    people: toInt(raw.people, DEFAULT_INPUT.people, INPUT_LIMITS.people.min, INPUT_LIMITS.people.max),
    weeks: toInt(raw.weeks, DEFAULT_INPUT.weeks, INPUT_LIMITS.weeks.min, INPUT_LIMITS.weeks.max),
    housing: toEnum(
      raw.housing,
      ["staying_with_family", "rented_room", "own_place"] as const,
      DEFAULT_INPUT.housing
    ),
    separateRooms: toBool(raw.separateRooms, DEFAULT_INPUT.separateRooms),
    transport: toEnum(raw.transport, ["minimal", "regular"] as const, DEFAULT_INPUT.transport),
    needsPhone: toBool(raw.needsPhone, DEFAULT_INPUT.needsPhone),
    includeEmergencyReserve: toBool(
      raw.includeEmergencyReserve,
      DEFAULT_INPUT.includeEmergencyReserve
    ),
    familyMaySendMoney: toBool(raw.familyMaySendMoney, DEFAULT_INPUT.familyMaySendMoney),
  };
}

/** Round to the nearest 50 so the output never implies false precision. */
function round(amount: number): number {
  return Math.round(amount / 50) * 50;
}

export function calculate(model: CountryCostModel, rawInput: CalculatorInput): CalculatorResult {
  const input = sanitizeInput(rawInput);
  const months = input.weeks / WEEKS_PER_MONTH;

  const lines: LineItem[] = [];
  const notEstimated: LineItem[] = [];

  for (const category of model.categories) {
    if (!category.estimated || !category.band) {
      notEstimated.push({
        code: category.code,
        label: category.label,
        estimated: false,
        low: 0,
        typical: 0,
        high: 0,
        note: category.note,
        basis: "Not estimated — no sourced figure.",
      });
      continue;
    }

    // How many shares of this category the household needs.
    let units = category.perPerson ? input.people : 1;
    let basis = category.perPerson
      ? `${input.people} person${input.people === 1 ? "" : "s"} × ${input.weeks} weeks`
      : `${input.weeks} weeks`;

    if (category.code === "HOUSING") {
      if (input.housing === "staying_with_family") {
        continue; // No housing cost at all — do not show a zero line.
      }
      units = input.separateRooms ? input.people : 1;
      basis = input.separateRooms
        ? `${input.people} separate room${input.people === 1 ? "" : "s"} × ${input.weeks} weeks`
        : `shared housing × ${input.weeks} weeks`;
    }

    if (category.code === "PHONE" && !input.needsPhone) continue;

    const band = category.band;

    // Transport and housing respond to explicit user choices rather than to
    // any hidden coefficient.
    const useLowEnd = category.code === "TRANSPORT" && input.transport === "minimal";
    const useHighEnd = category.code === "HOUSING" && input.housing === "own_place";

    const low = useHighEnd ? band.typical : band.low;
    const typical = useHighEnd ? band.high : useLowEnd ? band.low : band.typical;
    const high = useHighEnd ? band.high * 1.3 : useLowEnd ? band.typical : band.high;

    lines.push({
      code: category.code,
      label: category.label,
      estimated: true,
      low: round(low * units * months),
      typical: round(typical * units * months),
      high: round(high * units * months),
      note: category.note,
      basis,
    });
  }

  const subtotal = lines.reduce(
    (sum, line) => ({
      low: sum.low + line.low,
      typical: sum.typical + line.typical,
      high: sum.high + line.high,
    }),
    { low: 0, typical: 0, high: 0 }
  );

  if (input.includeEmergencyReserve) {
    const rate = model.emergencyReserveRate;
    lines.push({
      code: "EMERGENCY_RESERVE",
      label: "Emergency reserve",
      estimated: true,
      low: round(subtotal.low * rate),
      typical: round(subtotal.typical * rate),
      high: round(subtotal.high * rate),
      note: "A cushion for the unexpected. A rule of thumb, not a researched figure.",
      basis: `${Math.round(rate * 100)}% of the subtotal`,
    });
  }

  const totals = lines.reduce(
    (sum, line) => ({
      low: sum.low + line.low,
      typical: sum.typical + line.typical,
      high: sum.high + line.high,
    }),
    { low: 0, typical: 0, high: 0 }
  );

  return {
    currency: model.currency,
    weeks: input.weeks,
    months,
    lines,
    totals,
    notEstimated,
  };
}

/** Encode inputs for a shareable URL. Selections only — never anything personal. */
export function toQueryString(input: CalculatorInput): string {
  const params = new URLSearchParams({
    people: String(input.people),
    weeks: String(input.weeks),
    housing: input.housing,
    rooms: input.separateRooms ? "1" : "0",
    transport: input.transport,
    phone: input.needsPhone ? "1" : "0",
    reserve: input.includeEmergencyReserve ? "1" : "0",
    sending: input.familyMaySendMoney ? "1" : "0",
  });
  return params.toString();
}

/** Decode a shareable URL back into validated inputs. */
export function fromQueryParams(
  params: Record<string, string | string[] | undefined>
): CalculatorInput {
  const first = (value: string | string[] | undefined): string | undefined =>
    Array.isArray(value) ? value[0] : value;

  return sanitizeInput({
    people: first(params.people),
    weeks: first(params.weeks),
    housing: first(params.housing),
    separateRooms: first(params.rooms),
    transport: first(params.transport),
    needsPhone: first(params.phone),
    includeEmergencyReserve: first(params.reserve),
    familyMaySendMoney: first(params.sending),
  });
}
