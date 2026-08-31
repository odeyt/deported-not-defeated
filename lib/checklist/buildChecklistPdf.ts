// @ts-nocheck
import PDFDocument from "pdfkit";

/**
 * Country-agnostic "restart checklist" PDF builder.
 *
 * Extracted from the original Laos-only app/api/checklist/route.ts so a
 * second, third, and fourth country don't grow their own copy of the same
 * pdfkit drawing code — two parallel implementations would drift apart
 * exactly the way this codebase's own tests (category-references.test.ts,
 * client-bundle-safety.test.ts) exist to catch drift elsewhere.
 *
 * `// @ts-nocheck`: pdfkit's chained-call TS types are awkward here, same
 * as the original route.
 */

export interface ChecklistSectionInput {
  title: string;
  items: string[];
}

export interface ChecklistContactInput {
  label: string;
  value: string;
}

export interface ChecklistPdfInput {
  metaTitle: string;
  metaSubject: string;
  headerTitle: string;
  headerSubtitle: string;
  quoteText: string;
  whoForText: string;
  /** Exactly 4 — rendered as a 2x2 grid, same shape as the original Laos layout. */
  sections: ChecklistSectionInput[];
  contacts: ChecklistContactInput[];
  footerNote?: string;
}

const NAVY = { r: 15, g: 23, b: 42 };
const RED = { r: 185, g: 28, b: 28 };
const GOLD = { r: 202, g: 138, b: 4 };
const WHITE = { r: 255, g: 255, b: 255 };
const GRAY = { r: 75, g: 85, b: 99 };
const LGRAY = { r: 243, g: 244, b: 246 };
const BORDER = { r: 209, g: 213, b: 219 };
const NOTE_BG = { r: 239, g: 246, b: 255 };
const NOTE_BAR = { r: 29, g: 78, b: 216 };
const NOTE_TITLE = { r: 30, g: 58, b: 95 };
const NOTE_BODY = { r: 55, g: 65, b: 81 };

/** Same four brand colors the original Laos `weeks` array used, now assigned by index. */
const SECTION_ACCENTS = [RED, { r: 194, g: 65, b: 12 }, { r: 161, g: 98, b: 7 }, { r: 21, g: 128, b: 61 }];

const DEFAULT_FOOTER =
  "Free resource from deportednotdefeated.com  |  Your story is not over.  |  Share freely with anyone who needs it.";

const W = 595.28; // A4 width pts
const H = 841.89; // A4 height pts

function rgb(c: { r: number; g: number; b: number }) {
  return `#${c.r.toString(16).padStart(2, "0")}${c.g.toString(16).padStart(2, "0")}${c.b.toString(16).padStart(2, "0")}`;
}

function drawHeader(doc, input: ChecklistPdfInput) {
  doc.rect(0, 0, W, 110).fill(rgb(NAVY));

  doc.fillColor(rgb(WHITE)).font("Helvetica-Bold").fontSize(11).text("DEPORTED  NOT  DEFEATED", 40, 22);
  doc.fillColor(rgb(GOLD)).font("Helvetica").fontSize(8).text("deportednotdefeated.com", 40, 36);
  doc.fillColor(rgb(WHITE)).font("Helvetica-Bold").fontSize(22).text(input.headerTitle, 40, 56);
  doc.fillColor(rgb(RED)).font("Helvetica-Bold").fontSize(13).text(input.headerSubtitle, 40, 82);
}

function drawQuoteStrip(doc, input: ChecklistPdfInput) {
  doc.rect(0, 110, W, 32).fill(rgb(RED));
  doc.fillColor(rgb(WHITE)).font("Helvetica-Oblique").fontSize(9.5)
    .text(`"${input.quoteText}"`, 40, 120, { width: W - 80, align: "center" });
}

function drawWhoForStrip(doc, input: ChecklistPdfInput) {
  doc.rect(0, 142, W, 46).fill(rgb(NOTE_BG));
  doc.rect(0, 142, 4, 46).fill(rgb(NOTE_BAR));
  doc.fillColor(rgb(NOTE_TITLE)).font("Helvetica-Bold").fontSize(7.5)
    .text("WHO THIS CHECKLIST IS FOR:", 14, 148, { width: W - 24 });
  doc.font("Helvetica").fillColor(rgb(NOTE_BODY)).fontSize(7.5)
    .text(input.whoForText, 14, 159, { width: W - 28 });
}

/**
 * Height-aware row measurement — the fix for the original layout's fixed
 * `items.length * 20` math, which assumed every item fit on one line at a
 * fixed row height and silently clipped longer text (`{ lineBreak: false }`
 * / a fixed `height: 14`). `Math.max(20, ...)` keeps 20pt as a FLOOR: every
 * item in the original Laos content measures under that floor, so Laos's
 * layout is visually unchanged after this refactor, while longer real
 * sentences (e.g. Mexico's country data) wrap to 2+ lines instead of being
 * cut off.
 */
function rowHeight(doc, text: string, textWidth: number, fontSize: number): number {
  doc.font("Helvetica").fontSize(fontSize);
  return Math.max(20, doc.heightOfString(text, { width: textWidth }) + 10);
}

function measureSectionHeight(doc, section: ChecklistSectionInput, colWidth: number): number {
  const textWidth = colWidth - 30;
  const itemsHeight = section.items.reduce((sum, item) => sum + rowHeight(doc, item, textWidth, 7.5), 0);
  return 22 + itemsHeight + 8;
}

function drawSection(doc, section: ChecklistSectionInput, accent, x: number, y: number, colWidth: number, blockH: number) {
  const textWidth = colWidth - 30;

  doc.rect(x, y, colWidth, 22).fill(rgb(accent));
  doc.fillColor(rgb(WHITE)).font("Helvetica-Bold").fontSize(8).text(section.title, x + 8, y + 7, { width: colWidth - 16 });

  doc.rect(x, y + 22, colWidth, blockH - 22).fill(rgb(LGRAY));

  let cursorY = y + 22 + 4;
  for (const item of section.items) {
    const h = rowHeight(doc, item, textWidth, 7.5);
    doc.rect(x + 8, cursorY + 3, 10, 10).lineWidth(1).stroke(rgb(GRAY));
    doc.fillColor(rgb(NAVY)).font("Helvetica").fontSize(7.5).text(item, x + 23, cursorY + 3, { width: textWidth });
    cursorY += h;
  }

  doc.rect(x, y, colWidth, blockH).lineWidth(0.5).stroke(rgb(BORDER));
}

/** Draws the 2x2 section grid, returns the Y position immediately below it. */
function drawSections(doc, sections: ChecklistSectionInput[]): number {
  const COL_W = (W - 60) / 2;
  const colX = [30, 30 + COL_W + 10];
  const START_Y = 196;

  const heights = sections.map((section) => measureSectionHeight(doc, section, COL_W));

  const positions = [
    { x: colX[0], y: START_Y },
    { x: colX[1], y: START_Y },
    { x: colX[0], y: START_Y + heights[0] + 8 },
    { x: colX[1], y: START_Y + heights[1] + 8 },
  ];

  sections.forEach((section, i) => {
    drawSection(doc, section, SECTION_ACCENTS[i % SECTION_ACCENTS.length], positions[i].x, positions[i].y, COL_W, heights[i]);
  });

  const col0Bottom = START_Y + heights[0] + 8 + heights[2] + 8;
  const col1Bottom = START_Y + heights[1] + 8 + heights[3] + 8;
  return Math.max(col0Bottom, col1Bottom) + 8;
}

function drawContacts(doc, contacts: ChecklistContactInput[], y: number) {
  const valueWidth = W - 160;
  const rowHeights = contacts.map((c) => rowHeight(doc, c.value, valueWidth, 8));
  const refH = 18 + rowHeights.reduce((a, b) => a + b, 0) + 8;

  doc.rect(30, y, W - 60, refH).fill(rgb(NAVY));
  doc.fillColor(rgb(GOLD)).font("Helvetica-Bold").fontSize(9).text("ESSENTIAL CONTACTS & RESOURCES", 40, y + 8);

  let cursorY = y + 22;
  contacts.forEach((contact, i) => {
    doc.fillColor(rgb(RED)).font("Helvetica-Bold").fontSize(8)
      .text(contact.label.toUpperCase() + ":", 40, cursorY, { width: 75, lineBreak: false });
    doc.fillColor(rgb(WHITE)).font("Helvetica").fontSize(8)
      .text(contact.value, 120, cursorY, { width: valueWidth });
    cursorY += rowHeights[i];
  });

  return y + refH;
}

function drawFooter(doc, input: ChecklistPdfInput) {
  doc.rect(0, H - 38, W, 38).fill(rgb(NAVY));
  doc.fillColor(rgb(GRAY)).font("Helvetica").fontSize(7.5)
    .text(input.footerNote ?? DEFAULT_FOOTER, 30, H - 24, { width: W - 60, align: "center" });
}

export async function buildChecklistPdf(input: ChecklistPdfInput): Promise<Buffer> {
  const chunks: Buffer[] = [];

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: input.metaTitle,
      Author: "Deported Not Defeated",
      Subject: input.metaSubject,
    },
  });

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  drawHeader(doc, input);
  drawQuoteStrip(doc, input);
  drawWhoForStrip(doc, input);
  const contactsY = drawSections(doc, input.sections);
  drawContacts(doc, input.contacts, contactsY);
  drawFooter(doc, input);

  doc.end();

  return new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
