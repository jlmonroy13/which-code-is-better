import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;
    const data = await request.json();

    const updatedRumble = await prisma.rumble.update({
      where: { rumbleWeek },
      data,
      include: {
        comments: {
          include: {
            user: {
              select: { id: true, name: true, image: true, email: true },
            },
          },
        },
        snippets: {
          include: {
            votes: {
              include: {
                user: {
                  select: { id: true },
                },
              },
            },
          },
        },
        votes: {
          include: {
            user: {
              select: { id: true },
            },
            snippet: true,
          },
        },
      },
    });

    if (!updatedRumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedRumble, { status: 200 });
  } catch (error) {
    console.error("Error updating rumble:", error);
    return NextResponse.json(
      {
        message: "Error updating rumble",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;

    const rumble = await prisma.rumble.findUnique({
      where: { rumbleWeek },
      include: {
        comments: {
          include: {
            user: {
              select: { id: true, name: true, image: true, email: true },
            },
            likes: {
              select: { userId: true },
            },
          },
        },
        snippets: {
          include: {
            votes: {
              include: {
                user: {
                  select: { id: true },
                },
              },
            },
          },
        },
        votes: {
          include: {
            user: {
              select: { id: true },
            },
            snippet: true,
          },
        },
      },
    });

    return NextResponse.json(rumble, { status: 200 });
  } catch (error) {
    console.error("Error fetching rumble:", error);
    return NextResponse.json(
      {
        message: "Error fetching rumble",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;

    // First, find the Rumble by rumbleWeek
    const rumble = await prisma.rumble.findUnique({
      where: { rumbleWeek },
      select: { id: true },
    });

    if (!rumble) {
      // Handle case where rumble is not found
      return;
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { rumbleId: rumble.id } }),
      prisma.vote.deleteMany({ where: { rumbleId: rumble.id } }),
      prisma.snippet.deleteMany({ where: { rumbleId: rumble.id } }),
    ]);

    // Then delete the rumble
    const result = await prisma.rumble.delete({
      where: { rumbleWeek },
    });

    if (!result) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Rumble and related data deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting rumble:", error);
    return NextResponse.json(
      {
        message: "Error deleting rumble",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;
    const data = await request.json();

    const updatedRumble = await prisma.rumble.update({
      where: { rumbleWeek },
      data,
      include: {
        comments: {
          include: {
            user: {
              select: { name: true, image: true, email: true },
            },
          },
        },
      },
    });

    if (!updatedRumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedRumble, { status: 200 });
  } catch (error) {
    console.error(`[PATCH] Error updating rumble:`, error);
    return NextResponse.json(
      {
        message: "Error updating rumble",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
