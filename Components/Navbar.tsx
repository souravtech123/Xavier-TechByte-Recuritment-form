"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#leadership" },
  { name: "Contact", href: "#supportsection" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      <div className="mx-auto max-w-7xl px-6">

        <nav className="relative mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,.35)] transition-all duration-500">

          {/* Bottom Glow */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >

            <div className="relative">

              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 opacity-40 blur-xl transition duration-500 group-hover:opacity-80" />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500">

                <Code2 className="h-6 w-6 text-white" />

              </div>

            </div>

            <div>

              <h2 className="text-lg font-bold tracking-tight text-white">

                Xavier TechByte

              </h2>

              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">

                Society

              </p>

            </div>

          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 lg:flex">

            {navLinks.map((item) => (

              <a
                key={item.name}
                href={item.href}
                className="group relative text-sm font-medium text-slate-300 transition duration-300 hover:text-white"
              >

                {item.name}

                <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />

              </a>

            ))}

          </div>

          {/* Desktop CTA */}

          <div className="hidden lg:block">

            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40"
            >

              Join XTS

            </Link>

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 lg:hidden"
          >

            {open ? <X size={24} /> : <Menu size={24} />}

          </button>

        </nav>
              {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${
          open
            ? "mt-4 max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="relative rounded-3xl border border-white/10 bg-[#0B1120]/80 p-6 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,.35)]">

          {/* Background Glow */}

          <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col">

            {navLinks.map((item) => (

              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-white/5 py-4 text-slate-300 transition duration-300 hover:text-white"
              >

                <span>{item.name}</span>

                

              </a>

            ))}

            {/* Mobile CTA */}

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Join XTS

              

            </Link>

          </div>

        </div>

      </div>

    </div>

  </header>
  );
};

export default Navbar;