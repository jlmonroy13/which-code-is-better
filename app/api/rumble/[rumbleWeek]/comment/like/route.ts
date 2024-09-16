import { NextRequest, NextResponse } from "next/server";

import { AppError } from "@/libs/errors/AppError";
import prisma from "@/libs/prisma";

export async function POST(request: NextRequest) {
  try {
    const { commentId, userId } = await request.json();

    if (!commentId || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      },
    });
    if (existingLike) {
      // Unlike
      await prisma.commentLike.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like
      await prisma.commentLike.create({
        data: { userId, commentId },
      });
    }

    const updatedComment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        likes: {
          select: { userId: true },
        },
        _count: { select: { likes: true } },
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
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
