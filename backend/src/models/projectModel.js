const pool = require('../config/db');

const createProject = async (name, description, createdBy) => {
  const result = await pool.query(
    'INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
    [name, description, createdBy]
  );
  return result.rows[0];
};

const getProjectById = async (id) => {
  const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0];
};

const getProjectsByUserId = async (userId) => {
  const result = await pool.query(`
    SELECT DISTINCT p.* FROM projects p
    LEFT JOIN project_members pm ON p.id = pm.project_id
    WHERE p.created_by = $1 OR pm.user_id = $1
    ORDER BY p.created_at DESC
  `, [userId]);
  return result.rows;
};

const updateProject = async (id, name, description) => {
  const result = await pool.query(
    'UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0];
};

const deleteProject = async (id) => {
  await pool.query('DELETE FROM projects WHERE id = $1', [id]);
};

const addProjectMember = async (projectId, userId, role = 'member') => {
  const result = await pool.query(
    'INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3) ON CONFLICT (project_id, user_id) DO UPDATE SET role = $3 RETURNING *',
    [projectId, userId, role]
  );
  return result.rows[0];
};

const removeProjectMember = async (projectId, userId) => {
  await pool.query('DELETE FROM project_members WHERE project_id = $1 AND user_id = $2', [projectId, userId]);
};

const getProjectMembers = async (projectId) => {
  const result = await pool.query(`
    SELECT u.id, u.name, u.email, pm.role
    FROM project_members pm
    JOIN users u ON pm.user_id = u.id
    WHERE pm.project_id = $1
  `, [projectId]);
  return result.rows;
};

module.exports = {
  createProject,
  getProjectById,
  getProjectsByUserId,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
  getProjectMembers,
};
