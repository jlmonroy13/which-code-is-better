"use client";
import { ROUTES } from "@/routes";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ReactNode, useMemo } from "react";
// import logo from "../../../public/logo.svg";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const { title, description }  = useMemo(() => {
    console.log("pathname", pathname);
    switch (pathname) {
      case ROUTES.AUTH.LOGIN:
        return {
          title: "Log in",
          description:
            "Access your account to vote on code snippets, share your insights, and join our coding community.",
        };
      case ROUTES.AUTH.VERIFY_REQUEST:
        return {
          title: "Check Your Email",
          description: "We've sent a magic link to your email address. ✉️",
        };
      default:
        return {
          title: "",
          description: "",
        };
    }
  }, [pathname]);

  return (
    <div className="flex max-w-[450px] flex-col items-center gap-4">
      {/* <Image
        className="rounded-full"
        src={logo}
        alt="Codemender logo"
        width={42}
        height={42}
      /> */}
      <h1 className="text-center text-3xl">{title}</h1>
      <p className="text-center text-sm text-slate-400">{description}</p>
      {children}
    </div>
  );
};

export default Layout;
