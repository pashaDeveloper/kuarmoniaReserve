import React from 'react';
import {NextIcon,PrevIcon} from "@/utils/SaveIcon"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4 dark:text-white">
         <span className="line-clamp-1 cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70" 
                onClick={handlePrevious}
                disabled={currentPage === 1}
                    >
 
 <NextIcon 
              className="h-6 w-6 transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1"
 />

      </span>
      <span className="px-4 py-2">{`صفحه ${currentPage} از ${totalPages?totalPages :1}`}</span>
      <span className="line-clamp-1 cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70" 
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
 <PrevIcon className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
 </span>
 </div>
  );
};

export default Pagination;
