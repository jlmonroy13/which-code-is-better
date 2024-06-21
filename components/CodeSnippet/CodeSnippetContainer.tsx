"use client";
import { useRouter } from "next/navigation";
import CodeSnippet from "./CodeSnippet";
import { CodeSnippetProps } from "./CodeSnippet.types";
import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";
import { useState } from "react";

const CodeSnippetContainer: React.FC<Omit<CodeSnippetProps, 'onVote' | 'isVoting'>> = (props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const { rumble, updateRumble } = useRumble();
  const { id } = props;

  const onVote = () => {
    try {
      if (!user) {
        router.push("/auth/login");
      } else if (rumble) {
        setIsVoting(true);
        let votes = rumble.votes;
        if (!votes.some(({ userId }) => userId === user._id)) {
          votes.push({
            userId: user._id,
            snippetId: id,
            rumbleDay: rumble.rumbleDay,
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
        updateRumble({
          ...rumble,
          votes,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVoting(false);
    }
  }


  return <CodeSnippet {...props} onVote={onVote} isVoting={isVoting} />;
};

export default CodeSnippetContainer;
