import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await connectMongoDB();
    const rumble = await Rumble.create(data);
    return NextResponse.json({ message: "Rumble created", rumble }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating rumble", error },
      { status: 500 }
    );
  }
}
