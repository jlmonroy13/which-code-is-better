import { auth } from "@/auth";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/authContext";
import { RumbleProvider } from "@/context/rumbleContext";
import { getRumbleByDate } from "@/utils/api/rumble";
import { getUser } from "@/utils/api/user";
import { getCurrentDate } from "@/utils/date";
import cx from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
            <ToastContainer hideProgressBar />
          </body>
        </RumbleProvider>
      </AuthProvider>
    </html>
  );
}
