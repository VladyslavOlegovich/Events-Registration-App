import { useState } from "react";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search events by title"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <span className={styles.clearIcon} onClick={handleClearSearch}>
          &times;
        </span>
      )}
      <button type="submit">Search</button>
    </form>
  );
};
