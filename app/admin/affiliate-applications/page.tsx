"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { AffiliateApplication } from "@/lib/types";

const STATUS_OPTIONS = ["not_applied", "applied", "approved", "rejected", "needs_follow_up"] as const;
const STATUS_COLORS: Record<string, string> = {
  not_applied:     "bg-gray-100 text-gray-600",
  applied:         "bg-blue-100 text-blue-700",
  approved:        "bg-green-100 text-green-700",
  rejected:        "bg-red-100 text-red-700",
  needs_follow_up: "bg-yellow-100 text-yellow-700",
};

const inputClass = "w-full px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-navy-500 text-sm";

export default function AffiliateApplicationsPage() {
  const [apps, setApps] = useState<AffiliateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AffiliateApplication>>({});

  async function load() {
    const { data } = await createClient()
      .from("affiliate_applications")
      .select("*, affiliate_partners(company_name, slug)")
      .order("created_at", { ascending: false });
    setApps((data ?? []) as AffiliateApplication[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(app: AffiliateApplication) {
    setEditing(app.id);
    setEditData({ ...app });
  }

  async function saveEdit(id: string) {
    const supabase = createClient();
    await supabase.from("affiliate_applications").update({
      status:           editData.status,
      application_url:  editData.application_url,
      login_url:        editData.login_url,
      username_used:    editData.username_used,
      commission_notes: editData.commission_notes,
      approval_notes:   editData.approval_notes,
      date_applied:     editData.date_applied || null,
      date_approved:    editData.date_approved || null,
      follow_up_date:   editData.follow_up_date || null,
      updated_at:       new Date().toISOString(),
    }).eq("id", id);
    setEditing(null);
    load();
  }

  function u(field: string, value: string) {
    setEditData((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) return <div className="text-gray-500 p-4">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Affiliate Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Track the status of each affiliate application</p>
        </div>
        <Link href="/admin/affiliates" className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
          ← Partners
        </Link>
      </div>

      <div className="space-y-4">
        {apps.map((app) => {
          const isEditing = editing === app.id;
          const partner = (app as any).affiliate_partners;
          return (
            <div key={app.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                <div>
                  <span className="font-bold text-navy-800">
                    {partner?.company_name ?? app.company_name ?? "Unknown"}
                  </span>
                  {partner?.slug && (
                    <Link href={`/resources/${partner.slug}`} target="_blank" className="text-gray-400 text-xs ml-2 hover:text-brand-red">↗</Link>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[app.status] ?? ""}`}>
                    {app.status.replace(/_/g, " ")}
                  </span>
                  {!isEditing ? (
                    <button onClick={() => startEdit(app)} className="text-brand-red text-xs font-medium hover:underline">Edit</button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(app.id)} className="text-green-700 text-xs font-bold hover:underline">Save</button>
                      <button onClick={() => setEditing(null)} className="text-gray-400 text-xs hover:underline">Cancel</button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                    <select value={editData.status} onChange={(e) => u("status", e.target.value)} className={inputClass}>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Application URL</label>
                    <input type="url" value={editData.application_url ?? ""} onChange={(e) => u("application_url", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Login URL</label>
                    <input type="url" value={editData.login_url ?? ""} onChange={(e) => u("login_url", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Username Used</label>
                    <input value={editData.username_used ?? ""} onChange={(e) => u("username_used", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Date Applied</label>
                    <input type="date" value={editData.date_applied ?? ""} onChange={(e) => u("date_applied", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Date Approved</label>
                    <input type="date" value={editData.date_approved ?? ""} onChange={(e) => u("date_approved", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Follow Up Date</label>
                    <input type="date" value={editData.follow_up_date ?? ""} onChange={(e) => u("follow_up_date", e.target.value)} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Commission Notes</label>
                    <textarea rows={2} value={editData.commission_notes ?? ""} onChange={(e) => u("commission_notes", e.target.value)} className={inputClass + " resize-none"} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Approval Notes</label>
                    <textarea rows={2} value={editData.approval_notes ?? ""} onChange={(e) => u("approval_notes", e.target.value)} className={inputClass + " resize-none"} />
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-3 gap-3 text-sm mt-2">
                  {[
                    ["Application URL", app.application_url],
                    ["Date Applied",    app.date_applied],
                    ["Follow Up",       app.follow_up_date],
                    ["Date Approved",   app.date_approved],
                    ["Commission Notes", app.commission_notes],
                    ["Approval Notes",  app.approval_notes],
                  ].map(([label, val]) =>
                    val ? (
                      <div key={label as string}>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-gray-700 text-sm">{val}</p>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          );
        })}

        {!apps.length && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
            No applications tracked yet. Run the SQL seed script to populate partner records.
          </div>
        )}
      </div>
    </div>
  );
}
