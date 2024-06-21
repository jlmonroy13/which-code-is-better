import { useAuth } from '@/context/authContext';
import { useRumble } from "@/context/rumbleContext";
import { useEffect, useState } from 'react';

interface useCommentsProps {
  hasVoted: boolean;
}

const useComments = ({ hasVoted }: useCommentsProps) => {
  const { user } = useAuth();
  const { rumble, updateRumble, isUpdating } = useRumble();
  const isCommentDisabled = !user || !hasVoted;
  const [comments, setComments] = useState(rumble?.comments || []);
  const [comment, setComment] = useState("");

  const handleLike = (id: string) => {
    console.log("Liked comment with id:", id);
    // Here you would handle the like logic, possibly updating state or sending an update to a backend
  };

  useEffect(() => {
    if (!rumble?.comments?.length) return;
    setComments(rumble?.comments || []);
  }, [rumble?.comments]);

  const handleSubmitComment = async () => {
    if (!user || !comment) return null;
    const newComment = {
      userId: user._id,
      text: comment,
    };
    await updateRumble({
      ...rumble,
      comments: [...(rumble?.comments || []), newComment],
    });
    setComment("");
  };

  const handleDeleteComment = (commentId: string) => {
    if (!rumble || !commentId) return null;
    updateRumble({
      ...rumble,
      comments: rumble.comments.filter((comment) => comment._id !== commentId),
    });
  };

  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

  return {
    user,
    comments,
    comment,
    isCommentDisabled,
    isUpdating,
    handleSubmitComment,
    handleDeleteComment,
    handleInputComment,
    handleLike,
  };
};

export default useComments
