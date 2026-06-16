import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  description?: string
  exercises: {
    name: string
    sets: number
    reps: number
    weight?: number
  }[]
  duration: number
  creatorId: Schema.Types.ObjectId
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    exercises: [
      {
        name: {
          type: String,
          required: true
        },
        sets: {
          type: Number,
          required: true,
          min: 1
        },
        reps: {
          type: Number,
          required: true,
          min: 1
        },
        weight: {
          type: Number,
          default: null
        }
      }
    ],
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    }
  },
  {
    timestamps: true
  }
)

export const Workout = model<IWorkout>('Workout', workoutSchema)
