// @ts-nocheck
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export const dynamic = "force-dynamic";

// Brand colors (RGB)
const NAVY   = { r: 15,  g: 23,  b: 42  };
const RED    = { r: 185, g: 28,  b: 28  };
const GOLD   = { r: 202, g: 138, b: 4   };
const WHITE  = { r: 255, g: 255, b: 255 };
const GRAY   = { r: 75,  g: 85,  b: 99  };
const LGRAY  = { r: 243, g: 244, b: 246 };

function rgb(c: { r: number; g: number; b: number }) {
  return `#${c.r.toString(16).padStart(2, "0")}${c.g.toString(16).padStart(2, "0")}${c.b.toString(16).padStart(2, "0")}`;
}

const weeks = [
  {
    title: "DAYS 1-3: LAND SAFE",
    accent: RED,
    items: [
      "Find a guesthouse or safe place to sleep tonight",
      "Eat something -- locate a market or restaurant nearby",
      "Get a Lao SIM card (Unitel recommended) -- costs $5-10",
      "Connect to WiFi and message family that you are safe",
      "Find the nearest hospital or clinic location",
      "Count your money -- know exactly what you have",
      "Do not panic. You made it here. That is step one.",
    ],
  },
  {
    title: "DAYS 4-7: GET CONNECTED",
    accent: { r: 194, g: 65, b: 12 },
    items: [
      "Buy a monthly data plan for your SIM card",
      "Download WhatsApp, Google Maps, Google Translate",
      "Locate the nearest bank or Western Union agent",
      "If you have family in Laos, contact them now",
      "Find a local who speaks English -- a guide or helper",
      "Identify your nearest embassy or consulate",
      "Make a rough weekly budget -- even an estimate helps",
    ],
  },
  {
    title: "WEEK 2: DOCUMENTS & STABILITY",
    accent: { r: 161, g: 98, b: 7 },
    items: [
      "Visit embassy if you need a new passport or ID",
      "Understand your visa status -- how long can you stay?",
      "Ask about residency options for Lao nationals",
      "Open a basic bank account (BCEL or LDB)",
      "Set up money transfers from USA: Wise, Remitly, or Western Union",
      "Find a longer-term, cheaper place to stay",
      "Start learning 10 basic Lao phrases",
    ],
  },
  {
    title: "WEEKS 3-4: START REBUILDING",
    accent: { r: 21, g: 128, b: 61 },
    items: [
      "Look for short-term income -- English tutoring, delivery, translation",
      "Visit the local job board or ask at markets and guesthouses",
      "Connect with expat and returnee communities online",
      "Find a reliable food source -- market, family, or meal prep",
      "Schedule a checkup at a local clinic",
      "If struggling emotionally, find someone to talk to -- it is okay",
      "Write your 3-month goal. One sentence is enough.",
    ],
  },
];

const resources = [
  ["Phone",     "Unitel SIM -- best coverage. Buy at Talat Sao Mall."],
  ["Money",     "Western Union at BCEL Bank. Bring passport + sender ref."],
  ["Legal",     "US Embassy: +856 21 487000 (Mon-Fri 8am-5pm)"],
  ["Health",    "Wattana Clinic: +856 21 413502 (English spoken)"],
  ["Emergency", "Police 191  |  Ambulance 195  |  Fire 190"],
  ["Community", "Caritas Laos: +856 21 413789 -- free support services"],
];

export async function GET() {
  const chunks: Buffer[] = [];

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: "Laos Restart Checklist -- First 30 Days After Deportation",
      Author: "Deported Not Defeated",
      Subject: "Practical survival guide for deportees arriving in Laos",
    },
  });

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  const W = 595.28;  // A4 width pts
  const H = 841.89; // A4 height pts

  // HEADER BAND
  doc.rect(0, 0, W, 110).fill(rgb(NAVY));

  doc.fillColor(rgb(WHITE)).font("Helvetica-Bold").fontSize(11)
     .text("DEPORTED  NOT  DEFEATED", 40, 22);

  doc.fillColor(rgb(GOLD)).font("Helvetica").fontSize(8)
     .text("deportednotdefeated.com", 40, 36);

  doc.fillColor(rgb(WHITE)).font("Helvetica-Bold").fontSize(22)
     .text("LAOS RESTART CHECKLIST", 40, 56);

  doc.fillColor(rgb(RED)).font("Helvetica-Bold").fontSize(13)
     .text("FIRST 30 DAYS AFTER DEPORTATION", 40, 82);

  // RED QUOTE STRIP
  doc.rect(0, 110, W, 32).fill(rgb(RED));
  doc.fillColor(rgb(WHITE)).font("Helvetica-Oblique").fontSize(9.5)
     .text(
       '"Start with one safe place to sleep, one phone number, one step forward."',
       40, 120, { width: W - 80, align: "center" }
     );

  // NOTE STRIP
  doc.rect(0, 142, W, 28).fill(rgb({ r: 241, g: 245, b: 249 }));
  doc.fillColor(rgb(NAVY)).font("Helvetica-Bold").fontSize(7.5)
     .text("IMPORTANT:", 40, 150, { continued: true, width: 60 });
  doc.font("Helvetica").fillColor(rgb(GRAY))
     .text("  This checklist applies after you have self-deported or been released from the Laos Immigration Welcome Center, Lak 19, Ban Dong Makkai.", { continued: false, width: W - 100, lineBreak: false });

  // CHECKLIST SECTIONS
  const COL_W = (W - 60) / 2;
  const colX = [30, 30 + COL_W + 10];

  const block0H = 22 + weeks[0].items.length * 20 + 8;
  const block1H = 22 + weeks[1].items.length * 20 + 8;
  const block2H = 22 + weeks[2].items.length * 20 + 8;
  const block3H = 22 + weeks[3].items.length * 20 + 8;

  const START_Y = 182;
  const weekPositions = [
    { x: colX[0], y: START_Y },
    { x: colX[1], y: START_Y },
    { x: colX[0], y: START_Y + block0H + 8 },
    { x: colX[1], y: START_Y + block1H + 8 },
  ];
  const blockHeights = [block0H, block1H, block2H, block3H];

  for (let wi = 0; wi < weeks.length; wi++) {
    const week = weeks[wi];
    const { x, y } = weekPositions[wi];
    const blockH = blockHeights[wi];

    doc.rect(x, y, COL_W, 22).fill(rgb(week.accent));
    doc.fillColor(rgb(WHITE)).font("Helvetica-Bold").fontSize(8)
       .text(week.title, x + 8, y + 7, { width: COL_W - 16 });

    doc.rect(x, y + 22, COL_W, blockH - 22).fill(rgb(LGRAY));

    week.items.forEach((item, i) => {
      const iy = y + 22 + 4 + i * 20;
      doc.rect(x + 8, iy + 3, 10, 10).lineWidth(1).stroke(rgb(GRAY));
      doc.fillColor(rgb(NAVY)).font("Helvetica").fontSize(7.5)
         .text(item, x + 23, iy + 3, { width: COL_W - 30, height: 14, ellipsis: false });
    });

    doc.rect(x, y, COL_W, blockH).lineWidth(0.5).stroke(rgb({ r: 209, g: 213, b: 219 }));
  }

  const col0Bottom = START_Y + block0H + 8 + block2H + 8;
  const col1Bottom = START_Y + block1H + 8 + block3H + 8;
  let y = Math.max(col0Bottom, col1Bottom) + 8;

  // QUICK REFERENCE BOX
  const refH = 18 + resources.length * 18 + 8;
  doc.rect(30, y, W - 60, refH).fill(rgb(NAVY));

  doc.fillColor(rgb(GOLD)).font("Helvetica-Bold").fontSize(9)
     .text("ESSENTIAL CONTACTS & RESOURCES", 40, y + 8);

  resources.forEach(([label, value], i) => {
    const ry = y + 22 + i * 18;
    doc.fillColor(rgb(RED)).font("Helvetica-Bold").fontSize(8)
       .text(label.toUpperCase() + ":", 40, ry, { width: 75, lineBreak: false });
    doc.fillColor(rgb(WHITE)).font("Helvetica").fontSize(8)
       .text(value, 120, ry, { width: W - 160, lineBreak: false });
  });

  // FOOTER
  doc.rect(0, H - 38, W, 38).fill(rgb(NAVY));

  doc.fillColor(rgb(GRAY)).font("Helvetica").fontSize(7.5)
     .text(
       "Free resource from deportednotdefeated.com  |  Your story is not over.  |  Share freely with anyone who needs it.",
       30, H - 24, { width: W - 60, align: "center" }
     );

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="laos-restart-checklist.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
