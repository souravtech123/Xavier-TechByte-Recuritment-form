"use client";

import { AlertCircle } from "lucide-react";

export default function InvalidQrPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "rgba(251,113,133,0.05)", border: "1px solid rgba(251,113,133,0.2)", borderRadius: 24, padding: "40px 24px", maxWidth: 400, textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(251,113,133,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertCircle size={32} color="#fb7185" />
          </div>
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 900, color: "white", marginBottom: 12 }}>Invalid Scanner</h1>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24 }}>
          This QR code is encrypted for security. It cannot be read by normal camera apps or generic QR scanners.
        </p>
        <div style={{ background: "rgba(99,130,255,0.1)", border: "1px solid rgba(99,130,255,0.2)", borderRadius: 12, padding: "16px", color: "#e2e8f0", fontSize: "0.85rem" }}>
          Please present this QR code to the <b>XTS Venue Checker</b> at the event. They will use the official XTS Scanner to verify your ticket.
        </div>
      </div>
    </div>
  );
}
