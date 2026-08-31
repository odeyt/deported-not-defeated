// @ts-nocheck
import { NextResponse } from "next/server";
import { buildChecklistPdf } from "@/lib/checklist/buildChecklistPdf";
import { COUNTRY_CHECKLISTS, getChecklistQuoteText, getChecklistWhoForText } from "@/data/checklistContent";

export const dynamic = "force-dynamic";

/**
 * GET /api/checklist/<country>
 *
 * Scoped to the countries in COUNTRY_CHECKLISTS (mexico, el-salvador,
 * guatemala) — Laos keeps its own unparameterized route at
 * app/api/checklist/route.ts, unchanged.
 */
export async function GET(_req: Request, { params }: { params: { country: string } }) {
  const entry = COUNTRY_CHECKLISTS[params.country];

  if (!entry) {
    return NextResponse.json({ error: "No checklist available for this country." }, { status: 404 });
  }

  const pdfBuffer = await buildChecklistPdf({
    metaTitle: `${entry.countryLabel} Restart Checklist -- First 30 Days After Deportation`,
    metaSubject: `Practical survival guide for deportees arriving in ${entry.countryLabel}`,
    headerTitle: entry.headerTitle,
    headerSubtitle: "FIRST 30 DAYS AFTER DEPORTATION",
    quoteText: getChecklistQuoteText(),
    whoForText: getChecklistWhoForText(entry.countryLabel),
    sections: entry.sections,
    contacts: entry.contacts,
  });

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${entry.filename}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
