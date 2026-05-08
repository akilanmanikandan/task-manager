const projectModel = require('../models/projectModel');
const pool = require('../config/db');

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Project name is required' });

    const project = await projectModel.createProject(name, description || '', req.user.id);
    await projectModel.addProjectMember(project.id, req.user.id, 'admin');

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.getProjectsByUserId(req.user.id);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await projectModel.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Project name is required' });

    const project = await projectModel.updateProject(req.params.id, name, description || '');
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await projectModel.deleteProject(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    await projectModel.addProjectMember(req.params.id, userId, role || 'member');
    res.json({ message: 'Member added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    await projectModel.removeProjectMember(req.params.id, req.params.userId);
    res.json({ message: 'Member removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await projectModel.getProjectMembers(req.params.id);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  getMembers,
};
