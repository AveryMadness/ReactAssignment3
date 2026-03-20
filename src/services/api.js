// TMDB API configuration
const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetches top-rated movies with optional pagination
export const fetchTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch top-rated movies');
  return response.json();
};

// Searches movies by title query with pagination
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
};

// Fetches detailed information for a specific movie
export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
};

// Fetches cast and crew information for a movie
export const fetchMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error('Failed to fetch movie credits');
  return response.json();
};

// Fetches list of all movie genres
export const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error('Failed to fetch genres');
  return response.json();
};

// Fetches movies filtered by genre with pagination
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&with_genres=${genreId}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch movies by genre');
  return response.json();
};

// Helper function to generate TMDB image URLs
export const getImageUrl = (path, size = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
};
