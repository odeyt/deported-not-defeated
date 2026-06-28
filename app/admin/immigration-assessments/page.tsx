import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assessment Dashboard | Admin",
};

export const dynamic = "force-dynamic";

interface Assessment {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  current_country: string;
  deportation_reason: string;
  primary_goal: string;
  wants_attorney: string;
  biggest_concern: string;
  has_criminal_conviction: string;
  tags: string[];
}

async function getAssessments(): Promise<Assessment[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase
    .from("immigration_assessments")
    .select("id, created_at, first_name, email, current_country, deportation_reason, primary_goal, wants_attorney, biggest_concern, has_criminal_conviction, tags")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return [];
  return (data ?? []) as Assessment[];
}

function stat(label: string, value: string | number) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <p className="text-gray-500 text-xs font-medium mb-1">{label}</p>
      <p className="text-navy-800 font-extrabold text-2xl">{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const assessments = await getAssessments();

  const needsAttorney = assessments.filter((a) => a.wants_attorney === "Yes" || a.wants_attorney === "Maybe").length;
  const hasCriminal = assessments.filter((a) => a.has_criminal_conviction === "Yes").length;

  // Top goals
  const goalCounts: Record<string, number> = {};
  assessments.forEach((a) => { goalCounts[a.primary_goal] = (goalCounts[a.primary_goal] ?? 0) + 1; });
  const topGoals = Object.entries(goalCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Top countries
  const countryCounts: Record<string, number> = {};
  assessments.forEach((a) => {
    if (a.current_country) countryCounts[a.current_country] = (countryCounts[a.current_country] ?? 0) + 1;
  });
  const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
            <h1 className="text-3xl font-extrabold text-navy-800">Immigration Assessments</h1>
          </div>
          <Link href="/" className="text-gray-500 hover:text-navy-800 text-sm transition-colors">← Back to Site</Link>
        </div>

        {/* ── Stats ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stat("Total Assessments", assessments.length)}
          {stat("Emails Collected", assessments.length)}
          {stat("Want Attorney", needsAttorney)}
          {stat("Criminal History", hasCriminal)}
        </div>

        {/* ── Breakdowns ──────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-navy-800 mb-4 text-sm">Top Goals</h3>
            <div className="space-y-2">
              {topGoals.map(([goal, count]) => (
                <div key={goal} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 text-xs">{goal || "—"}</span>
                  <span className="font-bold text-navy-800 tabular-nums">{count}</span>
                </div>
              ))}
              {topGoals.length === 0 && <p className="text-gray-400 text-xs">No data yet.</p>}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-navy-800 mb-4 text-sm">Top Countries</h3>
            <div className="space-y-2">
              {topCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 text-xs">{country || "—"}</span>
                  <span className="font-bold text-navy-800 tabular-nums">{count}</span>
                </div>
              ))}
              {topCountries.length === 0 && <p className="text-gray-400 text-xs">No data yet.</p>}
            </div>
          </div>
        </div>

        {/* ── Table ───────────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-navy-800 text-sm">All Submissions</h2>
          </div>
          {assessments.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              No assessments yet. The table will be created in Supabase on first submission.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Country</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Goal</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Attorney?</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((a, i) => (
                    <tr key={a.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">
                        {new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3 font-medium text-navy-800">{a.first_name}</td>
                      <td className="px-4 py-3 text-gray-600">{a.email}</td>
                      <td className="px-4 py-3 text-gray-600">{a.current_country || "—"}</td>
                      <td className="px-4 py-3 text-gray-600">{a.primary_goal || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          a.wants_attorney === "Yes" ? "bg-green-50 text-green-700" :
                          a.wants_attorney === "Maybe" ? "bg-yellow-50 text-yellow-700" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {a.wants_attorney || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(a.tags ?? []).slice(0, 3).map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium">{tag}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
