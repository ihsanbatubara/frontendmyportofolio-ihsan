import React from 'react';

const FeaturedProjectCardSkeleton = () => {
    return (
        <div className="w-full bg-white border-2 border-black rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-[6px_6px_0px_#000] md:shadow-[12px_12px_0px_#000] animate-pulse mb-20">
            {/* Image Container Skeleton */}
            <div className="w-full md:w-1/2 aspect-video bg-gray-200 rounded-2xl border-2 border-black"></div>

            {/* Content Area Skeleton */}
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                {/* Category Skeleton */}
                <div className="w-40 h-6 bg-gray-200 rounded-md mb-4"></div>
                
                {/* Title Skeleton */}
                <div className="w-full h-12 bg-gray-200 rounded-lg mb-2"></div>
                <div className="w-3/4 h-12 bg-gray-200 rounded-lg mb-6"></div>

                {/* Caption Skeleton */}
                <div className="space-y-3 mb-10">
                    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded-md"></div>
                </div>

                {/* Actions Skeleton */}
                <div className="flex items-center gap-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-40 h-14 bg-gray-200 rounded-2xl border-2 border-black"></div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjectCardSkeleton;
