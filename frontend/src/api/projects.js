import client from './client';

export const getProjects = () => client.get('/projects');

export const getProjectById = (id) => client.get(`/projects/${id}`);

export const createProject = (name, description) =>
  client.post('/projects', { name, description });

export const updateProject = (id, name, description) =>
  client.put(`/projects/${id}`, { name, description });

export const deleteProject = (id) => client.delete(`/projects/${id}`);

export const addMember = (projectId, userId, role) =>
  client.post(`/projects/${projectId}/members`, { userId, role });

export const removeMember = (projectId, userId) =>
  client.delete(`/projects/${projectId}/members/${userId}`);

export const getMembers = (projectId) =>
  client.get(`/projects/${projectId}/members`);
