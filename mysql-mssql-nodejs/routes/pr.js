const express = require('express')
const router = express.Router();
const prControllers = require('../controllers/prControllers');
router.get("/pr/employees", prControllers.getAllEmployees);
module.exports = router