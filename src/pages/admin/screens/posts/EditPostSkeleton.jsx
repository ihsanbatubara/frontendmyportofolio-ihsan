import React from "react";
import { HiOutlineCamera } from "react-icons/hi";

const EditPostSkeleton = () => {
  return (
    <div className="animate-pulse space-y-10">
      <div>
        <div className="w-48 h-10 bg-gray-200 rounded-lg mb-8"></div>
        <div className="flex flex-col items-center">
          <div className="w-full aspect-video bg-gray-200 rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center">
            <HiOutlineCamera className="text-gray-400 w-16 h-16" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-200 rounded-md ml-1"></div>
          <div className="w-full h-14 bg-gray-200 border-2 border-black rounded-xl"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-200 rounded-md ml-1"></div>
          <div className="w-full h-14 bg-gray-200 border-2 border-black rounded-xl"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-32 h-4 bg-gray-200 rounded-md ml-1"></div>
        <div className="w-full h-14 bg-gray-200 border-2 border-black rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <div className="w-40 h-4 bg-gray-200 rounded-md ml-1"></div>
          <div className="w-full h-14 bg-gray-200 border-2 border-black rounded-xl"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-200 rounded-md ml-1"></div>
          <div className="w-full h-14 bg-gray-200 border-2 border-black rounded-xl"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-24 h-4 bg-gray-200 rounded-md ml-1"></div>
        <div className="w-full h-14 bg-gray-200 border-2 border-black rounded-xl"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-48 h-4 bg-gray-200 rounded-md ml-1"></div>
        <div className="w-full h-[400px] bg-gray-200 border-2 border-black rounded-xl"></div>
      </div>

      <div className="w-full h-16 bg-gray-300 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)]"></div>
    </div>
  );
};

export default EditPostSkeleton;
