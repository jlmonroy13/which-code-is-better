import { PrismaClient, Prisma } from "@prisma/client";

import { AppError } from "@/libs/errors/AppError";

const prisma = new PrismaClient();

export async function voteForSnippet(
  rumbleWeek: string,
  userId: string,
  snippetId: string,
) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const rumble = await tx.rumble.findUnique({
      where: { rumbleWeek },
      select: { id: true },
    });

    if (!rumble) {
      throw new AppError(404, "Rumble not found");
    }

    const existingVote = await tx.vote.findFirst({
      where: {
        userId,
        rumbleId: rumble.id,
      },
    });

    let vote;
    if (existingVote) {
      vote = await tx.vote.update({
        where: { id: existingVote.id },
        data: { snippetId },
        include: {
          user: { select: { id: true } },
          snippet: true,
        },
      });
    } else {
      vote = await tx.vote.create({
        data: {
          userId,
          snippetId,
          rumbleId: rumble.id,
        },
        include: {
          user: { select: { id: true } },
          snippet: true,
        },
      });
    }

    await tx.snippet.update({
      where: { id: snippetId },
      data: { votes: { connect: { id: vote.id } } },
    });

    await tx.rumble.update({
      where: { id: rumble.id },
      data: { votes: { connect: { id: vote.id } } },
    });

    await tx.user.update({
      where: { id: userId },
      data: { votes: { connect: { id: vote.id } } },
    });

    return vote;
  });
}
