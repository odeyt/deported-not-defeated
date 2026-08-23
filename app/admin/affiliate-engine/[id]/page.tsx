"use client";

// ============================================================
// M-AFFILIATE-1 — Provider manager
//
// Writes go through the authenticated Supabase client. RLS on
// affiliate_providers and affiliate_provider_countries permits writes only for
// authenticated users, and the admin layout already redirects anonymous
// visitors to /admin/login.
//
// GUARDRAIL: the form refuses to save APPROVED without a valid https affiliate
// URL, so a provider cannot be flipped into monetization by accident.
// ============================================================

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isSafeAffiliateUrl } from "@/lib/affiliate-engine/url";
import {
  AFFILIATE_CATEGORIES,
  AFFILIATE_NETWORKS,
  AFFILIATE_STATUSES,
} from "@/lib/affiliate-engine/types";

const inputClass =
  "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";
const labelClass = "block text-xs font-semibold text-gray-600 mb-1";

interface CountryRow {
  id?: string;
  provider_id: string;
  country_code: string;
  available: boolean;
  priority: number;
  availability_notes: string | null;
  verified_at: string | null;
}

export default function ManageProviderPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [newCountry, setNewCountry] = useState({ code: "", priority: "0", notes: "" });

  const load = useCallback(async () => {
    const supabase = createClient();
    const [{ data: provider, error: providerError }, { data: countryRows }] = await Promise.all([
      supabase.from("affiliate_providers").select("*").eq("id", id).single(),
      supabase
        .from("affiliate_provider_countries")
        .select("*")
        .eq("provider_id", id)
        .order("priority", { ascending: false }),
    ]);

    if (providerError) setError(providerError.message);
    if (provider) {
      setForm({
        ...provider,
        affiliate_url: provider.affiliate_url ?? "",
        website_url: provider.website_url ?? "",
        description: provider.description ?? "",
        sub_id_param: provider.sub_id_param ?? "",
        commission_notes: provider.commission_notes ?? "",
        commission_value: provider.commission_value ?? "",
        commission_type: provider.commission_type ?? "",
        cookie_days: provider.cookie_days ?? "",
        account_identifier: provider.account_identifier ?? "",
        applied_at: provider.applied_at ?? "",
        approved_at: provider.approved_at ?? "",
        internal_notes: provider.internal_notes ?? "",
        terms_notes: provider.terms_notes ?? "",
      });
    }
    setCountries((countryRows ?? []) as CountryRow[]);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  function update(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setNotice(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const affiliateUrl = String(form.affiliate_url ?? "").trim();

    // Monetization guardrail.
    if (form.affiliate_status === "APPROVED" && !affiliateUrl) {
      setError(
        "Cannot save APPROVED without an affiliate URL. Paste the real tracking URL from the network first."
      );
      return;
    }
    if (affiliateUrl && !isSafeAffiliateUrl(affiliateUrl)) {
      setError("Affiliate URL must be a valid public https:// URL.");
      return;
    }
    const websiteUrl = String(form.website_url ?? "").trim();
    if (websiteUrl && !isSafeAffiliateUrl(websiteUrl)) {
      setError("Website URL must be a valid public https:// URL.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("affiliate_providers")
      .update({
        name: form.name,
        category: form.category,
        network: form.network,
        description: form.description || null,
        website_url: websiteUrl || null,
        affiliate_url: affiliateUrl || null,
        affiliate_status: form.affiliate_status,
        commission_type: form.commission_type || null,
        commission_value: form.commission_value === "" ? null : Number(form.commission_value),
        commission_notes: form.commission_notes || null,
        cookie_days: form.cookie_days === "" ? null : Number(form.cookie_days),
        recurring: Boolean(form.recurring),
        featured: Boolean(form.featured),
        trust_score: Number(form.trust_score),
        global_priority: Number(form.global_priority),
        active: Boolean(form.active),
        disclosure_required: Boolean(form.disclosure_required),
        sub_id_param: form.sub_id_param || null,
        terms_notes: form.terms_notes || null,
        account_identifier: form.account_identifier || null,
        applied_at: form.applied_at || null,
        approved_at: form.approved_at || null,
        internal_notes: form.internal_notes || null,
      })
      .eq("id", id);

    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setNotice("Saved.");
  }

  async function addCountry() {
    const code = newCountry.code.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) {
      setError("Country code must be two letters (ISO-3166-1 alpha-2), e.g. GT.");
      return;
    }
    setError(null);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("affiliate_provider_countries").insert({
      provider_id: id,
      country_code: code,
      available: true,
      priority: Number(newCountry.priority) || 0,
      availability_notes: newCountry.notes || null,
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNewCountry({ code: "", priority: "0", notes: "" });
    load();
  }

  async function toggleCountry(row: CountryRow) {
    const supabase = createClient();
    await supabase
      .from("affiliate_provider_countries")
      .update({ available: !row.available })
      .eq("provider_id", row.provider_id)
      .eq("country_code", row.country_code);
    load();
  }

  async function removeCountry(row: CountryRow) {
    const supabase = createClient();
    await supabase
      .from("affiliate_provider_countries")
      .delete()
      .eq("provider_id", row.provider_id)
      .eq("country_code", row.country_code);
    load();
  }

  if (loading) return <div className="text-gray-500 p-8">Loading…</div>;

  const isMonetizing = form.affiliate_status === "APPROVED" && form.affiliate_url && form.active;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-navy-800">{form.name}</h1>
        <span className="text-gray-400 text-sm">/go/{form.slug}</span>
        <Link
          href="/admin/affiliate-engine"
          className="ml-auto text-sm text-gray-500 hover:text-navy-800"
        >
          All providers
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm mb-4">
          {error}
        </div>
      )}
      {notice && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm mb-4">
          {notice}
        </div>
      )}

      <div
        className={`rounded-xl p-4 text-sm mb-6 border ${
          isMonetizing
            ? "bg-amber-50 border-amber-200 text-amber-900"
            : "bg-gray-50 border-gray-200 text-gray-600"
        }`}
      >
        {isMonetizing
          ? "This provider is monetizing: visitors are sent to the affiliate URL."
          : "This provider is not monetizing. Visitors are sent to the ordinary website URL."}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {/* Monetization block */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-4">
          <p className="text-xs font-bold text-yellow-800 uppercase tracking-wide">
            Approval &amp; Affiliate Link
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="affiliate_status">Approval status</label>
              <select
                id="affiliate_status"
                value={form.affiliate_status}
                onChange={(e) => update("affiliate_status", e.target.value)}
                className={inputClass}
              >
                {AFFILIATE_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="network">Network</label>
              <select
                id="network"
                value={form.network}
                onChange={(e) => update("network", e.target.value)}
                className={inputClass}
              >
                {AFFILIATE_NETWORKS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="affiliate_url">
              Affiliate URL (real tracking URL from the network — never invent one)
            </label>
            <input
              id="affiliate_url"
              value={form.affiliate_url}
              onChange={(e) => update("affiliate_url", e.target.value)}
              className={inputClass}
              placeholder="https://…"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sub_id_param">
              Sub-ID parameter name (leave blank unless the network documents one)
            </label>
            <input
              id="sub_id_param"
              value={form.sub_id_param}
              onChange={(e) => update("sub_id_param", e.target.value)}
              className={inputClass}
              placeholder="e.g. sub_id"
            />
          </div>
        </div>

        {/* Core fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="name">Name</label>
            <input id="name" value={form.name ?? ""} onChange={(e) => update("name", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="category">Category</label>
            <select id="category" value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
              {AFFILIATE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="website_url">Ordinary website URL (non-monetized fallback)</label>
          <input id="website_url" value={form.website_url} onChange={(e) => update("website_url", e.target.value)} className={inputClass} placeholder="https://…" />
        </div>

        <div>
          <label className={labelClass} htmlFor="description">Description shown to visitors</label>
          <textarea id="description" value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputClass} min-h-20`} />
        </div>

        {/* Ranking */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass} htmlFor="global_priority">Global priority</label>
            <input id="global_priority" type="number" value={form.global_priority ?? 0} onChange={(e) => update("global_priority", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="trust_score">Trust score (0–100)</label>
            <input id="trust_score" type="number" min={0} max={100} value={form.trust_score ?? 50} onChange={(e) => update("trust_score", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="cookie_days">Cookie days (blank if unknown)</label>
            <input id="cookie_days" type="number" value={form.cookie_days} onChange={(e) => update("cookie_days", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Commercial terms */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass} htmlFor="commission_type">Commission type</label>
            <select id="commission_type" value={form.commission_type} onChange={(e) => update("commission_type", e.target.value)} className={inputClass}>
              <option value="">Unknown</option>
              {["CPA", "REVSHARE", "HYBRID", "CPL", "UNKNOWN"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="commission_value">Commission value</label>
            <input id="commission_value" type="number" step="0.01" value={form.commission_value} onChange={(e) => update("commission_value", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="commission_notes">Commission notes</label>
            <input id="commission_notes" value={form.commission_notes} onChange={(e) => update("commission_notes", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-5">
          {[
            ["active", "Active (visible on site)"],
            ["featured", "Featured"],
            ["recurring", "Recurring commission"],
            ["disclosure_required", "Disclosure required"],
          ].map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(form[field])}
                onChange={(e) => update(field, e.target.checked)}
                className="w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>

        {/* Application tracker */}
        <div className="border-t border-gray-100 pt-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Application tracker (never store passwords or API secrets here)
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} htmlFor="account_identifier">Publisher / account ID</label>
              <input id="account_identifier" value={form.account_identifier} onChange={(e) => update("account_identifier", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="applied_at">Applied on</label>
              <input id="applied_at" type="date" value={form.applied_at} onChange={(e) => update("applied_at", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="approved_at">Approved on</label>
              <input id="approved_at" type="date" value={form.approved_at} onChange={(e) => update("approved_at", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="internal_notes">Internal notes (not public)</label>
            <textarea id="internal_notes" value={form.internal_notes} onChange={(e) => update("internal_notes", e.target.value)} className={`${inputClass} min-h-20`} />
          </div>
          <div className="mt-4">
            <label className={labelClass} htmlFor="terms_notes">Program terms notes</label>
            <textarea id="terms_notes" value={form.terms_notes} onChange={(e) => update("terms_notes", e.target.value)} className={`${inputClass} min-h-20`} />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          {saving ? "Saving…" : "Save provider"}
        </button>
      </form>

      {/* Country availability */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6">
        <h2 className="font-bold text-navy-800 mb-1">Country availability</h2>
        <p className="text-xs text-gray-500 mb-4">
          A provider is shown on a country page only when it has an available row for that country.
          No row means unknown — the engine never assumes a provider works everywhere.
        </p>

        {countries.length === 0 ? (
          <p className="text-sm text-gray-500 mb-4">
            No countries configured. This provider will not appear in any country-scoped
            recommendation.
          </p>
        ) : (
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">Country</th>
                  <th className="text-left px-3 py-2 font-semibold">Priority</th>
                  <th className="text-left px-3 py-2 font-semibold">Available</th>
                  <th className="text-left px-3 py-2 font-semibold">Notes</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {countries.map((row) => (
                  <tr key={row.country_code} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-semibold text-navy-800">{row.country_code}</td>
                    <td className="px-3 py-2 text-gray-600">{row.priority}</td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => toggleCountry(row)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                          row.available
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {row.available ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-gray-500 text-xs max-w-xs truncate">
                      {row.availability_notes ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeCountry(row)}
                        className="text-red-600 text-xs font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className={labelClass} htmlFor="new_country_code">Country code</label>
            <input
              id="new_country_code"
              value={newCountry.code}
              onChange={(e) => setNewCountry((p) => ({ ...p, code: e.target.value }))}
              className={inputClass}
              placeholder="GT"
              maxLength={2}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="new_country_priority">Priority</label>
            <input
              id="new_country_priority"
              type="number"
              value={newCountry.priority}
              onChange={(e) => setNewCountry((p) => ({ ...p, priority: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="new_country_notes">Notes</label>
            <input
              id="new_country_notes"
              value={newCountry.notes}
              onChange={(e) => setNewCountry((p) => ({ ...p, notes: e.target.value }))}
              className={inputClass}
              placeholder="Source of this availability claim"
            />
          </div>
          <button
            type="button"
            onClick={addCountry}
            className="bg-navy-800 hover:bg-navy-900 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            Add country
          </button>
        </div>
      </div>
    </div>
  );
}
