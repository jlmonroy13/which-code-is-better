import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";

import { sendVerificationRequest } from "@/libs/authSendRequest";

export default {
  providers: [
    GitHub,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY as string,
      from: process.env.AUTH_RESEND_FROM_EMAIL as string,
      normalizeIdentifier(identifier: string): string {
        const [local, domain] = identifier.toLowerCase().trim().split("@");
        const cleanDomain = domain.split(",")[0];
        if (identifier.split("@").length > 2) {
          throw new Error("Only one email allowed");
        }
        return `${local}@${cleanDomain}`;
      },
      sendVerificationRequest,
    }),
  ],
} satisfies NextAuthConfig;
