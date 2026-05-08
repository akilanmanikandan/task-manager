# Local Development Setup

## Prerequisites

- Node.js 14+ and npm
- PostgreSQL 12+ (running locally)

## Database Setup

1. **Create PostgreSQL Database**
   ```bash
   createdb task_manager
   ```

2. **Verify Connection**
   ```bash
   psql -U postgres -d task_manager
   ```
   (You should see a prompt. Type `\q` to exit)

## Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   - The `.env` file is already configured for local development
   - Default: `DATABASE_URL=postgresql://postgres:tharun123@localhost:5432/task_manager`
   - Update if your PostgreSQL credentials are different

3. **Start Backend Server**
   ```bash
   npm start
   ```
   - Server runs on `http://localhost:5000`
   - Database tables are created automatically
   - You should see: `✓ Database migrations completed successfully`
   - You should see: `✓ Server running on port 5000`

## Frontend Setup

1. **Install Dependencies** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   - `.env` file is already set to `http://localhost:5000/api`
   - This is correct for local development

3. **Start Frontend**
   ```bash
   npm start
   ```
   - Frontend automatically opens on `http://localhost:3000`
   - You should see the login page

## Testing the Application

### 1. Register a User
- Go to http://localhost:3000
- Click "Register"
- Fill in: Name, Email, Password
- Click "Register"

### 2. Create a Project
- After login, click "Projects"
- Click "Create Project"
- Enter project name and description
- Click "Create Project"

### 3. View Dashboard
- Click "Dashboard"
- You should see "0" tasks

### 4. Create a Task
- Click "Projects"
- Click on your project
- Fill in task title and description
- Click "Create Task"
- Task appears in "To Do" column

### 5. Update Task Status
- Task status can be toggled by clicking on the task
- Status options: todo, in_progress, done

## Testing API Endpoints (with curl or Postman)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned `token` and use in subsequent requests:

### Get Dashboard
```bash
curl -X GET http://localhost:5000/api/tasks/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Common Issues

### "Database connection failed"
- Check PostgreSQL is running
- Verify DATABASE_URL in backend/.env
- Verify database `task_manager` exists

### "Port 5000 already in use"
- Kill the process using port 5000
- Or change PORT in backend/.env

### CORS errors in frontend
- Ensure backend is running on http://localhost:5000
- Check REACT_APP_API_URL in frontend/.env

### Tables already exist error
- This is normal - migrations run on startup
- If you need to reset: `dropdb task_manager && createdb task_manager`

## Useful Commands

```bash
# Stop server (Ctrl+C)

# Reset database
dropdb task_manager && createdb task_manager

# View PostgreSQL logs
tail -f /var/log/postgresql/postgresql.log

# Check if ports are in use
lsof -i :5000
lsof -i :3000
```

## Next Steps

After testing locally, deploy to Railway following DEPLOYMENT.md
