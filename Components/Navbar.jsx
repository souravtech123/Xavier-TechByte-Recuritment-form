"use client"

import { Menu, X, Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Projects", href: "#projects" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#030712] text-white">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 shadow-lg">
            <Code2 className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Xavier TechByte
            </h2>
            <p className="text-xs tracking-widest uppercase text-slate-400">
              Society
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-slate-300 transition-all duration-300 hover:text-white"
            >
              {item.name}

              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex">
          <Link href={'/register'} className="rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-violet-500/30">
            Join XTS
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white lg:hidden"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-white/10 bg-slate-900/90 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-slate-300 transition hover:text-white"
              >
                {item.name}
              </a>
            ))}

            <button className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 py-3 font-semibold text-white">
              Join XTS
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;