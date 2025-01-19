const bookingRepository = require('../../repositories/bookingRepository');
const classRepository = require('../../repositories/classRepository');
const fileUtils = require('../../utils/fileUtils');
const Class = require('../../models/Class');

jest.mock('../../utils/fileUtils');

describe('Class Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllClasses', () => {
        it('should return all classes from the file', async () => {
            const mockClasses = [
                { id: '1', name: 'Yoga', capacity: 10 },
                { id: '2', name: 'Dance', capacity: 15 }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockClasses);

            const classes = await classRepository.getAllClasses();
            expect(fileUtils.readDataFromFile).toHaveBeenCalledWith('./data/classes.json');
            expect(classes).toEqual(mockClasses);
        });
    });

    describe('getClasses', () => {
        it('should return classes matching the given IDs', async () => {
            const mockClasses = [
                { id: '1', name: 'Yoga', capacity: 10 },
                { id: '2', name: 'Dance', capacity: 15 }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockClasses);

            const result = await classRepository.getClasses(['1']);
            expect(result).toEqual([mockClasses[0]]);
        });

        it('should return an empty array if no classes match the given IDs', async () => {
            const mockClasses = [
                { id: '1', name: 'Yoga', capacity: 10 }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockClasses);

            const result = await classRepository.getClasses(['2']);
            expect(result).toEqual([]);
        });
    });

    describe('saveClass', () => {
        it('should save a new class to the file', async () => {
            const newClass = new Class('Yoga', '2025-02-01', '2025-02-28', '10:00 AM', 60, 10);
            const mockClasses = [];
            fileUtils.readDataFromFile.mockResolvedValue(mockClasses);
            fileUtils.writeDataToFile.mockResolvedValue();

            const result = await classRepository.saveClass(newClass);
            expect(fileUtils.readDataFromFile).toHaveBeenCalledWith('./data/classes.json');
            expect(fileUtils.writeDataToFile).toHaveBeenCalledWith('./data/classes.json', [newClass]);
            expect(result).toEqual(newClass);
        });
    });

    describe('filterClasses', () => {
        it('should return classes matching the filter criteria', async () => {
            const mockClasses = [
                { id: '1', name: 'Yoga', capacity: 10 },
                { id: '2', name: 'Dance', capacity: 15 }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockClasses);

            const result = await classRepository.filterClasses({ name: 'Yoga' });
            expect(result).toEqual([mockClasses[0]]);
        });

        it('should return an empty array if no classes match the filter criteria', async () => {
            const mockClasses = [
                { id: '1', name: 'Yoga', capacity: 10 }
            ];
            fileUtils.readDataFromFile.mockResolvedValue(mockClasses);

            const result = await classRepository.filterClasses({ name: 'Dance' });
            expect(result).toEqual([]);
        });
    });
});
