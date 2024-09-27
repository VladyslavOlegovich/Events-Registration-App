import styles from "./Pagination.module.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  if (totalPages <= 1) return null;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? styles.active : ""}
        >
          {i}
        </button>
      );
    } else if (i === 2 || i === totalPages - 1) {
      pages.push(<span key={i}>...</span>);
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
      {pages}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};
