"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-white">Deported</span>{" "}
          <span className="text-brand-red">Not</span>{" "}
          <span className="text-white">Defeated</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/laos" className="hover:text-brand-red transition-colors">
            Laos Guide
          </Link>
          <Link href="/laos/directory" className="hover:text-brand-red transition-colors">
            Directory
          </Link>
          <Link href="/resources" className="hover:text-brand-red transition-colors">
            Resources
          </Link>
          <Link href="/about" className="hover:text-brand-red transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-brand-red transition-colors">
            Contact
          </Link>
          <Link
            href="/laos/first-30-days"
            className="bg-brand-red hover:bg-brand-red-dark px-4 py-2 rounded-lg transition-colors"
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
        <div className="md:hidden bg-navy-700 border-t border-navy-600 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {[
            ["Laos Guide", "/laos"],
            ["Directory",  "/laos/directory"],
            ["Resources",  "/resources"],
            ["About",      "/about"],
            ["Contact",    "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="py-2 hover:text-brand-red transition-colors border-b border-navy-600"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/laos/first-30-days"
            className="bg-brand-red hover:bg-brand-red-dark px-4 py-2 rounded-lg text-center transition-colors mt-2"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
