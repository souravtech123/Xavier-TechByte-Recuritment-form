import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Registration from "@/model/register";

// GET /api/registration — fetch all registrations (admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (status && status !== "All") query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
      ];
    }

    const registrations = await Registration.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      course,
      semester,
      interest,
      skills,
      whyJoin,
      portfolio,
    } = body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !course ||
      !semester ||
      !interest ||
      !skills
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const existing = await Registration.findOne({ email });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Application already submitted.",
        },
        {
          status: 409,
        }
      );
    }

    const application = await Registration.create({
      fullName,
      email,
      phone,
      course,
      semester,
      interest,
      skills,
      whyJoin,
      portfolio,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        data: application,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}