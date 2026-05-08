const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};

const requireProjectRole = (requiredRole) => async (req, res, next) => {
  const pool = require('../config/db');
  const { projectId } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT role FROM project_members WHERE project_id = $1 AND user_id = $2',
      [projectId, userId]
    );

    if (!result.rows.length) {
      if (requiredRole === 'member') {
        const project = await pool.query('SELECT created_by FROM projects WHERE id = $1', [projectId]);
        if (project.rows[0]?.created_by !== userId) {
          return res.status(403).json({ error: 'Not a project member' });
        }
      } else {
        return res.status(403).json({ error: 'Not a project member' });
      }
    } else {
      const memberRole = result.rows[0].role;
      if (requiredRole === 'admin' && memberRole !== 'admin') {
        return res.status(403).json({ error: 'Project admin required' });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { verifyToken, requireRole, requireProjectRole };
