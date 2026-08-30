"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import ArticleFormFields, { EMPTY_ARTICLE_FORM, type ArticleFormState } from "../../ArticleFormFields";

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function joinList(value: string[] | null | undefined): string {
  return (value ?? []).join(", ");
}

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [published, setPublishedOnLoad] = useState(false);
  const [slug, setSlugOnLoad] = useState("");
  const [category, setCategoryOnLoad] = useState("");
  const [form, setForm] = useState<ArticleFormState>(EMPTY_ARTICLE_FORM);

  useEffect(() => {
    createClient()
      .from("articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            title: data.title ?? "",
            slug: data.slug ?? "",
            category: data.category ?? "",
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            tags: joinList(data.tags),
            reading_time_minutes: data.reading_time_minutes != null ? String(data.reading_time_minutes) : "",
            last_updated_at: data.last_updated_at ?? "",
            related_article_slugs: joinList(data.related_article_slugs),
            related_country_slugs: joinList(data.related_country_slugs),
            affiliate_category: data.affiliate_category ?? "",
            faqs: Array.isArray(data.faqs) ? data.faqs : [],
            featured: Boolean(data.featured),
            published: Boolean(data.published),
          });
          setPublishedOnLoad(Boolean(data.published));
          setSlugOnLoad(data.slug ?? "");
          setCategoryOnLoad(data.category ?? "");
        }
        setLoading(false);
      });
  }, [id]);

  function update<K extends keyof ArticleFormState>(field: K, value: ArticleFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("articles")
      .update({
        title: form.title,
        slug: form.slug,
        category: form.category,
        excerpt: form.excerpt || null,
        content: form.content,
        tags: splitList(form.tags),
        reading_time_minutes: form.reading_time_minutes.trim() !== "" ? parseInt(form.reading_time_minutes, 10) : null,
        last_updated_at: form.last_updated_at || null,
        related_article_slugs: splitList(form.related_article_slugs),
        related_country_slugs: splitList(form.related_country_slugs),
        affiliate_category: form.affiliate_category || null,
        faqs: form.faqs.filter((f) => f.question.trim() && f.answer.trim()),
        featured: form.featured,
        published: form.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (!error) {
      router.push("/admin/articles");
    } else {
      alert(error.message);
      setSaving(false);
    }
  }

  if (loading) return <div className="text-gray-500 p-8">Loading...</div>;

  const viewHref = published
    ? `/knowledge-center/${category}/${slug}`
    : `/admin/articles/${id}/preview`;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-navy-800">Edit: {form.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <ArticleFormFields form={form} update={update} />

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <a href={viewHref} target="_blank" rel="noopener noreferrer" className="ml-auto px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            View Page ↗
          </a>
        </div>
      </form>
    </div>
  );
}
