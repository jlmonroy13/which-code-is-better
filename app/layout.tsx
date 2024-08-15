import { auth } from "@/auth";
import ClientLayout from "@/components/ClientLayout";
import { AuthProvider } from "@/context/authContext";
import { getUser } from "@/utils/api/user";
import { GoogleTagManager } from "@next/third-parties/google";
import cx from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Which Code Is Better?",
  description: "Weekly code snippet comparisons",
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

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
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
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
