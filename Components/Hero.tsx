import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Purple Glow */}
        <div className="absolute left-0 top-20 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[140px]" />

        {/* Cyan Glow */}
        <div className="absolute right-0 bottom-10 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-8 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 backdrop-blur-xl">
          <span className="text-sm font-medium text-violet-300">
            🚀 Xavier TechByte Society
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl">
          Building The
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Next Generation
          </span>
          of Tech Leaders
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
          Join a community of developers, designers, innovators, and creators.
          Build real-world products, organize hackathons, master modern
          technologies, and accelerate your tech career.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Link href={'/register'} className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105">
            Join XTS
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

          <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
            Explore Events
          </button>
        </div>

        {/* Stats */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { number: "500+", label: "Members" },
            { number: "25+", label: "Events" },
            { number: "15+", label: "Projects" },
            { number: "10+", label: "Partners" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-violet-500/30"
            >
              <h2 className="text-4xl font-bold text-white">{item.number}</h2>
              <p className="mt-2 text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;