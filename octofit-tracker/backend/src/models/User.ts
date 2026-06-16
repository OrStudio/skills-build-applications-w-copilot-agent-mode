import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  profilePicture?: string
  bio?: string
  points: number
  rank: number
  teamId?: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    profilePicture: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: ''
    },
    points: {
      type: Number,
      default: 0,
      min: 0
    },
    rank: {
      type: Number,
      default: 0,
      min: 0
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null
    }
  },
  {
    timestamps: true
  }
)

export const User = model<IUser>('User', userSchema)
