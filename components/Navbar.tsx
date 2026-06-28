"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const countries = [
  { label: "🇱🇦 Laos", href: "/laos" },
  { label: "🇰🇭 Cambodia", href: "/cambodia" },
  { label: "🇻🇳 Vietnam", href: "/vietnam" },
  { label: "🇵🇭 Philippines", href: "/philippines" },
  { label: "🇲🇽 Mexico", href: "/mexico" },
  { label: "🇸🇻 El Salvador", href: "/el-salvador" },
  { label: "🇬🇹 Guatemala", href: "/guatemala" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);

  return (
    <nav className="bg-navy-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-white">Deported</span>{" "}
          <span className="text-brand-red">Not</span>{" "}
          <span className="text-white">Defeated</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {/* Countries dropdown */}
          <div className="relative">
            <button
              onClick={() => setCountriesOpen(!countriesOpen)}
              onBlur={() => setTimeout(() => setCountriesOpen(false), 150)}
              className="flex items-center gap-1 hover:text-brand-red transition-colors"
            >
              Countries <ChevronDown size={14} />
            </button>
            {countriesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-navy-800 border border-white/10 rounded-xl shadow-xl w-44 py-2 z-50">
                {countries.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-brand-red transition-colors"
                    onClick={() => setCountriesOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/resources" className="hover:text-brand-red transition-colors">
            Resources
          </Link>
          <Link href="/legal-resources" className="hover:text-brand-red transition-colors">
            Legal Resources
          </Link>
          <Link href="/ai-report" className="hover:text-brand-red transition-colors">
            Free Report
          </Link>
          <Link href="/about" className="hover:text-brand-red transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-brand-red transition-colors">
            Contact
          </Link>
          <Link
            href="/resources"
            className="bg-brand-red hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-800 border-t border-white/10 px-4 pb-4 flex flex-col gap-1 text-sm font-medium">
          <p className="text-gray-400 text-xs uppercase tracking-widest pt-3 pb-1">Country Guides</p>
          {countries.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="py-2 hover:text-brand-red transition-colors border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              {c.label}
            </Link>
          ))}
          <p className="text-gray-400 text-xs uppercase tracking-widest pt-3 pb-1">Site</p>
          {[
            ["Resources", "/resources"],
            ["Legal Resources", "/legal-resources"],
            ["Free Report", "/ai-report"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="py-2 hover:text-brand-red transition-colors border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/resources"
            className="bg-brand-red hover:bg-red-700 px-4 py-2 rounded-lg text-center transition-colors mt-3"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
