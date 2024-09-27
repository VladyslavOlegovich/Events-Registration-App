import styles from "./SortOptions.module.css";

export const SortOptions = ({ sortBy, order, onSortChange, onOrderChange }) => {
  return (
    <div className={styles.sortOptions}>
      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="eventDate">Event Date</option>
          <option value="title">Title</option>
          <option value="organizer">Organizer</option>
        </select>
      </label>

      <label>
        Order:
        <select value={order} onChange={(e) => onOrderChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
};
