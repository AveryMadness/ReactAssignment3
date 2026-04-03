import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/api';
import styles from './MovieCard.module.css';

// Reusable component displaying movie poster, title, year, and rating
const MovieCard = memo(({ movie }) => {
  // Extract year from release date string (format: YYYY-MM-DD)
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {movie.poster_path ? (
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            className={styles.poster}
          />
        ) : (
          <div className={styles.noPoster}>No Image</div>
        )}
        <div className={styles.rating}>
          <span className={styles.ratingValue}>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.year}>{releaseYear}</p>
      </div>
    </Link>
  );
});

export default MovieCard;
