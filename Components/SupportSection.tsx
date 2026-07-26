import { ArrowRight, Mail, Phone } from "lucide-react";

const SupportSection = () => {
  return (
    <section
      id="support"
      className="relative overflow-hidden bg-[#030712] py-20 md:py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 sm:px-5 py-2 text-xs sm:text-sm tracking-wider text-violet-300">

            CONTACT XTS

          </span>

          <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl font-black leading-tight text-white md:text-7xl">

            Let&apos;s Build

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              {" "}Something Amazing

            </span>

          </h2>

          <p className="mx-auto mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-400">

            Whether you want to become a member of Xavier TechByte Society,
            participate in our events, collaborate on exciting projects,
            or simply ask a question, we&apos;re always here to help.

          </p>

          <button className="mt-8 sm:mt-12 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 active:scale-95">

            Join Our Community

            <ArrowRight size={18} />

          </button>

        </div>

        {/* Contact Information */}

        <div className="mx-auto mt-16 sm:mt-24 max-w-4xl space-y-8 sm:space-y-10">

          {/* Email */}

          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:pb-10">

            <div className="flex items-start gap-4 sm:gap-5">

              <div className="flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">

                <Mail className="text-cyan-400" size={22} />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
                  Email Us
                </p>

                <a
                  href="mailto:xts@sxcran.org"
                  className="mt-2 sm:mt-3 block text-xl sm:text-2xl font-bold text-white transition hover:text-cyan-400 break-all"
                >
                  xts@sxcran.org
                </a>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-400">
                  Have questions about joining XTS, our events,
                  workshops or collaborations? Send us an email and
                  we&apos;ll get back to you as soon as possible.
                </p>

              </div>

            </div>

            <a
              href="mailto:support@xaviertechbyte.org"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-cyan-500/20 px-6 py-3 font-medium text-cyan-300 transition duration-300 hover:border-cyan-400 hover:bg-cyan-500/10"
            >
              Email Now

              <ArrowRight size={18} />

            </a>

          </div>

          {/* Personal Assistance */}

          <div className="flex flex-col gap-6">

            <div className="flex items-start gap-4 sm:gap-5">

              <div className="flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-violet-500/10">

                <Phone className="text-violet-400" size={22} />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
                  Personal Assistance
                </p>

                <a
                  href="tel:+918789313228"
                  className="mt-2 sm:mt-3 block text-xl sm:text-2xl font-bold text-white transition hover:text-violet-400"
                >
                  +91 8789313228
                </a>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-400">
                  Need one-to-one guidance regarding recruitment,
                  membership, projects or events? Feel free to call
                  our team directly.
                </p>

              </div>

            </div>

            <a
              href="tel:+918789313228"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-violet-500/20 px-6 py-3 font-medium text-violet-300 transition duration-300 hover:border-violet-400 hover:bg-violet-500/10"
            >
              Call Now

              <ArrowRight size={18} />

            </a>

          </div>

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 sm:mt-28 text-center">

          <p className="text-base sm:text-lg text-slate-400">

            Ready to become a part of the Xavier TechByte Society?

          </p>

          <button className="mt-6 sm:mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 active:scale-95">

            Join Our Community

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
};

export default SupportSection;