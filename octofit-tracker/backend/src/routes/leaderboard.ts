import express, { Router, Request, Response } from 'express'
import { User } from '../models/User'
import { Team } from '../models/Team'

const router: Router = express.Router()

// GET global leaderboard (top users by points)
router.get('/global', async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 100
    const page = parseInt(req.query.page as string) || 1
    const skip = (page - 1) * limit

    const users = await User.find()
      .select('-password')
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit)

    const totalUsers = await User.countDocuments()

    // Add rank to each user
    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: skip + index + 1
    }))

    res.json({
      success: true,
      data: usersWithRank,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        limit
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching global leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET team leaderboard (top teams by total points)
router.get('/teams', async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 50
    const page = parseInt(req.query.page as string) || 1
    const skip = (page - 1) * limit

    const teams = await Team.find()
      .populate('leader', 'username email firstName lastName')
      .populate('members', 'username email firstName lastName points')
      .sort({ totalPoints: -1 })
      .skip(skip)
      .limit(limit)

    const totalTeams = await Team.countDocuments()

    // Add rank to each team
    const teamsWithRank = teams.map((team, index) => ({
      ...team.toObject(),
      rank: skip + index + 1
    }))

    res.json({
      success: true,
      data: teamsWithRank,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTeams / limit),
        totalTeams,
        limit
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET leaderboard by activity type
router.get('/activities/:type', async (req: Request, res: Response): Promise<void> => {
  try {
    const activityType = req.params.type
    const validTypes = ['running', 'cycling', 'swimming', 'walking', 'gym']

    if (!validTypes.includes(activityType)) {
      res.status(400).json({
        success: false,
        message: `Invalid activity type. Valid types: ${validTypes.join(', ')}`
      })
      return
    }

    const limit = parseInt(req.query.limit as string) || 100
    const page = parseInt(req.query.page as string) || 1
    const skip = (page - 1) * limit

    // Aggregate users by their activity points for the specific type
    const users = await User.find()
      .select('-password')
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit)

    const totalUsers = await User.countDocuments()

    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: skip + index + 1
    }))

    res.json({
      success: true,
      activityType,
      data: usersWithRank,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        limit
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activity leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET user rank
router.get('/rank/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId).select('-password')

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    const usersAbove = await User.countDocuments({ points: { $gt: user.points } })
    const rank = usersAbove + 1

    res.json({
      success: true,
      data: {
        user,
        rank,
        points: user.points,
        totalUsers: await User.countDocuments()
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user rank',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
