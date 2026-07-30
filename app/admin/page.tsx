"use client";

import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronDown,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  Eye,
  RefreshCw,
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Layers,
  Star,
  Wrench,
  Link2,
  MessageSquare,
  Shield,
  QrCode,
  Download,
  Share2,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Registration {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  semester: string;
  interest: string;
  skills: string;
  whyJoin?: string;
  portfolio?: string;
  status: "Pending" | "Selected" | "Rejected";
  qrToken?: string;
  verified: boolean;
  interviewDone: boolean;
  createdAt: string;
}

type StatusFilter = "All" | "Pending" | "Selected" | "Rejected";

const EMPTY_FORM: Omit<Registration, "_id" | "createdAt" | "verified" | "interviewDone"> = {
  fullName: "",
  email: "",
  phone: "",
  course: "",
  semester: "",
  interest: "",
  skills: "",
  whyJoin: "",
  portfolio: "",
  status: "Pending",
  qrToken: undefined,
};

/* ------------------------------------------------------------------ */
/* Utility                                                              */
/* ------------------------------------------------------------------ */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Normalise phone for WhatsApp — strip spaces/dashes, prepend 91 if no country code */
function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return "91" + digits.slice(1);
  if (digits.length === 10) return "91" + digits;
  return digits;
}

function buildTicketUrl(token: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  return `${base}/ticket?token=${token}`;
}

/* ------------------------------------------------------------------ */
/* Status Badge                                                         */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Registration["status"] }) {
  const colorMap = {
    Pending: { bg: "#fbbf2415", border: "#fbbf2450", text: "#fbbf24", dot: "#fbbf24" },
    Selected: { bg: "#34d39915", border: "#34d39950", text: "#34d399", dot: "#34d399" },
    Rejected: { bg: "#fb718515", border: "#fb718550", text: "#fb7185", dot: "#fb7185" },
  };
  const c = colorMap[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: "0.72rem",
        fontWeight: 700,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

function Modal({
  title,
  onClose,
  children,
  maxWidth,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "xts-fadein 0.18s ease",
      }}
    >
      <div
        style={{
          background: "#0f1623",
          border: "1px solid rgba(99,130,255,0.18)",
          borderRadius: 20,
          width: "100%",
          maxWidth: maxWidth ?? 680,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
          animation: "xts-slideup 0.22s ease",
        }}
      >
        {/* header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(99,130,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "white" }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(99,130,255,0.15)",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(251,113,133,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fb7185";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
            }}
          >
            <X size={16} />
          </button>
        </div>
        {/* body */}
        <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* QR Modal                                                            */
/* ------------------------------------------------------------------ */

function QRModal({
  reg,
  onClose,
  onGenerateToken,
}: {
  reg: Registration;
  onClose: () => void;
  onGenerateToken: () => Promise<void>;
}) {
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [sharePhone, setSharePhone] = useState(reg.phone);
  const [qrPayload, setQrPayload] = useState<string | null>(null);

  useEffect(() => {
    if (reg.qrToken) {
      fetch(`/api/ticket/qr-payload?token=${reg.qrToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setQrPayload(data.payload);
          }
        });
    }
  }, [reg.qrToken]);

  const ticketUrl = reg.qrToken ? buildTicketUrl(reg.qrToken) : null;

  const waNumber = toWhatsAppNumber(sharePhone);
  const waMessage = ticketUrl
    ? encodeURIComponent(
        `🌟 *Xavier TechByte Society Recruitment '26* 🌟\n\nHello *${reg.fullName}*,\n\nYour registration is confirmed! Below is your unique entry key for the interview stage.\n\n📅 *Status*: Ready for Interview\n🔑 *Your Entry QR Code Link*:\n${ticketUrl}\n\n*Instructions*:\n1. Open the link above to view your ticket and QR code.\n2. Show the QR code to the venue checker on arrival.\n\nSee you there! All the best! 🚀`
      )
    : "";
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  async function handleGenerate() {
    setGenerating(true);
    await onGenerateToken();
    setGenerating(false);
  }

  async function handleDownload(): Promise<string | null> {
    if (!qrPayload) return null;
    const svgEl = document.getElementById("xts-qr-svg");
    if (!svgEl) return null;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QR-${reg.fullName.replace(/\s+/g, "_")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    return url;
  }

  async function handleShareImage() {
    if (!qrPayload) return;
    setSharing(true);

    try {
      const svgEl = document.getElementById("xts-qr-svg");
      if (!svgEl) {
        setSharing(false);
        return;
      }

      // Convert SVG to canvas
      const svgString = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 300, 300);
          ctx.drawImage(img, 10, 10, 280, 280);

          canvas.toBlob(async (blob) => {
            if (!blob) {
              setSharing(false);
              return;
            }
            const file = new File([blob], `QR_${reg.fullName.replace(/\s+/g, "_")}.png`, { type: "image/png" });

            // Check if Web Share API works with files (e.g., mobile)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  files: [file],
                  title: `${reg.fullName} QR Code`,
                  text: `🌟 *Xavier TechByte Society Recruitment '26* 🌟\n\nHello *${reg.fullName}*,\n\nYour registration is confirmed! Below is your entry link:\n${ticketUrl}`,
                });
              } catch (shareErr) {
                console.error("Web Share failed, falling back to URL chat link:", shareErr);
                window.open(waLink, "_blank");
              }
            } else {
              // Desktop fallback: Download image and open WhatsApp chat deep-link
              handleDownload();
              alert("Direct QR Image sharing is only supported on mobile devices. The QR Code image has been downloaded. Redirecting to WhatsApp Web...");
              window.open(waLink, "_blank");
            }
            setSharing(false);
          }, "image/png");
        } else {
          setSharing(false);
        }
      };
      img.src = blobURL;
    } catch (err) {
      console.error("Sharing failed:", err);
      window.open(waLink, "_blank");
      setSharing(false);
    }
  }

  async function handleCopy() {
    if (!ticketUrl) return;
    await navigator.clipboard.writeText(ticketUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Modal title="Participant QR Code" onClose={onClose} maxWidth={440}>
      {/* Participant header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg,rgba(99,130,255,0.2),rgba(167,139,250,0.2))", border: "1px solid rgba(99,130,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 800, color: "#a78bfa", flexShrink: 0 }}>
          {initials(reg.fullName)}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, color: "white", fontSize: "0.95rem" }}>{reg.fullName}</p>
          <p style={{ margin: "2px 0 6px", fontSize: "0.72rem", color: "#64748b" }}>{reg.course} · {reg.semester}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <StatusBadge status={reg.status} />
            {reg.interviewDone ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa" }}>
                <CheckCircle2 size={10} /> Interview Completed
              </span>
            ) : reg.verified ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
                <ShieldCheck size={10} /> Checked In
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {!reg.qrToken ? (
        /* No token yet — prompt to generate */
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={{ width: 70, height: 70, borderRadius: 20, background: "rgba(99,130,255,0.08)", border: "1px solid rgba(99,130,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <QrCode size={30} color="#6382ff" />
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 20, lineHeight: 1.6 }}>
            This participant does not have a QR token yet.<br />Click below to generate one.
          </p>
          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{ padding: "12px 28px", borderRadius: 12, background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: generating ? "not-allowed" : "pointer", opacity: generating ? 0.6 : 1, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit", boxShadow: "0 4px 15px rgba(99,130,255,0.35)" }}
          >
            {generating ? <Loader2 size={14} color="white" style={{ animation: "xts-spin 1s linear infinite" }} /> : <QrCode size={14} />}
            {generating ? "Generating…" : "Generate QR Code"}
          </button>
        </div>
      ) : (
        /* QR code display */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          
          {/* Custom WhatsApp Number Input */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Target WhatsApp Share Number
            </label>
            <input
              type="text"
              value={sharePhone}
              onChange={(e) => setSharePhone(e.target.value)}
              placeholder="e.g. +91 9876543210"
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "#141c2e",
                border: "1px solid rgba(99,130,255,0.15)",
                borderRadius: 10,
                color: "#e2e8f0",
                fontSize: "0.875rem",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* QR Card */}
          <div style={{ background: "white", borderRadius: 20, padding: 18, boxShadow: "0 8px 40px rgba(0,0,0,0.6)", position: "relative" }}>
            <QRCodeSVG
              id="xts-qr-svg"
              value={qrPayload || "INVALID-NO-PAYLOAD"}
              size={200}
              level="H"
              includeMargin={false}
              fgColor="#0f1623"
              bgColor="white"
            />
            {/* Overlay logo */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6382ff,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
              <Shield size={15} color="white" />
            </div>
          </div>

          {/* Verify URL copy box */}
          <div
            style={{ width: "100%", padding: "10px 12px", background: "#141c2e", border: "1px solid rgba(99,130,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onClick={handleCopy}
            title="Click to copy"
          >
            <Link2 size={13} color="#6382ff" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "0.72rem", color: "#64748b", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticketUrl}</span>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: copied ? "#34d399" : "#6382ff", flexShrink: 0, transition: "color 0.2s" }}>
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
            {/* Download */}
            <button
              id={`download-qr-${reg._id}`}
              onClick={handleDownload}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 16px", borderRadius: 12, background: "rgba(99,130,255,0.1)", border: "1px solid rgba(99,130,255,0.25)", color: "#6382ff", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,130,255,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,130,255,0.1)"; }}
            >
              <Download size={14} />
              Download QR
            </button>

            {/* WhatsApp Direct Share */}
            <button
              id={`whatsapp-share-${reg._id}`}
              onClick={handleShareImage}
              disabled={sharing}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 16px", borderRadius: 12, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(37,211,102,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(37,211,102,0.12)"; }}
            >
              {sharing ? (
                <Loader2 size={14} color="#25d366" style={{ animation: "xts-spin 1s linear infinite" }} />
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              )}
              Share QR Image
            </button>
          </div>

          <p style={{ fontSize: "0.68rem", color: "#475569", textAlign: "center", lineHeight: 1.5 }}>
            Direct image sharing works natively on mobile device browsers.<br />Input any number above to send to a different recipient.
          </p>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                 */
/* ------------------------------------------------------------------ */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  background: "#141c2e",
  border: "1px solid rgba(99,130,255,0.15)",
  borderRadius: 10,
  color: "#e2e8f0",
  fontSize: "0.875rem",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: 6,
};

function FField({
  label,
  icon: Icon,
  children,
  required,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>
        <Icon size={12} color="#94a3b8" />
        {label}
        {required && <span style={{ color: "#fb7185" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function RegForm({
  initial,
  onSubmit,
  submitLabel,
  loading,
}: {
  initial: Omit<Registration, "_id" | "createdAt" | "verified" | "interviewDone">;
  onSubmit: (d: Omit<Registration, "_id" | "createdAt" | "verified" | "interviewDone">) => Promise<void>;
  submitLabel: string;
  loading: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); await onSubmit(form); }}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FField label="Full Name" icon={Users} required>
          <input style={inputStyle} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Full name" required />
        </FField>
        <FField label="Email" icon={Mail} required>
          <input style={inputStyle} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" required />
        </FField>
        <FField label="Phone" icon={Phone} required>
          <input style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" required />
        </FField>
        <FField label="Course" icon={GraduationCap} required>
          <input style={inputStyle} value={form.course} onChange={(e) => set("course", e.target.value)} placeholder="e.g. B.Tech CSE" required />
        </FField>
        <FField label="Semester" icon={BookOpen} required>
          <input style={inputStyle} value={form.semester} onChange={(e) => set("semester", e.target.value)} placeholder="e.g. 4th Semester" required />
        </FField>
        <FField label="Interest" icon={Star} required>
          <input style={inputStyle} value={form.interest} onChange={(e) => set("interest", e.target.value)} placeholder="e.g. AI/ML, Web Dev" required />
        </FField>
      </div>

      <FField label="Skills" icon={Wrench} required>
        <input style={inputStyle} value={form.skills} onChange={(e) => set("skills", e.target.value)} placeholder="e.g. Python, React, Node.js" required />
      </FField>

      <FField label="Why Join?" icon={MessageSquare}>
        <textarea style={{ ...inputStyle, resize: "none" }} rows={3} value={form.whyJoin} onChange={(e) => set("whyJoin", e.target.value)} placeholder="Applicant's motivation..." />
      </FField>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FField label="Portfolio / GitHub" icon={Link2}>
          <input style={inputStyle} value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="https://github.com/..." />
        </FField>
        <FField label="Status" icon={Layers}>
          <div style={{ position: "relative" }}>
            <select
              style={{ ...inputStyle, paddingRight: 32, appearance: "none", cursor: "pointer" }}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown size={13} color="#64748b" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        </FField>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "12px 24px",
          background: "linear-gradient(135deg, #6382ff, #a78bfa)",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 700,
          border: "none",
          borderRadius: 12,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
          boxShadow: "0 4px 15px rgba(99,130,255,0.35)",
          marginTop: 4,
          fontFamily: "inherit",
          transition: "opacity 0.15s",
        }}
      >
        {loading ? <><Loader2 size={15} color="white" style={{ animation: "xts-spin 1s linear infinite" }} />Processing…</> : <><Check size={15} /> {submitLabel}</>}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Detail row                                                           */
/* ------------------------------------------------------------------ */

function DRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "11px 12px",
        background: "#141c2e",
        border: "1px solid rgba(99,130,255,0.12)",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: "rgba(99,130,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={13} color="#6382ff" />
      </div>
      <div>
        <p style={{ fontSize: "0.68rem", color: "#475569", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: "0.85rem", color: "#e2e8f0", margin: 0, wordBreak: "break-all" }}>{value}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */

export default function AdminPortal() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [viewItem, setViewItem] = useState<Registration | null>(null);
  const [editItem, setEditItem] = useState<Registration | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [qrItem, setQrItem] = useState<Registration | null>(null);

  /* fetch */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(`/api/registration?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setRegistrations(json.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const t = setTimeout(fetchData, 300);
    return () => clearTimeout(t);
  }, [fetchData]);

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleAdd = async (data: Omit<Registration, "_id" | "createdAt" | "verified" | "interviewDone">) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/registration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast("Registration added successfully!");
      setAddOpen(false);
      fetchData();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to add.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (data: Omit<Registration, "_id" | "createdAt" | "verified" | "interviewDone">) => {
    if (!editItem) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/registration/${editItem._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast("Registration updated!");
      setEditItem(null);
      fetchData();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to update.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/registration/${deleteId}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast("Registration deleted.");
      setDeleteId(null);
      fetchData();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to delete.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id: string, status: Registration["status"]) => {
    try {
      await fetch(`/api/registration/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      toast(`Status → ${status}`);
      fetchData();
    } catch {
      toast("Failed to update status.");
    }
  };

  /** Handles Manual Override of Check-in and Interview statuses */
  const handleInterviewStatusChange = async (id: string, value: string) => {
    let verified = false;
    let interviewDone = false;

    if (value === "CheckedIn") {
      verified = true;
    } else if (value === "Done") {
      verified = true;
      interviewDone = true;
    }

    try {
      const res = await fetch(`/api/registration/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified, interviewDone }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast("Interview Status Updated!");
      fetchData();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  /** Generate a qrToken for old records that don't have one */
  const handleGenerateToken = async () => {
    if (!qrItem) return;
    try {
      const res = await fetch(`/api/registration/${qrItem._id}`, { method: "PATCH" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      // Update local state so modal shows QR immediately
      setQrItem(json.data as Registration);
      setRegistrations((prev) =>
        prev.map((r) => (r._id === json.data._id ? json.data : r))
      );
      toast("QR token generated!");
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : "Failed to generate token.");
    }
  };

  const stats = {
    total: registrations.length,
    verified: registrations.filter((r) => r.verified).length,
    interviewDone: registrations.filter((r) => r.interviewDone).length,
    pending: registrations.filter((r) => r.status === "Pending").length,
    selected: registrations.filter((r) => r.status === "Selected").length,
    rejected: registrations.filter((r) => r.status === "Rejected").length,
  };

  const globalStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    @keyframes xts-fadein { from { opacity: 0; } to { opacity: 1; } }
    @keyframes xts-slideup { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes xts-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes xts-toast { 0%{opacity:0;transform:translateY(10px)} 10%{opacity:1;transform:translateY(0)} 85%{opacity:1} 100%{opacity:0} }
    .xts-tr:hover { background: rgba(99,130,255,0.04) !important; }
    .xts-action:hover { opacity: 0.8; }
    .xts-filter:hover { border-color: #6382ff !important; color: #6382ff !important; }
    input:focus, textarea:focus, select:focus { border-color: #6382ff !important; box-shadow: 0 0 0 3px rgba(99,130,255,0.12) !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0f1623; }
    ::-webkit-scrollbar-thumb { background: #1e2a42; border-radius: 3px; }
  `;

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ minHeight: "100vh", background: "#080c14", color: "#e2e8f0", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", paddingBottom: 60 }}>

        {/* HEADER */}
        <header style={{ background: "linear-gradient(135deg,#0f1623,#141c2e)", borderBottom: "1px solid rgba(99,130,255,0.12)", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, position: "sticky", top: 0, zIndex: 40, backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#6382ff,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,130,255,0.4)" }}>
              <Shield size={20} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "white", letterSpacing: "-0.3px" }}>XTS Admin Portal</p>
              <p style={{ margin: 0, fontSize: "0.7rem", color: "#64748b" }}>Xavier TechByte Society — Recruitment Manager</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Verify page link */}
            <a
              href="/verify"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "rgba(99,130,255,0.08)", border: "1px solid rgba(99,130,255,0.2)", color: "#6382ff", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", textDecoration: "none" }}
            >
              <QrCode size={13} /> Open Scanner
            </a>
            <button
              onClick={fetchData}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "#0f1623", border: "1px solid rgba(99,130,255,0.15)", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
            >
              <RefreshCw size={13} /> Refresh
            </button>
          </div>
        </header>

        <main style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 20px" }}>

          {/* ANALYTICS BOARD */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 28 }}>
            
            {/* Card 1: Check-in & Interview Funnel */}
            <div style={{ background: "linear-gradient(135deg, #0f1623, #151e30)", border: "1px solid rgba(99,130,255,0.15)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "white", display: "flex", alignItems: "center", gap: 8 }}>
                  <QrCode size={18} color="#6382ff" /> Interview Flow Funnel
                </h3>
                <span style={{ fontSize: "0.72rem", background: "rgba(99,130,255,0.15)", color: "#6382ff", padding: "3px 10px", borderRadius: 999, fontWeight: 700 }}>Venue Stats</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Total Registered */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", marginBottom: 4 }}>
                    <span>Total Registered Candidates</span>
                    <span style={{ fontWeight: 700, color: "white" }}>{stats.total}</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #6382ff, #a78bfa)", borderRadius: 3 }} />
                  </div>
                </div>

                {/* Checked In */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", marginBottom: 4 }}>
                    <span>Venue Check-In (Verified)</span>
                    <span style={{ fontWeight: 700, color: "#34d399" }}>{stats.verified} <span style={{ fontSize: "0.7rem", color: "#475569" }}>({stats.total ? Math.round((stats.verified / stats.total) * 100) : 0}%)</span></span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${stats.total ? (stats.verified / stats.total) * 100 : 0}%`, height: "100%", background: "#34d399", borderRadius: 3, transition: "width 0.5s ease" }} />
                  </div>
                </div>

                {/* Interviews Done */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", marginBottom: 4 }}>
                    <span>Interviews Completed (Done)</span>
                    <span style={{ fontWeight: 700, color: "#a78bfa" }}>{stats.interviewDone} <span style={{ fontSize: "0.7rem", color: "#475569" }}>({stats.verified ? Math.round((stats.interviewDone / stats.verified) * 100) : 0}% of checked-in)</span></span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${stats.verified ? (stats.interviewDone / stats.verified) * 100 : 0}%`, height: "100%", background: "#a78bfa", borderRadius: 3, transition: "width 0.5s ease" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Candidate Status Board */}
            <div style={{ background: "linear-gradient(135deg, #0f1623, #151e30)", border: "1px solid rgba(99,130,255,0.15)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "white", display: "flex", alignItems: "center", gap: 8 }}>
                  <ShieldCheck size={18} color="#a78bfa" /> Decision Analytics Board
                </h3>
                <span style={{ fontSize: "0.72rem", background: "rgba(167,139,250,0.15)", color: "#a78bfa", padding: "3px 10px", borderRadius: 999, fontWeight: 700 }}>Results</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, flex: 1 }}>
                {/* Selected */}
                <div style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 14, padding: "14px 10px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#34d399" }}>{stats.selected}</p>
                  <p style={{ margin: "4px 0 0", fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Selected</p>
                </div>
                {/* Pending */}
                <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 14, padding: "14px 10px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#fbbf24" }}>{stats.pending}</p>
                  <p style={{ margin: "4px 0 0", fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Pending</p>
                </div>
                {/* Rejected */}
                <div style={{ background: "rgba(251,113,133,0.05)", border: "1px solid rgba(251,113,133,0.15)", borderRadius: 14, padding: "14px 10px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#fb7185" }}>{stats.rejected}</p>
                  <p style={{ margin: "4px 0 0", fontSize: "0.68rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Rejected</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* TOOLBAR */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Search size={14} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                id="admin-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, course…"
                style={{ width: "100%", padding: "10px 12px 10px 36px", background: "#0f1623", border: "1px solid rgba(99,130,255,0.12)", borderRadius: 10, color: "#e2e8f0", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>

            {/* Status Filters */}
            <div style={{ display: "flex", gap: 6 }}>
              {(["All", "Pending", "Selected", "Rejected"] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  id={`filter-${s.toLowerCase()}`}
                  className="xts-filter"
                  onClick={() => setStatusFilter(s)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    border: `1px solid ${statusFilter === s ? "#6382ff" : "rgba(99,130,255,0.12)"}`,
                    background: statusFilter === s ? "rgba(99,130,255,0.12)" : "#0f1623",
                    color: statusFilter === s ? "#6382ff" : "#64748b",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Add Button */}
            <button
              id="add-registration-btn"
              onClick={() => setAddOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 10, background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontSize: "0.85rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 15px rgba(99,130,255,0.35)", whiteSpace: "nowrap", transition: "opacity 0.15s" }}
            >
              <Plus size={15} /> Add New
            </button>
          </div>

          {/* TABLE */}
          <div style={{ background: "#0f1623", border: "1px solid rgba(99,130,255,0.12)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                <thead>
                  <tr style={{ background: "#141c2e", borderBottom: "1px solid rgba(99,130,255,0.12)" }}>
                    {["Applicant", "Phone", "Course", "Semester", "Interest / Skills", "Selection Status", "Manual Verify / Status", "Applied", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!loading && !error && registrations.map((reg) => (
                    <tr
                      key={reg._id}
                      className="xts-tr"
                      style={{ borderBottom: "1px solid rgba(99,130,255,0.07)", transition: "background 0.15s" }}
                    >
                      {/* Applicant */}
                      <td style={{ padding: "13px 16px", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,rgba(99,130,255,0.15),rgba(167,139,250,0.15))", border: "1px solid rgba(99,130,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800, color: "#a78bfa", flexShrink: 0 }}>
                            {initials(reg.fullName)}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, color: "white", fontSize: "0.85rem" }}>{reg.fullName}</p>
                            <p style={{ margin: 0, fontSize: "0.72rem", color: "#64748b" }}>{reg.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Phone */}
                      <td style={{ padding: "13px 16px", fontSize: "0.8rem", color: "#94a3b8", verticalAlign: "middle", whiteSpace: "nowrap" }}>{reg.phone}</td>
                      {/* Course */}
                      <td style={{ padding: "13px 16px", fontSize: "0.83rem", fontWeight: 600, color: "#e2e8f0", verticalAlign: "middle" }}>{reg.course}</td>
                      {/* Semester */}
                      <td style={{ padding: "13px 16px", fontSize: "0.78rem", color: "#94a3b8", verticalAlign: "middle" }}>{reg.semester}</td>
                      {/* Interest */}
                      <td style={{ padding: "13px 16px", verticalAlign: "middle" }}>
                        <span style={{ display: "inline-block", padding: "2px 8px", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 6, fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>
                          {reg.interest}
                        </span>
                      </td>
                      {/* Selection Status */}
                      <td style={{ padding: "13px 16px", verticalAlign: "middle" }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <StatusBadge status={reg.status} />
                          <select
                            aria-label="Change status"
                            value={reg.status}
                            onChange={(e) => handleStatusChange(reg._id, e.target.value as Registration["status"])}
                            style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", cursor: "pointer" }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </td>
                      {/* Manual Verify/Status Dropdown */}
                      <td style={{ padding: "13px 16px", verticalAlign: "middle" }}>
                        <div style={{ position: "relative" }}>
                          <select
                            value={reg.interviewDone ? "Done" : reg.verified ? "CheckedIn" : "Absent"}
                            onChange={(e) => handleInterviewStatusChange(reg._id, e.target.value)}
                            style={{
                              padding: "6px 24px 6px 10px",
                              background: reg.interviewDone ? "rgba(167,139,250,0.1)" : reg.verified ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
                              border: `1px solid ${reg.interviewDone ? "rgba(167,139,250,0.3)" : reg.verified ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                              borderRadius: 8,
                              color: reg.interviewDone ? "#a78bfa" : reg.verified ? "#34d399" : "#64748b",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              outline: "none",
                              cursor: "pointer",
                              appearance: "none",
                              fontFamily: "inherit",
                            }}
                          >
                            <option value="Absent" style={{ background: "#0f1623", color: "#64748b" }}>Absent</option>
                            <option value="CheckedIn" style={{ background: "#0f1623", color: "#34d399" }}>Checked In</option>
                            <option value="Done" style={{ background: "#0f1623", color: "#a78bfa" }}>Interview Done</option>
                          </select>
                          <ChevronDown size={11} color={reg.interviewDone ? "#a78bfa" : reg.verified ? "#34d399" : "#64748b"} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                        </div>
                      </td>
                      {/* Date */}
                      <td style={{ padding: "13px 16px", fontSize: "0.75rem", color: "#64748b", verticalAlign: "middle", whiteSpace: "nowrap" }}>{formatDate(reg.createdAt)}</td>
                      {/* Actions */}
                      <td style={{ padding: "13px 16px", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {[
                            { id: `view-${reg._id}`, icon: Eye, color: "#6382ff", bg: "rgba(99,130,255,0.1)", fn: () => setViewItem(reg), title: "View" },
                            { id: `edit-${reg._id}`, icon: Pencil, color: "#a78bfa", bg: "rgba(167,139,250,0.1)", fn: () => setEditItem(reg), title: "Edit" },
                            { id: `mail-${reg._id}`, icon: Share2, color: "#38bdf8", bg: "rgba(56,189,248,0.1)", fn: async () => {
                              let token = reg.qrToken;
                              if (!token) {
                                try {
                                  const res = await fetch(`/api/registration/${reg._id}`, { method: "PATCH" });
                                  const json = await res.json();
                                  if (!json.success) throw new Error(json.message);
                                  token = json.data.qrToken;
                                  setRegistrations((prev) =>
                                    prev.map((r) => (r._id === json.data._id ? json.data : r))
                                  );
                                  toast("Ticket generated!");
                                } catch (err: any) {
                                  toast(err.message || "Failed to generate token.");
                                  return;
                                }
                              }
                              
                              const base = window.location.origin;
                              const ticketUrl = `${base}/ticket?token=${token}`;
                              const waNumber = toWhatsAppNumber(reg.phone);
                              const waMessage = encodeURIComponent(
                                `🌟 *Xavier TechByte Society Recruitment '26* 🌟\n\nHello *${reg.fullName}*,\n\nYour registration is confirmed! Below is your unique entry key for the interview stage.\n\n📅 *Status*: Ready for Interview\n🔑 *Your Entry QR Code Link*:\n${ticketUrl}\n\n*Instructions*:\n1. Open the link above to view your ticket and QR code.\n2. Show the QR code to the venue checker on arrival.\n\nSee you there! All the best! 🚀`
                              );
                              window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");
                            }, title: "Send Ticket via WhatsApp" },
                            { id: `qr-${reg._id}`, icon: QrCode, color: "#25d366", bg: "rgba(37,211,102,0.1)", fn: () => setQrItem(reg), title: "QR / WhatsApp" },
                            { id: `delete-${reg._id}`, icon: Trash2, color: "#fb7185", bg: "rgba(251,113,133,0.1)", fn: () => setDeleteId(reg._id), title: "Delete" },
                          ].map(({ id, icon: Ic, color, bg, fn, title }) => (
                            <button
                              key={id}
                              id={id}
                              title={title}
                              onClick={fn}
                              className="xts-action"
                              style={{ width: 32, height: 32, borderRadius: 8, background: bg, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity 0.15s" }}
                            >
                              <Ic size={13} color={color} />
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* States */}
              {loading && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", gap: 12, color: "#64748b" }}>
                  <Loader2 size={32} color="#6382ff" style={{ animation: "xts-spin 1s linear infinite" }} />
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>Loading registrations…</p>
                </div>
              )}
              {!loading && error && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", gap: 12, color: "#fb7185" }}>
                  <AlertTriangle size={32} />
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>{error}</p>
                </div>
              )}
              {!loading && !error && registrations.length === 0 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", gap: 12, color: "#64748b" }}>
                  <Users size={40} style={{ opacity: 0.25 }} />
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>No registrations found.</p>
                </div>
              )}
            </div>

            {/* Footer count */}
            <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(99,130,255,0.08)", fontSize: "0.75rem", color: "#475569" }}>
              Showing <strong style={{ color: "#94a3b8" }}>{registrations.length}</strong> registration{registrations.length !== 1 ? "s" : ""}
            </div>
          </div>
        </main>
      </div>

      {/* ── VIEW MODAL ── */}
      {viewItem && (
        <Modal title="Applicant Details" onClose={() => setViewItem(null)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,rgba(99,130,255,0.2),rgba(167,139,250,0.2))", border: "1px solid rgba(99,130,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 800, color: "#a78bfa", flexShrink: 0 }}>
              {initials(viewItem.fullName)}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: "white", fontSize: "1rem" }}>{viewItem.fullName}</p>
              <p style={{ margin: "2px 0 6px", fontSize: "0.75rem", color: "#64748b" }}>Applied {formatDate(viewItem.createdAt)}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <StatusBadge status={viewItem.status} />
                {viewItem.interviewDone ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa" }}>
                    <CheckCircle2 size={10} /> Interview Completed
                  </span>
                ) : viewItem.verified ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
                    <ShieldCheck size={10} /> Checked In
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <DRow icon={Mail} label="Email" value={viewItem.email} />
            <DRow icon={Phone} label="Phone" value={viewItem.phone} />
            <DRow icon={GraduationCap} label="Course" value={viewItem.course} />
            <DRow icon={BookOpen} label="Semester" value={viewItem.semester} />
            <DRow icon={Star} label="Interest" value={viewItem.interest} />
            <DRow icon={Wrench} label="Skills" value={viewItem.skills} />
          </div>
          {viewItem.whyJoin && <div style={{ marginTop: 10 }}><DRow icon={MessageSquare} label="Why Join?" value={viewItem.whyJoin} /></div>}
          {viewItem.portfolio && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", gap: 10, padding: "11px 12px", background: "#141c2e", border: "1px solid rgba(99,130,255,0.12)", borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(99,130,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Link2 size={13} color="#6382ff" />
                </div>
                <div>
                  <p style={{ fontSize: "0.68rem", color: "#475569", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Portfolio / GitHub</p>
                  <a href={viewItem.portfolio} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#6382ff", textDecoration: "underline", wordBreak: "break-all" }}>{viewItem.portfolio}</a>
                </div>
              </div>
            </div>
          )}

          {/* Quick Manual Verification Status Changer in Modal */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 12, alignItems: "center" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
              Quick Status:
            </span>
            <div style={{ display: "flex", gap: 6, flex: 1, justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  handleInterviewStatusChange(viewItem._id, viewItem.verified ? "Absent" : "CheckedIn");
                  setViewItem(prev => prev ? { ...prev, verified: !prev.verified, interviewDone: false } : null);
                }}
                style={{ padding: "6px 12px", borderRadius: 8, background: viewItem.verified ? "rgba(251,113,133,0.1)" : "rgba(52,211,153,0.1)", border: `1px solid ${viewItem.verified ? "rgba(251,113,133,0.3)" : "rgba(52,211,153,0.3)"}`, color: viewItem.verified ? "#fb7185" : "#34d399", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
              >
                {viewItem.verified ? "Cancel Check-in" : "Verify Check-in"}
              </button>
              {viewItem.verified && (
                <button
                  onClick={() => {
                    handleInterviewStatusChange(viewItem._id, viewItem.interviewDone ? "CheckedIn" : "Done");
                    setViewItem(prev => prev ? { ...prev, interviewDone: !prev.interviewDone } : null);
                  }}
                  style={{ padding: "6px 12px", borderRadius: 8, background: viewItem.interviewDone ? "rgba(255,255,255,0.05)" : "rgba(167,139,250,0.1)", border: `1px solid ${viewItem.interviewDone ? "rgba(255,255,255,0.1)" : "rgba(167,139,250,0.3)"}`, color: viewItem.interviewDone ? "#cbd5e1" : "#a78bfa", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
                >
                  {viewItem.interviewDone ? "Mark Interview Pending" : "Mark Interview Done"}
                </button>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => { setViewItem(null); setEditItem(viewItem); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontWeight: 700, fontSize: "0.875rem", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
              <Pencil size={14} /> Edit Record
            </button>
            <button
              onClick={() => { setViewItem(null); setQrItem(viewItem); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 18px", background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366", fontWeight: 700, fontSize: "0.875rem", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}
            >
              <Share2 size={14} /> QR / Share
            </button>
            <button onClick={() => setViewItem(null)} style={{ padding: "11px 20px", borderRadius: 10, background: "#141c2e", border: "1px solid rgba(99,130,255,0.15)", color: "#94a3b8", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit" }}>
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* ── QR MODAL ── */}
      {qrItem && (
        <QRModal
          reg={qrItem}
          onClose={() => setQrItem(null)}
          onGenerateToken={handleGenerateToken}
        />
      )}

      {/* ── ADD MODAL ── */}
      {addOpen && (
        <Modal title="Add New Registration" onClose={() => setAddOpen(false)}>
          <RegForm initial={{ ...EMPTY_FORM }} onSubmit={handleAdd} submitLabel="Create Registration" loading={submitting} />
        </Modal>
      )}

      {/* ── EDIT MODAL ── */}
      {editItem && (
        <Modal title="Edit Registration" onClose={() => setEditItem(null)}>
          <RegForm
            initial={{ fullName: editItem.fullName, email: editItem.email, phone: editItem.phone, course: editItem.course, semester: editItem.semester, interest: editItem.interest, skills: editItem.skills, whyJoin: editItem.whyJoin ?? "", portfolio: editItem.portfolio ?? "", status: editItem.status, qrToken: editItem.qrToken }}
            onSubmit={handleEdit}
            submitLabel="Save Changes"
            loading={submitting}
          />
        </Modal>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteId && (
        <Modal title="Confirm Deletion" onClose={() => setDeleteId(null)}>
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <AlertTriangle size={28} color="#fb7185" />
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem", fontWeight: 700, color: "white" }}>Delete Registration?</h3>
            <p style={{ margin: "0 0 24px", fontSize: "0.875rem", color: "#64748b" }}>
              This action is permanent and cannot be undone. The applicant&apos;s data will be permanently removed.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: "10px 24px", borderRadius: 10, background: "#141c2e", border: "1px solid rgba(99,130,255,0.15)", color: "#94a3b8", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
              <button
                disabled={submitting}
                onClick={handleDelete}
                style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(251,113,133,0.12)", border: "1px solid rgba(251,113,133,0.3)", color: "#fb7185", fontWeight: 700, fontSize: "0.875rem", cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? <Loader2 size={14} color="#fb7185" style={{ animation: "xts-spin 1s linear infinite" }} /> : <Trash2 size={14} />}
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── TOAST ── */}
      {toastMsg && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#141c2e", border: "1px solid rgba(99,130,255,0.25)", color: "white", padding: "12px 18px", borderRadius: 12, fontSize: "0.875rem", fontWeight: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", gap: 8, animation: "xts-toast 3.2s ease forwards" }}>
          <Check size={14} color="#34d399" />
          {toastMsg}
        </div>
      )}
    </>
  );
}
