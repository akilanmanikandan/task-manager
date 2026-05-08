import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, getMembers } from '../api/projects';
import { getProjectTasks, createTask } from '../api/tasks';
import '../styles/ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [projRes, tasksRes, membersRes] = await Promise.all([
        getProjectById(id),
        getProjectTasks(id),
        getMembers(id),
      ]);
      setProject(projRes.data);
      setTasks(tasksRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(id, title, description);
      setTitle('');
      setDescription('');
      fetchData();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="project-detail">
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <div className="detail-grid">
        <div className="section">
          <h2>Create Task</h2>
          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Task</button>
          </form>
        </div>

        <div className="section">
          <h2>Team Members</h2>
          {members.length === 0 ? (
            <p>No members</p>
          ) : (
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.name} <span className="role">({member.role})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="kanban">
        <div className="column">
          <h3>To Do ({todoTasks.length})</h3>
          {todoTasks.map((task) => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
        <div className="column">
          <h3>In Progress ({inProgressTasks.length})</h3>
          {inProgressTasks.map((task) => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Done ({doneTasks.length})</h3>
          {doneTasks.map((task) => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
