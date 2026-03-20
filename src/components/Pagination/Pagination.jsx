import styles from './Pagination.module.css';

// Pagination controls with page number buttons and navigation
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render if only one page exists
  if (totalPages <= 1) return null;

  // Generates array of visible page numbers with ellipsis for gaps
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
      >
        Previous
      </button>

      <div className={styles.pages}>
        {/* Show first page and ellipsis if needed */}
        {pageNumbers[0] > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className={styles.pageButton}>
              1
            </button>
            {pageNumbers[0] > 2 && <span className={styles.ellipsis}>...</span>}
          </>
        )}

        {/* Render visible page numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
          >
            {page}
          </button>
        ))}

        {/* Show last page and ellipsis if needed */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className={styles.ellipsis}>...</span>
            )}
            <button onClick={() => onPageChange(totalPages)} className={styles.pageButton}>
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
