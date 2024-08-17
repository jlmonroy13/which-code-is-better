import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { RumbleInterface } from "@/types/rumble";
import { UserInterface } from "@/types/user";
import { getCurrentWeek } from '@/utils/date';

const BASE_API_URL = process.env.NEXT_PUBLIC_URL;

export const RUMBLE_URL = (rumbleWeek: string) => `/api/rumble/${rumbleWeek}`;

export const getRumbleByWeek = async (rumbleWeek: string): Promise<RumbleInterface | null> => {
  if (process.env.NODE_ENV === "development") {
    const res = await fetch(`${BASE_API_URL}/api/rumble/${rumbleWeek}`);
    if (res.status === 404) {
      return null;
    }
    return res.json();
  }
  await connectMongoDB();
  const rumble = await Rumble.findOne({ rumbleWeek });
  return rumble || null;
};

export const updateRumbleFetcher = async (
  url: string,
  { arg }: { arg: Partial<RumbleInterface> }
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
      userId: userInfo._id,
      userName: userInfo.name,
      userImage: userInfo.image,
      userEmail: userInfo.email,
    };
  });
};

export const getRumbles = async (filter?: string): Promise<RumbleInterface[]> => {
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
