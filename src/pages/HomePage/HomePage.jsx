import { useState, useEffect, useCallback } from 'react';
import { fetchTopRatedMovies, searchMovies, fetchMoviesByGenre } from '../../services/api';
import MovieCard from '../../components/MovieCard/MovieCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Pagination from '../../components/Pagination/Pagination';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import styles from './HomePage.module.css';

// Main page displaying movie list with search, filter, and pagination
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Load movies based on current filters and page
  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data;

      // Determine which API to call based on active filter
      if (searchQuery) {
        data = await searchMovies(searchQuery, currentPage);
      } else if (selectedGenre) {
        data = await fetchMoviesByGenre(selectedGenre, currentPage);
      } else {
        data = await fetchTopRatedMovies(currentPage);
      }

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedGenre]);

  // Reload movies when dependencies change
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre]);

  // Handlers for search and filter
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery('');
  };

  // Update page and scroll to top
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open movie details modal
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Movie Portal</h1>
        <p className={styles.tagline}>Discover top-rated movies</p>
      </header>

      <main className={styles.main}>
        <SearchBar onSearch={handleSearch} />
        <GenreFilter 
          selectedGenre={selectedGenre} 
          onGenreChange={handleGenreChange} 
        />

        {/* Loading state */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading movies...</p>
          </div>
        )}

        {/* Error state with retry button */}
        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button onClick={loadMovies} className={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {/* Movie grid or empty state */}
        {!loading && !error && (
          <>
            {movies.length === 0 ? (
              <div className={styles.noResults}>
                <p>No movies found. Try a different search or filter.</p>
              </div>
            ) : (
              <>
                <div className={styles.movieGrid}>
                  {movies.map((movie) => (
                    <div 
                      key={movie.id} 
                      onClick={() => handleMovieClick(movie.id)}
                    >
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.min(totalPages, 500)}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </main>

      {/* Movie details portal */}
      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default HomePage;
