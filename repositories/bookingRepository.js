const { readDataFromFile, writeDataToFile } = require('../utils/fileUtils');
const classRepository = require('../repositories/classRepository');
const filePath = './data/bookings.json';

const getAllBookings = async () => await readDataFromFile(filePath);

const saveBooking = async (newBooking) => {
    const bookings = await getAllBookings();
    bookings.push(newBooking);
    await writeDataToFile(filePath, bookings);
    return newBooking;
};

const filterBookings = async (filter) => {
    const bookings = await getAllBookings();
    return bookings.filter((b) => {
        return Object.keys(filter).every((key) => {
            return b[key] === filter[key];
        });
    });
}

const findBookingsByFilter = async ({ memberName, startDate, endDate }) => {
    const bookings = await getAllBookings();
    const filteredBookings =  bookings.filter((b) => {
      const isMemberMatch = !memberName || b.memberName === memberName;
      const isDateInRange =
        (!startDate || new Date(b.participationDate) >= new Date(startDate)) &&
        (!endDate || new Date(b.participationDate) <= new Date(endDate));
      return isMemberMatch && isDateInRange;
    });

    const classIds = new Set(filteredBookings.map((b) => b.classId));
    const classes = await classRepository.getClasses(Array.from(classIds));
    const transformedBookings =  filteredBookings.map((b) => {
        const classInstance = classes.find((c) => c.id === b.classId);
        b.className = classInstance.name;
        b.classStartTime = classInstance.startTime;
        b.classStartDate = classInstance.startDate;
        b.classEndDate = classInstance.endDate;
        return b;
    });

    return transformedBookings;
  }

module.exports = { getAllBookings, saveBooking, filterBookings, findBookingsByFilter };
