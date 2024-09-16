import { useEffect, useState } from "react";

import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";

interface useCommentsProps {
  hasVoted: boolean;
}

const useComments = ({ hasVoted }: useCommentsProps) => {
  const { user } = useAuth();
  const { rumble, createComment, deleteComment, likeComment } = useRumble();
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isCommentDisabled = !user || !hasVoted;
  const [comments, setComments] = useState(rumble?.comments || []);
  const [comment, setComment] = useState("");

  const handleLike = async (commentId: string) => {
    if (!user || !rumble) return null;
    try {
      setIsLiking(true);
      await likeComment(commentId, user.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };

  useEffect(() => {
    if (!rumble?.comments) return;
    setComments(rumble?.comments || []);
  }, [rumble?.comments]);

  const handleSubmitComment = async () => {
    if (!user || !comment || !rumble) return null;
    try {
      setIsCommenting(true);
      const newComment = await createComment(comment, user.id);
      if (newComment) {
        setComments((prevComments) => [newComment, ...prevComments]);
        setComment("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!rumble) return;
    try {
      setIsDeleting(true);
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return {
    user,
    comments,
    comment,
    isCommentDisabled,
    isLiking,
    isCommenting,
    isDeleting,
    handleSubmitComment,
    handleDeleteComment,
    handleInputComment,
    handleLike,
  };
};

export default useComments;
