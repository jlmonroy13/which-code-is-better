import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { getCommentsWithUserData } from "@/utils/api/rumble";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { rumbleDate: string } }
) {
  try {
    const { rumbleDate } = params;
    const data = await request.json();

    await connectMongoDB();
    const updatedRumble = await Rumble.findOneAndUpdate(
      { rumbleDay: rumbleDate },
      data,
      {
        new: true,
      }
    );
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
  { params }: { params: { rumbleDate: string } }
) {
  try {
    const { rumbleDate } = params;
    await connectMongoDB();
    const rumble = await Rumble.findOne({ rumbleDay: rumbleDate });
    if (!rumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    rumble.comments = await getCommentsWithUserData(rumble);
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
  { params }: { params: { rumbleDate: string } }
) {
  try {
    const { rumbleDate } = params;
    await connectMongoDB();
    const result = await Rumble.findOneAndDelete({ rumbleDay: rumbleDate });
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
  { params }: { params: { rumbleDate: string } }
) {
  try {
    const { rumbleDate } = params;
    const data = await request.json();

    await connectMongoDB();
    const updatedRumble = await Rumble.findOneAndUpdate(
      { rumbleDay: rumbleDate },
      data,
      {
        new: true,
      }
    );

    if (!updatedRumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    updatedRumble.comments = await getCommentsWithUserData(updatedRumble);
    return NextResponse.json(
      updatedRumble,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating rumble", error },
      { status: 500 }
    );
  }
}
