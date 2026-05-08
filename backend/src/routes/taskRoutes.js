const express = require('express');
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', verifyToken, taskController.getDashboard);
router.post('/projects/:projectId/tasks', verifyToken, taskController.createTask);
router.get('/projects/:projectId/tasks', verifyToken, taskController.getProjectTasks);
router.put('/:taskId', verifyToken, taskController.updateTask);
router.delete('/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;
