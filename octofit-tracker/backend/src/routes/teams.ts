import express, { Router, Request, Response } from 'express'
import { Team } from '../models/Team'
import { User } from '../models/User'

const router: Router = express.Router()

// GET all teams
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username email firstName lastName')
      .populate('members', 'username email firstName lastName points')
    res.json({
      success: true,
      count: teams.length,
      data: teams
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// GET team by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username email firstName lastName')
      .populate('members', 'username email firstName lastName points')

    if (!team) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      })
      return
    }

    res.json({
      success: true,
      data: team
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST create team
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, leader } = req.body

    if (!name || !leader) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: name, leader'
      })
      return
    }

    const newTeam = new Team({
      name,
      description,
      leader,
      members: [leader],
      totalPoints: 0
    })

    const savedTeam = await newTeam.save()
    const populatedTeam = await savedTeam.populate('leader', 'username email firstName lastName')

    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: populatedTeam
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// PUT update team
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('leader', 'username email firstName lastName')
      .populate('members', 'username email firstName lastName points')

    if (!updatedTeam) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'Team updated successfully',
      data: updatedTeam
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// POST add member to team
router.post('/:id/members/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await Team.findById(req.params.id)

    if (!team) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      })
      return
    }

    if (!team.members.includes(req.params.userId as any)) {
      team.members.push(req.params.userId as any)
      await team.save()
    }

    const updatedTeam = await team.populate('members', 'username email firstName lastName points')

    res.json({
      success: true,
      message: 'Member added to team',
      data: updatedTeam
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding member to team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// DELETE team
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id)

    if (!deletedTeam) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'Team deleted successfully',
      data: deletedTeam
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router
