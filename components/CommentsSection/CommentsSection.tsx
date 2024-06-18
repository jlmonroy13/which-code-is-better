"use client";
import React, { useState } from "react";
import Comment from "../Comment";
import { useAuth } from "@/context/authContext";

interface CommentsSectionProps {
  hasVoted: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ hasVoted }) => {
  const { user } = useAuth();
  const isCommentDisabled = !user || !hasVoted;
  const [comments, setComments] = useState([
    {
      id: "1",
      username: "User1",
      text: "This is really cool!",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      timestamp: 1717372325231,
    },
    {
      id: "2",
      username: "User2",
      text: "Thanks for sharing!",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
      timestamp: 1717372325231,
    },
  ]);

  const handleLike = (id: string) => {
    console.log("Liked comment with id:", id);
    // Here you would handle the like logic, possibly updating state or sending an update to a backend
  };

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
        key={comment.id}
        username={comment.username}
        text={comment.text}
        avatarUrl={comment.avatarUrl}
        onLike={() => handleLike(comment.id)}
        timestamp={comment.timestamp}
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
          disabled={isCommentDisabled}
        />
        <button className="btn btn-outline" disabled={isCommentDisabled}>
          Comment
        </button>
      </div>
      <div className="flex flex-col gap-6">{onRenderComments()}</div>
    </div>
  );
};

export default CommentsSection;
