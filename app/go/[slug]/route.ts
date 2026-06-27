import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = await createClient();
  const { slug } = params;

  const { data: partner } = await supabase
    .from("affiliate_partners")
    .select("id, slug, affiliate_url, official_website_url, affiliate_status, active")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  const fallback = new URL("/resources", req.url).toString();

  if (!partner) {
    return NextResponse.redirect(fallback);
  }

  // Log the click (best-effort — do not block on failure)
  try {
    const referer = req.headers.get("referer") ?? "";
    const userAgent = req.headers.get("user-agent") ?? "";
    const pagePath = referer ? new URL(referer).pathname : "";

    await supabase.from("affiliate_clicks").insert({
      partner_id: partner.id,
      partner_slug: partner.slug,
      page_path: pagePath,
      referrer: referer,
      user_agent: userAgent,
    });
  } catch {
    // click tracking failure should not break the redirect
  }

  // Determine destination — never redirect to "#" or empty string
  let destination: string = fallback;

  if (partner.affiliate_status === "approved" && partner.affiliate_url) {
    destination = partner.affiliate_url;
  } else if (partner.official_website_url && partner.official_website_url !== "#") {
    destination = partner.official_website_url;
  }

  return NextResponse.redirect(destination, { status: 302 });
}
