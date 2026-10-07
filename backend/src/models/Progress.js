import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    studentId: {
      type: String, // Firebase UID
      required: true,
      index: true
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
      index: true
    },
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subtopic',
      default: null,
      index: true
    },
    status: {
      type: String,
      enum: ['locked', 'in-progress', 'completed'],
      default: 'locked',
      index: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for fast lookup of a student's subtopic and chapter progress
progressSchema.index({ studentId: 1, chapterId: 1, subtopicId: 1 }, { unique: true });

export const Progress = mongoose.model('Progress', progressSchema);
