import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './config/database'

// Import routes
import usersRoutes from './routes/users'
import teamsRoutes from './routes/teams'
import activitiesRoutes from './routes/activities'
import workoutsRoutes from './routes/workouts'
import leaderboardRoutes from './routes/leaderboard'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDatabase().catch((err) => {
  console.error('Failed to connect to database:', err)
  process.exit(1)
})

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OctoFit Tracker API is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/users', usersRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/activities', activitiesRoutes)
app.use('/api/workouts', workoutsRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`✓ OctoFit Tracker API running on port ${PORT}`)
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`)
})
