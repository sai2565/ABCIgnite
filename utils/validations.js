const classRepository = require('../repositories/classRepository');
const bookingRepository = require('../repositories/bookingRepository');

exports.validateClass = (classData) => {
    const { name, startDate, endDate, startTime, duration, capacity } = classData;
  
    if (!name || !startDate || !endDate || !startTime || !duration || !capacity) {
        throw new Error('Invalid class data. Ensure all fields are correct.');
    }

    if(capacity < 1){
        throw new Error('Capacity must be at least 1.');
    }
    if (new Date(endDate) <= new Date()) {
        throw new Error('End date must be in the future.');
    }

    if (new Date(startDate) > new Date(endDate)) {
        throw new Error('Start date must be before end date.');
    }
};

exports.validateBooking = async (bookingData) => {
    const { memberName, classId, participationDate } = bookingData;
    if (!memberName || !classId || !participationDate) {
        throw new Error('Invalid booking data. Ensure all fields are correct.');
    }
    if(memberName.length < 3){
        throw new Error('Member name must be atleast 3 characters.');
    }
    const classes = await classRepository.filterClasses({ id: classId });
    if (classes.length === 0) {
        throw new Error('Invalid class ID.');
    }

    const classData = classes[0];
    const bookings = await bookingRepository.filterBookings({ classId : classId, participationDate: new Date(participationDate).toISOString()});
    if (bookings.length >= classData.capacity) {
        throw new Error('Class is full.');
    }

    bookings.forEach((booking) => {
        if (booking.memberName === memberName) {
            throw new Error('Member already booked for this class on the given date.');
        }
    });

    if (new Date(participationDate)<= new Date()) {
        throw new Error('Participation date must be in the future.');
    }

    if (new Date(participationDate) < new Date(classData.startDate) || new Date(participationDate) > new Date(classData.endDate)) {
        throw new Error('Participation date must be within class date range.');
    }
};

exports.validateFilter = (filter) => {
    if(filter.memberName && filter.memberName.length < 3){
        throw new Error('Please provide a valid member name.');

    }
    if (filter.startDate && filter.endDate && new Date(filter.startDate) > new Date(filter.endDate)) {
        throw new Error('Start date must be before end date.');
    }
};
