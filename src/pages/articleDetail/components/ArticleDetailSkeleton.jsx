import React from "react";
import { BiImageAlt } from "react-icons/bi";

const ArticleDetailSkeleton = () => {
  return (
    <section className="bg-[#f8f8f8] min-h-screen py-12 px-6 animate-pulse">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Main Content Skeleton */}
        <article className="flex-1 bg-white border-4 border-black rounded-[40px] p-6 md:p-12 shadow-[16px_16px_0px_rgba(0,0,0,0.1)] w-full">
          {/* Breadcrumbs Placeholder */}
          <div className="w-48 h-4 bg-gray-200 rounded-md mb-8"></div>

          {/* Main Project Image Placeholder */}
          <div className="relative mb-10 w-full aspect-video bg-gray-200 rounded-[32px] border-4 border-black flex items-center justify-center">
             <BiImageAlt className="text-6xl text-gray-400" />
          </div>

          {/* Category Tags Placeholder */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="w-24 h-8 bg-gray-200 rounded-full border-2 border-black"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-full border-2 border-black"></div>
          </div>

          {/* Project Title Placeholder */}
          <div className="w-full h-12 bg-gray-200 rounded-lg mb-4"></div>
          <div className="w-3/4 h-12 bg-gray-200 rounded-lg mb-10"></div>

          {/* Content Placeholder */}
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded-md"></div>
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded-md"></div>
          </div>

          {/* Comments Section Divider Placeholder */}
          <div className="mt-20 border-t-4 border-black pt-16">
             <div className="w-64 h-8 bg-gray-200 rounded-lg mb-10"></div>
             <div className="w-full h-32 bg-gray-100 rounded-2xl border-2 border-black"></div>
          </div>
        </article>

        {/* Sidebar Skeleton */}
        <aside className="w-full lg:w-80 flex flex-col gap-10">
          {/* Share Card Placeholder */}
          <div className="bg-white border-4 border-black rounded-[32px] p-8 shadow-[8px_8px_0px_#000]">
            <div className="w-32 h-6 bg-gray-200 rounded-md mb-6 border-b-2 border-black pb-2"></div>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Suggested Posts Card Placeholder */}
          <div className="bg-white border-4 border-black rounded-[32px] p-4 shadow-[8px_8px_0px_#000]">
             <div className="w-40 h-6 bg-gray-200 rounded-md mb-6"></div>
             <div className="space-y-5">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl border-2 border-black shrink-0"></div>
                    <div className="flex-1 space-y-2">
                       <div className="w-full h-3 bg-gray-200 rounded-md"></div>
                       <div className="w-2/3 h-3 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ArticleDetailSkeleton;
