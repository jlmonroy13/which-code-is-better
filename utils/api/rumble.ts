import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import User from "@/models/user";
import { RumbleInterface } from "@/types/rumble";
import { UserInterface } from "@/types/user";

const BASE_API_URL = process.env.NEXT_PUBLIC_URL;

export const RUMBLE_URL = (rumbleDate: string) => `/api/rumble/${rumbleDate}`;

export const getRumbleByWeek = async (rumbleWeek: string): Promise<RumbleInterface | null> => {
  if (process.env.NODE_ENV === "development") {
    const res = await fetch(`${BASE_API_URL}/api/rumble/${rumbleWeek}`);
    return res.json();
  }
  await connectMongoDB();
  return Rumble.findOne({ rumbleWeek });
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
    };
  });
};
