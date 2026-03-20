import { useState } from 'react';
import styles from './SearchBar.module.css';

// Search bar component with text input and clear functionality
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  // Clear search input and reset results
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={styles.input}
        />
        {query && (
          <button type="button" onClick={handleClear} className={styles.clearButton}>
            &times;
          </button>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
