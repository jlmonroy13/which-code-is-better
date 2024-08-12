"use client";

import { RumbleInterface } from "@/types/rumble";
import { getFetcher } from "@/utils/api/fetcher";
import { RUMBLE_URL, updateRumbleFetcher } from "@/utils/api/rumble";
import {
  createContext,
  useCallback,
  useContext,
  useState
} from "react";
import useSWRMutation from "swr/mutation";

interface RumbleContextProps {
  rumble: RumbleInterface | null;
  isUpdating: boolean;
  refetchRumble: () => void;
  updateRumble: (arg: Partial<RumbleInterface>) => Promise<RumbleInterface>;
}

export const RumbleContext = createContext<RumbleContextProps | null>(null);

interface RumbleProviderProps {
  rumble: RumbleInterface | null;
  children: React.ReactNode;
}

export const RumbleProvider = ({ rumble, children }: RumbleProviderProps) => {
  const [_rumble, setRumble] = useState<RumbleInterface | null>(rumble);
  const { trigger: getRumble } = useSWRMutation<RumbleInterface>(
    RUMBLE_URL(_rumble?.rumbleWeek || ""),
    getFetcher
  );
  const { trigger: updateRumbleTrigger, isMutating: isUpdating } =
    useSWRMutation(RUMBLE_URL(_rumble?.rumbleWeek || ""), updateRumbleFetcher);

  const refetchRumble = useCallback(async () => {
    const res = await getRumble();
    setRumble(res);
  }, [getRumble]);

  const updateRumble = async (arg: Partial<RumbleInterface>) => {
    const res = await updateRumbleTrigger(arg);
    setRumble(res);
    return res;
  };

  return (
    <RumbleContext.Provider
      value={{ rumble: _rumble, isUpdating, refetchRumble, updateRumble }}
    >
      {children}
    </RumbleContext.Provider>
  );
};

export const useRumble = (): RumbleContextProps => {
  const context = useContext(RumbleContext);
  if (!context) {
    throw new Error("useRumble must be used within a RumbleProvider");
  }
  return context;
};
