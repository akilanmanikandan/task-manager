const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', verifyToken, requireRole('admin'), userController.getAllUsers);
router.get('/me', verifyToken, userController.getCurrentUser);

module.exports = router;
