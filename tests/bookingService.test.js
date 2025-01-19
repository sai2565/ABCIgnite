const BookingService = require('../services/bookingService');
const bookingRepository = require('../repositories/bookingRepository');
const { validateBooking, validateFilter } = require('../utils/validations');

jest.mock('../repositories/bookingRepository');
jest.mock('../utils/validations');

describe('BookingService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking when valid data is provided', async () => {
      const bookingData = { memberName: 'John', classId: 1, participationDate: '2025-02-05' };
      validateBooking.mockResolvedValue(true);
      bookingRepository.saveBooking.mockResolvedValue(bookingData);

      const result = await BookingService.createBooking(bookingData);
      expect(validateBooking).toHaveBeenCalledWith(bookingData);
      expect(bookingRepository.saveBooking).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual(bookingData);
    });

    it('should throw an error if validation fails', async () => {
      const bookingData = { memberName: '', classId: 1 };
      validateBooking.mockImplementation(() => {
        throw new Error('Invalid booking data.');
      });

      await expect(BookingService.createBooking(bookingData)).rejects.toThrow(
        'Invalid booking data.'
      );
    });
  });

  describe('searchBookings', () => {
    it('should return filtered bookings', async () => {
      const query = { memberName: 'John' };
      const bookings = [{ memberName: 'John', classId: 1 }];
      validateFilter.mockResolvedValue(true);
      bookingRepository.findBookingsByFilter.mockResolvedValue(bookings);

      const result = await BookingService.searchBookings(query);
      expect(validateFilter).toHaveBeenCalledWith(query);
      expect(bookingRepository.findBookingsByFilter).toHaveBeenCalledWith(query);
      expect(result).toEqual(bookings);
    });
  });
});
