# Product Strategy — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active  
**Cross-References:** `00_Project_Vision.md`, `03_UI_Design_System.md`, `05_Information_Architecture.md`, `ROADMAP.md`

---

## Table of Contents

1. [Website Purpose](#website-purpose)
2. [Product Positioning](#product-positioning)
3. [Target Market](#target-market)
4. [Core Features (Live)](#core-features-live)
5. [Future Features](#future-features)
6. [Feature Priorities](#feature-priorities)
7. [User Journeys](#user-journeys)
8. [Conversion Funnels](#conversion-funnels)
9. [Revenue Model](#revenue-model)
10. [Affiliate Strategy](#affiliate-strategy)
11. [AI Tools](#ai-tools)
12. [Career Center](#career-center)
13. [Knowledge Center](#knowledge-center)
14. [Country Guides](#country-guides)
15. [Family Portal](#family-portal)
16. [Compare Tools](#compare-tools)
17. [Success Stories](#success-stories)
18. [Attorney Directory](#attorney-directory)
19. [Admin CMS](#admin-cms)
20. [Future SaaS Direction](#future-saas-direction)

---

## Website Purpose

DeportedNotDefeated.com is a **mission-driven information and resource platform** that serves people rebuilding their lives after deportation from the United States. It is not a news site, not a legal services firm, and not a social network. It is the practical reference platform that sits between the moment of deportation and the beginning of a new, stable life.

The platform's core function is: **organize scattered, critical information into country-specific, practical guides that are free, accurate, and dignified.**

Its secondary function is: **connect users to vetted third-party services that help them take action** — through a transparent affiliate model that generates revenue to sustain the platform.

Its tertiary function is: **give families, attorneys, and NGOs a trusted resource** they can recommend, reference, and rely on.

---

## Product Positioning

**Category:** Immigrant resource platform / deportee support directory  
**Closest analog:** None direct. The platform operates in a white space.  
**Adjacent categories:** Immigration attorney directories, remittance comparison sites, expat living guides  
**Positioning statement:** "The only country-first, dignity-centered resource platform for people rebuilding after deportation."

**What we are not:**
- We are not a news publication (we don't cover deportation politics or policy debates)
- We are not an advocacy organization (we don't take political positions)
- We are not a legal services firm (we provide educational content, never legal advice)
- We are not a charitable organization (we are self-funded through ethical affiliate revenue)
- We are not a social media platform (users don't create public profiles)

---

## Target Market

### Primary Market
**Deported individuals and their immediate families.** Estimated U.S. deportations: 120,000–250,000 annually. These individuals and their families represent millions of touchpoints annually for a platform that serves their specific needs.

### Secondary Market
**Service providers to the deported community:** immigration attorneys, NGOs, community organizations, employers in destination countries, journalists, and researchers.

### Geographic Concentration
The largest deported populations by destination country:
1. Mexico (~65% of all U.S. deportations)
2. El Salvador
3. Guatemala
4. Honduras
5. Dominican Republic
6. India
7. Philippines
8. Colombia
9. Jamaica
10. Ecuador

Platform depth should scale with this distribution — Mexico, El Salvador, Guatemala, and Honduras deserve the deepest content investment.

---

## Core Features (Live)

### 1. Country Guides (45 Countries)
**What it is:** Comprehensive, country-specific guides covering first steps after arrival, housing, employment, healthcare, banking, legal documents, phone/internet, and transportation.

**Why it exists:** The single most valuable thing the platform provides. Each guide answers the question "I just landed in [country]. What do I do?" with specific, practical answers for that country.

**Current state:** 45 country data files. Mexico, El Salvador, Guatemala, Laos, Cambodia, Vietnam, and Philippines have deep sub-page guides. The remaining 38 countries have the primary guide page with full data (airports, hospitals, banks, emergency numbers, etc.) but fewer sub-pages.

**Architecture:** Dynamic routing via `/[country]/page.tsx` pulling from `/data/countries/[slug].ts` country data files. Static generation via `generateStaticParams()`.

**Priority expansion:** Honduras, Dominican Republic, India, Philippines, Colombia should get the next round of sub-page investment.

---

### 2. Resources Hub (Affiliate Directory)
**What it is:** A structured directory of vetted third-party services organized by category (money transfer, phone/internet, VPN, health insurance) with transparent affiliate disclosure.

**Why it exists:** Users need to take action, not just read. After reading a country guide, the logical next step is finding a service. The resources hub bridges information and action. It also generates affiliate revenue that funds the platform.

**Current categories:**
- Money Transfer (13 providers: Wise, Remitly, WorldRemit, MoneyGram, Western Union, Ria, XE, OFX, Paysend, Xoom, Payoneer, InstaRem)
- Phone & Internet / eSIM (3 providers: NumeroMoney, Airalo, Holafly)
- VPN & Privacy
- Health Insurance

**Architecture:** Supabase `affiliate_partners` table drives all content. Partners are managed through the admin CMS. Affiliate status (`pending`, `applied`, `approved`, `rejected`, `paused`) controls which links are live. The `/go/[slug]` redirect route tracks clicks before forwarding to the affiliate URL.

---

### 3. Family Visit Travel Guide
**What it is:** A dedicated section for U.S.-based family members who want to visit a deported loved one. Covers flights, hotels, hostels, car rentals, travel insurance, eSIM, tours, and visa information, with a budget calculator and family visit checklist.

**Why it exists:** Families are a distinct user segment with distinct needs. A U.S. citizen visiting El Salvador has completely different questions than a deportee navigating El Salvador. Building a separate experience respects that distinction. Families also have higher disposable income — travel bookings are higher-value affiliate conversions than remittances.

**Current state:** Full page at `/family-visit-travel`. Country-specific visit data embedded on each of the 45 country pages via `CountryVisitSection` component.

---

### 4. Career & Education Center
**What it is:** Resources for building a sustainable livelihood after deportation, covering online courses, remote work platforms, freelancing, business tools, and country-specific career opportunities.

**Why it exists:** Money transfer and housing solve the immediate crisis. Career and education solve the medium-term sustainability problem. A deported person who can earn remotely is no longer dependent on family remittances — this is one of the most transformative outcomes the platform can enable.

**Current state:** Full page at `/career-education`. Includes CareerPathFinder, CourseComparisonTable, affiliate cards for Upwork, Fiverr, online course platforms, and CountryCareerSection embedded on country pages.

---

### 5. AI Immigration Case Assessment
**What it is:** A free AI-powered tool that takes the user's immigration history and generates a personalized PDF report summarizing their situation, options, and next steps.

**Why it exists:** Legal consultations cost $200–500/hour. Most deported individuals cannot afford one. The AI assessment is not legal advice — it is an educational tool that helps users understand their situation well enough to have a productive conversation with an attorney. It also captures email addresses and generates affiliate opportunities (attorney referrals).

**Current state:** Live at `/ai-report`. `ImmigrationAssessmentModal` handles the questionnaire. Report generated via `/api/immigration-assessment` and tracked in Supabase `immigration_assessments` table.

---

### 6. Legal Resources
**What it is:** Educational content about legal topics relevant to deported individuals: pathways for return, legal rights after deportation, voluntary departure vs. deportation, and country-specific legal resources.

**Why it exists:** Legal questions are among the most common and highest-stakes questions deported individuals have. Providing clear, accurate educational content builds trust and positions the platform as the authoritative resource in this space.

**Current state:** `/legal-resources` hub page with one deep article (`can-deported-person-return-to-usa`). Significant expansion planned via the Knowledge Center.

---

### 7. Free Checklist PDF
**What it is:** A downloadable PDF checklist of the first 30 days after deportation, currently specific to Laos, gated behind an email capture form.

**Why it exists:** The checklist serves dual purposes — it provides genuine value to the user, and it captures an email address for the newsletter. It is the platform's primary lead magnet.

**Current state:** Generated via `/api/checklist` using PDFKit. Email gate handled by `ChecklistGate` component. Should be expanded to country-specific versions for all 45 countries.

---

### 8. Business Directory
**What it is:** A searchable directory of local businesses in destination countries — restaurants, housing, legal services, healthcare — verified and editable through the admin CMS.

**Why it exists:** Country-specific, local directories are the highest-trust resource we can provide. "Here is a verified English-speaking doctor in Phnom Penh" is worth more than any generic guide.

**Current state:** `DirectoryListing` model in Supabase. `DirectoryCard` and `DirectorySearch` components exist. Most developed for Laos (`/laos/directory`).

---

### 9. Newsletter & Email System
**What it is:** Email subscription capture across the platform, powered by Resend. Welcome emails sent automatically on signup.

**Why it exists:** Repeat visitors convert better than first-time visitors. Email is the highest-ROI channel for reaching a community that has transient living situations and may change their URL habits. The newsletter is the platform's retention tool.

**Current state:** `NewsletterForm` component used on multiple pages. `/api/subscribe` handles signup. `newsletter_subscribers` table in Supabase. Admin view at `/admin/subscribers`.

---

### 10. Admin CMS
**What it is:** A password-protected admin dashboard for managing all dynamic content — affiliate partners, directory listings, articles, subscriber list, contact messages, and click tracking.

**Why it exists:** The platform grows through content. The admin system allows non-technical content management without touching code. It is also the primary tool for monitoring affiliate performance and managing business relationships.

**Current state:** Full admin system at `/admin`. Supabase authentication. Covers affiliates, listings, articles, messages, subscribers, immigration assessments, affiliate clicks.

---

## Future Features

### Knowledge Center (Phase 2 — High Priority)
A structured content library of 500+ evergreen articles organized into 13 categories: Legal Resources, Self-Deporting, Money & Banking, Jobs & Career Training, Housing, Family & Visitors, Travel & Documents, Healthcare, Mental Health, Technology, Starting Over, Success Stories, News & Policy Updates.

Full specification in `Knowledge-Center-Master-Spec.md`.

### Attorney Directory (Phase 2)
A paid listing directory for immigration attorneys serving deported individuals. Attorneys pay for verified listings; users get free access to find vetted attorneys. Revenue model: monthly or annual listing fee.

### Visa & Return Eligibility Checker (Phase 2)
A tool that takes the user's immigration history and outputs a plain-language assessment of their visa eligibility and pathways for return. Based on public information — not legal advice.

### Cost of Living Calculator (Phase 3)
An interactive tool comparing the cost of living between a U.S. city (where the deportee's family lives) and the destination country. Helps families plan support, helps deportees budget.

### Employer Marketplace (Phase 3)
A two-sided job board: employers in destination countries post remote-friendly or local positions, deported individuals with U.S. work experience apply. Revenue: employer listing fees.

### Success Story Platform (Phase 3)
A structured, verified submission system for users to share their rebuilding stories. Peer content is the most trusted content. Success stories also serve as SEO content and conversion proof.

### Rebuilding Planner (Phase 3)
A personalized, interactive planning tool that takes the user's country and situation and generates a week-by-week action plan for their first 90 days. Integrates with country guide content, affiliate links, and AI tools.

### Mobile App (Phase 4)
A lightweight React Native app with offline access to country guides. Critical for users with limited internet access in the days immediately after deportation.

### Spanish-Language Parity (Phase 4)
Full translation of all Latin American country guides. The largest deported population speaks Spanish — this is both a mission priority and a major SEO opportunity.

### NGO SaaS Dashboard (Phase 5)
A paid subscription tool for NGOs to manage client caseloads, track referrals to platform resources, and access bulk country data. Turns the platform's knowledge base into a service for institutional users.

---

## Feature Priorities

Features are prioritized using a two-factor framework: **Mission Impact** (how directly this helps a deported person rebuild) × **Revenue Potential** (how directly this generates sustainable platform revenue).

| Feature | Mission Impact | Revenue Potential | Priority |
|---------|---------------|-------------------|---------|
| Knowledge Center | High | High (SEO → affiliate) | P1 |
| Country Guide Expansion | High | High (SEO → affiliate) | P1 |
| Attorney Directory | High | High (lead fees) | P1 |
| Country-Specific Checklists | High | Medium (lead capture) | P1 |
| Visa/Return Checker | High | Medium (attorney referrals) | P2 |
| Success Stories | High | Low (trust + SEO) | P2 |
| Employer Marketplace | High | Medium (listing fees) | P2 |
| Rebuilding Planner | High | Medium (affiliate) | P2 |
| Spanish Translation | High | High (SEO × 3) | P2 |
| Cost of Living Calculator | Medium | Low (engagement) | P3 |
| Mobile App | High | Low (no direct revenue) | P3 |
| NGO SaaS | Medium | High (subscriptions) | P3 |

---

## User Journeys

### Journey 1: Recently Deported Individual (Crisis)

1. **Trigger:** User searches "what to do after deportation to Mexico" on Google (mobile)
2. **Landing:** Arrives on `/mexico` country guide
3. **Consumption:** Reads First 30 Days section, finds housing section, reads banking section
4. **Action:** Clicks on money transfer affiliate link to receive wire from family
5. **Conversion:** Downloads free checklist after email capture
6. **Retention:** Receives welcome email, subscribes to newsletter, bookmarks site
7. **Return:** Returns 1 week later to find local employment resources
8. **Conversion 2:** Completes AI immigration assessment to understand return options

### Journey 2: U.S.-Based Family Member (Visitor Planning)

1. **Trigger:** User searches "how to visit someone deported to Guatemala"
2. **Landing:** Arrives on `/family-visit-travel`
3. **Consumption:** Selects Guatemala from country grid, reads visa section, reads budget calculator
4. **Action:** Clicks on flight comparison affiliate link
5. **Conversion:** Books travel insurance through affiliate link
6. **Return:** Returns before trip to read `/guatemala` guide for safety tips

### Journey 3: Individual Planning Voluntary Departure

1. **Trigger:** User searches "voluntary departure vs deportation" on Google
2. **Landing:** Arrives on `/legal-resources/can-deported-person-return-to-usa`
3. **Consumption:** Reads legal pathway article, follows internal link to country guide
4. **Action:** Completes AI immigration assessment
5. **Conversion:** Downloads country-specific checklist, subscribes to newsletter
6. **Referral:** Attorney recommendations generate lead revenue

### Journey 4: Immigration Attorney (Referral Source)

1. **Trigger:** Attorney searches for reliable resource to recommend to clients
2. **Landing:** Discovers platform through client referral or search
3. **Evaluation:** Reviews legal content for accuracy and appropriate disclaimers
4. **Action:** Bookmarks platform, begins recommending to clients
5. **Long-term:** Attorney lists in attorney directory when it launches

---

## Conversion Funnels

### Funnel 1: Email Capture → Newsletter → Affiliate Revenue

```
Visitor arrives → Reads content → Sees newsletter CTA or checklist CTA
→ Enters email → Welcome email with affiliate links → Opens email
→ Clicks affiliate link → Converts with affiliate → Commission earned
```

**Key conversion points:**
- Newsletter form (on every page)
- Checklist download gate
- AI assessment completion (requires email)

### Funnel 2: SEO → Country Guide → Affiliate Click

```
Google search → Country guide page → Resource section
→ Affiliate card → /go/[slug] redirect → Affiliate site → Purchase
→ Commission earned
```

**Key optimization:** Country guide SEO + affiliate card placement + CTA copy

### Funnel 3: Country Guide → AI Report → Attorney Lead

```
Country guide → Legal section → "Understand your options" CTA
→ AI assessment → Personalized report → Attorney recommendation
→ Attorney directory click → Lead fee earned
```

---

## Revenue Model

### Tier 1: Affiliate Commissions (Immediate)
Partners pay a percentage of the sale value for customers referred through our links. Commission rates vary by category:
- Money transfer: typically $5–25 per new customer referred
- eSIM: typically $3–15 per purchase
- VPN: typically $10–50 per subscription
- Travel booking: typically 3–8% of booking value
- Health insurance: typically $20–100 per policy

**Tracking:** All affiliate clicks routed through `/go/[slug]` for internal tracking before forwarding to the affiliate URL. Click data stored in `affiliate_clicks` Supabase table.

### Tier 2: Attorney Directory (Phase 2)
Immigration attorneys pay a monthly or annual fee for a verified listing. Listing benefits: profile page, direct contact form, featured placement on relevant country guides.
- Estimated pricing: $50–200/month per attorney listing
- Target: 20–50 attorney listings within 12 months of launch

### Tier 3: Sponsored Content (Phase 2)
Mission-aligned companies (financial services, language learning, legal tech) pay for educational articles that provide genuine value while featuring their products. Clearly labeled as sponsored. Rate: negotiated per piece.

### Tier 4: Premium Downloads (Phase 3)
Country-specific deep-dive guides, legal preparation worksheets, and career-readiness packages available for $5–20. Nominal pricing removes friction while generating revenue.

### Tier 5: Employer Marketplace (Phase 3)
Companies post job listings targeting English-speaking, U.S.-experienced workers in destination countries. Pricing: $50–200 per listing.

---

## Affiliate Strategy

### Partner Selection Criteria
Every affiliate partner must pass all of the following tests:
1. **Does it genuinely help the user?** A money transfer service that charges hidden fees fails this test.
2. **Is it available in the relevant countries?** A service unavailable in the user's destination country is useless.
3. **Is the commission ethical?** We do not promote products with predatory pricing structures simply because the commission is high.
4. **Can we stand behind the recommendation?** We should be willing to say: "I would recommend this to my own family member."

### Partner Status Lifecycle
All partners follow this lifecycle in the `affiliate_partners.affiliate_status` field:
1. `pending` — Identified as a potential partner, not yet contacted
2. `applied` — Application submitted through partner program
3. `approved` — Partner has approved our affiliate application; link is live
4. `rejected` — Application rejected; fallback to official website URL
5. `paused` — Partner temporarily paused (rate change, product issue, etc.)

### Priority Categories for Affiliate Development
1. **Money Transfer** — Highest user need, multiple established partner programs (Wise, Remitly, Western Union)
2. **eSIM / Phone** — High need immediately post-deportation, good commission rates (Airalo, NumeroMoney, Holafly)
3. **Travel / Family Visits** — Higher average order value, good commission rates (Skyscanner, Booking.com)
4. **VPN** — Recurring subscription revenue, good commissions (ExpressVPN, NordVPN, Surfshark)
5. **Health Insurance** — High commission per policy, complex to recommend accurately
6. **Career / Education** — Online course platforms (Udemy, Coursera, Skillshare)

---

## AI Tools

### Current: Immigration Case Assessment
**URL:** `/ai-report`  
**Function:** User answers 16 questions about their immigration history. System generates a personalized PDF summarizing their case and available options.  
**Value:** Accessible legal triage for people who cannot afford attorney consultations.  
**Revenue connection:** Generates email captures; future attorney directory referrals.

### Planned: Country Situation Assessor
**Function:** User inputs their situation (language, money, housing status, family connections); system outputs a prioritized action list specific to their country.  
**Value:** Personalization at scale.

### Planned: Visa & Return Eligibility Tool
**Function:** User inputs their removal history; system generates a plain-language summary of return eligibility based on public immigration law.  
**Constraint:** Clearly framed as educational, never legal advice. Attorney CTA always present.

---

## Career Center

**Current URL:** `/career-education`

The Career Center addresses the most important medium-term need of deported individuals: sustainable income. Most deported individuals have U.S. work experience, English fluency, and professional skills that have significant value in global remote markets. The Career Center helps them convert that value into income.

**Core sections:**
1. Career path finder (interactive tool matching user background to opportunities)
2. Online learning platforms (Udemy, Coursera, Alison, Skillshare, LinkedIn Learning, edX)
3. Remote work platforms (Upwork, Fiverr)
4. Business tools (website builders, payment processors, productivity apps)
5. Country-specific career sections embedded in each country guide

**Affiliate opportunity:** Every course platform and remote work platform has an affiliate program. This section has high conversion potential because users have demonstrated career intent by navigating to it.

---

## Knowledge Center

**Current status:** Planned. Master specification in `/docs/Knowledge-Center-Master-Spec.md`.  
**Planned URL:** `/knowledge-center`

The Knowledge Center is the platform's primary SEO and content growth engine. While country guides are organized by geography, the Knowledge Center is organized by topic — giving users who search by topic (rather than country) a path to the platform.

**13 Content Categories:**
1. Legal Resources
2. Self-Deporting
3. Money & Banking
4. Jobs & Career Training
5. Housing
6. Family & Visitors
7. Travel & Documents
8. Healthcare
9. Mental Health
10. Technology
11. Starting Over
12. Success Stories
13. News & Policy Updates

**Content strategy:** Each category will have 20–50 evergreen articles answering specific user questions ("How do I open a bank account in Mexico as a deportee?", "What documents do I need to get a Mexican national ID card?"). Each article naturally integrates 1–3 relevant affiliate CTAs.

**SEO target:** 600–800 indexable pages generating organic search traffic.

---

## Country Guides

Country guides are the platform's most valuable asset — the feature that most directly fulfills the mission and most drives organic search traffic.

### Architecture
- **Route:** `/[country]/page.tsx` (dynamic)
- **Data source:** `/data/countries/[slug].ts` (static TypeScript files, one per country)
- **Sub-pages:** `/[country]/[category]/page.tsx` (dynamic category pages)
- **Static generation:** `generateStaticParams()` pre-renders all 45 country routes at build time

### Data Model (CountryData schema)
Each country file provides:
- Country name, slug, region, flag emoji
- Capital city, major cities
- Emergency numbers
- Key hospitals
- Banks and ATMs
- SIM card providers
- Housing areas
- Employment opportunities
- Cost of living estimates
- Local transport options
- Language information
- Legal resources
- Quick facts (currency, timezone, internet quality)

### Sub-page Depth
Fully developed countries (Mexico, El Salvador, Guatemala, Laos, Cambodia, Vietnam, Philippines) have 8–15 sub-pages covering:
- First 30 Days guide
- Local business directory
- Housing guide
- Employment guide
- Healthcare guide
- Banking guide
- Phone/SIM guide
- Transportation guide
- Cost of living guide
- Emergency numbers
- Start over guide

### Priority Development Order
Based on deportation volume: Mexico → El Salvador → Guatemala → Honduras → Dominican Republic → India → Philippines → Colombia → Jamaica → Ecuador

---

## Family Portal

**Current URL:** `/family-visit-travel`  
**Country-specific data:** Embedded in each `/[country]` page via `CountryVisitSection`

The Family Portal serves U.S.-based family members of deported individuals with a completely separate content and resource experience. This audience has different questions, different emotional context, and higher average affiliate value (they are booking international travel, not transferring $100 remittances).

**Core sections:**
1. Country selector (links to individual country pages)
2. Flight booking affiliates (Skyscanner, Expedia, Trip.com, CheapOair, WayAway)
3. Hotel affiliates (Booking.com, Agoda, Hotels.com, Expedia)
4. Budget hostel affiliates (Hostelworld, Agoda)
5. Car rental affiliates (DiscoverCars, Rentalcars.com)
6. Travel insurance affiliates (SafetyWing, VisitorsCoverage, World Nomads)
7. eSIM affiliates (Airalo, NumeroMoney, Holafly)
8. Tour affiliates (Viator, GetYourGuide, Klook)
9. Visa help affiliates (iVisa, Sherpa, VisaHQ)
10. Budget calculator (interactive, frontend-only)
11. Family visit checklist (Before Booking, Before Departure, After Arrival)
12. Emergency & safety section
13. FAQ accordion (10 questions)
14. Email capture form

---

## Compare Tools

### Current: Money Transfer Compare
**URL:** `/resources/money-transfer/compare`  
**Function:** Side-by-side comparison of money transfer services on key dimensions: exchange rate, fees, transfer speed, payment methods.  
**Value:** Helps users choose the cheapest service for sending money internationally.  
**Revenue:** Comparison table drives affiliate clicks on the service the user selects.

### Planned: eSIM Compare
**URL:** `/resources/phone-internet/compare`  
**Function:** Compare eSIM providers by country coverage, price, data limits, activation ease.

### Planned: VPN Compare
**URL:** `/resources/vpn-privacy/compare`  
**Function:** Compare VPN services by speed, privacy policy, country server coverage, price.

### Planned: Health Insurance Compare
**URL:** `/resources/health-insurance/compare`  
**Function:** Compare international health insurance plans by coverage, price, country coverage.

---

## Success Stories

**Current URL:** `/stories` (landing page only)

**Current state:** Page exists but content is placeholder. No submission system yet.

**Vision:** A structured, verified library of real rebuilding stories from deported individuals across all 45 countries. Stories are organized by country, by timeline (3 months, 1 year, 5 years), and by outcome (employment, family reunification, business started, legal return).

**Why it matters:** Peer content is the most trusted content in any community. A success story from someone deported to Cambodia who built a business in 2 years is worth more than any expert guide. Success stories also provide SEO content in a format search engines reward (first-person narratives with location-specific language).

**Planned submission flow:**
1. User submits story through a structured form
2. Admin reviews for authenticity and quality
3. Published to `/stories/[slug]` with country tag, timeline tag, and outcome tag
4. Cross-linked to relevant country guide

---

## Attorney Directory

**Current state:** Not yet built.  
**Planned URL:** `/attorneys` and `/attorneys/[country]`

Immigration attorneys who specialize in deportation cases are the highest-trust referral we can provide. The attorney directory will list verified attorneys who have been vetted by the platform team. Attorneys pay a listing fee; users get free access.

**Listing requirements:**
- Valid bar membership verification
- Specialty in immigration/deportation law
- History of working with deported clients
- Clear fee disclosure
- Responsive to platform contact requests

**Revenue model:** Monthly or annual listing fee. Featured placement (top of country list) at a premium.

**Integration:** Attorney CTAs appear naturally throughout the AI assessment results, legal resource pages, and country guide legal sections.

---

## Admin CMS

The Admin CMS is the operational backbone of the platform. It enables content management without touching code.

**Current capabilities:**
- Affiliate partner management (add, edit, set status, set priority)
- Affiliate application tracking (which programs have been applied to, approved, rejected)
- Affiliate click tracking (which links generate traffic)
- Directory listing management (add, edit, verify, feature)
- Article management (create, edit, publish)
- Contact message inbox
- Newsletter subscriber list
- Immigration assessment submissions review

**Auth:** Supabase authentication (email/password). Admin routes protected by middleware.

**Future CMS needs:**
- Country guide content editing (currently requires code changes)
- Knowledge Center article CMS with rich text editor
- Attorney listing management
- Success story moderation queue

---

## Future SaaS Direction

In Phase 5, the platform has the potential to transition a portion of its capabilities into a SaaS product sold to NGOs and government agencies.

**Target customers:** Non-governmental organizations that work with deported populations in destination countries. These organizations serve hundreds of clients per month but lack organized resources.

**Potential SaaS features:**
- Client management dashboard (track referrals, needs, and outcomes)
- Bulk access to country guide data via API
- Customizable country-specific resource packets for client distribution
- Progress tracking (housing secured, employment found, etc.)
- Aggregate anonymized reporting for funders

**Why this makes strategic sense:** NGOs have budget, they have institutional needs, and they serve the exact population the platform is built for. Converting the platform's knowledge base into an NGO tool creates a recurring revenue stream without compromising the free consumer product.

---

*Document End — Version 1.0*
