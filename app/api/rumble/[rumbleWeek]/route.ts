import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { RumbleInterface } from "@/types/rumble";
import { populateUserOnRumbleComments } from "@/utils/api/rumble";
import { isWeekPassed } from "@/utils/date";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } }
) {
  try {
    const { rumbleWeek } = params;
    const data = await request.json();

    await connectMongoDB();
    const updatedRumble = await Rumble.findOneAndUpdate(
      { rumbleWeek },
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

    // Merge populated data with original user ID
    const modifiedRumble: RumbleInterface = updatedRumble.toObject();
    modifiedRumble.comments = populateUserOnRumbleComments(modifiedRumble);

    return NextResponse.json(modifiedRumble, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating rumble", error },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { rumbleWeek: string } }
) {
  try {
    const { rumbleWeek } = params;
    await connectMongoDB();
    const rumble = await Rumble.findOne({ rumbleWeek })
      .populate({
        path: "comments.userId",
        select: "name image",
      })
      .exec();

    if (!rumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }
    // Merge populated data with original user ID
    const modifiedRumble: RumbleInterface = rumble.toObject();
    modifiedRumble.comments = populateUserOnRumbleComments(modifiedRumble);

    return NextResponse.json(modifiedRumble, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Error fetching rumble", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { rumbleWeek: string } }
) {
  try {
    const { rumbleWeek } = params;
    await connectMongoDB();
    const result = await Rumble.findOneAndDelete({ rumbleWeek });
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
  { params }: { params: { rumbleWeek: string } }
) {
  try {
    const { rumbleWeek } = params;
    const data = await request.json();

    await connectMongoDB();
    const updatedRumble = await Rumble.findOneAndUpdate(
      { rumbleWeek },
      data,
      {
        new: true,
      }
    )
      .populate({
        path: "comments.userId",
        select: "name image",
      })
      .exec();

    if (!updatedRumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 }
      );
    }

    // Merge populated data with original user ID
    const modifiedRumble: RumbleInterface = updatedRumble.toObject();
    modifiedRumble.comments = populateUserOnRumbleComments(modifiedRumble);

    return NextResponse.json(modifiedRumble, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating rumble", error },
      { status: 500 }
    );
  }
}
