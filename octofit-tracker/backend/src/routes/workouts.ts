import express, { Router, Request, Response } from 'express'
import { Workout } from '../models/Workout'

const router: Router = express.Router()

// GET all workouts
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const workouts = await Workout.find()
      .populate('creatorId', 'username email firstName lastName')
    res.json({
      success: true,
      count: workouts.length,
      data: workouts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workouts',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET workout by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('creatorId', 'username email firstName lastName')

    if (!workout) {
      res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
      return
    }

    res.json({
      success: true,
      data: workout
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET workouts by creator
router.get('/creator/:creatorId', async (req: Request, res: Response): Promise<void> => {
  try {
    const workouts = await Workout.find({ creatorId: req.params.creatorId })
      .populate('creatorId', 'username email firstName lastName')

    res.json({
      success: true,
      count: workouts.length,
      data: workouts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching creator workouts',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST create workout
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, exercises, duration, creatorId, difficulty } = req.body

    if (!name || !exercises || !duration || !creatorId) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
      return
    }

    const newWorkout = new Workout({
      name,
      description,
      exercises,
      duration,
      creatorId,
      difficulty
    })

    const savedWorkout = await newWorkout.save()
    const populatedWorkout = await savedWorkout.populate('creatorId', 'username email firstName lastName')

    res.status(201).json({
      success: true,
      message: 'Workout created successfully',
      data: populatedWorkout
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// PUT update workout
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('creatorId', 'username email firstName lastName')

    if (!updatedWorkout) {
      res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'Workout updated successfully',
      data: updatedWorkout
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// DELETE workout
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id)

    if (!deletedWorkout) {
      res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'Workout deleted successfully',
      data: deletedWorkout
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting workout',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
