import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Invalid data provided" },
        { status: 400 }
      );
    }

    const rumble = await Rumble.create(data);
    return NextResponse.json(
      { message: "Rumble created", rumble },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating rumble", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const rumbles = await Rumble.find();
    return NextResponse.json({ rumbles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch rumbles", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectMongoDB();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Rumble ID is missing" },
        { status: 400 }
      );
    }

    const deletionResult = await Rumble.findByIdAndDelete(id);
    if (deletionResult) {
      return NextResponse.json({ message: "Rumble deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting rumble", error },
      { status: 500 }
    );
  }
}
