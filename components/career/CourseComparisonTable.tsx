import { ExternalLink, Check, X } from "lucide-react";

const PLATFORMS = [
  {
    name: "Udemy",
    bestFor: "Practical skills, tech, business",
    free: false,
    certificate: true,
    cost: "$10–$20/course (on sale)",
    href: "#affiliate-placeholder", // TODO: Replace with Udemy affiliate link
    highlight: true,
  },
  {
    name: "Coursera",
    bestFor: "University-level courses, degrees",
    free: true,
    certificate: true,
    cost: "Free audit / $49+/mo certificate",
    href: "#affiliate-placeholder", // TODO: Replace with Coursera affiliate link
    highlight: false,
  },
  {
    name: "Alison",
    bestFor: "Free certificates, vocational skills",
    free: true,
    certificate: true,
    cost: "Free (diploma ~$20 optional)",
    href: "#affiliate-placeholder", // TODO: Replace with Alison affiliate link
    highlight: false,
  },
  {
    name: "Skillshare",
    bestFor: "Creative skills, design, video",
    free: false,
    certificate: false,
    cost: "~$8/mo (annual plan)",
    href: "#affiliate-placeholder", // TODO: Replace with Skillshare affiliate link
    highlight: false,
  },
  {
    name: "LinkedIn Learning",
    bestFor: "Career development, business",
    free: false,
    certificate: true,
    cost: "~$27/mo or free with LinkedIn Premium",
    href: "#affiliate-placeholder", // TODO: Replace with LinkedIn Learning affiliate link
    highlight: false,
  },
  {
    name: "edX",
    bestFor: "Professional certificates, degrees",
    free: true,
    certificate: true,
    cost: "Free audit / $149+ certificates",
    href: "#affiliate-placeholder", // TODO: Replace with edX affiliate link
    highlight: false,
  },
];

export default function CourseComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy-800 text-white">
            <th className="text-left px-5 py-4 font-bold">Platform</th>
            <th className="text-left px-4 py-4 font-bold hidden sm:table-cell">Best For</th>
            <th className="text-center px-4 py-4 font-bold">Free Courses</th>
            <th className="text-center px-4 py-4 font-bold hidden md:table-cell">Certificate</th>
            <th className="text-left px-4 py-4 font-bold hidden lg:table-cell">Cost</th>
            <th className="text-center px-4 py-4 font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {PLATFORMS.map((p, i) => (
            <tr
              key={p.name}
              className={`border-t border-gray-100 transition-colors ${
                p.highlight ? "bg-red-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50/40`}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy-800">{p.name}</span>
                  {p.highlight && (
                    <span className="text-xs bg-brand-red text-white px-2 py-0.5 rounded-full font-semibold">
                      Popular
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 text-gray-600 hidden sm:table-cell">{p.bestFor}</td>
              <td className="px-4 py-4 text-center">
                {p.free ? (
                  <Check size={16} className="text-green-500 mx-auto" />
                ) : (
                  <X size={16} className="text-gray-300 mx-auto" />
                )}
              </td>
              <td className="px-4 py-4 text-center hidden md:table-cell">
                {p.certificate ? (
                  <Check size={16} className="text-green-500 mx-auto" />
                ) : (
                  <X size={16} className="text-gray-300 mx-auto" />
                )}
              </td>
              <td className="px-4 py-4 text-gray-600 hidden lg:table-cell">{p.cost}</td>
              <td className="px-4 py-4 text-center">
                {/* TODO: Replace href="#affiliate-placeholder" with real affiliate URL */}
                <a
                  href={p.href}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-brand-red hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Start <ExternalLink size={10} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-gray-400 text-xs">
          Disclosure: Some links may be affiliate links. Prices and availability change — always verify on the platform's website before purchasing.
        </p>
      </div>
    </div>
  );
}
