# Team Task Manager

A full-stack web application for managing projects, assigning tasks, and tracking progress with role-based access control.

## Features

- ✅ User authentication (Signup/Login with JWT)
- ✅ Project & team management
- ✅ Task creation, assignment & status tracking
- ✅ Dashboard with task statistics and overdue tracking
- ✅ Role-based access control (Admin/Member)
- ✅ Responsive UI with modern design

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL
- JWT authentication
- Bcrypt for password hashing

### Frontend
- React with React Router
- Axios for API calls
- CSS with modern styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (running locally)
- npm or yarn

### Installation

1. **Setup PostgreSQL Database**
   ```bash
   createdb task_manager
   ```
   The database tables will be created automatically on first backend run.

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update DATABASE_URL and JWT_SECRET
   npm start
   ```
   Backend runs on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User signup
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/me` - Get current user

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members/:userId` - Remove member
- `GET /api/projects/:id/members` - Get project members

### Tasks
- `POST /api/tasks/projects/:projectId/tasks` - Create task
- `GET /api/tasks/projects/:projectId/tasks` - Get project tasks
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task
- `GET /api/tasks/dashboard` - Get user dashboard stats

## Usage

1. Register a new account or login
2. Create a project (admin only)
3. Add team members to the project
4. Create and assign tasks
5. Track progress on the dashboard

## Database Schema

### users
- id, name, email, password_hash, role, created_at

### projects
- id, name, description, created_by, created_at

### project_members
- project_id, user_id, role

### tasks
- id, title, description, status, priority, due_date, project_id, assignee_id, creator_id, created_at, updated_at

## Deployment

Deployed on Railway with:
- PostgreSQL database
- Backend service
- Frontend service

Set environment variables:
- Backend: `DATABASE_URL`, `JWT_SECRET`, `PORT`
- Frontend: `REACT_APP_API_URL`

## License

MIT
