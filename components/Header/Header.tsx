"use client";

import { UserInterface } from "@/types/user";
import { getNextWeekStartUTC } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import logo from "../../public/logo.svg";
import UserProfile from "../UserProfille/UserProfile";

interface HeaderProps {
  user?: UserInterface | null;
}

const Header = ({ user }: HeaderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="z-10 flex flex-col items-start justify-between gap-4 bg-black/20 px-7 py-4 sm:flex-row sm:items-center">
      <nav className="flex items-center gap-14">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            src={logo}
            alt="Which Code is Better logo"
            width={42}
            height={42}
          />
        </Link>

      </nav>
      <div className="flex gap-14 items-center">
          <div className="flex items-center gap-2">
            Voting ends in:
            <div className="rounded bg-primary px-2 py-1 text-base-100 font-medium min-w-[115px] min-h-[32px]">
              {isClient ? <Countdown date={getNextWeekStartUTC()} /> : "00:00:00:00"}
            </div>
          </div>
        <div className="flex items-center gap-4">
          {user?.name || user?.email}
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
