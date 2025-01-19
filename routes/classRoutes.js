const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);

module.exports = router;