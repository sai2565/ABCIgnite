const classController = require('../controllers/classController');
const classService = require('../services/classService');

jest.mock('../services/classService');

describe('ClassController', () => {
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

  describe('createClass', () => {
    it('should create a new class and return 201 status', async () => {
      const newClass = { id: 1, name: 'Yoga' };
      mockReq.body = newClass;
      classService.createClass.mockResolvedValue(newClass);

      await classController.createClass(mockReq, mockRes, mockNext);
      expect(classService.createClass).toHaveBeenCalledWith(newClass);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(newClass);
    });

    it('should call next with an error if service fails', async () => {
      const error = new Error('Service error');
      mockReq.body = { name: 'Yoga' };
      classService.createClass.mockRejectedValue(error);

      await classController.createClass(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllClasses', () => {
    it('should return all classes with 200 status', async () => {
      const classes = [{ id: 1, name: 'Yoga' }];
      classService.getClasses.mockResolvedValue(classes);

      await classController.getAllClasses(mockReq, mockRes, mockNext);
      expect(classService.getClasses).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(classes);
    });

    it('should call next with an error if service fails', async () => {
      const error = new Error('Service error');
      classService.getClasses.mockRejectedValue(error);

      await classController.getAllClasses(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
