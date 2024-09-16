import { UserInterface } from "@/types/user";

const BASE_API_URL = process.env.NEXT_PUBLIC_URL;

export const USER_URL = (userId: string) => `/api/users/${userId}`;

export const getUser = async (
  userId: string,
): Promise<UserInterface | null> => {
  const userRes = await fetch(`${BASE_API_URL}${USER_URL(userId)}`);
  return userRes.json();
};

export const updateUserFetcher = async (
  url: string,
  { arg }: { arg: Partial<UserInterface> },
): Promise<UserInterface> => {
  const userRes = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  return userRes.json();
};
