# Information Architecture — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active  
**Cross-References:** `01_Product_Strategy.md`, `03_UI_Design_System.md`, `ROADMAP.md`

---

## Table of Contents

1. [IA Principles](#ia-principles)
2. [Complete Sitemap](#complete-sitemap)
3. [URL Hierarchy](#url-hierarchy)
4. [Breadcrumb Structure](#breadcrumb-structure)
5. [Navigation Structure](#navigation-structure)
6. [Internal Linking Strategy](#internal-linking-strategy)
7. [Content Relationships](#content-relationships)
8. [Future IA Expansion](#future-ia-expansion)

---

## IA Principles

1. **Country-first architecture.** The most valuable information is always country-specific. Every journey to generic content should offer a path to country-specific content.
2. **Flat hierarchy for primary sections.** Primary sections (Resources, Legal, Career) are one click from the homepage, not buried.
3. **Progressive depth.** Country index → Country guide → Sub-topic → Specific article. Users can exit at any depth.
4. **No orphan pages.** Every page links to at least 2–3 related pages and is reachable from navigation.
5. **URLs reflect content.** Every URL should be readable and descriptive without requiring site context.
6. **SEO-friendly slugs.** All URLs use lowercase kebab-case, no query strings in primary content URLs.

---

## Complete Sitemap

### Main Navigation

```
/ (Homepage)
├── /country-guides          (All 45 countries index with search/filter)
├── /resources               (Affiliate resource hub)
├── /family-visit-travel     (Family visit planning page)
├── /career-education        (Career & education resources)
├── /legal-resources         (Legal educational content)
├── /ai-report               (Free AI immigration assessment)
├── /about                   (About the platform)
└── /contact                 (Contact form)
```

### Country Guides (45 Countries)

Pattern: `/[country-slug]/` with sub-pages per country

```
/mexico
  /mexico/first-30-days
  /mexico/housing-mexico-city
  /mexico/find-work-mexico
  /mexico/banking-money
  /mexico/healthcare
  /mexico/phone-internet
  /mexico/transportation
  /mexico/legal-help
  /mexico/emergency-numbers-mexico
  /mexico/cost-of-living-mexico-city
  /mexico/start-over-after-deportation
  /mexico/directory

/el-salvador
  /el-salvador/first-30-days
  /el-salvador/housing-san-salvador
  /el-salvador/find-work-el-salvador
  [same sub-page pattern]

/guatemala
  /guatemala/first-30-days
  [same sub-page pattern]

/laos                    ← Most developed (15+ sub-pages)
  /laos/first-30-days
  /laos/housing
  /laos/housing-after-deportation
  /laos/find-work-laos
  /laos/banking-money
  /laos/healthcare
  /laos/hospitals-vientiane
  /laos/phone-internet
  /laos/sim-card-laos
  /laos/transportation
  /laos/legal-help
  /laos/emergency-numbers-laos
  /laos/cost-of-living-vientiane
  /laos/receive-money-usa-to-laos
  /laos/start-over-after-deportation
  /laos/directory
  /laos/resources
  /laos/jobs

/cambodia
  /cambodia/first-30-days
  /cambodia/housing-phnom-penh
  /cambodia/find-work-cambodia
  /cambodia/hospitals-phnom-penh
  /cambodia/sim-card-cambodia
  /cambodia/emergency-numbers-cambodia
  /cambodia/cost-of-living-phnom-penh
  /cambodia/receive-money-usa-to-cambodia
  /cambodia/start-over-after-deportation

/vietnam
  [similar structure to Cambodia]

/philippines
  [similar structure to Cambodia]

/honduras
/belize
/nicaragua
/costa-rica
/panama
/jamaica
/dominican-republic
/haiti
/cuba
/bahamas
/trinidad-and-tobago
/colombia
/venezuela
/brazil
/peru
/ecuador
/guyana
/thailand
/myanmar
/indonesia
/nepal
/india
/pakistan
/bangladesh
/china
/nigeria
/ghana
/liberia
/cameroon
/ethiopia
/somalia
/sierra-leone
/united-kingdom
/romania
/albania
/poland
/ukraine
/russia
  ↑ These countries currently have primary guide page only
  ↑ Sub-pages to be developed by priority order
```

### Resources (Affiliate Directory)

```
/resources
├── /resources/money-transfer
│   ├── /resources/money-transfer/compare
│   ├── /resources/money-transfer/wise
│   ├── /resources/money-transfer/remitly
│   ├── /resources/money-transfer/worldremit
│   ├── /resources/money-transfer/moneygram
│   ├── /resources/money-transfer/western-union
│   ├── /resources/money-transfer/ria
│   ├── /resources/money-transfer/xe
│   ├── /resources/money-transfer/ofx
│   ├── /resources/money-transfer/paysend
│   ├── /resources/money-transfer/xoom
│   ├── /resources/money-transfer/payoneer
│   └── /resources/money-transfer/instarem
├── /resources/phone-internet
├── /resources/vpn-privacy
├── /resources/health-insurance
└── /resources/[slug]     (dynamic — any affiliate partner page)
```

### Family Visit Travel

```
/family-visit-travel
  (No sub-pages — country-specific data lives on each /[country] page)
  (CountryVisitSection component embedded on all 45 country pages)
```

### Career & Education

```
/career-education
  (No sub-pages currently)
  (CountryCareerSection component embedded on each country page)
```

### Legal Resources

```
/legal-resources
└── /legal-resources/can-deported-person-return-to-usa
    [More articles to be added as Knowledge Center develops]
```

### AI Tools

```
/ai-report
```

### Stories

```
/stories
└── /stories/[slug]    (Future — individual story pages)
```

### Company Pages

```
/about
/contact
/affiliate-disclosure
/privacy
/terms
```

### Admin (Protected)

```
/admin
├── /admin/login
├── /admin/logout
├── /admin/affiliates
│   ├── /admin/affiliates/new
│   └── /admin/affiliates/[id]
│       └── /admin/affiliates/[id]/edit
├── /admin/affiliate-applications
├── /admin/affiliate-clicks
├── /admin/listings
│   ├── /admin/listings/new
│   └── /admin/listings/[id]
│       └── /admin/listings/[id]/edit
├── /admin/articles
│   └── /admin/articles/[id]
├── /admin/messages
├── /admin/subscribers
└── /admin/immigration-assessments
```

### System Routes

```
/go/[slug]             (Affiliate link redirect — tracks clicks, forwards to affiliate URL)
/api/subscribe         (POST — newsletter signup)
/api/immigration-assessment  (POST — AI report generation)
/api/checklist         (GET — PDF checklist download)
```

---

## URL Hierarchy

### Level 1 (Top-Level Sections)
Direct children of `/` — maximum 8 primary sections accessible from main navigation:
- `/country-guides`
- `/resources`
- `/family-visit-travel`
- `/career-education`
- `/legal-resources`
- `/ai-report`
- `/about`
- `/contact`

### Level 2 (Primary Section Content)
- Country guides: `/[country]` (e.g., `/mexico`)
- Resource categories: `/resources/[category]` (e.g., `/resources/money-transfer`)
- Legal articles: `/legal-resources/[article-slug]`
- Stories: `/stories/[story-slug]`

### Level 3 (Sub-Content)
- Country sub-pages: `/[country]/[topic]` (e.g., `/mexico/first-30-days`)
- Provider pages: `/resources/money-transfer/[provider]` (e.g., `/resources/money-transfer/wise`)
- Admin detail: `/admin/[section]/[id]`

### Level 4 (Nested Actions)
- Edit pages: `/admin/[section]/[id]/edit`
- Compare pages: `/resources/[category]/compare`

### URL Rules

1. **Always lowercase.** `/mexico` not `/Mexico`
2. **Hyphens, not underscores.** `/el-salvador` not `/el_salvador`
3. **Descriptive slugs.** `/resources/money-transfer/wise` not `/resources/partners/4`
4. **No trailing slash.** `/mexico` not `/mexico/`
5. **No query strings for primary content.** Filters and search state use client-side state, not URL params (except for deep-link-worthy state like search queries)
6. **Avoid numeric IDs in user-facing URLs.** Admin routes may use IDs; public routes should always use slugs

---

## Breadcrumb Structure

Breadcrumbs provide hierarchical context for deep pages. They appear between the navbar and the page H1.

### Standard Breadcrumb Patterns

**Country sub-page:**
```
Home → [Country Name] → [Sub-page Title]
/     → /mexico       → First 30 Days
```

**Resource provider page:**
```
Home → Resources → Money Transfer → Wise
/     → /resources → /resources/money-transfer → /resources/money-transfer/wise
```

**Legal article:**
```
Home → Legal Resources → [Article Title]
/     → /legal-resources → /legal-resources/can-deported-person-return-to-usa
```

**Knowledge Center article (planned):**
```
Home → Knowledge Center → [Category] → [Article Title]
```

### Breadcrumb Implementation Notes
- Use `<nav aria-label="Breadcrumb">` with `<ol>` list
- Final item: `aria-current="page"`, no link (not clickable)
- Separator: `/` in `text-gray-300`
- Link style: `text-gray-500 hover:text-navy-800`
- Current page: `text-gray-800 font-medium`

---

## Navigation Structure

### Primary Navigation (Desktop)

The Navbar exposes all primary sections. Navigation hierarchy is flat by design — no nested dropdowns except for the Countries dropdown (which links to the countries index, not individual countries).

```
[Logo] | Countries ▾ | Resources | Family Visit | Career & Education | Legal Resources | Free Report | About | Contact | [Get Started CTA]
```

**Countries dropdown:**
- Contains "View All Country Guides →" (links to `/country-guides`)
- Does NOT list all 45 countries (too long)
- Future consideration: region-based quick links

### Mobile Navigation

Hamburger → Full-screen overlay with all nav links as large tappable targets.

### Secondary Navigation (In-Page)

Some long pages use sticky in-page navigation (section tabs or jump links) to help users navigate within the page:
- `/resources` — sticky category tabs (Money Transfer, Phone & Internet, VPN, Health Insurance)
- `/family-visit-travel` — section anchors (Flights, Hotels, Insurance, etc.)
- `/career-education` — section anchors (Courses, Remote Work, Business Tools)

### Footer Navigation

Supplementary navigation for company pages, resource categories, and featured countries. Not a substitute for primary navigation.

---

## Internal Linking Strategy

Internal links serve two purposes: user navigation and SEO signal distribution. Both are important.

### Linking Rules

1. **Country guides link to resource pages.** Every country guide should link to at least 2–3 relevant resource pages (e.g., `/mexico` links to `/resources/money-transfer` and `/resources/phone-internet`).

2. **Resource pages link to country guides.** Provider pages should link to country guides for the countries where the provider is most relevant (e.g., Remitly page links to `/mexico`, `/el-salvador`, `/guatemala`).

3. **Legal content links to country guides and AI report.** After explaining a legal concept, link to the relevant country guides for practical next steps, and to `/ai-report` for personalized assessment.

4. **Career content links to remote work resources.** The career section links to Upwork, Fiverr, and platform resources that enable remote income.

5. **Family visit travel links to individual country pages.** The country selector on `/family-visit-travel` links to `/[country]` where the `CountryVisitSection` component provides country-specific visit information.

6. **Every page links to newsletter or checklist.** At minimum, every page should offer the user a way to stay connected (subscribe) or get immediate value (download checklist).

7. **AI report is linked from legal content, country guides, and navigation.** This is the platform's highest-value conversion action for legal intent.

### Priority Internal Link Placements

| Source Page | Target Page | Reason |
|------------|------------|--------|
| Homepage | Country guides | Primary user path |
| Homepage | Resources | Revenue path |
| Homepage | AI report | High-value conversion |
| Country guide | Money transfer resource | Immediate user need |
| Country guide | Phone/internet resource | Immediate user need |
| Country guide | Family visit travel | Cross-segment serve |
| Country guide | Career section | Long-term user need |
| Legal resources | AI report | Legal intent → conversion |
| Legal resources | Country guides | Practical next steps |
| Resources | Country guides | Context and relevance |
| Career page | Resources (VPN, tools) | Remote work enablement |
| Family travel | Country guide | Specific visit info |

---

## Content Relationships

### Hub and Spoke Architecture

The platform uses a hub-and-spoke content model:

```
Homepage (hub)
├── Country Guides (45 hubs, each a hub for that country's content)
│   ├── First 30 Days (spoke)
│   ├── Housing (spoke)
│   ├── Employment (spoke)
│   ├── Healthcare (spoke)
│   ├── Banking (spoke)
│   └── Phone/Internet (spoke)
├── Resources Hub
│   └── Category pages → Provider pages (spokes)
├── Knowledge Center Hub (planned)
│   └── Category pages → Articles (spokes)
└── Family Visit Travel (hub for family journey)
    └── Country-specific visit sections on each /[country] page
```

### Cross-Referencing Pattern

Every spoke page should link back to its hub (for navigation), forward to at least one resource (for conversion), and laterally to 1–2 related spokes (for depth and SEO).

**Example for `/mexico/first-30-days`:**
- Back to hub: `/mexico`
- Resources: `/resources/phone-internet`, `/resources/money-transfer`
- Related spokes: `/mexico/housing-mexico-city`, `/mexico/banking-money`
- Cross-section: `/family-visit-travel` (for family visiting)

---

## Future IA Expansion

### Knowledge Center (Phase 2)

When the Knowledge Center launches, it will require a new Level 2 section:

```
/knowledge-center
├── /knowledge-center/legal
│   ├── /knowledge-center/legal/self-deporting-guide
│   ├── /knowledge-center/legal/10-year-bar-explained
│   └── [40+ articles]
├── /knowledge-center/money
│   └── [30+ articles]
├── /knowledge-center/housing
│   └── [30+ articles]
├── /knowledge-center/jobs
│   └── [40+ articles]
├── /knowledge-center/family
│   └── [30+ articles]
├── /knowledge-center/travel
│   └── [20+ articles]
├── /knowledge-center/healthcare
│   └── [30+ articles]
├── /knowledge-center/mental-health
│   └── [20+ articles]
├── /knowledge-center/technology
│   └── [20+ articles]
├── /knowledge-center/starting-over
│   └── [30+ articles]
├── /knowledge-center/success-stories
│   └── [ongoing]
└── /knowledge-center/news
    └── [ongoing]
```

### Attorney Directory (Phase 2)

```
/attorneys
├── /attorneys/[country-slug]    (Country-specific attorney lists)
└── /attorneys/[attorney-slug]   (Individual attorney profile)
```

### Employer Marketplace (Phase 3)

```
/jobs
├── /jobs/[country-slug]         (Jobs in specific country)
└── /jobs/[job-slug]             (Individual job listing)
```

### Success Stories (Phase 3)

```
/stories
├── /stories/[country-slug]      (Stories from specific country)
└── /stories/[story-slug]        (Individual story)
```

### Spanish Language (Phase 4)

```
/es/                             (Spanish homepage)
├── /es/guias-por-pais          (Country guides in Spanish)
├── /es/[country-slug]           (Spanish country pages, same slug)
└── [All primary sections mirrored]
```

**Approach:** Language prefix (`/es/`) for Spanish content. Same slugs, different language. `hreflang` tags for SEO.

---

*Document End — Version 1.0*
