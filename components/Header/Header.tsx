"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import UserProfile from "../UserProfille/UserProfile";
import { User } from "@/types/user";

interface HeaderProps {
  user?: User | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="z-10 flex flex-col items-start justify-between gap-4 bg-black/20 px-7 py-4 sm:flex-row sm:items-center">
      <nav className="flex items-center gap-14">
        <Link href="/" className="flex flex-row items-center gap-2">
          {/* <Image src={logo} width={25} height={25} alt="CodeMender" /> */}
          <h1 className="text-xl text-neutral-300">Which code is better</h1>
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        {user?.name || user?.email}
        <UserProfile user={user} />
      </div>
    </header>
  );
};

export default Header;
