"use client";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { Mail } from "lucide-react";
import img3 from '../assets/Prachi.png'
import img4 from '../assets/Harsh.png'
import img5 from '../assets/Sourav.png'
import img6 from '../assets/Katyani.png'
import img7 from '../assets/Ayush.png'
import img8 from '../assets/Kindo.png'
import img9 from '../assets/Krish.png'

interface Leader {
  name: string;
  role: string;
  image: StaticImageData;
  email?: string;
  linkedin?: string;
  github?: string;
}

const president: Leader = {
  name: "Prachi Priya",
  role: "President",
  image: img3,
};

const heads: Leader[] = [
  {
    name: "Harsh Singh",
    role: "Executive Head",
    image: img4,
  },
  {
    name: "Sourav Suman",
    role: "Tech Head",
    image: img5,
  },
  {
    name: "Katyani Keshri",
    role: "P.R Head",
    image: img6,
  },
  {
    name: "Ayush",
    role: "Media Head",
    image: img7,
  },
  {
    name: "Ayush Kindo",
    role: "Research Head",
    image: img8,
  },
  {
    name: "Krish Kumar",
    role: "Executive SubHead",
    image: img9 ,
  },
];

function HeadCard({ member }: { member: Leader }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative overflow-hidden rounded-full border border-white/10">

        <Image
          src={member.image}
          alt={member.name}
          width={140}
          height={140}
          className="h-36 w-36 object-cover transition duration-500 group-hover:scale-110"
        />

      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">
        {member.name}
      </h3>

      <p className="mt-1 text-violet-400">
        {member.role}
      </p>
    </div>
  );
}

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative overflow-hidden bg-[#020617] py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

        <div className="absolute -left-20 top-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[150px]" />

        <div className="absolute -right-20 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">

            LEADERSHIP TEAM

          </span>

          <h2 className="mt-8 text-5xl font-black text-white md:text-7xl">

            Meet the

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              People
            </span>

            <br />

            Behind XTS

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-400">

            A passionate team of students dedicated to building an innovative,
            collaborative and future-ready technology community.

          </p>

        </div>

        {/* President */}

        <div className="mt-24 flex justify-center">

          <div className="w-full max-w-md rounded-[36px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">

            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-violet-500/20">

              <Image
                src={president.image}
                alt={president.name}
                fill
                sizes="192px"
                className="object-cover"
              />

            </div>

            <h3 className="mt-8 text-4xl font-bold text-white">

              {president.name}

            </h3>

            <p className="mt-2 text-xl text-violet-400">

              {president.role}

            </p>

            <p className="mt-6 leading-8 text-slate-400">

              Leading Xavier TechByte Society with a vision of innovation,
              collaboration, practical learning and empowering every student
              through technology.

            </p>

            <div className="mt-8 flex justify-center gap-4">

              <button className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:bg-violet-600">
                <Mail size={18} className="text-white" />
              </button>

              

             

            </div>

          </div>

        </div>

        {/* Connection */}

        <div className="relative mx-auto mt-16 hidden w-full max-w-5xl lg:block">

          <div className="mx-auto h-16 w-[2px] bg-gradient-to-b from-violet-500 to-cyan-500" />

          <div className="absolute left-0 right-0 top-16 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

        </div>

        {/* Heads */}

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {heads.map((member) => (
            <HeadCard
              key={member.name}
              member={member}
            />
          ))}

        </div>

      </div>

    </section>
  );
}