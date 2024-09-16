import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import { getCurrentWeek } from "@/utils/date";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, rumbleWeek, snippets } = body;

    // Validate input
    if (
      !title ||
      !rumbleWeek ||
      !Array.isArray(snippets) ||
      snippets.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid input. Title, rumbleWeek, and non-empty snippets array are required.",
        },
        { status: 400 },
      );
    }

    // Validate each snippet
    for (const snippet of snippets) {
      if (
        typeof snippet.code !== "string" ||
        typeof snippet.language !== "string"
      ) {
        return NextResponse.json(
          {
            message: "Each snippet must have 'code' and 'language' as strings.",
          },
          { status: 400 },
        );
      }
    }

    // Create the Rumble with snippets
    const newRumble = await prisma.rumble.create({
      data: {
        title,
        rumbleWeek,
        snippets: {
          create: snippets.map((snippet) => ({
            code: snippet.code,
            language: snippet.language,
          })),
        },
      },
      include: {
        snippets: true,
      },
    });

    return NextResponse.json(newRumble);
  } catch (error) {
    console.error("Error creating rumble:", error);
    return NextResponse.json(
      {
        message: "Error creating rumble",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const filterType = request.nextUrl.searchParams.get("filter");

    let where = {};
    if (filterType === "presentAndPast") {
      const currentYearWeek = getCurrentWeek();
      where = { rumbleWeek: { lte: currentYearWeek } };
    }

    const rumbles = await prisma.rumble.findMany({
      where,
      orderBy: { rumbleWeek: "desc" },
    });
    return NextResponse.json(rumbles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch rumbles", error },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Rumble ID is missing" },
        { status: 400 },
      );
    }

    const deletionResult = await prisma.rumble.delete({
      where: { id },
    });

    if (deletionResult) {
      return NextResponse.json({ message: "Rumble deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "P2025") {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Error deleting rumble", error },
      { status: 500 },
    );
  }
}
