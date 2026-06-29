# Product Roadmap — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active  
**Cross-References:** `01_Product_Strategy.md`, `05_Information_Architecture.md`, `DECISIONS.md`

---

## Table of Contents

1. [Roadmap Philosophy](#roadmap-philosophy)
2. [Phase 1 — Foundation (Current)](#phase-1--foundation-current)
3. [Phase 2 — Content & Monetization](#phase-2--content--monetization)
4. [Phase 3 — Community & Commerce](#phase-3--community--commerce)
5. [Phase 4 — Scale & Language](#phase-4--scale--language)
6. [Phase 5 — Platform & SaaS](#phase-5--platform--saas)
7. [Complexity Ratings](#complexity-ratings)

---

## Roadmap Philosophy

This roadmap is organized by strategic phase, not by calendar date. Each phase has clear dependencies on the previous phase — do not begin Phase 3 work until Phase 2 is substantially complete.

**Priority framework:** Each feature is evaluated on two dimensions:
- **Mission Impact** (H/M/L) — How directly does this help deported individuals rebuild?
- **Revenue Potential** (H/M/L) — How directly does this generate sustainable revenue?

Features with High Mission Impact AND High Revenue Potential are always done first.

**Complexity ratings:** See the [Complexity Ratings](#complexity-ratings) section at the bottom of this document.

---

## Phase 1 — Foundation (Current)

**Goal:** Build the core platform with all primary sections, affiliate system, AI tool, and admin CMS. Generate initial traffic and affiliate revenue.

**Status:** Substantially complete. Ongoing refinements.

### Completed Features

| Feature | Mission Impact | Revenue Potential | Status |
|---------|---------------|-------------------|--------|
| 45 Country Guides (dynamic routing) | H | H | ✅ Live |
| Homepage with hero, values, country grid | H | M | ✅ Live |
| Resources Hub (4 categories) | H | H | ✅ Live |
| Money Transfer section (13 providers) | H | H | ✅ Live |
| Money Transfer comparison table | H | M | ✅ Live |
| Phone & Internet / eSIM section | H | H | ✅ Live |
| VPN & Privacy section | M | M | ✅ Live |
| Health Insurance section | H | H | ✅ Live |
| Affiliate system (Supabase-driven) | H | H | ✅ Live |
| Affiliate click tracking | M | H | ✅ Live |
| /go/[slug] redirect + tracking | M | H | ✅ Live |
| Admin CMS (all modules) | M | H | ✅ Live |
| AI Immigration Assessment | H | M | ✅ Live |
| Free PDF Checklist (email gate) | H | M | ✅ Live |
| Newsletter signup + Resend integration | M | M | ✅ Live |
| Business Directory (Laos primary) | H | L | ✅ Live |
| Family Visit Travel page | H | H | ✅ Live |
| Career & Education page | H | M | ✅ Live |
| Legal Resources hub + first article | H | M | ✅ Live |
| Stories landing page | H | L | ✅ Live (placeholder) |
| Contact form | L | L | ✅ Live |
| Affiliate disclosure page | L | L | ✅ Live |
| Not-found (404) page | L | L | ✅ Live |
| Analytics (GA4 + Clarity) | L | H | ✅ Live |
| Google Search Console verification | L | H | ✅ Live |
| Impact.com verification | L | M | ✅ Live |

### Phase 1 Remaining Items

| Feature | Priority | Complexity | Notes |
|---------|----------|-----------|-------|
| Deep sub-pages for Honduras, DR, India, Philippines | H | Medium | Per country, ~5 sub-pages each |
| Country-specific PDF checklists (Mexico, El Salvador, Guatemala) | H | Low | Currently only Laos checklist |
| Affiliate applications submitted (Wise, Remitly, Skyscanner, SafetyWing) | H | Low | Business process, not development |
| NumeroMoney live affiliate link working | H | Low | Test and confirm |
| Attorney CTAs on legal pages | M | Low | Link to future attorney directory |
| Add stories (real content) | M | Low | Content task, not development |

---

## Phase 2 — Content & Monetization

**Goal:** Launch the Knowledge Center as the primary SEO growth engine. Launch the attorney directory as the primary lead-generation revenue stream. Establish approved affiliate relationships with 15+ partners.

**Dependencies:** Phase 1 substantially complete. Admin CMS functional for non-technical content editing.

### Feature Set

#### Knowledge Center (P1)

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Knowledge Center index page (`/knowledge-center`) | H | H | Medium | P1 |
| 13 category pages | H | H | Low | P1 |
| Article CMS (admin creation + editing) | H | H | High | P1 |
| Rich text editor for articles | M | H | Medium | P1 |
| Article tagging (country, category, topic) | H | H | Medium | P1 |
| Article search | H | M | Medium | P2 |
| Knowledge cards component | H | H | Low | P1 |
| SEO metadata per article | H | H | Low | P1 |
| Article internal linking to affiliates | H | H | Low | P1 |
| Initial 50-article batch (legal, money, housing, jobs) | H | H | High (content) | P1 |

**KPI target:** 50 published articles, 500+ indexed pages, 10% month-over-month organic traffic growth beginning 3 months post-launch.

#### Attorney Directory (P1)

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Attorney listing page (`/attorneys`) | H | H | Medium | P1 |
| Country-specific attorney lists (`/attorneys/[country]`) | H | H | Medium | P1 |
| Individual attorney profile page | H | H | Medium | P1 |
| Attorney application/submission form | M | H | Medium | P1 |
| Attorney admin management | M | H | Medium | P1 |
| Attorney CTA on legal articles and country pages | H | H | Low | P1 |
| Payment integration for listing fee | M | H | High | P2 |
| Attorney verification workflow | H | H | Medium | P1 |

**KPI target:** 10 attorney listings at launch, 25 within 6 months.

#### Affiliate Partnership Expansion (P1)

| Partner Program | Category | Revenue Potential | Priority |
|----------------|---------|-------------------|---------|
| Wise (apply) | Money Transfer | H | P1 |
| Remitly (apply) | Money Transfer | H | P1 |
| Skyscanner (apply) | Travel/Flights | H | P1 |
| Booking.com (apply) | Hotels | H | P1 |
| SafetyWing (apply) | Travel Insurance | H | P1 |
| Airalo (apply) | eSIM | H | P1 |
| ExpressVPN or NordVPN (apply) | VPN | M | P1 |
| Udemy (apply) | Career/Courses | M | P2 |
| Hostelworld (apply) | Budget Travel | M | P2 |
| DiscoverCars (apply) | Car Rental | M | P2 |

#### Country Guide Expansion (P2)

| Country | Sub-pages Target | Priority |
|---------|-----------------|---------|
| Honduras | 8 sub-pages | P1 |
| Dominican Republic | 8 sub-pages | P1 |
| India | 8 sub-pages | P1 |
| Philippines | 8 sub-pages | P1 |
| Colombia | 6 sub-pages | P2 |
| Jamaica | 6 sub-pages | P2 |
| Ecuador | 6 sub-pages | P2 |
| Pakistan | 5 sub-pages | P2 |
| Nicaragua | 5 sub-pages | P3 |
| Haiti | 5 sub-pages | P3 |

#### Additional Phase 2 Features

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Country-specific checklists (PDF per country) | H | M | Medium | P1 |
| Email nurture sequence (post-signup) | M | H | Medium | P2 |
| Return visitor personalization | M | M | High | P3 |
| Sitemap.xml generation | L | H | Low | P1 |
| Structured data (JSON-LD) on country pages | L | H | Medium | P2 |
| Open Graph images (dynamic) | L | M | Medium | P2 |

---

## Phase 3 — Community & Commerce

**Goal:** Launch community features (success stories, peer connections), employer marketplace, and premium product offerings. Begin building the human network around the platform's information infrastructure.

**Dependencies:** Phase 2 complete. Minimum 1,000 newsletter subscribers. Affiliate revenue covering operating costs.

### Feature Set

#### Success Story Platform

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Story submission form | H | L | Medium | P1 |
| Story moderation workflow (admin) | H | L | Medium | P1 |
| Story detail pages (`/stories/[slug]`) | H | M | Medium | P1 |
| Story filtering by country, timeline, outcome | H | M | Medium | P2 |
| Story search | M | L | Medium | P3 |
| Story → country guide cross-linking | H | M | Low | P1 |

#### Employer Marketplace

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Employer listing submission | H | H | High | P1 |
| Job listing pages (`/jobs/[country]`) | H | H | Medium | P1 |
| Individual job listing page | H | H | Medium | P1 |
| Employer profile page | M | H | Medium | P2 |
| Job alert email (by country) | H | M | Medium | P2 |
| Employer payment for listings | M | H | High | P2 |

#### Rebuilding Planner

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Interactive planner UI | H | M | High | P1 |
| Country + situation inputs | H | M | Medium | P1 |
| Week-by-week action plan output | H | M | Medium | P1 |
| Integration with country guide content | H | M | High | P2 |
| Affiliate integration in planner | H | H | Medium | P2 |
| PDF export of plan | H | M | Medium | P3 |

#### Premium Downloads

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Payment integration (Stripe) | L | H | High | P1 |
| Deep-dive country guides ($5–10) | H | M | Low | P1 |
| Legal preparation worksheets ($5) | H | M | Low | P2 |
| Career résumé templates ($5) | H | M | Low | P2 |
| Download delivery system | L | H | Medium | P1 |

---

## Phase 4 — Scale & Language

**Goal:** Achieve geographic and linguistic scale. Launch Spanish-language parity. Launch mobile app. Reach 50,000+ monthly users.

**Dependencies:** Phase 3 generating meaningful revenue. Team or budget for translation and mobile development.

### Feature Set

#### Spanish Language Parity

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Spanish homepage (`/es`) | H | H | Medium | P1 |
| Spanish country guides (Latin America, 20 countries) | H | H | High | P1 |
| Spanish Knowledge Center articles | H | H | High | P2 |
| Spanish email sequences | M | H | Medium | P2 |
| Hreflang implementation | L | H | Low | P1 |
| Spanish SEO keyword research | L | H | Medium | P1 |

#### Mobile App

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| React Native app (iOS + Android) | H | M | Very High | P1 |
| Offline access to country guides | H | L | High | P1 |
| Push notifications (newsletter, news) | M | M | Medium | P2 |
| App Store optimization | L | M | Low | P2 |

#### Platform Performance & Scale

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| CDN optimization | L | M | Low | P1 |
| Image optimization audit | L | M | Low | P1 |
| Core Web Vitals optimization | L | H | Medium | P1 |
| Caching strategy (ISR for country pages) | L | M | Medium | P2 |

---

## Phase 5 — Platform & SaaS

**Goal:** Transform the platform's knowledge base into a SaaS product for institutional users. Build sustainable recurring revenue streams.

**Dependencies:** Phase 4 complete. Established relationships with NGOs and government agencies. Technical infrastructure to support multi-tenant SaaS.

### Feature Set

#### NGO SaaS Dashboard

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Multi-tenant architecture | H | H | Very High | P1 |
| Client case management | H | H | High | P1 |
| Referral tracking (NGO → platform → outcome) | H | H | High | P1 |
| Bulk country guide access (API) | H | H | High | P2 |
| Custom branding for NGO dashboards | M | H | Medium | P2 |
| Aggregate anonymized reporting | H | M | High | P2 |
| Subscription billing | L | H | High | P1 |

#### Public API

| Feature | Mission Impact | Revenue Potential | Complexity | Priority |
|---------|---------------|-------------------|-----------|---------|
| Country data API (rate-limited) | M | M | High | P2 |
| Affiliate partner API | L | M | Medium | P3 |
| API documentation | L | M | Medium | P2 |
| API key management (admin) | L | M | Medium | P2 |

---

## Complexity Ratings

| Rating | Description | Typical Effort |
|--------|------------|----------------|
| Low | Single component or small config change | 1–4 hours |
| Medium | New page, new component, or backend integration | 1–3 days |
| High | New major feature, database schema change, multi-file implementation | 1–2 weeks |
| Very High | New platform, language, or architectural pattern | 1+ months |

---

*Document End — Version 1.0*
