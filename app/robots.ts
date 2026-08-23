import type { MetadataRoute } from "next";

const BASE = "https://www.deportednotdefeated.com";

/**
 * robots.txt
 *
 * The site previously shipped no robots file at all, which meant everything
 * was implicitly crawlable — including the affiliate redirect endpoints and
 * the admin area.
 *
 * This file changes nothing about how content pages are indexed. Every
 * country guide, resource page, and provider guide stays fully allowed. It
 * only excludes three groups of URLs that were never meant to be search
 * results (spec §29):
 *
 *   /go/     affiliate redirects — no content, and they must not compete
 *            with the guide pages that link to them. `/go` responses also
 *            carry `X-Robots-Tag: noindex, nofollow` for crawlers that
 *            reach them anyway.
 *   /admin/  operator interface, behind auth.
 *   /api/    JSON endpoints.
 *
 * The sitemap declaration is additive: `app/sitemap.ts` already existed and
 * is unchanged.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/go/", "/admin/", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
