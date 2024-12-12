import React from 'react';
import { NextIcon, PrevIcon } from "@/utils/SaveIcon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  totalPages = totalPages && totalPages > 0 ? totalPages : 1;

  const pages = [...Array(totalPages).keys()].map((_, index) => index + 1);

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
    <div className="flex justify-center mt-4 gap-x-2">
      <span
        className="custom-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <NextIcon className="h-6 w-6 transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
      </span>

      {pages.map((page) => (
        <span
          key={page}
          className={`custom-button w-11 h-11 flex items-center justify-center  text-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
      <span
        className="custom-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <PrevIcon className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
      </span>
    </div>
  );
};

export default Pagination;
