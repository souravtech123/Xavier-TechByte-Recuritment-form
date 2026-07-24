"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "BCA",
    semester: "1st",
    interest: "Web Development",
    skills: "",
    whyJoin: "",
    portfolio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Application submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "BCA",
        semester: "1st",
        interest: "Web Development",
        skills: "",
        whyJoin: "",
        portfolio: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="register"
      className="bg-[#030712] py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Recruitment 2026
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Join Xavier TechByte Society
          </h2>

          <p className="mt-5 text-slate-400">
            Fill out the form below. Our team will review your application and
            contact you soon.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-violet-500"
              >
                <option>BCA</option>
                <option>B.Sc. Computer Application</option>
                <option>B.Tech</option>
                <option>MCA</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Semester
              </label>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-violet-500"
              >
                <option>1st</option>
                <option>2nd</option>
                <option>3rd</option>
                <option>4th</option>
                <option>5th</option>
                <option>6th</option>
              </select>
            </div>
          </div>
                    {/* Area of Interest */}
                    <div>
            <label className="mb-2 block text-sm text-slate-300">
              Area of Interest
            </label>

            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-violet-500"
            >
              <option>Web Development</option>
              <option>App Development</option>
              <option>UI/UX Design</option>
              <option>AI / ML</option>
              <option>Cloud Computing</option>
              <option>Cyber Security</option>
              <option>Marketing</option>
              <option>Content Writing</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="React, Python, Canva, Figma..."
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          {/* Why Join */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Why do you want to join? (Optional)
            </label>

            <textarea
              rows={5}
              name="whyJoin"
              value={formData.whyJoin}
              onChange={handleChange}
              placeholder="Tell us why you'd like to join XTS..."
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          {/* Portfolio */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Resume / Portfolio Link (Optional)
            </label>

            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                Submit Application
                <Send size={18} />
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-500">
            After submitting, our team will review your application and contact
            you via email or phone.
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;