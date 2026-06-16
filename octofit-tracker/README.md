# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Node.js/Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── backend/           # Node.js + Express + TypeScript API
    ├── src/
    ├── package.json
    ├── tsconfig.json
    └── .env
```

## Setup Instructions

### Frontend (React 19 + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd octofit-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on **http://localhost:5173**

### Backend (Node.js + Express + TypeScript)

1. Navigate to the backend directory:
   ```bash
   cd octofit-tracker/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running on **mongodb://localhost:27017**

4. Start the development server:
   ```bash
   npm run dev
   ```

   The backend API will run on **http://localhost:8000**

## Configuration

### Port Configuration
- **Frontend**: 5173 (configured in `vite.config.ts`)
- **Backend**: 8000 (configured in `.env`)
- **MongoDB**: 27017 (default MongoDB port)

### Database
MongoDB connection string is defined in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
```

## Technologies Used

### Frontend
- React 19
- Vite
- TypeScript
- Vite React Plugin

### Backend
- Node.js
- Express 4.18
- TypeScript 5.3
- Mongoose 8.0 (MongoDB ODM)
- CORS support
- dotenv for environment management

## API Endpoints

- `GET /api/health` - Health check endpoint

## Building for Production

### Frontend
```bash
cd octofit-tracker/frontend
npm run build
```

### Backend
```bash
cd octofit-tracker/backend
npm run build
npm start
```
