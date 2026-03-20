import { createContext, useContext, useState, useEffect } from 'react';
import { fetchGenres } from '../services/api';

// Create context for global genre state management
const GenreContext = createContext();

// Custom hook to access genre context in components
export const useGenres = () => useContext(GenreContext);

// Provider component that fetches and stores genre data
export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error loading genres:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres, loading }}>
      {children}
    </GenreContext.Provider>
  );
};
