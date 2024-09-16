import { NextRequest, NextResponse } from "next/server";

import { AppError } from "@/libs/errors/AppError";
import { voteForSnippet } from "@/services/voteService";

export async function POST(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;
    const { userId, snippetId } = await request.json();

    if (!userId || !snippetId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await voteForSnippet(rumbleWeek, userId, snippetId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error voting for snippet:", error);
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
