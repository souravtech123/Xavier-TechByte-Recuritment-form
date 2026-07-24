import {
    CalendarDays,
    MapPin,
    Users,
    ArrowRight,
  } from "lucide-react";
  
  interface Event {
    title: string;
    category: string;
    date: string;
    location: string;
    participants: string;
    image: string;
  }
  
  const events: Event[] = [
    {
      title: "Xavathon 2026",
      category: "Hackathon",
      date: "15 August 2026",
      location: "St. Xavier's College",
      participants: "250+ Students",
      image: "/events/xavathon.jpg",
    },
    {
      title: "React Bootcamp",
      category: "Workshop",
      date: "22 August 2026",
      location: "Computer Lab",
      participants: "120+ Students",
      image: "/events/react.jpg",
    },
    {
      title: "AI & ML Seminar",
      category: "Seminar",
      date: "30 August 2026",
      location: "Auditorium",
      participants: "300+ Students",
      image: "/events/ai.jpg",
    },
  ];
  
  const OurEvents = () => {
    return (
      <section
        id="events"
        className="relative overflow-hidden bg-[#030712] py-28"
      >
        {/* Background Glow */}
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
  
        <div className="relative mx-auto max-w-7xl px-6">
  
          {/* Heading */}
          <div className="text-center">
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              Our Events
            </span>
  
            <h2 className="mt-6 text-5xl font-black text-white">
              Learn. Build.
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}Connect.
              </span>
            </h2>
  
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
              Participate in hackathons, workshops, seminars, coding competitions,
              and networking events designed to help students grow technically
              and professionally.
            </p>
          </div>
  
          {/* Featured Event */}
          <div className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:grid lg:grid-cols-2">
  
            <img
              src="/events/featured.jpg"
              alt="Featured Event"
              className="h-full w-full object-cover"
            />
  
            <div className="p-10">
  
              <span className="rounded-full bg-violet-600/20 px-3 py-1 text-sm text-violet-300">
                Featured Event
              </span>
  
              <h3 className="mt-5 text-4xl font-bold text-white">
                XTS Annual Hackathon
              </h3>
  
              <p className="mt-5 leading-8 text-slate-400">
                Join our flagship 24-hour hackathon where developers,
                designers, and innovators collaborate to build impactful
                solutions, learn from mentors, and compete for exciting prizes.
              </p>
  
              <div className="mt-8 space-y-4">
  
                <div className="flex items-center gap-3 text-slate-300">
                  <CalendarDays size={20} />
                  12 September 2026
                </div>
  
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin size={20} />
                  St. Xavier's College
                </div>
  
                <div className="flex items-center gap-3 text-slate-300">
                  <Users size={20} />
                  300+ Participants
                </div>
  
              </div>
  
              <button className="mt-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-4 font-semibold text-white transition hover:scale-105">
                Register Now
                <ArrowRight size={18} />
              </button>
  
            </div>
  
          </div>
  
          {/* Event Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  
            {events.map((event) => (
              <div
                key={event.title}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-violet-500/30"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
                />
  
                <div className="p-6">
  
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
                    {event.category}
                  </span>
  
                  <h3 className="mt-5 text-2xl font-bold text-white">
                    {event.title}
                  </h3>
  
                  <div className="mt-6 space-y-3 text-slate-400">
  
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} />
                      {event.date}
                    </div>
  
                    <div className="flex items-center gap-3">
                      <MapPin size={18} />
                      {event.location}
                    </div>
  
                    <div className="flex items-center gap-3">
                      <Users size={18} />
                      {event.participants}
                    </div>
  
                  </div>
  
                </div>
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  };
  
  export default OurEvents;