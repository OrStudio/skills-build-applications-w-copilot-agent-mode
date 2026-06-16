import express, { Router, Request, Response } from 'express'
import { User } from '../models/User'

const router: Router = express.Router()

// GET all users
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password')
    res.json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET user by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST create user
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, firstName, lastName } = req.body

    if (!username || !email || !password || !firstName || !lastName) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
      return
    }

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      points: 0,
      rank: 0
    })

    const savedUser = await newUser.save()
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// PUT update user
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password')

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// DELETE user
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
