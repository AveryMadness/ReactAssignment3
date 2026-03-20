import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, getImageUrl } from '../../services/api';
import styles from './MovieDetails.module.css';

// Movie details modal displayed via React Portal
const MovieDetails = ({ movieId, onClose }) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details and credits when movieId changes
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both in parallel for better performance
        const [movieData, creditsData] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieCredits(movieId)
        ]);
        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [movieId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close modal when clicking outside (on overlay)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Navigate back to home page
  const handleNavigateHome = () => {
    navigate('/');
  };

  // Derive display values from API data
  const cast = credits?.cast?.slice(0, 6) || [];
  const genres = movie?.genres?.map(g => g.name).join(', ') || 'N/A';
  const releaseYear = movie?.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Render modal via portal to document.body
  const content = (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        {loading && <div className={styles.loading}>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
        
        {!loading && !error && movie && (
          <>
            {/* Header section with backdrop and title */}
            <div className={styles.header}>
              {movie.backdrop_path && (
                <div className={styles.backdrop}>
                  <img 
                    src={getImageUrl(movie.backdrop_path, 'w1280')} 
                    alt={movie.title}
                  />
                  <div className={styles.backdropOverlay}></div>
                </div>
              )}
              <div className={styles.headerContent}>
                <h1 className={styles.title}>{movie.title}</h1>
                <div className={styles.meta}>
                  <span className={styles.year}>{releaseYear}</span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.genres}>{genres}</span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.rating}>
                    <span className={styles.ratingStar}>&#9733;</span>
                    {movie.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Content section with poster and details */}
            <div className={styles.content}>
              <div className={styles.posterSection}>
                {movie.poster_path && (
                  <img 
                    src={getImageUrl(movie.poster_path)} 
                    alt={movie.title}
                    className={styles.poster}
                  />
                )}
              </div>

              <div className={styles.detailsSection}>
                {/* Plot summary section */}
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Plot Summary</h2>
                  <p className={styles.overview}>
                    {movie.overview || 'No plot summary available.'}
                  </p>
                </section>

                {/* Cast section with photos */}
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Cast</h2>
                  {cast.length > 0 ? (
                    <div className={styles.castGrid}>
                      {cast.map((person) => (
                        <div key={person.id} className={styles.castCard}>
                          {person.profile_path ? (
                            <img 
                              src={getImageUrl(person.profile_path, 'w185')}
                              alt={person.name}
                              className={styles.castPhoto}
                            />
                          ) : (
                            <div className={styles.noPhoto}>No Photo</div>
                          )}
                          <p className={styles.castName}>{person.name}</p>
                          <p className={styles.castCharacter}>{person.character}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noCast}>No cast information available.</p>
                  )}
                </section>

                <button className={styles.backButton} onClick={handleNavigateHome}>
                  Back to Home
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default MovieDetails;
