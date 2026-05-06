import React from "react";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import { images, stables } from "../../constants";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies = [],
}) => {

  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div
      className="flex flex-col sm:flex-row items-start gap-x-4 p-6 rounded-[24px] border-2 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.05)] w-full mb-4"
      id={`comment-${comment?._id}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-300 rounded-full translate-x-1 translate-y-1 -z-10 border border-black"></div>
        <img
          src={comment?.user?.avatar ? comment.user.avatar : images.userImage}
          alt="user profile"
          className="w-12 h-12 object-cover rounded-full border-2 border-black"
        />
      </div>

      <div className="flex-1 flex flex-col w-full mt-2 sm:mt-0">
        <div className="flex items-center justify-between w-full">
          <h5 className="font-black text-black text-sm uppercase tracking-tight">
            {comment.user.name}
          </h5>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {!isEditing && (
          <p className="font-medium mt-3 text-gray-700 leading-relaxed text-sm">
            {comment.desc}
          </p>
        )}

        {isEditing && (
          <div className="mt-4">
            <CommentForm
              btnLabel="Update"
              formSubmitHanlder={(value) => updateComment(value, comment._id)}
              formCancelHandler={() => setAffectedComment(null)}
              initialText={comment.desc}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs mt-6">
          <button
            className="flex items-center space-x-1 font-black uppercase tracking-widest text-black hover:text-yellow-500 transition"
            onClick={() =>
              isUserLoggined
                ? setAffectedComment({ type: "replying", _id: comment._id })
                : toast.error("Please login to reply")
            }
          >
            <FiMessageSquare className="w-4 h-4" />
            <span>Reply</span>
          </button>

          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-1 font-black uppercase tracking-widest text-black hover:text-blue-500 transition"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-1 font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>

        {isReplying && (
          <div className="mt-6">
            <CommentForm
              btnLabel="Post Reply"
              formSubmitHanlder={(value) =>
                addComment(value, repliedCommentId, replyOnUserId)
              }
              formCancelHandler={() => setAffectedComment(null)}
            />
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-8 space-y-4 border-l-2 border-black/10 pl-4 md:pl-8">
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
