# UI Design System — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active  
**Cross-References:** `02_Brand_Guidelines.md`, `05_Information_Architecture.md`

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Responsive Breakpoints](#responsive-breakpoints)
3. [Component Library](#component-library)
   - [Hero](#hero)
   - [Navigation (Navbar)](#navigation-navbar)
   - [Footer](#footer)
   - [Country Cards](#country-cards)
   - [Affiliate Cards](#affiliate-cards)
   - [Knowledge Cards](#knowledge-cards)
   - [Attorney Cards](#attorney-cards)
   - [Job Cards](#job-cards)
   - [Housing Cards](#housing-cards)
   - [Buttons](#buttons)
   - [Search Bars](#search-bars)
   - [Tables & Comparison Tables](#tables--comparison-tables)
   - [FAQ & Accordion](#faq--accordion)
   - [Tabs](#tabs)
   - [Pagination](#pagination)
   - [Breadcrumbs](#breadcrumbs)
   - [Email Capture & Newsletter Forms](#email-capture--newsletter-forms)
   - [Modals](#modals)
   - [Alerts & Banners](#alerts--banners)
   - [Disclaimers](#disclaimers)
   - [Success Banners](#success-banners)
   - [404 Page](#404-page)
   - [Loading States & Skeleton Loaders](#loading-states--skeleton-loaders)
   - [Mobile Navigation](#mobile-navigation)
4. [Animation Guidelines](#animation-guidelines)
5. [Dark Mode Readiness](#dark-mode-readiness)
6. [Section Background Patterns](#section-background-patterns)

---

## Design Principles

1. **Mobile-first, always.** Every component is designed for mobile (320–390px) first, then scaled up.
2. **One truth per section.** Each section communicates one primary idea. Avoid information overload.
3. **Scannable over comprehensive.** Users in crisis scan before they read. Use headers, bullets, and cards over long paragraphs.
4. **Consistent affordances.** Interactive elements look the same everywhere. A red button always means "primary action."
5. **Progressive disclosure.** Show the most critical information first. Use accordions, tabs, and "read more" to layer depth.
6. **No decorative complexity.** Every visual element earns its place by either conveying information or creating visual hierarchy. No decorative patterns, gradients for their own sake, or UI complexity that doesn't serve the user.

---

## Responsive Breakpoints

Using Tailwind CSS defaults:

| Breakpoint | Prefix | Width | Device context |
|------------|--------|-------|----------------|
| Default (mobile) | none | < 640px | Smartphones, narrow viewport |
| Small | `sm:` | ≥ 640px | Large phones, small tablets |
| Medium | `md:` | ≥ 768px | Tablets, landscape phones |
| Large | `lg:` | ≥ 1024px | Laptops, desktop |
| Extra Large | `xl:` | ≥ 1280px | Wide desktop |
| 2XL | `2xl:` | ≥ 1536px | Ultra-wide monitors |

**Grid column patterns:**
| Layout | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Cards (primary) | 1 col | 2 col | 3–4 col |
| Country grid | 2 col | 3–4 col | 4–5 col |
| Resource categories | 1 col | 2 col | 4 col |
| Two-column content | 1 col | 1 col | 2 col |
| Three-column content | 1 col | 2 col | 3 col |

---

## Component Library

---

### Hero

**Purpose:** Full-width, high-impact introduction to a page. Communicates the page's primary value proposition and offers 1–3 calls to action.

**Usage:** Homepage, major feature pages (Family Visit Travel, Career & Education, Country Guides index). Not used on sub-pages or resource detail pages.

**When NOT to use:** Individual country guide pages (use a country-specific header instead), article pages, admin pages, legal disclaimer pages.

**Accessibility:**
- Overlay must maintain minimum 4.5:1 contrast between text and background
- Hero image has `alt=""` (decorative) if text is the primary content
- CTA buttons have descriptive labels (not "Click Here")

**Structure:**
```tsx
// Full-width section with image background
<section className="relative min-h-[70vh] flex items-center">
  {/* Background image with dark overlay */}
  <div className="absolute inset-0 z-0">
    <Image src={heroImage} alt="" fill className="object-cover" priority />
    <div className="absolute inset-0 bg-black/55" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center md:text-left">
    <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-3">
      {eyebrow}
    </p>
    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
      {headline}
    </h1>
    <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">
      {subheadline}
    </p>
    <div className="flex flex-wrap gap-3">
      {/* Primary CTA */}
      <Link href={primaryCTAHref} className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded-xl transition-colors">
        {primaryCTALabel}
      </Link>
      {/* Secondary CTA (optional) */}
    </div>
  </div>
</section>
```

**Spacing:** `py-20` content, minimum `min-h-[70vh]` section

**Padding:** `px-4` for mobile, content constrainted by `max-w-4xl mx-auto`

---

### Navigation (Navbar)

**Purpose:** Primary site navigation. Persistent across all pages. Provides wayfinding and access to all major sections.

**Component file:** `components/Navbar.tsx`

**When NOT to use:** Admin pages use a separate simplified nav. Not used in print/PDF views.

**Accessibility:**
- Skip-to-content link (add in future update)
- All nav items keyboard navigable
- Mobile menu open/close managed by `aria-expanded` and `aria-controls`
- Current page indicated by visual differentiation (add `aria-current="page"` in future update)

**Specifications:**
- Background: `bg-navy-800`
- Height: ~64px (`h-16`) 
- Position: `fixed top-0 left-0 right-0 z-50`
- Logo: "Deported" (white) + "Not" (brand-red) + "Defeated" (white)
- Desktop links: `text-white hover:text-brand-red transition-colors text-sm`
- Primary CTA button: `bg-brand-red hover:bg-brand-red-dark text-white rounded-xl px-4 py-2 text-sm font-bold`
- Mobile: hamburger icon toggles full-screen mobile menu
- Mobile menu: `bg-navy-900` full width overlay

**Active link treatment:** To be implemented — `text-brand-red` for current route.

**Spacing:** `px-4 md:px-6` horizontal, `py-4` vertical

---

### Footer

**Purpose:** Site-wide bottom navigation, affiliate disclosure, brand reinforcement, and checklist CTA.

**Component file:** `components/Footer.tsx`

**Accessibility:**
- Footer landmark (`<footer>` element)
- Navigation within footer uses `<nav>` with `aria-label`

**Structure:**
1. Checklist download strip (yellow/gold accent)
2. Main footer (4-column grid, dark navy background)
3. Legal footer (copyright, disclosure summary)

**Specifications:**
- Background: `bg-navy-900`
- Checklist strip background: dark navy with gold CTA button
- Column headings: `text-gray-400 text-xs font-bold uppercase tracking-widest`
- Links: `text-gray-300 hover:text-white text-sm transition-colors`
- Copyright: `text-gray-500 text-xs`
- Max-width: `max-w-6xl mx-auto`

**Spacing:** `py-12 px-4`

---

### Country Cards

**Purpose:** Visual, tappable cards linking to individual country guide pages. Used in the country grid on the homepage, country-guides index, and family-visit-travel page.

**When NOT to use:** Within individual country pages (use breadcrumbs + related country links instead).

**Accessibility:**
- Entire card is tappable (single `<Link>` wrapping)
- Image has descriptive `alt` text (country name)
- Flag emoji accompanied by country name text

**Compact style (country grid, many cards):**
```tsx
<Link href={`/${slug}`} className="relative bg-gray-800 rounded-xl overflow-hidden
  hover:scale-[1.02] transition-transform aspect-square group">
  <Image src={imageUrl} alt={countryName} fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 p-3">
    <p className="text-white font-bold text-sm">{flag} {countryName}</p>
    <p className="text-gray-300 text-xs">{region}</p>
  </div>
</Link>
```

**Portrait style (homepage featured countries):**
- Larger cards (2–4 per row)
- Portrait-oriented images
- Hover: `scale-[1.03]` zoom + vignette darkens
- Text: country name + region + "View Guide →"

**Specifications:**
- Border radius: `rounded-xl` or `rounded-2xl`
- Hover: `transition-transform hover:scale-[1.02]`
- Text: white on gradient overlay
- Flag emoji: first character in country name label

---

### Affiliate Cards

**Purpose:** Display an affiliate partner with description, benefit, price level, and CTA. Used in resource category pages and the Family Visit Travel page.

**Component files:** `components/AffiliateCard.tsx`, `components/travel/TravelProviderCard.tsx`, `components/career/CareerAffiliatCard.tsx`

**When NOT to use:** Navigation, hero sections, or any context where the affiliate relationship might not be clear. Always pair with affiliate disclosure.

**Accessibility:**
- CTA link is descriptive (not "Click Here")
- `rel="sponsored nofollow noopener noreferrer"` on all affiliate links
- Sponsored badge visible and clearly labeled

**Standard affiliate card structure:**
```
┌─────────────────────────────────┐
│ [gradient accent bar, 6px tall] │
│                                 │
│ [emoji icon] Partner Name       │
│ CATEGORY BADGE                  │
│                                 │
│ Short description text...       │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ WHY IT MAY HELP             │ │
│ │ Benefit description...      │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Price Badge]  [SPONSORED]      │
│ [CTA Button →]                  │
└─────────────────────────────────┘
```

**Specifications:**
- Card: `bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`
- Gradient bar: `h-1.5 bg-gradient-to-r {category-gradient}`
- Icon container: `w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center`
- Partner name: `text-navy-800 font-bold text-lg`
- Category badge: `text-xs font-bold uppercase tracking-widest text-brand-red`
- Why it fits: `bg-blue-50 border border-blue-100 rounded-xl p-3`
- CTA: `bg-brand-red hover:bg-brand-red-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm`
- Sponsored badge: `bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full`

**Spacing:** `p-5` internal content padding

---

### Knowledge Cards

**Purpose:** Display Knowledge Center articles with title, category tag, excerpt, and reading time. Used in the Knowledge Center index, category pages, and featured content sections.

**Status:** Component to be built during Knowledge Center development.

**Planned structure:**
```
┌─────────────────────────────────┐
│ [Category Tag] [Country Tag]    │
│                                 │
│ Article Title                   │
│                                 │
│ Excerpt text that gives the     │
│ reader enough context to...     │
│                                 │
│ [5 min read] [→ Read Article]   │
└─────────────────────────────────┘
```

**Specifications:**
- Card: `bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow`
- Category tag: `bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full`
- Title: `text-navy-800 font-bold text-lg leading-snug`
- Excerpt: `text-gray-600 text-sm leading-relaxed`
- Reading time: `text-gray-400 text-xs`
- CTA link: `text-brand-red font-semibold text-sm hover:underline`

---

### Attorney Cards

**Purpose:** Display attorney listings with name, specialty, countries covered, contact info, and verification status. Used in the future attorney directory.

**Status:** Component to be built when attorney directory launches.

**Planned structure:**
```
┌─────────────────────────────────┐
│ [✓ Verified] Attorney Name      │
│ [Firm Name]                     │
│ [Countries: Mexico, El Salvador]│
│ [Languages: English, Spanish]   │
│                                 │
│ Brief bio/specialization...     │
│                                 │
│ [Contact →] [View Full Profile] │
└─────────────────────────────────┘
```

---

### Job Cards

**Purpose:** Display job listings in the employer marketplace. Used on country employment pages and the future employer marketplace.

**Status:** Component to be built when employer marketplace launches.

**Planned structure:**
```
┌─────────────────────────────────┐
│ [Company Logo] Company Name     │
│ Job Title                       │
│ [Remote] [Full-time] [English]  │
│                                 │
│ Brief description of role...    │
│                                 │
│ [Salary Range]  [Apply →]       │
└─────────────────────────────────┘
```

---

### Housing Cards

**Purpose:** Display housing listings in the business directory. Used on country housing pages.

**Component file:** `components/DirectoryCard.tsx`

**Specifications:**
- Card: `bg-white rounded-xl border border-gray-200 p-4`
- Business name: `text-navy-800 font-bold`
- Category badge: `text-xs font-semibold text-gray-500 uppercase`
- Details: `text-gray-600 text-sm`
- Verified badge: `bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full`
- Contact CTA: `text-brand-red font-semibold text-sm`

---

### Buttons

See full specification in `02_Brand_Guidelines.md` > Button Styles.

**Summary table:**

| Variant | Background | Text | Border | Use case |
|---------|-----------|------|--------|---------|
| Primary | `bg-brand-red` | white | none | Main CTA (1 per section) |
| Secondary (dark bg) | transparent | white | `border-white/20` | Secondary CTA on dark |
| Secondary (light bg) | transparent | `gray-700` | `border-gray-200` | Secondary CTA on light |
| Ghost | transparent | `brand-red` | none | Tertiary, inline |
| Gold | `bg-brand-gold` | `navy-900` | none | Checklist CTA only |
| Danger | `bg-red-600` | white | none | Destructive actions |

**Size variants:**

| Size | Padding | Text | Usage |
|------|---------|------|-------|
| Small | `px-4 py-2` | `text-sm` | Compact UI, card CTAs |
| Medium | `px-6 py-3` | `text-sm` | Standard sections |
| Large | `px-8 py-4` | `text-base` | Hero CTAs |

---

### Search Bars

**Purpose:** Allow users to filter country lists, directory listings, or knowledge center articles by keyword.

**Component files:** `components/CountrySearch.tsx`, `components/DirectorySearch.tsx`

**Accessibility:**
- Associated `<label>` (visually hidden is acceptable)
- `role="search"` on the wrapper
- Clear button announces "Clear search" to screen readers
- Results count announced via `aria-live="polite"`

**Standard search input:**
```tsx
<div className="relative">
  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  <input
    type="search"
    placeholder="Search countries..."
    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm
      focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
  />
</div>
```

**Specifications:**
- Input: `rounded-xl border border-gray-200`
- Focus ring: `ring-2 ring-brand-red`
- Icon: `Search` from Lucide, `text-gray-400`, positioned absolutely inside input
- Padding: `pl-9` to clear the icon, `pr-4` right

---

### Tables & Comparison Tables

**Purpose:** Display structured comparative data (money transfer rates, provider features, cost comparisons).

**Component file:** `components/CompareMoneyTransfer.tsx`

**When NOT to use:** Simple lists of items that don't need comparison (use bullet lists instead). On very small mobile screens, consider a card-per-row approach instead of a full table.

**Accessibility:**
- `<table>` with proper `<thead>` and `<tbody>`
- `scope="col"` on column headers
- `scope="row"` on row headers
- Caption or adjacent heading describes what the table shows
- Horizontal scroll container on mobile: `overflow-x-auto`

**Standard table:**
```tsx
<div className="overflow-x-auto rounded-2xl border border-gray-200">
  <table className="w-full text-sm">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-700">
          Provider
        </th>
        {/* more headers */}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
          <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
          {/* more cells */}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**Specifications:**
- Container: `overflow-x-auto rounded-2xl border border-gray-200`
- Header row: `bg-gray-50`
- Row hover: `hover:bg-gray-50`
- Dividers: `border-b border-gray-100`
- Cell padding: `px-4 py-3`
- Text: `text-sm text-gray-700`
- Highlighted column: `bg-blue-50` or `bg-emerald-50` (best value indicator)

---

### FAQ & Accordion

**Purpose:** Progressive disclosure for frequently asked questions, collapsible content sections.

**Component files:** `components/travel/FamilyVisitFAQ.tsx`, country page FAQ sections

**Accessibility:**
- Use `<button>` for the toggle (keyboard accessible)
- `aria-expanded` on the toggle button
- Content panel has `id` linked via `aria-controls`
- `aria-hidden` on collapsed panels

**Standard FAQ item:**
```tsx
<div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
  <button
    onClick={() => setOpen(open === i ? null : i)}
    aria-expanded={open === i}
    className="w-full text-left px-5 py-4 flex items-center justify-between
      gap-3 hover:bg-gray-50 transition-colors"
  >
    <span className="text-navy-800 font-semibold text-sm leading-snug">
      {question}
    </span>
    <ChevronDown
      size={16}
      className={`text-gray-400 flex-shrink-0 transition-transform duration-200
        ${open === i ? "rotate-180" : ""}`}
    />
  </button>
  {open === i && (
    <div className="px-5 pb-4 border-t border-gray-100">
      <p className="text-gray-600 text-sm leading-relaxed pt-3">{answer}</p>
    </div>
  )}
</div>
```

**Specifications:**
- Question: `font-semibold text-navy-800 text-sm`
- Answer: `text-gray-600 text-sm leading-relaxed`
- Toggle icon: ChevronDown, rotates 180° when open
- Transition: `duration-200` on icon rotation
- Container: `rounded-xl border border-gray-200`
- Group wrapper: `space-y-3`

---

### Tabs

**Purpose:** Switch between related content views within a section (e.g., different resource categories, different country regions).

**When NOT to use:** When the content in each tab is very long (use separate pages instead). When there are more than 5 tab options (use a select dropdown instead on mobile).

**Accessibility:**
- `role="tablist"` on the container
- `role="tab"` on each tab button
- `role="tabpanel"` on each content panel
- `aria-selected="true"` on active tab
- `aria-controls` linking tab to panel

**Standard tab bar:**
```tsx
<div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={active === tab.id}
      onClick={() => setActive(tab.id)}
      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        active === tab.id
          ? "bg-white text-navy-800 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>
```

---

### Pagination

**Purpose:** Navigate through multi-page content sets (directory listings, article lists, country lists).

**Accessibility:**
- `nav` wrapper with `aria-label="Pagination"`
- Current page: `aria-current="page"`
- Previous/next buttons: descriptive labels, not just arrows

**Standard pagination:**
```tsx
<nav aria-label="Pagination" className="flex items-center gap-2">
  <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600
    hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
    ← Previous
  </button>

  {pages.map((page) => (
    <button key={page} aria-current={currentPage === page ? "page" : undefined}
      className={`w-9 h-9 rounded-lg text-sm font-semibold ${
        currentPage === page
          ? "bg-brand-red text-white"
          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
      }`}>
      {page}
    </button>
  ))}

  <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600
    hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
    Next →
  </button>
</nav>
```

---

### Breadcrumbs

**Purpose:** Contextual wayfinding within deep page hierarchies (country sub-pages, resource category pages).

**Accessibility:**
- `nav` with `aria-label="Breadcrumb"`
- `aria-current="page"` on the final (current) breadcrumb item
- Structured using `<ol>` list

**Standard breadcrumb:**
```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-gray-500">
    <li><Link href="/" className="hover:text-navy-800">Home</Link></li>
    <li aria-hidden="true" className="text-gray-300">/</li>
    <li><Link href="/resources" className="hover:text-navy-800">Resources</Link></li>
    <li aria-hidden="true" className="text-gray-300">/</li>
    <li aria-current="page" className="text-gray-800 font-medium">Money Transfer</li>
  </ol>
</nav>
```

**Specifications:**
- Font: `text-sm`
- Color: `text-gray-500` for links, `text-gray-800 font-medium` for current
- Separator: `/` with `text-gray-300`
- Hover: `hover:text-navy-800`
- Position: Immediately below navbar, before page H1

---

### Email Capture & Newsletter Forms

**Purpose:** Capture user email addresses for newsletter, checklist download, and product communication.

**Component files:** `components/NewsletterForm.tsx`, `components/travel/FamilyVisitEmailForm.tsx`, `components/career/CareerEmailCapture.tsx`, `components/ChecklistGate.tsx`

**When NOT to use:** Never embed email capture inside the flow of critical content (below fold is fine). Never use more than one email form per page without strong justification.

**Accessibility:**
- Visible or `sr-only` label for every input
- Error messages linked to inputs via `aria-describedby`
- Submit button has clear action label
- Success state announced via `aria-live`

**Standard newsletter form (dark background):**
```tsx
<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
  <label htmlFor="email" className="sr-only">Email address</label>
  <input
    id="email"
    type="email"
    required
    placeholder="your@email.com"
    className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl
      px-4 py-3 text-sm placeholder-white/50
      focus:outline-none focus:ring-2 focus:ring-brand-red"
  />
  <button type="submit"
    className="bg-brand-red hover:bg-brand-red-dark text-white font-bold
      px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
    Subscribe →
  </button>
</form>
```

**Multi-field form (family visit, career capture):**
- Grid layout: `grid grid-cols-1 sm:grid-cols-2 gap-4`
- Fields: name, email, country visiting, travel month
- All fields: `bg-gray-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm`
- Submit: `w-full bg-brand-red ... py-3 rounded-xl`
- Privacy note: `text-gray-500 text-xs text-center` below submit

---

### Modals

**Purpose:** Display critical information or forms that require user attention without navigating away from the current page (checklist email gate, immigration assessment).

**Component files:** `components/ChecklistGate.tsx`, `components/ImmigrationAssessmentModal.tsx`

**Accessibility:**
- Focus trapped within modal when open
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` pointing to modal title
- Close button (X) and backdrop click both close the modal
- Escape key closes the modal
- Focus returns to trigger element on close

**Standard modal structure:**
```
[Backdrop: bg-black/60 fixed inset-0 z-50]
  [Panel: fixed centered, max-w-md, bg-white rounded-2xl p-6 shadow-2xl]
    [Close button: top-right, aria-label="Close"]
    [Modal title: font-bold text-xl]
    [Content]
    [Action buttons]
```

**Specifications:**
- Backdrop: `bg-black/60`
- Panel: `bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full mx-4`
- Close button: `text-gray-400 hover:text-gray-600 absolute top-4 right-4`
- Title: `font-extrabold text-xl text-navy-800`
- Max-width: `max-w-md` for single-column modals, `max-w-lg` for forms

---

### Alerts & Banners

**Purpose:** Communicate status, warnings, or informational messages to the user in context.

**Accessibility:**
- `role="alert"` for time-sensitive messages (errors, warnings)
- `role="status"` for informational updates (success)
- `aria-live="polite"` for non-urgent messages

**Variants:**

**Info (blue):**
```tsx
<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
  <p className="text-blue-800 text-sm">{message}</p>
</div>
```

**Warning (amber):**
```tsx
<div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
  <p className="text-amber-800 text-sm">{message}</p>
</div>
```

**Error (red):**
```tsx
<div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
  <p className="text-red-800 text-sm">{message}</p>
</div>
```

**Success (green):**
```tsx
<div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
  <p className="text-green-800 text-sm">{message}</p>
</div>
```

---

### Disclaimers

**Purpose:** Legal disclaimers (not legal advice), affiliate disclosure, educational content notices.

**Legal disclaimer:**
```tsx
<div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
  <p className="text-amber-800 text-sm">
    ⚠️ <strong>Educational purposes only.</strong> This content does not constitute legal advice.
    Immigration law is complex. Please consult a qualified immigration attorney for advice
    specific to your situation.
  </p>
</div>
```

**Compact affiliate disclosure (inline):**
```tsx
<p className="text-gray-500 text-xs mt-4">
  Some links may be affiliate links. We only recommend services we believe genuinely help our community.{" "}
  <Link href="/affiliate-disclosure" className="underline hover:text-gray-700">
    Full disclosure →
  </Link>
</p>
```

---

### Success Banners

**Purpose:** Confirm that a user action (form submission, download) completed successfully.

**Standard success banner:**
```tsx
<div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
  <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
  <p className="text-green-800 font-semibold">{successTitle}</p>
  <p className="text-green-700 text-sm mt-1">{successMessage}</p>
</div>
```

---

### 404 Page

**File:** `app/not-found.tsx`

**Purpose:** Graceful handling of invalid URLs. Should redirect users to useful content rather than leaving them stranded.

**Required elements:**
1. Clear message: "This page doesn't exist or has been moved."
2. Primary CTA: "Go to Homepage" (red button)
3. Secondary CTAs: "Browse Country Guides", "Find Resources"
4. Search bar (optional, for finding content)

**What NOT to do:** Do not use technical language ("404 Not Found"). Do not leave users with only a "Go Back" option. Do not use a blank page.

---

### Loading States & Skeleton Loaders

**Purpose:** Provide visual feedback while content is loading from Supabase or generating dynamically.

**When to use:**
- Any component that makes an async request (Supabase queries, API calls)
- Form submissions (disable + loading indicator)
- Search results loading

**Skeleton loader pattern:**
```tsx
<div className="animate-pulse">
  <div className="bg-gray-200 rounded-2xl h-48 mb-3" />
  <div className="bg-gray-200 rounded h-4 w-3/4 mb-2" />
  <div className="bg-gray-200 rounded h-4 w-1/2" />
</div>
```

**Button loading state:**
```tsx
<button disabled className="bg-brand-red opacity-75 cursor-not-allowed text-white ...">
  Loading...
</button>
```

**Specifications:**
- Skeleton elements: `bg-gray-200 animate-pulse rounded`
- Duration: `animate-pulse` default (2s cycle)
- Shape should match the content it represents (image skeleton = same aspect ratio)

---

### Mobile Navigation

**Purpose:** Primary navigation for mobile users (< 768px).

**Component:** Integrated in `Navbar.tsx`

**Pattern:** Hamburger icon → full-screen overlay menu

**Accessibility:**
- `aria-expanded` on hamburger button
- `aria-label="Open menu"` / `"Close menu"` on button
- Menu closes on navigation (route change)
- Menu closes on Escape key
- Focus trapped when menu is open

**Specifications:**
- Hamburger button: `text-white` on `bg-navy-800`, 44×44px touch target
- Overlay: `bg-navy-900 fixed inset-0 z-50`
- Menu links: large touch targets (`py-4`), `text-white text-lg font-semibold`
- Dividers: `border-b border-white/10`
- Close button: top-right X button
- Primary CTA: full-width red button at bottom

---

## Animation Guidelines

Animations must serve communication, not aesthetics. Gratuitous animation is banned.

### Permitted Animations

| Animation | Class | Usage |
|-----------|-------|-------|
| Color transitions | `transition-colors duration-200` | All hover states (buttons, links, cards) |
| Transform transitions | `transition-transform duration-200` | Card hover scale, accordion chevron rotation |
| Opacity transitions | `transition-opacity duration-200` | Show/hide overlays, loading states |
| Pulse | `animate-pulse` | Skeleton loaders only |
| Spin | `animate-spin` | Loading spinners only |

### Rules

1. Maximum transition duration: `duration-300` for most animations. `duration-200` preferred.
2. Never use transitions purely decoratively — every animation must serve a functional purpose (confirming interaction, indicating state change, providing loading feedback)
3. Test with `prefers-reduced-motion: reduce` — animations must be suppressible
4. No page-enter animations that delay content display
5. No parallax effects (too complex for the audience's device range)
6. No auto-playing video or animation loops

---

## Dark Mode Readiness

The platform is currently **dark-by-default on key surfaces** (navbar, hero, sections). A full dark mode toggle is not yet implemented but the architecture should support it.

### Current dark surfaces
- Navbar: `bg-navy-800`
- Hero sections: `bg-navy-800` or image with `bg-black/55` overlay
- Country guide primary sections: `bg-navy-800`
- Career section headers: `bg-navy-800`
- Footer: `bg-navy-900`

### Light surfaces
- Card backgrounds: `bg-white`
- Section backgrounds: `bg-gray-50` or `bg-white`
- Form inputs: `bg-white` with `border-gray-200`

### Dark mode preparation rules
- Never hardcode `#ffffff` or `#000000` — always use Tailwind color tokens
- Use `bg-white` and `text-gray-900` for light surfaces (these can be overridden with dark mode variants)
- Do not use `bg-[#someColor]` arbitrary values in components — always use semantic tokens

---

## Section Background Patterns

Consistent alternation of section backgrounds creates visual rhythm without requiring decorative elements.

### Standard Section Sequence (most pages)

```
1. Hero → bg-navy-800 (dark) or image overlay
2. Intro/Stats → bg-white or bg-gray-50 (light)
3. Primary content → bg-white (light)
4. Feature callout → bg-navy-800 or bg-brand-red (dark, accent)
5. Secondary content → bg-gray-50 (light, slightly different)
6. Newsletter/CTA → bg-navy-800 (dark)
7. Footer → bg-navy-900 (darkest)
```

### Dark Section Text Defaults
- Primary text: `text-white`
- Secondary text: `text-gray-300`
- Tertiary text: `text-gray-400`
- Never use `text-gray-700` or darker on navy backgrounds

### Light Section Text Defaults
- Primary text: `text-gray-900` or `text-navy-800`
- Secondary text: `text-gray-600`
- Tertiary text: `text-gray-400`
- Never use `text-white` on white or gray-50 backgrounds

---

*Document End — Version 1.0*
