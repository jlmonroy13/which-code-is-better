import { NextRequest, NextResponse } from "next/server";

import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    await connectMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    await connectMongoDB();
    const data = await request.json();
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
