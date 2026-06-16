/**
 * OctoFit Tracker Database Seed Script
 * 
 * This script populates the octofit_db with comprehensive test data for development and testing.
 * It creates a realistic fitness ecosystem with users, teams, activities, and workout plans.
 * 
 * Data Structures:
 * ================
 * USERS: 6 diverse fitness enthusiasts with different specializations
 * - alexa_runner: Marathon runner (2500 points)
 * - jordan_cyclist: Professional cyclist (2200 points)
 * - sam_swimmer: Competitive swimmer (1900 points)
 * - maya_gym: Fitness trainer/bodybuilder (1800 points)
 * - alex_walker: Hiking enthusiast (1500 points)
 * - chris_all_rounder: Multi-sport athlete (1200 points)
 * 
 * TEAMS: 3 collaborative fitness teams
 * - Lightning Runners: Running-focused team (6200 total points)
 * - Aqua Warriors: Water sports team (4100 total points)
 * - Iron Masters: Strength training team (5500 total points)
 *
 * ACTIVITIES: 6 recent fitness activities with metrics
 * - Running: distance tracking, calorie burn
 * - Cycling: mountain and road variants
 * - Swimming: pool training and technique work
 * - Gym: strength training sessions
 * - Walking: nature hikes and casual movement
 *
 * WORKOUTS: 4 pre-built workout plans for different fitness levels
 * - 5K Running Plan: Beginner running program
 * - Full Body Strength: Advanced strength routine with compound lifts
 * - Swimming Drills: Intermediate technique improvement
 * - Core Stability: Beginner core conditioning
 *
 * Each workout includes:
 * - Exercise lists with sets, reps, and optional weight
 * - Duration estimates
 * - Difficulty levels (beginner, intermediate, advanced)
 * - Creator attribution
 */

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
    console.log('✓ Connected to MongoDB - octofit_db')

    // Clear existing data
    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Workout.deleteMany({})
    console.log('✓ Cleared existing data')

    // ============================================
    // USERS - 6 diverse fitness profiles
    // ============================================
    // These users represent different fitness specializations:
    // - Runners: focused on cardiovascular endurance
    // - Cyclists: road and mountain biking enthusiasts  
    // - Swimmers: aquatic sports specialists
    // - Gym enthusiasts: strength and resistance training
    // - Multi-sport athletes: cross-training and triathlon
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

    // ============================================
    // TEAMS - 3 collaborative fitness teams
    // ============================================
    // Teams enable group competition and collaboration:
    // - Each team has a leader (team captain)
    // - Members contribute individual points to team total
    // - Teams compete on leaderboards
    // - Enables social fitness motivation
    const teams = await Team.create([
      {
        name: 'Lightning Runners',
        description: 'Fast-paced running enthusiasts dedicated to marathons and ultramarathons',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[4]._id],
        totalPoints: 6200
      },
      {
        name: 'Aqua Warriors',
        description: 'Water sports focused team specializing in swimming, cycling, and triathlon',
        leader: users[2]._id,
        members: [users[2]._id, users[1]._id],
        totalPoints: 4100
      },
      {
        name: 'Iron Masters',
        description: 'Strength training and gym focused team pursuing powerlifting and bodybuilding',
        leader: users[3]._id,
        members: [users[3]._id, users[5]._id, users[0]._id],
        totalPoints: 5500
      }
    ])

    console.log('✓ Created 3 teams')

    // ============================================
    // ACTIVITIES - 6 logged fitness sessions
    // ============================================
    // Each activity represents a completed workout with:
    // - Duration (minutes)
    // - Distance (km) - optional for some activity types
    // - Calories burned (estimated)
    // - Points earned (for leaderboard ranking)
    // - Notes and timestamps
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 10.5,
        calories: 800,
        points: 250,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Morning run in the park - steady pace training'
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 12,
        calories: 950,
        points: 300,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Long distance run - achieved new personal best distance'
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 1200,
        points: 350,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Mountain bike trail - challenging elevation gains and technical sections'
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 50,
        distance: 2.5,
        calories: 700,
        points: 200,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Pool training session - focused on technique improvement and form'
      },
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 75,
        calories: 600,
        points: 180,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Upper body workout - chest press, rows, and shoulder exercises'
      },
      {
        userId: users[4]._id,
        type: 'walking',
        duration: 45,
        distance: 5,
        calories: 350,
        points: 100,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Evening walk - scenic nature trail with friends'
      }
    ])

    console.log('✓ Created 6 activities')

    // ============================================
    // WORKOUTS - 4 pre-built fitness programs
    // ============================================
    // Each workout is a structured training plan with:
    // - Exercise list (name, sets, reps, optional weight)
    // - Estimated duration
    // - Difficulty level for user matching
    // - Creator attribution
    // - Detailed description
    const workouts = await Workout.create([
      {
        name: '5K Running Plan',
        description: 'Complete beginner to 5K runner program - 8 week progressive training plan to build endurance and speed for 5K race completion',
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
        description: 'Complete full body strength training routine - Advanced compound lift focused program targeting all major muscle groups',
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
        description: 'Improve swimming technique with structured drills - Intermediate program focusing on proper form and stroke mechanics',
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
        description: 'Build core strength and stability - Beginner program with bodyweight exercises for injury prevention and functional fitness',
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
    console.log('\n📊 Test Data Summary:')
    console.log(`   ✓ ${users.length} users created with diverse fitness profiles`)
    console.log(`   ✓ ${teams.length} teams created with competitive leaderboards`)
    console.log(`   ✓ ${activities.length} activities logged with realistic metrics`)
    console.log(`   ✓ ${workouts.length} workout programs created for all difficulty levels`)
    console.log('\n🎯 Top Users:')
    users.slice(0, 3).forEach((user, idx) => {
      console.log(`   ${idx + 1}. ${user.firstName} ${user.lastName} - ${user.points} points`)
    })
    console.log('\n🏆 Teams:')
    teams.forEach((team, idx) => {
      console.log(`   ${idx + 1}. ${team.name} - ${team.totalPoints} team points`)
    })

    await mongoose.disconnect()
  } catch (error) {
    console.error('✗ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
