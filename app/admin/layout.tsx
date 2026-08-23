import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const navGroups = [
    {
      label: "Content",
      links: [
        ["/admin", "Dashboard"],
        ["/admin/listings", "Listings"],
        ["/admin/messages", "Messages"],
        ["/admin/subscribers", "Subscribers"],
      ],
    },
    {
      label: "Affiliates",
      links: [
        ["/admin/affiliates", "Partners"],
        ["/admin/affiliate-applications", "Applications"],
        ["/admin/affiliate-clicks", "Click Report"],
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-navy-800 text-white flex flex-col py-6 px-4 gap-1 shrink-0">
        <Link href="/" className="font-bold text-sm text-white mb-6 px-2 block hover:text-brand-red transition-colors">
          ← Site
        </Link>

        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider px-2 mb-2">{group.label}</p>
            {group.links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-200 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        ))}

        <div className="mt-auto">
          <form action="/admin/logout" method="post">
            <button className="w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-left text-gray-400">
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">{children}</div>
    </div>
  );
}
