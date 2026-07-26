import {
  CalendarDays,
  Users,
  MapPin,
} from "lucide-react";

interface TimelineEvent {
  title: string;
  date: string;
  location: string;
  participants: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    title: "Tech Kriti",
    date: "Oct 2024",
    location: "St. Xavier's College",
    participants: "100+ Students",
    description:
      "TechKriti marks the beginning of Xavier Tech Byte Society (XTS)—a community built for innovation, collaboration, and technology. Be a part of the journey and shape the future with us.",
  },
  {
    title: "Game Development Workshop",
    date: "Nov 2024",
    location: "Online",
    participants: "50+ Students",
    description:
      "Game Dev Workshop is a hands-on session designed to introduce students to the fundamentals of game development. Participants will learn how games are built, explore core concepts like gameplay mechanics and design, and take their first step into creating interactive experiences.",
  },
  {
    title: "XTS Unplugged",
    date: "March 2025",
    location: "Proost Hall",
    participants: "50+",
    description:
      "Tech Talks is an interactive discussion session where teachers and students come together to share ideas, experiences, and insights on technology. The session encourages open conversations, clears doubts, and bridges the gap between academic learning and real-world tech applications.",
  },
  {
    title: "Build With AI",
    date: "May 2025",
    location: "College Auditorium",
    participants: "100+ Students",
    description:
      "AI Workshop is a hands-on session designed to introduce students to the basics of Artificial Intelligence. Participants will explore how AI works, understand real-world use cases, and learn how to build simple AI-powered applications.",
  },
  {
    title: "Innvoverse TechFest",
    date: "August 2025",
    location: "ST Xavier College Ranchi",
    participants: "100+ Students",
    description:
      "Innoverse Techfest is a celebration of innovation and technology, bringing together students to explore ideas, showcase creativity, and engage in exciting tech-based activities. The fest encourages learning through competitions, workshops, and collaborative experiences, inspiring participants to think beyond limits.",
  },
  {
    title: "Living With AI",
    date: "April 2026",
    location: "College Auditorium",
    participants: "100+ Students",
    description:
      "Living with AI is an interactive session exploring how Artificial Intelligence is transforming learning, creativity, productivity, and everyday life. Discover practical AI tools, real-world applications, and how to use AI responsibly to stay ahead in the digital era.",
  },
  {
    title: "Xavathon",
    date: "May 2026",
    location: "Proost Auditorium",
    participants: "50+ Students",
    description:
      "Xavathon 2026 is Xavier Tech Byte Society's flagship hackathon, bringing together creative minds to solve real-world challenges through innovation and technology. Collaborate, build impactful solutions, compete with top talent, and turn your ideas into reality within an exciting, high-energy environment",
  },
  
];

const OurJourney = () => {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#030712] py-20 md:py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[170px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[170px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 sm:px-5 py-2 text-xs sm:text-sm tracking-wider text-violet-300">

            OUR JOURNEY

          </span>

          <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl font-black text-white md:text-7xl">

            Every Event Creates

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Impact
            </span>

          </h2>

          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-400">

            Every hackathon, workshop and seminar represents another milestone
            in building an innovative student community.

          </p>

        </div>

        {/* Year */}

        <div className="mt-12 sm:mt-24 flex justify-center">

          <div className="rounded-full border border-white/10 bg-white/5 px-8 sm:px-10 py-3 sm:py-4 backdrop-blur-xl">

            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-4xl sm:text-6xl font-black text-transparent">

              2024-26

            </span>

          </div>

        </div>

        {/* ============================================
            MOBILE TIMELINE (visible on < lg)
        ============================================ */}
        <div className="relative mt-16 lg:hidden">

          {/* Left vertical line */}
          <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 via-cyan-400 to-violet-500" />

          <div className="space-y-10">
            {events.map((event, index) => (
              <div key={event.title} className="relative flex gap-6 pl-14">

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 z-10">
                  <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-md" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-[#0B1120]">
                    <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">

                  {/* Index badge */}
                  <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-xl font-bold text-white leading-tight">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {event.description}
                  </p>

                  <div className="mt-4 flex flex-col gap-2">

                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <CalendarDays size={14} className="flex-shrink-0 text-violet-400" />
                      {event.date}
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <MapPin size={14} className="flex-shrink-0 text-cyan-400" />
                      {event.location}
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Users size={14} className="flex-shrink-0 text-fuchsia-400" />
                      {event.participants}
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* ============================================
            DESKTOP TIMELINE (visible on lg+)
        ============================================ */}
        <div className="relative mt-28 hidden lg:block">

          {/* Center Line */}

          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-500 via-cyan-400 to-violet-500" />

          <div className="space-y-28">
          {events.map((event, index) => {

const left = index % 2 === 0;

return (

  <div
    key={event.title}
    className="relative flex items-center"
  >

    {/* LEFT SIDE */}

    <div
      className={`hidden lg:block w-1/2 ${
        left ? "pr-20 text-right" : ""
      }`}
    >

      {left ? (

        <div className="relative">

          {/* Background Number */}

          <span className="absolute -right-2 -top-16 text-[140px] font-black leading-none text-white/[0.03] select-none">

            {String(index + 1).padStart(2, "0")}

          </span>

          <div>

            <h3 className="text-4xl font-bold text-white">

              {event.title}

            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-400">

              {event.description}

            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-end gap-3 text-slate-300">

                <CalendarDays size={18} />

                {event.date}

              </div>

              <div className="flex items-center justify-end gap-3 text-slate-300">

                <MapPin size={18} />

                {event.location}

              </div>

              <div className="flex items-center justify-end gap-3 text-slate-300">

                <Users size={18} />

                {event.participants}

              </div>

            </div>

          </div>

        </div>

      ) : (

        <div className="text-right">

          <span className="select-none text-[140px] font-black leading-none text-white/[0.03]">

            {String(index + 1).padStart(2, "0")}

          </span>

        </div>

      )}

    </div>

    {/* TIMELINE DOT */}

    <div className="relative z-20 mx-auto lg:mx-0">

      {/* Glow */}

      <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl" />

      {/* Circle */}

      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/30 bg-[#0B1120]">

        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div
      className={`w-full lg:w-1/2 ${
        !left ? "lg:pl-20" : "lg:pl-20"
      }`}
    >

      {!left ? (

        <div className="relative">

          {/* Background Number */}

          <span className="absolute -left-2 -top-16 text-[140px] font-black leading-none text-white/[0.03] select-none">

            {String(index + 1).padStart(2, "0")}

          </span>

          <div>

            <h3 className="text-4xl font-bold text-white">

              {event.title}

            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-400">

              {event.description}

            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-slate-300">

                <CalendarDays size={18} />

                {event.date}

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <MapPin size={18} />

                {event.location}

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <Users size={18} />

                {event.participants}

              </div>

            </div>

          </div>

        </div>

      ) : (

        <div />

      )}

    </div>

  </div>

);

})}
          </div>

{/* Bottom Fade */}

<div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent to-[#030712] lg:block" />

</div>

</div>

</section>
);
};

export default OurJourney;