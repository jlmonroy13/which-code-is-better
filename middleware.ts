import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";

import authConfig from "@/auth.config";

const fakeEmailAdapter: Adapter = {
  createVerificationToken: () => undefined,
  useVerificationToken: () => null,
  getUserByEmail: () => null,
};

export const { auth: middleware } = NextAuth({
  adapter: fakeEmailAdapter,
  ...authConfig,
});

export const config = {
  unstable_allowDynamic: [
    // Allow dynamic imports for Prisma Client
    "/node_modules/@prisma/client/index.js",
    "/node_modules/@prisma/client/**/*",
  ],
};
