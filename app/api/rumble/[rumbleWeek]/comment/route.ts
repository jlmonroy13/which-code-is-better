import { NextRequest, NextResponse } from "next/server";

import { AppError } from "@/libs/errors/AppError";
import prisma from "@/libs/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;
    const { userId, text } = await request.json();

    if (!userId || !text) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const rumble = await prisma.rumble.findUnique({
      where: { rumbleWeek },
    });

    if (!rumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        text,
        userId,
        rumbleId: rumble.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { rumbleWeek: string } },
) {
  try {
    const { rumbleWeek } = params;
    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { message: "Comment ID is required" },
        { status: 400 },
      );
    }

    const rumble = await prisma.rumble.findUnique({
      where: { rumbleWeek },
    });

    if (!rumble) {
      return NextResponse.json(
        { message: "Rumble not found" },
        { status: 404 },
      );
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.rumbleId !== rumble.id) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }

    // Delete related likes first
    await prisma.commentLike.deleteMany({
      where: { commentId: commentId },
    });

    // Now delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
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
