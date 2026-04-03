import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';

describe('SearchBar', () => {
  test('renders search input', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
  });

  test('renders search button', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Test Movie' } });
    expect(input.value).toBe('Test Movie');
  });

  test('calls onSearch with query on submit', () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Search' }));
    expect(mockSearch).toHaveBeenCalledWith('Matrix');
  });

  test('calls onSearch with empty string when submitting empty query', () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);
    fireEvent.submit(screen.getByRole('button', { name: 'Search' }));
    expect(mockSearch).toHaveBeenCalledWith('');
  });

  test('shows clear button when input has value', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  test('clears input when clear is clicked', () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Test Movie' } });
    const clearButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(clearButton);
    expect(input.value).toBe('');
    expect(mockSearch).toHaveBeenCalledWith('');
  });
});
