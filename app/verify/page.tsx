"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, ShieldCheck, QrCode, ScanLine, AlertCircle, CheckCircle2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ParticipantData {
  _id: string;
  fullName: string;
  course: string;
  semester: string;
  interest: string;
  skills: string;
  status: string;
  verified: boolean;
  interviewDone: boolean;
}

type VerifyState =
  | { mode: "idle" }
  | { mode: "scanning" }
  | { mode: "loading"; text?: string }
  | { mode: "success"; data: ParticipantData; alreadyVerified: boolean }
  | { mode: "error"; message: string }
  | { mode: "auth"; token: string };

/* ------------------------------------------------------------------ */
/* Inner component (uses useSearchParams — must be inside Suspense)   */
/* ------------------------------------------------------------------ */

function VerifyInner() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerifyState>({ mode: "idle" });
  const [uniqueId, setUniqueId] = useState("");
  const [resolvedToken, setResolvedToken] = useState<string>("");
  const scannerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scannerInstanceRef = useRef<any>(null);
  const [scannerReady, setScannerReady] = useState(false);

  /* ---- Auto-verify from URL token (legacy direct-URL flow) ---- */
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setState({ mode: "auth", token });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Load html5-qrcode from CDN ---- */
  useEffect(() => {
    const existingScript = document.getElementById("html5qrcode-script");
    if (existingScript) { setScannerReady(true); return; }

    const script = document.createElement("script");
    script.id = "html5qrcode-script";
    script.src = "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";
    script.async = true;
    script.onload = () => setScannerReady(true);
    document.head.appendChild(script);
  }, []);

  /* ---- Start camera scanner using React lifecycle ---- */
  useEffect(() => {
    let active = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scanner: any = null;

    async function initScanner() {
      if (state.mode !== "scanning") return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Html5Qrcode = (window as any).Html5Qrcode;
      if (!Html5Qrcode) {
        setState({ mode: "error", message: "Scanner library is loading. Please try again." });
        return;
      }

      // Wait a paint cycle so React renders #xts-qr-reader in the DOM
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (!active) return;

      try {
        scanner = new Html5Qrcode("xts-qr-reader");
        scannerInstanceRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText: string) => {
            // Stop scanner immediately
            if (scanner) {
              try {
                await scanner.stop();
                scanner.clear();
              } catch (e) {}
              scannerInstanceRef.current = null;
              scanner = null;
            }

            let extractedToken = decodedText;
            if (decodedText.includes("token=")) {
              extractedToken = decodedText.split("token=")[1].split("&")[0];
            }
            
            setState({ mode: "auth", token: extractedToken });
          },
          () => { /* ignore frame errors */ }
        );
      } catch (err) {
        if (active) {
          setState({
            mode: "error",
            message: "Camera access denied or scanner error. Please allow camera permissions.",
          });
        }
        console.error(err);
      }
    }

    initScanner();

    return () => {
      active = false;
      if (scanner) {
        scanner.stop().then(() => scanner.clear()).catch(() => {});
        scannerInstanceRef.current = null;
      }
    };
  }, [state.mode]);

  /* ---- Verify payload via API ---- */
  async function verifyPayload() {
    if (state.mode !== "auth") return;
    const { token } = state;
    setState({ mode: "loading", text: "Updating Database…" });
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, uniqueId }),
      });
      const json = await res.json();
      if (!json.success) {
        setState({ mode: "error", message: json.message || "Verification failed." });
      } else {
        if (json.resolvedToken) setResolvedToken(json.resolvedToken);
        setState({ mode: "success", data: json.data, alreadyVerified: json.alreadyVerified });
      }
    } catch {
      setState({ mode: "error", message: "Network error. Please try again." });
    }
  }

  /* ---- Complete Interview Flow ---- */
  async function completeInterview() {
    const tokenToUse = resolvedToken;
    if (!tokenToUse) return;
    setState({ mode: "loading", text: "Marking Complete…" });
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToUse, uniqueId, action: "done" }),
      });
      const json = await res.json();
      if (!json.success) {
        setState({ mode: "error", message: json.message || "Failed to complete interview." });
      } else {
        setState({ mode: "success", data: json.data, alreadyVerified: false });
      }
    } catch {
      setState({ mode: "error", message: "Network error. Please try again." });
    }
  }

  function startScanning() {
    setState({ mode: "scanning" });
  }

  function cancelScanning() {
    setState({ mode: "idle" });
  }

  function reset() {
    setState({ mode: "idle" });
    setUniqueId("");
    setResolvedToken("");
  }

  /* ================================================================ */
  /* Render                                                           */
  /* ================================================================ */

  const globalStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #060a12; font-family: 'Inter', system-ui, sans-serif; }
    @keyframes xts-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes xts-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes xts-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes xts-pop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
    @keyframes xts-laser { 0%,100%{transform:translateY(-140px);opacity:0} 10%{opacity:1} 50%{transform:translateY(140px);opacity:1} 90%{opacity:1} }
    #xts-qr-reader { width: 100% !important; border: none !important; background: transparent !important; }
    #xts-qr-reader video { width: 100% !important; border-radius: 20px !important; object-fit: cover !important; }
    #xts-qr-reader img { display: none !important; }
    #xts-qr-reader button { display: none !important; }
    #xts-qr-reader select { display: none !important; }
  `;

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ minHeight: "100svh", background: "linear-gradient(160deg,#060a12 0%,#0d1526 60%,#06080f 100%)", color: "#e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 40px" }}>

        {/* Header */}
        <header style={{ width: "100%", padding: "20px 20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(99,130,255,0.1)", background: "rgba(6,10,18,0.8)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6382ff,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,130,255,0.5)" }}>
              <Lock size={18} color="white" />
            </div>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 900, color: "white", letterSpacing: "-0.3px", textTransform: "uppercase" }}>XTS Secure Scanner</p>
              <p style={{ fontSize: "0.65rem", color: "#a78bfa", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Xavier TechByte Society</p>
            </div>
          </div>
        </header>

        <main style={{ width: "100%", maxWidth: 480, padding: "28px 20px 0", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── IDLE ── */}
          {state.mode === "idle" && (
            <div style={{ animation: "xts-fadein 0.35s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 28, background: "radial-gradient(circle at top right, #0f172a, #020617)", border: "1px solid rgba(99, 130, 255, 0.2)", borderRadius: 24, padding: "32px 20px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
                <div style={{ width: 70, height: 70, borderRadius: 20, background: "linear-gradient(135deg,rgba(99,130,255,0.15),rgba(167,139,250,0.15))", border: "1px solid rgba(99,130,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <QrCode size={32} color="#6382ff" />
                </div>
                <h1 style={{ margin: "6px 0 0", fontSize: "1.5rem", fontWeight: 900, color: "white" }}>SECURE DECRYPT</h1>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, marginTop: 12, padding: "0 10px" }}>
                  Only this official XTS scanner can read the encrypted entry tickets. Point the camera at a participant's QR code.
                </p>
              </div>

              <button
                id="start-scanner-btn"
                onClick={startScanning}
                disabled={!scannerReady}
                style={{ width: "100%", padding: "16px", borderRadius: 14, background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontSize: "1rem", fontWeight: 800, border: "none", cursor: scannerReady ? "pointer" : "not-allowed", opacity: scannerReady ? 1 : 0.6, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 30px rgba(99,130,255,0.4)", transition: "transform 0.15s, box-shadow 0.15s", letterSpacing: "-0.2px" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <ScanLine size={20} />
                {scannerReady ? "Initialize Scanner" : "Loading Systems…"}
              </button>
            </div>
          )}

          {/* ── AUTH ── */}
          {state.mode === "auth" && (
            <div style={{ animation: "xts-fadein 0.35s ease" }}>
              <div style={{ textAlign: "center", marginBottom: 28, background: "radial-gradient(circle at top right, #0f172a, #020617)", border: "1px solid rgba(99, 130, 255, 0.2)", borderRadius: 24, padding: "32px 20px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
                <div style={{ width: 70, height: 70, borderRadius: 20, background: "linear-gradient(135deg,rgba(99,130,255,0.15),rgba(167,139,250,0.15))", border: "1px solid rgba(99,130,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Lock size={32} color="#6382ff" />
                </div>
                <h1 style={{ margin: "6px 0 0", fontSize: "1.5rem", fontWeight: 900, color: "white" }}>CHECK-IN PASSWORD</h1>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, marginTop: 12, padding: "0 10px" }}>
                  Please enter the admin password to authorize this ticket check-in.
                </p>
                <input
                  type="password"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  placeholder="Enter Password"
                  style={{ marginTop: 20, width: "100%", padding: "12px", borderRadius: 10, border: "1px solid rgba(99, 130, 255, 0.3)", background: "#020617", color: "white", outline: "none", textAlign: "center", fontSize: "1rem" }}
                />
              </div>

              <button
                onClick={verifyPayload}
                disabled={!uniqueId}
                style={{ width: "100%", padding: "16px", borderRadius: 14, background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontSize: "1rem", fontWeight: 800, border: "none", cursor: uniqueId ? "pointer" : "not-allowed", opacity: uniqueId ? 1 : 0.6, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 30px rgba(99,130,255,0.4)" }}
              >
                <CheckCircle2 size={20} />
                Authorize & Check-In
              </button>
              
              <button
                onClick={reset}
                style={{ width: "100%", padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", marginTop: 12 }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* ── SCANNING ── */}
          {state.mode === "scanning" && (
            <div style={{ animation: "xts-fadein 0.3s ease", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ShieldCheck size={24} color="#a78bfa" style={{ animation: "xts-pulse 2s infinite" }} />
                  <div>
                    <p style={{ fontSize: "1rem", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.5px" }}>Decrypting Area</p>
                    <p style={{ fontSize: "0.72rem", color: "#a78bfa", fontWeight: 600 }}>Awaiting XTS Encrypted QR</p>
                  </div>
                </div>
                <button
                  onClick={cancelScanning}
                  style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.3)", color: "#fb7185", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                >
                  Cancel
                </button>
              </div>

              {/* High-Tech Viewfinder */}
              <div style={{ position: "relative", width: "100%", borderRadius: 24, overflow: "hidden", background: "#020617", border: "2px solid rgba(99,130,255,0.3)", boxShadow: "0 0 40px rgba(99,130,255,0.15), inset 0 0 20px rgba(99,130,255,0.2)" }}>
                
                <div ref={scannerRef} id="xts-qr-reader" style={{ minHeight: 320 }} />
                
                {/* HUD Overlay Darkener */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, border: "25px solid rgba(2,6,23,0.6)" }} />
                
                {/* HUD Target Brackets */}
                {[
                  { top: 40, left: 40, borderTop: "4px solid", borderLeft: "4px solid", borderRadius: "8px 0 0 0" },
                  { top: 40, right: 40, borderTop: "4px solid", borderRight: "4px solid", borderRadius: "0 8px 0 0" },
                  { bottom: 40, left: 40, borderBottom: "4px solid", borderLeft: "4px solid", borderRadius: "0 0 0 8px" },
                  { bottom: 40, right: 40, borderBottom: "4px solid", borderRight: "4px solid", borderRadius: "0 0 8px 0" },
                ].map((s, i) => (
                  <div key={i} style={{ position: "absolute", width: 40, height: 40, borderColor: "#6382ff", boxShadow: "inset 0 0 10px rgba(99,130,255,0.3)", zIndex: 11, ...s }} />
                ))}

                {/* Laser line */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 12 }}>
                  <div style={{ width: "90%", height: 3, background: "#a78bfa", boxShadow: "0 0 15px 4px rgba(167,139,250,0.8)", animation: "xts-laser 2s ease-in-out infinite", borderRadius: "50%" }} />
                </div>
                
                {/* Text inside the scanner */}
                <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", zIndex: 12 }}>
                  <p style={{ fontSize: "0.7rem", color: "#a78bfa", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>Target Lock Engaged</p>
                </div>
              </div>
            </div>
          )}

          {/* ── LOADING ── */}
          {state.mode === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "80px 0", animation: "xts-fadein 0.3s ease" }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(99,130,255,0.1)", border: "1px solid rgba(99,130,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#6382ff" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "xts-spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                <div style={{ position: "absolute", inset: "-4px", borderRadius: 24, border: "2px solid rgba(167,139,250,0.5)", animation: "xts-pulse 1.5s infinite" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontWeight: 900, color: "white", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px" }}>{state.text || "Processing…"}</p>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: 8 }}>Establishing secure connection</p>
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {state.mode === "success" && (
            <div style={{ animation: "xts-pop 0.4s cubic-bezier(.34,1.56,.64,1)", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Status banner */}
              <div style={{
                borderRadius: 18,
                padding: "20px",
                background: state.data.interviewDone
                  ? "linear-gradient(135deg,rgba(99,130,255,0.1),rgba(167,139,250,0.05))"
                  : state.alreadyVerified
                  ? "linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.03))"
                  : "linear-gradient(135deg,rgba(52,211,153,0.1),rgba(52,211,153,0.03))",
                border: `1px solid ${
                  state.data.interviewDone
                    ? "rgba(167,139,250,0.3)"
                    : state.alreadyVerified
                    ? "rgba(251,191,36,0.3)"
                    : "rgba(52,211,153,0.3)"
                }`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>
                    {state.data.interviewDone ? "🎓" : state.alreadyVerified ? "⚠️" : "✅"}
                  </div>
                  <div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 900, color: "white", letterSpacing: "-0.3px" }}>
                      {state.data.interviewDone
                        ? "Interview Done!"
                        : state.alreadyVerified
                        ? "Already Checked In"
                        : "Verified!"}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: state.data.interviewDone ? "#a78bfa" : state.alreadyVerified ? "#fbbf24" : "#34d399", fontWeight: 600 }}>
                      {state.data.interviewDone
                        ? "Interview status is complete ✓"
                        : "Verified & ready to interview ✓"}
                    </p>
                  </div>
                </div>

                {/* Participant info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <InfoRow icon="👤" label="Candidate Name" value={state.data.fullName} highlight />
                  <InfoRow icon="🎓" label="Course" value={`${state.data.course} — ${state.data.semester}`} />
                  <InfoRow icon="⭐" label="Interest" value={state.data.interest} />
                  <InfoRow icon="🔧" label="Skills" value={state.data.skills} />
                  <div style={{ marginTop: 4, display: "flex", gap: 6 }}>
                    <StatusPill status={state.data.status} />
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700, background: state.data.interviewDone ? "rgba(167,139,250,0.15)" : "rgba(52,211,153,0.15)", border: `1px solid ${state.data.interviewDone ? "rgba(167,139,250,0.3)" : "rgba(52,211,153,0.3)"}`, color: state.data.interviewDone ? "#a78bfa" : "#34d399" }}>
                      {state.data.interviewDone ? "Interview Completed" : "Ready To Interview"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Interview Done active button */}
              {!state.data.interviewDone && (
                <button
                  id="mark-interview-done-btn"
                  onClick={completeInterview}
                  style={{ width: "100%", padding: "16px", borderRadius: 14, background: "linear-gradient(135deg,#a78bfa,#f472b6)", color: "white", fontSize: "1rem", fontWeight: 800, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 20px rgba(167,139,250,0.4)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Mark Interview as Done
                </button>
              )}

              <button
                id="scan-again-btn"
                onClick={reset}
                style={{ width: "100%", padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                Scan Next Participant
              </button>
            </div>
          )}

          {/* ── ERROR ── */}
          {state.mode === "error" && (
            <div style={{ animation: "xts-pop 0.35s ease" }}>
              <div style={{ borderRadius: 18, padding: "24px 20px", background: "rgba(251,113,133,0.06)", border: "1px solid rgba(251,113,133,0.25)", textAlign: "center", marginBottom: 16 }}>
                <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                  <AlertCircle size={48} color="#fb7185" />
                </div>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "white", marginBottom: 6 }}>Scan Failed</p>
                <p style={{ fontSize: "0.85rem", color: "#fb7185", lineHeight: 1.5 }}>{state.message}</p>
              </div>

              <button
                id="retry-scan-btn"
                onClick={reset}
                style={{ width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#6382ff,#a78bfa)", color: "white", fontSize: "0.95rem", fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(99,130,255,0.35)" }}
              >
                Try Again
              </button>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function InfoRow({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 12px", background: "rgba(0,0,0,0.25)", borderRadius: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: "0.95rem", flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <p style={{ fontSize: "0.62rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: highlight ? "1rem" : "0.85rem", fontWeight: highlight ? 800 : 500, color: highlight ? "white" : "#cbd5e1" }}>{value}</p>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; border: string }> = {
    Pending: { bg: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "rgba(251,191,36,0.3)" },
    Selected: { bg: "rgba(52,211,153,0.1)", color: "#34d399", border: "rgba(52,211,153,0.3)" },
    Rejected: { bg: "rgba(251,113,133,0.1)", color: "#fb7185", border: "rgba(251,113,133,0.3)" },
  };
  const c = map[status] || map.Pending;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700, background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page export (wraps in Suspense for useSearchParams)                */
/* ------------------------------------------------------------------ */

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100svh", background: "#060a12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(99,130,255,0.3)", borderTopColor: "#6382ff", borderRadius: "50%", animation: "xts-spin 1s linear infinite" }} />
      </div>
    }>
      <VerifyInner />
    </Suspense>
  );
}
