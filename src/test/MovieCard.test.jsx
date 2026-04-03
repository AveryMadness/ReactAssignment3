import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';

const mockMovie = {
  id: 550,
  title: 'Fight Club',
  release_date: '1999-10-15',
  vote_average: 8.4,
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
};

describe('MovieCard', () => {
  test('renders movie title', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText('Fight Club')).toBeInTheDocument();
  });

  test('renders release year', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText('1999')).toBeInTheDocument();
  });

  test('renders rating', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText('8.4')).toBeInTheDocument();
  });

  test('renders poster image', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    const img = screen.getByAltText('Fight Club');
    expect(img).toBeInTheDocument();
  });

  test('renders N/A when no release date', () => {
    const movieNoDate = { ...mockMovie, release_date: '' };
    render(
      <BrowserRouter>
        <MovieCard movie={movieNoDate} />
      </BrowserRouter>
    );
    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });

  test('renders fallback when no poster', () => {
    const movieNoPoster = { ...mockMovie, poster_path: null };
    render(
      <BrowserRouter>
        <MovieCard movie={movieNoPoster} />
      </BrowserRouter>
    );
    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  test('renders N/A rating when no vote_average', () => {
    const movieNoRating = { ...mockMovie, vote_average: null };
    render(
      <BrowserRouter>
        <MovieCard movie={movieNoRating} />
      </BrowserRouter>
    );
    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });
});
