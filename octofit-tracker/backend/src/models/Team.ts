import { Schema, model, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description?: string
  leader: Schema.Types.ObjectId
  members: Schema.Types.ObjectId[]
  totalPoints: number
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2
    },
    description: {
      type: String,
      default: ''
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    totalPoints: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
)

export const Team = model<ITeam>('Team', teamSchema)
