import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import { deleteComment, getAllComments, updateComment } from "../../../../services/index/comments";
import DataTable from "../../components/DataTable";
import { images } from "../../../../constants";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiTrash2, FiMessageSquare } from "react-icons/fi";

const Comments = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Comment is deleted",
    mutateDeleteFn: ({ slug, token }) => deleteComment({ commentId: slug, token }),
  });

  const { mutate: mutateUpdateCommentCheck, isLoading: isLoadingUpdateCommentCheck } = useMutation({
    mutationFn: ({ token, check, commentId }) => updateComment({ token, check, commentId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(data?.check ? "Comment is approved" : "Comment is not approved");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <DataTable
      pageTitle="Manage Comments"
      dataListName="Comments"
      searchInputPlaceHolder="Search Comments..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Author", "Comment Content", "Responsive To", "Date", "Actions"]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data.map((comment) => (
        <tr key={comment._id} className="group hover:bg-gray-50 transition-colors">
          {/* Author */}
          <td className="px-6 py-6 border-r border-black/5 last:border-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                 <div className="absolute inset-0 bg-black rounded-full translate-x-[2px] translate-y-[2px]"></div>
                 <img
                   src={comment?.user?.avatar ? comment.user.avatar : images.userImage}
                   alt={comment?.user?.name}
                   className="relative w-12 h-12 rounded-full border-2 border-black object-cover bg-white"
                 />
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-tight text-black">{comment?.user?.name}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{comment?.user?.email?.split('@')[0]}</p>
              </div>
            </div>
          </td>

          {/* Comment Body */}
          <td className="px-6 py-6 border-r border-black/5 last:border-0 max-w-xs">
            {comment?.replyOnUser && (
              <div className="flex items-center gap-1 mb-1 bg-yellow-100 border border-black/10 w-fit px-2 py-0.5 rounded-md">
                <FiMessageSquare className="text-[10px]" />
                <span className="text-[10px] font-black uppercase">To: {comment?.replyOnUser?.name}</span>
              </div>
            )}
            <p className="text-sm font-medium text-gray-800 line-clamp-3 leading-relaxed">
              {comment?.desc}
            </p>
          </td>

          {/* In Response To */}
          <td className="px-6 py-6 border-r border-black/5 last:border-0">
            <Link 
              to={`/projectall/${comment?.post?.slug}`} 
              className="group/link flex flex-col gap-1 max-w-[200px]"
            >
              <span className="text-xs font-black text-black uppercase tracking-tight group-hover/link:underline decoration-2">
                {comment?.post?.title}
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                View Project →
              </span>
            </Link>
          </td>

          {/* Date */}
          <td className="px-6 py-6 border-r border-black/5 last:border-0 whitespace-nowrap">
            <div className="flex flex-col">
              <span className="text-sm font-black text-black">
                {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                {new Date(comment.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </td>

          {/* Actions */}
          <td className="px-6 py-6 border-r border-black/5 last:border-0">
            <div className="flex items-center gap-3">
              <button
                disabled={isLoadingUpdateCommentCheck}
                onClick={() => mutateUpdateCommentCheck({ token: userState.userInfo.token, check: !comment?.check, commentId: comment._id })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-[10px] border-2 border-black transition-all shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50
                  ${comment?.check 
                    ? "bg-amber-400 hover:bg-amber-500 text-black" 
                    : "bg-emerald-400 hover:bg-emerald-500 text-black"
                  }`}
              >
                {comment?.check ? <FiXCircle size={14} /> : <FiCheckCircle size={14} />}
                {comment?.check ? "Reject" : "Approve"}
              </button>

              <button
                disabled={isLoadingDeleteData}
                onClick={() => deleteDataHandler({ slug: comment?._id, token: userState.userInfo.token })}
                className="flex items-center justify-center p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50"
                title="Delete Comment"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Comments;
