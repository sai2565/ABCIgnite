const classRepository = require('../repositories/classRepository');
const bookingRepository = require('../repositories/bookingRepository');
const {isValidDate} = require('../utils/dateUtils');

exports.validateClass = (classData) => {
    const { name, startDate, endDate, startTime, duration, capacity } = classData;
  
    if (!name || !startDate || !endDate || !startTime || !duration || !capacity) {
        const error = new Error('Invalid class data. Ensure all fields are correct.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    if (name.length < 3) {
        const error = new Error('Name must be atleast 3 characters.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    if(!isValidDate(startDate)) {
        const error = new Error('Please provide a valid start date.');
        error.type = 'VALIDATION_FAILED';
        throw error
    }

    if(!isValidDate(endDate)) {
        const error = new Error('Please provide a valid end date.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    if (capacity < 1) {
        const error = new Error('Capacity must be at least 1.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }
    if (new Date(endDate) <= new Date()) {
        const error = new Error('End date must be in the future.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    if (new Date(startDate) > new Date(endDate)) {
        const error = new Error('Start date must be before end date.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }
};

exports.validateBooking = async (bookingData) => {
    const { memberName, classId, participationDate } = bookingData;
    if (!memberName || !classId || !participationDate) {
        const error = new Error('Invalid booking data. Ensure all fields are correct.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }
    if (memberName.length < 3) {
        const error = new Error('Member name must be atleast 3 characters.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    if(!isValidDate(participationDate)) {
        const error = new Error('Please provide a valid participation date.');
        error.type = 'VALIDATION_FAILED';
        throw error
    }

    const classes = await classRepository.filterClasses({ id: classId });
    if (classes.length === 0) {
        const error = new Error('Invalid class ID.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    const classData = classes[0];
    const bookings = await bookingRepository.filterBookings({ classId: classId, participationDate: participationDate});
    if (bookings.length >= classData.capacity) {
        const error = new Error('Class is full.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    bookings.forEach((booking) => {
        if (booking.memberName === memberName) {
            const error = new Error('Member already booked for this class on the given date.');
            error.type = 'VALIDATION_FAILED';
            throw error;
        }
    });

    if (new Date(participationDate) <= new Date()) {
        const error = new Error('Participation date must be in the future.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }

    if (new Date(participationDate) < new Date(classData.startDate) || new Date(participationDate) > new Date(classData.endDate)) {
        const error = new Error('Participation date must be within class date range.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }
};

exports.validateFilter = (filter) => {
    if (filter.memberName && filter.memberName.length < 3) {
        const error = new Error('Please provide a valid member name.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }
    if (filter.startDate && filter.endDate && new Date(filter.startDate) > new Date(filter.endDate)) {
        const error = new Error('Start date must be before end date.');
        error.type = 'VALIDATION_FAILED';
        throw error;
    }
};