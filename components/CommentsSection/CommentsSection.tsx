"use client";
import React, { useState } from "react";
import Comment from "../Comment";

interface CommentsSectionProps {
  snippetId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ snippetId }) => {
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

  return (
    <div className="py-4 px-6 bg-base-300 rounded-lg shadow-lg">
      <div className="mb-8 flex items-center gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="input input-ghost w-full border-b-gray-400 rounded-none"
        />
        <button className="btn btn-outline">Comment</button>
      </div>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            username={comment.username}
            text={comment.text}
            avatarUrl={comment.avatarUrl}
            onLike={() => handleLike(comment.id)}
            timestamp={comment.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
