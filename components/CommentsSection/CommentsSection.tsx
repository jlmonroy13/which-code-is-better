"use client";

import Comment from "../Comment";
import useComments from "./useComments";

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
        ) : (
          comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                username={comment.userName || "Anonymous"}
                text={comment.text}
                avatarUrl={comment.userImage || ""}
                onLike={() => !isLiking && handleLike(comment._id || "")}
                onDelete={() => !isDeleting && handleDeleteComment(comment._id || "")}
                timestamp={comment.createdAt || new Date()}
                isOwner={comment.userId === user._id}
                isDeleting={isDeleting}
                hasLiked={comment.likes?.includes(user._id)}
                likes={comment.likes?.length || 0}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 font-bold p-10">
              No comments yet.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
