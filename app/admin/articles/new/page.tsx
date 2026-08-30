"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { estimateReadingTimeMinutes } from "@/lib/knowledgeCenter/readingTime";
import ArticleFormFields, { EMPTY_ARTICLE_FORM, type ArticleFormState } from "../ArticleFormFields";

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ArticleFormState>(EMPTY_ARTICLE_FORM);

  function update<K extends keyof ArticleFormState>(field: K, value: ArticleFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      category: form.category,
      excerpt: form.excerpt || null,
      content: form.content,
      tags: splitList(form.tags),
      reading_time_minutes:
        form.reading_time_minutes.trim() !== ""
          ? parseInt(form.reading_time_minutes, 10)
          : estimateReadingTimeMinutes(form.content),
      last_updated_at: form.last_updated_at || null,
      related_article_slugs: splitList(form.related_article_slugs),
      related_country_slugs: splitList(form.related_country_slugs),
      affiliate_category: form.affiliate_category || null,
      faqs: form.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      featured: form.featured,
      published: form.published,
    };

    const { error } = await supabase.from("articles").insert(payload);
    if (!error) {
      router.push("/admin/articles");
    } else {
      alert(error.message);
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-navy-800">New Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <ArticleFormFields
          form={form}
          update={update}
        />
        {/* Slug auto-fills from the title if left blank */}
        {!form.slug && form.title && (
          <p className="text-[11px] text-gray-500 -mt-3">
            Slug will be generated as: <span className="font-mono">{slugify(form.title)}</span>
          </p>
        )}

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            {saving ? "Saving..." : "Save Article"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
