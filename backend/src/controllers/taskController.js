const taskModel = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const { title, description, assigneeId, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'Task title is required' });

    const task = await taskModel.createTask(
      title,
      description || '',
      req.params.projectId,
      req.user.id,
      assigneeId || null,
      priority || 'medium',
      dueDate || null
    );
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getTasksByProjectId(req.params.projectId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assigneeId } = req.body;
    const task = await taskModel.updateTask(req.params.taskId, {
      title,
      description,
      status,
      priority,
      dueDate,
      assigneeId,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskModel.deleteTask(req.params.taskId);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const stats = await taskModel.getDashboardStats(req.user.id);
    const tasks = await taskModel.getUserTasks(req.user.id);
    res.json({ stats, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  getDashboard,
};
