import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Registration from "@/model/register";
import { encryptToken } from "@/lib/qrCrypto";

/**
 * GET /api/ticket/qr-payload?token=<qrToken>
 *
 * Returns an AES-256-CBC encrypted payload for the given qrToken.
 * This encrypted string is what gets embedded in the QR code on the ticket.
 *
 * Only the XTS /verify scanner page calls /api/verify with this payload
 * and can decrypt it. Any other QR scanner sees meaningless base64url text.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required." },
        { status: 400 }
      );
    }

    // Verify the token actually exists in the DB before encrypting it
    const registration = await Registration.findOne({ qrToken: token });
    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Invalid token. Participant not found." },
        { status: 404 }
      );
    }

    // Encrypt the token — this is what gets baked into the QR code
    const payload = encryptToken(token);

    return NextResponse.json({ success: true, payload });
  } catch (error) {
    console.error("[qr-payload] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
