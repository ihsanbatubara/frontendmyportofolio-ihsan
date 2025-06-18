import React from 'react';

const ArticleCardSkeleton = () => {
    return (
        <div className="items animate-pulse">
            <div className="left">
                <div className="img-project bg-gray-300 rounded-lg w-64 h-40" />
            </div>
            <div className="rights mt-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-300 rounded w-full mb-4" />
                <div className="flex gap-3">
                    <div className="h-10 w-20 bg-gray-300 rounded" />
                    <div className="h-10 w-20 bg-gray-300 rounded" />
                    <div className="h-10 w-20 bg-gray-300 rounded" />
                </div>
            </div>
        </div>
    );
};

export default ArticleCardSkeleton;
