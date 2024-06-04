"use server";

import connectMongoDB from "@/libs/mongodb";
import Rumble from "@/models/rumble";
import { RumbleInterface } from "@/types/rumble";

const BASE_API_URL = process.env.NEXT_PUBLIC_URL;

export const getRumble = async (rumbleId: string): Promise<RumbleInterface | null> => {
  if (process.env.NODE_ENV === "development") {
    const res = await fetch(`${BASE_API_URL}/api/rumble/${rumbleId}`);
    return res.json();
  }
  await connectMongoDB();
  return Rumble.findById(rumbleId);
};
