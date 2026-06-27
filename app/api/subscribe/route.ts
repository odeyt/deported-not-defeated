import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Deported Not Defeated <noreply@deportednotdefeated.com>";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const errors: string[] = [];

  // 1. Save to Supabase
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, name: name || null });
    if (error) console.error("[subscribe] Supabase error:", error.message);
  } catch (e) {
    console.error("[subscribe] Supabase exception:", e);
    errors.push("supabase");
  }

  // 2. Admin notification — send to personal email only (reliable inbox)
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: "thammo01@outlook.com",
      subject: `New subscriber: ${name || email}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px">
          <h2 style="color:#0f172a;margin-top:0">New Newsletter Subscriber</h2>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#6b7280;font-size:12px;margin:0">Deported Not Defeated — deportednotdefeated.com</p>
        </div>
      `,
    });
    if (error) {
      console.error("[subscribe] Admin email error:", JSON.stringify(error));
      errors.push("admin_email");
    } else {
      console.log("[subscribe] Admin email sent, id:", data?.id);
    }
  } catch (e) {
    console.error("[subscribe] Admin email exception:", e);
    errors.push("admin_email");
  }

  // 3. Welcome email to subscriber
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your Laos Restart Checklist is ready to download",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff">
          <div style="background:#0f172a;padding:32px 40px;border-radius:12px 12px 0 0">
            <p style="color:#ca8a04;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px">Deported Not Defeated</p>
            <h1 style="color:#fff;font-size:26px;margin:0;line-height:1.3">Your Free Checklist<br/>is Ready to Download</h1>
          </div>
          <div style="padding:32px 40px;background:#f9fafb">
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px">Hi ${name ? name : "there"},</p>
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px">
              Thank you for joining the Deported Not Defeated community. You are not alone in this journey.
            </p>
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px">
              Your <strong>Laos Restart Checklist: First 30 Days After Deportation</strong> covers everything you need — housing, phone, money, legal documents, and more.
            </p>
            <div style="text-align:center;margin:32px 0">
              <a href="https://deportednotdefeated.com/api/checklist"
                 style="background:#b91c1c;color:#fff;padding:16px 36px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block">
                Download Your Free PDF →
              </a>
            </div>
            <div style="background:#eff6ff;border-left:4px solid #1d4ed8;padding:16px 20px;border-radius:0 8px 8px 0;margin:24px 0">
              <p style="color:#1e3a5f;font-size:13px;margin:0;line-height:1.6">
                <strong>Note:</strong> This checklist is for self-deportees currently in Laos and individuals released from the Laos Immigration Welcome Center, Lak 19, Ban Dong Makkai.
              </p>
            </div>
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:24px 0 0">Your story is not over. Start with one step forward.</p>
            <p style="color:#374151;font-size:15px;font-style:italic;margin:4px 0 0">— The Deported Not Defeated Team</p>
          </div>
          <div style="background:#0f172a;padding:20px 40px;border-radius:0 0 12px 12px;text-align:center">
            <p style="color:#6b7280;font-size:12px;margin:0">
              deportednotdefeated.com &nbsp;|&nbsp; You received this because you subscribed.
            </p>
          </div>
        </div>
      `,
    });
    if (error) {
      console.error("[subscribe] Welcome email error:", JSON.stringify(error));
      errors.push("welcome_email");
    } else {
      console.log("[subscribe] Welcome email sent, id:", data?.id);
    }
  } catch (e) {
    console.error("[subscribe] Welcome email exception:", e);
    errors.push("welcome_email");
  }

  return NextResponse.json({ ok: true, errors });
}
