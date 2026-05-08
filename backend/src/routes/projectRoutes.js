const express = require('express');
const projectController = require('../controllers/projectController');
const { verifyToken, requireProjectRole } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, projectController.createProject);
router.get('/', verifyToken, projectController.getProjects);
router.get('/:id', verifyToken, projectController.getProjectById);
router.put('/:id', verifyToken, requireProjectRole('admin'), projectController.updateProject);
router.delete('/:id', verifyToken, requireProjectRole('admin'), projectController.deleteProject);

router.post('/:id/members', verifyToken, requireProjectRole('admin'), projectController.addMember);
router.delete('/:id/members/:userId', verifyToken, requireProjectRole('admin'), projectController.removeMember);
router.get('/:id/members', verifyToken, requireProjectRole('member'), projectController.getMembers);

module.exports = router;
