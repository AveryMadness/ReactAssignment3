import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination', () => {
  test('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when totalPages is 0', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders Previous and Next buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('Previous button is disabled on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  test('Next button is disabled on last page', () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  test('calls onPageChange with previous page when Previous is clicked', () => {
    const mockChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(mockChange).toHaveBeenCalledWith(4);
  });

  test('calls onPageChange with next page when Next is clicked', () => {
    const mockChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(mockChange).toHaveBeenCalledWith(6);
  });

  test('renders page number buttons', () => {
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  test('calls onPageChange when page number is clicked', () => {
    const mockChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={mockChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    expect(mockChange).toHaveBeenCalledWith(5);
  });

  test('highlights current page', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />
    );
    const currentPageButton = screen.getByRole('button', { name: '5' });
    expect(currentPageButton.className).toContain('active');
  });
});
