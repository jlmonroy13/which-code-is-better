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
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/mongoose/dist/browser.umd.js",
  ],
};
