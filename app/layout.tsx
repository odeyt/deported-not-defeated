import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import TravelpayoutsDrive from "@/components/TravelpayoutsDrive";
import FloatingReportButton from "@/components/FloatingReportButton";

// Canonical production host. Verified 2026-08-24: the apex issues a 308 to
// this host, so `www` is canonical and every generated URL must use it.
// Mixed apex/www output splits ranking signals and makes every sitemap URL a
// redirect, which is what M-AFFILIATE0 found.
const SITE_URL = "https://www.deportednotdefeated.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    // "./" resolves against the current route, so every page gets its own
    // canonical without repeating one in 120 files. A hardcoded absolute
    // canonical here would point every page at the homepage.
    canonical: "./",
  },
  title: {
    default: "Deported Not Defeated | Rebuilding Life After Deportation",
    template: "%s | Deported Not Defeated",
  },
  description:
    "Practical guides, directories, and resources for people rebuilding life after deportation. 45+ countries covered.",
  keywords: ["deportation", "deported", "rebuilding life", "immigrant resources", "deportee guide"],
  verification: {
    google: "bwxhDrsp543XbhFozXrAC42p9tz4cpuZaGWBoWy-Tn4",
  },
  openGraph: {
    title: "Deported Not Defeated",
    description:
      "Your story is not over. Start again with dignity, direction, and support.",
    url: "https://www.deportednotdefeated.com",
    siteName: "Deported Not Defeated",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Impact.com requires value= attribute (non-standard) — must use createElement to bypass TypeScript */}
        {React.createElement("meta", {
          name: "impact-site-verification",
          value: "d90164b1-8cdc-4be8-be96-4b0c3053d33b",
        } as React.HTMLAttributes<HTMLMetaElement>)}
      </head>
      <body>
        <Analytics />
        <TravelpayoutsDrive />
        <Navbar />
        {children}
        <Footer />
        <FloatingReportButton />
      </body>
    </html>
  );
}
