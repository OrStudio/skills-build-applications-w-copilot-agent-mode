# OctoFit Tracker Database Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running on `mongodb://localhost:27017`
- Database name: `octofit_db`

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd octofit-tracker/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - The `.env` file is already configured with:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/octofit_db
   NODE_ENV=development
   ```

### Database Initialization

#### Option 1: Full Database Initialization (Recommended)
This command clears and initializes the entire database with comprehensive test data:

```bash
npm run init
```

**What gets created:**
- 12 diverse users with varied fitness profiles
- 4 teams with members and total points
- 22 activities across different sports types
- 8 workout plans with varying difficulty levels

#### Option 2: Basic Seed Script
For a lighter seed with basic data:

```bash
npm run seed
```

### Starting the Server

```bash
npm run dev
```

Server will start on `http://localhost:8000`

### API Endpoints

#### Health Check
```bash
curl http://localhost:8000/api/health
```

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create team
- `POST /api/teams/:id/members/:userId` - Add member to team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

#### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/user/:userId` - Get user activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

#### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `GET /api/workouts/creator/:creatorId` - Get creator's workouts
- `POST /api/workouts` - Create workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

#### Leaderboard
- `GET /api/leaderboard/global` - Global leaderboard
- `GET /api/leaderboard/teams` - Team leaderboard
- `GET /api/leaderboard/activities/:type` - Leaderboard by activity type
- `GET /api/leaderboard/rank/:userId` - Get user's rank

## Database Schema

### User Model
- `username` (unique, string)
- `email` (unique, string)
- `password` (string)
- `firstName` (string)
- `lastName` (string)
- `profilePicture` (optional)
- `bio` (string)
- `points` (number, default: 0)
- `rank` (number)
- `teamId` (reference to Team)
- `createdAt` / `updatedAt` (timestamps)

### Team Model
- `name` (unique, string)
- `description` (string)
- `leader` (reference to User)
- `members` (array of User references)
- `totalPoints` (number)
- `createdAt` / `updatedAt` (timestamps)

### Activity Model
- `userId` (reference to User)
- `type` (enum: running, cycling, swimming, walking, gym)
- `duration` (number, minutes)
- `distance` (optional, km)
- `calories` (number)
- `points` (number)
- `date` (datetime)
- `notes` (string)
- `createdAt` / `updatedAt` (timestamps)

### Workout Model
- `name` (string)
- `description` (string)
- `exercises` (array of exercise objects)
  - `name` (string)
  - `sets` (number)
  - `reps` (number)
  - `weight` (optional, lbs)
- `duration` (number, minutes)
- `creatorId` (reference to User)
- `difficulty` (enum: beginner, intermediate, advanced)
- `createdAt` / `updatedAt` (timestamps)

## Sample Data

### Test Users
1. **Alexa Runner** - 4200 points (Marathon runner)
2. **Jordan Cyclist** - 3800 points (Professional cyclist)
3. **Sam Swimmer** - 3500 points (Competitive swimmer)
4. **Maya Gym** - 3200 points (Fitness trainer)
5. **Alex Walker** - 2800 points (Hiking enthusiast)
6. **Chris Triathlete** - 2600 points (Multi-sport athlete)
7. **Priya Yogi** - 2400 points (Yoga instructor)
8. **Mike Lifter** - 2200 points (Powerlifting champion)
9. **Sophia Runner** - 2000 points (Marathon runner)
10. **David Dancer** - 1800 points (Zumba instructor)
11. **Emma Climber** - 1600 points (Rock climber)
12. **Liam Newbie** - 1200 points (Fitness beginner)

### Test Teams
1. **Thunder Runners** - 11400 points (Alexa leads)
2. **Aqua Warriors** - 9900 points (Sam leads)
3. **Iron Masters** - 11200 points (Maya leads)
4. **Wellness Warriors** - 6000 points (Priya leads)

## Troubleshooting

### MongoDB Connection Error
```
✗ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::8000
```
**Solution:** Change PORT in `.env` or kill process using port 8000

### TypeScript Errors
```bash
npm run build
```

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set production environment:
   ```bash
   NODE_ENV=production
   MONGODB_URI=<your-production-mongodb-uri>
   PORT=8000
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Next Steps

1. Start the backend server: `npm run dev`
2. Initialize the database: `npm run init`
3. Access the API at `http://localhost:8000/api/health`
4. Build the React frontend: `cd ../frontend && npm run dev`
