"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { UserInterface } from "@/types/user";

interface ClientLayoutProps {
  user: UserInterface | null;
  children: React.ReactNode;
}

function ClientLayout({ user, children }: ClientLayoutProps) {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuVisible(!isSideMenuVisible);
  };

  const closeSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  return (
    <div className="relative min-h-svh flex flex-col">
      <Header user={user} toggleSideMenu={toggleSideMenu} />
      <div className="flex flex-1">
        <SideMenu isVisible={isSideMenuVisible} onClose={closeSideMenu} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default ClientLayout;
