"use client";
import { useRouter } from "next/navigation";
import CodeSnippet from "./CodeSnippet";
import { CodeSnippetProps } from "./CodeSnippet.types";
import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";

const CodeSnippetContainer: React.FC<Omit<CodeSnippetProps, 'onVote' | 'isVoting'>> = (props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { rumble, isUpdating, updateRumble } = useRumble();
  const { id } = props;

  const onVote = () => {
    if (!user) {
      router.push("/auth/login");
    } else if (rumble) {
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
        })
      }
      updateRumble({
        ...rumble,
        votes,
      });
    }
  }


  return <CodeSnippet {...props} onVote={onVote} isVoting={isUpdating} />;
};

export default CodeSnippetContainer;
