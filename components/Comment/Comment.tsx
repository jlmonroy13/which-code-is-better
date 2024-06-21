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
  isUpdating: boolean;
  onLike: () => void;
  onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({
  isOwner,
  username,
  avatarUrl,
  text,
  isUpdating,
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
          <div className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(timestamp))}
          </div>
        </div>
        <p className="text-sm">{text}</p>
      </div>
      <div className="flex items-center space-x-2 mt-1 text-xs gap-2">
        <div className="flex items-center">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={onLike}
            title="Like Comment"
          >
            <AiOutlineLike size={20} />
          </button>
          <span className="text-gray-400">35</span>
        </div>
      </div>
    </div>
    {isOwner && !isUpdating && (
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
