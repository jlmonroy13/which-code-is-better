import Layout from "@/components/auth/Layout";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex flex-1 items-center justify-center">
    <div className="rounded-lg bg-black/20 p-8">
      <Layout>{children}</Layout>
    </div>
  </div>
);

export default AuthLayout;
