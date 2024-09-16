"use client";

import useComments from "./useComments";
import Comment from "../Comment";

interface CommentsSectionProps {
  hasVoted: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ hasVoted }) => {
  const {
    user,
    comments,
    comment,
    isCommentDisabled,
    isLiking,
    isCommenting,
    isDeleting,
    handleSubmitComment,
    handleInputComment,
    handleDeleteComment,
    handleLike,
  } = useComments({
    hasVoted,
  });

  return (
    <div className="py-4 px-6 bg-base-300 rounded-lg shadow-lg">
      <div className="mb-8 flex items-center gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="input input-ghost w-full border-b-gray-400 rounded-none"
          disabled={isCommentDisabled || isCommenting}
          value={comment}
          onChange={handleInputComment}
        />
        <button
          className="btn btn-outline"
          disabled={isCommentDisabled || isCommenting || !comment}
          onClick={handleSubmitComment}
        >
          Comment
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {!user ? (
          <div className="text-center text-gray-400 font-bold p-10">
            Please log in to vote and comment.
          </div>
        ) : !hasVoted ? (
          <div className="text-center text-gray-400 font-bold p-10">
            Please vote first to view or add comments.
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              username={comment.user.name || comment.user.email || "Anonymous"}
              text={comment.text}
              avatarUrl={comment.user.image || ""}
              onLike={() => !isLiking && handleLike(comment.id)}
              onDelete={() => !isDeleting && handleDeleteComment(comment.id)}
              timestamp={comment.createdAt || new Date()}
              isOwner={comment.userId === user.id}
              isDeleting={isDeleting}
              hasLiked={
                !!comment.likes?.some(({ userId }) => userId === user.id)
              }
              likes={comment.likes?.length || 0}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 font-bold p-10">
            No comments yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
