import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  generateReport,
  generateTags,
  REPORT_DISCLAIMER,
  type AssessmentAnswers,
} from "@/lib/immigrationAssessment";

export const maxDuration = 60; // Vercel: allow up to 60s

const FROM = "Deported Not Defeated <noreply@deportednotdefeated.com>";
const ADMIN_TO = ["admin@deportednotdefeated.com", "thammo01@outlook.com"];

// ── Email: full report as HTML ────────────────────────────────────────────────

function buildReportEmail(report: ReturnType<typeof generateReport>): string {
  const section = (title: string, items: string[]) => {
    if (!items.length) return "";
    const rows = items
      .map(
        (item, i) =>
          `<tr style="background:${i % 2 === 0 ? "#f9fafb" : "#ffffff"}">
            <td style="padding:10px 14px;font-size:13px;color:#1f2937;line-height:1.5;border-bottom:1px solid #f3f4f6">
              <span style="color:#c0392b;font-weight:bold;margin-right:8px">→</span>${item}
            </td>
          </tr>`
      )
      .join("");
    return `
      <div style="margin-bottom:28px">
        <div style="background:#0a1628;padding:10px 14px;border-radius:6px 6px 0 0">
          <p style="color:white;font-size:12px;font-weight:bold;margin:0">${title}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px;overflow:hidden">
          ${rows}
        </table>
      </div>`;
  };

  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;color:#1f2937;max-width:620px;margin:0 auto;padding:20px;background:#f9fafb">

<div style="background:#0a1628;padding:28px 24px;border-radius:12px 12px 0 0">
  <h1 style="color:white;margin:0 0 6px;font-size:22px">AI Immigration Case Preparation Report</h1>
  <p style="color:#c0392b;margin:0;font-size:12px;font-weight:bold">deportednotdefeated.com — Educational Use Only</p>
</div>

<div style="background:#fef9c3;border:1px solid #fde68a;padding:14px 16px;font-size:12px;color:#713f12;line-height:1.6">
  <strong>⚠ NOT LEGAL ADVICE.</strong> ${REPORT_DISCLAIMER}
</div>

<div style="background:white;padding:24px;border:1px solid #e5e7eb;border-top:none">
  <p style="font-size:15px;margin-top:0">Hi <strong>${report.recipientName}</strong>,</p>
  <p style="font-size:13px;color:#6b7280;line-height:1.6">
    Thank you for completing the assessment. Below is your personalized educational report.
    Review it carefully, gather the suggested documents, and share it with a licensed immigration attorney.
  </p>

  ${section(report.topics.title, report.topics.items)}
  ${section(report.attorneyQuestions.title, report.attorneyQuestions.items)}
  ${section(report.documents.title, report.documents.items)}
  ${section(report.nextSteps.title, report.nextSteps.items)}
  ${section(report.resources.title, report.resources.items)}
  ${section(report.services.title, report.services.items)}

  <div style="background:#f3f4f6;border-radius:10px;padding:16px;margin-top:24px;font-size:13px;color:#374151;line-height:1.6">
    <strong>Reminder:</strong> This report is for educational preparation only. It is not legal advice.
    Always consult a licensed immigration attorney before taking any immigration action.
  </div>

  <div style="margin-top:24px">
    <a href="https://deportednotdefeated.com/legal-resources"
       style="display:inline-block;background:#c0392b;color:white;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:13px">
      Explore Legal Resources →
    </a>
    &nbsp;
    <a href="https://deportednotdefeated.com/legal-resources#find-legal-help"
       style="display:inline-block;background:#0a1628;color:white;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:13px">
      Find an Attorney →
    </a>
  </div>
</div>

<div style="padding:16px;font-size:11px;color:#9ca3af;line-height:1.7;text-align:center">
  You received this because you requested a free immigration preparation report at deportednotdefeated.com.<br>
  This report is educational only and is not legal advice.<br>
  To unsubscribe, reply with "unsubscribe" in the subject line.<br>
  <strong>Deported Not Defeated</strong> | deportednotdefeated.com
</div>

</body></html>`;
}

function buildAdminEmail(answers: AssessmentAnswers, tags: string[]): string {
  return `<html><body style="font-family:Arial,sans-serif;font-size:13px;color:#1f2937;max-width:500px">
<h2 style="color:#0a1628">New Assessment Submitted</h2>
<table style="width:100%;border-collapse:collapse">
  ${[
    ["Name", answers.firstName],
    ["Email", answers.email],
    ["Country", answers.currentCountry || "—"],
    ["Goal", answers.primaryGoal],
    ["Deportation Reason", answers.deportationReason],
    ["Removal Count", answers.removalCount],
    ["Citizen Spouse", answers.hasCitizenSpouse],
    ["Citizen Parent", answers.hasCitizenParent],
    ["Citizen Child", answers.hasCitizenChild],
    ["Criminal Conviction", answers.hasCriminalConviction + (answers.criminalCategory ? ` — ${answers.criminalCategory}` : "")],
    ["Wants Attorney", answers.wantsAttorney],
    ["Biggest Concern", answers.biggestConcern],
    ["Has Attorney", answers.hasAttorney],
    ["Tags", tags.join(", ")],
  ]
    .map(
      ([k, v], i) =>
        `<tr style="background:${i % 2 === 0 ? "#f9fafb" : "#fff"}">
          <td style="padding:8px 12px;font-weight:bold;color:#6b7280;font-size:12px;width:40%">${k}</td>
          <td style="padding:8px 12px;font-size:13px">${v}</td>
        </tr>`
    )
    .join("")}
</table>
</body></html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const answers = (await req.json()) as AssessmentAnswers;

    if (!answers.email || !answers.email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const report = generateReport(answers);
    const tags = generateTags(answers);

    // ── 1. Save to Supabase (non-blocking — don't let DB failure kill the response) ──
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await supabase.from("immigration_assessments").insert({
        first_name: answers.firstName,
        email: answers.email,
        current_country: answers.currentCountry,
        deportation_reason: answers.deportationReason,
        deportation_year: answers.deportationYear,
        removal_count: answers.removalCount,
        has_citizen_spouse: answers.hasCitizenSpouse,
        has_lpr_spouse: answers.hasLPRSpouse,
        has_citizen_parent: answers.hasCitizenParent,
        has_citizen_child: answers.hasCitizenChild,
        has_criminal_conviction: answers.hasCriminalConviction,
        criminal_category: answers.criminalCategory,
        attempted_illegal_return: answers.attemptedIllegalReturn,
        outside_us: answers.outsideUS,
        has_attorney: answers.hasAttorney,
        primary_goal: answers.primaryGoal,
        biggest_concern: answers.biggestConcern,
        wants_attorney: answers.wantsAttorney,
        consent: answers.consent,
        tags,
        answers_json: answers,
      });
    } catch (dbErr) {
      console.error("[assessment] Supabase insert failed:", dbErr);
      // continue — don't block email delivery
    }

    // ── 2. Send emails ─────────────────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("[assessment] RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(resendKey);

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: answers.email,
        subject: `Your Free Immigration Case Preparation Report — Deported Not Defeated`,
        html: buildReportEmail(report),
      }),
      resend.emails.send({
        from: FROM,
        to: ADMIN_TO,
        subject: `New Assessment: ${answers.firstName || "Unknown"} — ${answers.primaryGoal || "—"}`,
        html: buildAdminEmail(answers, tags),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[assessment] Unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
