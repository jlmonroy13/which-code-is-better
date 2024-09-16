"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";
import { getCurrentWeek } from "@/utils/date";

import CodeSnippet from "./CodeSnippet";
import { CodeSnippetProps } from "./CodeSnippet.types";

interface CodeSnippetContainerProps
  extends Omit<CodeSnippetProps, "onVote" | "isVoting" | "isRumbleActive"> {
  onUserVote?(): void;
}

const CodeSnippetContainer: React.FC<CodeSnippetContainerProps> = (props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const { rumble, voteForSnippet } = useRumble();
  const { id, onUserVote } = props;

  const isRumbleActive = useMemo(
    () => getCurrentWeek() === rumble?.rumbleWeek,
    [rumble?.rumbleWeek],
  );

  const onVote = async () => {
    try {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      if (!isRumbleActive) {
        toast.error("This rumble is not currently active.");
        return;
      }

      if (!rumble) {
        toast.error("No active rumble found.");
        return;
      }

      setIsVoting(true);
      await voteForSnippet(user.id, id);
      toast.success("Vote submitted successfully!");
      onUserVote?.();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred, please try voting again.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <CodeSnippet
      {...props}
      isRumbleActive={isRumbleActive}
      isVoting={isVoting}
      onVote={onVote}
    />
  );
};

export default CodeSnippetContainer;
