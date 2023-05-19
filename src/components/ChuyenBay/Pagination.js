import React from "react";

const Pagination = ({ currentPage, totalPages, fetchChuyenBays }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchChuyenBays(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchChuyenBays(currentPage + 1);
    }
  };

  const handleJumpToPage = (pageNumber) => {
    fetchChuyenBays(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleJumpToPage(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Lùi
      </button>
      {renderPageNumbers()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Tới
      </button>
    </div>
  );
};

export default Pagination;
