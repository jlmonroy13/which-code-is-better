"use client";
import React, { use, useEffect, useState } from "react";
import Comment from "../Comment";
import { useAuth } from "@/context/authContext";
import { useRumble } from "@/context/rumbleContext";

interface CommentsSectionProps {
  hasVoted: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ hasVoted }) => {
  const { user } = useAuth();
  const { rumble, updateRumble, isUpdating: isCommenting } = useRumble();
  const isCommentDisabled = !user || !hasVoted;
  const [comments, setComments] = useState(rumble?.comments || []);
  const [comment, setComment] = useState('');

  const handleLike = (id: string) => {
    console.log("Liked comment with id:", id);
    // Here you would handle the like logic, possibly updating state or sending an update to a backend
  };

  useEffect(() => {
    if (!rumble?.comments?.length) return;
    setComments(rumble?.comments || []);
  }, [rumble?.comments]);

  const handleComment = async () => {
    if (user && comment) {
      const newComment = {
        userId: user._id,
        text: comment,
      };
      await updateRumble({
        ...rumble,
        comments: [
          ...(rumble?.comments || []),
          newComment,
        ]
      });
      setComment('');
    }
  }

  const onRenderComments = () => {
    if (!user) {
      return (
        <div className="text-center text-gray-400 font-bold p-10">
          Please log in to vote and comment.
        </div>
      );
    }

    if (!hasVoted) {
      return (
        <div className="text-center text-gray-400 font-bold p-10">
          Please vote first to view or add comments.
        </div>
      );
    }
    return comments.map((comment) => (
      <Comment
        key={comment._id}
        username={comment.userName || "Anonymous"}
        text={comment.text}
        avatarUrl={comment.userImage || ""}
        onLike={() => !!comment?._id && handleLike(comment._id)}
        timestamp={comment.createdAt || new Date()}
      />
    ));
  }

  return (
    <div className="py-4 px-6 bg-base-300 rounded-lg shadow-lg">
      <div className="mb-8 flex items-center gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="input input-ghost w-full border-b-gray-400 rounded-none"
          disabled={isCommentDisabled || isCommenting}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn btn-outline"
          disabled={isCommentDisabled || isCommenting || !comment}
          onClick={handleComment}
        >
          Comment
        </button>
      </div>
      <div className="flex flex-col gap-6">{onRenderComments()}</div>
    </div>
  );
};

export default CommentsSection;
