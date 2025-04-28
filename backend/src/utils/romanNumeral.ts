/**
 * Converts an integer to a Roman numeral.
 * @param num - The integer to convert (must be between 1 and 3999).
 * @returns The Roman numeral representation as a string.
 * @throws Error if the input is not an integer or is out of the valid range (1–3999).
 */

export function toRomanNumeral(num: number): string {
    // Validate the input: Ensure it's an integer and within the valid range
    if (!Number.isInteger(num) || num < 1 || num > 3999) {
      throw new Error('Input must be an integer between 1 and 3999');
    }

    // Define the mapping of integer values to Roman numerals, ordered from largest to smallest
    const romanMap: { value: number; numeral: string }[] = [
      { value: 1000, numeral: 'M' },
      { value: 900, numeral: 'CM' },
      { value: 500, numeral: 'D' },
      { value: 400, numeral: 'CD' },
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];

    // Initialize the result string
    let result = '';

    // Iterate through the Roman numeral mappings
    for (const { value, numeral } of romanMap) {
      // Repeatedly subtract the largest possible value and append the corresponding numeral
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    // Return the final Roman numeral string
    return result;
}