# Deployment Guide - Railway

## Prerequisites
- Railway account (https://railway.app)
- GitHub account with repo pushed

## Step 1: Create Railway Project

1. Go to https://railway.app and login
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose the `task-manager` repository
5. Click "Deploy"

## Step 2: Add PostgreSQL Database

1. In Railway project, click "+ New"
2. Select "PostgreSQL"
3. Wait for the database to initialize
4. Click on PostgreSQL service to view credentials

## Step 3: Deploy Backend

1. In Railway project, click "+ New"
2. Select "GitHub Repo"
3. Choose the `task-manager` repository
4. Select "Service" with name `backend`
5. Configure environment variables:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `JWT_SECRET`: (generate a strong random key)
   - `DATABASE_URL`: (copy from PostgreSQL service)

6. Set deployment command:
   - Root directory: `backend`
   - Build: `npm install`
   - Start: `npm start`

## Step 4: Deploy Frontend

1. In Railway project, click "+ New"
2. Select "GitHub Repo"
3. Choose the `task-manager` repository
4. Configure environment variables:
   - `REACT_APP_API_URL`: (copy backend service URL + /api)
   
5. Set deployment command:
   - Root directory: `frontend`
   - Build: `npm install && npm run build`
   - Start: (Leave empty - Railway will serve static files)

## Step 5: Verify Deployment

1. Click on frontend service
2. Open the "Railway domain" URL
3. Test the application:
   - Register a new user
   - Create a project
   - Add members and create tasks
   - Verify dashboard shows correct stats

## Local Testing (Optional)

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit http://localhost:3000

## Troubleshooting

- Check Railway logs for errors
- Verify DATABASE_URL is correct
- Ensure REACT_APP_API_URL points to Railway backend domain
- Check firewall/CORS settings if requests are blocked
