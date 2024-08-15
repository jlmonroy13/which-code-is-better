"use client";
import { ROUTES } from "@/routes";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const { title, description } = useMemo(() => {
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
      <h1 className="text-center text-3xl">{title}</h1>
      <p className="text-center text-sm text-slate-400">{description}</p>
      {children}
    </div>
  );
};

export default Layout;
