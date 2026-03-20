import { useGenres } from '../../context/GenreContext';
import styles from './GenreFilter.module.css';

// Dropdown component for filtering movies by genre
const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const { genres, loading } = useGenres();

  if (loading) {
    return <div className={styles.loading}>Loading genres...</div>;
  }

  return (
    <div className={styles.filterContainer}>
      <label className={styles.label}>Filter by Genre:</label>
      <select
        value={selectedGenre || ''}
        onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : null)}
        className={styles.select}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
