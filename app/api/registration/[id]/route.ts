import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Registration from "@/model/register";
import crypto from "crypto";

// PUT /api/registration/[id] — update a single registration
// Also auto-generates a qrToken if the record doesn't have one yet
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Find the record first to check if it needs a qrToken
    const existing = await Registration.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Registration not found." },
        { status: 404 }
      );
    }

    // Auto-assign qrToken if missing
    if (!existing.qrToken) {
      body.qrToken = crypto.randomUUID();
    }

    const updated = await Registration.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/registration/[id] — delete a single registration
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Registration.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Registration not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Deleted successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/registration/[id] — generate a qrToken for existing records without one
export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const existing = await Registration.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Registration not found." },
        { status: 404 }
      );
    }

    if (existing.qrToken) {
      return NextResponse.json({ success: true, data: existing });
    }

    const updated = await Registration.findByIdAndUpdate(
      id,
      { qrToken: crypto.randomUUID(), verified: false },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
