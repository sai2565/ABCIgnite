const bookingController = require('../../controllers/bookingController');
const bookingService = require('../../services/bookingService');

jest.mock('../../services/bookingService');

describe('BookingController', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking and return 201 status', async () => {
      const booking = { memberName: 'John', classId: 1 };
      mockReq.body = booking;
      bookingService.createBooking.mockResolvedValue(booking);

      await bookingController.createBooking(mockReq, mockRes, mockNext);
      expect(bookingService.createBooking).toHaveBeenCalledWith(booking);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(booking);
    });

    it('should call next with an error if service fails', async () => {
      const error = new Error('Service error');
      bookingService.createBooking.mockRejectedValue(error);

      await bookingController.createBooking(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('searchBookings', () => {
    it('should return bookings with 200 status', async () => {
      const query = { memberName: 'John' };
      const bookings = [{ memberName: 'John', classId: 1 }];
      mockReq.query = query;
      bookingService.searchBookings.mockResolvedValue(bookings);

      await bookingController.searchBookings(mockReq, mockRes, mockNext);
      expect(bookingService.searchBookings).toHaveBeenCalledWith(query);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(bookings);
    });
  });
});
