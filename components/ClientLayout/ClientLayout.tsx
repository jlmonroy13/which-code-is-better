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
    <div className="relative min-h-svh flex flex-col">
      <Header user={user} />
      <div className="flex flex-1">
        <main className="flex-1 flex">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default ClientLayout;
