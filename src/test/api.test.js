import { vi } from 'vitest';
import { getImageUrl } from '../services/api';

describe('API Service', () => {
  describe('getImageUrl', () => {
    test('returns null when path is null', () => {
      expect(getImageUrl(null)).toBeNull();
    });

    test('returns null when path is undefined', () => {
      expect(getImageUrl(undefined)).toBeNull();
    });

    test('returns null when path is empty string', () => {
      expect(getImageUrl('')).toBeNull();
    });

    test('returns default sized URL when only path provided', () => {
      expect(getImageUrl('/abc123.jpg')).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
    });

    test('returns custom sized URL when size provided', () => {
      expect(getImageUrl('/abc123.jpg', 'w200')).toBe('https://image.tmdb.org/t/p/w200/abc123.jpg');
    });

    test('returns different sizes correctly', () => {
      expect(getImageUrl('/poster.jpg', 'w185')).toBe('https://image.tmdb.org/t/p/w185/poster.jpg');
      expect(getImageUrl('/backdrop.jpg', 'w1280')).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg');
    });
  });
});
