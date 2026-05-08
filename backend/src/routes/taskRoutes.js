const express = require('express');
const taskController = require('../controllers/taskController');
const { verifyToken, requireProjectRole } = require('../middleware/auth');

const router = express.Router();

router.post('/projects/:projectId/tasks', verifyToken, requireProjectRole('member'), taskController.createTask);
router.get('/projects/:projectId/tasks', verifyToken, requireProjectRole('member'), taskController.getProjectTasks);
router.put('/:taskId', verifyToken, taskController.updateTask);
router.delete('/:taskId', verifyToken, taskController.deleteTask);
router.get('/dashboard', verifyToken, taskController.getDashboard);

module.exports = router;
