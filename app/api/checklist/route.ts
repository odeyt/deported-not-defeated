// @ts-nocheck
import { NextResponse } from "next/server";
import { buildChecklistPdf } from "@/lib/checklist/buildChecklistPdf";

export const dynamic = "force-dynamic";

const weeks = [
  {
    title: "DAYS 1-3: LAND SAFE",
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
  { label: "Phone", value: "Unitel SIM -- best coverage. Buy at Talat Sao Mall." },
  { label: "Money", value: "Western Union at BCEL Bank. Bring passport + sender ref." },
  { label: "Legal", value: "US Embassy: +856 21 487000 (Mon-Fri 8am-5pm)" },
  { label: "Health", value: "Wattana Clinic: +856 21 413502 (English spoken)" },
  { label: "Emergency", value: "Police 191  |  Ambulance 195  |  Fire 190" },
  { label: "Community", value: "Caritas Laos: +856 21 413789 -- free support services" },
];

export async function GET() {
  const pdfBuffer = await buildChecklistPdf({
    metaTitle: "Laos Restart Checklist -- First 30 Days After Deportation",
    metaSubject: "Practical survival guide for deportees arriving in Laos",
    headerTitle: "LAOS RESTART CHECKLIST",
    headerSubtitle: "FIRST 30 DAYS AFTER DEPORTATION",
    quoteText: "Start with one safe place to sleep, one phone number, one step forward.",
    whoForText:
      "This checklist is for (1) self-deportees who have voluntarily returned and are currently in Laos, and (2) individuals who have been released from the Laos Immigration Welcome Center, Lak 19, Ban Dong Makkai. If you are still detained, please ask staff for assistance first.",
    sections: weeks,
    contacts: resources,
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
