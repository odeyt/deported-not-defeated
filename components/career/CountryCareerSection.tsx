import Link from "next/link";
import { Briefcase, Laptop, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";

export interface CountryCareerData {
  topJobs: string[];
  remoteOpportunities: string[];
  englishTeaching: string;
  smallBusinessIdeas: string[];
  localJobSites: string[];
  vocationalTips: string;
}

interface Props {
  countryName: string;
  countrySlug: string;
  data: CountryCareerData;
}

export default function CountryCareerSection({ countryName, countrySlug, data }: Props) {
  return (
    <section className="bg-gray-900 py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Briefcase size={22} className="text-amber-600" />
          </div>
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Career & Education</p>
            <h2 className="text-2xl font-extrabold text-white">Career & Education in {countryName}</h2>
            <p className="text-gray-400 text-sm mt-1">
              Practical income paths, training options, and job opportunities for people rebuilding in {countryName}. Verify locally before making decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Top Jobs */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-emerald-400" />
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">Top Job Opportunities</h3>
            </div>
            <ul className="space-y-2">
              {data.topJobs.map((job, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">▸</span>
                  {job}
                </li>
              ))}
            </ul>
          </div>

          {/* Remote Work */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Laptop size={16} className="text-violet-400" />
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">Remote Work Options</h3>
            </div>
            <ul className="space-y-2">
              {data.remoteOpportunities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-violet-400 font-bold shrink-0 mt-0.5">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            {/* TODO: Replace with Upwork/Fiverr affiliate link when approved */}
            <a
              href="#affiliate-placeholder"
              className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 text-xs font-semibold mt-4 transition-colors"
            >
              Set up remote work profile <ArrowRight size={11} />
            </a>
          </div>

          {/* Small Business */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-rose-400" />
              <h3 className="text-white font-bold text-sm uppercase tracking-wide">Small Business Ideas</h3>
            </div>
            <ul className="space-y-2">
              {data.smallBusinessIdeas.map((idea, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">▸</span>
                  {idea}
                </li>
              ))}
            </ul>
            {/* TODO: Replace with website builder / business tools affiliate link */}
            <a
              href="#affiliate-placeholder"
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 text-xs font-semibold mt-4 transition-colors"
            >
              Business startup tools <ArrowRight size={11} />
            </a>
          </div>

          {/* English Teaching + Vocational */}
          <div className="space-y-4">
            <div className="bg-blue-900/30 border border-blue-700/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={16} className="text-blue-400" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wide">Teach English</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{data.englishTeaching}</p>
              {/* TODO: Replace with TEFL/TESOL affiliate link when approved */}
              <a
                href="#affiliate-placeholder"
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold mt-3 transition-colors"
              >
                Get TEFL certified <ArrowRight size={11} />
              </a>
            </div>
            <div className="bg-amber-900/20 border border-amber-700/20 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-2">Vocational Training</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{data.vocationalTips}</p>
            </div>
          </div>
        </div>

        {/* Local Job Sites */}
        {data.localJobSites.length > 0 && (
          <div className="bg-gray-800 border border-white/10 rounded-xl p-5 mb-5">
            <h3 className="text-white font-bold text-sm mb-3">Local Job Websites in {countryName}</h3>
            <div className="flex flex-wrap gap-2">
              {data.localJobSites.map((site, i) => (
                <span key={i} className="bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-white/10">
                  {site}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/career-education"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            Full Career & Education Center <ArrowRight size={14} />
          </Link>
          {/* TODO: Replace with real course affiliate link */}
          <a
            href="#affiliate-placeholder"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Browse Free Online Courses
          </a>
        </div>

        <p className="text-gray-600 text-xs mt-4">
          Some links may be affiliate links. Information is educational — verify with local employers, schools, and government agencies.
        </p>
      </div>
    </section>
  );
}
