const pool = require('../config/db');

const createTask = async (title, description, projectId, creatorId, assigneeId = null, priority = 'medium', dueDate = null) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, project_id, creator_id, assignee_id, priority, due_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, description, projectId, creatorId, assigneeId, priority, dueDate]
  );
  return result.rows[0];
};

const getTaskById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
};

const getTasksByProjectId = async (projectId) => {
  const result = await pool.query(
    `SELECT t.*, u.name as assignee_name FROM tasks t
     LEFT JOIN users u ON t.assignee_id = u.id
     WHERE t.project_id = $1 ORDER BY t.created_at DESC`,
    [projectId]
  );
  return result.rows;
};

const updateTask = async (id, { title, description, status, priority, dueDate, assigneeId }) => {
  const result = await pool.query(
    `UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5, assignee_id = $6, updated_at = NOW()
     WHERE id = $7 RETURNING *`,
    [title, description, status, priority, dueDate, assigneeId, id]
  );
  return result.rows[0];
};

const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

const getDashboardStats = async (userId) => {
  const result = await pool.query(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
      SUM(CASE WHEN due_date < CURRENT_DATE AND status != 'done' THEN 1 ELSE 0 END) as overdue
    FROM tasks t
    WHERE t.assignee_id = $1
  `, [userId]);
  return result.rows[0];
};

const getUserTasks = async (userId) => {
  const result = await pool.query(
    `SELECT t.*, p.name as project_name FROM tasks t
     JOIN projects p ON t.project_id = p.id
     WHERE t.assignee_id = $1 ORDER BY t.due_date ASC, t.created_at DESC`,
    [userId]
  );
  return result.rows;
};

module.exports = {
  createTask,
  getTaskById,
  getTasksByProjectId,
  updateTask,
  deleteTask,
  getDashboardStats,
  getUserTasks,
};
