import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-navy-800 text-white flex flex-col py-6 px-4 gap-2 shrink-0">
        <p className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4 px-2">Admin</p>
        {[
          ["/admin", "Dashboard"],
          ["/admin/listings", "Listings"],
          ["/admin/articles", "Articles"],
          ["/admin/affiliates", "Affiliates"],
          ["/admin/messages", "Messages"],
          ["/admin/subscribers", "Subscribers"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            {label}
          </Link>
        ))}
        <div className="mt-auto">
          <form action="/admin/logout" method="post">
            <button className="w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-left text-gray-400">
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1 bg-gray-50 p-8">{children}</div>
    </div>
  );
}
