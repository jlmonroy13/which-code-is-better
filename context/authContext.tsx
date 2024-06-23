"use client";

import { signOut } from "@/actions/signOutAction";
import { UserInterface } from "@/types/user";
import { getFetcher } from "@/utils/api/fetcher";
import { USER_URL, updateUserFetcher } from "@/utils/api/user";
import { Session } from "next-auth";
import { createContext, useContext, useState } from "react";
import useSWRMutation from "swr/mutation";

interface AuthContextProps {
  user?: UserInterface | null;
  session?: Session | null;
  refetchUser: () => void;
  signOut: () => void;
  updateUser: (arg: Partial<UserInterface>) => Promise<UserInterface>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  user: UserInterface | null;
  session: Session | null;
  children: React.ReactNode;
}

export const AuthProvider = ({
  children,
  user,
  session,
}: AuthProviderProps) => {
  const [_user, setUser] = useState<UserInterface | null>(user);
  const { trigger: getUser } = useSWRMutation<UserInterface>(
    USER_URL(_user?._id || ""),
    getFetcher
  );
  const { trigger: updateUserTrigger } = useSWRMutation(
    USER_URL(user?._id || ""),
    updateUserFetcher
  );

  const refetchUser = async () => {
    const res = await getUser();
    setUser(res);
  };

  const updateUser = async (arg: Partial<UserInterface>) => {
    const res = await updateUserTrigger(arg);
    setUser(res);
    return res;
  };

  const onSignOut = () => {
    setUser(null);
    signOut();
  };

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
