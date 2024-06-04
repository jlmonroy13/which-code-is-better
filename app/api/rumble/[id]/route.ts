import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    await connectMongoDB();
    const updatedRumble = await Rumble.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedRumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Rumble updated", rumble: updatedRumble },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating rumble", error },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectMongoDB();
    const rumble = await Rumble.findById(id);
    if (!rumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(rumble, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching rumble", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectMongoDB();
    const result = await Rumble.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Rumble deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting rumble", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    await connectMongoDB();
    const updatedRumble = await Rumble.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedRumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Rumble updated", rumble: updatedRumble },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating rumble", error },
      { status: 500 }
    );
  }
}
