import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: listings },
    { count: messages },
    { count: subscribers },
    { count: affiliates },
  ] = await Promise.all([
    supabase.from("directory_listings").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase.from("affiliate_links").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Directory Listings", value: listings ?? 0, href: "/admin/listings" },
    { label: "Contact Messages", value: messages ?? 0, href: "/admin/messages" },
    { label: "Newsletter Subscribers", value: subscribers ?? 0, href: "/admin/subscribers" },
    { label: "Affiliate Links", value: affiliates ?? 0, href: "/admin/affiliates" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-3xl font-bold text-navy-800">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </a>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-navy-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            ["Add Listing", "/admin/listings/new"],
            ["Add Article", "/admin/articles/new"],
            ["Add Affiliate", "/admin/affiliates/new"],
            ["View Messages", "/admin/messages"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="bg-navy-800 hover:bg-navy-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
