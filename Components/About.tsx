"use client";

import Image from "next/image";

import img2 from '../assets/Using-Technology-in-the-Classroom-to-Improve-Learning.jpg'
// Replace with your image


export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#020617] py-20 md:py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

        <div className="absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[150px]" />

        <div className="absolute -right-20 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 sm:px-5 py-2 text-xs sm:text-sm text-violet-300">

            ABOUT XAVIER TECHBYTE SOCIETY

          </span>

          <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl font-black leading-tight text-white md:text-7xl">

            BUILD.

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              LEARN.
            </span>

            <br />

            INNOVATE.

          </h2>

          <p className="mx-auto mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg leading-7 sm:leading-9 text-slate-300">

            Xavier TechByte Society is a student-led technology community where
            passionate students collaborate, build real-world products,
            organize hackathons, explore emerging technologies and prepare
            themselves for successful careers in technology.

          </p>

        </div>

        {/* Content */}

        <div className="mt-16 sm:mt-24 grid items-center gap-12 lg:gap-20 lg:grid-cols-2">

          {/* Left */}

          <div>

            <div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">

                Our Mission

              </h3>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-7 sm:leading-9 text-slate-400">

                Create an environment where students learn by building,
                collaborate on impactful projects and develop the confidence
                required to succeed in the technology industry.

              </p>

            </div>

            <div className="mt-10 sm:mt-14">

              <h3 className="text-2xl sm:text-3xl font-bold text-white">

                Our Vision

              </h3>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-7 sm:leading-9 text-slate-400">

                Become one of India's most inspiring student technology
                communities by fostering innovation, leadership and continuous
                learning through practical experiences.

              </p>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/10">

              <Image
                src={img2}
                alt="Students"
                className="h-[260px] sm:h-[380px] lg:h-[550px] w-full object-cover transition duration-700 hover:scale-105"
              />
        
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}