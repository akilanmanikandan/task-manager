import client from './client';

export const getProjectTasks = (projectId) =>
  client.get(`/tasks/projects/${projectId}/tasks`);

export const createTask = (projectId, title, description, assigneeId, priority, dueDate) =>
  client.post(`/tasks/projects/${projectId}/tasks`, {
    title,
    description,
    assigneeId,
    priority,
    dueDate,
  });

export const updateTask = (taskId, data) =>
  client.put(`/tasks/${taskId}`, data);

export const deleteTask = (taskId) => client.delete(`/tasks/${taskId}`);

export const getDashboard = () => client.get('/tasks/dashboard');
