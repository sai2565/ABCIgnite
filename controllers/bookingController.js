const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

exports.searchBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.searchBookings(req.query);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};