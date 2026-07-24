import {
    Rocket,
    Lightbulb,
    Users,
    Code2,
    Trophy,
    GraduationCap,
  } from "lucide-react";
  
  const features = [
    {
      icon: Code2,
      title: "Build Real Projects",
      description:
        "Work on real-world applications using modern technologies and gain practical development experience.",
    },
    {
      icon: Trophy,
      title: "Hackathons & Events",
      description:
        "Participate in hackathons, coding competitions, workshops, and technical sessions throughout the year.",
    },
    {
      icon: GraduationCap,
      title: "Career Growth",
      description:
        "Prepare for internships and placements with mentorship, resume building, and interview preparation.",
    },
    {
      icon: Users,
      title: "Strong Community",
      description:
        "Connect with passionate developers, designers, creators, and innovators who love building together.",
    },
  ];
  
  const About = () => {
    return (
      <section
        id="about"
        className="relative py-28 bg-[#030712] overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
  
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              About Xavier TechByte Society
            </span>
  
            <h2 className="mt-6 text-4xl font-black text-white md:text-6xl">
              Learn.
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Build.{" "}
              </span>
              Innovate.
            </h2>
  
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Xavier TechByte Society (XTS) is a student-led technology community
              dedicated to empowering students through innovation, collaboration,
              and practical learning. We believe the best way to learn technology
              is by building impactful products together.
            </p>
          </div>
  
          {/* Mission & Vision */}
          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <Rocket className="mb-5 text-violet-400" size={40} />
  
              <h3 className="text-2xl font-bold text-white">
                Our Mission
              </h3>
  
              <p className="mt-4 leading-8 text-slate-400">
                To create a collaborative ecosystem where students learn modern
                technologies, develop innovative solutions, participate in
                hackathons, and become industry-ready professionals.
              </p>
            </div>
  
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <Lightbulb className="mb-5 text-cyan-400" size={40} />
  
              <h3 className="text-2xl font-bold text-white">
                Our Vision
              </h3>
  
              <p className="mt-4 leading-8 text-slate-400">
                To become one of the leading student technology communities by
                fostering innovation, leadership, entrepreneurship, and continuous
                learning through impactful projects and events.
              </p>
            </div>
          </div>
  
          {/* Features */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
  
              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-500/30"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500">
                    <Icon size={28} className="text-white" />
                  </div>
  
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
  
                  <p className="mt-4 leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };
  
  export default About;