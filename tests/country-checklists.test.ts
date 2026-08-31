import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { COUNTRY_CHECKLISTS } from "../data/checklistContent.ts";

const ROOT = path.join(import.meta.dirname, "..");

function read(file: string): string {
  return fs.readFileSync(file, "utf8");
}

test("COUNTRY_CHECKLISTS has exactly the 3 expected countries, fully populated", () => {
  assert.deepEqual(Object.keys(COUNTRY_CHECKLISTS).sort(), ["el-salvador", "guatemala", "mexico"]);

  for (const [slug, entry] of Object.entries(COUNTRY_CHECKLISTS)) {
    assert.equal(entry.slug, slug);
    assert.equal(entry.filename, `${slug}-restart-checklist.pdf`, `filename mismatch for ${slug}`);
    assert.equal(entry.sections.length, 4, `${slug} must have exactly 4 sections`);
    for (const section of entry.sections) {
      assert.ok(section.title.length > 0, `${slug} has a section with no title`);
      assert.ok(section.items.length > 0, `${slug} section "${section.title}" has no items`);
    }
    assert.equal(entry.contacts.length, 6, `${slug} must have exactly 6 contact rows`);
    for (const contact of entry.contacts) {
      assert.ok(contact.label.length > 0 && contact.value.length > 0, `${slug} has an empty contact row`);
    }
  }
});

test("the dynamic country route reuses the shared PDF builder, not its own pdfkit calls", () => {
  const source = read(path.join(ROOT, "app/api/checklist/[country]/route.ts"));
  assert.match(source, /from ["']@\/lib\/checklist\/buildChecklistPdf["']/);
  assert.match(source, /from ["']@\/data\/checklistContent["']/);
  assert.ok(!source.includes("new PDFDocument("), "the dynamic route must not draw its own PDF");
});

test("the Laos route reuses the shared PDF builder after the refactor, not its own pdfkit calls", () => {
  const source = read(path.join(ROOT, "app/api/checklist/route.ts"));
  assert.match(source, /from ["']@\/lib\/checklist\/buildChecklistPdf["']/);
  assert.ok(!source.includes("new PDFDocument("), "the Laos route must not draw its own PDF after the refactor");
});

test("buildChecklistPdf is the single place that constructs a PDFDocument", () => {
  const source = read(path.join(ROOT, "lib/checklist/buildChecklistPdf.ts"));
  const matches = source.match(/new PDFDocument\(/g) ?? [];
  assert.equal(matches.length, 1, "expected exactly one PDFDocument construction in the shared builder");
});

test("the country page wires the checklist CTA to all 3 countries and excludes laos", () => {
  const source = read(path.join(ROOT, "app/[country]/page.tsx"));
  assert.match(source, /ChecklistGate/);
  for (const slug of ["mexico", "el-salvador", "guatemala"]) {
    assert.ok(source.includes(`"${slug}"`), `expected "${slug}" in the checklist allowlist`);
  }
  assert.ok(
    !/COUNTRIES_WITH_CHECKLIST\s*=\s*\[[^\]]*"laos"/.test(source),
    "laos must not be in the checklist allowlist — it has its own unparameterized /api/checklist route",
  );
});
