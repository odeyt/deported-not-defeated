import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import FloatingReportButton from "@/components/FloatingReportButton";

export const metadata: Metadata = {
  title: {
    default: "Deported Not Defeated | Rebuilding Life After Deportation",
    template: "%s | Deported Not Defeated",
  },
  description:
    "Practical guides, directories, and resources for people rebuilding life after deportation, starting with Laos.",
  keywords: ["deportation", "deported", "Laos", "rebuilding life", "immigrant resources"],
  verification: {
    google: "bwxhDrsp543XbhFozXrAC42p9tz4cpuZaGWBoWy-Tn4",
  },
  openGraph: {
    title: "Deported Not Defeated",
    description:
      "Your story is not over. Start again with dignity, direction, and support.",
    url: "https://deportednotdefeated.com",
    siteName: "Deported Not Defeated",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingReportButton />
      </body>
    </html>
  );
}
