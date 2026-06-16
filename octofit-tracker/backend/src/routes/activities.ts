import express, { Router, Request, Response } from 'express'
import { Activity } from '../models/Activity'
import { User } from '../models/User'

const router: Router = express.Router()

// GET all activities
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'username email firstName lastName')
      .sort({ date: -1 })
    res.json({
      success: true,
      count: activities.length,
      data: activities
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET activities by user ID
router.get('/user/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const activities = await Activity.find({ userId: req.params.userId })
      .populate('userId', 'username email firstName lastName')
      .sort({ date: -1 })
    res.json({
      success: true,
      count: activities.length,
      data: activities
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user activities',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET activity by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('userId', 'username email firstName lastName')

    if (!activity) {
      res.status(404).json({
        success: false,
        message: 'Activity not found'
      })
      return
    }

    res.json({
      success: true,
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST create activity
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, type, duration, distance, calories, points, date, notes } = req.body

    if (!userId || !type || !duration || !calories || points === undefined) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
      return
    }

    const newActivity = new Activity({
      userId,
      type,
      duration,
      distance,
      calories,
      points,
      date: date || new Date(),
      notes
    })

    const savedActivity = await newActivity.save()

    // Update user points
    await User.findByIdAndUpdate(
      userId,
      { $inc: { points: points } },
      { new: true }
    )

    const populatedActivity = await savedActivity.populate('userId', 'username email firstName lastName')

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: populatedActivity
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// PUT update activity
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findById(req.params.id)

    if (!activity) {
      res.status(404).json({
        success: false,
        message: 'Activity not found'
      })
      return
    }

    const oldPoints = activity.points
    const newPoints = req.body.points || oldPoints
    const pointsDifference = newPoints - oldPoints

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'username email firstName lastName')

    // Update user points
    if (pointsDifference !== 0) {
      await User.findByIdAndUpdate(
        activity.userId,
        { $inc: { points: pointsDifference } },
        { new: true }
      )
    }

    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: updatedActivity
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// DELETE activity
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id)

    if (!activity) {
      res.status(404).json({
        success: false,
        message: 'Activity not found'
      })
      return
    }

    // Deduct points from user
    await User.findByIdAndUpdate(
      activity.userId,
      { $inc: { points: -activity.points } },
      { new: true }
    )

    res.json({
      success: true,
      message: 'Activity deleted successfully',
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting activity',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
