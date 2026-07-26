"use client";

import { useCallback, useEffect, useState } from "react";
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
  createdAt: string;
}

type StatusFilter = "All" | "Pending" | "Selected" | "Rejected";

const EMPTY_FORM: Omit<Registration, "_id" | "createdAt"> = {
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
};

const STATUS_CONFIG = {
  Pending: {
    label: "Pending",
    color: "text-amber-400",
    bg: "amber",
    dot: "amber",
    icon: Clock,
  },
  Selected: {
    label: "Selected",
    color: "text-emerald-400",
    bg: "emerald",
    dot: "emerald",
    icon: CheckCircle2,
  },
  Rejected: {
    label: "Rejected",
    color: "text-rose-400",
    bg: "rose",
    dot: "rose",
    icon: XCircle,
  },
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
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: c.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Stat Card                                                            */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <div
      style={{
        background: "#0f1623",
        border: "1px solid rgba(99,130,255,0.12)",
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={iconColor} />
      </div>
      <div>
        <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "white", margin: 0, lineHeight: 1 }}>
          {value}
        </p>
        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "4px 0 0" }}>{label}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
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
        background: "rgba(0,0,0,0.7)",
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
          maxWidth: 680,
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
  initial: Omit<Registration, "_id" | "createdAt">;
  onSubmit: (d: Omit<Registration, "_id" | "createdAt">) => Promise<void>;
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
        {loading ? <><Loader2 size={15} color="white" style={{ animation: "xts-spin 1s linear infinite" }} /> Processing…</> : <><Check size={15} /> {submitLabel}</>}
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

  const handleAdd = async (data: Omit<Registration, "_id" | "createdAt">) => {
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

  const handleEdit = async (data: Omit<Registration, "_id" | "createdAt">) => {
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

  const stats = {
    total: registrations.length,
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
          <button
            onClick={fetchData}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "#0f1623", border: "1px solid rgba(99,130,255,0.15)", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </header>

        <main style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 20px" }}>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 28 }}>
            <StatCard label="Total Applicants" value={stats.total} icon={Users} iconColor="#6382ff" iconBg="rgba(99,130,255,0.12)" />
            <StatCard label="Pending Review" value={stats.pending} icon={Clock} iconColor="#fbbf24" iconBg="rgba(251,191,36,0.12)" />
            <StatCard label="Selected" value={stats.selected} icon={CheckCircle2} iconColor="#34d399" iconBg="rgba(52,211,153,0.12)" />
            <StatCard label="Rejected" value={stats.rejected} icon={XCircle} iconColor="#fb7185" iconBg="rgba(251,113,133,0.12)" />
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
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
                <thead>
                  <tr style={{ background: "#141c2e", borderBottom: "1px solid rgba(99,130,255,0.12)" }}>
                    {["Applicant", "Phone", "Course", "Semester", "Interest / Skills", "Status", "Applied", "Actions"].map((h) => (
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
                      {/* Status */}
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
                      {/* Date */}
                      <td style={{ padding: "13px 16px", fontSize: "0.75rem", color: "#64748b", verticalAlign: "middle", whiteSpace: "nowrap" }}>{formatDate(reg.createdAt)}</td>
                      {/* Actions */}
                      <td style={{ padding: "13px 16px", verticalAlign: "middle" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {[
                            { id: `view-${reg._id}`, icon: Eye, color: "#6382ff", bg: "rgba(99,130,255,0.1)", fn: () => setViewItem(reg), title: "View" },
                            { id: `edit-${reg._id}`, icon: Pencil, color: "#a78bfa", bg: "rgba(167,139,250,0.1)", fn: () => setEditItem(reg), title: "Edit" },
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
              <StatusBadge status={viewItem.status} />
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
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => { setViewItem(null); setEditItem(viewItem); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontWeight: 700, fontSize: "0.875rem", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
              <Pencil size={14} /> Edit Record
            </button>
            <button onClick={() => setViewItem(null)} style={{ padding: "11px 20px", borderRadius: 10, background: "#141c2e", border: "1px solid rgba(99,130,255,0.15)", color: "#94a3b8", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit" }}>
              Close
            </button>
          </div>
        </Modal>
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
            initial={{ fullName: editItem.fullName, email: editItem.email, phone: editItem.phone, course: editItem.course, semester: editItem.semester, interest: editItem.interest, skills: editItem.skills, whyJoin: editItem.whyJoin ?? "", portfolio: editItem.portfolio ?? "", status: editItem.status }}
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
