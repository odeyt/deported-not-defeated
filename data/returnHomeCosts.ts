// ============================================================
// Return-Home Cost Model (M-AFFILIATE2)
//
// Structured cost data for the Return-Home Cost Calculator. Every band below
// is traceable to a source recorded on the entry itself. Nothing here is
// invented, and nothing is presented as authoritative pricing.
//
// PROVENANCE RULE
//   A band may only exist here if `sourceType` and `sourceReference` can be
//   filled in honestly. A category we cannot source is represented with
//   `estimated: false` and shown to the reader as "not estimated" rather than
//   given a number that looks researched but is not.
//
// COMMERCIAL INDEPENDENCE (spec §22)
//   This file contains no affiliate data and no commission information, and
//   the calculator never consults either. A budget estimate must never move
//   because a provider pays more.
// ============================================================

export type CostCategoryCode =
  | "HOUSING"
  | "FOOD"
  | "TRANSPORT"
  | "PHONE"
  | "MISC"
  | "DOCUMENTS"
  | "EMERGENCY_RESERVE";

/** How much confidence a figure carries. Mirrors the provider model's intent. */
export type CostSourceType =
  | "EDITORIAL_RESEARCH" // researched by us, not confirmed against an official source
  | "OFFICIAL_SOURCE" // published by a government or authority
  | "PROVIDER_VERIFIED"; // confirmed with the provider

export interface CostBand {
  /** Monthly cost for one person, in the country's native currency. */
  low: number;
  typical: number;
  high: number;
}

export interface CostCategory {
  code: CostCategoryCode;
  label: string;
  /** False when we cannot source a number. Rendered as "not estimated". */
  estimated: boolean;
  band?: CostBand;
  /** Scales with the number of people (food, transport, phone) or not (housing). */
  perPerson: boolean;
  note?: string;
  sourceType?: CostSourceType;
  sourceReference?: string;
  lastVerified?: string;
}

export interface CountryCostModel {
  countryCode: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
  /** The place the figures describe. Stated plainly — costs vary within a country. */
  basedOn: string;
  categories: CostCategory[];
  /**
   * Fraction of the subtotal suggested as a reserve. This is a rule of thumb,
   * not sourced data, and is labelled as such in the UI.
   */
  emergencyReserveRate: number;
  lastReviewed: string;
}

// ------------------------------------------------------------------
// Approximate currency conversion
//
// Deliberately a constant, not a live rate: a fake "live" rate would be worse
// than an honest static one. It is isolated behind a function so a real FX
// provider can replace it without touching the calculator.
// ------------------------------------------------------------------

/**
 * Implied by the source page, which pairs "$400–700/month" with
 * "7,000–12,000 MXN". Approximate, and labelled as approximate wherever a
 * converted figure is shown.
 */
const APPROXIMATE_MXN_PER_USD = 17.5;
export const FX_NOTE = "Approximate exchange rate, recorded 2026-08-24. Not a live rate.";

export function convertToUsd(amountMxn: number): number {
  return amountMxn / APPROXIMATE_MXN_PER_USD;
}

// ------------------------------------------------------------------
// Mexico
//
// Bands converted from the USD figures published on
// /mexico/cost-of-living-mexico-city at the approximate rate above.
// low     = Survival Budget
// typical = Stable Budget
// high    = Comfortable Budget
// ------------------------------------------------------------------

const SOURCE_PAGE = "/mexico/cost-of-living-mexico-city";
const REVIEWED = "2026-08-24";

export const MEXICO_COST_MODEL: CountryCostModel = {
  countryCode: "MX",
  countryName: "Mexico",
  currency: "MXN",
  currencySymbol: "$",
  basedOn: "Mexico City",
  lastReviewed: REVIEWED,
  emergencyReserveRate: 0.25,
  categories: [
    {
      code: "HOUSING",
      label: "Temporary housing",
      estimated: true,
      perPerson: false,
      // $110 / $220 / $440 per month
      band: { low: 1925, typical: 3850, high: 7700 },
      note: "A rented room (cuarto de renta) through a private room with WiFi.",
      sourceType: "EDITORIAL_RESEARCH",
      sourceReference: SOURCE_PAGE,
      lastVerified: REVIEWED,
    },
    {
      code: "FOOD",
      label: "Food",
      estimated: true,
      perPerson: true,
      // $100 / $160 / $250 per month
      band: { low: 1750, typical: 2800, high: 4375 },
      note: "Market and street food at the low end; some restaurants at the high end.",
      sourceType: "EDITORIAL_RESEARCH",
      sourceReference: SOURCE_PAGE,
      lastVerified: REVIEWED,
    },
    {
      code: "TRANSPORT",
      label: "Local transport",
      estimated: true,
      perPerson: true,
      // $15 / $30 / $70 per month
      band: { low: 263, typical: 525, high: 1225 },
      note: "Metro and bus at the low end; occasional Uber or DiDi at the high end.",
      sourceType: "EDITORIAL_RESEARCH",
      sourceReference: SOURCE_PAGE,
      lastVerified: REVIEWED,
    },
    {
      code: "PHONE",
      label: "Phone and data",
      estimated: true,
      perPerson: true,
      // $6 / $12 / $20 per month
      band: { low: 105, typical: 210, high: 350 },
      note: "Prepaid (Telcel Amigo) through a monthly plan.",
      sourceType: "EDITORIAL_RESEARCH",
      sourceReference: SOURCE_PAGE,
      lastVerified: REVIEWED,
    },
    {
      code: "MISC",
      label: "Clothing and personal items",
      estimated: true,
      perPerson: true,
      // $30 / $60 / $100 per month
      band: { low: 525, typical: 1050, high: 1750 },
      sourceType: "EDITORIAL_RESEARCH",
      sourceReference: SOURCE_PAGE,
      lastVerified: REVIEWED,
    },
    {
      code: "DOCUMENTS",
      label: "Documents and paperwork",
      // We have no sourced figures for CURP, INE, birth certificate copies, or
      // consular documents, and fees vary by state and document. Showing a
      // researched-looking number here would be a fabrication.
      estimated: false,
      perPerson: true,
      note:
        "Not estimated. Fees vary by document and state. Budget separately — see the Mexico documents guidance.",
    },
  ],
};

export const COUNTRY_COST_MODELS: Record<string, CountryCostModel> = {
  MX: MEXICO_COST_MODEL,
};

export function getCostModel(countryCode: string): CountryCostModel | null {
  return COUNTRY_COST_MODELS[countryCode.toUpperCase()] ?? null;
}

/** Country codes the calculator currently supports. Mexico is the pilot. */
export const SUPPORTED_COST_COUNTRIES = Object.keys(COUNTRY_COST_MODELS);
