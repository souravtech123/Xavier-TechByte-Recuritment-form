import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Registration from "@/model/register";

// GET /api/verify?token=<qrToken> — look up a participant by token
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

    const registration = await Registration.findOne({ qrToken: token });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Invalid QR code. Participant not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: registration._id,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        course: registration.course,
        semester: registration.semester,
        interest: registration.interest,
        skills: registration.skills,
        team: registration.team,
        time: registration.time,
        venue: registration.venue,
        qrToken: registration.qrToken,
        status: registration.status,
        verified: registration.verified,
        interviewDone: registration.interviewDone || false,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/verify — verify check-in OR mark interview done
//
// Accepts two body shapes:
//   { payload: "<encrypted QR blob>", action?: "done" }  ← new encrypted flow
//   { token: "<UUID>",                action?: "done" }  ← legacy / direct URL flow
//
// If payload is provided, it is AES-256-CBC decrypted to get the UUID token.
// If decryption fails (wrong key, tampered data, non-XTS scanner) → "QR Invalid".
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { action, uniqueId, token } = body;

    const expectedUniqueId = process.env.ADMIN_UNIQUE_ID || "souravxts20252026";
    if (uniqueId !== expectedUniqueId) {
      return NextResponse.json(
        { success: false, message: "Invalid Unique ID. Check-in denied." },
        { status: 401 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required." },
        { status: 400 }
      );
    }
    const registration = await Registration.findOne({ qrToken: token });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Invalid QR code. Participant not found." },
        { status: 404 }
      );
    }

    // If marking interview completed
    if (action === "done") {
      const updated = await Registration.findOneAndUpdate(
        { qrToken: token },
        { interviewDone: true, verified: true },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        resolvedToken: token,
        data: {
          _id: updated!._id,
          fullName: updated!.fullName,
          course: updated!.course,
          semester: updated!.semester,
          interest: updated!.interest,
          skills: updated!.skills,
          team: updated!.team,
          time: updated!.time,
          venue: updated!.venue,
          status: updated!.status,
          verified: updated!.verified,
          interviewDone: updated!.interviewDone || false,
        },
      });
    }

    // Default verify (Check-in) behavior
    if (registration.verified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        resolvedToken: token,
        data: {
          _id: registration._id,
          fullName: registration.fullName,
          course: registration.course,
          semester: registration.semester,
          interest: registration.interest,
          skills: registration.skills,
          team: registration.team,
          time: registration.time,
          venue: registration.venue,
          status: registration.status,
          verified: registration.verified,
          interviewDone: registration.interviewDone || false,
        },
      });
    }

    const updated = await Registration.findOneAndUpdate(
      { qrToken: token },
      { verified: true },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      alreadyVerified: false,
      resolvedToken: token,
      data: {
        _id: updated!._id,
        fullName: updated!.fullName,
        course: updated!.course,
        semester: updated!.semester,
        interest: updated!.interest,
        skills: updated!.skills,
        team: updated!.team,
        time: updated!.time,
        venue: updated!.venue,
        status: updated!.status,
        verified: updated!.verified,
        interviewDone: updated!.interviewDone || false,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
