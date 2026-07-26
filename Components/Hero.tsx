"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Cpu,
  Cloud,
  Shield,
  Sparkles,

} from "lucide-react";



const techs = [
  {
    title: "React",
    icon: <Code2 size={16} />,
    className: "top-32 left-10",
  },
  {
    title: "Next.js",
    icon: <Sparkles size={16} />,
    className: "top-48 right-14",
  },
  {
    title: "AI",
    icon: <Cpu size={16} />,
    className: "bottom-56 left-20",
  },
  {
    title: "Cloud",
    icon: <Cloud size={16} />,
    className: "bottom-40 right-10",
  },
  {
    title: "Cyber",
    icon: <Shield size={16} />,
    className: "top-1/2 right-1/4",
  },
  {
    title: "Open Source",
    className: "top-1/3 left-1/4",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* ================= Video Background ================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Videos/Video.mp4" type="video/mp4" />
      </video>

      {/* ================= Overlay ================= */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#020617]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* Glow */}
      <div className="absolute left-0 top-20 h-[450px] w-[450px] rounded-full bg-violet-600/30 blur-[150px]" />

      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-[130px]" />

      {/* Floating Tech Cards — Desktop only */}
      {techs.map((item) => (
        <div
          key={item.title}
          className={`absolute hidden lg:flex ${item.className}
          animate-pulse items-center gap-2 rounded-full
          border border-white/10 bg-white/10 px-4 py-2
          text-sm text-white backdrop-blur-xl`}
        >
          {item.icon}
          {item.title}
        </div>
      ))}

      {/* ================= Hero Content ================= */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 text-center">

        {/* Badge */}
        <div className="mb-15 sm:mb-8 rounded-full border border-violet-400/30 bg-white/10 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl shadow-lg max-w-xs sm:max-w-none mx-auto">
          <span className="text-sm sm:text-base font-medium text-violet-200 leading-snug">
            🚀 Xavier TechByte Society • Recruitment 2026
          </span>
        </div>
        {/* Last Date Notice */}


        {/* Heading */}
        <h1
          className="
          max-w-6xl
          text-[2.75rem]
          sm:text-5xl
          font-black
          leading-none
          tracking-tight
          text-white
          md:text-7xl
          lg:text-8xl
        "
          style={{
            textShadow: "0px 5px 30px rgba(0,0,0,.9)",
          }}
        >
          BUILD.
          <br />

          <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
            LEARN.
          </span>

          <br />

          LEAD.
        </h1>

        {/* Description */}
        <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg leading-7 sm:leading-9 text-slate-200 px-2 sm:px-0">
          Join the official tech community where students build real-world
          products, organize hackathons, explore AI, Cloud Computing,
          Cybersecurity, Web Development, and become the next generation of tech
          innovators.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/register"
            className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_70px_rgba(139,92,246,.8)] active:scale-95"
          >
            Join Recruitment

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

<div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 backdrop-blur-xl shadow-lg">
  <p className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-red-300">
    ⏰ Last Date for Form Filling:
    <span className="font-bold text-white">Wednesday</span>
  </p>
</div>

          <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20 active:scale-95">
            Explore Events
          </button>
        </div>

        {/* Mini Tags */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-0">
          {[
            "Hackathons",
            "Projects",
            "Open Source",
            "AI",
            "Next.js",
            "Cloud",
            "UI/UX",
            "Cyber Security",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-200 backdrop-blur-xl"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Scroll */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-10 sm:h-12 w-6 sm:w-7 justify-center rounded-full border border-white/30">
            <ChevronDown
              size={16}
              className="mt-2 text-white animate-pulse"
            />
          </div>
        </div>
      </div>
    </section>
  );
}