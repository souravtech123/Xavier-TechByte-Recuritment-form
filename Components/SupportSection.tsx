import { ArrowRight, MessageCircle, Mail, Phone } from "lucide-react";

const SupportSection = () => {
  return (
    <section
      id="support"
      className="relative overflow-hidden bg-[#030712] py-28"
    >
      {/* Background Glow */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            
            {/* Left */}
            <div>
              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                Need Assistance?
              </span>

              <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
                Have Any Questions?
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                Whether you're interested in joining Xavier TechByte Society,
                participating in our events, or collaborating on exciting
                projects, we're here to help. Feel free to contact our team—we'd
                love to hear from you.
              </p>

              <button className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-4 font-semibold text-white transition hover:scale-105">
                Contact Support
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right */}
            <div className="space-y-6">

              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                <div className="rounded-xl bg-violet-600/20 p-4">
                  <MessageCircle className="text-violet-400" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    WhatsApp Support
                  </h3>
                  <p className="text-slate-400">
                    Get quick responses from our team.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                <div className="rounded-xl bg-cyan-600/20 p-4">
                  <Mail className="text-cyan-400" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Email Us
                  </h3>
                  <p className="text-slate-400">
                    support@xaviertechbyte.org
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                <div className="rounded-xl bg-emerald-600/20 p-4">
                  <Phone className="text-emerald-400" size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Call Support
                  </h3>
                  <p className="text-slate-400">
                    Mon – Fri • 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;