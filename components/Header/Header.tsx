"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Countdown from "react-countdown";

import { UserInterface } from "@/types/user";
import { getNextWeekStartUTC } from "@/utils/date";

import logo from "../../public/logo.svg";
import CreateRumbleButton from "../CreateRumbleButton";
import UserProfile from "../UserProfile";

interface HeaderProps {
  user?: UserInterface | null;
}

const Header = ({ user }: HeaderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderCountdown = useCallback(
    ({
      days,
      hours,
      minutes,
    }: {
      days: number;
      hours: number;
      minutes: number;
    }) => {
      if (days < 1) {
        return (
          <span>
            {hours} hour{hours !== 1 ? "s" : ""} {minutes} minute
            {minutes !== 1 ? "s" : ""}
          </span>
        );
      }
      return (
        <span>
          {days} day{days !== 1 ? "s" : ""} {hours} hour
          {hours !== 1 ? "s" : ""}
        </span>
      );
    },
    [],
  );

  return (
    <header className="z-20 flex items-center justify-between gap-4 bg-black/20 px-7 py-4">
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
          <span className="sm:block hidden">Voting ends in:</span>
          <div className="rounded bg-primary px-2 py-1 text-base-100 font-medium min-w-[115px] min-h-[32px]">
            {isClient ? (
              <Countdown
                date={getNextWeekStartUTC()}
                renderer={renderCountdown}
              />
            ) : (
              "0 days 0 hours"
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="sm:block hidden">{user?.name || user?.email}</span>
          <UserProfile user={user} />
        </div>
      </div>
      <CreateRumbleButton />
    </header>
  );
};

export default Header;
