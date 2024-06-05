import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import authConfig from "@/auth.config";

const client = new MongoClient(process.env.MONGODB_URI as string);
const clientPromise = client.connect();

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  trustHost: true,
  basePath: "/api/auth",
  pages: {
    verifyRequest: "/auth/verify-request",
  },
  ...authConfig,
});
