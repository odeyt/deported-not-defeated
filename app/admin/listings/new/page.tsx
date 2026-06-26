"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { CATEGORIES, CITIES } from "@/lib/utils";

export default function NewListingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    business_name: "",
    category: "",
    city: "",
    address: "",
    phone: "",
    whatsapp: "",
    facebook_url: "",
    website_url: "",
    google_maps_url: "",
    english_speaking: false,
    verified: false,
    featured: false,
    description: "",
    notes: "",
    is_affiliate: false,
    country_code: "LA",
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("directory_listings").insert(form);
    if (!error) router.push("/admin/listings");
    else { alert(error.message); setSaving(false); }
  }

  const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Add New Listing</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Business Name *</label>
            <input required value={form.business_name} onChange={e => update("business_name", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
            <select required value={form.category} onChange={e => update("category", e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">City *</label>
            <select required value={form.city} onChange={e => update("city", e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
            <input value={form.address} onChange={e => update("address", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
            <input value={form.phone} onChange={e => update("phone", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp</label>
            <input value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Facebook URL</label>
            <input value={form.facebook_url} onChange={e => update("facebook_url", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Website URL</label>
            <input value={form.website_url} onChange={e => update("website_url", e.target.value)} className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Google Maps URL</label>
            <input value={form.google_maps_url} onChange={e => update("google_maps_url", e.target.value)} className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => update("description", e.target.value)} className={inputClass + " resize-none"} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
            <textarea rows={2} value={form.notes} onChange={e => update("notes", e.target.value)} className={inputClass + " resize-none"} />
          </div>
          <div className="col-span-2 flex flex-wrap gap-6">
            {[
              ["english_speaking", "English Speaking"],
              ["verified", "Verified"],
              ["featured", "Featured"],
              ["is_affiliate", "Affiliate/Sponsor"],
            ].map(([field, label]) => (
              <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form[field as keyof typeof form] as boolean} onChange={e => update(field, e.target.checked)} className="accent-navy-600" />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            {saving ? "Saving..." : "Save Listing"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
