import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import PDFDocument from "pdfkit";
import {
  generateReport,
  generateTags,
  REPORT_DISCLAIMER,
  type AssessmentAnswers,
} from "@/lib/immigrationAssessment";

const FROM = "Deported Not Defeated <noreply@deportednotdefeated.com>";
const ADMIN_TO = ["admin@deportednotdefeated.com", "thammo01@outlook.com"];

// ── Supabase client (service role for inserts) ────────────────────────────────
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── PDF builder ───────────────────────────────────────────────────────────────

async function buildPDF(report: ReturnType<typeof generateReport>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // bufferPages: true required for switchToPage; we skip footer loop entirely to avoid hang
    const doc = new PDFDocument({ margin: 50, size: "LETTER", bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const NAVY = "#0a1628";
    const RED = "#c0392b";
    const GRAY = "#6b7280";
    const LIGHT = "#f3f4f6";
    const W = doc.page.width;

    // ── Header bar ──────────────────────────────────────────────────────────
    doc.rect(0, 0, W, 75).fill(NAVY);
    doc.fillColor("white").font("Helvetica-Bold").fontSize(17)
      .text("AI Immigration Case Preparation Report", 50, 18, { width: W - 100 });
    doc.fillColor(RED).font("Helvetica").fontSize(10)
      .text("deportednotdefeated.com", 50, 50);

    // ── Disclaimer box ───────────────────────────────────────────────────────
    doc.moveDown(3.5);
    doc.rect(50, doc.y, W - 100, 58).fill("#fef9c3");
    doc.fillColor("#713f12").font("Helvetica-Bold").fontSize(9)
      .text("IMPORTANT: EDUCATIONAL USE ONLY — NOT LEGAL ADVICE", 60, doc.y + 6, { width: W - 120 });
    doc.font("Helvetica").fontSize(8)
      .text(REPORT_DISCLAIMER, 60, doc.y + 4, { width: W - 120, lineGap: 1.5 });
    doc.moveDown(2.5);

    // ── Recipient + date ─────────────────────────────────────────────────────
    const now = new Date();
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(13)
      .text(`Prepared for: ${report.recipientName}`, 50, doc.y + 6);
    doc.fillColor(GRAY).font("Helvetica").fontSize(9)
      .text(`Generated: ${now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 50, doc.y + 3);
    doc.moveDown(1.5);

    // ── Section renderer ─────────────────────────────────────────────────────
    function renderSection(title: string, items: string[]) {
      if (items.length === 0) return;
      if (doc.y > doc.page.height - 130) doc.addPage();

      // Title bar
      const ty = doc.y;
      doc.rect(50, ty, W - 100, 22).fill(NAVY);
      doc.fillColor("white").font("Helvetica-Bold").fontSize(10)
        .text(title, 58, ty + 6, { width: W - 120 });
      doc.moveDown(0.3);

      items.forEach((item, i) => {
        if (doc.y > doc.page.height - 55) doc.addPage();
        const rowY = doc.y;
        if (i % 2 === 0) {
          doc.rect(50, rowY, W - 100, 19).fill(LIGHT);
        }
        doc.fillColor(RED).font("Helvetica-Bold").fontSize(8.5)
          .text("->", 56, rowY + 3);
        doc.fillColor("#1f2937").font("Helvetica").fontSize(8.5)
          .text(item, 72, rowY + 3, { width: W - 132, lineGap: 1.5 });
        doc.moveDown(0.05);
      });

      doc.moveDown(0.8);
    }

    renderSection(report.topics.title, report.topics.items);
    renderSection(report.attorneyQuestions.title, report.attorneyQuestions.items);
    renderSection(report.documents.title, report.documents.items);
    renderSection(report.nextSteps.title, report.nextSteps.items);
    renderSection(report.resources.title, report.resources.items);
    renderSection(report.services.title, report.services.items);

    // ── Closing disclaimer ───────────────────────────────────────────────────
    if (doc.y > doc.page.height - 80) doc.addPage();
    doc.moveDown(1);
    doc.fillColor(GRAY).font("Helvetica").fontSize(7.5)
      .text(
        "This report is educational only and is not legal advice. Consult a licensed immigration attorney before taking action. | deportednotdefeated.com",
        50, doc.y, { width: W - 100, align: "center" }
      );

    doc.end();
  });
}

// ── Email HTML ────────────────────────────────────────────────────────────────

function buildEmailHtml(report: ReturnType<typeof generateReport>) {
  const listItems = (items: string[]) =>
    items.map((i) => `<li style="margin-bottom:6px">${i}</li>`).join("");

  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1f2937;max-width:600px;margin:0 auto;padding:20px">
<div style="background:#0a1628;padding:24px;border-radius:12px 12px 0 0">
  <h1 style="color:white;margin:0;font-size:20px">AI Immigration Case Preparation Report</h1>
  <p style="color:#c0392b;margin:6px 0 0;font-size:12px">deportednotdefeated.com</p>
</div>
<div style="background:#fef9c3;border:1px solid #fde68a;padding:14px;font-size:12px;color:#713f12;line-height:1.5">
  <strong>EDUCATIONAL USE ONLY — NOT LEGAL ADVICE.</strong> ${REPORT_DISCLAIMER}
</div>
<div style="padding:24px 0">
  <p>Hi ${report.recipientName},</p>
  <p>Thank you for completing the assessment on Deported Not Defeated. Your personalized educational report is attached as a PDF.</p>
  <p>Here&apos;s a quick summary of what&apos;s inside:</p>

  <h3 style="color:#0a1628;font-size:15px;margin-top:24px">${report.topics.title}</h3>
  <ul style="padding-left:18px;font-size:13px;line-height:1.7">${listItems(report.topics.items.slice(0, 5))}</ul>

  <h3 style="color:#0a1628;font-size:15px;margin-top:24px">${report.attorneyQuestions.title}</h3>
  <ul style="padding-left:18px;font-size:13px;line-height:1.7">${listItems(report.attorneyQuestions.items.slice(0, 5))}</ul>

  <div style="background:#f3f4f6;border-radius:10px;padding:16px;margin:24px 0;font-size:13px">
    <strong>Your suggested next step:</strong><br>${report.nextSteps.items[0]}
  </div>

  <p style="font-size:13px">See the full report PDF attached to this email.</p>

  <a href="https://deportednotdefeated.com/legal-resources" style="display:inline-block;background:#c0392b;color:white;padding:12px 24px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:13px;margin-top:8px">
    Explore Legal Resources →
  </a>
</div>
<div style="border-top:1px solid #e5e7eb;padding-top:16px;font-size:11px;color:#9ca3af;line-height:1.6">
  This email was sent because you requested a free immigration preparation report at deportednotdefeated.com. This report is educational only and is not legal advice. To unsubscribe, reply with "unsubscribe" in the subject line.<br><br>
  Deported Not Defeated | deportednotdefeated.com
</div>
</body></html>`;
}

// ── Admin notification ────────────────────────────────────────────────────────

function buildAdminHtml(answers: AssessmentAnswers, tags: string[]) {
  return `<html><body style="font-family:Arial,sans-serif;font-size:13px;color:#1f2937">
<h2>New Immigration Assessment Submitted</h2>
<p><strong>Name:</strong> ${answers.firstName}</p>
<p><strong>Email:</strong> ${answers.email}</p>
<p><strong>Country:</strong> ${answers.currentCountry || "—"}</p>
<p><strong>Goal:</strong> ${answers.primaryGoal}</p>
<p><strong>Deportation Reason:</strong> ${answers.deportationReason}</p>
<p><strong>Citizen Spouse:</strong> ${answers.hasCitizenSpouse} | <strong>Citizen Parent:</strong> ${answers.hasCitizenParent} | <strong>Citizen Child:</strong> ${answers.hasCitizenChild}</p>
<p><strong>Criminal Conviction:</strong> ${answers.hasCriminalConviction} — ${answers.criminalCategory || "—"}</p>
<p><strong>Wants Attorney:</strong> ${answers.wantsAttorney}</p>
<p><strong>Tags:</strong> ${tags.join(", ")}</p>
</body></html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const answers = (await req.json()) as AssessmentAnswers;

    // Basic validation
    if (!answers.email || !answers.email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const report = generateReport(answers);
    const tags = generateTags(answers);

    // ── Save to Supabase ───────────────────────────────────────────────────
    const supabase = getSupabase();
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

    // ── Generate PDF ───────────────────────────────────────────────────────
    const pdfBuffer = await buildPDF(report);
    const pdfBase64 = pdfBuffer.toString("base64");

    // ── Send emails ────────────────────────────────────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    await Promise.all([
      // User report email
      resend.emails.send({
        from: FROM,
        to: answers.email,
        subject: `Your Immigration Case Preparation Report — Deported Not Defeated`,
        html: buildEmailHtml(report),
        attachments: [
          {
            filename: "Immigration-Case-Preparation-Report.pdf",
            content: pdfBase64,
          },
        ],
      }),
      // Admin notification
      resend.emails.send({
        from: FROM,
        to: ADMIN_TO,
        subject: `New Assessment: ${answers.firstName} — ${answers.primaryGoal}`,
        html: buildAdminHtml(answers, tags),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("immigration-assessment error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
