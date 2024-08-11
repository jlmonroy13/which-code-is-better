import { auth } from "@/auth";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/authContext";
import { getUser } from "@/utils/api/user";
import cx from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

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
        <body className={cx(inter.className, "bg-base-100")}>
          <ClientLayout user={user}>
            {children}
          </ClientLayout>
          <ToastContainer hideProgressBar />
        </body>
      </AuthProvider>
    </html>
  );
}
