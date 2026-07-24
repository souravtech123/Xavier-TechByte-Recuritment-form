import { Mail } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

const president: Leader = {
  name: "Prachi Priya",
  role: "President",
  image: "/team/president.jpg",
};

const heads: Leader[] = [
  {
    name: "Harsh Singh",
    role: "Executive Head",
    image: "/team/dev-head.jpg",
  },
  {
    name: "Sourav Suman",
    role: "Tech Head",
    image: "/team/design-head.jpg",
  },
  {
    name: "Katyani Keshri",
    role: "P.R Head",
    image: "/team/marketing-head.jpg",
  },
  {
    name: "Ayush",
    role: "Media Head",
    image: "/team/content-head.jpg",
  },
  {
    name: "Ayush Kindo",
    role: "Research Head",
    image: "/team/content-head.jpg",
  },
];

const Card = ({ member }: { member: Leader }) => (
  <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/30">
    <img
      src={member.image}
      alt={member.name}
      className="mx-auto h-36 w-36 rounded-full object-cover ring-2 ring-violet-500/20"
    />

    <h3 className="mt-6 text-center text-2xl font-bold text-white">
      {member.name}
    </h3>

    <p className="mt-2 text-center text-violet-400">
      {member.role}
    </p>

    <div className="mt-6 flex justify-center">
      <button className="rounded-full bg-slate-800 p-3 transition hover:bg-violet-600">
        <Mail size={18} className="text-white" />
      </button>
    </div>
  </div>
);

const Leadership = () => {
  return (
    <section id="leadership" className="bg-[#030712] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Leadership Team
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Meet Our Leaders
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Passionate leaders dedicated to building an innovative,
            collaborative, and future-ready technology community.
          </p>
        </div>

        {/* President */}
        <div className="mt-20">
          <h3 className="mb-8 text-center text-3xl font-bold text-white">
            President
          </h3>

          <div className="mx-auto max-w-sm">
            <Card member={president} />
          </div>
        </div>

        {/* Department Heads */}
        <div className="mt-24">
          <h3 className="mb-10 text-center text-3xl font-bold text-white">
            Department Heads
          </h3>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {heads.map((head) => (
              <Card key={head.name} member={head} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;