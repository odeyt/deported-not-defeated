import { createClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {(messages ?? []).map((m) => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-navy-800">{m.name}</p>
                <p className="text-sm text-gray-500">{m.email} {m.country ? `· ${m.country}` : ""}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{new Date(m.created_at).toLocaleDateString()}</p>
                {m.need_help_with && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{m.need_help_with}</span>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{m.message}</p>
            <a href={`mailto:${m.email}`} className="inline-block mt-3 text-xs text-brand-red hover:underline font-medium">Reply via email →</a>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="text-center text-gray-500 py-16 bg-white rounded-xl border border-gray-200">No messages yet.</div>
        )}
      </div>
    </div>
  );
}
