# Documentation System — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active

---

## Table of Contents

1. [Purpose](#purpose)
2. [How Claude Code Should Use This Documentation](#how-claude-code-should-use-this-documentation)
3. [Document Index](#document-index)
4. [Versioning Rules](#versioning-rules)
5. [Naming Conventions](#naming-conventions)
6. [Document Numbering](#document-numbering)
7. [Review Process](#review-process)
8. [Future Document Roadmap](#future-document-roadmap)

---

## Purpose

This `/docs` directory is the **official Project Bible** for DeportedNotDefeated.com. It is the single source of truth for all product decisions, design standards, technical architecture, user research, and strategic direction.

Every document in this system was created after a complete audit of the existing codebase, routes, components, data models, branding, and business objectives. Nothing in this documentation is speculative or hypothetical — it reflects the actual project as built and the strategic direction as defined.

**This documentation serves three functions:**

1. **Institutional memory** — captures why decisions were made so future contributors understand context, not just code
2. **Implementation standards** — defines how every new feature, component, and page should be built
3. **Alignment tool** — ensures every Claude Code session, every contractor, and every future team member builds toward the same product vision

---

## How Claude Code Should Use This Documentation

**Before starting any task:**

- Read `00_Project_Vision.md` to understand mission, values, and what success looks like
- Read `01_Product_Strategy.md` to understand how the specific feature being built fits the product
- Read `02_Brand_Guidelines.md` before writing any copy or designing any UI
- Read `03_UI_Design_System.md` before creating any component or page layout
- Read `05_Information_Architecture.md` before adding any new routes or navigation links

**Before creating a new component:**

- Check `03_UI_Design_System.md` for whether a reusable component already exists
- Follow the component standards defined there for spacing, padding, accessibility, and naming

**Before writing any copy:**

- Follow the voice, tone, and terminology rules in `02_Brand_Guidelines.md`
- Respect the words-to-avoid list
- Use the headline and CTA formulas defined there

**Before making a significant technical decision:**

- Check `DECISIONS.md` to see if this decision was already made and why
- If making a new significant decision, add it to `DECISIONS.md` after completing it

**Before touching navigation or routes:**

- Read `05_Information_Architecture.md` for the full sitemap and URL hierarchy
- Do not add routes that conflict with the planned structure

**Rule:** If a new feature contradicts anything in this documentation, surface the conflict before building. Do not silently override documented decisions.

---

## Document Index

| File | Title | Pages | Purpose |
|------|-------|-------|---------|
| `README.md` | Documentation System Overview | 3 | How to use this docs system |
| `00_Project_Vision.md` | Project Vision | ~12 | Mission, values, who we serve, long-term vision |
| `01_Product_Strategy.md` | Product Strategy | ~18 | Features, user journeys, revenue model, roadmap logic |
| `02_Brand_Guidelines.md` | Brand Guidelines | ~15 | Visual identity, voice, tone, terminology |
| `03_UI_Design_System.md` | UI Design System | ~20 | Every reusable component, standards, accessibility |
| `04_User_Personas.md` | User Personas | ~15 | Detailed profiles of every user type |
| `05_Information_Architecture.md` | Information Architecture | ~10 | Full sitemap, URL hierarchy, internal linking |
| `ROADMAP.md` | Product Roadmap | ~8 | Phase-by-phase feature delivery plan |
| `CHANGELOG.md` | Changelog | Ongoing | Version history of documentation |
| `DECISIONS.md` | Engineering Decisions | Ongoing | Why major technical decisions were made |
| `Knowledge-Center-Master-Spec.md` | Knowledge Center Spec | ~10 | Full spec for the Knowledge Center expansion |

---

## Versioning Rules

Documentation versions follow **Semantic Versioning** adapted for documentation:

- **Major version (X.0)** — Complete structural overhaul or strategic pivot. Requires full review.
- **Minor version (X.Y)** — New section added, new component documented, significant expansion.
- **Patch (X.Y.Z)** — Correction, clarification, typo fix, minor update.

**Current version: 1.0**

Every document header must include:
```
Version: X.Y.Z
Last Updated: YYYY-MM-DD
Owner: [role or name]
Status: Active | Draft | Deprecated
```

When updating a document:
1. Increment the version number in the document header
2. Add an entry to `CHANGELOG.md` describing what changed and why
3. If the change affects another document, update that document too and log both

---

## Naming Conventions

### Files

- Use the format: `NN_Title_With_Underscores.md`
- Numbered documents (00–09) use two-digit prefix
- Special documents (ROADMAP, CHANGELOG, DECISIONS) are uppercase, no number
- No spaces in filenames
- All lowercase except uppercase special documents

### Headings

- H1 (`#`) — Document title only. One per document.
- H2 (`##`) — Major sections
- H3 (`###`) — Subsections
- H4 (`####`) — Component details or sub-subsections

### Tables

- Use Markdown tables for structured data
- Include header row and alignment separators
- Prefer tables over bullet lists for comparative data

### Code Blocks

- Use fenced code blocks (` ``` `) with language specifier
- Use `tsx` for React/TypeScript components
- Use `css` for styling
- Use `bash` for terminal commands
- Use `json` for data structures

---

## Document Numbering

Documents are numbered to establish a reading order that mirrors the product development process:

| Range | Category |
|-------|----------|
| `00` | Vision and values (read first) |
| `01` | Product strategy (read before building features) |
| `02` | Brand guidelines (read before writing copy or designing UI) |
| `03` | UI system (read before writing components) |
| `04` | User research (read to understand who you're building for) |
| `05` | Information architecture (read before adding routes) |
| `10–19` | Reserved for technical architecture documents |
| `20–29` | Reserved for operations and legal documents |
| `30–39` | Reserved for marketing and SEO documents |

---

## Review Process

**Documentation reviews occur:**

1. When a new major feature is shipped (update relevant docs to reflect the new reality)
2. When a strategic decision changes (update DECISIONS.md, update affected docs)
3. Quarterly baseline review — check for stale content, outdated component descriptions, superseded decisions

**Review checklist:**
- Is the version number current?
- Does the document reflect what actually exists in code today?
- Are there any contradictions with other documents?
- Are cross-references still accurate?
- Does any section need expansion based on new features added?

---

## Future Document Roadmap

The following documents are planned but not yet written. They should be created before the corresponding Phase of the Product Roadmap begins:

| Priority | Document | Trigger |
|----------|----------|---------|
| High | `06_SEO_Strategy.md` | Before Knowledge Center launch |
| High | `07_Content_Strategy.md` | Before article publishing begins |
| High | `08_Analytics_Framework.md` | Before revenue tracking begins |
| Medium | `09_Email_Marketing_Strategy.md` | Before email sequences are built |
| Medium | `10_Technical_Architecture.md` | Before database schema changes |
| Medium | `11_API_Documentation.md` | Before any public API is opened |
| Medium | `12_Admin_CMS_Guide.md` | Before non-technical admin access |
| Low | `13_Attorney_Directory_Spec.md` | Before attorney listings launch |
| Low | `14_Premium_Products_Spec.md` | Before any paid feature launches |
| Low | `15_Advertising_Strategy.md` | Before display ads are added |
| Low | `16_Localization_Strategy.md` | Before Spanish translation begins |
| Low | `17_Mobile_App_Spec.md` | Before native app development |

---

*This documentation system is a living artifact. It should grow with the product, not lag behind it.*
