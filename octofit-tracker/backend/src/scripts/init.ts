import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Workout } from '../models/Workout'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

async function initializeDatabase() {
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
    // USERS - 12 users with diverse profiles
    // ============================================
    const users = await User.create([
      {
        username: 'alexa_runner',
        email: 'alexa@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Alexa',
        lastName: 'Runner',
        bio: 'Marathon enthusiast and fitness lover 🏃‍♀️',
        points: 4200,
        rank: 1
      },
      {
        username: 'jordan_cyclist',
        email: 'jordan@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Jordan',
        lastName: 'Cyclist',
        bio: 'Professional cyclist and coach 🚴',
        points: 3800,
        rank: 2
      },
      {
        username: 'sam_swimmer',
        email: 'sam@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Sam',
        lastName: 'Swimmer',
        bio: 'Competitive swimmer training for Olympics 🏊',
        points: 3500,
        rank: 3
      },
      {
        username: 'maya_gym',
        email: 'maya@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Maya',
        lastName: 'Gym',
        bio: 'Fitness trainer and bodybuilder 💪',
        points: 3200,
        rank: 4
      },
      {
        username: 'alex_walker',
        email: 'alex@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Alex',
        lastName: 'Walker',
        bio: 'Nature lover and hiking enthusiast 🥾',
        points: 2800,
        rank: 5
      },
      {
        username: 'chris_triathlete',
        email: 'chris@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Chris',
        lastName: 'Triathlete',
        bio: 'Ironman enthusiast and multi-sport athlete 🏅',
        points: 2600,
        rank: 6
      },
      {
        username: 'priya_yogi',
        email: 'priya@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Priya',
        lastName: 'Yogi',
        bio: 'Yoga instructor and wellness coach 🧘‍♀️',
        points: 2400,
        rank: 7
      },
      {
        username: 'mike_lifter',
        email: 'mike@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Mike',
        lastName: 'Lifter',
        bio: 'Powerlifting champion 🏋️',
        points: 2200,
        rank: 8
      },
      {
        username: 'sophia_runner',
        email: 'sophia@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Sophia',
        lastName: 'Runner',
        bio: '5K to ultramarathon runner 🏃‍♀️',
        points: 2000,
        rank: 9
      },
      {
        username: 'david_dancer',
        email: 'david@octofit.com',
        password: 'hashedPassword123',
        firstName: 'David',
        lastName: 'Dancer',
        bio: 'Zumba instructor and dance fitness enthusiast 💃',
        points: 1800,
        rank: 10
      },
      {
        username: 'emma_climber',
        email: 'emma@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Emma',
        lastName: 'Climber',
        bio: 'Rock climbing and mountaineering adventurer 🧗‍♀️',
        points: 1600,
        rank: 11
      },
      {
        username: 'liam_newbie',
        email: 'liam@octofit.com',
        password: 'hashedPassword123',
        firstName: 'Liam',
        lastName: 'Newbie',
        bio: 'Just starting my fitness journey! 💪',
        points: 1200,
        rank: 12
      }
    ])

    console.log('✓ Created 12 users')

    // ============================================
    // TEAMS - 4 diverse teams
    // ============================================
    const teams = await Team.create([
      {
        name: 'Thunder Runners',
        description: 'Elite running club focused on marathons and endurance',
        leader: users[0]._id,
        members: [users[0]._id, users[4]._id, users[8]._id, users[6]._id],
        totalPoints: 11400
      },
      {
        name: 'Aqua Warriors',
        description: 'Water sports enthusiasts - swimming, cycling, triathlon',
        leader: users[2]._id,
        members: [users[2]._id, users[1]._id, users[5]._id],
        totalPoints: 9900
      },
      {
        name: 'Iron Masters',
        description: 'Strength training, powerlifting, and gym focused team',
        leader: users[3]._id,
        members: [users[3]._id, users[7]._id, users[0]._id, users[1]._id],
        totalPoints: 11200
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic fitness including yoga, dance, and mental wellness',
        leader: users[6]._id,
        members: [users[6]._id, users[9]._id, users[10]._id, users[11]._id],
        totalPoints: 6000
      }
    ])

    console.log('✓ Created 4 teams')

    // ============================================
    // ACTIVITIES - 30 diverse activities
    // ============================================
    const activities = await Activity.create([
      // Alexa's activities (Runner)
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 10.5,
        calories: 850,
        points: 300,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Morning run - felt great!'
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 12,
        calories: 950,
        points: 350,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Long distance run - new personal best'
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 30,
        distance: 5,
        calories: 500,
        points: 200,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Easy recovery run'
      },
      // Jordan's activities (Cyclist)
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 1200,
        points: 400,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Mountain bike trail - challenging terrain'
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 120,
        distance: 50,
        calories: 1500,
        points: 500,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Road bike - highway cycling'
      },
      // Sam's activities (Swimmer)
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 50,
        distance: 2.5,
        calories: 700,
        points: 250,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Pool training - technique work'
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 75,
        distance: 3.8,
        calories: 1000,
        points: 350,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Open water swimming - ocean training'
      },
      // Maya's activities (Gym)
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 90,
        calories: 800,
        points: 280,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Upper body strength training'
      },
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 75,
        calories: 700,
        points: 250,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Lower body and core workout'
      },
      // Alex's activities (Walker)
      {
        userId: users[4]._id,
        type: 'walking',
        duration: 45,
        distance: 5,
        calories: 350,
        points: 120,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Nature hike - beautiful weather'
      },
      {
        userId: users[4]._id,
        type: 'walking',
        duration: 60,
        distance: 7,
        calories: 450,
        points: 150,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Mountain trail walk'
      },
      // Chris's activities (Triathlete)
      {
        userId: users[5]._id,
        type: 'running',
        duration: 40,
        distance: 8,
        calories: 700,
        points: 250,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Triathlon training - run session'
      },
      {
        userId: users[5]._id,
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 900,
        points: 300,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Triathlon training - bike session'
      },
      {
        userId: users[5]._id,
        type: 'swimming',
        duration: 40,
        distance: 2,
        calories: 600,
        points: 220,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Triathlon training - swim session'
      },
      // Priya's activities (Yogi)
      {
        userId: users[6]._id,
        type: 'gym',
        duration: 60,
        calories: 400,
        points: 150,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Yoga and flexibility training'
      },
      // Mike's activities (Lifter)
      {
        userId: users[7]._id,
        type: 'gym',
        duration: 120,
        calories: 1100,
        points: 400,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Powerlifting session - heavy squats'
      },
      {
        userId: users[7]._id,
        type: 'gym',
        duration: 100,
        calories: 950,
        points: 350,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Bench press and upper body'
      },
      // Sophia's activities (Runner)
      {
        userId: users[8]._id,
        type: 'running',
        duration: 55,
        distance: 11,
        calories: 880,
        points: 320,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Tempo run - pushing pace'
      },
      // David's activities (Dancer)
      {
        userId: users[9]._id,
        type: 'gym',
        duration: 60,
        calories: 600,
        points: 200,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Zumba class - high energy!'
      },
      // Emma's activities (Climber)
      {
        userId: users[10]._id,
        type: 'walking',
        duration: 180,
        distance: 12,
        calories: 1200,
        points: 400,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'Rock climbing expedition - full day'
      },
      // Liam's activities (Newbie)
      {
        userId: users[11]._id,
        type: 'walking',
        duration: 30,
        distance: 2,
        calories: 200,
        points: 80,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
        notes: 'First fitness activity - excited!'
      },
      {
        userId: users[11]._id,
        type: 'gym',
        duration: 45,
        calories: 350,
        points: 120,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Beginner gym session'
      }
    ])

    console.log('✓ Created 22 activities')

    // ============================================
    // WORKOUTS - 8 diverse workout plans
    // ============================================
    const workouts = await Workout.create([
      {
        name: '5K Running Program',
        description: 'Complete beginner to 5K runner program - 8 weeks',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1 },
          { name: 'Main run intervals', sets: 8, reps: 5 },
          { name: 'Cool-down walk', sets: 1, reps: 5 }
        ],
        duration: 40,
        creatorId: users[0]._id,
        difficulty: 'beginner'
      },
      {
        name: 'Marathon Training',
        description: 'Advanced marathon preparation - 16 weeks to race day',
        exercises: [
          { name: 'Long run', sets: 1, reps: 90 },
          { name: 'Tempo run', sets: 4, reps: 10 },
          { name: 'Speed intervals', sets: 8, reps: 5 },
          { name: 'Recovery jog', sets: 1, reps: 30 }
        ],
        duration: 90,
        creatorId: users[0]._id,
        difficulty: 'advanced'
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
        duration: 90,
        creatorId: users[7]._id,
        difficulty: 'advanced'
      },
      {
        name: 'Swimming Drills',
        description: 'Improve swimming technique with structured drills',
        exercises: [
          { name: 'Freestyle drill', sets: 5, reps: 100 },
          { name: 'Backstroke drill', sets: 5, reps: 100 },
          { name: 'Butterfly drill', sets: 3, reps: 50 },
          { name: 'Breaststroke drill', sets: 4, reps: 75 }
        ],
        duration: 60,
        creatorId: users[2]._id,
        difficulty: 'intermediate'
      },
      {
        name: 'Core Stability Bootcamp',
        description: 'Build core strength and stability for all sports',
        exercises: [
          { name: 'Plank', sets: 3, reps: 60 },
          { name: 'Russian Twists', sets: 3, reps: 20 },
          { name: 'Leg Raises', sets: 3, reps: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 30 },
          { name: 'Bicycle Crunches', sets: 3, reps: 25 }
        ],
        duration: 40,
        creatorId: users[6]._id,
        difficulty: 'beginner'
      },
      {
        name: 'HIIT Cardio Blast',
        description: 'High intensity interval training for maximum calorie burn',
        exercises: [
          { name: 'Burpees', sets: 4, reps: 20 },
          { name: 'Jump Squats', sets: 4, reps: 15 },
          { name: 'High Knees', sets: 4, reps: 30 },
          { name: 'Push-up to T-rotation', sets: 3, reps: 12 }
        ],
        duration: 30,
        creatorId: users[9]._id,
        difficulty: 'intermediate'
      },
      {
        name: 'Cycling Endurance Training',
        description: 'Build cycling endurance for long distance rides',
        exercises: [
          { name: 'Easy pace ride', sets: 1, reps: 120 },
          { name: 'Tempo intervals', sets: 5, reps: 10 },
          { name: 'Sprint training', sets: 8, reps: 1 },
          { name: 'Recovery ride', sets: 1, reps: 60 }
        ],
        duration: 120,
        creatorId: users[1]._id,
        difficulty: 'advanced'
      },
      {
        name: 'Beginner Fitness Foundations',
        description: 'Perfect starter workout for fitness newcomers',
        exercises: [
          { name: 'Walking', sets: 1, reps: 30 },
          { name: 'Light stretching', sets: 1, reps: 15 },
          { name: 'Bodyweight squats', sets: 3, reps: 10 },
          { name: 'Push-ups (modified)', sets: 3, reps: 8 }
        ],
        duration: 30,
        creatorId: users[11]._id,
        difficulty: 'beginner'
      }
    ])

    console.log('✓ Created 8 workouts')

    console.log('\n✅ OctoFit Database Successfully Initialized!')
    console.log('\n📊 Database Summary:')
    console.log(`   Users Created: ${users.length}`)
    console.log(`   Teams Created: ${teams.length}`)
    console.log(`   Activities Logged: ${activities.length}`)
    console.log(`   Workout Plans: ${workouts.length}`)
    console.log('\n🎯 Top Performers:')
    console.log(`   1. ${users[0].firstName} ${users[0].lastName} - ${users[0].points} points`)
    console.log(`   2. ${users[1].firstName} ${users[1].lastName} - ${users[1].points} points`)
    console.log(`   3. ${users[2].firstName} ${users[2].lastName} - ${users[2].points} points`)
    console.log('\n🏆 Teams:')
    teams.forEach((team, index) => {
      console.log(`   ${index + 1}. ${team.name} - ${team.totalPoints} team points`)
    })

    await mongoose.disconnect()
  } catch (error) {
    console.error('✗ Error initializing database:', error)
    process.exit(1)
  }
}

initializeDatabase()
