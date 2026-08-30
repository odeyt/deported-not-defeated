import type { KnowledgeArticleFaq } from "@/lib/knowledgeCenter/types";

export default function FaqBlock({ faqs }: { faqs: KnowledgeArticleFaq[] }) {
  if (!faqs.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-navy-800 mb-5">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="font-bold text-navy-800 mb-2">{faq.question}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
