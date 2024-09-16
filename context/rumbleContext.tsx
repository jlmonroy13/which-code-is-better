"use client";

import { createContext, useCallback, useContext, useState } from "react";
import useSWRMutation from "swr/mutation";

import { CommentInterface, RumbleInterface } from "@/types/rumble";
import { getFetcher } from "@/utils/api/fetcher";
import {
  createCommentFetcher,
  deleteCommentFetcher,
  RUMBLE_URL,
  updateRumbleFetcher,
} from "@/utils/api/rumble";
import { voteForSnippetFetcher } from "@/utils/api/rumble";
import { likeCommentFetcher } from "@/utils/api/rumble";

interface RumbleContextProps {
  rumble: RumbleInterface | null;
  isUpdating: boolean;
  refetchRumble: () => void;
  updateRumble: (arg: Partial<RumbleInterface>) => Promise<RumbleInterface>;
  voteForSnippet: (userId: string, snippetId: string) => Promise<void>;
  createComment: (
    text: string,
    userId: string,
  ) => Promise<CommentInterface | undefined>;
  deleteComment: (commentId: string) => void;
  likeComment: (commentId: string, userId: string) => Promise<void>;
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
    getFetcher,
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

  const voteForSnippet = async (userId: string, snippetId: string) => {
    if (!_rumble) return;
    try {
      await voteForSnippetFetcher(_rumble.rumbleWeek, userId, snippetId);
      await refetchRumble();
    } catch (error) {
      console.error("Error voting for snippet:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  const createComment = async (text: string, userId: string) => {
    if (!_rumble || !userId) return;
    try {
      const newComment = await createCommentFetcher(_rumble.rumbleWeek, {
        userId,
        text,
      });
      setRumble((prevRumble) => ({
        ...prevRumble!,
        comments: [newComment, ...(prevRumble?.comments || [])],
      }));
      return newComment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!_rumble) throw new Error("Rumble not found");
    try {
      await deleteCommentFetcher(_rumble.rumbleWeek, commentId);
      setRumble((prevRumble) => {
        if (!prevRumble) return prevRumble;
        return {
          ...prevRumble,
          comments: prevRumble.comments.filter(
            (comment) => comment.id !== commentId,
          ),
        };
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  const likeComment = async (commentId: string, userId: string) => {
    if (!_rumble) return;
    try {
      const updatedComment = await likeCommentFetcher(
        _rumble.rumbleWeek,
        commentId,
        userId,
      );
      setRumble((prevRumble) => ({
        ...prevRumble!,
        comments: prevRumble!.comments.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        ),
      }));
    } catch (error) {
      console.error("Error liking comment:", error);
      throw error;
    }
  };

  return (
    <RumbleContext.Provider
      value={{
        rumble: _rumble,
        isUpdating,
        refetchRumble,
        updateRumble,
        voteForSnippet,
        createComment,
        deleteComment,
        likeComment,
      }}
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
