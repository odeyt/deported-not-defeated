# Engineering & Product Decisions — DeportedNotDefeated.com

**Format:** Decision title → Context → Decision → Rationale → Consequences  
**Cross-References:** `ROADMAP.md`, `CHANGELOG.md`

This log records the significant decisions made during the design, architecture, and development of DeportedNotDefeated.com. Its purpose is to capture not just *what* was decided, but *why*, so that future contributors understand the reasoning and can make consistent decisions in adjacent areas.

Trivial implementation decisions are not logged here. Log decisions that: (a) had multiple viable alternatives, (b) will constrain future work, or (c) someone might reasonably question later.

---

## Decision Template

```
## D-[number]: [Short title]
**Date:** YYYY-MM-DD
**Status:** Active | Superseded by D-[number] | Deprecated
**Decision Maker:** [Role]

### Context
[What situation prompted this decision? What problem was being solved?]

### Decision
[Exactly what was decided.]

### Rationale
[Why this option over the alternatives? What alternatives were considered?]

### Consequences
[What does this decision make easier? What does it constrain? What are the known trade-offs?]
```

---

## D-001: Country-First Architecture

**Date:** 2026 (initial design)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
The platform serves users in 45 different countries, each with completely different practical situations. Initial design had to choose between organizing content by topic ("Housing", "Banking", "Healthcare" as top-level sections) or by country ("Mexico", "El Salvador" as top-level sections with sub-topics underneath).

### Decision
Country-first architecture. Country slugs (`/mexico`, `/el-salvador`) are the primary navigation pattern. Topics (housing, banking, healthcare) are sub-pages under each country.

### Rationale
- **User intent is country-specific.** A person deported to Mexico and a person deported to Cambodia have zero overlapping practical needs. Housing in Mexico City is not housing in Phnom Penh.
- **SEO is country-specific.** Search queries are "housing for deportees in Phnom Penh" not "housing for deportees" (too broad).
- **Topic-first creates a false hierarchy.** A generic "Healthcare" hub would be misleading — healthcare resources for Nigeria are irrelevant to someone in Mexico. Forcing country selection before content prevents wasted time.
- **Alternative considered:** Topic-first with country filter. Rejected because it requires users to know to filter, and the filtering UI is complex on mobile.

### Consequences
- Makes it easy to add depth to individual countries
- Makes cross-country comparison harder (acceptable trade-off — users rarely need this)
- Requires 45 country data files rather than shared topic data — more upfront work but cleaner separation

---

## D-002: Static Country Data Files Over CMS-Driven Content

**Date:** 2026 (initial design)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
Country guide content (airport names, hospital names, cost of living estimates, emergency numbers) needed to be stored somewhere. Options: Supabase database, CMS (Contentful, Sanity), or static TypeScript files in the repo.

### Decision
Static TypeScript files in `/data/countries/[slug].ts`. One file per country, exporting a typed `CountryData` object.

### Rationale
- **Type safety.** TypeScript interfaces catch missing fields at build time, not runtime.
- **Version control.** All content changes are tracked in git — who changed what, when, and why.
- **Zero latency.** Static files are bundled at build time — no database query for country data.
- **No external dependency.** CMS services have pricing models that add cost and a third-party failure point.
- **Simplicity.** A TypeScript file with named exports is understandable by any developer without CMS training.
- **Alternative considered:** Supabase for country data. Rejected because country data changes infrequently, doesn't need real-time updates, and is better version-controlled in the repo.

### Consequences
- Country content editing requires a code change and deployment (acceptable — content changes are infrequent)
- Non-technical editors cannot update country content without developer help (acceptable for now; future CMS layer can be added if needed)
- Content is always consistent — no risk of database/UI divergence

---

## D-003: Supabase for Dynamic Content (Affiliates, Directory, Users)

**Date:** 2026 (initial design)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
Some content changes frequently and needs to be editable by non-developers: affiliate partner status, directory listings, subscriber list, contact form submissions, affiliate click tracking.

### Decision
Supabase (PostgreSQL + Auth + Row Level Security) for all dynamic, operational data.

### Rationale
- **Real-time update capability.** Affiliate status can change without a deployment.
- **Non-developer editing.** Admin CMS allows non-technical content management.
- **Auth built-in.** Supabase Auth handles admin authentication without building a custom auth system.
- **Row Level Security.** Database-level access control — admin-only tables are protected at the database layer, not just the application layer.
- **Generous free tier.** Supabase's free tier is sufficient for the platform's current scale.
- **Alternative considered:** PlanetScale, Neon, Prisma + hosted Postgres. All were viable; Supabase was chosen for the integrated Auth and admin dashboard for direct SQL queries.

### Consequences
- Supabase dependency — if Supabase changes pricing or has outages, it affects the platform
- Admin interface is custom-built (not a third-party CMS dashboard) — more development work upfront, more control long-term

---

## D-004: Affiliate Link Routing Through /go/[slug]

**Date:** 2026 (initial design)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
Affiliate links need to be tracked (for analytics), be human-readable (for trust), and be easy to change (when affiliate URLs change, without updating every page that uses them).

### Decision
All affiliate links route through `/go/[slug]` where slug is the partner's slug in Supabase. The redirect page logs the click to `affiliate_clicks` table, then does an HTTP redirect to the affiliate URL.

### Rationale
- **Centralized click tracking.** Every click through `/go/slug` is logged with the referrer, page path, and timestamp — regardless of where the link appears on the site.
- **Centralized URL management.** If an affiliate URL changes, update it in Supabase — all links across the site are automatically updated.
- **Cleaner URLs for users.** `/go/wise` is more readable and trustworthy than a full affiliate URL with tracking parameters.
- **Fallback handling.** If a partner is not yet approved, the redirect page can fall back to the official website URL instead of a dead affiliate link.

### Consequences
- Adds one server round-trip for every affiliate click
- Requires Supabase to be available for affiliate redirects to work correctly
- Creates a clear audit trail for affiliate revenue attribution

---

## D-005: Knowledge Center Over Traditional Blog

**Date:** 2026 (planning)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
The platform needs content at scale for SEO and user value. Two common approaches: a traditional blog (reverse-chronological, author-driven) or a structured knowledge base (topic-organized, evergreen).

### Decision
Knowledge Center: a structured, topic-organized library of evergreen articles, not a blog.

### Rationale
- **Evergreen content compounds.** An article about "How to get a Mexican national ID" written today is still accurate in 3 years. A blog post about "What deportees should know in 2024" is stale by 2025.
- **Topic organization matches user intent.** Users search by topic ("how to open bank account Guatemala") not by recency ("latest deportation news").
- **SEO architecture.** A structured category hierarchy with consistent URL patterns (`.../knowledge-center/money/bank-account-guatemala`) is stronger for SEO than blog posts.
- **Avoids the news trap.** A blog implies the need for frequent publishing — often at the cost of quality. The Knowledge Center model favors fewer, better articles.
- **Alternative considered:** Standard blog (`/blog`). Rejected because it implies time-sensitive content and creates pressure for quantity over quality.

### Consequences
- Requires more upfront planning (category structure, tagging system)
- Articles need periodic review to stay evergreen — more maintenance than blog posts that can just be left
- No reverse-chronological feed (acceptable — users are not visiting for news)

---

## D-006: Educational Legal Content, Never Legal Advice

**Date:** 2026 (initial design)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
Legal questions are among the most common and important questions deported individuals have. The platform wanted to be genuinely useful on legal topics while avoiding liability from providing legal advice.

### Decision
All legal content is framed as educational and informational only. Every legal page includes a prominent disclaimer: "This is not legal advice. Consult a qualified immigration attorney for advice specific to your situation." The AI immigration assessment is also framed as educational.

### Rationale
- **Liability protection.** Providing legal advice without a law license creates serious legal exposure for the platform.
- **Accuracy constraint.** Legal situations are highly individual — a general statement that is accurate for 90% of cases could be actively harmful for the 10%.
- **Trust through honesty.** Being clear about what the platform is and is not (not a law firm) actually builds more trust than overpromising.
- **Attorney directory integration.** The educational content leads naturally to attorney referrals — which is both the right next step for the user and a future revenue stream.

### Consequences
- Cannot provide definitive legal answers (users may find this frustrating)
- Creates clear liability boundary
- Establishes clear referral path to attorneys

---

## D-007: Reusable Affiliate System Design

**Date:** 2026 (initial design)  
**Status:** Active  
**Decision Maker:** Project Lead

### Context
The platform needed to display affiliate partners across many different contexts: resource category pages, country guide pages, family visit travel page, career page. Each context had slightly different design requirements but fundamentally the same data.

### Decision
A unified Supabase `affiliate_partners` table drives all affiliate displays. Status, URL, priority, and content are managed centrally. Multiple component variants (`AffiliateCard`, `TravelProviderCard`, `CareerAffiliatCard`) read from the same data model but apply context-specific visual treatments.

### Rationale
- **Single source of truth.** When an affiliate URL changes, update it once in Supabase — all instances are updated.
- **Consistent status management.** The `affiliate_status` field controls whether a live affiliate URL or fallback URL is used — consistent everywhere.
- **Click tracking everywhere.** The `/go/[slug]` pattern tracks every affiliate click regardless of which component rendered it.
- **Context-specific presentation.** Travel cards, career cards, and resource cards have different visual treatments because the context is different — but the underlying data is the same.

### Consequences
- More complex initial architecture than simple hardcoded links
- Enables sophisticated affiliate management at scale
- Admin can manage all affiliates from one place

---

## D-008: Client vs. Server Component Boundary (Next.js App Router)

**Date:** 2026 (development)  
**Status:** Active  
**Decision Maker:** Development

### Context
Next.js 14 App Router distinguishes between server components (default, cannot use React state or event handlers) and client components (`"use client"`, can use hooks and event handlers). The platform initially placed event handlers inside server components, causing build failures.

### Decision
- Server components: All data fetching, static content, country guides, resource pages
- Client components: Any component with `useState`, `useEffect`, event handlers (`onClick`, `onSubmit`), or browser APIs
- Specific client components: `FamilyVisitFAQ`, `FamilyVisitEmailForm`, `TravelBudgetCalculator`, `ImmigrationAssessmentModal`, `ChecklistGate`, `CountrySearch`, `DirectorySearch`

### Rationale
- **Performance.** Server components reduce JavaScript bundle size and improve initial page load — critical for users on slow connections.
- **Correctness.** Next.js enforces this boundary — attempting to use event handlers in server components causes build failures.
- **Data access.** Supabase server client (using cookies for auth context) can only be used in server components.

### Consequences
- Must be intentional about which components need client-side interactivity
- Cannot pass event handlers as props from server to client components
- Client components must be extracted into separate files with `"use client"` directive

---

## D-009: Static Generation with generateStaticParams for Country Pages

**Date:** 2026 (development)  
**Status:** Active  
**Decision Maker:** Development

### Context
Country pages (`/[country]`) are accessed very frequently. They could be rendered on demand (SSR) or pre-rendered at build time (SSG).

### Decision
Static generation via `generateStaticParams()` for all 45 country pages. The function exports all country slugs, causing Next.js to pre-render every country page at build time.

### Rationale
- **Performance.** Pre-rendered HTML is served instantly from CDN — no server processing per request.
- **Reliability.** Static pages do not fail if Supabase has an outage (country data is static).
- **SEO.** Search engines prefer fast-loading, server-rendered HTML.
- **Scale.** 45 pages is well within Next.js's static generation capacity.

### Consequences
- Country content updates require a deployment to take effect (acceptable for infrequent content changes)
- Build time increases slightly with 45+ static pages (acceptable)
- If the country list grows significantly (100+ countries), build time may need monitoring

---

## D-010: Static Generation Timeout Fix (Family Visit Travel)

**Date:** 2026-06-28  
**Status:** Active  
**Decision Maker:** Development

### Context
The initial implementation of `/family-visit-travel` embedded all 45 `CountryVisitSection` components inline on the page. This caused Next.js's static generation worker to timeout (60-second limit) because rendering 45 complex components in a single static page exceeded the time limit.

### Decision
1. Removed the inline country sections from `/family-visit-travel`
2. Moved country-specific visit information to each `/[country]` page via `CountryVisitSection`
3. Changed the country selector on `/family-visit-travel` from anchor links (`#country-slug`) to `<Link href="/{slug}">` navigation

### Rationale
- **Timeout resolution.** Distributing the work across 45 separate static pages (each country page) eliminates the single-page timeout.
- **Better architecture.** Country-specific travel information logically belongs on the country page, not on the general travel hub.
- **Better UX.** Country pages now surface travel information to users who arrived via country search, not just those who navigated through the family travel hub.
- **Alternative considered:** Opt-in to dynamic rendering for the family travel page (`export const dynamic = 'force-dynamic'`). Rejected because it would slow the page and lose CDN caching.

### Consequences
- Family travel page is now a hub (not a single comprehensive guide)
- Country-specific travel detail is distributed across 45 country pages
- Better separation of concerns between the hub and the detail

---

## D-011: Impact.com Verification via React.createElement

**Date:** 2026-06-29  
**Status:** Active  
**Decision Maker:** Development

### Context
Impact.com's website verification requires a `<meta>` tag with a non-standard `value=` attribute (not `content=`). TypeScript rejects `value` as an unknown attribute on `<meta>` elements. The `metadata.other` field in Next.js generates `content=` not `value=`.

### Decision
Use `React.createElement("meta", { name: "impact-site-verification", value: "..." } as React.HTMLAttributes<HTMLMetaElement>)` inside a `<head>` block in the root layout. This bypasses TypeScript's JSX type checking while rendering the `value=` attribute correctly in server-side HTML.

### Rationale
- TypeScript's JSX types don't include `value` for `<meta>` elements, but React passes unknown attributes through to the DOM in production
- `metadata.other` always generates `content=` — unsuitable for Impact.com's non-standard requirement
- The `as React.HTMLAttributes<HTMLMetaElement>` cast is the minimum override needed; doesn't affect runtime behavior

### Consequences
- Non-standard workaround that future TypeScript or React updates could theoretically break
- Impact.com verification passes with the `value=` attribute rendered correctly
- Should be reviewed if React's attribute handling for unknown props changes

---

*This log is maintained as decisions are made. Add new entries when significant decisions are made during feature development.*
