import { Schema, model, Document } from 'mongoose'

export interface IActivity extends Document {
  userId: Schema.Types.ObjectId
  type: 'running' | 'cycling' | 'swimming' | 'walking' | 'gym'
  duration: number
  distance?: number
  calories: number
  points: number
  date: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym'],
      required: true
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    distance: {
      type: Number,
      default: null
    },
    calories: {
      type: Number,
      required: true,
      min: 0
    },
    points: {
      type: Number,
      required: true,
      min: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

export const Activity = model<IActivity>('Activity', activitySchema)
