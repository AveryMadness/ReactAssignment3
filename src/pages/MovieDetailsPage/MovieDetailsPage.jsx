import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

// Route component for movie details page
const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Navigate back to home
  const handleClose = () => {
    navigate('/');
  };

  // Redirect if no movie ID provided
  if (!id) {
    navigate('/');
    return null;
  }

  return <MovieDetails movieId={Number(id)} onClose={handleClose} />;
};

export default MovieDetailsPage;
