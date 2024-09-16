import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { prisma } from "@/prisma";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        if ("emailVerified" in user) {
          user.emailVerified = new Date();
        }
      }
      return true;
    },
  },
  trustHost: true,
  basePath: "/api/auth",
  pages: {
    verifyRequest: "/auth/verify-request",
  },
  ...authConfig,
});
