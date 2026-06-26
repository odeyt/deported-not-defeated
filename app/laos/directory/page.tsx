import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import DirectorySearch from "@/components/DirectorySearch";
import { DirectoryListing } from "@/lib/types";

export const metadata: Metadata = {
  title: "Laos Business Directory for Deportees",
  description:
    "Search verified local businesses in Laos — housing, legal help, hospitals, banks, SIM cards, and more.",
};

export default async function DirectoryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("directory_listings")
    .select("*")
    .eq("country_code", "LA")
    .order("featured", { ascending: false })
    .order("business_name");

  const listings: DirectoryListing[] = data ?? [];

  return (
    <>
      <section className="bg-navy-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
            Laos
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Business Directory</h1>
          <p className="text-gray-300 text-lg">
            Find verified local services across Laos — housing, legal help, clinics, banks, and more.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <DirectorySearch listings={listings} />
        </div>
      </section>
    </>
  );
}
