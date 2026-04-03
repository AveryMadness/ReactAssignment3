import { render, screen, fireEvent } from '@testing-library/react';
import { GenreProvider } from '../context/GenreContext';
import GenreFilter from '../components/GenreFilter/GenreFilter';
import { vi } from 'vitest';

const mockGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' }
];

vi.mock('../context/GenreContext', () => ({
  useGenres: () => ({
    genres: mockGenres,
    loading: false
  }),
  GenreProvider: ({ children }) => children
}));

describe('GenreFilter', () => {
  test('renders filter label', () => {
    render(
      <GenreFilter selectedGenre={null} onGenreChange={vi.fn()} />
    );
    expect(screen.getByText('Filter by Genre:')).toBeInTheDocument();
  });

  test('renders All Genres option', () => {
    render(
      <GenreFilter selectedGenre={null} onGenreChange={vi.fn()} />
    );
    expect(screen.getByRole('option', { name: 'All Genres' })).toBeInTheDocument();
  });

  test('renders genre options', () => {
    render(
      <GenreFilter selectedGenre={null} onGenreChange={vi.fn()} />
    );
    expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Adventure' })).toBeInTheDocument();
  });

  test('calls onGenreChange when selection changes', () => {
    const mockChange = vi.fn();
    render(
      <GenreFilter selectedGenre={null} onGenreChange={mockChange} />
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '28' } });
    expect(mockChange).toHaveBeenCalledWith(28);
  });
});
