import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  containerClassName = "",
  buttonClassName = "hover:bg-gray-100", // default hover style
  activeButtonClassName = "bg-blue-600 text-white hover:bg-blue-600", // same color maintain rakho
  showPrevNext = true,
  prevLabel = "Prev",
  nextLabel = "Next",
  maxVisiblePages = 7,
  showEllipsis = true
}) => {
  // Basic validation
  if (totalPages <= 1) return null;
  
  // Ensure currentPage is within bounds
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end of visible pages
      let startPage = Math.max(1, safeCurrentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Adjust if we're near the beginning or end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      // Always show first page
      if (startPage > 1) {
        pages.push(1);
        if (showEllipsis && startPage > 2) {
          pages.push("...");
        }
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      // Always show last page
      if (endPage < totalPages) {
        if (showEllipsis && endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
      
      // Ensure first and last pages are included if not already
      if (pages[0] !== 1) {
        pages.unshift(1);
        if (showEllipsis) pages.splice(1, 0, "...");
      }
      if (pages[pages.length - 1] !== totalPages) {
        if (showEllipsis) pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 mt-4 ${containerClassName}`}>
      {/* Previous Button */}
      {showPrevNext && (
        <button
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange(safeCurrentPage - 1)}
          className={`px-3 py-1 text-sm border rounded disabled:opacity-50 ${buttonClassName} transition-colors`}
          aria-label="Previous page"
        >
          {prevLabel}
        </button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span 
              key={`ellipsis-${index}`} 
              className="px-3 py-1 text-sm text-gray-400 select-none"
            >
              ...
            </span>
          );
        }
        
        const isActive = page === safeCurrentPage;
        
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-1 text-sm border rounded transition-colors 
              ${isActive ? activeButtonClassName : buttonClassName}
            `}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      {showPrevNext && (
        <button
          disabled={safeCurrentPage === totalPages}
          onClick={() => onPageChange(safeCurrentPage + 1)}
          className={`px-3 py-1 text-sm border rounded disabled:opacity-50 ${buttonClassName} transition-colors`}
          aria-label="Next page"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
};

export default Pagination;