"use server"
import Rumble from "@/models/rumble";

import connectMongoDB from "@/libs/mongodb";

export const createRumble = async () => {
  await connectMongoDB();
  await Rumble.create({ date: "sept 13 1988" });
}
