import { Quote } from "lucide-react";
import img1 from '../assets/Sir_Photo.png'
import Image from "next/image";

const MentorMessage = () => {
  return (
    <section
      id="mentor-message"
      className="relative overflow-hidden bg-[#030712] py-24"
    >
      {/* Background Glow */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            Faculty Mentor
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-6xl">
            A Message From Our
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Mentor
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Guidance, inspiration, and a shared vision for innovation and
            excellence.
          </p>
        </div>

        {/* Content */}
        <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/30 to-cyan-500/30 blur-3xl" />

              <Image
                src={img1}
                alt="Faculty Mentor"
                className="relative h-[500px] w-[380px] rounded-3xl border border-white/10 object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Message */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <Quote
              size={48}
              className="mb-6 text-violet-400"
            />

            <p className="text-lg leading-9 text-slate-300">
              Technology is not just about writing code—it is about solving
              real-world problems, working as a team, and continuously learning.
              Xavier TechByte Society provides students with a platform to
              explore their creativity, develop practical skills, and transform
              innovative ideas into meaningful solutions.
            </p>

            <p className="mt-6 text-lg leading-9 text-slate-300">
              I encourage every student to take initiative, embrace challenges,
              collaborate with peers, and make the most of every opportunity.
              The experience you gain here will shape your confidence,
              leadership, and future career.
            </p>

            {/* Mentor Details */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <h3 className="text-2xl font-bold text-white">
                Dr. Kamadeep
              </h3>

              <p className="mt-1 text-violet-400">
                Faculty Mentor
              </p>

              <p className="mt-2 text-slate-400">
                Department of Computer Applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorMessage;