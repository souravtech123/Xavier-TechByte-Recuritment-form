"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Download, ShieldCheck, Clock, AlertCircle, Lock } from "lucide-react";

interface TicketData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  semester: string;
  interest: string;
  skills: string;
  status: string;
  qrToken: string;
}

function TicketInner() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TicketData | null>(null);
  // Encrypted QR payload — only the XTS /verify scanner can decode this
  const [qrPayload, setQrPayload] = useState<string | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    const token = searchParams.get("token");
    if (!token) {
      setError("Ticket token is missing in the URL.");
      setLoading(false);
      return;
    }

    async function fetchTicket() {
      try {
        // 1. Fetch participant info
        const res = await fetch(`/api/verify?token=${token}`);
        const json = await res.json();
        if (!json.success) {
          setError(json.message || "Invalid ticket token.");
          setLoading(false);
          return;
        }
        setData(json.data);

        // 2. Fetch the encrypted QR payload from the server
        //    This payload is what gets baked into the QR code.
        //    Any other QR scanner will see random encrypted text — only
        //    the XTS /verify page can decrypt and use it.
        const payloadRes = await fetch(`/api/ticket/qr-payload?token=${token}`);
        const payloadJson = await payloadRes.json();
        if (payloadJson.success) {
          setQrPayload(payloadJson.payload);
        }
      } catch {
        setError("Failed to load ticket information.");
      } finally {
        setLoading(false);
      }
    }

    fetchTicket();
  }, [searchParams]);

  const downloadPDF = async () => {
    if (!data) return;
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const element = ticketRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#020617",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 297; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`XTS_Ticket_${data.fullName.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF ticket:", err);
      alert("Could not generate PDF. Please take a screenshot of this page instead.");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#020617" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(99,130,255,0.3)", borderTopColor: "#6382ff", borderRadius: "50%", animation: "xts-spin 1s linear infinite" }} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#020617", color: "#e2e8f0", padding: 20 }}>
        <AlertCircle size={48} color="#fb7185" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "white", marginBottom: 8 }}>Ticket Error</h2>
        <p style={{ color: "#94a3b8", textAlign: "center", maxWidth: 360, lineHeight: 1.5 }}>{error || "Ticket not found."}</p>
      </div>
    );
  }

  // qrPayload is the encrypted blob. We wrap it in a URL so generic scanners
  // are redirected to a helpful "Invalid Scanner" page instead of showing raw text.
  const qrValue = qrPayload ? `${origin}/invalid-qr?data=${qrPayload}` : `INVALID-NO-PAYLOAD`;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
      <style>{`
        @keyframes xts-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* Action Button */}
      <button
        onClick={downloadPDF}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 24px",
          background: "linear-gradient(135deg, #6382ff, #a78bfa)",
          color: "white",
          border: "none",
          borderRadius: 12,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(99,130,255,0.35)",
          marginBottom: 32,
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Download size={16} />
        Download Ticket PDF
      </button>

      {/* Ticket Container */}
      <div
        ref={ticketRef}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "radial-gradient(circle at top right, #0f172a, #020617)",
          border: "1px solid rgba(99, 130, 255, 0.2)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          padding: "32px 24px",
          color: "#e2e8f0",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: 800, color: "#a78bfa", letterSpacing: "3px", textTransform: "uppercase" }}>Xavier TechByte Society</p>
          <h2 style={{ margin: "6px 0 0", fontSize: "1.75rem", fontWeight: 900, color: "white" }}>INTERVIEW ENTRY TICKET</h2>
        </div>

        {/* QR Code — encrypted payload, only XTS scanner can read it */}
        <div style={{ background: "white", padding: 16, borderRadius: 16, marginBottom: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.3)", position: "relative" }}>
          <QRCodeSVG value={qrValue} size={180} level="H" bgColor="white" fgColor="#020617" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 20, fontSize: "0.65rem", color: "#a78bfa", fontWeight: 600 }}>
          <Lock size={10} color="#a78bfa" />
          Scan only with the official XTS scanner
        </div>

        {/* Candidate Details */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px dashed rgba(99, 130, 255, 0.2)", paddingTop: 24 }}>
          
          <div>
            <span style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Candidate Name</span>
            <p style={{ margin: "2px 0 0", fontSize: "1.1rem", fontWeight: 800, color: "white" }}>{data.fullName}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <span style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Course</span>
              <p style={{ margin: "2px 0 0", fontSize: "0.85rem", fontWeight: 700, color: "#cbd5e1" }}>{data.course}</p>
            </div>
            <div>
              <span style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Semester</span>
              <p style={{ margin: "2px 0 0", fontSize: "0.85rem", fontWeight: 700, color: "#cbd5e1" }}>{data.semester}</p>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Interest Stream</span>
            <p style={{ margin: "2px 0 0", fontSize: "0.85rem", fontWeight: 700, color: "#a78bfa" }}>{data.interest}</p>
          </div>

          <div style={{ borderTop: "1px dashed rgba(99, 130, 255, 0.2)", padding: "16px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#94a3b8" }}>
              <Clock size={12} color="#a78bfa" />
              <span>Reporting: <b>10:00 AM onwards</b></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "#94a3b8" }}>
              <ShieldCheck size={12} color="#34d399" />
              <span>Status: <b style={{ color: "#34d399" }}>Ready to Scan</b></span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ marginTop: 24, textAlign: "center", fontSize: "0.68rem", color: "#475569" }}>
          Please keep this PDF ticket handy on your phone when arriving at the venue.
        </div>
      </div>
    </div>
  );
}

export default function TicketPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#020617" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(99,130,255,0.3)", borderTopColor: "#6382ff", borderRadius: "50%", animation: "xts-spin 1s linear infinite" }} />
      </div>
    }>
      <TicketInner />
    </Suspense>
  );
}
