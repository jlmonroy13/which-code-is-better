"use client";

import { createContext, useContext, useState } from "react";
import { User } from '@/types/user';
import useSWRMutation from "swr/mutation";
import { getFetcher } from "@/utils/api/fetcher";
import { USER_URL, updateUserFetcher } from "@/utils/api/user";
import { signOut } from "@/actions/signOutAction";
import { Session } from "next-auth";


interface AuthContextProps {
  user?: User | null;
  session?: Session | null;
  refetchUser: () => void;
  signOut: () => void;
  updateUser: (arg: Partial<User>) => Promise<User>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  user: User | null;
  session: Session | null;
  children: React.ReactNode;
}

export const AuthProvider = ({ children, user, session }: AuthProviderProps) => {
  const [_user, setUser] = useState<User | null>(user);
  const { trigger: getUser } = useSWRMutation<User>(
    USER_URL(_user?._id || ""),
    getFetcher,
  );
  const { trigger: updateUserTrigger } = useSWRMutation(
    USER_URL(user?._id || ""),
    updateUserFetcher
  );

  const refetchUser = async () => {
    const res = await getUser();
    setUser(res);
  }

  const updateUser = async (arg: Partial<User>) => {
    const res = await updateUserTrigger(arg);
    setUser(res);
    return res;
  }

  const onSignOut = () => {
    setUser(null);
    signOut();
  }


  return (
    <AuthContext.Provider
      value={{
        user: _user,
        session,
        refetchUser,
        updateUser,
        signOut: onSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
