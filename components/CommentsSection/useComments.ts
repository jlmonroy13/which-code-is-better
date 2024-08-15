import { useAuth } from '@/context/authContext';
import { useRumble } from "@/context/rumbleContext";
import { useEffect, useState } from 'react';

interface useCommentsProps {
  hasVoted: boolean;
}

const useComments = ({ hasVoted }: useCommentsProps) => {
  const { user } = useAuth();
  const { rumble, updateRumble } = useRumble();
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
      const updatedComments = rumble.comments.map((comment) => {
        if (comment._id === commentId) {
          if (comment.likes.includes(user._id)) {
            return {
              ...comment,
              likes: comment.likes.filter((like) => like !== user._id),
            };
          }
          return {
            ...comment,
            likes: [...comment.likes, user._id],
          };
        }
        return comment;
      });
      await updateRumble({
        ...rumble,
        comments: updatedComments,
      });
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
    if (!user || !comment) return null;
    try {
      const newComment = {
        userId: user._id,
        text: comment,
        likes: [],
      };
      await updateRumble({
        ...rumble,
        comments: [newComment, ...(rumble?.comments || [])],
      });
      setComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!rumble || !commentId) return null;
    try {
      setIsDeleting(true);
      await updateRumble({
        ...rumble,
        comments: rumble.comments.filter((comment) => comment._id !== commentId),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

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

export default useComments
