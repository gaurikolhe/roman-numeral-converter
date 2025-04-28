import { toRomanNumeral } from './romanNumeral';

describe('toRomanNumeral', () => {
    test('converts 1 to I', () => {
      expect(toRomanNumeral(1)).toBe('I');
    });
    test('converts 4 to IV', () => {
      expect(toRomanNumeral(4)).toBe('IV');
    });
    test('converts 3999 to MMMCMXCIX', () => {
      expect(toRomanNumeral(3999)).toBe('MMMCMXCIX');
    });
    test('throws error for 0', () => {
      expect(() => toRomanNumeral(0)).toThrow('Input must be an integer between 1 and 3999');
    });
    test('throws error for 4000', () => {
      expect(() => toRomanNumeral(4000)).toThrow('Input must be an integer between 1 and 3999');
    });
    test('throws error for non-integer', () => {
      expect(() => toRomanNumeral(1.5)).toThrow('Input must be an integer between 1 and 3999');
    });
});