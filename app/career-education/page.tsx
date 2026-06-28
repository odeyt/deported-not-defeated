import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info, AlertTriangle } from "lucide-react";
import {
  IconBriefcase, IconGradCap, IconLaptop, IconGlobe,
  IconTrending, IconResume, IconCertificate, IconBook,
  IconRocket,
} from "@/components/career/CareerIcons";
import CareerPathFinder from "@/components/career/CareerPathFinder";
import CourseComparisonTable from "@/components/career/CourseComparisonTable";
import CareerEmailCapture from "@/components/career/CareerEmailCapture";
import CareerAffiliateCard from "@/components/career/CareerAffiliatCard";

export const metadata: Metadata = {
  title: "Career & Education Resources for Deportees | Deported Not Defeated",
  description:
    "Find jobs, training programs, English teaching certifications, remote work tools, and small business resources for rebuilding life after deportation.",
  keywords: [
    "jobs for deportees", "career after deportation", "online courses deportees",
    "TEFL certification", "remote work after deportation", "small business deportee",
    "education deportee", "vocational training deportee",
  ],
};

const SECTIONS = [
  { Icon: IconBriefcase,  label: "Find Jobs",           href: "#find-jobs",      color: "text-emerald-500" },
  { Icon: IconBook,       label: "Learn New Skills",    href: "#learn-skills",   color: "text-blue-500" },
  { Icon: IconGradCap,    label: "Teach English",       href: "#teach-english",  color: "text-violet-500" },
  { Icon: IconLaptop,     label: "Remote Work",         href: "#remote-work",    color: "text-teal-400" },
  { Icon: IconTrending,   label: "Start a Business",    href: "#start-business", color: "text-rose-500" },
  { Icon: IconResume,     label: "Resume & Interview",  href: "#resume",         color: "text-orange-500" },
  { Icon: IconCertificate,label: "Certifications",      href: "#certifications", color: "text-amber-500" },
  { Icon: IconGlobe,      label: "Free Training",       href: "#free-training",  color: "text-indigo-400" },
];

// Course affiliate cards data
const COURSES = [
  {
    name: "Udemy",
    category: "Online Courses",
    description: "Thousands of practical courses in tech, business, design, and more. Courses are self-paced and available in multiple languages.",
    bestFor: "People who want specific skills fast — courses stay with you forever.",
    price: "$10–$20/course on sale",
    hasCertificate: true,
    hasFree: false,
    href: "#affiliate-placeholder", // TODO: Replace with Udemy affiliate link
    ctaLabel: "Browse Udemy Courses",
    gradient: "from-orange-400 to-red-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    icon: <IconBook size={18} />,
  },
  {
    name: "Coursera",
    category: "Online Courses",
    description: "University-level courses from Stanford, Yale, Google, and more. Many courses are free to audit. Professional certificates available.",
    bestFor: "People who want university-quality credentials for career advancement.",
    price: "Free audit / $49+/mo",
    hasCertificate: true,
    hasFree: true,
    href: "#affiliate-placeholder", // TODO: Replace with Coursera affiliate link
    ctaLabel: "Start on Coursera",
    gradient: "from-blue-400 to-indigo-600",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: <IconGradCap size={18} />,
  },
  {
    name: "Alison",
    category: "Free Courses",
    description: "Over 4,000 free online courses across business, IT, health, language, and trades. Certificates available at low cost.",
    bestFor: "People who need certified skills training at zero or very low cost.",
    price: "Free (diploma cert ~$20)",
    hasCertificate: true,
    hasFree: true,
    href: "#affiliate-placeholder", // TODO: Replace with Alison affiliate link
    ctaLabel: "Start Free on Alison",
    gradient: "from-green-400 to-teal-500",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    icon: <IconCertificate size={18} />,
  },
  {
    name: "Skillshare",
    category: "Creative Skills",
    description: "Creative and business skills — design, illustration, photography, writing, marketing. Project-based learning format.",
    bestFor: "Creative professionals looking to build a portfolio or freelance skills.",
    price: "~$8/month (annual)",
    hasCertificate: false,
    hasFree: false,
    href: "#affiliate-placeholder", // TODO: Replace with Skillshare affiliate link
    ctaLabel: "Explore Skillshare",
    gradient: "from-teal-400 to-cyan-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    icon: <IconBook size={18} />,
  },
  {
    name: "LinkedIn Learning",
    category: "Career Development",
    description: "Business, tech, and creative courses directly linked to your LinkedIn profile. Certificates show on your profile automatically.",
    bestFor: "Professionals building an online career presence and LinkedIn network.",
    price: "~$27/mo or LinkedIn Premium",
    hasCertificate: true,
    hasFree: false,
    href: "#affiliate-placeholder", // TODO: Replace with LinkedIn Learning affiliate link
    ctaLabel: "Start LinkedIn Learning",
    gradient: "from-blue-500 to-blue-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    icon: <IconBriefcase size={18} />,
  },
  {
    name: "edX",
    category: "University Certificates",
    description: "Professional certificates and MicroMasters from MIT, Harvard, IBM, and others. Free audit available for most courses.",
    bestFor: "People targeting professional certification from top institutions.",
    price: "Free audit / $149+ cert",
    hasCertificate: true,
    hasFree: true,
    href: "#affiliate-placeholder", // TODO: Replace with edX affiliate link
    ctaLabel: "Browse edX Programs",
    gradient: "from-rose-400 to-red-600",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    icon: <IconGradCap size={18} />,
  },
];

const REMOTE_TOOLS = [
  {
    name: "Upwork",
    category: "Freelance Platform",
    description: "The world's largest freelance marketplace. Post your skills, bid on projects, and get paid via secure contracts.",
    bestFor: "Finding ongoing client work in writing, design, dev, or support.",
    price: "Free to join / commission on earnings",
    hasCertificate: false,
    hasFree: true,
    href: "#affiliate-placeholder", // TODO: Replace with Upwork affiliate link
    ctaLabel: "Create Upwork Profile",
    gradient: "from-emerald-400 to-green-600",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: <IconLaptop size={18} />,
  },
  {
    name: "Fiverr",
    category: "Freelance Platform",
    description: "Sell specific services ('gigs') from $5 and up. Great for translation, design, writing, voiceovers, and data entry.",
    bestFor: "People who want to sell a specific service quickly without bidding.",
    price: "Free to join / 20% commission",
    hasCertificate: false,
    hasFree: true,
    href: "#affiliate-placeholder", // TODO: Replace with Fiverr affiliate link
    ctaLabel: "Start Selling on Fiverr",
    gradient: "from-teal-400 to-emerald-600",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    icon: <IconGlobe size={18} />,
  },
  {
    name: "Grammarly",
    category: "Writing Tool",
    description: "AI-powered writing assistant that improves your English in resumes, cover letters, emails, and professional documents.",
    bestFor: "Anyone writing professional content in English as a second language.",
    price: "Free / Premium $12/mo",
    hasCertificate: false,
    hasFree: true,
    href: "#affiliate-placeholder", // TODO: Replace with Grammarly affiliate link
    ctaLabel: "Try Grammarly Free",
    gradient: "from-green-400 to-teal-500",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    icon: <IconResume size={18} />,
  },
];

export default function CareerEducationPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-navy-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-brand-red font-bold uppercase tracking-widest text-xs mb-3">Career & Education Center</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Rebuild Your Career After Deportation
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Practical income paths, online training, English teaching certifications, remote work tools,
            and small business resources — organized for people rebuilding life in their home country.
          </p>
          {/* Category nav cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-xl p-4 text-center transition-all"
              >
                <s.Icon size={22} className={`mx-auto mb-2 ${s.color} group-hover:scale-110 transition-transform`} />
                <p className="text-white text-xs font-semibold leading-tight">{s.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Affiliate Disclosure ─────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex gap-2 items-start">
          <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>Disclosure:</strong> Some links on this page may be affiliate links. We may earn a commission at no extra cost to you.
            Information is educational — verify with local employers, schools, and government agencies before making decisions.
          </p>
        </div>
      </div>

      {/* ── Career Path Finder ───────────────────────────────────── */}
      <section className="bg-gray-950 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <CareerPathFinder />
        </div>
      </section>

      {/* ── Find Jobs ───────────────────────────────────────────── */}
      <section id="find-jobs" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <IconBriefcase size={24} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-1">Step One</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Find Jobs in Your Country</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                Browse our country guides for country-specific job market information, local job websites, and top sectors by region.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { country: "Mexico", slug: "mexico", jobs: "Call centers, tourism, logistics, maquiladora" },
              { country: "Guatemala", slug: "guatemala", jobs: "BPO, tourism, agriculture, English teaching" },
              { country: "El Salvador", slug: "el-salvador", jobs: "Call centers, tech, Bitcoin economy, tourism" },
              { country: "Philippines", slug: "philippines", jobs: "BPO, virtual assistant, online teaching, maritime" },
              { country: "Vietnam", slug: "vietnam", jobs: "English teaching, tourism, tech, e-commerce" },
              { country: "Nigeria", slug: "nigeria", jobs: "Tech, finance, agriculture, entertainment" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}/find-work`}
                className="group bg-gray-50 border border-gray-200 hover:border-emerald-300 rounded-2xl p-5 transition-all hover:shadow-md"
              >
                <p className="font-bold text-navy-800 group-hover:text-emerald-700 transition-colors">{c.country}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{c.jobs}</p>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold mt-3">
                  View Jobs Guide <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/country-guides"
            className="inline-flex items-center gap-2 border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            Find Your Country Guide <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Learn New Skills ─────────────────────────────────────── */}
      <section id="learn-skills" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <IconBook size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">Online Courses</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Learn New Skills Online</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                These platforms offer courses you can take from anywhere with an internet connection. Many are free to start.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {COURSES.map((c) => (
              <CareerAffiliateCard key={c.name} {...c} />
            ))}
          </div>
          <h3 className="text-xl font-bold text-navy-800 mb-5">Compare Platforms Side by Side</h3>
          <CourseComparisonTable />
        </div>
      </section>

      {/* ── Teach English ────────────────────────────────────────── */}
      <section id="teach-english" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
              <IconGradCap size={24} className="text-violet-600" />
            </div>
            <div>
              <p className="text-violet-600 text-xs font-bold uppercase tracking-widest mb-1">TEFL / TESOL</p>
              <h2 className="text-2xl font-extrabold text-navy-800">How to Become an English Teacher After Deportation</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
                <h3 className="font-bold text-violet-900 mb-2">What is TEFL?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  TEFL (Teaching English as a Foreign Language) is the standard certification for teaching English in countries where it is not the native language.
                  Most programs take 4–12 weeks online and cost $200–$400. A 120-hour certificate opens doors at language schools across Latin America, Asia, and beyond.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h3 className="font-bold text-blue-900 mb-2">What is TESOL?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  TESOL (Teaching English to Speakers of Other Languages) is similar to TEFL but often used in countries where English is a second official language.
                  In the US, TESOL certifies community English instructors. Both TEFL and TESOL are widely accepted by employers — the names are often interchangeable.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-navy-800 mb-2">Basic Requirements</h3>
                <ul className="space-y-1.5">
                  {[
                    "Fluent or native-level English — no accent requirement",
                    "High school diploma (for most schools)",
                    "TEFL/TESOL certificate (120 hours is standard)",
                    "Background check (required by reputable schools)",
                    "Reliable internet for online teaching",
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-navy-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Online vs. Classroom Teaching</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-brand-red font-bold text-sm mb-1">Online Teaching</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Platforms: VIPKid, iTalki, Cambly, Palfish, Preply</li>
                      <li>• Pay: $8–$25/hour depending on platform</li>
                      <li>• Requires: stable internet, quiet space, basic camera</li>
                      <li>• Pro: work from anywhere; Con: inconsistent hours</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold text-sm mb-1">Classroom Teaching</p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Language schools, private academies, bilingual schools</li>
                      <li>• Pay: varies widely by country ($5–$30/hour)</li>
                      <li>• Requires: TEFL cert, possible background check</li>
                      <li>• Pro: steady schedule; Con: tied to one location</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* TODO: Replace href with TEFL affiliate link when approved */}
              <a
                href="#affiliate-placeholder"
                className="block bg-brand-red hover:bg-red-700 text-white text-center font-bold px-6 py-4 rounded-2xl transition-colors"
              >
                Get TEFL Certified — Compare Programs <ArrowRight size={14} className="inline ml-1" />
              </a>
              {/* TODO: Replace href with TESOL affiliate link when approved */}
              <a
                href="#affiliate-placeholder"
                className="block border border-violet-300 text-violet-700 hover:bg-violet-50 text-center font-bold px-6 py-4 rounded-2xl transition-colors text-sm"
              >
                Compare TEFL vs TESOL Programs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Remote Work ──────────────────────────────────────────── */}
      <section id="remote-work" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
              <IconLaptop size={24} className="text-teal-600" />
            </div>
            <div>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-1">Remote Work</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Remote Work Starter Kit</h2>
              <p className="text-gray-500 text-sm mt-1">Everything you need to start earning online from your home country.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {REMOTE_TOOLS.map((t) => (
              <CareerAffiliateCard key={t.name} {...t} />
            ))}
          </div>
          {/* Checklist */}
          <div className="bg-navy-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-white font-bold text-xl mb-5">Remote Work Setup Checklist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                ["Internet connection", "Stable broadband or 4G minimum — test your speed"],
                ["Laptop or computer", "Entry-level is fine for most remote work"],
                ["Headset with mic", "Essential for calls and online teaching"],
                ["Upwork or Fiverr profile", "Create your profile and list your skills"],
                ["Wise or Payoneer account", "To receive international payments"],
                ["VPN", "Protects your connection and privacy"],
                ["Professional email", "yourname@gmail.com at minimum"],
                ["LinkedIn profile", "Connects you to international recruiters"],
                ["Resume or portfolio", "Even a simple one opens doors"],
                ["AI tools (ChatGPT etc.)", "Increases productivity 2–5x for most tasks"],
              ].map(([item, tip]) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-red/60 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-brand-red" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item}</p>
                    <p className="text-gray-400 text-xs">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Start a Business ─────────────────────────────────────── */}
      <section id="start-business" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
              <IconTrending size={24} className="text-rose-600" />
            </div>
            <div>
              <p className="text-rose-600 text-xs font-bold uppercase tracking-widest mb-1">Entrepreneurship</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Start a Small Business</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                Many deportees build successful micro-businesses. Start small, keep overhead low, grow steady. Income potential depends on skills, location, and demand — verify locally.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {[
              { title: "Website Builder", desc: "Create a professional business website in hours. No coding required.", cta: "Build Your Site", icon: <IconGlobe size={18} /> },
              { title: "Logo Maker", desc: "Design a professional logo for your business brand quickly and affordably.", cta: "Create Your Logo", icon: <IconCertificate size={18} /> },
              { title: "Business Email", desc: "A professional email address builds trust with clients and customers.", cta: "Get Business Email", icon: <IconResume size={18} /> },
              { title: "Payment Tools", desc: "Accept payments from customers locally and internationally.", cta: "Set Up Payments", icon: <IconTrending size={18} /> },
            ].map((tool) => (
              <div key={tool.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 text-rose-600">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-navy-800 text-sm">{tool.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{tool.desc}</p>
                  {/* TODO: Replace href with appropriate business tool affiliate link */}
                  <a
                    href="#affiliate-placeholder"
                    className="inline-flex items-center gap-1 text-brand-red hover:text-red-700 text-xs font-bold mt-2 transition-colors"
                  >
                    {tool.cta} <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resume & Interview ───────────────────────────────────── */}
      <section id="resume" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
              <IconResume size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-1">Career Tools</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Resume & Interview Help</h2>
              <p className="text-gray-500 text-sm mt-1">Build a professional resume, practice interviews, and present yourself confidently.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Resume Builder", desc: "Create a professional resume using templates trusted by employers.", cta: "Build Your Resume" },
              { name: "Cover Letter Generator", desc: "Write a strong cover letter even if you haven't worked formally in years.", cta: "Write Cover Letter" },
              { name: "AI Resume Review", desc: "Get instant feedback on your resume to improve it before applying.", cta: "Review My Resume" },
              { name: "LinkedIn Profile Setup", desc: "Set up a professional LinkedIn profile that gets noticed by recruiters.", cta: "Optimize LinkedIn" },
              { name: "Interview Practice", desc: "Practice common interview questions in English and get coaching feedback.", cta: "Practice Interviews" },
              { name: "Grammarly", desc: "Fix grammar and improve your professional writing in English.", cta: "Try Grammarly Free" },
            ].map((tool) => (
              <div key={tool.name} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <IconResume size={20} className="text-orange-600" />
                </div>
                <p className="font-bold text-navy-800 text-sm">{tool.name}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{tool.desc}</p>
                {/* TODO: Replace href with real affiliate link for each tool */}
                <a
                  href="#affiliate-placeholder"
                  className="mt-auto inline-flex items-center gap-1 bg-brand-red hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  {tool.cta} <ArrowRight size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────── */}
      <section id="certifications" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <IconCertificate size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-1">Credentials</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Certifications That Open Doors</h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl">Industry-recognized certificates you can earn online from your home country.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { cert: "TEFL / TESOL", use: "Teach English locally or online — valid in 100+ countries", time: "4–12 weeks online", cost: "$150–$400" },
              { cert: "Google IT Support Certificate", use: "Entry into IT support roles — taught by Google on Coursera", time: "3–6 months", cost: "Free to audit" },
              { cert: "Google Digital Marketing", use: "Social media, SEO, and online marketing skills", time: "~40 hours", cost: "Free on Grow with Google" },
              { cert: "Microsoft Office Specialist", use: "Proves Word, Excel, and PowerPoint proficiency", time: "Self-paced", cost: "$100–$150 exam fee" },
              { cert: "AWS Cloud Practitioner", use: "Entry-level cloud certification — globally recognized", time: "1–3 months", cost: "$100 exam fee" },
              { cert: "Alison Business Certificate", use: "Free business fundamentals — widely accepted", time: "Flexible", cost: "Free (diploma ~$20)" },
            ].map((c) => (
              <div key={c.cert} className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-navy-800 text-sm">{c.cert}</p>
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{c.use}</p>
                  </div>
                  {/* TODO: Replace href with appropriate certification affiliate link */}
                  <a
                    href="#affiliate-placeholder"
                    className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Get Certified
                  </a>
                </div>
                <div className="flex gap-4 mt-3 pt-3 border-t border-amber-200">
                  <span className="text-xs text-amber-700"><strong>Time:</strong> {c.time}</span>
                  <span className="text-xs text-amber-700"><strong>Cost:</strong> {c.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Training ────────────────────────────────────────── */}
      <section id="free-training" className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <IconGlobe size={24} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-1">Zero Cost</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Free Training Resources</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Alison.com", desc: "4,000+ free courses with free certificates across all fields.", href: "#affiliate-placeholder" },
              { name: "Khan Academy", desc: "Free academic education — math, science, computing, and more.", href: "https://www.khanacademy.org" },
              { name: "Google Digital Garage", desc: "Free digital marketing fundamentals from Google.", href: "https://grow.google/intl/ALL_us/google-digital-garage/" },
              { name: "Coursera (Audit)", desc: "Audit most Coursera courses completely free — no certificate.", href: "#affiliate-placeholder" },
              { name: "edX (Audit)", desc: "Free access to MIT, Harvard, and other university courses.", href: "#affiliate-placeholder" },
              { name: "YouTube", desc: "Countless free tutorials on every skill from cooking to coding.", href: "https://www.youtube.com" },
              { name: "FreeCodeCamp", desc: "Free full-stack coding curriculum — JavaScript, Python, and more.", href: "https://www.freecodecamp.org" },
              { name: "ILO Skills", desc: "International Labour Organization's free career skills training.", href: "https://www.ilo.org/skills" },
              { name: "UN Refugee Agency", desc: "Free training programs for displaced persons worldwide.", href: "https://www.unhcr.org" },
            ].map((r) => (
              <a
                key={r.name}
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-indigo-300 transition-all"
              >
                <p className="font-bold text-navy-800 text-sm group-hover:text-indigo-700 transition-colors">{r.name}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-indigo-600 text-xs font-bold mt-3">
                  Visit <ArrowRight size={10} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Magnet ──────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <CareerEmailCapture />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-navy-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "Can I really find work after deportation?",
                a: "Yes — many deportees find stable income through local employment, remote freelance work, English teaching, or small businesses. The path depends on your country, skills, and language ability. Start with what you already know and build from there.",
              },
              {
                q: "Do I need a degree to teach English?",
                a: "Not always. Many online platforms (Cambly, Preply, iTalki) accept TEFL-certified teachers without a degree. Formal schools may require one. A 120-hour TEFL certificate significantly improves your options and hourly rate.",
              },
              {
                q: "How do I get paid for remote work internationally?",
                a: "Services like Wise, Payoneer, and Western Union allow international payment receipt. Wise is often the most cost-effective for regular transfers. Most freelance platforms (Upwork, Fiverr) integrate with these services directly.",
              },
              {
                q: "How long does it take to get a TEFL certificate?",
                a: "Most online TEFL courses take 4–12 weeks depending on how many hours per week you study. A 120-hour certificate is the industry standard. You can start teaching upon completion.",
              },
              {
                q: "Are the course links on this page trustworthy?",
                a: "We only list established platforms used by millions of learners globally — Udemy, Coursera, Alison, and others. Some links may be affiliate links, which means we may earn a small commission if you enroll. The cost to you is the same or less through our links.",
              },
              {
                q: "What if I don't speak English well?",
                a: "Many income paths don't require English — local trade work, food businesses, agriculture, and local customer service. For those who want to improve English, free platforms like Duolingo, BBC Learning English, and Alison's English courses are a good starting point.",
              },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl group">
                <summary className="cursor-pointer px-5 py-4 text-navy-800 font-semibold text-sm list-none flex items-center justify-between gap-3">
                  <span>{faq.q}</span>
                  <span className="text-gray-400 text-xs flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> Some links on this page may be affiliate links. We may earn a commission at no extra cost to you.
              Information is educational only — income outcomes depend on individual skills, market conditions, location, and effort.
              Always verify details with local employers, schools, and government agencies before making career or financial decisions.
              Deported Not Defeated does not guarantee employment or income from any resource listed here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
