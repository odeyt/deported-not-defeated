import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Success Stories | Deported Not Defeated",
  description: "Real stories of people who were deported and rebuilt their lives with dignity and strength.",
};

const stories = [
  {
    name: "Miguel R.",
    country: "Mexico",
    flag: "🇲🇽",
    quote: "I came back with nothing. Now I run a small café in my hometown. It took two years, but I made it.",
    outcome: "Small business owner",
  },
  {
    name: "Sophea K.",
    country: "Cambodia",
    flag: "🇰🇭",
    quote: "I didn't speak Khmer well. My kids are in the USA. I had to start completely from zero. But I found a job, then a better one.",
    outcome: "Employed in logistics",
  },
  {
    name: "Jose L.",
    country: "El Salvador",
    flag: "🇸🇻",
    quote: "The first month was the hardest. Once I found stable housing and got my documents sorted, everything slowly got better.",
    outcome: "Construction foreman",
  },
  {
    name: "Bouakham T.",
    country: "Laos",
    flag: "🇱🇦",
    quote: "I leaned on family at first, then found work teaching English. It's not the life I had, but it's mine.",
    outcome: "English teacher",
  },
  {
    name: "Maria G.",
    country: "Guatemala",
    flag: "🇬🇹",
    quote: "I used every resource I could find online. The guides helped me know what to do first. I wasn't alone.",
    outcome: "Healthcare worker",
  },
  {
    name: "Ranh P.",
    country: "Vietnam",
    flag: "🇻🇳",
    quote: "Starting over at 45 is terrifying. But I had skills. I just needed to figure out how to use them here.",
    outcome: "Freelance electrician",
  },
];

export default function StoriesPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Real People. Real Comebacks.</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Success Stories</h1>
          <p className="text-gray-300 text-lg">
            Deportation is not the end. These are the stories of people who were sent back — and built something new.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((s) => (
              <div key={s.name} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{s.flag}</span>
                  <div>
                    <p className="font-bold text-navy-800">{s.name}</p>
                    <p className="text-sm text-gray-500">{s.country} · {s.outcome}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-brand-red rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Your Story Isn&apos;t Over</h2>
            <p className="text-red-100 mb-6">
              Find the guides, tools, and support you need to start the next chapter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/resources" className="bg-white text-brand-red px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors">
                Browse Resources
              </Link>
              <Link href="/laos/first-30-days" className="border border-white/40 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                Your First 30 Days
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
