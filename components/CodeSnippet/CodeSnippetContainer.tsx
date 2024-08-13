"use client";

import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";
import { getCurrentWeek } from "@/utils/date";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import CodeSnippet from "./CodeSnippet";
import { CodeSnippetProps } from "./CodeSnippet.types";

const CodeSnippetContainer: React.FC<
  Omit<CodeSnippetProps, "onVote" | "isVoting" | "isRumbleActive">
> = (props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const { rumble, updateRumble } = useRumble();
  const { id } = props;

  const isRumbleActive = useMemo(
    () => getCurrentWeek() === rumble?.rumbleWeek,
    [rumble?.rumbleWeek]
  );

  const onVote = async () => {
    try {
      if (!user) {
        router.push("/auth/login");
      } else if (!isRumbleActive) {
        return;
      } else if (rumble) {
        setIsVoting(true);
        let votes = rumble.votes;
        if (!votes.some(({ userId }) => userId === user._id)) {
          votes.push({
            userId: user._id,
            snippetId: id,
          });
        } else {
          votes = votes.map((vote) => {
            if (vote.userId === user._id) {
              return {
                ...vote,
                snippetId: id,
              };
            }
            return vote;
          });
        }
        await updateRumble({
          ...rumble,
          votes,
        });
        toast.success("Vote submitted successfully!");
      }
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
