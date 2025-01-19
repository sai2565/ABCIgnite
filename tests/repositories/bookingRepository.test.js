const bookingRepository = require('../../repositories/bookingRepository');
const classRepository = require('../../repositories/classRepository');
const fileUtils = require('../../utils/fileUtils');
const Booking = require('../../models/Booking');
const Class = require('../../models/Class');

jest.mock('../../utils/fileUtils');

describe('Booking Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBookings', () => {
        it('should return all bookings from the file', async () => {
            const mockBookings = [
                { memberName: 'John Doe', classId: '1', participationDate: '2025-02-01' },
                { memberName: 'Jane Doe', classId: '2', participationDate: '2025-02-02' }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockBookings);

            const bookings = await bookingRepository.getAllBookings();
            expect(fileUtils.readDataFromFile).toHaveBeenCalledWith('./data/bookings.json');
            expect(bookings).toEqual(mockBookings);
        });
    });

    describe('saveBooking', () => {
        it('should save a new booking to the file', async () => {
            const newBooking = new Booking('John Doe', '1', '2025-02-01');
            const mockBookings = [];
            fileUtils.readDataFromFile.mockResolvedValue(mockBookings);
            fileUtils.writeDataToFile.mockResolvedValue();

            const result = await bookingRepository.saveBooking(newBooking);
            expect(fileUtils.readDataFromFile).toHaveBeenCalledWith('./data/bookings.json');
            expect(fileUtils.writeDataToFile).toHaveBeenCalledWith('./data/bookings.json', [newBooking]);
            expect(result).toEqual(newBooking);
        });
    });

    describe('filterBookings', () => {
        it('should return bookings matching the filter criteria', async () => {
            const mockBookings = [
                { memberName: 'John Doe', classId: '1', participationDate: '2025-02-01' },
                { memberName: 'Jane Doe', classId: '2', participationDate: '2025-02-02' }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockBookings);

            const result = await bookingRepository.filterBookings({ memberName: 'John Doe' });
            expect(result).toEqual([mockBookings[0]]);
        });

        it('should return an empty array if no bookings match the filter', async () => {
            const mockBookings = [
                { memberName: 'John Doe', classId: '1', participationDate: '2025-02-01' }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockBookings);

            const result = await bookingRepository.filterBookings({ memberName: 'Jane Doe' });
            expect(result).toEqual([]);
        });
    });

    describe('findBookingsByFilter', () => {
        it('should return bookings with class details matching the filter criteria', async () => {
            const mockBookings = [
                { memberName: 'John Doe', classId: '1', participationDate: '2025-02-01' }
            ];
            const mockClasses = [
                { id: '1', name: 'Yoga', startTime: '10:00 AM', startDate: '2025-02-01', endDate: '2025-02-28' }
            ];

            fileUtils.readDataFromFile.mockResolvedValueOnce(mockBookings).mockResolvedValueOnce(mockClasses);
            classRepository.getClasses = jest.fn().mockResolvedValue(mockClasses);

            const result = await bookingRepository.findBookingsByFilter({ memberName: 'John Doe' });
            expect(result).toEqual([
                {
                    ...mockBookings[0],
                    className: 'Yoga',
                    classStartTime: '10:00 AM',
                    classStartDate: '2025-02-01',
                    classEndDate: '2025-02-28'
                }
            ]);
        });

        it('should return an empty array if no bookings match the filter criteria', async () => {
            fileUtils.readDataFromFile.mockResolvedValue([]);
            const result = await bookingRepository.findBookingsByFilter({ memberName: 'Nonexistent' });
            expect(result).toEqual([]);
        });
    });
});