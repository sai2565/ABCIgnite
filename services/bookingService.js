const Booking = require('../models/Booking');
const bookingRepository = require('../repositories/bookingRepository');
const { validateBooking, validateFilter } = require('../utils/validations');

class BookingService {
  async createBooking(bookingData) {
    await validateBooking(bookingData);
    const newBooking = new Booking(
      bookingData.memberName,
      bookingData.classId,
      bookingData.participationDate
    );

    return await bookingRepository.saveBooking(newBooking);
  }

  async searchBookings(query) {
    await validateFilter(query);
    return await bookingRepository.findBookingsByFilter(query);
  }
}

module.exports = new BookingService();
