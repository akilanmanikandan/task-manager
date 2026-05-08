import React, { useState, useEffect } from 'react';
import { getDashboard } from '../api/tasks';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await getDashboard();
      setStats(data.stats || {});
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Dashboard fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  const total = stats.total || 0;
  const completed = stats.completed || 0;
  const inProgress = stats.in_progress || 0;
  const overdue = stats.overdue || 0;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-value">{total}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-value">{completed}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-value">{inProgress}</p>
        </div>
        <div className="stat-card warning">
          <h3>Overdue</h3>
          <p className="stat-value">{overdue}</p>
        </div>
      </div>

      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div>
                <h4>{task.title}</h4>
                <p>{task.project_name}</p>
                <small>{task.due_date ? `Due: ${task.due_date}` : 'No due date'}</small>
              </div>
              <span className={`status ${task.status}`}>{task.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
