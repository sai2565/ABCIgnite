const Class = require('../models/Class');
const classRepository = require('../repositories/classRepository');
const { validateClass } = require('../utils/validations');

class ClassService {
  async createClass(classData) {
    validateClass(classData);
    const newClass = new Class(
      classData.name,
      classData.startDate,
      classData.endDate,
      classData.startTime,
      classData.duration,
      classData.capacity
    );
    return await classRepository.saveClass(newClass);
  }

  async getClasses() {
    return await classRepository.getAllClasses();
  }
}

module.exports = new ClassService();