# Brand Guidelines — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active  
**Cross-References:** `00_Project_Vision.md`, `03_UI_Design_System.md`

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Visual Style](#visual-style)
3. [Typography](#typography)
4. [Color Palette](#color-palette)
5. [Spacing System](#spacing-system)
6. [Corner Radius Standards](#corner-radius-standards)
7. [Button Styles](#button-styles)
8. [Icons](#icons)
9. [Illustration & Avatar Style](#illustration--avatar-style)
10. [Photography Style](#photography-style)
11. [Accessibility Standards](#accessibility-standards)
12. [Voice & Tone](#voice--tone)
13. [Professional Terminology](#professional-terminology)
14. [Words to Avoid](#words-to-avoid)
15. [Headline Style](#headline-style)
16. [CTA Style](#cta-style)
17. [Error Messages](#error-messages)
18. [Success Messages](#success-messages)
19. [Legal Disclaimer Formatting](#legal-disclaimer-formatting)
20. [Affiliate Disclosure Formatting](#affiliate-disclosure-formatting)
21. [Image Standards](#image-standards)

---

## Brand Identity

### Name
**DeportedNotDefeated.com** — always written in full as "Deported Not Defeated" in body text. The ".com" is dropped in conversational usage but retained in formal references and the logo.

### Logo Treatment
The logo wordmark uses three words with distinct visual weight:
- "Deported" — standard white on dark, or dark on light
- "Not" — rendered in **brand-red** (`#c0392b`) to create the visual break and the central brand tension
- "Defeated" — standard white on dark, or dark on light

The red "Not" is the single most important brand element. It must always appear in brand-red. It must never be removed, recolored, or made smaller than the surrounding words. It is the visual representation of the platform's entire thesis.

### Tagline
**"Your story is not over. Start again with dignity, direction, and support."**

Used in hero sections, email footers, and introductory copy. Never broken across multiple lines in a way that separates "not over" from the rest of the sentence. Never abbreviated.

### Brand Personality
The brand personality sits at the intersection of four qualities:
- **Steady** — not reactive, not emotional, not dramatic
- **Informed** — expert knowledge delivered in plain language
- **Warm** — genuine care without condescension or pity
- **Practical** — every word earns its place by helping the user take action

The brand personality does NOT include: urgency, alarm, political advocacy, victimhood framing, or inspirational platitudes.

---

## Visual Style

The visual style is **dark-navy professional with high-contrast red accents**. It is designed to convey:
- Authority and trustworthiness (dark navy)
- Urgency and action (brand red)
- Clarity and calm (clean layout, generous whitespace)
- Warmth (photography of real people, warm photography tone)

**Core aesthetic principles:**
1. Dark navy backgrounds for primary sections, white backgrounds for content-heavy sections
2. High contrast between text and backgrounds — always
3. Clean grid layouts with consistent gutters
4. Typography does most of the visual work — no decorative elements
5. Real photography of real people — no stock illustration people
6. Rounded corners throughout (never sharp angles) to soften the institutional feel

---

## Typography

### Primary Typeface
**Inter** (Google Fonts)  
Imported weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)

Inter is selected for:
- Excellent readability on small screens (critical for mobile-first audience)
- Strong weight range (allows hierarchy without additional typefaces)
- Open-source and free (no licensing cost)
- Works well at both large display sizes and small body text sizes

**No secondary typeface.** Do not add serif, display, or handwriting fonts without a documented decision in `DECISIONS.md`.

### Type Scale

| Name | Class | Size | Weight | Line Height | Usage |
|------|-------|------|--------|-------------|-------|
| Display | `text-5xl` / `text-6xl` | 48–60px | 800 | 1.1 | Hero headlines only |
| H1 | `text-4xl` / `text-5xl` | 36–48px | 800 | 1.15 | Page titles |
| H2 | `text-2xl` / `text-3xl` | 24–30px | 700 | 1.2 | Section headings |
| H3 | `text-xl` | 20px | 700 | 1.3 | Card titles, sub-sections |
| H4 | `text-base` / `text-lg` | 16–18px | 600 | 1.4 | Label headings |
| Body Large | `text-lg` | 18px | 400 | 1.6 | Intro paragraphs |
| Body | `text-base` | 16px | 400 | 1.6 | Standard body text |
| Body Small | `text-sm` | 14px | 400 | 1.5 | Secondary text, captions |
| Label | `text-xs` | 12px | 600–700 | 1.4 | Tags, badges, uppercase labels |
| Micro | `text-xs` | 11px | 400 | 1.4 | Legal disclaimers only |

### Text Hierarchy Rules
- Never use more than three type sizes on a single screen
- Always use `font-extrabold` (800) for the most important headline on any page
- Labels and badges use `uppercase tracking-widest` for visual distinction
- Legal disclaimers use `text-xs text-gray-500`

---

## Color Palette

### Primary Palette

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Navy 50 | `#f0f4ff` | `bg-navy-50` | Light section backgrounds |
| Navy 100 | `#e0e9ff` | `bg-navy-100` | Secondary light backgrounds |
| Navy 500 | `#1e3a6e` | `text-navy-500` | Navy text on light backgrounds |
| Navy 600 | `#162d58` | `bg-navy-600` | Mid-dark navy sections |
| Navy 700 | `#0f2040` | `bg-navy-700` | Dark section backgrounds |
| Navy 800 | `#0a1628` | `bg-navy-800` | Primary dark background (navbar, hero) |
| Navy 900 | `#060d1a` | `bg-navy-900` | Deepest dark (footer, overlays) |
| Brand Red | `#c0392b` | `bg-brand-red` | Primary accent, CTA buttons, "Not" text |
| Brand Red Dark | `#922b21` | `bg-brand-red-dark` | Button hover state |
| Brand Gold | `#f39c12` | `text-brand-gold` | Highlights, secondary accents |

### Category Colors
Each resource category has a dedicated color identity:

| Category | Primary Color | Secondary | Tailwind Usage |
|----------|--------------|-----------|----------------|
| Money Transfer | Emerald | Teal | `from-emerald-500 to-teal-600` |
| Phone & Internet | Blue | Indigo | `from-blue-400 to-indigo-600` |
| VPN & Privacy | Violet | Purple | `from-violet-400 to-purple-600` |
| Health Insurance | Rose | Red | `from-rose-400 to-red-600` |
| Career & Education | Amber | Orange | `from-amber-400 to-orange-600` |
| Family Travel | Blue | Indigo | `from-blue-400 to-indigo-600` |
| Legal Resources | Slate | Gray | `from-slate-500 to-gray-700` |

### Neutral Palette
Standard Tailwind grays are used throughout:
- `gray-900` — primary dark text
- `gray-700` — secondary dark text
- `gray-500` — muted text, placeholders
- `gray-400` — disabled states, very secondary text
- `gray-200` — borders on light backgrounds
- `gray-100` — light section backgrounds
- `white` — card backgrounds, text on dark

### Color Rules
1. **Never** use brand red for decorative elements — only for CTAs, the "Not" wordmark, and section accents that indicate action
2. **Never** use more than two category colors on a single page
3. **Always** maintain WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
4. **Dark sections:** use white or gray-300 for body text; never gray-700 on navy-800
5. **Light sections:** use gray-900 or navy-800 for body text; never gray-400 on white

---

## Spacing System

Tailwind's default 4px spacing scale is used throughout. Key values:

| Token | px | Common Usage |
|-------|-----|-------------|
| `p-1` | 4px | Icon padding, tight micro-components |
| `p-2` | 8px | Small badge padding, tight UI |
| `p-3` | 12px | Compact card padding |
| `p-4` | 16px | Standard padding |
| `p-5` | 20px | Card content padding |
| `p-6` | 24px | Section padding on mobile |
| `p-8` | 32px | Standard section padding |
| `p-12` | 48px | Large section padding |
| `p-14` | 56px | Major section vertical padding (`py-14`) |
| `p-16` | 64px | Hero section padding |
| `gap-3` | 12px | Tight grid gaps |
| `gap-4` | 16px | Standard grid gaps |
| `gap-5` | 20px | Card grid gaps |
| `gap-6` | 24px | Larger grid gaps |

**Section vertical rhythm:** Primary content sections use `py-14 px-4` on mobile and `py-16 px-4` on desktop. This creates consistent section breaks.

**Max-width containers:**
- Standard content: `max-w-4xl mx-auto`
- Wide content (grids): `max-w-5xl mx-auto`
- Ultra-wide (hero, full-bleed): `max-w-7xl mx-auto`
- Narrow content (forms, articles): `max-w-2xl mx-auto`

---

## Corner Radius Standards

Consistent rounded corners soften the platform's institutional feel and create a modern, approachable aesthetic.

| Element | Radius | Tailwind Class |
|---------|--------|----------------|
| Cards (primary) | 16px | `rounded-2xl` |
| Cards (secondary) | 12px | `rounded-xl` |
| Buttons (primary) | 12px | `rounded-xl` |
| Buttons (pill) | 9999px | `rounded-full` |
| Badges & tags | 6px | `rounded-md` or `rounded-full` |
| Input fields | 12px | `rounded-xl` |
| Avatars & icons | 9999px | `rounded-full` |
| Images in cards | 12px | `rounded-xl` |
| Section backgrounds | None | — |
| Modals | 16px | `rounded-2xl` |

**Rule:** Never use `rounded-sm` or `rounded` (4px) on primary UI elements. Always use at least `rounded-xl` (12px) for anything the user interacts with.

---

## Button Styles

### Primary Button (Red)
```
bg-brand-red hover:bg-brand-red-dark text-white
font-bold px-6 py-3 rounded-xl
transition-colors text-sm md:text-base
```
Use for: primary CTA, the most important action on any screen. Maximum one per section.

### Secondary Button (Outlined)
```
border border-white/20 hover:border-white/40 text-white
font-semibold px-6 py-3 rounded-xl
transition-colors text-sm
```
Use for: secondary CTA on dark backgrounds. Appears alongside primary red button.

### Secondary Button (Light)
```
border border-gray-200 hover:border-gray-400 text-gray-700
font-semibold px-6 py-3 rounded-xl
transition-colors text-sm
```
Use for: secondary CTA on white backgrounds.

### Ghost Button
```
text-brand-red hover:text-brand-red-dark
font-semibold text-sm transition-colors
```
Use for: tertiary actions, inline links that look like buttons.

### Gold CTA Button (Checklist)
```
bg-brand-gold hover:opacity-90 text-navy-900
font-bold px-6 py-3 rounded-xl
transition-opacity text-sm
```
Use only for: checklist download CTA.

### Button Rules
1. Always include `transition-colors` or `transition-opacity` for hover states
2. Never disable a button without providing an explanation to the user
3. Loading state: replace button text with "Loading..." and add `opacity-75 cursor-not-allowed`
4. Destructive actions: use standard red button with explicit warning text nearby, never a separate color

---

## Icons

### Primary Icon Library
**Lucide React** — the project's primary icon library. Use lucide-react icons for UI chrome: navigation arrows, close buttons, external link indicators, search icons, etc.

Common icons:
- Navigation: `ArrowRight`, `ArrowLeft`, `ChevronDown`, `ChevronRight`
- Actions: `Download`, `ExternalLink`, `Copy`, `Check`
- Status: `AlertCircle`, `Info`, `CheckCircle`, `XCircle`
- Content: `Globe`, `Phone`, `Mail`, `MapPin`, `Building`, `Briefcase`

### Emoji Icons (Content Sections)
Profession and category emojis are used as avatar icons within gradient circular containers for the Career & Education section and resource category headers. This creates a human, warm feel while remaining universally recognizable.

**Standard emoji avatar container:**
```tsx
<div className="w-12 h-12 rounded-full bg-gradient-to-br {category-gradient}
  flex items-center justify-center text-2xl shadow-sm">
  {emoji}
</div>
```

**Career avatar examples:**
- 👨‍💼 Corporate/Business
- 👩‍🏫 Education/Teaching
- 👨‍💻 Technology/Remote Work
- 🌐 International/Remote
- 📈 Business Development
- 📄 Legal/Documents
- 🎓 Academic Credentials
- 📚 Learning/Courses
- 🔧 Technical/Trades
- 🤝 Networking/Connections
- ⭐ Featured/Premium
- 🚀 Launch/Entrepreneurship
- 🏆 Achievement/Awards

### Icon Size Standards
| Context | Size | Tailwind |
|---------|------|---------|
| Inline in body text | 14–16px | `size={14}` or `size={16}` |
| Button icon | 16px | `size={16}` |
| Card header icon | 20–22px | `size={20}` |
| Section header icon | 24px | `size={24}` |
| Large feature icon | 28–32px | `size={28}` |
| Avatar emoji | 24px (container 48px) | `text-2xl w-12 h-12` |

---

## Illustration & Avatar Style

### General Policy
No decorative stock illustrations of people. The platform's visual identity relies on real photography. Illustrations are limited to:
1. Emoji avatars in gradient containers (career, resource categories)
2. Flag emojis for country identification
3. Category emoji as section identifiers (📱 for Phone, 💸 for Money Transfer, etc.)

### Emoji Standards
- Always use the default emoji rendering — never use custom emoji fonts
- Flag emojis appear as the first character in country-related headings and list items
- Category emojis appear in section headers, card headers, and breadcrumbs

---

## Photography Style

### Primary Subject
Real people in real contexts. Never staged stock photography with obvious models. Priority: photographs that feel like they were taken in the destination country, by someone who is genuinely there.

### Tone & Treatment
- Warm but not saccharine — natural light, real environments
- Not clinical or journalistic — not poverty documentation, not crisis imagery
- Empowering framing — subjects look capable and forward-facing, not victimized
- High contrast — photographs work as dark overlays in the hero section

### Hero Image Treatment
- Full-width image with dark overlay (`bg-black/50` to `bg-black/60`)
- Text must be white on dark overlay — always test for readability
- Image should contain a person, but text overlay is the primary content

### Portrait Images (Country Cards)
- Subject looking toward camera or slightly off-camera
- Not looking down, not in distress
- Real country context visible in background or clothing
- Image dimensions: approximately 4:3 ratio, minimum 800px wide

### Values Images (`/images/value-*.jpg`)
Five images representing brand values: Courage, Faith, Education, Opportunity, Success. These appear in the homepage values strip. Each is a portrait-style image with a strong emotional quality corresponding to the value it represents.

---

## Accessibility Standards

All features must meet **WCAG 2.1 Level AA** minimum.

### Contrast Requirements
- Normal text (below 18pt): minimum 4.5:1 contrast ratio
- Large text (18pt+ or 14pt bold): minimum 3:1 contrast ratio
- UI components and graphics: minimum 3:1 against adjacent color

**Known critical contrast areas:**
- `text-gray-400` on `bg-white` — do not use; fails AA
- `text-gray-500` on `bg-navy-800` — verify before using
- Always use `text-white` or `text-gray-200` on dark navy backgrounds

### Interactive Elements
- All interactive elements must have a visible focus state (`:focus-visible` ring)
- Focus ring: `focus:outline-none focus:ring-2 focus:ring-brand-red`
- Minimum touch target: 44×44px for all tappable elements

### Images
- All informational images must have descriptive `alt` text
- Decorative images use `alt=""`
- Country flag emojis used in text: include country name in adjacent text for screen readers

### Forms
- All inputs must have associated `<label>` elements (visible or `sr-only`)
- Error messages must be associated with their input via `aria-describedby`
- Required fields must be indicated with both visual and programmatic cues

### Motion
- Respect `prefers-reduced-motion` for any animation or transition
- Critical information is never conveyed through animation alone

---

## Voice & Tone

### Core Voice Characteristics

**Steady and direct.** We speak like a knowledgeable friend who has been through this — not like a corporation, not like a government agency, and not like a social worker who is sad about your situation.

**Practical.** Every sentence should either convey information or prompt action. Sentences that are purely inspirational ("You've got this!") do not belong in body copy. Put inspiration in short headlines; put information in body copy.

**Dignified.** We never talk down to the user. We assume they are an intelligent adult who made difficult choices in a difficult situation. We do not explain things they already know. We do not use language that centers their pain.

**Honest.** We don't make promises we can't keep. "This might help" is better than "This will solve your problem." We don't claim certainty about legal situations.

**Warm without being soft.** We care about the user, but we show it through usefulness, not sentiment. The warmest thing we can do is give them accurate information quickly.

### Tone by Context

| Context | Tone |
|---------|------|
| Country guide intro | Calm, practical, reassuring |
| Step-by-step instructions | Clear, direct, numbered |
| Legal content | Careful, precise, educational |
| Error messages | Neutral, constructive, solution-oriented |
| Success messages | Brief, affirming, forward-looking |
| Affiliate descriptions | Honest, comparative, benefit-focused |
| Newsletter copy | Warmer, conversational, community-focused |
| Hero section | Bold, declarative, forward-facing |

### Reading Level
Target: Grade 8–10 reading level. Body text should be readable by someone who learned English as a second language. Avoid idioms, jargon, and complex sentence structures in instructional content.

---

## Professional Terminology

### Use These Terms

| Term | Context |
|------|---------|
| "deported individual" | Primary subject of the platform (preferred over "deportee" in formal context) |
| "deportee" | Acceptable in informal context, community-facing copy |
| "rebuilding" | The primary frame for user activity |
| "destination country" | The country the user is in after deportation |
| "U.S.-based family" | Family remaining in the United States |
| "removal order" | Legal term; use only in legal content with explanation |
| "voluntary departure" | Legal term; use only with clear explanation |
| "country of origin" | Technically correct term for destination country in legal context |
| "affiliate partner" | Third-party services we recommend |
| "educational content" | How we describe legal and informational articles |
| "practical guide" | The platform's primary content format |
| "emigrant community" | When referring to deported populations in destination countries |

### Legal Content Specific
| Term | Rule |
|------|------|
| "legal advice" | NEVER use — we do not provide legal advice |
| "educational purposes only" | ALWAYS include on legal content |
| "consult an attorney" | Include on all legal content |
| "this is not legal advice" | Required disclaimer on all legal articles |

---

## Words to Avoid

| Avoid | Use Instead | Why |
|-------|------------|-----|
| "illegal immigrant" | "deported individual" or "deportee" | Dehumanizing, politically charged |
| "illegal alien" | "deported individual" | Dehumanizing, legally archaic |
| "criminal" (in reference to users) | omit or contextualize accurately | Many users have no criminal history |
| "undocumented" | use specifically and contextually | May not apply; avoid as a catch-all |
| "sent back" | "deported" or "returned to" | "Sent back" is informal and slightly degrading |
| "victim" | omit or use active framing | Removes agency; not how users see themselves |
| "tragedy" | "difficult situation," "challenge" | Over-dramatizes; may not reflect user's emotional state |
| "pity" language | any | Never appropriate |
| "you should" | "you may want to," "consider" | Prescriptive; may not apply to all situations |
| "guarantee" | "may help," "can help" | We cannot guarantee outcomes |
| "as soon as possible" | specific timeframes when possible | Vague; creates anxiety without information |
| "legal advice" | "educational information" | We do not provide legal advice — ever |
| "simply" | omit | Condescending; implies the task is easy |
| "just" (minimizing) | omit | "Just fill out the form" minimizes complexity |
| "obviously" | omit | Condescending |
| "inspirational" platitudes | specific, useful information | Empty without substance |

---

## Headline Style

### Capitalization
**Title Case** for: page titles, section headings (H1, H2), card titles, button labels, navigation items.  
**Sentence case** for: body text, list items, captions, form labels.

### Format Conventions
- H1 headlines: short (3–8 words), declarative, no question marks in hero positions
- H2 section headings: describe what the user will get from this section
- Card titles: 2–5 words, noun phrases preferred
- No period at the end of headlines
- Questions are acceptable in FAQ contexts and legal resource titles

### Examples

**Strong headlines:**
- "Rebuilding Life in Mexico After Deportation"
- "Send Money Home to Your Family"
- "Your First 30 Days in Laos"
- "Can a Deported Person Return to the USA?"

**Weak headlines (avoid):**
- "Welcome to Our Resources Page"
- "Helpful Information for You"
- "Check Out These Great Services"
- "Everything You Need to Know"

---

## CTA Style

### Primary CTA Formula
Action verb + specific benefit + directional indicator

**Examples:**
- "Download Free Checklist →"
- "Compare Money Transfer Rates →"
- "Get Your Free Immigration Report →"
- "Find Housing in Mexico →"
- "Start Your Career Assessment →"

### Secondary CTA Formula
Action verb + destination

**Examples:**
- "View All Countries →"
- "Read the Full Guide →"
- "See All Resources →"
- "Learn More →" (acceptable when context is clear)

### CTA Rules
1. Always include a directional arrow (`→`) on text CTAs that navigate away
2. External link CTAs include: `↗` or note "(opens new tab)"
3. Never use "Click Here" — always describe the destination or action
4. CTA buttons on dark backgrounds: white text on brand-red
5. CTA links on dark backgrounds: white with underline on hover
6. Maximum two CTAs per section (primary + secondary)

---

## Error Messages

### Principles
- Neutral tone — not apologetic, not alarming
- Explain what happened in plain language
- Always include what the user can do next
- Never blame the user

### Format
```
[What happened] + [What to do next]
```

### Examples

| Error | Message |
|-------|---------|
| Form submission failed | "Something went wrong. Please try again, or contact us at contact@deportednotdefeated.com if this continues." |
| Required field empty | "Please enter your [field name]." |
| Invalid email | "Please enter a valid email address (example@email.com)." |
| Page not found | "This page doesn't exist. It may have been moved or removed." |
| Network error | "We couldn't load this content. Check your internet connection and try again." |
| File too large | "This file is too large. Please use a file under [size limit]." |

---

## Success Messages

### Principles
- Brief (1–2 sentences)
- Confirm what happened
- Tell them what comes next (if relevant)
- Forward-looking, not effusive

### Examples

| Action | Message |
|--------|---------|
| Email subscribed | "You're subscribed. Check your inbox for a welcome email and your free checklist." |
| Contact form sent | "Your message was sent. We'll respond within 1–2 business days." |
| Checklist downloaded | "Your checklist is downloading. Save it to your phone for easy access." |
| AI report complete | "Your report is ready. We've also sent a copy to your email." |

---

## Legal Disclaimer Formatting

All legal educational content must include this disclaimer, prominently placed at the top or bottom of the page:

```
This content is for educational purposes only and does not constitute legal advice. 
Immigration law is complex and changes frequently. Please consult a qualified 
immigration attorney for advice specific to your situation.
```

**Styling:**
- Container: `bg-amber-50 border border-amber-200 rounded-xl p-4`
- Icon: ⚠️ or `AlertCircle` from Lucide
- Text: `text-amber-800 text-sm`
- Position: After the page headline, before the main content body

---

## Affiliate Disclosure Formatting

The affiliate disclosure must appear on every page that contains affiliate links. Two formats are used:

### Full Disclosure (resource pages, affiliate cards)
```
Some links on this page are affiliate links. If you click through and make 
a purchase, we may earn a small commission at no extra cost to you. 
We only recommend services we believe are genuinely helpful to our community. 
Read our full Affiliate Disclosure.
```

### Compact Disclosure (country pages, inline)
```
Some links may be affiliate links. Travel information is educational — 
verify visa rules and safety with official government sources before booking.
```

**Styling:**
- Container: `text-gray-500 text-xs` in footer of the section or page
- Link to `/affiliate-disclosure` always present in full disclosure
- Position: Bottom of page, section footer, or below affiliate card grids

---

## Image Standards

### File Format
- Photography: WebP (preferred) or JPEG with quality 85–90
- Icons: SVG (preferred) or embedded via Lucide React
- No PNG for photographs (file size too large)
- No GIF for anything (quality too low; accessibility issues)

### Sizing
- Hero images: minimum 1920×1080px source; optimized via Next.js Image component
- Country portrait cards: minimum 800×600px source
- Values strip images: minimum 600×800px (portrait orientation)

### Next.js Image Optimization
All images use the `<Image />` component from `next/image`:
- Set `width` and `height` explicitly OR use `fill` with a sized container
- Set `priority` on above-the-fold images (hero, first portrait cards)
- Use `quality={90}` for photography
- Always provide descriptive `alt` text

### Country Image Standard
Country-representative images should:
- Feature a real person from that country
- Not depict poverty, distress, or border-crossing situations
- Show the country positively — local culture, landscapes, communities
- Have rights cleared for commercial use

---

*Document End — Version 1.0*
