import { MetadataRoute } from "next";
import { allCountries } from "@/data/countries/index";
import { KNOWLEDGE_CATEGORIES } from "@/lib/knowledgeCenter/categories";
import { getAllPublishedArticleParams } from "@/lib/knowledgeCenter/service";

const BASE = "https://www.deportednotdefeated.com";

async function knowledgeCenterPages(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/knowledge-center`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...KNOWLEDGE_CATEGORIES.map((category) => ({
      url: `${BASE}/knowledge-center/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  try {
    const articles = await getAllPublishedArticleParams();
    return [
      ...staticPages,
      ...articles.map(({ category, slug }) => ({
        url: `${BASE}/knowledge-center/${category}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // Falls back to the hub + category pages only — the sitemap must never
    // fail to build because an article lookup failed.
    return staticPages;
  }
}

function countryPages(country: string, capital: string): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/${country}/first-30-days`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/${country}/housing-${capital}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/${country}/sim-card-${country}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/${country}/receive-money-usa-to-${country}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/${country}/find-work-${country}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/${country}/cost-of-living-${capital}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/${country}/emergency-numbers-${country}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/${country}/hospitals-${capital}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/${country}/start-over-after-deportation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // Knowledge Center hub, categories, and published articles
    ...(await knowledgeCenterPages()),

    // Country Guides index
    { url: `${BASE}/country-guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },

    // First-party tools
    { url: `${BASE}/tools/return-home-cost`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // All 45 country landing pages (dynamic [country] route)
    ...allCountries.map((c) => ({
      url: `${BASE}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),

    // Laos sub-pages (laos landing page is included via allCountries.map above)
    { url: `${BASE}/laos/first-30-days`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/laos/directory`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/laos/housing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/jobs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/legal-help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/healthcare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/banking-money`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/laos/phone-internet`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/laos/transportation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/laos/housing-after-deportation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/sim-card-laos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/receive-money-usa-to-laos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/find-work-laos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/cost-of-living-vientiane`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/emergency-numbers-laos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/laos/hospitals-vientiane`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/laos/start-over-after-deportation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Cambodia (10 pages)
    ...countryPages("cambodia", "phnom-penh"),

    // Vietnam (10 pages)
    ...countryPages("vietnam", "ho-chi-minh-city"),

    // Philippines (10 pages)
    ...countryPages("philippines", "manila"),

    // Mexico (10 pages)
    ...countryPages("mexico", "mexico-city"),

    // El Salvador (10 pages)
    ...countryPages("el-salvador", "san-salvador"),

    // Guatemala (10 pages)
    ...countryPages("guatemala", "guatemala-city"),

    // Resources
    { url: `${BASE}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/resources/money-transfer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resources/money-transfer/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resources/money-transfer/wise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/remitly`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/worldremit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/moneygram`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/western-union`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/ria`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/xe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/xoom`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/instarem`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/ofx`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/payoneer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/money-transfer/paysend`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources/phone-internet`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resources/vpn-privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resources/health-insurance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Static pages
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
