import React from 'react';

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
    <div className="flex justify-center mt-4">
      <button 
        className="px-4 py-2 border mx-1"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        قبلی
      </button>
      <span className="px-4 py-2">{`صفحه ${currentPage} از ${totalPages}`}</span>
      <button 
        className="px-4 py-2 border mx-1"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
