"use client";

/**
 * Xavier TechByte Society — AI Conversational Registration
 * ----------------------------------------------------------------
 * A single-file, production-ready React + TypeScript component that
 * replaces a traditional form with a ChatGPT-style, one-question-at-a-time
 * onboarding flow. Built with Tailwind CSS + Framer Motion.
 *
 * Drop this into a Next.js "use client" page/section, wire up
 * `/api/registration` (already referenced below) and you're done.
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Cloud,
  Code2,
  Loader2,
  Megaphone,
  PenLine,
  Rocket,
  Search,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  User,
  Palette,
  MessageCircle,
  Compass,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type FieldType = "text" | "email" | "tel" | "textarea" | "url" | "select";

interface SelectOption {
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface StepConfig {
  key: keyof FormData;
  eyebrow: string;
  title: string;
  subtitle?: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: SelectOption[];
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  semester: string;
  interest: string;
  skills: string;
  whyJoin: string;
  portfolio: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  content: string;
}

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */

const COURSE_OPTIONS: SelectOption[] = [
  { label: "BCA" },
  { label: "B.Sc. Computer Application" },
  { label: "B.Sc Information Technology" },
  { label: "Other" },
];

const SEMESTER_OPTIONS: SelectOption[] = [
  { label: "1st" },
  { label: "2nd" },
  { label: "3rd" },
  { label: "4th" },
  { label: "5th" },
  { label: "6th" },
];

const INTEREST_OPTIONS: SelectOption[] = [
  { label: "Web Development", icon: Code2 },
  { label: "App Development", icon: Smartphone },
  { label: "AI / ML", icon: Bot },
  { label: "UI / UX", icon: Palette },
  { label: "Cloud Computing", icon: Cloud },
  { label: "Cyber Security", icon: Shield },
  { label: "Marketing", icon: Megaphone },
  { label: "Content Writing", icon: PenLine },
  { label: "Photography", icon: PenLine },
  { label: "Video Editing", icon: PenLine },
  { label: "Social Media Managment", icon: PenLine  },
  { label: "Event Managment", icon: PenLine },
];

const STEPS: StepConfig[] = [
  {
    key: "fullName",
    eyebrow: "Welcome",
    title: "Welcome to Xavier TechByte Society 👋",
    subtitle: "Let's start with your full name.",
    type: "text",
    required: true,
    placeholder: "e.g. Ananya Sharma",
  },
  {
    key: "email",
    eyebrow: "Contact",
    title: "What's your email address?",
    subtitle: "We'll send your application updates here.",
    type: "email",
    required: true,
    placeholder: "you@example.com",
  },
  {
    key: "phone",
    eyebrow: "Contact",
    title: "What's your phone number?",
    subtitle: "In case our team needs to reach you quickly.",
    type: "tel",
    required: true,
    placeholder: "+91 XXXXX XXXXX",
  },
  {
    key: "course",
    eyebrow: "Academics",
    title: "Which course are you pursuing?",
    type: "select",
    required: true,
    options: COURSE_OPTIONS,
  },
  {
    key: "semester",
    eyebrow: "Academics",
    title: "Which semester are you in?",
    type: "select",
    required: true,
    options: SEMESTER_OPTIONS,
  },
  {
    key: "interest",
    eyebrow: "Focus area",
    title: "Which area interests you the most?",
    type: "select",
    required: true,
    options: INTEREST_OPTIONS,
  },
  {
    key: "skills",
    eyebrow: "Skills",
    title: "Tell us about your skills.",
    subtitle: "Languages, tools, frameworks — anything you're proud of.",
    type: "text",
    required: true,
    placeholder: "React, Python, Figma...",
  },
  {
    key: "whyJoin",
    eyebrow: "Motivation",
    title: "Why do you want to join XTS?",
    subtitle: "Optional, but we'd love to know.",
    type: "textarea",
    required: false,
    placeholder: "Tell us what draws you to XTS...",
  },
  {
    key: "portfolio",
    eyebrow: "Showcase",
    title: "Portfolio or resume link?",
    subtitle: "Optional — GitHub, Behance, Drive link, anything works.",
    type: "url",
    required: false,
    placeholder: "https://...",
  },
];

const TOTAL_STEPS = STEPS.length;

const SUBMIT_STAGES = [
  "Uploading profile...",
  "Verifying information...",
  "Creating candidate profile...",
  "Sending to recruitment team...",
  "Completed",
];

const EMPTY_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  course: "",
  semester: "",
  interest: "",
  skills: "",
  whyJoin: "",
  portfolio: "",
};

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const isEmpty = (value: string) => value.trim().length === 0;

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value: string) {
  return /^[+\d][\d\s-]{7,15}$/.test(value.trim());
}

function validateUrl(value: string) {
  if (isEmpty(value)) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateStep(step: StepConfig, value: string): string | null {
  if (step.required && isEmpty(value)) return "This field is required.";
  if (isEmpty(value)) return null;
  if (step.type === "email" && !validateEmail(value)) return "Enter a valid email address.";
  if (step.type === "tel" && !validatePhone(value)) return "Enter a valid phone number.";
  if (step.type === "url" && !validateUrl(value)) return "Enter a valid URL.";
  return null;
}

/* ------------------------------------------------------------------ */
/* Decorative background                                               */
/* ------------------------------------------------------------------ */

function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030712]">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />

      {/* floating glowing blobs */}
      <motion.div
        className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-violet-600/30 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-purple-600/20 blur-[120px]"
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Confetti (lightweight, dependency-free)                             */
/* ------------------------------------------------------------------ */

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 3.2 + Math.random() * 2.2,
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
        color: ["#8b5cf6", "#22d3ee", "#a78bfa", "#67e8f9", "#c084fc"][
          i % 5
        ],
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
            borderRadius: 2,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s infinite`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chat bubble                                                         */
/* ------------------------------------------------------------------ */

function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex items-end gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-900/40">
          <Sparkles size={14} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-3xl px-5 py-3 text-[15px] leading-relaxed shadow-lg backdrop-blur-xl ${
          isBot
            ? "rounded-bl-lg border border-white/10 bg-white/[0.06] text-slate-100"
            : "rounded-br-lg border border-violet-400/30 bg-gradient-to-br from-violet-600/80 to-cyan-500/70 text-white shadow-violet-900/30"
        }`}
      >
        {message.content}
      </div>

      {!isBot && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10">
          <User size={14} className="text-white" />
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-900/40">
        <Sparkles size={14} className="text-white" />
      </div>
      <div className="flex items-center gap-2 rounded-3xl rounded-bl-lg border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
        <span className="text-xs text-slate-400">XTS AI is typing</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-violet-300"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Selection cards (multiple choice)                                   */
/* ------------------------------------------------------------------ */

function SelectionGrid({
  options,
  value,
  onSelect,
}: {
  options: SelectOption[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.label;
        return (
          <motion.button
            key={opt.label}
            type="button"
            onClick={() => onSelect(opt.label)}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
              active
                ? "border-transparent bg-gradient-to-br from-violet-600/90 to-cyan-500/80 text-white shadow-lg shadow-violet-900/40"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-violet-400/40 hover:bg-white/[0.08]"
            }`}
          >
            {Icon && (
              <Icon
                size={20}
                className={active ? "text-white" : "text-violet-300"}
              />
            )}
            <span className="text-sm font-medium">{opt.label}</span>
            {active && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <Check size={12} className="text-white" />
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Text-style input with floating label                                */
/* ------------------------------------------------------------------ */

function FloatingInput({
  step,
  value,
  onChange,
  onKeyDown,
  autoFocus,
}: {
  step: StepConfig;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  autoFocus: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const showFloating = focused || value.length > 0;

  const sharedClasses =
    "w-full rounded-2xl border bg-white/[0.05] px-5 pb-3 pt-6 text-lg text-white outline-none backdrop-blur-xl transition-all duration-200 placeholder:text-slate-500";

  const ringClasses = focused
    ? "border-transparent shadow-[0_0_0_2px_rgba(139,92,246,0.6),0_0_24px_rgba(34,211,238,0.25)]"
    : "border-white/10";

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-5 z-10 transition-all duration-200 ${
          showFloating
            ? "top-2.5 text-xs text-violet-300"
            : "top-5 text-base text-slate-500"
        }`}
      >
        {step.placeholder}
      </label>

      {step.type === "textarea" ? (
        <textarea
          autoFocus={autoFocus}
          rows={4}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={`${sharedClasses} ${ringClasses} resize-none`}
        />
      ) : (
        <input
          autoFocus={autoFocus}
          type={step.type === "select" ? "text" : step.type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={`${sharedClasses} ${ringClasses}`}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress                                                             */
/* ------------------------------------------------------------------ */

function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="mx-auto w-full max-w-2xl px-6">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>
          Step {step + 1} of {TOTAL_STEPS}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Submission overlay                                                  */
/* ------------------------------------------------------------------ */

function SubmissionOverlay({ onDone }: { onDone: () => void }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (activeStage >= SUBMIT_STAGES.length) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveStage((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [activeStage, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 backdrop-blur-xl"
    >
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-violet-950/40">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
            <Loader2 size={18} className="animate-spin text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Processing your application</p>
            <p className="text-xs text-slate-400">This will only take a moment</p>
          </div>
        </div>

        <ul className="space-y-4">
          {SUBMIT_STAGES.map((label, i) => {
            const done = i < activeStage;
            const current = i === activeStage;
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    done
                      ? "border-transparent bg-gradient-to-br from-violet-500 to-cyan-400"
                      : current
                        ? "border-violet-400 text-violet-300"
                        : "border-white/15 text-slate-600"
                  }`}
                >
                  {done ? (
                    <Check size={13} className="text-white" />
                  ) : current ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : null}
                </span>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    done ? "text-slate-300" : current ? "text-white" : "text-slate-600"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Success screen                                                       */
/* ------------------------------------------------------------------ */

function RoadmapStep({
  icon: Icon,
  label,
  active,
  isLast,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
  isLast?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
          active
            ? "border-transparent bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-900/40"
            : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <Icon size={18} className={active ? "text-white" : "text-slate-400"} />
      </div>
      <p className={`mt-3 max-w-[7rem] text-xs ${active ? "text-white" : "text-slate-500"}`}>
        {label}
      </p>
      {!isLast && <div className="mt-4 hidden h-px w-full flex-1 bg-gradient-to-r from-violet-500/40 to-transparent sm:block" />}
    </div>
  );
}

function SuccessScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-16"
    >
      <Confetti />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-2xl shadow-violet-900/50"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Check size={44} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center text-4xl font-black text-white md:text-5xl"
      >
        🎉 Welcome to the XTS Journey
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="mt-5 max-w-xl text-center text-slate-400"
      >
        Your application has been successfully received. Our recruitment team will
        carefully review your profile. If you&apos;re shortlisted, we&apos;ll contact you
        through email or phone.
        <br />
        <span className="mt-2 block text-slate-300">
          Keep learning. Keep building. Keep innovating.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
      >
        <div className="flex flex-col items-stretch justify-between gap-6 sm:flex-row">
          <RoadmapStep icon={Check} label="Application Received" active />
          <RoadmapStep icon={Search} label="Profile Review" active={false} />
          <RoadmapStep icon={MessageCircle} label="Team Contact" active={false} />
          <RoadmapStep icon={Rocket} label="Welcome to XTS" active={false} isLast />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={onRestart}
          className="rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur-xl transition hover:bg-white/10"
        >
          Return Home
        </button>
        <a
          href="https://chat.whatsapp.com/I863BRNmBbP2jf7V860EFG?s=cl&p=a&ilr=4&amv=2"
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:scale-[1.02]"
        >
          Join WhatsApp Community
        </a>
        <a
          href="#"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:scale-[1.02]"
        >
          <Compass size={16} />
          Explore Projects
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

type Phase = "chat" | "submitting" | "success";

export default function XtsRegistrationChat() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [showTyping, setShowTyping] = useState(true);
  const [phase, setPhase] = useState<Phase>("chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentStep = STEPS[stepIndex];
  const currentValue = formData[currentStep.key];

  // history of resolved (question, answer) pairs for steps before the current one
  const history = useMemo(() => {
    const msgs: ChatMessage[] = [];
    for (let i = 0; i < stepIndex; i++) {
      const s = STEPS[i];
      const val = formData[s.key];
      msgs.push({ id: `${s.key}-q`, sender: "bot", content: s.title });
      msgs.push({
        id: `${s.key}-a`,
        sender: "user",
        content: isEmpty(val) ? "Skipped" : val,
      });
    }
    return msgs;
  }, [stepIndex, formData]);

  // typing indicator whenever the step changes
  useEffect(() => {
    setShowTyping(true);
    setError(null);
    const t = setTimeout(() => setShowTyping(false), 550);
    return () => clearTimeout(t);
  }, [stepIndex]);

  // auto-scroll to bottom on updates
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, showTyping, stepIndex]);

  const updateField = (value: string) => {
    setFormData((prev) => ({ ...prev, [currentStep.key]: value }));
    if (error) setError(null);
  };

  const goNext = () => {
    const validationError = validateStep(currentStep, currentValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (stepIndex === TOTAL_STEPS - 1) {
      setPhase("submitting");
      return;
    }
    setStepIndex((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((s) => Math.max(s - 1, 0));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !(currentStep.type === "textarea" && !e.metaKey && !e.ctrlKey)) {
      e.preventDefault();
      goNext();
    } else if (e.key === "Escape") {
      goBack();
    }
  };

  const handleSubmitToServer = async () => {
    try {
      await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (phase === "submitting") {
      handleSubmitToServer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const restart = () => {
    setFormData(EMPTY_FORM);
    setStepIndex(0);
    setError(null);
    setPhase("chat");
  };

  if (phase === "success") {
    return (
      <div className="relative min-h-screen w-full">
        <AuroraBackground />
        <SuccessScreen onRestart={restart} />
      </div>
    );
  }

  const isLastStep = stepIndex === TOTAL_STEPS - 1;

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 sm:px-6">
      <AuroraBackground />

      <AnimatePresence>
        {phase === "submitting" && (
          <SubmissionOverlay onDone={() => setPhase("success")} />
        )}
      </AnimatePresence>

      {/* header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
          <Sparkles size={12} />
          Recruitment 2026
        </span>
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Xavier TechByte Society
        </h1>
        <p className="mt-1 text-sm text-slate-400">Talk to our AI recruiter to apply</p>
      </div>

      <ProgressBar step={stepIndex} />

      {/* chat + input card */}
      <div className="mt-8 w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-2xl">
        {/* chat history */}
        <div
          ref={scrollRef}
          className="max-h-[46vh] min-h-[9rem] space-y-4 overflow-y-auto px-6 pb-4 pt-6 sm:px-8"
        >
          {history.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}

          <AnimatePresence mode="wait">
            {showTyping ? (
              <TypingIndicator key="typing" />
            ) : (
              <ChatBubble
                key={`${currentStep.key}-current`}
                message={{ id: "current", sender: "bot", content: currentStep.title }}
              />
            )}
          </AnimatePresence>

          {!showTyping && currentStep.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pl-11 text-sm text-slate-500"
            >
              {currentStep.subtitle}
            </motion.p>
          )}
        </div>

        {/* input area */}
        <div className="border-t border-white/10 bg-white/[0.02] px-6 py-6 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {currentStep.type === "select" ? (
                <SelectionGrid
                  options={currentStep.options ?? []}
                  value={currentValue}
                  onSelect={(v) => {
                    updateField(v);
                  }}
                />
              ) : (
                <FloatingInput
                  step={currentStep}
                  value={currentValue}
                  onChange={updateField}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-rose-400"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* nav buttons */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {!currentStep.required && isEmpty(currentValue) && !isLastStep && (
              <button
                type="button"
                onClick={() => setStepIndex((s) => Math.min(s + 1, TOTAL_STEPS - 1))}
                className="text-xs font-medium text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
              >
                Skip
              </button>
            )}

            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:scale-[1.02]"
            >
              {isLastStep ? (
                <>
                  Submit Application
                  <Send size={16} />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-600">
        Press <kbd className="rounded bg-white/10 px-1.5 py-0.5">Enter</kbd> to continue ·{" "}
        <kbd className="rounded bg-white/10 px-1.5 py-0.5">Esc</kbd> to go back
      </p>
    </section>
  );
}