"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import type { AffiliateCategory } from "@/lib/types";
import { AFFILIATE_STATUSES, PLACEMENT_TYPES } from "@/lib/affiliate/types";
import { AFFILIATE_CATEGORIES, CATEGORY_LABELS } from "@/lib/affiliate/categories";
import { AFFILIATE_NETWORKS, NETWORK_ADAPTERS } from "@/lib/affiliate/networks";
import { isSafeAffiliateUrl } from "@/lib/affiliate/url";
import ProviderCountriesEditor from "./ProviderCountriesEditor";

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";

export default function EditAffiliatePartnerPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<AffiliateCategory[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("affiliate_partners").select("*").eq("id", id).single(),
      supabase.from("affiliate_categories").select("*").order("display_order"),
    ]).then(([{ data: partner }, { data: cats }]) => {
      if (partner) {
        setForm({
          ...partner,
          affiliate_url: partner.affiliate_url ?? "",
        });
      }
      setCategories(cats ?? []);
      setLoading(false);
    });
  }, [id]);

  function update(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /**
   * Guard rails on the two fields that actually move money.
   *
   * The database enforces the same URL rule and the /go router revalidates
   * before redirecting — this is the friendly layer, not the only one.
   */
  function validate(): string | null {
    if (form.affiliate_url && !isSafeAffiliateUrl(form.affiliate_url)) {
      return "Affiliate URL must be an absolute http(s) URL with no embedded credentials.";
    }
    if (form.official_website_url && form.official_website_url !== "#" && !isSafeAffiliateUrl(form.official_website_url)) {
      return "Official website URL must be an absolute http(s) URL.";
    }
    if (form.affiliate_status === "approved" && !form.affiliate_url) {
      return "A provider cannot be marked approved without a real tracking URL. Set the status back, or paste the URL the network issued you.";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const problem = validate();
    if (problem) {
      alert(problem);
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("affiliate_partners")
      .update({
        affiliate_status:  form.affiliate_status,
        affiliate_url:     form.affiliate_url || null,
        canonical_category: form.canonical_category || null,
        network:           form.network || null,
        placement_type:    form.placement_type || "editorial",
        global_priority:   Number(form.global_priority) || 0,
        trust_score:       form.trust_score === "" || form.trust_score == null ? null : Number(form.trust_score),
        available_globally: !!form.available_globally,
        disclosure_required: form.disclosure_required !== false,
        commission_type:   form.commission_type || null,
        commission_value:  form.commission_value === "" || form.commission_value == null ? null : Number(form.commission_value),
        commission_notes:  form.commission_notes || null,
        cookie_days:       form.cookie_days === "" || form.cookie_days == null ? null : Number(form.cookie_days),
        recurring:         !!form.recurring,
        terms_notes:       form.terms_notes || null,
        application_date:  form.application_date || null,
        approval_date:     form.approval_date || null,
        account_identifier: form.account_identifier || null,
        internal_notes:    form.internal_notes || null,
        official_website_url: form.official_website_url,
        cta_label:         form.cta_label,
        priority:          Number(form.priority),
        featured:          form.featured,
        active:            form.active,
        show_on_homepage:  form.show_on_homepage,
        notes:             form.notes,
        why_it_fits:       form.why_it_fits,
        short_description: form.short_description,
        full_description:  form.full_description,
        typical_potential: form.typical_potential,
        category_id:       form.category_id || null,
        updated_at:        new Date().toISOString(),
      })
      .eq("id", id);
    if (!error) {
      router.push("/admin/affiliates");
    } else {
      alert(error.message);
      setSaving(false);
    }
  }

  if (loading) return <div className="text-gray-500 p-8">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-navy-800">Edit: {form.company_name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        {/* Status + Affiliate URL — most important fields at top */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-4">
          <p className="text-xs font-bold text-yellow-800 uppercase tracking-wide">Affiliate Status & Link</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Affiliate Status</label>
              <select value={form.affiliate_status} onChange={(e) => update("affiliate_status", e.target.value)} className={inputClass}>
                {AFFILIATE_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
              <p className="text-[11px] text-gray-500 mt-1">
                Only <strong>approved</strong> plus an affiliate URL plus Active produces an affiliate link.
                Every other combination sends visitors to the provider&rsquo;s ordinary website.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Affiliate URL
                {form.affiliate_status !== "approved" && (
                  <span className="text-yellow-600 ml-1">(only active when status = approved)</span>
                )}
              </label>
              <input
                type="url"
                value={form.affiliate_url ?? ""}
                onChange={(e) => update("affiliate_url", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Canonical routing fields — what the engine actually selects on */}
        <div className="border border-gray-200 rounded-xl p-4 space-y-4">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Routing &amp; Ranking</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Canonical Category</label>
              <select value={form.canonical_category ?? ""} onChange={(e) => update("canonical_category", e.target.value)} className={inputClass}>
                <option value="">No category — excluded from recommendations</option>
                {AFFILIATE_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Affiliate Network</label>
              <select value={form.network ?? ""} onChange={(e) => update("network", e.target.value)} className={inputClass}>
                <option value="">Unknown</option>
                {AFFILIATE_NETWORKS.map((n) => <option key={n} value={n}>{NETWORK_ADAPTERS[n].label}</option>)}
              </select>
              {form.network && NETWORK_ADAPTERS[form.network as keyof typeof NETWORK_ADAPTERS] && (
                <p className="text-[11px] text-gray-500 mt-1">
                  {NETWORK_ADAPTERS[form.network as keyof typeof NETWORK_ADAPTERS].verificationNote}
                </p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Global Priority</label>
              <input type="number" value={form.global_priority ?? 0} onChange={(e) => update("global_priority", parseInt(e.target.value, 10) || 0)} className={inputClass} />
              <p className="text-[11px] text-gray-500 mt-1">Used when no country row applies.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Trust Score (0–100)</label>
              <input type="number" min={0} max={100} value={form.trust_score ?? ""} onChange={(e) => update("trust_score", e.target.value)} className={inputClass} placeholder="Leave blank if unscored" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Placement Type</label>
              <select value={form.placement_type ?? "editorial"} onChange={(e) => update("placement_type", e.target.value)} className={inputClass}>
                {PLACEMENT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={!!form.available_globally} onChange={(e) => update("available_globally", e.target.checked)} className="accent-navy-600 mt-0.5" />
            <span>
              Available globally
              <span className="block text-[11px] text-gray-500">
                Tick only if this provider genuinely serves visitors from countries with no row below.
                Leaving it off is the safe default — we do not assume worldwide coverage.
              </span>
            </span>
          </label>
        </div>

        <ProviderCountriesEditor providerId={id} />

        {/* Commercial terms — operator-only, never rendered publicly */}
        <div className="border border-gray-200 rounded-xl p-4 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Commercial Terms</p>
            <p className="text-[11px] text-gray-500 mt-1">
              Internal only — never shown on the site. Leave a field blank when the program does not
              publish the figure. An estimate here becomes a claim later.
            </p>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Commission Type</label>
              <select value={form.commission_type ?? ""} onChange={(e) => update("commission_type", e.target.value)} className={inputClass}>
                <option value="">Unknown</option>
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
                <option value="tiered">Tiered</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Commission Value</label>
              <input type="number" step="0.0001" value={form.commission_value ?? ""} onChange={(e) => update("commission_value", e.target.value)} className={inputClass} placeholder="Blank if undisclosed" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Cookie Days</label>
              <input type="number" value={form.cookie_days ?? ""} onChange={(e) => update("cookie_days", e.target.value)} className={inputClass} placeholder="Blank if unknown" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm cursor-pointer pb-2.5">
                <input type="checkbox" checked={!!form.recurring} onChange={(e) => update("recurring", e.target.checked)} className="accent-navy-600" />
                Recurring
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Commission Notes</label>
            <input value={form.commission_notes ?? ""} onChange={(e) => update("commission_notes", e.target.value)} className={inputClass} placeholder="Not publicly disclosed" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Program Terms Notes</label>
            <textarea rows={2} value={form.terms_notes ?? ""} onChange={(e) => update("terms_notes", e.target.value)} className={inputClass + " resize-none"} placeholder="Restrictions the program imposes — prohibited traffic sources, required disclosure wording, etc." />
          </div>
        </div>

        {/* Application tracking */}
        <div className="border border-gray-200 rounded-xl p-4 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Application Record</p>
            <p className="text-[11px] text-gray-500 mt-1">
              Never store passwords or API tokens here. Secrets belong in environment variables.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Application Date</label>
              <input type="date" value={form.application_date ?? ""} onChange={(e) => update("application_date", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Approval Date</label>
              <input type="date" value={form.approval_date ?? ""} onChange={(e) => update("approval_date", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Publisher / Account ID</label>
              <input value={form.account_identifier ?? ""} onChange={(e) => update("account_identifier", e.target.value)} className={inputClass} placeholder="Not a secret store" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Internal Notes</label>
            <textarea rows={2} value={form.internal_notes ?? ""} onChange={(e) => update("internal_notes", e.target.value)} className={inputClass + " resize-none"} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Legacy Category (existing resource pages)</label>
          <select value={form.category_id ?? ""} onChange={(e) => update("category_id", e.target.value)} className={inputClass}>
            <option value="">No category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Short Description</label>
          <input value={form.short_description ?? ""} onChange={(e) => update("short_description", e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Full Description</label>
          <textarea rows={4} value={form.full_description ?? ""} onChange={(e) => update("full_description", e.target.value)} className={inputClass + " resize-none"} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Why It Fits</label>
          <textarea rows={2} value={form.why_it_fits ?? ""} onChange={(e) => update("why_it_fits", e.target.value)} className={inputClass + " resize-none"} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Official Website URL</label>
            <input type="url" value={form.official_website_url ?? ""} onChange={(e) => update("official_website_url", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">CTA Label</label>
            <input value={form.cta_label ?? "Learn More"} onChange={(e) => update("cta_label", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
            <input type="number" value={form.priority ?? 0} onChange={(e) => update("priority", parseInt(e.target.value) || 0)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Typical Potential</label>
            <input value={form.typical_potential ?? ""} onChange={(e) => update("typical_potential", e.target.value)} className={inputClass} placeholder="High / Medium / Low" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Notes (internal)</label>
          <textarea rows={2} value={form.notes ?? ""} onChange={(e) => update("notes", e.target.value)} className={inputClass + " resize-none"} />
        </div>

        <div className="flex flex-wrap gap-5">
          {([
            ["featured",        "Featured"],
            ["active",          "Active"],
            ["show_on_homepage","Show on Homepage"],
            ["show_disclosure", "Show Disclosure"],
            ["disclosure_required", "Disclosure Required"],
          ] as const).map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={!!form[field]} onChange={(e) => update(field, e.target.checked)} className="accent-navy-600" />
              {label}
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <a href={`/resources/${form.slug}`} target="_blank" rel="noopener noreferrer" className="ml-auto px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            View Page ↗
          </a>
        </div>
      </form>
    </div>
  );
}
