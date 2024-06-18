import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import cx from "classnames";
import { auth } from "@/auth";
import { getUser } from "@/utils/api/user";
import { AuthProvider } from "@/context/authContext";
import { RumbleProvider } from "@/context/rumbleContext";
import { getCurrentDate } from "@/utils/date";
import { getRumbleByDate } from "@/utils/api/rumble";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Which Code Is Better?",
  description: "Daily code snippet comparisons",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  const todayDate = getCurrentDate();
  const rumble = await getRumbleByDate(todayDate);
  const session = await auth();
  if (session?.user?.id) {
    user = await getUser(session.user.id);
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <AuthProvider user={user} session={session}>
        <RumbleProvider rumble={rumble}>
          <body className={cx(inter.className, "bg-base-100")}>
            <div className="relative flex min-h-svh flex-col">
              <Header user={user} />
              {children}
            </div>
          </body>
        </RumbleProvider>
      </AuthProvider>
    </html>
  );
}
