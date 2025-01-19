const { validateClass, validateBooking, validateFilter } = require('../../utils/validations');
const classRepository = require('../../repositories/classRepository');
const bookingRepository = require('../../repositories/bookingRepository');

jest.mock('../../repositories/classRepository');
jest.mock('../../repositories/bookingRepository');

describe('Validations', () => {

  describe('validateClass', () => {
    it('should throw an error if any required field is missing', () => {
      const invalidClassData = {
        name: 'Yoga Class',
        startDate: '2025-01-20',
        endDate: '2025-01-21',
        startTime: '10:00 AM',
        capacity: 20
      };

      expect(() => validateClass(invalidClassData)).toThrow('Invalid class data. Ensure all fields are correct.');
    });

    it('should throw an error if capacity is less than 1', () => {
      const invalidClassData = {
        name: 'Yoga Class',
        startDate: '2025-01-20',
        endDate: '2025-01-21',
        startTime: '10:00 AM',
        duration: 60,
        capacity: -1
      };

      expect(() => validateClass(invalidClassData)).toThrow('Capacity must be at least 1.');
    });

    it('should throw an error if end date is in the past', () => {
      const invalidClassData = {
        name: 'Yoga Class',
        startDate: '2025-01-18',
        endDate: '2025-01-18',
        startTime: '10:00 AM',
        duration: 60,
        capacity: 20
      };

      expect(() => validateClass(invalidClassData)).toThrow('End date must be in the future.');
    });

    it('should throw an error if start date is after end date', () => {
      const invalidClassData = {
        name: 'Yoga Class',
        startDate: '2025-01-22',
        endDate: '2025-01-20',
        startTime: '10:00 AM',
        duration: 60,
        capacity: 20
      };

      expect(() => validateClass(invalidClassData)).toThrow('Start date must be before end date.');
    });

    it('should not throw an error for valid class data', () => {
      const validClassData = {
        name: 'Yoga Class',
        startDate: '2025-01-20',
        endDate: '2025-01-21',
        startTime: '10:00 AM',
        duration: 60,
        capacity: 20
      };

      expect(() => validateClass(validClassData)).not.toThrow();
    });
  });

  describe('validateBooking', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error if any required field is missing', async () => {
      const invalidBookingData = {
        memberName: 'John Doe',
        classId: 'class123'
      };

      await expect(validateBooking(invalidBookingData)).rejects.toThrow('Invalid booking data. Ensure all fields are correct.');
    });

    it('should throw an error if member name is less than 3 characters', async () => {
      const invalidBookingData = {
        memberName: 'Jo',
        classId: 'class123',
        participationDate: '2025-01-22'
      };

      await expect(validateBooking(invalidBookingData)).rejects.toThrow('Member name must be atleast 3 characters.');
    });

    it('should throw an error if class ID is invalid', async () => {
      classRepository.filterClasses.mockResolvedValue([]);

      const invalidBookingData = {
        memberName: 'John Doe',
        classId: 'invalidClassId',
        participationDate: '2025-01-22'
      };

      await expect(validateBooking(invalidBookingData)).rejects.toThrow('Invalid class ID.');
    });

    it('should throw an error if class is full', async () => {
      classRepository.filterClasses.mockResolvedValue([{ id: 'class123', capacity: 2 }]);
      bookingRepository.filterBookings.mockResolvedValue([{ classId: 'class123' }, { classId: 'class123' }]);

      const invalidBookingData = {
        memberName: 'John Doe',
        classId: 'class123',
        participationDate: '2025-01-22'
      };

      await expect(validateBooking(invalidBookingData)).rejects.toThrow('Class is full.');
    });

    it('should throw an error if the member is already booked', async () => {
      classRepository.filterClasses.mockResolvedValue([{ id: 'class123', capacity: 10 }]);
      bookingRepository.filterBookings.mockResolvedValue([{ memberName: 'John Doe', classId: 'class123', participationDate: '2025-01-22' }]);

      const invalidBookingData = {
        memberName: 'John Doe',
        classId: 'class123',
        participationDate: '2025-01-22'
      };

      await expect(validateBooking(invalidBookingData)).rejects.toThrow('Member already booked for this class on the given date.');
    });

    it('should not throw an error for valid booking data', async () => {
      classRepository.filterClasses.mockResolvedValue([{ id: 'class123', capacity: 10 }]);
      bookingRepository.filterBookings.mockResolvedValue([]);

      const validBookingData = {
        memberName: 'John Doe',
        classId: 'class123',
        participationDate: '2025-01-22'
      };

      await expect(validateBooking(validBookingData)).resolves.not.toThrow();
    });
  });

  describe('validateFilter', () => {
    it('should throw an error if member name is less than 3 characters', () => {
      const invalidFilter = { memberName: 'Jo' };

      expect(() => validateFilter(invalidFilter)).toThrow('Please provide a valid member name.');
    });

    it('should throw an error if start date is after end date', () => {
      const invalidFilter = { startDate: '2025-01-23', endDate: '2025-01-22' };

      expect(() => validateFilter(invalidFilter)).toThrow('Start date must be before end date.');
    });

    it('should not throw an error for valid filter data', () => {
      const validFilter = { memberName: 'John', startDate: '2025-01-20', endDate: '2025-01-22' };

      expect(() => validateFilter(validFilter)).not.toThrow();
    });
  });
});
