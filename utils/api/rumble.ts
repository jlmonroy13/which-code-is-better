import prisma from "@/libs/prisma";
import { CommentInterface, RumbleInterface } from "@/types/rumble";
import { UserInterface } from "@/types/user";

export const BASE_API_URL = process.env.NEXT_PUBLIC_URL;

export const RUMBLE_URL = (rumbleWeek: string) => `/api/rumble/${rumbleWeek}`;

export const getRumbleByWeekWithPrisma = async (rumbleWeek: string) => {
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
  return rumble;
};

export const updateRumbleFetcher = async (
  url: string,
  { arg }: { arg: Partial<RumbleInterface> },
): Promise<RumbleInterface> => {
  const rumbleRes = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  return rumbleRes.json();
};

export const populateUserOnRumbleComments = (rumble: RumbleInterface) => {
  return rumble.comments.map((comment) => {
    const userInfo = comment.userId as unknown as UserInterface;
    return {
      ...comment,
      userId: userInfo.id,
      userName: userInfo.name,
      userImage: userInfo.image,
      userEmail: userInfo.email,
    };
  });
};

export const getRumbles = async (
  filter?: string,
): Promise<RumbleInterface[]> => {
  try {
    const url = new URL(`${BASE_API_URL}/api/rumble`);
    if (filter === "presentAndPast") {
      url.searchParams.append("filter", "presentAndPast");
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching rumbles:", error);
    throw error;
  }
};

export const voteForSnippetFetcher = async (
  rumbleWeek: string,
  userId: string,
  snippetId: string,
) => {
  const response = await fetch(`${RUMBLE_URL(rumbleWeek)}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, snippetId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to vote for snippet");
  }

  return response.json();
};

export const createCommentFetcher = async (
  rumbleWeek: string,
  commentData: { userId: string; text: string },
): Promise<CommentInterface> => {
  const response = await fetch(`${RUMBLE_URL(rumbleWeek)}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create comment");
  }

  return response.json();
};

export const deleteCommentFetcher = async (
  rumbleWeek: string,
  commentId: string,
) => {
  const response = await fetch(`${RUMBLE_URL(rumbleWeek)}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    console.error("Delete comment response:", responseText);
    throw new Error(
      `Failed to delete comment: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

export async function likeCommentFetcher(
  rumbleWeek: string,
  commentId: string,
  userId: string,
) {
  const response = await fetch(`${RUMBLE_URL(rumbleWeek)}/comment/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to like/unlike comment");
  }

  return response.json();
}
