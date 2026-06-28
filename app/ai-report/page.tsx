import type { Metadata } from "next";
import AIReportLanding from "@/components/AIReportLanding";

export const metadata: Metadata = {
  title: "Free AI Immigration Case Preparation Report | Deported Not Defeated",
  description:
    "Answer 16 short questions and receive a personalized educational PDF report with topics relevant to your deportation case, 10 attorney questions, documents to gather, and suggested next steps. Free. Educational only.",
};

export default function AIReportPage() {
  return <AIReportLanding />;
}
