"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AFFILIATE_CATEGORIES } from "@/lib/utils";

export default function NewAffiliatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", category: "", description: "", url: "",
    country: "", active: true, featured: false, disclosure_text: "",
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("affiliate_links").insert(form);
    if (!error) router.push("/admin/affiliates");
    else { alert(error.message); setSaving(false); }
  }

  const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Add Affiliate Link</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
          <input required value={form.title} onChange={e => update("title", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
          <select required value={form.category} onChange={e => update("category", e.target.value)} className={inputClass}>
            <option value="">Select...</option>
            {AFFILIATE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
          <textarea rows={3} value={form.description} onChange={e => update("description", e.target.value)} className={inputClass + " resize-none"} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">URL *</label>
          <input required type="url" value={form.url} onChange={e => update("url", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
          <input value={form.country} onChange={e => update("country", e.target.value)} className={inputClass} placeholder="e.g. Laos, Global" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Disclosure Text</label>
          <input value={form.disclosure_text} onChange={e => update("disclosure_text", e.target.value)} className={inputClass} />
        </div>
        <div className="flex gap-6">
          {[["active", "Active"], ["featured", "Featured"]].map(([field, label]) => (
            <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form[field as keyof typeof form] as boolean} onChange={e => update(field, e.target.checked)} className="accent-navy-600" />
              {label}
            </label>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            {saving ? "Saving..." : "Save Link"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
