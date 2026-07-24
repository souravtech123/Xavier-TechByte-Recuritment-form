import {
    Code2,
  } from "lucide-react";
  
  const Footer = () => {
    return (
      <footer className="border-t border-white/10 bg-[#030712]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500">
              <Code2 className="text-white" size={22} />
            </div>
  
            <div>
              <h2 className="text-lg font-bold text-white">
                Xavier TechByte Society
              </h2>
  
              <p className="text-sm text-slate-400">
                Learn • Build • Innovate
              </p>
            </div>
          </div>
  
          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <a href="#about" className="transition hover:text-violet-400">
              About
            </a>
  
            <a href="#events" className="transition hover:text-violet-400">
              Events
            </a>
  
            <a href="#leadership" className="transition hover:text-violet-400">
              Leadership
            </a>
  
            <a href="#contact" className="transition hover:text-violet-400">
              Contact
            </a>
          </div>
  
          {/* Social */}
          <div className="flex gap-4">
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 transition hover:bg-violet-600"
            >
              
            </a>
  
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 transition hover:bg-violet-600"
            >
              
            </a>
  
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 transition hover:bg-violet-600"
            >
              
            </a>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Xavier TechByte Society. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;