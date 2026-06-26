import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-bold text-white text-lg mb-2">
            Deported <span className="text-brand-red">Not</span> Defeated
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your story is not over. Start again with dignity, direction, and support.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
            Laos
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["Country Guide", "/laos"],
              ["First 30 Days", "/laos/first-30-days"],
              ["Directory", "/laos/directory"],
              ["Housing", "/laos/housing"],
              ["Jobs", "/laos/jobs"],
              ["Legal Help", "/laos/legal-help"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
            Resources
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["Healthcare", "/laos/healthcare"],
              ["Banking & Money", "/laos/banking-money"],
              ["Phone & Internet", "/laos/phone-internet"],
              ["Transportation", "/laos/transportation"],
              ["All Resources", "/laos/resources"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
            Company
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["About Us", "/about"],
              ["Contact", "/contact"],
              ["Affiliate Disclosure", "/affiliate-disclosure"],
              ["Privacy Policy", "/privacy"],
              ["Terms of Service", "/terms"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Deported Not Defeated. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center max-w-lg">
            Some links on this site may be affiliate links. We may earn a small commission at no
            extra cost to you. We only recommend tools that may genuinely help people rebuild
            their lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
