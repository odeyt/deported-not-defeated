"use client";

import { Trash2, Plus } from "lucide-react";
import { KNOWLEDGE_CATEGORIES, CATEGORY_LABELS } from "@/lib/knowledgeCenter/categories";
import { AFFILIATE_CATEGORIES, CATEGORY_LABELS as AFFILIATE_CATEGORY_LABELS } from "@/lib/affiliate/categories";

export const inputClass =
  "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-navy-500 text-sm";

export interface ArticleFormState {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string;
  reading_time_minutes: string;
  last_updated_at: string;
  related_article_slugs: string;
  related_country_slugs: string;
  affiliate_category: string;
  faqs: { question: string; answer: string }[];
  featured: boolean;
  published: boolean;
}

export const EMPTY_ARTICLE_FORM: ArticleFormState = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  content: "",
  tags: "",
  reading_time_minutes: "",
  last_updated_at: new Date().toISOString().slice(0, 10),
  related_article_slugs: "",
  related_country_slugs: "",
  affiliate_category: "",
  faqs: [],
  featured: false,
  published: false,
};

interface Props {
  form: ArticleFormState;
  update: <K extends keyof ArticleFormState>(field: K, value: ArticleFormState[K]) => void;
}

/**
 * Shared field markup for the article create/edit forms — extracted because
 * the repeatable FAQ editor makes this form long enough that duplicating it
 * in both app/admin/articles/new/page.tsx and app/admin/articles/[id]/edit
 * would be a real maintenance risk. Each page still owns its own fetch/submit
 * logic, matching the rest of the admin CRUD (e.g. affiliates new vs. edit).
 */
export default function ArticleFormFields({ form, update }: Props) {
  function updateFaq(index: number, field: "question" | "answer", value: string) {
    const next = form.faqs.slice();
    next[index] = { ...next[index], [field]: value };
    update("faqs", next);
  }

  function addFaq() {
    update("faqs", [...form.faqs, { question: "", answer: "" }]);
  }

  function removeFaq(index: number) {
    update("faqs", form.faqs.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Slug *</label>
          <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
          <select required value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
            <option value="">Select category...</option>
            {KNOWLEDGE_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Last Updated</label>
          <input type="date" value={form.last_updated_at} onChange={(e) => update("last_updated_at", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Excerpt</label>
        <textarea rows={2} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className={inputClass + " resize-none"} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Content (HTML)</label>
        <textarea
          rows={14}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          className={inputClass + " font-mono text-xs resize-y"}
          placeholder="<p>...</p><h2 id=&quot;section-1&quot;>Section heading</h2><p>...</p>"
        />
        <p className="text-[11px] text-gray-500 mt-1">
          Trusted admin-authored HTML. Give each `&lt;h2&gt;`/`&lt;h3&gt;` an `id` attribute to have it
          appear in the article&apos;s table of contents.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Tags (comma-separated)</label>
          <input value={form.tags} onChange={(e) => update("tags", e.target.value)} className={inputClass} placeholder="voluntary departure, ICE, checklist" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Reading Time (minutes, blank = auto)</label>
          <input
            type="number"
            min={1}
            value={form.reading_time_minutes}
            onChange={(e) => update("reading_time_minutes", e.target.value)}
            className={inputClass}
            placeholder="Estimated from content if left blank"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Related Article Slugs (comma-separated)</label>
          <input value={form.related_article_slugs} onChange={(e) => update("related_article_slugs", e.target.value)} className={inputClass} placeholder="before-you-leave-checklist, family-preparation-guide" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Related Country Slugs (comma-separated)</label>
          <input value={form.related_country_slugs} onChange={(e) => update("related_country_slugs", e.target.value)} className={inputClass} placeholder="mexico, el-salvador, guatemala" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Affiliate Category</label>
        <select value={form.affiliate_category} onChange={(e) => update("affiliate_category", e.target.value)} className={inputClass}>
          <option value="">None — no affiliate block on this article</option>
          {AFFILIATE_CATEGORIES.map((c) => <option key={c} value={c}>{AFFILIATE_CATEGORY_LABELS[c]}</option>)}
        </select>
        <p className="text-[11px] text-gray-500 mt-1">
          Only set this when there is a genuinely relevant provider category — leave blank rather
          than force a mismatched affiliate block.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">FAQ</p>
          <button type="button" onClick={addFaq} className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-brand-red">
            <Plus size={13} /> Add Question
          </button>
        </div>
        {form.faqs.length === 0 && <p className="text-xs text-gray-500">No FAQ entries yet.</p>}
        {form.faqs.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2 relative">
            <button
              type="button"
              onClick={() => removeFaq(i)}
              aria-label={`Remove FAQ ${i + 1}`}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={14} />
            </button>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Question</label>
              <input value={faq.question} onChange={(e) => updateFaq(i, "question", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Answer</label>
              <textarea rows={2} value={faq.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} className={inputClass + " resize-none"} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5">
        {([
          ["featured", "Featured"],
          ["published", "Published"],
        ] as const).map(([field, label]) => (
          <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form[field]} onChange={(e) => update(field, e.target.checked)} className="accent-navy-600" />
            {label}
          </label>
        ))}
      </div>
    </>
  );
}
