"use client";

import Header from "@/components/Header";
import { UserInterface } from "@/types/user";

import Footer from "../Footer";

interface ClientLayoutProps {
  user: UserInterface | null;
  children: React.ReactNode;
}

function ClientLayout({ user, children }: ClientLayoutProps) {
  return (
    <div className="relative min-h-svh grid grid-rows-[max-content_1fr_max-content]">
      <Header user={user} />
      <main className="flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}

export default ClientLayout;
