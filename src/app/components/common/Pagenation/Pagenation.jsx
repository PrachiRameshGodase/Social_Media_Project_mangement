import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Pagination = ({
  itemList,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setSearchCall,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const getTotalPages = () => (itemList ? Math.ceil(itemList / itemsPerPage) : 1);
  const totalPages = getTotalPages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchCall((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/, '');
    setInputPage(value === '' ? '' : Number(value));
  };

  const handleInputBlur = () => {
    if (inputPage && inputPage !== currentPage) {
      handlePageChange(inputPage);
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 px-1 sm:px-2 py-2">
      <div className="flex gap-2">
        <button
          className={`w-[60px] flex items-center justify-center h-[29px] sm:w-[80px] sm:h-[39px] text-[14px] rounded-md border ${
            currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'
          }`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <input
          type="text"
          className="w-[30px] sm:w-[30px] h-[29px] sm:h-[37px] text-center border rounded-md"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        
        <button
          className={`w-[60px] flex items-center justify-center h-[29px] sm:w-[80px] sm:h-[39px] text-[14px] rounded-md border ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black hover:bg-gray-300'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next<ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
