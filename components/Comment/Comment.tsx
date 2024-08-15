import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete, AiOutlineLike } from "react-icons/ai";

interface CommentProps {
  isOwner: boolean;
  username: string;
  timestamp: Date;
  avatarUrl: string;
  text: string;
  likes: number;
  hasLiked: boolean;
  isDeleting: boolean;
  onLike: () => void;
  onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({
  isOwner,
  username,
  avatarUrl,
  text,
  likes,
  hasLiked,
  isDeleting,
  onLike,
  onDelete,
  timestamp,
}) => (
  <div className="flex space-x-3 group relative">
    <div>
      <Image
        alt="avatar"
        className="rounded-full"
        height={40}
        src={avatarUrl}
        width={40}
      />
    </div>
    <div className="flex-1">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{username}</p>
          <div className="text-xs text-gray-400 sm:block hidden">
            {formatDistanceToNow(new Date(timestamp))}
          </div>
        </div>
        <p className="text-sm">{text}</p>
      </div>
      <div className="flex items-center space-x-2 mt-1 text-xs gap-2">
        <div className="flex items-center">
          <button
            className={`btn btn-ghost btn-circle btn-sm ${
              hasLiked ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={onLike}
            title="Like Comment"
          >
            <AiOutlineLike size={20} />
          </button>
          <span className="text-gray-400">{likes}</span>
        </div>
      </div>
    </div>
    {isOwner && !isDeleting && (
      <button
        className="btn btn-ghost btn-circle btn-sm absolute top-0 right-0 mt-2 mr-2 text-red-500 opacity-0 group-hover:opacity-100"
        onClick={onDelete}
        title="Delete Comment"
      >
        <AiOutlineDelete size={20} />
      </button>
    )}
  </div>
);


export default Comment;
