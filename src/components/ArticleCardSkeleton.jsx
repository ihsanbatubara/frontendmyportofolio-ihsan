import React from "react";

const ArticleCardSkeleton = ({ className }) => {
  return (
    <div
      className={`bg-white border-2 border-black rounded-[2rem] p-6 flex flex-col shadow-[6px_6px_0px_#000] animate-pulse ${className}`}
    >
      {/* Image Skeleton */}
      <div className="w-full aspect-video bg-gray-200 rounded-2xl border-2 border-black mb-6"></div>

      {/* Content Area Skeleton */}
      <div className="flex flex-col flex-grow gap-3">
        {/* Category Skeleton */}
        <div className="w-24 h-4 bg-gray-200 rounded-md mb-2"></div>
        {/* Title Skeleton */}
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-2/3 h-8 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Footer Actions Skeleton */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="w-16 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
