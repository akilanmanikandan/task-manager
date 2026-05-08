# Quick Start Guide

## 📋 Summary
Full-stack Task Manager application built with Node.js + Express (backend), React (frontend), and PostgreSQL database.

**GitHub:** https://github.com/akilanmanikandan/task-manager

## 🚀 Quick Start (Local)

### Requirements
- PostgreSQL running with user `postgres`, password `tharun123`
- Node.js 14+

### 1. Create Database
```bash
createdb task_manager
```

### 2. Start Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```
✓ Runs on http://localhost:5000

### 3. Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```
✓ Runs on http://localhost:3000 (opens automatically)

### 4. Test the App
1. **Register at login page** (first user automatically becomes admin ✨)
2. You can now create a project
3. Create tasks and assign them
4. Check dashboard for stats

**Note:** First registered user gets admin role automatically. Subsequent users are members.

## 🚢 Deploy to Railway

### Step 1: Create Railway Project
- Go to https://railway.app
- Login/Signup
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose `akilanmanikandan/task-manager`

### Step 2: Add Services

**PostgreSQL Database**
1. Click "+ New"
2. Select "PostgreSQL"
3. Wait for initialization
4. Note the connection details

**Backend Service**
1. Click "+ New"
2. Select "GitHub Repo"
3. Choose `task-manager`
4. Set these variables:
   - `NODE_ENV`: production
   - `PORT`: 5000
   - `JWT_SECRET`: (strong random key)
   - `DATABASE_URL`: (from PostgreSQL service)
5. Root: `backend`
6. Build: `npm install`
7. Start: `npm start`

**Frontend Service**
1. Click "+ New"
2. Select "GitHub Repo"
3. Choose `task-manager`
4. Set these variables:
   - `REACT_APP_API_URL`: (your Railway backend URL + /api)
     Example: `https://task-manager-api.railway.app/api`
5. Root: `frontend`
6. Build: `npm install && npm run build`
7. Deploy

### Step 3: Test Live App
- Open the Railway frontend domain
- Register and test all features
- Check if dashboard loads correctly

## 📁 Project Structure

```
project_manager/
├── backend/
│   ├── src/
│   │   ├── config/      (database, migrations)
│   │   ├── middleware/  (auth, validation)
│   │   ├── models/      (database queries)
│   │   ├── controllers/ (request handlers)
│   │   ├── routes/      (API endpoints)
│   │   └── app.js       (Express server)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── contexts/    (AuthContext)
│   │   ├── pages/       (Login, Dashboard, Projects, etc.)
│   │   ├── components/  (Navbar, etc.)
│   │   ├── api/         (API client)
│   │   └── App.js       (Main router)
│   └── package.json
├── README.md
├── LOCAL_SETUP.md
└── DEPLOYMENT.md
```

## 🔑 Key Features

✅ JWT Authentication
✅ Role-based Access (Admin/Member)
✅ Project Management
✅ Task Tracking with Status (Todo/In Progress/Done)
✅ Dashboard with Stats
✅ Team Member Management
✅ Responsive UI

## 📝 Default Admin User (After Deployment)

To promote a user to admin in the deployed database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| DB connection error | Check DATABASE_URL, verify PostgreSQL running |
| CORS errors | Check REACT_APP_API_URL points to correct backend |
| Port 5000 in use | Kill existing process or change PORT in .env |
| Frontend blank page | Check browser console for API errors |
| Railway deployment fails | Check build logs, verify environment variables |

## 📞 Support

See LOCAL_SETUP.md for detailed local development
See DEPLOYMENT.md for detailed Railway deployment
