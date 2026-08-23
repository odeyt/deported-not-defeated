"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { AffiliateCategory } from "@/lib/types";
import { AFFILIATE_STATUSES } from "@/lib/affiliate/types";
import { AFFILIATE_CATEGORIES, CATEGORY_LABELS } from "@/lib/affiliate/categories";
import { AFFILIATE_NETWORKS, NETWORK_ADAPTERS } from "@/lib/affiliate/networks";
import { isSafeAffiliateUrl } from "@/lib/affiliate/url";
const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";

export default function NewAffiliatePartnerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<AffiliateCategory[]>([]);
  const [form, setForm] = useState({
    company_name: "",
    slug: "",
    category_id: "",
    short_description: "",
    full_description: "",
    why_it_fits: "",
    typical_potential: "",
    official_website_url: "",
    affiliate_url: "",
    // A new provider has NOT been applied for. Anything else would overstate
    // the commercial position the moment the row is created.
    affiliate_status: "not_applied" as (typeof AFFILIATE_STATUSES)[number],
    canonical_category: "",
    network: "",
    global_priority: 0,
    available_globally: false,
    cta_label: "Learn More",
    country_focus: "Laos",
    priority: 0,
    featured: false,
    active: true,
    show_on_homepage: false,
    show_disclosure: true,
    notes: "",
  });

  useEffect(() => {
    createClient()
      .from("affiliate_categories")
      .select("*")
      .order("display_order")
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  function update(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    if (form.affiliate_url && !isSafeAffiliateUrl(form.affiliate_url)) {
      alert("Affiliate URL must be an absolute http(s) URL with no embedded credentials.");
      setSaving(false);
      return;
    }
    if (form.affiliate_status === "approved" && !form.affiliate_url) {
      alert("A provider cannot be created as approved without a real tracking URL.");
      setSaving(false);
      return;
    }

    // Empty strings would violate the canonical-category foreign key and would
    // store a meaningless "" network, so they become NULL.
    const payload = {
      ...form,
      affiliate_url: form.affiliate_url || null,
      category_id: form.category_id || null,
      canonical_category: form.canonical_category || null,
      network: form.network || null,
    };
    const { error } = await supabase.from("affiliate_partners").insert(payload);
    if (!error) {
      router.push("/admin/affiliates");
    } else {
      alert(error.message);
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-navy-800">Add Affiliate Partner</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name *</label>
            <input
              required value={form.company_name}
              onChange={(e) => { update("company_name", e.target.value); update("slug", slugify(e.target.value)); }}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Slug *</label>
            <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
          <select value={form.category_id} onChange={(e) => update("category_id", e.target.value)} className={inputClass}>
            <option value="">Select category...</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Short Description</label>
          <input value={form.short_description} onChange={(e) => update("short_description", e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Full Description</label>
          <textarea rows={4} value={form.full_description} onChange={(e) => update("full_description", e.target.value)} className={inputClass + " resize-none"} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Why It Fits</label>
          <textarea rows={2} value={form.why_it_fits} onChange={(e) => update("why_it_fits", e.target.value)} className={inputClass + " resize-none"} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Official Website URL</label>
            <input type="url" value={form.official_website_url} onChange={(e) => update("official_website_url", e.target.value)} className={inputClass} placeholder="https://" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Affiliate URL (leave blank until approved)</label>
            <input type="url" value={form.affiliate_url} onChange={(e) => update("affiliate_url", e.target.value)} className={inputClass} placeholder="https://" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
            <select value={form.affiliate_status} onChange={(e) => update("affiliate_status", e.target.value)} className={inputClass}>
              {AFFILIATE_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">CTA Label</label>
            <input value={form.cta_label} onChange={(e) => update("cta_label", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
            <input type="number" value={form.priority} onChange={(e) => update("priority", parseInt(e.target.value) || 0)} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Canonical Category</label>
            <select value={form.canonical_category} onChange={(e) => update("canonical_category", e.target.value)} className={inputClass}>
              <option value="">No category — excluded from recommendations</option>
              {AFFILIATE_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Affiliate Network</label>
            <select value={form.network} onChange={(e) => update("network", e.target.value)} className={inputClass}>
              <option value="">Unknown</option>
              {AFFILIATE_NETWORKS.map((n) => <option key={n} value={n}>{NETWORK_ADAPTERS[n].label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Global Priority</label>
            <input type="number" value={form.global_priority} onChange={(e) => update("global_priority", parseInt(e.target.value, 10) || 0)} className={inputClass} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm cursor-pointer pb-2.5">
              <input type="checkbox" checked={form.available_globally} onChange={(e) => update("available_globally", e.target.checked)} className="accent-navy-600" />
              Available globally
            </label>
          </div>
        </div>

        <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          Per-country availability is set on the edit screen once the provider has been created.
        </p>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Country Focus (legacy free text)</label>
          <input value={form.country_focus} onChange={(e) => update("country_focus", e.target.value)} className={inputClass} placeholder="Laos" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Typical Potential</label>
          <input value={form.typical_potential} onChange={(e) => update("typical_potential", e.target.value)} className={inputClass} placeholder="High / Medium / Low" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Notes (internal)</label>
          <textarea rows={2} value={form.notes} onChange={(e) => update("notes", e.target.value)} className={inputClass + " resize-none"} />
        </div>

        <div className="flex flex-wrap gap-5">
          {([
            ["featured",        "Featured"],
            ["active",          "Active"],
            ["show_on_homepage","Show on Homepage"],
            ["show_disclosure", "Show Disclosure"],
          ] as const).map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form[field] as boolean} onChange={(e) => update(field, e.target.checked)} className="accent-navy-600" />
              {label}
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            {saving ? "Saving..." : "Save Partner"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
