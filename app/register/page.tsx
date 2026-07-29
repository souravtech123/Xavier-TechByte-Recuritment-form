
"use client";

import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegistrationClosed() {
  return (
    <section className="relative overflow-hidden bg-[#020617] min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

        <div className="absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[150px]" />

        <div className="absolute -right-20 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm text-red-300">
          Registration Closed
        </span>

        {/* Icon */}
        <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
          <Lock className="h-12 w-12 text-red-400" />
        </div>

        {/* Heading */}
        <h1 className="mt-10 text-5xl font-black leading-tight text-white md:text-7xl">
          REGISTRATION
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            CLOSED
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-300">
          Thank you for your overwhelming response! The registration period for
          <span className="font-semibold text-white">
            {" "}
            Xavier TechByte Society Recruitment
          </span>{" "}
          has officially ended.
          <br />
          We truly appreciate everyone who showed interest in joining our
          community.
        </p>

        {/* Glass Card */}
        <div className="mt-12 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white">
            What's Next?
          </h3>

          <p className="mt-4 text-slate-400 leading-8">
            Shortlisted candidates will receive interview details and further
            updates through WhatsApp and Email. Please keep checking your inbox
            and stay connected with Xavier TechByte Society.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white/10"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
}