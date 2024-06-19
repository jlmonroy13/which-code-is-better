import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import User from "@/models/user";
import { RumbleInterface } from "@/types/rumble";

const BASE_API_URL = process.env.NEXT_PUBLIC_URL;

export const RUMBLE_URL = (rumbleDate: string) => `/api/rumble/${rumbleDate}`;

export const getRumbleByDate = async (rumbleDate: string): Promise<RumbleInterface | null> => {
  if (process.env.NODE_ENV === "development") {
    const res = await fetch(`${BASE_API_URL}/api/rumble/${rumbleDate}`);
    return res.json();
  }
  await connectMongoDB();
  return Rumble.findOne({ rumbleDay: rumbleDate });
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

export const getCommentsWithUserData = async (rumble: RumbleInterface) => {
  const commentsWithUserData = [];

  for (const comment of rumble.comments) {
    const user = await User.findById(comment.userId);

    if (user) {
      commentsWithUserData.push({
        ...comment,
        userId: comment.userId,
        userName: user.name,
        userImage: user.image,
      });
    }
  }
  return commentsWithUserData;
}
