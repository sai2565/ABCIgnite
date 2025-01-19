const classService = require('../services/classService');

exports.createClass = async (req, res, next) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await classService.getClasses();
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
}