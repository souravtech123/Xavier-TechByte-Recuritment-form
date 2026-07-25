"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import img1 from "../assets/Sir_Image.png";

export default function MentorMessage() {
  return (
    <section
      id="mentor"
      className="relative overflow-hidden bg-[#020617] py-36"
    >
      {/* Background */}

      <div className="absolute inset-0">

        {/* Grid */}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Purple Glow */}

        <div className="absolute -left-24 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[170px]" />

        {/* Cyan Glow */}

        <div className="absolute -right-24 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[170px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium tracking-wider text-violet-300">
            FACULTY MENTOR
          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

            A Message That

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Inspires
            </span>

          </h2>

        </div>

        {/* Hero Quote */}

        <div className="relative mx-auto mt-28 max-w-5xl text-center">

          <Quote
            size={120}
            className="absolute -left-10 -top-10 text-violet-500/15"
          />

          <h3 className="text-4xl font-light leading-relaxed text-white md:text-6xl">

            Technology is not just about writing code.

            <br />

            It is about building people

            <br />

            who solve real-world problems.

          </h3>

        </div>

        <div className="mx-auto mt-20 h-px w-40 bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500" />
        <div className="mt-24 grid items-start gap-20 lg:grid-cols-[430px_1fr]">

{/* Portrait */}

<div className="relative">

  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-3xl" />

  <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-3">

    <Image
      src={img1}
      alt="Faculty Mentor"
      className="h-[560px] w-full rounded-[30px] object-cover transition duration-700 hover:scale-105"
    />

  </div>

</div>

{/* Editorial */}

<div>

  <p className="text-2xl leading-10 text-white">

    Technology is not just about learning programming languages.
    It is about developing the ability to think critically,
    innovate fearlessly, and create meaningful solutions that
    positively impact society.

  </p>

  <p className="mt-10 text-lg leading-9 text-slate-400">

    Xavier TechByte Society provides students with an environment
    where ideas transform into real-world projects. Through
    collaboration, innovation, hackathons, workshops and practical
    experiences, students build not only technical expertise but
    also leadership, confidence and teamwork.

  </p>

  <p className="mt-8 text-lg leading-9 text-slate-400">

    I encourage every student to remain curious, embrace challenges,
    work together and continue learning beyond the classroom.
    The experiences you gain today will shape your future and
    prepare you to become tomorrow's innovators and leaders.

  </p>
  <div className="mt-14">

<div className="h-px w-28 bg-gradient-to-r from-violet-500 to-cyan-500" />

<h3 className="mt-8 text-3xl font-bold text-white">

  Dr. Kamadeep

</h3>

<p className="mt-2 text-violet-400">

  Faculty Mentor

</p>

<p className="mt-1 text-slate-500">

  Department of Computer Applications

</p>

</div>

</div>

</div>

{/* Bottom Quote */}

<div className="mt-32 text-center">

<p className="text-3xl font-light italic text-slate-400">

"The future belongs to those who never stop learning."

</p>

</div>

</div>

</section>
);
}