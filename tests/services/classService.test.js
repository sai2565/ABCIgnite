const ClassService = require('../../services/classService');
const classRepository = require('../../repositories/classRepository');
const { validateClass } = require('../../utils/validations');

jest.mock('../../repositories/classRepository');
jest.mock('../../utils/validations');

describe('ClassService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createClass', () => {
    it('should create a new class when valid data is provided', async () => {
      const classData = {
        name: 'Yoga',
        startDate: '2025-02-01',
        endDate: '2025-02-28',
        startTime: '10:00 AM',
        duration: 60,
        capacity: 10,
      };

      validateClass.mockReturnValue(true);
      classRepository.saveClass.mockResolvedValue(classData);

      const result = await ClassService.createClass(classData);
      expect(validateClass).toHaveBeenCalledWith(classData);
      expect(classRepository.saveClass).toHaveBeenCalled();
      expect(result).toEqual(classData);
    });

    it('should throw an error when validation fails', async () => {
      const classData = { name: '', startDate: '2025-02-01' };
      validateClass.mockImplementation(() => {
        throw new Error('Invalid class data.');
      });

      await expect(ClassService.createClass(classData)).rejects.toThrow(
        'Invalid class data.'
      );
      expect(validateClass).toHaveBeenCalledWith(classData);
      expect(classRepository.saveClass).not.toHaveBeenCalled();
    });
  });

  describe('getClasses', () => {
    it('should return all classes', async () => {
      const classes = [
        { id: 1, name: 'Yoga', capacity: 10 },
        { id: 2, name: 'Dance', capacity: 15 },
      ];
      classRepository.getAllClasses.mockResolvedValue(classes);

      const result = await ClassService.getClasses();
      expect(classRepository.getAllClasses).toHaveBeenCalled();
      expect(result).toEqual(classes);
    });

    it('should return an empty array if no classes exist', async () => {
      classRepository.getAllClasses.mockResolvedValue([]);

      const result = await ClassService.getClasses();
      expect(classRepository.getAllClasses).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
