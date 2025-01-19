const { isValidDate } = require('../../utils/dateUtils');

describe('isValidDate', () => {
    it('should return true for a valid date string in YYYY-MM-DD format', () => {
        const result = isValidDate('2025-02-28');
        expect(result).toBe(true);
    });

    it('should return true for a valid date string with time', () => {
        const result = isValidDate('2025-02-28T10:00:00Z');
        expect(result).toBe(true);
    });

    it('should return false for an invalid date string', () => {
        const result = isValidDate('InvalidDate');
        expect(result).toBe(false);
    });

    it('should return false for an empty string', () => {
        const result = isValidDate('');
        expect(result).toBe(false);
    });

    it('should return false for a whitespace string', () => {
        const result = isValidDate('   ');
        expect(result).toBe(false);
    });

    it('should return false for a valid date with an invalid format', () => {
        const result = isValidDate('28-02-2025'); // DD-MM-YYYY format, invalid for Date()
        expect(result).toBe(false);
    });

    it('should return true for a valid date in ISO 8601 format', () => {
        const result = isValidDate('2025-02-28T00:00:00.000Z');
        expect(result).toBe(true);
    });

    it('should return false for a non-string input like a number', () => {
        const result = isValidDate(20250228);
        expect(result).toBe(false);
    });

    it('should return false for a null value', () => {
        const result = isValidDate(null);
        expect(result).toBe(false);
    });

    it('should return false for an undefined value', () => {
        const result = isValidDate(undefined);
        expect(result).toBe(false);
    });
});
