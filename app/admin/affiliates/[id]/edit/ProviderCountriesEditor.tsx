"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";
import FreshnessBadge from "@/components/admin/FreshnessBadge";

interface CountryRow {
  id: string;
  country_code: string;
  available: boolean;
  priority: number;
  availability_notes: string | null;
  verified_at: string | null;
  /** Nullable — absent means "destination availability, no corridor claim". See lib/affiliate/corridor.ts. */
  origin_country: string | null;
  /** The source page actually read to verify this row. See lib/affiliate/verificationGaps.ts. */
  evidence_url: string | null;
  evidence_tier: "TIER_1" | "TIER_2" | "TIER_3" | null;
}

const inputClass =
  "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-navy-500 text-sm";

/**
 * Per-country availability editor for one provider (spec §18).
 *
 * A country row is a statement that this provider is usable from that
 * country. `Verified` is a separate, deliberate act: it means a human
 * checked the provider's own published country list, not that we assumed
 * it from marketing copy. Unverified rows are surfaced to visitors with a
 * "confirm availability with provider" note, so the distinction is not
 * cosmetic.
 *
 * `origin_country` and evidence are a SEPARATE, narrower claim than
 * `available`/`verified_at`: "this provider serves this country" is not
 * the same fact as "this provider supports USA -> this country", and a
 * corridor claim is only as good as the evidence recorded for it. See
 * lib/affiliate/corridor.ts and docs/M-AFFILIATE-VERIFY1.md.
 */
export default function ProviderCountriesEditor({
  providerId,
  category,
}: {
  providerId: string;
  /** The provider's canonical_category — freshness windows are category-dependent. */
  category?: string | null;
}) {
  const [rows, setRows] = useState<CountryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCode, setNewCode] = useState("");
  const [newPriority, setNewPriority] = useState(0);

  const load = useCallback(async () => {
    const { data, error: loadError } = await createClient()
      .from("affiliate_provider_countries")
      .select(
        "id, country_code, available, priority, availability_notes, verified_at, origin_country, evidence_url, evidence_tier",
      )
      .eq("provider_id", providerId)
      .order("priority", { ascending: false });

    if (loadError) setError(loadError.message);
    setRows((data ?? []) as CountryRow[]);
    setLoading(false);
  }, [providerId]);

  useEffect(() => {
    load();
  }, [load]);

  async function add() {
    const code = newCode.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) {
      setError("Country code must be two letters, e.g. MX.");
      return;
    }
    setError(null);

    const { error: insertError } = await createClient()
      .from("affiliate_provider_countries")
      .insert({ provider_id: providerId, country_code: code, priority: newPriority, available: true });

    if (insertError) setError(insertError.message);
    setNewCode("");
    setNewPriority(0);
    load();
  }

  async function patch(id: string, patchData: Record<string, unknown>) {
    const { error: updateError } = await createClient()
      .from("affiliate_provider_countries")
      .update({ ...patchData, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (updateError) setError(updateError.message);
    load();
  }

  async function remove(id: string, code: string) {
    if (!window.confirm(`Remove ${code} from this provider's availability list?`)) return;
    const { error: deleteError } = await createClient()
      .from("affiliate_provider_countries")
      .delete()
      .eq("id", id);

    if (deleteError) setError(deleteError.message);
    load();
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-4">
      <div>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Country Availability</p>
        <p className="text-xs text-gray-500 mt-1">
          Higher priority wins inside a country. With no rows here, this provider is only shown when
          &ldquo;Available globally&rdquo; is ticked.
        </p>
      </div>

      {error && (
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[960px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="py-2 pr-3 font-semibold">Country</th>
                <th className="py-2 pr-3 font-semibold">Origin</th>
                <th className="py-2 pr-3 font-semibold">Priority</th>
                <th className="py-2 pr-3 font-semibold">Available</th>
                <th className="py-2 pr-3 font-semibold">Verified</th>
                <th className="py-2 pr-3 font-semibold">Freshness</th>
                <th className="py-2 pr-3 font-semibold">Evidence</th>
                <th className="py-2 pr-3 font-semibold">Notes</th>
                <th className="py-2 w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="py-2 pr-3 font-mono font-semibold text-navy-800">{row.country_code}</td>
                  <td className="py-2 pr-3">
                    <input
                      aria-label={`Corridor origin for ${row.country_code}`}
                      defaultValue={row.origin_country ?? ""}
                      maxLength={2}
                      placeholder="—"
                      onBlur={(e) => {
                        const v = e.target.value.trim().toUpperCase();
                        if (v && !/^[A-Z]{2}$/.test(v)) {
                          setError("Origin country must be two letters, e.g. US, or blank.");
                          return;
                        }
                        patch(row.id, { origin_country: v || null });
                      }}
                      className={inputClass + " w-16 uppercase font-mono"}
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {row.origin_country ? "Corridor claim" : "Destination only"}
                    </p>
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      aria-label={`Priority for ${row.country_code}`}
                      defaultValue={row.priority}
                      onBlur={(e) => patch(row.id, { priority: parseInt(e.target.value, 10) || 0 })}
                      className={inputClass + " w-20"}
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="checkbox"
                      aria-label={`Available in ${row.country_code}`}
                      checked={row.available}
                      onChange={(e) => patch(row.id, { available: e.target.checked })}
                      className="accent-navy-600"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <label className="flex items-center gap-1.5 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        aria-label={`Verified availability for ${row.country_code}`}
                        checked={Boolean(row.verified_at)}
                        onChange={(e) =>
                          patch(row.id, { verified_at: e.target.checked ? new Date().toISOString() : null })
                        }
                        className="accent-navy-600"
                      />
                      {row.verified_at ? new Date(row.verified_at).toLocaleDateString() : "No"}
                    </label>
                  </td>
                  <td className="py-2 pr-3">
                    <FreshnessBadge verifiedAt={row.verified_at} category={category ?? null} />
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-col gap-1">
                      <select
                        aria-label={`Evidence tier for ${row.country_code}`}
                        value={row.evidence_tier ?? ""}
                        onChange={(e) => patch(row.id, { evidence_tier: e.target.value || null })}
                        className={inputClass + " w-28"}
                      >
                        <option value="">No tier</option>
                        <option value="TIER_1">Tier 1</option>
                        <option value="TIER_2">Tier 2</option>
                        <option value="TIER_3">Tier 3</option>
                      </select>
                      <input
                        aria-label={`Evidence URL for ${row.country_code}`}
                        defaultValue={row.evidence_url ?? ""}
                        placeholder="Source URL"
                        onBlur={(e) => {
                          const v = e.target.value.trim();
                          if (v && !/^https?:\/\//i.test(v)) {
                            setError("Evidence URL must start with http:// or https://.");
                            return;
                          }
                          patch(row.id, { evidence_url: v || null });
                        }}
                        className={inputClass + " w-40"}
                      />
                    </div>
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      aria-label={`Notes for ${row.country_code}`}
                      defaultValue={row.availability_notes ?? ""}
                      onBlur={(e) => patch(row.id, { availability_notes: e.target.value || null })}
                      className={inputClass}
                    />
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => remove(row.id, row.country_code)}
                      aria-label={`Remove ${row.country_code}`}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={9} className="py-4 text-gray-500 text-sm">
                    No countries listed. This provider will only appear where &ldquo;Available
                    globally&rdquo; applies.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-end gap-3 pt-3 border-t border-gray-100">
        <div>
          <label htmlFor="new-country-code" className="block text-xs font-semibold text-gray-600 mb-1">
            Add country (ISO-2)
          </label>
          <input
            id="new-country-code"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value.toUpperCase())}
            maxLength={2}
            placeholder="MX"
            className={inputClass + " w-24 uppercase font-mono"}
          />
        </div>
        <div>
          <label htmlFor="new-country-priority" className="block text-xs font-semibold text-gray-600 mb-1">
            Priority
          </label>
          <input
            id="new-country-priority"
            type="number"
            value={newPriority}
            onChange={(e) => setNewPriority(parseInt(e.target.value, 10) || 0)}
            className={inputClass + " w-24"}
          />
        </div>
        <button
          type="button"
          onClick={add}
          className="bg-navy-800 hover:bg-navy-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}
