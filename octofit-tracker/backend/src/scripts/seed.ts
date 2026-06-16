import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Workout } from '../models/Workout'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Workout.deleteMany({})
    console.log('✓ Cleared existing data')

    // Create users
    const users = await User.create([
      {
        username: 'alexa_runner',
        email: 'alexa@example.com',
        password: 'password123',
        firstName: 'Alexa',
        lastName: 'Runner',
        bio: 'Marathon enthusiast and fitness lover',
        points: 2500,
        rank: 1
      },
      {
        username: 'jordan_cyclist',
        email: 'jordan@example.com',
        password: 'password123',
        firstName: 'Jordan',
        lastName: 'Cyclist',
        bio: 'Professional cyclist and coach',
        points: 2200,
        rank: 2
      },
      {
        username: 'sam_swimmer',
        email: 'sam@example.com',
        password: 'password123',
        firstName: 'Sam',
        lastName: 'Swimmer',
        bio: 'Competitive swimmer',
        points: 1900,
        rank: 3
      },
      {
        username: 'maya_gym',
        email: 'maya@example.com',
        password: 'password123',
        firstName: 'Maya',
        lastName: 'Gym',
        bio: 'Fitness trainer and gym enthusiast',
        points: 1800,
        rank: 4
      },
      {
        username: 'alex_walker',
        email: 'alex@example.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Walker',
        bio: 'Nature lover and hiker',
        points: 1500,
        rank: 5
      },
      {
        username: 'chris_all_rounder',
        email: 'chris@example.com',
        password: 'password123',
        firstName: 'Chris',
        lastName: 'AllRounder',
        bio: 'Jack of all trades in fitness',
        points: 1200,
        rank: 6
      }
    ])

    console.log('✓ Created 6 users')

    // Create teams
    const teams = await Team.create([
      {
        name: 'Lightning Runners',
        description: 'Fast-paced running enthusiasts',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[4]._id],
        totalPoints: 6200
      },
      {
        name: 'Aqua Warriors',
        description: 'Water sports focused team',
        leader: users[2]._id,
        members: [users[2]._id, users[1]._id],
        totalPoints: 4100
      },
      {
        name: 'Iron Masters',
        description: 'Strength training and gym focused',
        leader: users[3]._id,
        members: [users[3]._id, users[5]._id, users[0]._id],
        totalPoints: 5500
      }
    ])

    console.log('✓ Created 3 teams')

    // Create activities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 10.5,
        calories: 800,
        points: 250,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Morning run in the park'
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 12,
        calories: 950,
        points: 300,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Long distance run'
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 1200,
        points: 350,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Mountain bike trail'
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 50,
        distance: 2.5,
        calories: 700,
        points: 200,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Pool training session'
      },
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 75,
        calories: 600,
        points: 180,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Upper body workout'
      },
      {
        userId: users[4]._id,
        type: 'walking',
        duration: 45,
        distance: 5,
        calories: 350,
        points: 100,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Evening walk'
      }
    ])

    console.log('✓ Created 6 activities')

    // Create workouts
    const workouts = await Workout.create([
      {
        name: '5K Running Plan',
        description: 'Complete beginner to 5K runner program',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1 },
          { name: 'Main run', sets: 1, reps: 30 },
          { name: 'Cool-down walk', sets: 1, reps: 5 }
        ],
        duration: 40,
        creatorId: users[0]._id,
        difficulty: 'beginner'
      },
      {
        name: 'Full Body Strength',
        description: 'Complete full body strength training routine',
        exercises: [
          { name: 'Squats', sets: 4, reps: 8, weight: 185 },
          { name: 'Bench Press', sets: 4, reps: 8, weight: 225 },
          { name: 'Deadlifts', sets: 3, reps: 5, weight: 315 },
          { name: 'Pull-ups', sets: 3, reps: 10 },
          { name: 'Rows', sets: 3, reps: 10, weight: 185 }
        ],
        duration: 75,
        creatorId: users[3]._id,
        difficulty: 'advanced'
      },
      {
        name: 'Swimming Drills',
        description: 'Improve swimming technique with structured drills',
        exercises: [
          { name: 'Freestyle drill', sets: 5, reps: 100 },
          { name: 'Backstroke drill', sets: 5, reps: 100 },
          { name: 'Butterfly drill', sets: 3, reps: 50 }
        ],
        duration: 50,
        creatorId: users[2]._id,
        difficulty: 'intermediate'
      },
      {
        name: 'Core Stability',
        description: 'Build core strength and stability',
        exercises: [
          { name: 'Plank', sets: 3, reps: 60 },
          { name: 'Russian Twists', sets: 3, reps: 20 },
          { name: 'Leg Raises', sets: 3, reps: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 30 }
        ],
        duration: 30,
        creatorId: users[5]._id,
        difficulty: 'beginner'
      }
    ])

    console.log('✓ Created 4 workouts')

    console.log('\n✅ Database seeded successfully!')
    console.log(`   - ${users.length} users created`)
    console.log(`   - ${teams.length} teams created`)
    console.log(`   - ${activities.length} activities created`)
    console.log(`   - ${workouts.length} workouts created`)

    await mongoose.disconnect()
  } catch (error) {
    console.error('✗ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
