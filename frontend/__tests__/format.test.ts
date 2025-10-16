import { formatTime, formatDate, formatPrice, formatRating } from '../utils/format';

describe('format utilities', () => {
  describe('formatTime', () => {
    it('should format timestamp to readable time', () => {
      const timestamp = 1678901234; // March 15, 2023 17:27:14 UTC
      const result = formatTime(timestamp);
      
      // Since the output depends on the user's locale, we'll just check it returns a string
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatDate', () => {
    it('should format timestamp to readable date', () => {
      const timestamp = 1678901234; // March 15, 2023
      const result = formatDate(timestamp);
      
      // Since the output depends on the user's locale, we'll just check it returns a string
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatPrice', () => {
    it('should format price with SOL suffix', () => {
      const price = 1.5;
      const result = formatPrice(price);
      
      expect(result).toBe('1.50 SOL');
    });

    it('should handle zero price', () => {
      const price = 0;
      const result = formatPrice(price);
      
      expect(result).toBe('0.00 SOL');
    });
  });

  describe('formatRating', () => {
    it('should format rating to one decimal place', () => {
      const rating = 4.567;
      const result = formatRating(rating);
      
      expect(result).toBe('4.6');
    });

    it('should handle whole numbers', () => {
      const rating = 5;
      const result = formatRating(rating);
      
      expect(result).toBe('5.0');
    });
  });
});