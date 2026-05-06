import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  onPageChange,
  currentPage,
  siblingCount = 1,
  totalPageCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 mt-12 mb-8">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        type="button"
        className="p-4 border-4 border-black rounded-2xl bg-white shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_#000]"
        onClick={onPrevious}
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 md:gap-4">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <span key={`dots-${index}`} className="font-black text-2xl px-2">
                ...
              </span>
            );
          }

          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              type="button"
              className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-black text-xl md:text-2xl border-4 border-black rounded-2xl transition-all 
                ${isActive 
                  ? "bg-yellow-300 shadow-none translate-x-1 translate-y-1" 
                  : "bg-white shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === lastPage}
        type="button"
        className="p-4 border-4 border-black rounded-2xl bg-white shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_#000]"
        onClick={onNext}
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;

