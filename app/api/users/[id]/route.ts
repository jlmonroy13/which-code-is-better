import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

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
    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "P2025") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
